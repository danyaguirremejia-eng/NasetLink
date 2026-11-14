import { __toESM } from "../_runtime.mjs";
import { require_react } from "../_libs/react.mjs";
import { Link } from "../_libs/@tanstack/react-router+[2...].mjs";
import { require_jsx_runtime } from "../_libs/react2.mjs";
import { Lock } from "../_libs/lucide-react36.mjs";
import { TriangleAlert } from "../_libs/lucide-react54.mjs";
import { base44 } from "./router-DtpLq15p.mjs";
import { AuthLayout } from "./AuthLayout-BKLXPEpB.mjs";
import { Input, Label } from "./label-D9OP1Q-n.mjs";
import { AuthError, SubmitButton } from "./parts-DC-5Otov.mjs";
// node_modules/.nitro/vite/services/ssr/assets/reset-password-IG06ZULE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ResetPasswordPage() {
	const token = new URLSearchParams(window.location.search).get("token");
	const [password, setPassword] = (0, import_react.useState)("");
	const [confirm, setConfirm] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function submit(e) {
		e.preventDefault();
		setError("");
		if (password !== confirm) {
			setError("Passwords do not match");
			return;
		}
		setBusy(true);
		try {
			await base44.auth.resetPassword({
				resetToken: token,
				newPassword: password
			});
			window.location.href = "/login";
		} catch (err) {
			setError(err.message || "Failed to reset password");
			setBusy(false);
		}
	}
	if (!token) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthLayout, {
		icon: TriangleAlert,
		title: "Invalid reset link",
		subtitle: "This password reset link is missing or invalid",
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/forgot-password",
			className: "font-medium text-primary hover:underline",
			children: "Request a new link"
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-center text-sm text-foreground",
			children: "The link you used appears to be incomplete. Please request a new password reset email."
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthLayout, {
		icon: Lock,
		title: "New password",
		subtitle: "Enter your new password below",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthError, { children: error }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: submit,
			className: "space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "reset-password",
						children: "New password"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, {
							className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground",
							"aria-hidden": "true"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "reset-password",
							type: "password",
							autoComplete: "new-password",
							autoFocus: true,
							placeholder: "••••••••",
							value: password,
							onChange: (e) => setPassword(e.target.value),
							className: "h-12 pl-10",
							required: true
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "reset-confirm",
						children: "Confirm password"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, {
							className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground",
							"aria-hidden": "true"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "reset-confirm",
							type: "password",
							autoComplete: "new-password",
							placeholder: "••••••••",
							value: confirm,
							onChange: (e) => setConfirm(e.target.value),
							className: "h-12 pl-10",
							required: true
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubmitButton, {
					busy,
					busyLabel: "Resetting...",
					children: "Reset password"
				})
			]
		})]
	});
}
var SplitComponent = ResetPasswordPage;
export { SplitComponent as component };
