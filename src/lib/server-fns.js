import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireUser } from "@/lib/auth-middleware";
import { MIN_PAYOUT, RATE_PER_CLICK } from "@/lib/levels";

const ALPHABET = "abcdefghijkmnpqrstuvwxyz23456789";

const codeSchema = z.object({
  code: z
    .string()
    .min(4)
    .max(24)
    .regex(/^[a-zA-Z0-9]+$/),
});

function makeCode(length = 7) {
  const bytes = crypto.getRandomValues(new Uint8Array(length));
  let out = "";
  for (let i = 0; i < length; i += 1) out += ALPHABET[bytes[i] % ALPHABET.length];
  return out;
}

function normalizeUrl(raw) {
  const trimmed = String(raw ?? "").trim();
  if (!trimmed || trimmed.length > 2048) return null;
  const withScheme = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    const parsed = new URL(withScheme);
    if (!/^https?:$/.test(parsed.protocol)) return null;
    if (!parsed.hostname.includes(".")) return null;
    return parsed.toString();
  } catch {
    return null;
  }
}

function firstRecord(result) {
  if (!result) return null;
  if (Array.isArray(result)) return result[0] ?? null;
  return result.items?.[0] ?? null;
}

function round(value) {
  return Math.round((Number(value) || 0) * 10000) / 10000;
}

export const getLinkByCode = createServerFn({ method: "GET" })
  .validator(codeSchema)
  .handler(async ({ data, context }) => {
    const base44 = context.getBase44();
    const found = await base44.asServiceRole.entities.Link.filter(
      { short_code: data.code },
      { limit: 1 },
    );
    const link = firstRecord(found);
    if (!link) return null;
    return {
      short_code: link.short_code,
      original_url: link.original_url,
      clicks: Number(link.clicks) || 0,
    };
  });

export const registerClick = createServerFn({ method: "POST" })
  .validator(codeSchema)
  .handler(async ({ data, context }) => {
    const base44 = context.getBase44();
    const found = await base44.asServiceRole.entities.Link.filter(
      { short_code: data.code },
      { limit: 1 },
    );
    const link = firstRecord(found);
    if (!link) return { ok: false, original_url: null };

    await base44.asServiceRole.entities.Link.updateMany(
      { id: link.id },
      { $inc: { clicks: 1, earnings: RATE_PER_CLICK } },
    );

    return { ok: true, original_url: link.original_url };
  });

export const createShortLink = createServerFn({ method: "POST" })
  .middleware([requireUser])
  .validator(z.object({ url: z.string().min(3).max(2048) }))
  .handler(async ({ data, context }) => {
    const url = normalizeUrl(data.url);
    if (!url) {
      throw Object.assign(new Error("Ese enlace no es válido"), {
        status: 400,
        code: "INVALID_URL",
      });
    }

    const base44 = context.getBase44();
    let code = makeCode();
    for (let attempt = 0; attempt < 5; attempt += 1) {
      const existing = await base44.asServiceRole.entities.Link.filter(
        { short_code: code },
        { limit: 1 },
      );
      if (!firstRecord(existing)) break;
      code = makeCode();
    }

    const link = await base44.entities.Link.create({
      original_url: url,
      short_code: code,
      clicks: 0,
      earnings: 0,
    });

    return {
      id: link.id,
      short_code: link.short_code,
      original_url: link.original_url,
      clicks: 0,
      earnings: 0,
    };
  });

export const getDashboard = createServerFn({ method: "GET" })
  .middleware([requireUser])
  .handler(async ({ context }) => {
    const base44 = context.getBase44();

    const [linkPage, payouts] = await Promise.all([
      base44.entities.Link.filter(
        { created_by_id: context.user.id },
        { sort: "-created_date", limit: 200 },
      ),
      base44.asServiceRole.entities.Payout.filter(
        { user_email: context.user.email },
        { sort: "-created_date", limit: 100 },
      ),
    ]);

    const links = linkPage?.items ?? [];
    const payoutList = Array.isArray(payouts) ? payouts : (payouts?.items ?? []);

    const totalClicks = links.reduce((sum, link) => sum + (Number(link.clicks) || 0), 0);
    const totalEarnings = round(
      links.reduce((sum, link) => sum + (Number(link.earnings) || 0), 0),
    );
    const committed = round(
      payoutList
        .filter((payout) => ["pending", "processing", "paid"].includes(payout.status))
        .reduce((sum, payout) => sum + (Number(payout.amount) || 0), 0),
    );
    const balance = Math.max(0, Math.round((totalEarnings - committed) * 100) / 100);

    return { links, payouts: payoutList, totalClicks, totalEarnings, balance };
  });

export const requestPayout = createServerFn({ method: "POST" })
  .middleware([requireUser])
  .validator(
    z.object({
      paypal_email: z
        .string()
        .min(5)
        .max(200)
        .regex(/^[^@\s]+@[^@\s]+\.[^@\s]+$/, "Correo de PayPal inválido"),
    }),
  )
  .handler(async ({ data, context }) => {
    const base44 = context.getBase44();

    const [linkPage, payouts] = await Promise.all([
      base44.entities.Link.filter({ created_by_id: context.user.id }, { limit: 200 }),
      base44.asServiceRole.entities.Payout.filter({ user_email: context.user.email }, { limit: 100 }),
    ]);

    const links = linkPage?.items ?? [];
    const payoutList = Array.isArray(payouts) ? payouts : (payouts?.items ?? []);
    const totalEarnings = links.reduce((sum, link) => sum + (Number(link.earnings) || 0), 0);
    const committed = payoutList
      .filter((payout) => ["pending", "processing", "paid"].includes(payout.status))
      .reduce((sum, payout) => sum + (Number(payout.amount) || 0), 0);
    const balance = Math.round((totalEarnings - committed) * 100) / 100;

    if (balance < MIN_PAYOUT) {
      throw Object.assign(new Error(`El mínimo para retirar es $${MIN_PAYOUT.toFixed(2)}`), {
        status: 400,
        code: "MIN_PAYOUT",
      });
    }

    const payout = await base44.asServiceRole.entities.Payout.create({
      amount: balance,
      paypal_email: data.paypal_email,
      user_email: context.user.email,
      status: "pending",
      requested_at: new Date().toISOString(),
      created_by_id: context.user.id,
      created_by: context.user.email,
    });

    return payout;
  });

export const getServerInfo = createServerFn({ method: "GET" }).handler(async () => ({
  renderedAt: new Date().toISOString(),
}));