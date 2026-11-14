import { __toESM } from "../_runtime.mjs";
import { require_react } from "../_libs/react.mjs";
import { require_jsx_runtime } from "../_libs/react2.mjs";
import { cva } from "../_libs/class-variance-authority+clsx.mjs";
import { base44, cn, getAppParams } from "./router-DtpLq15p.mjs";
import { Root } from "../_libs/radix-ui__react-label.mjs";
// node_modules/.nitro/vite/services/ssr/assets/label-D9OP1Q-n.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function GoogleIcon({ className = "h-5 w-5" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		className,
		viewBox: "0 0 24 24",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z",
				fill: "#4285F4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z",
				fill: "#34A853"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z",
				fill: "#FBBC05"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z",
				fill: "#EA4335"
			})
		]
	});
}
var appId = () => getAppParams().appId;
var PKCE_KEY = () => `app-mfa-pkce:${appId()}`;
var encode = (bytes) => btoa(String.fromCharCode(...bytes)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
var MfaError = class extends Error {
	constructor(message, status, retryAfter) {
		super(message);
		this.status = status;
		this.retryAfter = retryAfter;
	}
	get mustSignInAgain() {
		return this.status === 401;
	}
};
function authPath(suffix) {
	if (!/^[a-f0-9]{24}$/i.test(appId())) throw new Error("Invalid app ID");
	return `/api/apps/${appId()}/auth/${suffix}`;
}
async function request(suffix, { method = "POST", body, token, headers } = {}) {
	const response = await fetch(authPath(suffix), {
		method,
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
			...token ? { Authorization: `Bearer ${token}` } : {},
			...headers
		},
		body: body === void 0 ? void 0 : JSON.stringify(body)
	});
	const result = await response.json().catch(() => ({}));
	if (!response.ok) throw new MfaError(result.error?.message || result.detail || "Something went wrong. Try again.", response.status, Number(response.headers.get("Retry-After")) || null);
	return result;
}
function mfaSession(challenge) {
	let credential = challenge.mfa_session_token;
	const call = async (suffix, body, method) => {
		const result = await request(`mfa/${suffix}`, {
			method,
			body,
			token: credential
		});
		if (result.mfa_management_token) credential = result.mfa_management_token;
		if (result.access_token) base44.auth.setToken(result.access_token);
		return result;
	};
	return {
		verify: (code, method, rememberDevice) => call("verify", {
			code,
			method,
			remember_device: rememberDevice
		}),
		sendSignInCode: () => call("resend"),
		setupAuthenticator: () => call("totp/setup", {}),
		confirmAuthenticator: (code, rememberDevice = false) => call("totp/verify", {
			code,
			remember_device: rememberDevice
		}),
		sendPhoneCode: (phoneNumber) => call("sms/send-code", { phone_number: phoneNumber }),
		confirmPhone: (code, rememberDevice = false) => call("sms/verify", {
			code,
			remember_device: rememberDevice
		}),
		status: () => call("status", void 0, "GET"),
		sendProofCode: () => call("sms/send-code", { phone_number: "" }),
		removeMethod: (method, code, proofMethod) => call("disable", {
			method,
			code,
			verification_method: proofMethod
		}),
		forgetDevices: (code, proofMethod) => call("trusted-devices/clear", {
			code,
			method: proofMethod
		})
	};
}
function signInToManageMfa(email, password) {
	return request("login", {
		body: {
			email,
			password
		},
		headers: { "X-App-Mfa-Action": "manage" }
	});
}
var resumed;
function resumeMfa() {
	resumed ||= (async () => {
		const params = new URLSearchParams(window.location.search);
		const code = params.get("mfa_code");
		if (!code) return null;
		const verifier = sessionStorage.getItem(PKCE_KEY());
		sessionStorage.removeItem(PKCE_KEY());
		params.delete("mfa_code");
		const rest = params.toString();
		window.history.replaceState(null, "", `${window.location.pathname}${rest ? `?${rest}` : ""}`);
		const result = await request("mfa/exchange", { body: {
			code,
			code_verifier: verifier
		} });
		if (result.access_token) base44.auth.setToken(result.access_token);
		return result;
	})();
	return resumed;
}
var isInAppBrowser = () => /LinkedIn|Twitter/i.test(navigator.userAgent);
async function loadSignInOptions() {
	const response = await fetch(`/api/apps/public/login-info/by-id/${appId()}`);
	if (!response.ok) throw new Error("Unable to load sign-in options");
	return response.json();
}
async function signInWithProvider(provider, returnTo, { manage = false } = {}) {
	const info = await loadSignInOptions();
	if (!manage && (info.auth_config?.mfa_policy !== "required" || provider === "sso")) return base44.auth.loginWithProvider(provider, returnTo);
	if (isInAppBrowser()) {
		const url = new URL("/auth/mfa", window.location.origin);
		url.search = new URLSearchParams({
			app_id: appId(),
			oauth_start: provider,
			from_url: returnTo,
			...manage ? { security: "1" } : {}
		});
		window.location.assign(url.href);
		return;
	}
	const verifier = encode(crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(32)));
	const challenge = encode(new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(verifier))));
	sessionStorage.setItem(PKCE_KEY(), verifier);
	const workspaceSso = provider === "sso" && info.auth_config?.use_workspace_sso && info.organization_id;
	const path = provider === "sso" ? workspaceSso ? `/api/apps/${info.organization_id}/${appId()}/auth/sso/login` : `/api/apps/${appId()}/auth/sso/login` : `/api/apps/auth${provider === "google" ? "" : `/${provider}`}/login`;
	const url = new URL(path, window.location.origin);
	url.search = new URLSearchParams({
		from_url: new URL(returnTo, window.location.origin).href,
		...workspaceSso ? {} : { app_id: appId() },
		...manage ? { app_mfa_action: "manage" } : {},
		app_mfa_code_challenge: challenge,
		app_mfa_return: "/mfa"
	});
	window.location.assign(url.href);
}
function finishSignIn(accessToken, returnTo) {
	if (new URLSearchParams(window.location.search).get("popup") === "1" && window.opener) {
		window.opener.postMessage({ access_token: accessToken }, window.location.origin);
		window.close();
		return;
	}
	window.location.href = returnTo;
}
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Input.displayName = "Input";
var labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");
var Label = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	className: cn(labelVariants(), className),
	...props
}));
Label.displayName = Root.displayName;
export { GoogleIcon, Input, Label, finishSignIn, loadSignInOptions, mfaSession, resumeMfa, signInToManageMfa, signInWithProvider };
