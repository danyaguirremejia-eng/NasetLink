import { __toESM } from "../_runtime.mjs";
import { require_react } from "../_libs/react.mjs";
import { Link } from "../_libs/@tanstack/react-router+[2...].mjs";
import { require_jsx_runtime } from "../_libs/react2.mjs";
import { toast } from "../_libs/sonner.mjs";
import { CircleCheck } from "../_libs/lucide-react15.mjs";
import { Cloud, GraduationCap, MonitorSmartphone, Timer } from "../_libs/lucide-react18.mjs";
import { Copy } from "../_libs/lucide-react20.mjs";
import { Link2 } from "../_libs/lucide-react33.mjs";
import { LoaderCircle } from "../_libs/lucide-react35.mjs";
import { ShieldCheck } from "../_libs/lucide-react49.mjs";
import { Route$1, claimLicenseKey } from "./router-DtpLq15p.mjs";
// node_modules/.nitro/vite/services/ssr/assets/getkey._id-DL0PwCbK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function KeyReveal({ license }) {
	const copy = async () => {
		try {
			await navigator.clipboard.writeText(license.key_code);
			toast.success("Key copiada");
		} catch {
			toast.error("No se pudo copiar");
		}
	};
	const devices = Number(license.device_limit) || 0;
	const expires = license.expires_at ? String(license.expires_at).slice(0, 10) : "—";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "panel rounded-3xl p-7 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "mx-auto h-10 w-10 text-emerald-400" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-heading text-xl font-bold text-white",
				children: "¡Tu Key está lista!"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1.5 text-sm text-slate-400",
				children: "Cópiala y actívala en la app para empezar a usarla."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5 rounded-2xl border border-[#00f0ff]/40 bg-[#00f0ff]/[0.08] px-4 py-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "break-all font-mono text-lg font-bold tracking-wide text-white",
					children: license.key_code
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: copy,
				className: "mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#00f0ff] px-6 py-3.5 font-heading text-sm font-extrabold uppercase tracking-[0.16em] text-[#04141a] transition-transform hover:-translate-y-0.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-4 w-4" }), "Copiar Key"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 grid grid-cols-2 gap-2.5 text-left",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-white/[0.08] bg-white/[0.03] px-3 py-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Timer, { className: "mb-1.5 h-4 w-4 text-[#3b82f6]" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-heading text-sm font-bold text-white",
							children: expires
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] uppercase tracking-[0.12em] text-slate-500",
							children: "Vence"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-white/[0.08] bg-white/[0.03] px-3 py-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonitorSmartphone, { className: "mb-1.5 h-4 w-4 text-[#3b82f6]" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-heading text-sm font-bold text-white",
							children: devices === 0 ? "Ilimitados" : devices
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] uppercase tracking-[0.12em] text-slate-500",
							children: "Dispositivos"
						})
					]
				})]
			})
		]
	});
}
var AD_SECONDS = 6;
var AD_POOL = [
	{
		tag: "Seguridad",
		title: "Navega sin límites",
		copy: "Protege tus datos en cada conexión con la app de seguridad del patrocinador.",
		icon: ShieldCheck,
		gradient: "from-[#3b82f6] via-[#1d4ed8] to-[#0b1220]"
	},
	{
		tag: "Cursos",
		title: "Aprende diseño web gratis",
		copy: "Clases cortas de interfaz y código para lanzar tu primer proyecto esta semana.",
		icon: GraduationCap,
		gradient: "from-[#00f0ff] via-[#0891b2] to-[#0b1220]"
	},
	{
		tag: "Almacenamiento",
		title: "Tu nube personal",
		copy: "Guarda archivos y compártelos con un solo enlace desde cualquier dispositivo.",
		icon: Cloud,
		gradient: "from-[#6366f1] via-[#3b82f6] to-[#0b1220]"
	},
	{
		tag: "NASETLINK",
		title: "Gana con tus enlaces",
		copy: "Acorta enlaces y recibe $1.00 por cada 1000 clics completados.",
		icon: Link2,
		gradient: "from-[#22d3ee] via-[#3b82f6] to-[#1e3a8a]"
	}
];
function AdGate({ info }) {
	const [ads, setAds] = (0, import_react.useState)(null);
	const [index, setIndex] = (0, import_react.useState)(0);
	const [seconds, setSeconds] = (0, import_react.useState)(AD_SECONDS);
	const [result, setResult] = (0, import_react.useState)(null);
	const [claiming, setClaiming] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const total = 2 + Math.floor(Math.random() * 3);
		setAds([...AD_POOL].sort(() => Math.random() - .5).slice(0, total));
	}, []);
	(0, import_react.useEffect)(() => {
		if (!ads || index >= ads.length) return;
		setSeconds(AD_SECONDS);
		const startedAt = Date.now();
		const timer = setInterval(() => {
			const left = AD_SECONDS - Math.floor((Date.now() - startedAt) / 1e3);
			if (left <= 0) {
				clearInterval(timer);
				setSeconds(0);
				setIndex((value) => value + 1);
			} else setSeconds(left);
		}, 250);
		return () => clearInterval(timer);
	}, [ads, index]);
	const reveal = async () => {
		if (claiming) return;
		setClaiming(true);
		try {
			setResult(await claimLicenseKey({ data: { id: info.id } }));
		} catch {
			toast.error("No se pudo obtener la Key, inténtalo de nuevo");
		} finally {
			setClaiming(false);
		}
	};
	if (result && !result.ok) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "panel rounded-3xl p-8 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-heading text-xl font-bold text-white",
			children: "Esta Key ya no está disponible"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm text-slate-400",
			children: "La licencia expiró o fue revocada por el administrador."
		})]
	});
	if (result?.ok) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyReveal, { license: result });
	if (!ads) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "panel flex items-center justify-center gap-3 rounded-3xl p-10 text-sm text-slate-400",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin text-[#00f0ff]" }), "Preparando tus anuncios…"]
	});
	const ad = ads[index];
	if (!ad) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "panel rounded-3xl p-7 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "inline-flex rounded-full border border-[#00f0ff]/40 bg-[#00f0ff]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#00f0ff]",
				children: "Anuncios completados"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-4 font-heading text-xl font-bold text-white",
				children: "Ya puedes ver tu Key"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm text-slate-400",
				children: [
					"Completaste los ",
					ads.length,
					" anuncios. Tu licencia está lista para copiar."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: reveal,
				disabled: claiming,
				className: "mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#00f0ff] px-6 py-4 font-heading text-sm font-extrabold uppercase tracking-[0.16em] text-[#04141a] shadow-[0_0_44px_-8px_rgba(0,240,255,.85)] transition-all hover:-translate-y-0.5 disabled:opacity-60",
				children: [claiming && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), claiming ? "Preparando…" : "Mostrar mi Key"]
			})
		]
	});
	const Icon = ad.icon;
	const progress = (AD_SECONDS - seconds) / AD_SECONDS * 100;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between px-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					"Anuncio ",
					index + 1,
					" de ",
					ads.length
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: seconds > 0 ? `Espera ${seconds}s` : "Listo" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `relative overflow-hidden rounded-3xl border border-white/12 bg-gradient-to-br ${ad.gradient} p-6`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/90",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-3 w-3" }), ad.tag]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-4 font-heading text-xl font-bold leading-snug text-white",
								children: ad.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 max-w-sm text-sm leading-relaxed text-white/80",
								children: ad.copy
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-5 inline-flex items-center rounded-full bg-white px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#0f172a]",
								children: "Más información"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative mt-6 h-1.5 w-full overflow-hidden rounded-full bg-black/30",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full rounded-full bg-[#00f0ff] transition-[width] duration-200 ease-linear",
							style: { width: `${progress}%` }
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "px-1 text-center text-[10px] uppercase tracking-[0.14em] text-slate-600",
				children: "Anuncio simulado · clave protegida por NASETLINK"
			})
		]
	});
}
function KeyDeliveryPage() {
	const info = Route$1.useLoaderData();
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
			}), !info ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel rounded-3xl p-8 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-heading text-xl font-bold text-white",
						children: "Este enlace no existe"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-slate-400",
						children: "Puede estar mal escrito o la Key fue eliminada. Revisa la dirección e inténtalo de nuevo."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "mt-5 inline-flex items-center justify-center rounded-full bg-[#00f0ff] px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-[#04141a]",
						children: "Ir a NASETLINK"
					})
				]
			}) : info.expired ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel rounded-3xl p-8 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-heading text-xl font-bold text-white",
						children: "Esta Key expiró"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-slate-400",
						children: "La licencia ya no está vigente, así que no puede entregarse."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "mt-5 inline-flex items-center justify-center rounded-full bg-[#00f0ff] px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-[#04141a]",
						children: "Ir a NASETLINK"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdGate, { info })]
		})]
	});
}
export { KeyDeliveryPage as component };
