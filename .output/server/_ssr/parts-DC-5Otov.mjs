import { Link } from "../_libs/@tanstack/react-router+[2...].mjs";
import { require_jsx_runtime } from "../_libs/react2.mjs";
import { LoaderCircle } from "../_libs/lucide-react35.mjs";
import { Button, returnToSearch } from "./router-DtpLq15p.mjs";
import "./label-D9OP1Q-n.mjs";
// node_modules/.nitro/vite/services/ssr/assets/parts-DC-5Otov.js
var import_jsx_runtime = require_jsx_runtime();
function AuthError({ children }) {
	if (!children) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "alert",
		className: "mb-4 rounded-lg bg-destructive/10 p-3 text-sm text-destructive",
		children
	});
}
function SubmitButton({ busy, busyLabel, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		type: "submit",
		className: "h-12 w-full font-medium",
		disabled: busy,
		...props,
		children: busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
			className: "mr-2 h-4 w-4 animate-spin",
			"aria-hidden": "true"
		}), busyLabel] }) : children
	});
}
function OrDivider() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative mb-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-0 flex items-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-full border-t border-border" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative flex justify-center text-xs uppercase",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "bg-card px-3 text-muted-foreground",
				children: "or"
			})
		})]
	});
}
function AuthLink({ to, returnTo, className = "font-medium text-primary hover:underline", children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to,
		search: returnToSearch(returnTo),
		className,
		children
	});
}
export { AuthError, AuthLink, OrDivider, SubmitButton };
