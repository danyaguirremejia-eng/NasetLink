globalThis.__nitro_main__ = import.meta.url;
import { NodeResponse, serve } from "./_libs/srvx.mjs";
import { H3Core, HTTPError, composeMiddleware, createMatcherFromFind, defineHandler, defineLazyEventHandler, headers, memoizeRouteRulesMatcher, toEventHandler } from "./_libs/h3+rou3+srvx.mjs";
import { promises } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
// node_modules/nitro/dist/runtime/internal/polyfills/fast-response.mjs
if (globalThis.Response !== NodeResponse) globalThis.Response = NodeResponse;
// node_modules/nitro/dist/runtime/_libs/hookable.mjs
function e$1(t, n, r, i) {
	for (let a = r; a < t.length; a += 1) try {
		let r = i ? i.run(() => t[a](...n)) : t[a](...n);
		if (r && typeof r.then == `function`) return Promise.resolve(r).then(() => e$1(t, n, a + 1, i));
	} catch (e) {
		return Promise.reject(e);
	}
}
var t$1 = class {
	_hooks;
	constructor() {
		this._hooks = {};
	}
	hook(e, t) {
		return !e || typeof t != `function` ? () => {} : (this._hooks[e] = this._hooks[e] || [], this._hooks[e].push(t), () => {
			t &&= (this.removeHook(e, t), void 0);
		});
	}
	removeHook(e, t) {
		let n = this._hooks[e];
		if (n) {
			let r = n.indexOf(t);
			r !== -1 && n.splice(r, 1), n.length === 0 && (this._hooks[e] = void 0);
		}
	}
	callHook(t, ...n) {
		let r = this._hooks[t];
		if (r && r.length !== 0) return e$1(r.slice(), n, 0);
	}
};
// node_modules/nitro/dist/runtime/_libs/ufo.mjs
String.fromCharCode;
var e = /%2f/gi;
function t(e = ``) {
	try {
		return decodeURIComponent(`` + e);
	} catch {
		return `` + e;
	}
}
function n(n) {
	return t(n.replace(e, `%252F`));
}
var r = /\/$|\/\?|\/#/;
var i = /^\.?\//;
function a(e = ``, t) {
	return t ? r.test(e) : e.endsWith(`/`);
}
function o(e = ``, t) {
	if (!t) return (a(e) ? e.slice(0, -1) : e) || `/`;
	if (!a(e, !0)) return e || `/`;
	let n = e, r = ``, i = e.indexOf(`#`);
	i !== -1 && (n = e.slice(0, i), r = e.slice(i));
	let [o, ...s] = n.split(`?`);
	return ((o.endsWith(`/`) ? o.slice(0, -1) : o) || `/`) + (s.length > 0 ? `?${s.join(`?`)}` : ``) + r;
}
function s(e = ``, t) {
	if (!t) return e.endsWith(`/`) ? e : e + `/`;
	if (a(e, !0)) return e || `/`;
	let n = e, r = ``, i = e.indexOf(`#`);
	if (i !== -1 && (n = e.slice(0, i), r = e.slice(i), !n)) return r;
	let [o, ...s] = n.split(`?`);
	return o + `/` + (s.length > 0 ? `?${s.join(`?`)}` : ``) + r;
}
function c(e = ``) {
	return e.startsWith(`/`);
}
function l(e = ``) {
	return c(e) ? e : `/` + e;
}
function u(e) {
	return e && e !== `/`;
}
function d(e, ...t) {
	let n = e || ``;
	for (let e of t.filter((e) => u(e))) if (n) {
		let t = e.replace(i, ``);
		n = s(n) + t;
	} else n = e;
	return n;
}
// #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/assets/AuthLayout-B8mOfXvy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3a5-Q3pcPVXZXMx202Mueq8MKtTNgKU\"",
		"mtime": "2026-11-14T05:08:41.244Z",
		"size": 933,
		"path": "../public/assets/AuthLayout-B8mOfXvy.js"
	},
	"/assets/_authed-Cyuy-Wjj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"353e-3o+0g98b4IUFzp9HvmPyUQcV108\"",
		"mtime": "2026-11-14T05:08:41.244Z",
		"size": 13630,
		"path": "../public/assets/_authed-Cyuy-Wjj.js"
	},
	"/assets/_authed-Ds-bLlyj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4c-mosF6AsXMxs6XuOB3KDQApXgYvE\"",
		"mtime": "2026-11-14T05:08:41.244Z",
		"size": 76,
		"path": "../public/assets/_authed-Ds-bLlyj.js"
	},
	"/assets/admin-CTMhKqLF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1b4d-IMWybMh4qVNW68vZUEVyEg4yF7g\"",
		"mtime": "2026-11-14T05:08:41.244Z",
		"size": 6989,
		"path": "../public/assets/admin-CTMhKqLF.js"
	},
	"/assets/anuncios-tYPPGkI6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a7-YIFYEsGHbcvAaiEHNkaki0NdEqU\"",
		"mtime": "2026-11-14T05:08:41.244Z",
		"size": 2471,
		"path": "../public/assets/anuncios-tYPPGkI6.js"
	},
	"/assets/api-JqcgHOql.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2c04-oBQBXoSgsPOrVG7crNMOxlKOnZk\"",
		"mtime": "2026-11-14T05:08:41.244Z",
		"size": 11268,
		"path": "../public/assets/api-JqcgHOql.js"
	},
	"/assets/arrow-left-CvQsPswO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a4-U2GkDl9J/vwtfYS3QqUWsdx2C1w\"",
		"mtime": "2026-11-14T05:08:41.244Z",
		"size": 164,
		"path": "../public/assets/arrow-left-CvQsPswO.js"
	},
	"/assets/award-CEkA9pkR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"112-3ze/UYDQuFkbA782ftCLEV9tCZg\"",
		"mtime": "2026-11-14T05:08:41.244Z",
		"size": 274,
		"path": "../public/assets/award-CEkA9pkR.js"
	},
	"/assets/banknote-CPpowxF_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f5-eo23Z0kiR7qBp0Yty1/dv3NBtFE\"",
		"mtime": "2026-11-14T05:08:41.244Z",
		"size": 245,
		"path": "../public/assets/banknote-CPpowxF_.js"
	},
	"/assets/calendar-_aNlbCd3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"101-q8a3RJo9bNI/RLqEqk+n7p1hC2w\"",
		"mtime": "2026-11-14T05:08:41.244Z",
		"size": 257,
		"path": "../public/assets/calendar-_aNlbCd3.js"
	},
	"/assets/chevron-down-DPztnn5X.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7f-y36D3V9NInU1ZgURFX1jQYHcOWw\"",
		"mtime": "2026-11-14T05:08:41.244Z",
		"size": 127,
		"path": "../public/assets/chevron-down-DPztnn5X.js"
	},
	"/assets/circle-check-Cu4TrgHE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b1-WCcxOk26DQPV9rhNUuMb73wSqEA\"",
		"mtime": "2026-11-14T05:08:41.244Z",
		"size": 177,
		"path": "../public/assets/circle-check-Cu4TrgHE.js"
	},
	"/assets/clock-MG2VJuku.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b7-Olh/boXPifYb6lqU6SyUTFYo1ao\"",
		"mtime": "2026-11-14T05:08:41.244Z",
		"size": 183,
		"path": "../public/assets/clock-MG2VJuku.js"
	},
	"/assets/copy-GA1JwnlH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ec-c9jHM2KyjGJbric3g+nKk5MadRc\"",
		"mtime": "2026-11-14T05:08:41.244Z",
		"size": 236,
		"path": "../public/assets/copy-GA1JwnlH.js"
	},
	"/assets/createLucideIcon-DeM9MRcH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3aa-F4HD8VSrnltlvSylmNleOISmi2Q\"",
		"mtime": "2026-11-14T05:08:41.244Z",
		"size": 938,
		"path": "../public/assets/createLucideIcon-DeM9MRcH.js"
	},
	"/assets/dashboard-DMXQZXa4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3f64-px8/6fZDu7Ufi8icHJY6cm+egEw\"",
		"mtime": "2026-11-14T05:08:41.244Z",
		"size": 16228,
		"path": "../public/assets/dashboard-DMXQZXa4.js"
	},
	"/assets/dist-BNdSBSks.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e61-qx8jFUcCu+zOngm3ZEKYhXglV4U\"",
		"mtime": "2026-11-14T05:08:41.254Z",
		"size": 7777,
		"path": "../public/assets/dist-BNdSBSks.js"
	},
	"/assets/dist-BcjEiVfj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"647f-sXY4Caw752cHX7LGrYXq/Gek8Qs\"",
		"mtime": "2026-11-14T05:08:41.254Z",
		"size": 25727,
		"path": "../public/assets/dist-BcjEiVfj.js"
	},
	"/assets/dist-CjAWcVQh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2dd-UHEe0/do1ZNTi6/OdMw0wQH9BCw\"",
		"mtime": "2026-11-14T05:08:41.254Z",
		"size": 733,
		"path": "../public/assets/dist-CjAWcVQh.js"
	},
	"/assets/dist-DEXnBp61.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"744a-R8Wa1ym5he7zOLC5orx+DeniZCI\"",
		"mtime": "2026-11-14T05:08:41.254Z",
		"size": 29770,
		"path": "../public/assets/dist-DEXnBp61.js"
	},
	"/assets/dist-ER6o_o5j.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12db-Qe7pNUumAWged9sM+2mEqCnDvyo\"",
		"mtime": "2026-11-14T05:08:41.254Z",
		"size": 4827,
		"path": "../public/assets/dist-ER6o_o5j.js"
	},
	"/assets/download-CePOo7-M.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"106-6piLJIEKwavBqgJWQSC5EVgZtmw\"",
		"mtime": "2026-11-14T05:08:41.254Z",
		"size": 262,
		"path": "../public/assets/download-CePOo7-M.js"
	},
	"/assets/flame-tGYkwpY5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"116-xGIvnTFgm78PSPKzNWkm+nDcokw\"",
		"mtime": "2026-11-14T05:08:41.254Z",
		"size": 278,
		"path": "../public/assets/flame-tGYkwpY5.js"
	},
	"/assets/forgot-password-DRIiVIBB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6b7-tB4KMRiIU5pH/v6d9m6xEkhFkas\"",
		"mtime": "2026-11-14T05:08:41.254Z",
		"size": 1719,
		"path": "../public/assets/forgot-password-DRIiVIBB.js"
	},
	"/assets/ganancias-xDU2CQQn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"85a-KhSEiHvg2U+BHSJ/sRtJPD/D4eg\"",
		"mtime": "2026-11-14T05:08:41.254Z",
		"size": 2138,
		"path": "../public/assets/ganancias-xDU2CQQn.js"
	},
	"/assets/getkey._id-zu1YRUjf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2753-esI02fwlpTVkO10rdyUrH+o9AHc\"",
		"mtime": "2026-11-14T05:08:41.254Z",
		"size": 10067,
		"path": "../public/assets/getkey._id-zu1YRUjf.js"
	},
	"/assets/history-DZNUZWDt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ed-nUWjW+UGwgueq4WpoLqEnqFo3J8\"",
		"mtime": "2026-11-14T05:08:41.254Z",
		"size": 237,
		"path": "../public/assets/history-DZNUZWDt.js"
	},
	"/assets/hourglass-BjrnU-VM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"168-iuyG/YIJqK009vEklGziFrwWBI0\"",
		"mtime": "2026-11-14T05:08:41.254Z",
		"size": 360,
		"path": "../public/assets/hourglass-BjrnU-VM.js"
	},
	"/assets/index-BB4n_ggW.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"16b41-udpFdvDqdAYO5hmYweUWjaG7pp4\"",
		"mtime": "2026-11-14T05:08:41.254Z",
		"size": 92993,
		"path": "../public/assets/index-BB4n_ggW.css"
	},
	"/assets/index-CAVTNdZc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10a3e3-21qjE1VO/SuonmWlB1Y8ZFOeeuA\"",
		"mtime": "2026-11-14T05:08:41.244Z",
		"size": 1090531,
		"path": "../public/assets/index-CAVTNdZc.js"
	},
	"/assets/info-CTjFYxvO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"cc-YiuuV8x01TZQKYpEIwAPebRfrRM\"",
		"mtime": "2026-11-14T05:08:41.254Z",
		"size": 204,
		"path": "../public/assets/info-CTjFYxvO.js"
	},
	"/assets/jsx-runtime-EIAPxkjE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"44a-PaYN9rm3A7etz/YdFwt3BfC0xDc\"",
		"mtime": "2026-11-14T05:08:41.254Z",
		"size": 1098,
		"path": "../public/assets/jsx-runtime-EIAPxkjE.js"
	},
	"/assets/key-DUlK1aWk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"154-GiRA/5znfyHXMA4HE5BMEnGcQdM\"",
		"mtime": "2026-11-14T05:08:41.254Z",
		"size": 340,
		"path": "../public/assets/key-DUlK1aWk.js"
	},
	"/assets/keys-Dyqu8DUt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3b7d-tO26VZ6bcQzKf/ME24hbp7e0Ef8\"",
		"mtime": "2026-11-14T05:08:41.254Z",
		"size": 15229,
		"path": "../public/assets/keys-Dyqu8DUt.js"
	},
	"/assets/label-Cp6WcaC9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15f4-/sr8KNix1YkeTofNt35Zjp7jGFY\"",
		"mtime": "2026-11-14T05:08:41.254Z",
		"size": 5620,
		"path": "../public/assets/label-Cp6WcaC9.js"
	},
	"/assets/levels-DM_r1ERY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"269-j6i7G7aAg+6cQpu70oox2E58njg\"",
		"mtime": "2026-11-14T05:08:41.254Z",
		"size": 617,
		"path": "../public/assets/levels-DM_r1ERY.js"
	},
	"/assets/lightbulb-BpY08qBP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11e-vx7R+IV4MpKgmDcYhzXe4VMLmKQ\"",
		"mtime": "2026-11-14T05:08:41.254Z",
		"size": 286,
		"path": "../public/assets/lightbulb-BpY08qBP.js"
	},
	"/assets/link-2-YoSs9fLn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f1-RVITgmdF5tZue4sMC/xomZplIZQ\"",
		"mtime": "2026-11-14T05:08:41.254Z",
		"size": 241,
		"path": "../public/assets/link-2-YoSs9fLn.js"
	},
	"/assets/link-p6jbCstK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2c20-VtavE1Eim2IArIIEivL077wbvYM\"",
		"mtime": "2026-11-14T05:08:41.254Z",
		"size": 11296,
		"path": "../public/assets/link-p6jbCstK.js"
	},
	"/assets/links-dgNnOzJ_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"16f5-AYH4Qog58xAcpJnULVZVRrIxACA\"",
		"mtime": "2026-11-14T05:08:41.254Z",
		"size": 5877,
		"path": "../public/assets/links-dgNnOzJ_.js"
	},
	"/assets/loader-circle-B9zEYCUZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8f-ZoDZ3Mexf/WMmtHc6KRraRZ9RzY\"",
		"mtime": "2026-11-14T05:08:41.254Z",
		"size": 143,
		"path": "../public/assets/loader-circle-B9zEYCUZ.js"
	},
	"/assets/lock-DynkCA50.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ce-gnMEa5lWev8OHOIQx2x+Z/N/WDc\"",
		"mtime": "2026-11-14T05:08:41.254Z",
		"size": 206,
		"path": "../public/assets/lock-DynkCA50.js"
	},
	"/assets/log-out-Cy2KUtml.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"102-HW5K45GcHpjpNISF80F2jCqEROs\"",
		"mtime": "2026-11-14T05:08:41.254Z",
		"size": 258,
		"path": "../public/assets/log-out-Cy2KUtml.js"
	},
	"/assets/login-DbOkq9xB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11a6-bX+tWR/nl1uWOOZlW7Rf3ljS8RA\"",
		"mtime": "2026-11-14T05:08:41.254Z",
		"size": 4518,
		"path": "../public/assets/login-DbOkq9xB.js"
	},
	"/assets/mail-CUp7j2r1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d7-rvg4kpP5JwASlDdhHXFDBTufVQE\"",
		"mtime": "2026-11-14T05:08:41.254Z",
		"size": 215,
		"path": "../public/assets/mail-CUp7j2r1.js"
	},
	"/assets/megaphone-Cy2I8190.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c0-cszYO6Q+ZzGKyFGmAZ0htswgx7k\"",
		"mtime": "2026-11-14T05:08:41.254Z",
		"size": 192,
		"path": "../public/assets/megaphone-Cy2I8190.js"
	},
	"/assets/message-circle-BObtr856.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"93-N5l2G4JPKgOk5/R50Zd4IzP+9pI\"",
		"mtime": "2026-11-14T05:08:41.254Z",
		"size": 147,
		"path": "../public/assets/message-circle-BObtr856.js"
	},
	"/assets/message-square-Cg03A6C8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b2-h/Gapcfhyxh6fiwRmC39qjfXF9Q\"",
		"mtime": "2026-11-14T05:08:41.254Z",
		"size": 178,
		"path": "../public/assets/message-square-Cg03A6C8.js"
	},
	"/assets/mfa-wO21aSyM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"cc2e-eQIwTAZ8orVUVTHW4a3dO9Vv+pQ\"",
		"mtime": "2026-11-14T05:08:41.254Z",
		"size": 52270,
		"path": "../public/assets/mfa-wO21aSyM.js"
	},
	"/assets/mouse-pointer-click-DHfTowLf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"19c-4SKPZ4+MQfiGFyMt0UH8958pCr0\"",
		"mtime": "2026-11-14T05:08:41.254Z",
		"size": 412,
		"path": "../public/assets/mouse-pointer-click-DHfTowLf.js"
	},
	"/assets/niveles-CGB4pa0Z.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2ecf-bE0w9tK8FQ3Z9Yc/Fgj5ffcESSs\"",
		"mtime": "2026-11-14T05:08:41.254Z",
		"size": 11983,
		"path": "../public/assets/niveles-CGB4pa0Z.js"
	},
	"/assets/not-found-DIgawKw1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"37-RTB6YH5iXRKeXz1Sn6ZQ+vS0lnc\"",
		"mtime": "2026-11-14T05:08:41.254Z",
		"size": 55,
		"path": "../public/assets/not-found-DIgawKw1.js"
	},
	"/assets/palette-DAkFRr4q.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"267-jDryJe6KWb1QjQjO91bzPIKUlSA\"",
		"mtime": "2026-11-14T05:08:41.254Z",
		"size": 615,
		"path": "../public/assets/palette-DAkFRr4q.js"
	},
	"/assets/parts-BsUw0Vtd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4b4-9xPExewOe0UQVao58VHhkckLvxg\"",
		"mtime": "2026-11-14T05:08:41.254Z",
		"size": 1204,
		"path": "../public/assets/parts-BsUw0Vtd.js"
	},
	"/assets/perfil-CW8Oz7oR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e4b-NBxpEbw+fBpQRD40qGLbchQtuLc\"",
		"mtime": "2026-11-14T05:08:41.254Z",
		"size": 3659,
		"path": "../public/assets/perfil-CW8Oz7oR.js"
	},
	"/assets/personaliza-hs_mpxuk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3c8d-Te6MwnhiOsmXlZBiMuN97qB2wF8\"",
		"mtime": "2026-11-14T05:08:41.254Z",
		"size": 15501,
		"path": "../public/assets/personaliza-hs_mpxuk.js"
	},
	"/assets/preload-helper-BIFjLcJh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1309-YZrWcTcDmRcpn6nZzuWfaBhOYCU\"",
		"mtime": "2026-11-14T05:08:41.254Z",
		"size": 4873,
		"path": "../public/assets/preload-helper-BIFjLcJh.js"
	},
	"/assets/ranking-CKEpqQLb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e89-HIyNnj+BGOxC0l3tZpoc4pv5mdw\"",
		"mtime": "2026-11-14T05:08:41.254Z",
		"size": 7817,
		"path": "../public/assets/ranking-CKEpqQLb.js"
	},
	"/assets/react-D3IYuPEd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d67-Kl8sQOWyf3ZBLMqR3HaXSrMwoPI\"",
		"mtime": "2026-11-14T05:08:41.254Z",
		"size": 7527,
		"path": "../public/assets/react-D3IYuPEd.js"
	},
	"/assets/redirect-DmtLUW0N.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"184-TRM49T5nvIhX8okm9YKQe/jdlzE\"",
		"mtime": "2026-11-14T05:08:41.254Z",
		"size": 388,
		"path": "../public/assets/redirect-DmtLUW0N.js"
	},
	"/assets/referidos-Bgk0rbLP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ed3-rOLrU9mGNThnO2Qww/2ZULRg/iA\"",
		"mtime": "2026-11-14T05:08:41.254Z",
		"size": 7891,
		"path": "../public/assets/referidos-Bgk0rbLP.js"
	},
	"/assets/register-BoUCRh-N.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"90e9-acjGPUFvuwDdmw+2u2SVd/Vvvdc\"",
		"mtime": "2026-11-14T05:08:41.254Z",
		"size": 37097,
		"path": "../public/assets/register-BoUCRh-N.js"
	},
	"/assets/reset-password-D91kMPVY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9d0-c8WHJf4oHbjWWPVHi0kle0gj3qk\"",
		"mtime": "2026-11-14T05:08:41.254Z",
		"size": 2512,
		"path": "../public/assets/reset-password-D91kMPVY.js"
	},
	"/assets/retiros-D57HBK8U.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"21f6-B5FJ0pM9QRuuqpo/MLXQF+45yXI\"",
		"mtime": "2026-11-14T05:08:41.254Z",
		"size": 8694,
		"path": "../public/assets/retiros-D57HBK8U.js"
	},
	"/assets/routes-CU6O1UVi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a115-y6PVQBNsqhMsPqIa2ewLLsMb/FI\"",
		"mtime": "2026-11-14T05:08:41.254Z",
		"size": 41237,
		"path": "../public/assets/routes-CU6O1UVi.js"
	},
	"/assets/s._code-BtrYFG35.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1376-ZDY+tPdjS1kruCIlsxGQCqv7Sbw\"",
		"mtime": "2026-11-14T05:08:41.254Z",
		"size": 4982,
		"path": "../public/assets/s._code-BtrYFG35.js"
	},
	"/assets/search-BmWMluvg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ac-4W0CgKfMo2uYIyF8KvWjAD02B9o\"",
		"mtime": "2026-11-14T05:08:41.254Z",
		"size": 172,
		"path": "../public/assets/search-BmWMluvg.js"
	},
	"/assets/send-Bmpqwu6D.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"122-Ot6N+kJgdK9JWPrPndRtWI81M5E\"",
		"mtime": "2026-11-14T05:08:41.254Z",
		"size": 290,
		"path": "../public/assets/send-Bmpqwu6D.js"
	},
	"/assets/share-2-CUWxyNN2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"164-JhLsHNN7BbH2LpkKObuBBJqHlZ8\"",
		"mtime": "2026-11-14T05:08:41.254Z",
		"size": 356,
		"path": "../public/assets/share-2-CUWxyNN2.js"
	},
	"/assets/shield-alert-F2WP3tGB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"160-EsByTmSWn/G2mYT/euEGER6Cq3w\"",
		"mtime": "2026-11-14T05:08:41.254Z",
		"size": 352,
		"path": "../public/assets/shield-alert-F2WP3tGB.js"
	},
	"/assets/shield-check-BQr3d4aV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13f-GPCBy9aGw0q+7xqM74Or4/i1wuw\"",
		"mtime": "2026-11-14T05:08:41.254Z",
		"size": 319,
		"path": "../public/assets/shield-check-BQr3d4aV.js"
	},
	"/assets/smartphone-BJJFFKJV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c5-lvgDmnvoeGtU+V6sXcCfu+9pVIk\"",
		"mtime": "2026-11-14T05:08:41.254Z",
		"size": 197,
		"path": "../public/assets/smartphone-BJJFFKJV.js"
	},
	"/assets/star-DPsFeFCb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d8-1IHW+WVhx05x3OtbkJ3XtzxWzfw\"",
		"mtime": "2026-11-14T05:08:41.254Z",
		"size": 472,
		"path": "../public/assets/star-DPsFeFCb.js"
	},
	"/assets/stats-3wRDvf9d.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1642-Sm9gEzJMzu1BwuI0RBSLaLnSdv8\"",
		"mtime": "2026-11-14T05:08:41.254Z",
		"size": 5698,
		"path": "../public/assets/stats-3wRDvf9d.js"
	},
	"/assets/sugerencias-CrrJKr-F.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"22dc-Uz6EFPR66A8XlxKnmXw9tngJKzY\"",
		"mtime": "2026-11-14T05:08:41.254Z",
		"size": 8924,
		"path": "../public/assets/sugerencias-CrrJKr-F.js"
	},
	"/assets/tag-BqNTwzQx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"146-5Hv4u/1EvE3U2bLAA+WceFVOif8\"",
		"mtime": "2026-11-14T05:08:41.254Z",
		"size": 326,
		"path": "../public/assets/tag-BqNTwzQx.js"
	},
	"/assets/trending-up-mvd5NY3v.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"cc-DycarWbi/7ygrFysYs3bZXD3ZQs\"",
		"mtime": "2026-11-14T05:08:41.254Z",
		"size": 204,
		"path": "../public/assets/trending-up-mvd5NY3v.js"
	},
	"/assets/triangle-alert-C3MXLVKg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"108-Wm7nL6hHM2J9rW1NIznlR0fA7SI\"",
		"mtime": "2026-11-14T05:08:41.254Z",
		"size": 264,
		"path": "../public/assets/triangle-alert-C3MXLVKg.js"
	},
	"/assets/trophy-BgO0iEMw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d1-57OrAkQqSYrXi/s/KX7NTf0dAO0\"",
		"mtime": "2026-11-14T05:08:41.254Z",
		"size": 465,
		"path": "../public/assets/trophy-BgO0iEMw.js"
	},
	"/assets/useMatch-ARRFyopL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"276-ha/4qAuQJQujCZo7SW5TBGTHLk8\"",
		"mtime": "2026-11-14T05:08:41.254Z",
		"size": 630,
		"path": "../public/assets/useMatch-ARRFyopL.js"
	},
	"/assets/useNavigate-DXVi4dW7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fb-5GHteNd9vpo1S+JCwQklIXUOSmc\"",
		"mtime": "2026-11-14T05:08:41.254Z",
		"size": 251,
		"path": "../public/assets/useNavigate-DXVi4dW7.js"
	},
	"/assets/user-DSmKFs19.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c4-Jk/5rUa4qVbUYOqpf2etO4Dvs38\"",
		"mtime": "2026-11-14T05:08:41.254Z",
		"size": 196,
		"path": "../public/assets/user-DSmKFs19.js"
	},
	"/assets/user-check-gzDeniKP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fd-Y/anYy/Kspwd3F4zPxOaqv6v394\"",
		"mtime": "2026-11-14T05:08:41.254Z",
		"size": 253,
		"path": "../public/assets/user-check-gzDeniKP.js"
	},
	"/assets/users-DSJYZZMJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"130-yVIXmrq+nWlwF7nLaE9DqFHSBIM\"",
		"mtime": "2026-11-14T05:08:41.254Z",
		"size": 304,
		"path": "../public/assets/users-DSJYZZMJ.js"
	},
	"/assets/utils-C4TdyFDQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7820-lMBkaiDF8gCqzSLKrmvW4FVISe0\"",
		"mtime": "2026-11-14T05:08:41.254Z",
		"size": 30752,
		"path": "../public/assets/utils-C4TdyFDQ.js"
	},
	"/assets/wallet-XrdWx3c9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11e-ubfzGeAsM/wT6jtZP+Vk2KqCvn4\"",
		"mtime": "2026-11-14T05:08:41.254Z",
		"size": 286,
		"path": "../public/assets/wallet-XrdWx3c9.js"
	},
	"/assets/x-DqFeE7Tq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-QLTRNKTjB+HeIACnJ0N/FR1i2Sc\"",
		"mtime": "2026-11-14T05:08:41.254Z",
		"size": 154,
		"path": "../public/assets/x-DqFeE7Tq.js"
	},
	"/assets/youtube-CRaHFxWV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3f8-8DI/EFGDkRUqaP7EgWQItn+w9IM\"",
		"mtime": "2026-11-14T05:08:41.254Z",
		"size": 1016,
		"path": "../public/assets/youtube-CRaHFxWV.js"
	},
	"/assets/zap-CBKxxUkV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"106-aTmy3fMDHSLOqUogxYWxq/XovAo\"",
		"mtime": "2026-11-14T05:08:41.254Z",
		"size": 262,
		"path": "../public/assets/zap-CBKxxUkV.js"
	}
};
// #nitro/virtual/public-assets-node
function readAsset(id) {
	const serverDir = dirname(fileURLToPath(globalThis.__nitro_main__));
	return promises.readFile(resolve(serverDir, public_assets_data_default[id].path)).catch((error) => {
		if (error?.code !== "ENOENT") throw error;
	});
}
// #nitro/virtual/public-assets
var publicAssetBases = { "/assets/": { "maxAge": 31536e3 } };
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
function getAsset(id) {
	return public_assets_data_default[id];
}
function hasAsset(id = "") {
	return !!(public_assets_data_default[id] || public_assets_data_default[id + ".gz"] || public_assets_data_default[id + ".br"] || public_assets_data_default[id + ".zst"]);
}
// node_modules/nitro/dist/runtime/internal/static.mjs
var METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
var EncodingMap = {
	gzip: ".gz",
	br: ".br",
	zstd: ".zst"
};
var noCacheHeaders = { "cache-control": "no-store" };
var static_default = defineHandler((event) => {
	if (event.req.method && !METHODS.has(event.req.method)) return;
	const path = l(o(event.url.pathname));
	let id = path.includes("%") ? n(path) : path;
	if (!hasAsset(id) && !hasAsset(d(id, "index.html")) && !isPublicAssetURL(id)) return;
	let asset;
	const encodings = [...(event.req.headers.get("accept-encoding") || "").split(",").map((entry) => {
		const [name, ...parameters] = entry.split(";");
		const quality = parameters.map((parameter) => parameter.trim().split("=")).find(([key]) => key.toLowerCase() === "q")?.[1];
		const weight = quality === void 0 ? 1 : Number.parseFloat(quality);
		return {
			ext: EncodingMap[name.trim().toLowerCase()],
			weight: Number.isNaN(weight) ? 1 : weight
		};
	}).filter((entry) => entry.ext && entry.weight > 0).sort((a, b) => b.weight - a.weight || (a.ext < b.ext ? -1 : a.ext > b.ext ? 1 : 0)).map((entry) => entry.ext), ""];
	for (const encoding of encodings) for (const _id of [id + encoding, d(id, "index.html" + encoding)]) {
		const _asset = getAsset(_id);
		if (_asset) {
			asset = _asset;
			id = _id;
			break;
		}
	}
	if (!asset) {
		if (isPublicAssetURL(id)) throw new HTTPError({
			status: 404,
			headers: noCacheHeaders
		});
		return;
	}
	if (encodings.length > 1) event.res.headers.append("Vary", "Accept-Encoding");
	if (event.req.headers.get("if-none-match") === asset.etag) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	const ifModifiedSinceH = event.req.headers.get("if-modified-since");
	const mtimeDate = new Date(asset.mtime);
	if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	if (asset.type) event.res.headers.set("Content-Type", asset.type);
	if (asset.etag && !event.res.headers.has("ETag")) event.res.headers.set("ETag", asset.etag);
	if (asset.mtime && !event.res.headers.has("Last-Modified")) event.res.headers.set("Last-Modified", mtimeDate.toUTCString());
	if (asset.encoding && !event.res.headers.has("Content-Encoding")) event.res.headers.set("Content-Encoding", asset.encoding);
	if (asset.size > 0 && !event.res.headers.has("Content-Length")) event.res.headers.set("Content-Length", asset.size.toString());
	const data = readAsset(id);
	return typeof data?.then === "function" ? data.then((resolved) => assertAssetData(resolved)) : assertAssetData(data);
});
function assertAssetData(data) {
	if (data === null || data === void 0) throw new HTTPError({
		status: 404,
		headers: noCacheHeaders
	});
	return data;
}
// #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = {
		route: "/assets/**",
		rank: 0,
		rules: [{
			name: "headers",
			route: "/assets/**",
			handler: headers,
			options: { "cache-control": "public, max-age=31536000, immutable" }
		}]
	};
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1);
		let s = p.split("/");
		let l = s.length;
		let _w;
		if (l > 1) {
			if (s[1] === "assets") r.push(l > 2 ? {
				data: $0,
				params: {
					"0": _w = p.slice(8),
					_: _w
				}
			} : {
				data: $0,
				params: {}
			});
		}
		return r.reverse();
	};
})();
var _lazy_4dc20d745da81fc4 = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_4dc20d745da81fc4
	};
	return ((_m, p) => {
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1);
		const w = p.slice(1);
		return {
			data,
			params: w ? {
				"0": w,
				_: w
			} : {}
		};
	});
})();
var globalMiddleware = [toEventHandler(static_default)].filter(Boolean);
// node_modules/nitro/dist/runtime/internal/error/utils.mjs
function createErrorHeaders(error, event, unhandled) {
	const headers = new Headers(unhandled ? {} : error.headers);
	const errHeaders = event.res?.errHeaders;
	if (errHeaders) for (const [name, value] of errHeaders) if (name === "set-cookie") headers.append(name, value);
	else headers.set(name, value);
	return headers;
}
// node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new NodeResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = createErrorHeaders(error, event, unhandled);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
// #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
// #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => {
		event.context.routeRules = getRouteRules(event.req.method, event.url.pathname).routeRules;
		if (event.req.method === "HEAD") {
			const route = findRoute("HEAD", event.url.pathname);
			return route?.data.method ? route : findRoute("GET", event.url.pathname);
		}
		return findRoute(event.req.method, event.url.pathname);
	};
	h3App["~middleware"].push(createRouteRulesMiddleware());
	h3App["~middleware"].push(...globalMiddleware);
	h3App["~middleware"].push(createCacheRuleMiddleware());
	return h3App;
}
// node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new t$1();
}
function getRouteRules(method, pathname) {
	return matchRouteRules(method, pathname);
}
function createRouteRulesMiddleware() {
	const middleware = (event, next) => {
		const { rules, cache } = resolveRouteRuleChains(event.req.method, event.url.pathname);
		if (cache) event[kCacheRule] = cache;
		return rules ? rules(event, next) : next();
	};
	return markUntraced(middleware);
}
function createCacheRuleMiddleware() {
	const middleware = (event, next) => {
		const cache = event[kCacheRule];
		return cache ? cache(event, next) : next();
	};
	return markUntraced(middleware);
}
var _matchRouteRules;
function matchRouteRules(method, pathname) {
	return (_matchRouteRules ??= memoizeRouteRulesMatcher(createMatcherFromFind(findRouteRules)))(method, pathname);
}
var kCacheRule = /* @__PURE__ */ Symbol("nitro.cacheRule");
var _routeRuleChains = /* @__PURE__ */ new WeakMap();
function resolveRouteRuleChains(method, pathname) {
	const { matchedRules, routeRuleMiddleware } = matchRouteRules(method, pathname);
	if (routeRuleMiddleware.length === 0) return {};
	let chains = _routeRuleChains.get(routeRuleMiddleware);
	if (!chains) {
		const hasCache = !!matchedRules.cache?.handler;
		const rules = hasCache ? routeRuleMiddleware.slice(0, -1) : routeRuleMiddleware;
		chains = {
			rules: rules.length > 0 ? composeMiddleware(rules) : void 0,
			cache: hasCache ? routeRuleMiddleware.at(-1) : void 0
		};
		_routeRuleChains.set(routeRuleMiddleware, chains);
	}
	return chains;
}
function markUntraced(middleware) {
	middleware.__traced__ = true;
	return middleware;
}
// node_modules/nitro/dist/runtime/internal/error/hooks.mjs
function _captureError(error, type) {
	console.error(`[${type}]`, error);
	useNitroApp().captureError?.(error, { tags: [type] });
}
function trapUnhandledErrors() {
	process.on("unhandledRejection", (error) => _captureError(error, "unhandledRejection"));
	process.on("uncaughtException", (error) => _captureError(error, "uncaughtException"));
}
// #nitro/virtual/server-entry
var serverEntryOptions = {};
// #nitro/virtual/tracing
var tracingSrvxPlugins = [];
// node_modules/nitro/dist/runtime/internal/serve.mjs
function resolveServeOptions(opts) {
	const { port, hostname, tls, ...entryOptions } = serverEntryOptions;
	const env = globalThis.process?.env || {};
	const _parsedPort = Number.parseInt(env.NITRO_PORT ?? env.PORT ?? "");
	const cert = env.NITRO_SSL_CERT;
	const key = env.NITRO_SSL_KEY;
	const socketPath = env.NITRO_UNIX_SOCKET;
	const resolved = {
		...entryOptions,
		port: Number.isNaN(_parsedPort) ? port ?? 3e3 : _parsedPort,
		hostname: env.NITRO_HOST || env.HOST || hostname,
		tls: cert && key ? {
			cert,
			key
		} : tls,
		...opts,
		plugins: [...tracingSrvxPlugins, ...opts.plugins || []]
	};
	for (const runtime of [
		"node",
		"bun",
		"deno"
	]) if (entryOptions[runtime] && opts[runtime]) resolved[runtime] = {
		...entryOptions[runtime],
		...opts[runtime]
	};
	if (socketPath) {
		resolved.node = {
			...resolved.node,
			path: socketPath
		};
		resolved.bun = {
			...resolved.bun,
			unix: socketPath
		};
		resolved.deno = {
			...resolved.deno,
			path: socketPath
		};
	}
	return resolved;
}
// node_modules/nitro/dist/runtime/internal/shutdown.mjs
function setupCloseHooks(server) {
	const closeServer = server.close.bind(server);
	let closeHooks;
	server.close = (closeActiveConnections) => closeServer(closeActiveConnections).finally(() => closeHooks ??= callCloseHooks());
}
async function callCloseHooks() {
	try {
		await useNitroHooks().callHook("close");
	} catch (error) {
		console.error("[nitro] Error while calling `close` hooks:", error);
	}
}
// node_modules/nitro/dist/presets/node/runtime/node-server.mjs
var nitroApp = useNitroApp();
var server = serve(resolveServeOptions({ fetch: nitroApp.fetch }));
server.ready().catch((error) => {
	console.error("[nitro] Failed to start server:", error);
	process.exit(1);
});
setupCloseHooks(server);
trapUnhandledErrors();
var node_server_default = {};
export { node_server_default as default };
