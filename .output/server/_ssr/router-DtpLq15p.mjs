import { __toESM } from "../_runtime.mjs";
import { require_react } from "../_libs/react.mjs";
import { ErrorComponent, Outlet, redirect, rootRouteId, useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { Link } from "../_libs/@tanstack/react-router+[2...].mjs";
import { HeadContent, Scripts, createFileRoute, createRootRoute, createRouter, lazyRouteComponent, useMatch } from "../_libs/@tanstack/react-router+[3...].mjs";
import { require_jsx_runtime } from "../_libs/react2.mjs";
import { TSS_SERVER_FUNCTION, createServerFn, getServerFnById } from "./ssr.mjs";
import { createClient, getAccessToken } from "../_libs/@base44/sdk+[...].mjs";
import { requireUser } from "./auth-middleware-Ag8cE1no.mjs";
import { clsx, cva } from "../_libs/class-variance-authority+clsx.mjs";
import { twMerge } from "../_libs/tailwind-merge.mjs";
import { Slot } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { initializeApp } from "../_libs/@firebase/app+[...].mjs";
import "../_libs/firebase.mjs";
import { getFirestore } from "../_libs/@firebase/firestore+[...].mjs";
import { GoogleAuthProvider, getAuth } from "../_libs/firebase__auth.mjs";
import "../_libs/firebase2.mjs";
import { literal, number, object, string, union } from "../_libs/zod.mjs";
import { queryOptions, useQuery, useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { QueryClient } from "../_libs/tanstack__query-core.mjs";
import { setupRouterSsrQueryIntegration } from "../_libs/@tanstack/react-router-ssr-query+[...].mjs";
import { z } from "../_libs/next-themes.mjs";
import { Toaster } from "../_libs/sonner.mjs";
// node_modules/.nitro/vite/services/ssr/assets/utils-C7v5BdHf.js
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
// node_modules/.nitro/vite/services/ssr/assets/button-CUnuFrCk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
			destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
			outline: "border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 px-4 py-2",
			sm: "h-8 rounded-md px-3 text-xs",
			lg: "h-10 rounded-md px-8",
			icon: "h-9 w-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
// node_modules/.nitro/vite/services/ssr/assets/authReturnTo-CgzxtxRl.js
var isBrowser = typeof window !== "undefined";
var isClearAccessTokenRequested = () => isBrowser && new URLSearchParams(window.location.search).get("clear_access_token") === "true";
var clearStoredAccessToken = () => {
	window.localStorage.removeItem("base44_access_token");
	window.localStorage.removeItem("token");
};
function getAppParams() {
	if (isClearAccessTokenRequested()) clearStoredAccessToken();
	return {
		appId: "6af74d7fd9f16f91b69c2f83",
		token: isBrowser ? getAccessToken() : null,
		functionsVersion: isBrowser && new URLSearchParams(window.location.search).get("functions_version")?.trim() || void 0,
		appBaseUrl: void 0
	};
}
var { appId, token, functionsVersion, appBaseUrl } = getAppParams();
var base44 = createClient({
	appId,
	token: token ?? void 0,
	functionsVersion,
	serverUrl: typeof window !== "undefined" ? "/api" : "",
	appBaseUrl: typeof window !== "undefined" ? window.location.origin : appBaseUrl
});
var AUTH_PAGES = /* @__PURE__ */ new Set([
	"/login",
	"/register",
	"/forgot-password",
	"/reset-password"
]);
function safeReturnTo(search) {
	if (typeof window === "undefined") return "/";
	const params = new URLSearchParams(search ?? window.location.search);
	return sanitizeReturnTo(params.get("returnTo") || params.get("from_url"));
}
function sanitizeReturnTo(raw) {
	if (!raw || typeof window === "undefined") return "/";
	try {
		const url = new URL(raw, window.location.origin);
		if (url.origin !== window.location.origin) return "/";
		for (const p of [
			"access_token",
			"clear_access_token",
			"app_id",
			"app_base_url",
			"functions_version",
			"from_url",
			"returnTo"
		]) url.searchParams.delete(p);
		if (AUTH_PAGES.has(url.pathname.replace(/\/+$/, "") || "/")) return "/";
		const path = url.pathname + url.search;
		if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return "/";
		return path;
	} catch {
		return "/";
	}
}
function currentPath() {
	if (typeof window === "undefined") return "/";
	return sanitizeReturnTo(window.location.pathname + window.location.search);
}
function currentUrl() {
	if (typeof window === "undefined") return "/";
	return window.location.origin + currentPath();
}
function returnToSearch(returnTo) {
	return returnTo && returnTo !== "/" ? { returnTo } : {};
}
// node_modules/.nitro/vite/services/ssr/assets/firebase-Bb2bUno6.js
var app = initializeApp({
	apiKey: "AIzaSyCSBxC7y0rZ9dj_F2M5xMk7PS7wLUOLJfY",
	authDomain: "dany-protect-app.firebaseapp.com",
	projectId: "dany-protect-app",
	storageBucket: "dany-protect-app.appspot.com",
	messagingSenderId: "800991664439",
	appId: "1:80099166439:web:a3425b63c1fc45c1d5ba42"
});
var auth = getAuth(app);
var googleProvider = new GoogleAuthProvider();
var db = getFirestore(app);
// node_modules/.nitro/vite/services/ssr/assets/createSsrRpc-d_oSGH4g.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
// node_modules/.nitro/vite/services/ssr/assets/router-DtpLq15p.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
function DefaultCatchBoundary({ error }) {
	const router = useRouter();
	const isRoot = useMatch({
		strict: false,
		select: (state) => state.id === rootRouteId
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex max-w-2xl flex-col items-center gap-4 py-24",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorComponent, { error }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				onClick: () => router.invalidate(),
				children: "Try again"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				children: isRoot ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					children: "Home"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					onClick: (e) => {
						e.preventDefault();
						window.history.back();
					},
					children: "Go back"
				})
			})]
		})]
	});
}
function NotFound({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex max-w-lg flex-col items-center gap-4 py-24 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-6xl font-semibold tracking-tight",
				children: "404"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground",
				children: children ?? "The page you are looking for does not exist."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: () => window.history.back(),
					children: "Go back"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						children: "Start over"
					})
				})]
			})
		]
	});
}
var Toaster$1 = ({ ...props }) => {
	const { theme = "system" } = z();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		theme,
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
/**
* The visitor, resolved once per page load and cached in the router's QueryClient:
* the login gate (src/components/auth/AuthGate.jsx) reads it with
* `context.queryClient.ensureQueryData(authQuery)`, components with `useAuth()`.
* Resolves to `{ user, error }`: an anonymous visitor (no token, or a 401/403) is `{ user: null, error: null }`.
* Anything else, an outage (429, 503) or a request that never got an answer, rejects instead,
* so it is never cached as "signed out" and the next read asks again.
*/
var authQuery = queryOptions({
	queryKey: ["auth", "me"],
	queryFn: async () => {
		if (!base44.auth.hasToken()) return {
			user: null,
			error: null
		};
		try {
			return {
				user: await base44.auth.me(),
				error: null
			};
		} catch (err) {
			if (err?.data?.extra_data?.reason === "user_not_registered") return {
				user: null,
				error: {
					type: "user_not_registered",
					message: "Not registered"
				}
			};
			if (err?.status === 401 || err?.status === 403) return {
				user: null,
				error: null
			};
			throw err;
		}
	},
	staleTime: Infinity,
	retry: false
});
var AuthContext = (0, import_react.createContext)(null);
/**
* Client-side session state. The server renders every page anonymously and the
* query only runs in the browser after hydration, so the first client render
* matches the server markup. Gate user-specific UI on `isLoadingAuth`.
*/
function AuthProvider({ children }) {
	const queryClient = useQueryClient();
	const { data, error, isPending } = useQuery(authQuery);
	const value = (0, import_react.useMemo)(() => ({
		user: data?.user ?? null,
		isAuthenticated: !!data?.user,
		isLoadingAuth: isPending,
		authError: data?.error ?? (error ? {
			type: "unknown",
			message: error.message ?? "Failed to load session"
		} : null),
		refresh: () => queryClient.fetchQuery({
			...authQuery,
			staleTime: 0
		}),
		logout: () => {
			queryClient.setQueryData(authQuery.queryKey, {
				user: null,
				error: null
			});
			base44.auth.logout(window.location.origin);
		},
		navigateToLogin: () => base44.auth.redirectToLogin(currentUrl())
	}), [
		data,
		error,
		isPending,
		queryClient
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthContext.Provider, {
		value,
		children
	});
}
function useAuth() {
	const ctx = (0, import_react.useContext)(AuthContext);
	if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
	return ctx;
}
var SCRIPTS = [{ "children": "\nif (window.self === window.top) {\n  let lastPath = \"\";\n  // The visitor's analytics_storage choice from window.__b44Consent; null until one is known.\n  let consentGranted = null;\n  function getPageNameFromPath(path) {\n    const segments = path.split(\"/\").filter(Boolean);\n    return segments[0] || null;\n  }\n  // Same rules as @base44/sdk analytics. Read on every send: the server sets the meta.\n  function analyticsMode() {\n    const meta = document.querySelector('meta[name=\"base44-analytics\"]');\n    return meta ? meta.getAttribute(\"content\") : null;\n  }\n  function deniedBefore() {\n    try {\n      return window.localStorage.getItem(\"base44_analytics_denied\") === \"1\";\n    } catch (e) {\n      return false;\n    }\n  }\n  function mayTrack() {\n    const mode = analyticsMode();\n    if (mode === \"off\") return false;\n    if (mode === \"consent\") return consentGranted === true;\n    if (mode === \"on\") return consentGranted === null ? !deniedBefore() : consentGranted;\n    return true;\n  }\n  function trackPageView() {\n    if (!mayTrack()) return;\n    const path = window.location.pathname;\n    if (path === lastPath) return;\n    lastPath = path;\n    const pageName = getPageNameFromPath(path) || \"home\";\n    const appId = \"6af74d7fd9f16f91b69c2f83\";\n    if (!appId) return;\n    fetch(`/api/app-logs/${appId}/log-user-in-app/${pageName}`, {\n      method: \"POST\",\n    }).catch(() => {});\n  }\n  const originalPushState = history.pushState.bind(history);\n  history.pushState = function (...args) {\n    originalPushState(...args);\n    trackPageView();\n  };\n  const originalReplaceState = history.replaceState.bind(history);\n  history.replaceState = function (...args) {\n    originalReplaceState(...args);\n    trackPageView();\n  };\n  window.addEventListener(\"popstate\", trackPageView);\n  // A module script runs after the head's classic scripts, so the listener exists by now.\n  // Without it, \"consent\" never sends and \"on\" relies on the saved Decline only.\n  try {\n    if (window.__b44Consent) {\n      window.__b44Consent.on(\n        \"analytics_storage\",\n        function () {\n          consentGranted = true;\n          trackPageView();\n        },\n        function () {\n          consentGranted = false;\n          // A later grant sends the page the visitor is on, even one they saw before.\n          lastPath = \"\";\n        }\n      );\n    }\n  } catch (e) {}\n  trackPageView();\n}\n" }];
function Base44Scripts() {
	return (0, import_react.createElement)(import_react.Fragment, null, ...SCRIPTS.map((script, index) => "src" in script ? (0, import_react.createElement)("script", {
		key: index,
		type: script.classic ? void 0 : "module",
		src: script.src
	}) : (0, import_react.createElement)("script", {
		key: index,
		type: "module",
		suppressHydrationWarning: true,
		dangerouslySetInnerHTML: { __html: script.children }
	})));
}
var src_default = "/assets/index-BB4n_ggW.css";
var Route$26 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "NASETLINK" },
			{
				name: "description",
				content: "Acorta enlaces, comparte y gana dinero por cada visita."
			},
			{
				name: "theme-color",
				content: "#0f172a"
			}
		],
		links: [
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap"
			},
			{
				rel: "stylesheet",
				href: src_default
			}
		]
	}),
	errorComponent: DefaultCatchBoundary,
	notFoundComponent: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotFound, {}),
	shellComponent: RootDocument,
	component: RootComponent
});
function RootComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {})] });
}
function RootDocument({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			"data-react-root": "true",
			children: [
				children,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Base44Scripts, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	});
}
var $$splitComponentImporter$23 = () => import("./routes-MHqMaifz.mjs");
var Route$25 = createFileRoute("/")({
	head: () => ({ meta: [{ title: "NASETLINK — Monetiza tus enlaces como un profesional" }, {
		name: "description",
		content: "Acorta enlaces, compártelos y gana dinero por cada visita válida. Calcula tus ganancias y cobra por PayPal, cripto o transferencia."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$23, "component")
});
async function requireSignedIn({ location }) {
	await auth.authStateReady();
	const user = auth.currentUser;
	if (user) return { user };
	throw redirect({
		to: "/login",
		search: {
			returnTo: location.href,
			from_url: location.href
		}
	});
}
function AuthGateError({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DefaultCatchBoundary, { error });
}
var $$splitComponentImporter$22 = () => import("../_authed-DRUvY_vz.mjs");
var $$splitErrorComponentImporter = () => import("../_authed-BHIjAJ-s.mjs");
var Route$24 = createFileRoute("/_authed")({
	ssr: false,
	beforeLoad: requireSignedIn,
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent"),
	component: lazyRouteComponent($$splitComponentImporter$22, "component")
});
var $$splitComponentImporter$21 = () => import("./forgot-password-QhRFvF-z.mjs");
var Route$23 = createFileRoute("/forgot-password")({
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter$21, "component")
});
var $$splitComponentImporter$20 = () => import("./login-C0fC8lE4.mjs");
var Route$22 = createFileRoute("/login")({
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter$20, "component")
});
var $$splitComponentImporter$19 = () => import("./mfa-DrSdjWtT.mjs");
var Route$21 = createFileRoute("/mfa")({
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter$19, "component")
});
var $$splitComponentImporter$18 = () => import("./register-CxjRtrOf.mjs");
var Route$20 = createFileRoute("/register")({
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter$18, "component")
});
var $$splitComponentImporter$17 = () => import("./reset-password-IG06ZULE.mjs");
var Route$19 = createFileRoute("/reset-password")({
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter$17, "component")
});
var $$splitComponentImporter$16 = () => import("./admin-BVyOq6Tw.mjs");
var Route$18 = createFileRoute("/_authed/admin")({
	head: () => ({ meta: [{ title: "Admin Panel — NASETLINK" }] }),
	component: lazyRouteComponent($$splitComponentImporter$16, "component")
});
var $$splitComponentImporter$15 = () => import("./anuncios-CXiU61c7.mjs");
var Route$17 = createFileRoute("/_authed/anuncios")({
	head: () => ({ meta: [{ title: "Anuncios — NASETLINK" }] }),
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var $$splitComponentImporter$14 = () => import("./api-C4boMIj3.mjs");
var Route$16 = createFileRoute("/_authed/api")({
	head: () => ({ meta: [{ title: "API para desarrolladores — NASETLINK" }] }),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./dashboard-CDdfrQIB.mjs");
var Route$15 = createFileRoute("/_authed/dashboard")({
	head: () => ({ meta: [{ title: "Panel — NASETLINK" }, {
		name: "description",
		content: "Acorta tus enlaces, comparte y gana dinero."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./ganancias-CWH8q6og.mjs");
var Route$14 = createFileRoute("/_authed/ganancias")({
	head: () => ({ meta: [{ title: "Pagos y niveles — NASETLINK" }, {
		name: "description",
		content: "Tabla de pagos por cada 1000 clics según el nivel de anuncios."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./keys-B4SaV69y.mjs");
var Route$13 = createFileRoute("/_authed/keys")({
	head: () => ({ meta: [{ title: "Crear Key — NASETLINK" }] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./links-Cz3dLKiV.mjs");
var Route$12 = createFileRoute("/_authed/links")({
	head: () => ({ meta: [{ title: "Crear Enlace — NASETLINK" }] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./niveles-RN3rlK5h.mjs");
var Route$11 = createFileRoute("/_authed/niveles")({
	head: () => ({ meta: [{ title: "Niveles — NASETLINK" }] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./perfil-CDPIjBlT.mjs");
var Route$10 = createFileRoute("/_authed/perfil")({
	head: () => ({ meta: [{ title: "Mi Perfil — NASETLINK" }, {
		name: "description",
		content: "Revisa tu cuenta, tu nivel y tus estadísticas."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./personaliza-BO6MXVTe.mjs");
var Route$9 = createFileRoute("/_authed/personaliza")({
	head: () => ({ meta: [{ title: "Mi página — NASETLINK" }] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./ranking-DtApTBQI.mjs");
var Route$8 = createFileRoute("/_authed/ranking")({
	head: () => ({ meta: [{ title: "Ranking — NASETLINK" }] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./referidos-dMzRxZ5a.mjs");
var Route$7 = createFileRoute("/_authed/referidos")({
	head: () => ({ meta: [{ title: "Referidos — NASETLINK" }] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./retiros-CHkMiT-g.mjs");
var Route$6 = createFileRoute("/_authed/retiros")({
	head: () => ({ meta: [{ title: "Retiros — NASETLINK" }] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./stats-C-7CCoJQ.mjs");
var Route$5 = createFileRoute("/_authed/stats")({
	head: () => ({ meta: [{ title: "Estadísticas — NASETLINK" }] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./sugerencias-CU-6XAqH.mjs");
var Route$4 = createFileRoute("/_authed/sugerencias")({
	head: () => ({ meta: [{ title: "Muro de ideas — NASETLINK" }] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var Route$3 = createFileRoute("/api/time")({ server: { handlers: { GET: async () => Response.json({ now: (/* @__PURE__ */ new Date()).toISOString() }, { headers: { "cache-control": "no-store" } }) } } });
var CORS = {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Methods": "GET, OPTIONS",
	"Access-Control-Allow-Headers": "Content-Type",
	"Cache-Control": "no-store"
};
var json = (body, status = 200) => Response.json(body, {
	status,
	headers: CORS
});
var Route$2 = createFileRoute("/api/validate")({ server: { handlers: {
	OPTIONS: async () => new Response(null, {
		status: 204,
		headers: CORS
	}),
	GET: async ({ request, context }) => {
		const url = new URL(request.url);
		const keyParam = (url.searchParams.get("key") || "").trim().slice(0, 80);
		const device = (url.searchParams.get("device") || "").trim().slice(0, 120);
		if (!keyParam) return json({ status: "invalid" });
		const base44 = context.getBase44();
		const key = (await base44.asServiceRole.entities.LicenseKey.filter({ key_code: keyParam }, { limit: 1 }))?.items?.[0] ?? null;
		if (!key) return json({ status: "invalid" });
		const expires = key.expires_at ? new Date(key.expires_at).getTime() : 0;
		if (key.status !== "active" || !expires || expires < Date.now()) return json({ status: "invalid" });
		const limit = Number(key.device_limit) || 0;
		const devices = Array.isArray(key.devices) ? key.devices : [];
		if (limit > 0) {
			if (!device) {
				if (devices.length >= limit) return json({ status: "invalid" });
			} else if (!devices.includes(device)) {
				if (devices.length >= limit) return json({ status: "invalid" });
				await base44.asServiceRole.entities.LicenseKey.update(key.id, { devices: [...devices, device] });
			}
		}
		return json({
			status: "valid",
			expires: String(key.expires_at).slice(0, 10)
		});
	}
} } });
createServerFn({ method: "POST" }).middleware([requireUser]).validator(object({
	prefix: string().max(24),
	random_length: union([
		literal(4),
		literal(8),
		literal(12)
	]),
	duration_days: number().int().min(1).max(3650),
	device_limit: number().int().min(0).max(10)
})).handler(createSsrRpc("4e2b45df360fd11b57603163ecd8f1f66d4256cade5edafa88c9089c12e6da9e"));
createServerFn({ method: "GET" }).middleware([requireUser]).handler(createSsrRpc("047a1fba239503de0c6840b9e70c20e03437c3ecd444d60c98bb2926a220787a"));
var getDeliveryInfo = createServerFn({ method: "GET" }).validator(object({ id: string().min(1).max(64) })).handler(createSsrRpc("b8a502cda89d8be2e98b4807c3d3ad61f6ff9f5fc3da62da1763a9dd244e9309"));
var claimLicenseKey = createServerFn({ method: "POST" }).validator(object({ id: string().min(1).max(64) })).handler(createSsrRpc("3d0ded1cfd1e90aa6846e79420f524d71ef172f19df5ea80880b9a725a1e3f15"));
var $$splitComponentImporter$1 = () => import("./getkey._id-DL0PwCbK.mjs");
var Route$1 = createFileRoute("/getkey/$id")({
	head: () => ({ meta: [{ title: "Entrega de licencia — NASETLINK" }, {
		name: "description",
		content: "Mira los anuncios y recibe tu Key al instante."
	}] }),
	loader: async ({ params }) => getDeliveryInfo({ data: { id: params.id } }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var codeSchema = object({ code: string().min(4).max(24).regex(/^[a-zA-Z0-9]+$/) });
createServerFn({ method: "POST" }).validator(object({
	url: string().min(3).max(2048),
	userId: string()
})).handler(createSsrRpc("2ee32f3b9faa81fe37600782713735563100b5953ea185c57cdb982c5e110796"));
createServerFn({ method: "GET" }).validator(object({ userId: string() })).handler(createSsrRpc("6517a43c14902faa61134004049a7ed0f71eefd627bb85e31e8c599a2e58a941"));
var registerClick = createServerFn({ method: "POST" }).validator(codeSchema).handler(createSsrRpc("1b79a05de85dde44c7cbb3bee98794d27bf5982ae4b9b039fd14a4e8f87fcb9e"));
var getLinkByCode = createServerFn({ method: "GET" }).validator(codeSchema).handler(createSsrRpc("90f812a0e298cc23559f32210a237891dd818b041b0440f33d16dee8ea0ae9a6"));
createServerFn({ method: "POST" }).validator(object({ paypal_email: string().email() })).handler(createSsrRpc("e53c2cddac03db482446287389bea07201ff63dc7915c1cc04470fc8f5ec67fb"));
var $$splitComponentImporter = () => import("./s._code-pbys64Sb.mjs");
var Route = createFileRoute("/s/$code")({
	head: () => ({ meta: [{ title: "Preparando tu descarga — NASETLINK" }, {
		name: "description",
		content: "Espera unos segundos y continúa a tu descarga."
	}] }),
	loader: async ({ params }) => {
		if (!/^[a-zA-Z0-9]{4,24}$/.test(params.code)) return null;
		return getLinkByCode({ data: { code: params.code } });
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$25.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$26
});
var AuthedRoute = Route$24.update({
	id: "/_authed",
	getParentRoute: () => Route$26
});
var ForgotPasswordRoute = Route$23.update({
	id: "/forgot-password",
	path: "/forgot-password",
	getParentRoute: () => Route$26
});
var LoginRoute = Route$22.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$26
});
var MfaRoute = Route$21.update({
	id: "/mfa",
	path: "/mfa",
	getParentRoute: () => Route$26
});
var RegisterRoute = Route$20.update({
	id: "/register",
	path: "/register",
	getParentRoute: () => Route$26
});
var ResetPasswordRoute = Route$19.update({
	id: "/reset-password",
	path: "/reset-password",
	getParentRoute: () => Route$26
});
var AuthedAdminRoute = Route$18.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => AuthedRoute
});
var AuthedAnunciosRoute = Route$17.update({
	id: "/anuncios",
	path: "/anuncios",
	getParentRoute: () => AuthedRoute
});
var AuthedApiRoute = Route$16.update({
	id: "/api",
	path: "/api",
	getParentRoute: () => AuthedRoute
});
var AuthedDashboardRoute = Route$15.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => AuthedRoute
});
var AuthedGananciasRoute = Route$14.update({
	id: "/ganancias",
	path: "/ganancias",
	getParentRoute: () => AuthedRoute
});
var AuthedKeysRoute = Route$13.update({
	id: "/keys",
	path: "/keys",
	getParentRoute: () => AuthedRoute
});
var AuthedLinksRoute = Route$12.update({
	id: "/links",
	path: "/links",
	getParentRoute: () => AuthedRoute
});
var AuthedNivelesRoute = Route$11.update({
	id: "/niveles",
	path: "/niveles",
	getParentRoute: () => AuthedRoute
});
var AuthedPerfilRoute = Route$10.update({
	id: "/perfil",
	path: "/perfil",
	getParentRoute: () => AuthedRoute
});
var AuthedPersonalizaRoute = Route$9.update({
	id: "/personaliza",
	path: "/personaliza",
	getParentRoute: () => AuthedRoute
});
var AuthedRankingRoute = Route$8.update({
	id: "/ranking",
	path: "/ranking",
	getParentRoute: () => AuthedRoute
});
var AuthedReferidosRoute = Route$7.update({
	id: "/referidos",
	path: "/referidos",
	getParentRoute: () => AuthedRoute
});
var AuthedRetirosRoute = Route$6.update({
	id: "/retiros",
	path: "/retiros",
	getParentRoute: () => AuthedRoute
});
var AuthedStatsRoute = Route$5.update({
	id: "/stats",
	path: "/stats",
	getParentRoute: () => AuthedRoute
});
var AuthedSugerenciasRoute = Route$4.update({
	id: "/sugerencias",
	path: "/sugerencias",
	getParentRoute: () => AuthedRoute
});
var ApiTimeRoute = Route$3.update({
	id: "/api/time",
	path: "/api/time",
	getParentRoute: () => Route$26
});
var ApiValidateRoute = Route$2.update({
	id: "/api/validate",
	path: "/api/validate",
	getParentRoute: () => Route$26
});
var GetkeyIdRoute = Route$1.update({
	id: "/getkey/$id",
	path: "/getkey/$id",
	getParentRoute: () => Route$26
});
var SCodeRoute = Route.update({
	id: "/s/$code",
	path: "/s/$code",
	getParentRoute: () => Route$26
});
var AuthedRouteChildren = {
	AuthedAdminRoute,
	AuthedAnunciosRoute,
	AuthedApiRoute,
	AuthedDashboardRoute,
	AuthedGananciasRoute,
	AuthedKeysRoute,
	AuthedLinksRoute,
	AuthedNivelesRoute,
	AuthedPerfilRoute,
	AuthedPersonalizaRoute,
	AuthedRankingRoute,
	AuthedReferidosRoute,
	AuthedRetirosRoute,
	AuthedStatsRoute,
	AuthedSugerenciasRoute
};
var rootRouteChildren = {
	IndexRoute,
	AuthedRoute: AuthedRoute._addFileChildren(AuthedRouteChildren),
	ForgotPasswordRoute,
	LoginRoute,
	MfaRoute,
	RegisterRoute,
	ResetPasswordRoute,
	ApiTimeRoute,
	ApiValidateRoute,
	GetkeyIdRoute,
	SCodeRoute
};
var routeTree = Route$26._addFileChildren(rootRouteChildren)._addFileTypes();
var createQueryClient = () => new QueryClient({ defaultOptions: { queries: {
	staleTime: 3e4,
	refetchOnWindowFocus: false
} } });
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	const queryClient = createQueryClient();
	const router = createRouter({
		routeTree,
		context: { queryClient },
		defaultPreload: "intent",
		defaultPreloadStaleTime: 0,
		defaultErrorComponent: DefaultCatchBoundary,
		defaultNotFoundComponent: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotFound, {}),
		scrollRestoration: true
	});
	setupRouterSsrQueryIntegration({
		router,
		queryClient
	});
	return router;
}
export { AuthGateError, Button, Route, Route$1, Route$10, Route$11, Route$12, Route$13, Route$15, Route$16, Route$18, Route$4, Route$5, Route$6, Route$7, Route$8, Route$9, auth, base44, claimLicenseKey, cn, db, getAppParams, googleProvider, registerClick, returnToSearch, router_exports, safeReturnTo, useAuth };
