import { createFileRoute } from "@tanstack/react-router";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Cache-Control": "no-store",
};

const json = (body, status = 200) => Response.json(body, { status, headers: CORS });

// Endpoint público para la app Android: /api/validate?key=XXXX&device=YYYY
export const Route = createFileRoute("/api/validate")({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, { status: 204, headers: CORS }),
      GET: async ({ request, context }) => {
        const url = new URL(request.url);
        const keyParam = (url.searchParams.get("key") || "").trim().slice(0, 80);
        const device = (url.searchParams.get("device") || "").trim().slice(0, 120);

        if (!keyParam) return json({ status: "invalid" });

        const base44 = context.getBase44();
        const found = await base44.asServiceRole.entities.LicenseKey.filter(
          { key_code: keyParam },
          { limit: 1 },
        );
        const key = found?.items?.[0] ?? null;
        if (!key) return json({ status: "invalid" });

        const expires = key.expires_at ? new Date(key.expires_at).getTime() : 0;
        if (key.status !== "active" || !expires || expires < Date.now()) {
          return json({ status: "invalid" });
        }

        const limit = Number(key.device_limit) || 0;
        const devices = Array.isArray(key.devices) ? key.devices : [];

        if (limit > 0) {
          if (!device) {
            if (devices.length >= limit) return json({ status: "invalid" });
          } else if (!devices.includes(device)) {
            if (devices.length >= limit) return json({ status: "invalid" });
            await base44.asServiceRole.entities.LicenseKey.update(key.id, {
              devices: [...devices, device],
            });
          }
        }

        return json({
          status: "valid",
          expires: String(key.expires_at).slice(0, 10),
        });
      },
    },
  },
});