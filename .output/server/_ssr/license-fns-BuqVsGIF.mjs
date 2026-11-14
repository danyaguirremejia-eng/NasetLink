import { createServerFn } from "./ssr.mjs";
import { requireUser } from "./auth-middleware-Ag8cE1no.mjs";
import { literal, number, object, string, union } from "../_libs/zod.mjs";
import { createServerRpc } from "./createServerRpc-cwhBdcVU.mjs";
// node_modules/.nitro/vite/services/ssr/assets/license-fns-BuqVsGIF.js
var ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
var DAY_MS = 864e5;
function randomPart(length) {
	const bytes = crypto.getRandomValues(new Uint8Array(length));
	let out = "";
	for (let i = 0; i < length; i += 1) out += ALPHABET[bytes[i] % 32];
	return out;
}
function assertAdmin(user) {
	if (user?.role !== "admin") throw Object.assign(/* @__PURE__ */ new Error("Solo un administrador puede gestionar Keys"), {
		status: 403,
		code: "FORBIDDEN"
	});
}
function isExpired(key) {
	const expires = key.expires_at ? new Date(key.expires_at).getTime() : 0;
	return key.status !== "active" || !expires || expires < Date.now();
}
var createLicenseKey_createServerFn_handler = createServerRpc({
	id: "4e2b45df360fd11b57603163ecd8f1f66d4256cade5edafa88c9089c12e6da9e",
	name: "createLicenseKey",
	filename: "src/lib/license-fns.js"
}, (opts) => createLicenseKey.__executeServer(opts));
var createLicenseKey = createServerFn({ method: "POST" }).middleware([requireUser]).validator(object({
	prefix: string().max(24),
	random_length: union([
		literal(4),
		literal(8),
		literal(12)
	]),
	duration_days: number().int().min(1).max(3650),
	device_limit: number().int().min(0).max(10)
})).handler(createLicenseKey_createServerFn_handler, async ({ data, context }) => {
	assertAdmin(context.user);
	const base44 = context.getBase44();
	const prefix = data.prefix.replace(/[^A-Za-z0-9-]/g, "").slice(0, 24);
	let code = `${prefix}${randomPart(data.random_length)}`;
	for (let attempt = 0; attempt < 6; attempt += 1) {
		if (!(await base44.asServiceRole.entities.LicenseKey.filter({ key_code: code }, { limit: 1 }))?.items?.length) break;
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
		devices: []
	});
});
var listLicenseKeys_createServerFn_handler = createServerRpc({
	id: "047a1fba239503de0c6840b9e70c20e03437c3ecd444d60c98bb2926a220787a",
	name: "listLicenseKeys",
	filename: "src/lib/license-fns.js"
}, (opts) => listLicenseKeys.__executeServer(opts));
var listLicenseKeys = createServerFn({ method: "GET" }).middleware([requireUser]).handler(listLicenseKeys_createServerFn_handler, async ({ context }) => {
	if (context.user?.role !== "admin") return {
		keys: [],
		forbidden: true
	};
	return {
		keys: (await context.getBase44().asServiceRole.entities.LicenseKey.filter({}, {
			sort: "-created_date",
			limit: 100
		}))?.items ?? [],
		forbidden: false
	};
});
var getDeliveryInfo_createServerFn_handler = createServerRpc({
	id: "b8a502cda89d8be2e98b4807c3d3ad61f6ff9f5fc3da62da1763a9dd244e9309",
	name: "getDeliveryInfo",
	filename: "src/lib/license-fns.js"
}, (opts) => getDeliveryInfo.__executeServer(opts));
var getDeliveryInfo = createServerFn({ method: "GET" }).validator(object({ id: string().min(1).max(64) })).handler(getDeliveryInfo_createServerFn_handler, async ({ data, context }) => {
	const key = (await context.getBase44().asServiceRole.entities.LicenseKey.filter({ id: data.id }, { limit: 1 }))?.items?.[0] ?? null;
	if (!key) return null;
	return {
		id: key.id,
		expires_at: key.expires_at ?? null,
		duration_days: Number(key.duration_days) || 0,
		device_limit: Number(key.device_limit) || 0,
		expired: isExpired(key)
	};
});
var claimLicenseKey_createServerFn_handler = createServerRpc({
	id: "3d0ded1cfd1e90aa6846e79420f524d71ef172f19df5ea80880b9a725a1e3f15",
	name: "claimLicenseKey",
	filename: "src/lib/license-fns.js"
}, (opts) => claimLicenseKey.__executeServer(opts));
var claimLicenseKey = createServerFn({ method: "POST" }).validator(object({ id: string().min(1).max(64) })).handler(claimLicenseKey_createServerFn_handler, async ({ data, context }) => {
	const base44 = context.getBase44();
	const key = (await base44.asServiceRole.entities.LicenseKey.filter({ id: data.id }, { limit: 1 }))?.items?.[0] ?? null;
	if (!key) return {
		ok: false,
		reason: "missing"
	};
	if (isExpired(key)) return {
		ok: false,
		reason: "expired"
	};
	if (!key.delivered) await base44.asServiceRole.entities.LicenseKey.update(key.id, {
		delivered: true,
		delivered_at: (/* @__PURE__ */ new Date()).toISOString()
	});
	return {
		ok: true,
		key_code: key.key_code,
		expires_at: key.expires_at ?? null,
		duration_days: Number(key.duration_days) || 0,
		device_limit: Number(key.device_limit) || 0
	};
});
export { claimLicenseKey_createServerFn_handler, createLicenseKey_createServerFn_handler, getDeliveryInfo_createServerFn_handler, listLicenseKeys_createServerFn_handler };
