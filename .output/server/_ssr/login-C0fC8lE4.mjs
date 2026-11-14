import { __toESM } from "../_runtime.mjs";
import { require_react } from "../_libs/react.mjs";
import { useNavigate } from "../_libs/@tanstack/react-router+[3...].mjs";
import { require_jsx_runtime } from "../_libs/react2.mjs";
import { browserLocalPersistence, browserSessionPersistence, setPersistence, signInWithEmailAndPassword, signInWithPopup } from "../_libs/firebase__auth.mjs";
import "../_libs/firebase2.mjs";
import { Lock } from "../_libs/lucide-react36.mjs";
import { LogIn } from "../_libs/lucide-react37.mjs";
import { Mail } from "../_libs/lucide-react39.mjs";
import { auth, googleProvider, safeReturnTo } from "./router-DtpLq15p.mjs";
import { AuthLayout } from "./AuthLayout-BKLXPEpB.mjs";
import { Input, Label } from "./label-D9OP1Q-n.mjs";
import { AuthError, AuthLink, OrDivider, SubmitButton } from "./parts-DC-5Otov.mjs";
// node_modules/.nitro/vite/services/ssr/assets/login-C0fC8lE4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LoginPage() {
	const navigate = useNavigate();
	const rawReturnTo = safeReturnTo();
	const targetRoute = rawReturnTo && rawReturnTo !== "/" && rawReturnTo !== "/login" ? rawReturnTo : "/dashboard";
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [rememberMe, setRememberMe] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function submit(e) {
		e.preventDefault();
		setError("");
		setBusy(true);
		try {
			await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
			await signInWithEmailAndPassword(auth, email, password);
			setTimeout(() => {
				navigate({ to: targetRoute });
			}, 500);
		} catch (err) {
			console.error(err);
			if (err.code === "auth/invalid-credential" || err.code === "auth/wrong-password") setError("Correo o contraseña incorrectos.");
			else if (err.code === "auth/user-not-found") setError("No existe una cuenta con este correo.");
			else setError("Error al iniciar sesión. Inténtalo de nuevo.");
			setBusy(false);
		}
	}
	async function handleGoogleLogin() {
		setError("");
		setBusy(true);
		try {
			await setPersistence(auth, browserLocalPersistence);
			await signInWithPopup(auth, googleProvider);
			setTimeout(() => {
				navigate({ to: "/dashboard" });
			}, 500);
		} catch (err) {
			console.error(err);
			setError(err.message || "Error al conectar con Google.");
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthLayout, {
		icon: LogIn,
		title: "Bienvenido de nuevo",
		subtitle: "Inicia sesión en tu cuenta",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: handleGoogleLogin,
				disabled: busy,
				className: "flex w-full items-center justify-center gap-3 rounded-lg bg-white py-3 text-sm font-medium text-black transition-colors hover:bg-gray-100 disabled:opacity-50",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
					viewBox: "0 0 24 24",
					className: "h-5 w-5",
					"aria-hidden": "true",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z",
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
				}), "Continuar con Google"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrDivider, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthError, { children: error }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: submit,
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "login-email",
							children: "Email"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, {
								className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground",
								"aria-hidden": "true"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "login-email",
								type: "email",
								autoComplete: "email",
								autoFocus: true,
								placeholder: "tu@email.com",
								value: email,
								onChange: (e) => setEmail(e.target.value),
								className: "pl-10"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "login-password",
								children: "Contraseña"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthLink, {
								to: "/forgot-password",
								returnTo: targetRoute,
								className: "text-xs text-primary hover:underline",
								children: "¿Olvidaste tu contraseña?"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, {
								className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground",
								"aria-hidden": "true"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "login-password",
								type: "password",
								autoComplete: "current-password",
								placeholder: "••••••••",
								value: password,
								onChange: (e) => setPassword(e.target.value),
								className: "pl-10"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center space-x-2 pt-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							id: "rememberMe",
							checked: rememberMe,
							onChange: (e) => setRememberMe(e.target.checked),
							className: "h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "rememberMe",
							className: "text-sm text-muted-foreground cursor-pointer select-none",
							children: "Recordar mi sesión"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubmitButton, {
						busy,
						busyLabel: "Iniciando...",
						children: "Iniciar sesión"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-6 text-center text-sm text-muted-foreground",
				children: [
					"¿No tienes una cuenta?",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthLink, {
						to: "/register",
						returnTo: targetRoute,
						children: "Crea una ahora"
					})
				]
			})
		]
	});
}
var SplitComponent = LoginPage;
export { SplitComponent as component };
