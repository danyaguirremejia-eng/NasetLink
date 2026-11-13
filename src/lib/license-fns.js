import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireUser } from "@/lib/auth-middleware";

const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const DAY_MS = 86400000;

function randomPart(length) {
  const bytes = crypto.getRandomValues(new Uint8Array(length));
  let out = "";
  for (let i = 0; i < length; i += 1) out += ALPHABET[bytes[i] % ALPHABET.length];
  return out;
}

function assertAdmin(user) {
  if (user?.role !== "admin") {
    throw Object.assign(new Error("Solo un administrador puede gestionar Keys"), {
      status: 403,
      code: "FORBIDDEN",
    });
  }
}

function isExpired(key) {
  const expires = key.expires_at ? new Date(key.expires_at).getTime() : 0;
  return key.status !== "active" || !expires || expires < Date.now();
}

export const createLicenseKey = createServerFn({ method: "POST" })
  .middleware([requireUser])
  .validator(
    z.object({
      prefix: z.string().max(24),
      random_length: z.union([z.literal(4), z.literal(8), z.literal(12)]),
      duration_days: z.number().int().min(1).max(3650),
      device_limit: z.number().int().min(0).max(10),
    }),
  )
  .handler(async ({ data, context }) => {
    assertAdmin(context.user);
    const base44 = context.getBase44();
    const prefix = data.prefix.replace(/[^A-Za-z0-9-]/g, "").slice(0, 24);

    let code = `${prefix}${randomPart(data.random_length)}`;
    for (let attempt = 0; attempt < 6; attempt += 1) {
      const existing = await base44.asServiceRole.entities.LicenseKey.filter(
        { key_code: code },
        { limit: 1 },
      );
      if (!existing?.items?.length) break;
      code = `${prefix}${randomPart(data.random_length)}`;
    }

    const expires = new Date(Date.now() + data.duration_days * DAY_MS);

    return base44.asServiceRole.entities.LicenseKey.create({
      key_code: code,
      prefix,
      random_length: data.random_length,
      duration_days: data.duration_days,
      device_limit: data.device_limit,
      status: "active",
      delivered: false,
      expires_at: expires.toISOString(),
      devices: [],
    });
  });

export const listLicenseKeys = createServerFn({ method: "GET" })
  .middleware([requireUser])
  .handler(async ({ context }) => {
    if (context.user?.role !== "admin") return { keys: [], forbidden: true };

    const page = await context
      .getBase44()
      .asServiceRole.entities.LicenseKey.filter({}, { sort: "-created_date", limit: 100 });

    return { keys: page?.items ?? [], forbidden: false };
  });

export const getDeliveryInfo = createServerFn({ method: "GET" })
  .validator(z.object({ id: z.string().min(1).max(64) }))
  .handler(async ({ data, context }) => {
    const found = await context
      .getBase44()
      .asServiceRole.entities.LicenseKey.filter({ id: data.id }, { limit: 1 });
    const key = found?.items?.[0] ?? null;
    if (!key) return null;

    return {
      id: key.id,
      expires_at: key.expires_at ?? null,
      duration_days: Number(key.duration_days) || 0,
      device_limit: Number(key.device_limit) || 0,
      expired: isExpired(key),
    };
  });

export const claimLicenseKey = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.string().min(1).max(64) }))
  .handler(async ({ data, context }) => {
    const base44 = context.getBase44();
    const found = await base44.asServiceRole.entities.LicenseKey.filter(
      { id: data.id },
      { limit: 1 },
    );
    const key = found?.items?.[0] ?? null;

    if (!key) return { ok: false, reason: "missing" };
    if (isExpired(key)) return { ok: false, reason: "expired" };

    if (!key.delivered) {
      await base44.asServiceRole.entities.LicenseKey.update(key.id, {
        delivered: true,
        delivered_at: new Date().toISOString(),
      });
    }

    return {
      ok: true,
      key_code: key.key_code,
      expires_at: key.expires_at ?? null,
      duration_days: Number(key.duration_days) || 0,
      device_limit: Number(key.device_limit) || 0,
    };
  });