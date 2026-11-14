import { __toESM } from "../_runtime.mjs";
import { require_react } from "../_libs/react.mjs";
import { Link } from "../_libs/@tanstack/react-router+[2...].mjs";
import { require_jsx_runtime } from "../_libs/react2.mjs";
import { Download } from "../_libs/lucide-react22.mjs";
import { LoaderCircle } from "../_libs/lucide-react35.mjs";
import { ShieldCheck } from "../_libs/lucide-react49.mjs";
import { Route, registerClick } from "./router-DtpLq15p.mjs";
import "./levels-DQTdmijI.mjs";
// node_modules/.nitro/vite/services/ssr/assets/s._code-pbys64Sb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function DownloadCard({ link }) {
	const [seconds, setSeconds] = (0, import_react.useState)(15);
	const [busy, setBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const id = setInterval(() => setSeconds((value) => value > 0 ? value - 1 : 0), 1e3);
		return () => clearInterval(id);
	}, []);
	let host = "";
	try {
		host = new URL(link.original_url).hostname;
	} catch {
		host = link.original_url;
	}
	const ready = seconds === 0;
	const progress = Math.min(100, (15 - seconds) / 15 * 100);
	const handleContinue = async () => {
		if (!ready || busy) return;
		setBusy(true);
		try {
			const result = await registerClick({ data: { code: link.short_code } });
			window.location.href = result?.original_url || link.original_url;
		} catch {
			window.location.href = link.original_url;
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "panel w-full rounded-3xl p-6 text-center sm:p-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500",
				children: "Enlace verificado"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-heading text-2xl font-bold leading-tight text-white",
				children: "Tu archivo está casi listo"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-xs text-slate-400",
				children: ["Espera mientras preparamos la descarga de ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-slate-200",
					children: host
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mt-6 overflow-hidden rounded-2xl border border-dashed border-white/15 bg-[#0a1322]/80",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex h-40 flex-col items-center justify-center gap-1.5 px-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] font-bold uppercase tracking-[0.24em] text-[#3b82f6]",
						children: "Espacio publicitario"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-[11px] text-slate-500",
						children: [
							"Anuncio patrocinado de ",
							15,
							" s"
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "pointer-events-none absolute inset-0 animate-[float-slow_4s_ease-in-out_infinite] bg-gradient-to-tr from-[#3b82f6]/10 via-transparent to-[#00f0ff]/10" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-7",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-heading text-[72px] font-bold leading-none text-[#00f0ff]",
						style: { textShadow: "0 0 34px rgba(0,240,255,.55)" },
						children: String(seconds).padStart(2, "0")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500",
						children: ready ? "Listo para continuar" : "Segundos restantes"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 h-1.5 w-full overflow-hidden rounded-full bg-white/10",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full rounded-full bg-gradient-to-r from-[#3b82f6] to-[#00f0ff] transition-all duration-1000 ease-linear",
							style: { width: `${progress}%` }
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: handleContinue,
				disabled: !ready || busy,
				className: "mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 py-4 font-heading text-sm font-extrabold uppercase tracking-[0.12em] text-emerald-950 shadow-[0_0_40px_-12px_rgba(16,185,129,.95)] transition-all duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400 disabled:shadow-none",
				children: [busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-5 w-5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {
					className: "h-5 w-5",
					strokeWidth: 2.6
				}), "Continuar a la descarga"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 flex items-center justify-center gap-1.5 text-[10px] text-slate-500",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3.5 w-3.5 text-emerald-400" }),
					"Serás redirigido a ",
					host
				]
			})
		]
	});
}
function DownloadPage() {
	const link = Route.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "naset-bg flex min-h-screen flex-col items-center justify-center px-4 py-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none fixed inset-0 grid-lines" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative w-full max-w-md",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-6 flex items-center justify-center gap-2.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#3b82f6] to-[#00f0ff]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
						viewBox: "0 0 24 24",
						fill: "none",
						className: "h-4 w-4 text-[#04141a]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M9.5 14.5 14.5 9.5M8 16l-1.2 1.2a3.4 3.4 0 1 1-4.8-4.8L5 9.4M16 8l1.2-1.2a3.4 3.4 0 1 1 4.8 4.8L19 14.6",
							stroke: "currentColor",
							strokeWidth: "2.4",
							strokeLinecap: "round"
						})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "font-heading text-base font-bold tracking-[0.22em] text-white",
					children: ["NASET", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[#00f0ff]",
						children: "LINK"
					})]
				})]
			}), link ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DownloadCard, { link }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel rounded-3xl p-8 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-heading text-xl font-bold text-white",
						children: "Este enlace no existe"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-slate-400",
						children: "Puede haber expirado o estar mal escrito. Revisa la dirección e inténtalo de nuevo."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "mt-5 inline-flex items-center justify-center rounded-full bg-[#00f0ff] px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-[#04141a]",
						children: "Ir a NASETLINK"
					})
				]
			})]
		})]
	});
}
export { DownloadPage as component };
