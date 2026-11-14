import { __toESM } from "../_runtime.mjs";
import { require_react } from "../_libs/react.mjs";
import { require_jsx_runtime } from "../_libs/react2.mjs";
import { ArrowLeft } from "../_libs/lucide-react3.mjs";
import { Mail } from "../_libs/lucide-react39.mjs";
import { base44, safeReturnTo } from "./router-DtpLq15p.mjs";
import { AuthLayout } from "./AuthLayout-BKLXPEpB.mjs";
import { Input, Label } from "./label-D9OP1Q-n.mjs";
import { AuthLink, SubmitButton } from "./parts-DC-5Otov.mjs";
// node_modules/.nitro/vite/services/ssr/assets/forgot-password-QhRFvF-z.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ForgotPasswordPage() {
	const returnTo = safeReturnTo();
	const [email, setEmail] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [sent, setSent] = (0, import_react.useState)(false);
	async function submit(e) {
		e.preventDefault();
		setBusy(true);
		try {
			await base44.auth.resetPasswordRequest(email);
		} catch {} finally {
			setBusy(false);
			setSent(true);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthLayout, {
		icon: Mail,
		title: "Reset password",
		subtitle: "We'll send you a link to reset it",
		children: [sent ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-center text-sm text-foreground",
			children: "If an account exists with that email, you'll receive a password reset link shortly."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: submit,
			className: "space-y-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "forgot-email",
					children: "Email address"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, {
						className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground",
						"aria-hidden": "true"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "forgot-email",
						type: "email",
						autoComplete: "email",
						autoFocus: true,
						placeholder: "you@example.com",
						value: email,
						onChange: (e) => setEmail(e.target.value),
						className: "h-12 pl-10",
						required: true
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubmitButton, {
				busy,
				busyLabel: "Sending...",
				children: "Send reset link"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-6 text-center text-sm text-muted-foreground",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthLink, {
				to: "/login",
				returnTo,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
					className: "mr-1 inline h-3 w-3",
					"aria-hidden": "true"
				}), "Back to log in"]
			})
		})]
	});
}
var SplitComponent = ForgotPasswordPage;
export { SplitComponent as component };
