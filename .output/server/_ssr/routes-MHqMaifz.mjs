import { __toESM } from "../_runtime.mjs";
import { require_react } from "../_libs/react.mjs";
import { Link } from "../_libs/@tanstack/react-router+[2...].mjs";
import { require_jsx_runtime } from "../_libs/react2.mjs";
import { cva } from "../_libs/class-variance-authority+clsx.mjs";
import { Activity, ArrowRight, Calculator, CircleDollarSign, Coins, Earth, Landmark, Layers, Menu } from "../_libs/lucide-react2.mjs";
import { ChevronDown } from "../_libs/lucide-react11.mjs";
import { Instagram, Sparkles, Youtube } from "../_libs/lucide-react31.mjs";
import { Link2 } from "../_libs/lucide-react33.mjs";
import { MessageCircle } from "../_libs/lucide-react41.mjs";
import { MousePointerClick } from "../_libs/lucide-react43.mjs";
import { Send } from "../_libs/lucide-react46.mjs";
import { Share2 } from "../_libs/lucide-react47.mjs";
import { ShieldCheck } from "../_libs/lucide-react49.mjs";
import { TrendingUp } from "../_libs/lucide-react53.mjs";
import { Users } from "../_libs/lucide-react58.mjs";
import { Wallet } from "../_libs/lucide-react59.mjs";
import { X } from "../_libs/lucide-react60.mjs";
import { cn, useAuth } from "./router-DtpLq15p.mjs";
import { PAYOUT_STEPS, PLAN_LEVELS, ecpmFor } from "./levels-DQTdmijI.mjs";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger } from "../_libs/radix-ui__react-dialog.mjs";
import { Slider as Slider$1, SliderRange, SliderThumb, SliderTrack } from "../_libs/radix-ui__react-slider.mjs";
import { Content2, Header, Item, Root2, Trigger2 } from "../_libs/@radix-ui/react-accordion+[4...].mjs";
// node_modules/.nitro/vite/services/ssr/assets/routes-MHqMaifz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Sheet = Dialog;
var SheetTrigger = DialogTrigger;
var SheetPortal = DialogPortal;
var SheetOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}));
SheetOverlay.displayName = DialogOverlay.displayName;
var sheetVariants = cva("fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out", {
	variants: { side: {
		top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
		bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
		left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
		right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
	} },
	defaultVariants: { side: "right" }
});
var SheetContent = import_react.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
	ref,
	className: cn(sheetVariants({ side }), className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	}), children]
})] }));
SheetContent.displayName = DialogContent.displayName;
var SheetHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
	...props
});
SheetHeader.displayName = "SheetHeader";
var SheetFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
SheetFooter.displayName = "SheetFooter";
var SheetTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
	ref,
	className: cn("text-lg font-semibold text-foreground", className),
	...props
}));
SheetTitle.displayName = DialogTitle.displayName;
var SheetDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
SheetDescription.displayName = DialogDescription.displayName;
var NAV = [
	{
		href: "#como-funciona",
		label: "Cómo funciona"
	},
	{
		href: "#calculadora",
		label: "Calculadora"
	},
	{
		href: "#pagos",
		label: "Pagos"
	},
	{
		href: "#faq",
		label: "FAQ"
	}
];
function LandingHeader() {
	const { isAuthenticated } = useAuth();
	const [open, setOpen] = (0, import_react.useState)(false);
	const cta = isAuthenticated ? {
		to: "/dashboard",
		label: "Ir a mi panel"
	} : {
		to: "/register",
		label: "Crear cuenta"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "sticky top-0 z-40 border-b border-white/10 bg-[#070d1a]/85 backdrop-blur-xl",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex w-full max-w-5xl items-center justify-between px-5 py-3.5 sm:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex items-center gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#2563eb] to-[#3b82f6] shadow-[0_0_24px_-4px_rgba(59,130,246,.9)]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
							viewBox: "0 0 24 24",
							fill: "none",
							className: "h-5 w-5 text-white",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M9.5 14.5 14.5 9.5M8 16l-1.2 1.2a3.4 3.4 0 1 1-4.8-4.8L5 9.4M16 8l1.2-1.2a3.4 3.4 0 1 1 4.8 4.8L19 14.6",
								stroke: "currentColor",
								strokeWidth: "2.2",
								strokeLinecap: "round"
							})
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-heading text-base font-bold tracking-[0.2em] text-white",
						children: ["NASET", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[#3b82f6]",
							children: "LINK"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden items-center gap-6 md:flex",
					children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: item.href,
						className: "text-xs font-semibold text-slate-300 transition-colors hover:text-white",
						children: item.label
					}, item.href))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: cta.to,
						className: "hidden rounded-full bg-[#2563eb] px-4 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-white shadow-[0_10px_28px_-10px_rgba(37,99,235,.95)] transition-transform hover:-translate-y-0.5 sm:inline-flex",
						children: cta.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
						open,
						onOpenChange: setOpen,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTrigger, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": "Abrir menú",
								className: "flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/[0.06] text-white transition-colors hover:bg-white/[0.12]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5 w-5" })
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
							side: "right",
							className: "border-white/10 bg-[#0a1220] text-slate-100",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, {
									className: "font-heading text-left text-lg text-white",
									children: "Menú"
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-6 flex flex-col gap-1",
									children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: item.href,
										onClick: () => setOpen(false),
										className: "rounded-xl px-3 py-3 text-sm font-semibold text-slate-200 transition-colors hover:bg-white/[0.06] hover:text-white",
										children: item.label
									}, item.href))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-6 space-y-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: cta.to,
										onClick: () => setOpen(false),
										className: "flex items-center justify-center gap-2 rounded-xl bg-[#2563eb] px-4 py-3 text-sm font-bold uppercase tracking-[0.1em] text-white",
										children: [cta.label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
									}), !isAuthenticated && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/login",
										onClick: () => setOpen(false),
										className: "flex items-center justify-center rounded-xl border border-white/15 px-4 py-3 text-sm font-semibold text-slate-200",
										children: "Iniciar sesión"
									})]
								})
							]
						})]
					})]
				})
			]
		})
	});
}
function LandingHero() {
	const { isAuthenticated } = useAuth();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "inicio",
		className: "mx-auto w-full max-w-5xl px-5 pb-10 pt-12 sm:px-8 sm:pb-16 sm:pt-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "inline-flex items-center gap-2 rounded-full border border-[#3b82f6]/40 bg-[#3b82f6]/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#7db3ff]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5" }), "+128.000 creadores ya monetizan"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "mt-5 font-heading text-4xl font-bold leading-[1.08] text-white sm:text-6xl",
				children: ["Monetiza tus enlaces ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[#3b82f6]",
					children: "como un profesional"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base",
				children: "Convierte cada descarga en ingresos. Acorta tu enlace, compártelo y cobra por cada visita válida con las tarifas más altas del mercado."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-7 flex flex-col gap-3 sm:flex-row sm:items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: isAuthenticated ? "/dashboard" : "/register",
					className: "inline-flex items-center justify-center rounded-full bg-[#2563eb] px-7 py-3.5 font-heading text-sm font-bold uppercase tracking-[0.1em] text-white shadow-[0_16px_40px_-14px_rgba(37,99,235,1)] transition-transform hover:-translate-y-0.5",
					children: isAuthenticated ? "Ir a mi panel" : "Empezar gratis"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: "#calculadora",
					className: "inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-7 py-3.5 font-heading text-sm font-bold uppercase tracking-[0.1em] text-slate-100 backdrop-blur-md transition-colors hover:border-[#3b82f6]/50 hover:text-white",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calculator, { className: "h-4 w-4 text-[#3b82f6]" }), "Calcular ganancias"]
				})]
			})
		]
	});
}
var STATS = [
	{
		label: "Usuarios activos",
		value: "128K+",
		icon: Users
	},
	{
		label: "Clics válidos",
		value: "42M",
		icon: MousePointerClick
	},
	{
		label: "Países",
		value: "190",
		icon: Earth
	},
	{
		label: "Antifraude",
		value: "24/7",
		icon: ShieldCheck
	}
];
function LandingStats() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "mx-auto w-full max-w-5xl px-5 pb-4 sm:px-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-2 gap-3 sm:grid-cols-4",
			children: STATS.map(({ label, value, icon: Icon }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "liquid rounded-2xl px-4 py-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4 text-[#3b82f6]" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-heading text-2xl font-bold text-white",
						children: value
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] uppercase tracking-[0.14em] text-slate-400",
						children: label
					})
				]
			}, label))
		})
	});
}
var STEPS = [
	{
		icon: Link2,
		title: "Crea tu enlace",
		text: "Pega la URL de tu archivo y genera un enlace corto listo para monetizar."
	},
	{
		icon: Share2,
		title: "Compártelo",
		text: "Publica tu enlace en redes, foros o grupos y atrae visitas reales."
	},
	{
		icon: Wallet,
		title: "Gana dinero",
		text: "Cada visita que completa el anuncio suma saldo a tu cuenta al instante."
	}
];
function LandingHowItWorks() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "como-funciona",
		className: "mx-auto w-full max-w-5xl px-5 py-12 sm:px-8 sm:py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-heading text-2xl font-bold text-white sm:text-3xl",
				children: "Cómo funciona"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-slate-400",
				children: "Tres pasos y empiezas a cobrar por tu tráfico."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid gap-3 sm:grid-cols-3",
				children: STEPS.map(({ icon: Icon, title, text }, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel rounded-3xl p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex h-10 w-10 items-center justify-center rounded-xl bg-[#3b82f6]/15",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5 text-[#3b82f6]" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-heading text-2xl font-bold text-white/10",
								children: ["0", index + 1]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-4 font-heading text-base font-bold text-white",
							children: title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1.5 text-xs leading-relaxed text-slate-400",
							children: text
						})
					]
				}, title))
			})
		]
	});
}
var Slider = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Slider$1, {
	ref,
	className: cn("relative flex w-full touch-none select-none items-center", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderTrack, {
		className: "relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderRange, { className: "absolute h-full bg-primary" })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderThumb, { className: "block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" })]
}));
Slider.displayName = Slider$1.displayName;
var MIN_VISITS = 1e3;
var MAX_VISITS = 1e6;
function visitsFromPercent(percent) {
	const value = MIN_VISITS * Math.pow(MAX_VISITS / MIN_VISITS, percent / 100);
	return Math.round(value / 1e3) * 1e3;
}
function formatVisits(visits) {
	if (visits >= 1e6) return "1M";
	return `${Math.round(visits / 1e3)}K`;
}
function EarningsCalculator() {
	const [visitsPercent, setVisitsPercent] = (0, import_react.useState)(38);
	const [steps, setSteps] = (0, import_react.useState)(2);
	const [levelId, setLevelId] = (0, import_react.useState)(1);
	const visits = visitsFromPercent(visitsPercent);
	const ecpm = ecpmFor(levelId, steps);
	const earnings = visits / 1e3 * ecpm;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "calculadora",
		className: "mx-auto w-full max-w-5xl px-5 py-12 sm:px-8 sm:py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-heading text-2xl font-bold text-white sm:text-3xl",
				children: "Calcula tus ganancias"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-slate-400",
				children: "Ajusta tus visitas, los pasos de tu enlace y tu nivel para ver cuánto puedes ganar."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid gap-4 lg:grid-cols-[1.1fr_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel space-y-7 rounded-3xl p-5 sm:p-7",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-baseline justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "visits",
									className: "text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400",
									children: "Visitas mensuales"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-heading text-sm font-bold text-white",
									children: visits.toLocaleString("en-US")
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
								id: "visits",
								className: "mt-3",
								min: 0,
								max: 100,
								step: 1,
								value: [visitsPercent],
								onValueChange: ([value]) => setVisitsPercent(value)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1 flex justify-between text-[10px] uppercase tracking-[0.12em] text-slate-500",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "1K" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatVisits(visits) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "1M" })
								]
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-baseline justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "steps",
									className: "text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400",
									children: "Pasos del enlace"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-heading text-sm font-bold text-white",
									children: steps
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
								id: "steps",
								className: "mt-3",
								min: 1,
								max: 6,
								step: 1,
								value: [steps],
								onValueChange: ([value]) => setSteps(value)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1 flex justify-between text-[10px] uppercase tracking-[0.12em] text-slate-500",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "1" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "6" })]
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400",
							children: "Nivel de pago"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2.5 grid grid-cols-3 gap-1.5",
							children: PLAN_LEVELS.map((level) => {
								const active = level.id === levelId;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setLevelId(level.id),
									className: ["rounded-xl border px-2 py-2 text-[10px] font-bold uppercase tracking-[0.08em] transition-colors", active ? "border-[#3b82f6] bg-[#2563eb] text-white shadow-[0_8px_22px_-10px_rgba(37,99,235,1)]" : "border-white/12 bg-white/[0.04] text-slate-300 hover:border-[#3b82f6]/50 hover:text-white"].join(" "),
									children: level.label
								}, level.id);
							})
						})] })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col justify-between rounded-3xl border border-[#3b82f6]/35 bg-gradient-to-br from-[#1d4ed8]/35 via-[#0b1526]/85 to-[#3b82f6]/15 p-6 backdrop-blur-xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex h-10 w-10 items-center justify-center rounded-xl bg-[#3b82f6]/20",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-5 w-5 text-[#7db3ff]" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300",
							children: "Ganancia estimada al mes"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 font-heading text-4xl font-bold leading-none text-white sm:text-5xl",
							children: ["$", earnings.toLocaleString("en-US", {
								minimumFractionDigits: 2,
								maximumFractionDigits: 2
							})]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 space-y-2 border-t border-white/10 pt-4 text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between text-slate-300",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "eCPM aplicado" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-semibold text-white",
								children: [
									"$",
									ecpm.toFixed(2),
									" / 1000 clics"
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between text-slate-400",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Cálculo" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								visits.toLocaleString("en-US"),
								" × $",
								ecpm.toFixed(2),
								" / 1000"
							] })]
						})]
					})]
				})]
			})
		]
	});
}
var FEATURES = [
	{
		icon: ShieldCheck,
		title: "Ganancias protegidas",
		text: "Filtros antifraude que descartan tráfico inválido y bots."
	},
	{
		icon: Activity,
		title: "Estadísticas en vivo",
		text: "Clics, países y dispositivos actualizados al segundo."
	},
	{
		icon: Layers,
		title: "Sistema de niveles",
		text: "Sube de nivel y desbloquea tarifas más altas por visita."
	},
	{
		icon: Users,
		title: "Programa de referidos",
		text: "Invita creadores y gana un porcentaje de sus ingresos."
	},
	{
		icon: Wallet,
		title: "Pagos puntuales",
		text: "Retira desde $5 USD por PayPal, cripto o transferencia."
	},
	{
		icon: Link2,
		title: "Enlaces ilimitados",
		text: "Crea todos los enlaces que necesites, sin restricciones."
	}
];
function LandingFeatures() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto w-full max-w-5xl px-5 py-12 sm:px-8 sm:py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-heading text-2xl font-bold text-white sm:text-3xl",
				children: "Todo lo que necesitas para cobrar"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-slate-400",
				children: "Herramientas pensadas para creadores de contenido."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3",
				children: FEATURES.map(({ icon: Icon, title, text }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "liquid rounded-2xl p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex h-10 w-10 items-center justify-center rounded-xl bg-[#2563eb]/25",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5 text-[#7db3ff]" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-3.5 font-heading text-sm font-bold text-white",
							children: title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1.5 text-xs leading-relaxed text-slate-400",
							children: text
						})
					]
				}, title))
			})
		]
	});
}
function LandingPayoutTable() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "pagos",
		className: "mx-auto w-full max-w-5xl px-5 py-12 sm:px-8 sm:py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-heading text-2xl font-bold text-white sm:text-3xl",
				children: "Tabla de pagos"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-slate-400",
				children: "USD por cada 1000 clics válidos según tu nivel y los pasos del enlace."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "panel mt-6 overflow-hidden rounded-3xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto no-scrollbar",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full min-w-[460px] border-collapse text-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "bg-white/[0.04] text-[10px] uppercase tracking-[0.14em] text-slate-400",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-semibold",
								children: "Nivel"
							}), PAYOUT_STEPS.map((steps) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("th", {
								className: "px-3 py-3 text-center font-semibold",
								children: [steps, " pasos"]
							}, steps))]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: PLAN_LEVELS.map((level) => {
							const isMax = level.id === PLAN_LEVELS.length;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: ["border-t border-white/[0.07]", isMax ? "bg-[#3b82f6]/[0.09]" : ""].join(" "),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "px-4 py-3 text-xs font-semibold text-white",
									children: [level.label, isMax && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "ml-2 rounded-full bg-[#3b82f6]/25 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#9ec5ff]",
										children: "Top"
									})]
								}), PAYOUT_STEPS.map((steps) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: ["px-3 py-3 text-center text-sm font-bold", isMax ? "text-[#9ec5ff]" : "text-emerald-400"].join(" "),
									children: ["$", ecpmFor(level.id, steps).toFixed(2)]
								}, steps))]
							}, level.id);
						}) })]
					})
				})
			})
		]
	});
}
var METHODS = [
	{
		icon: Wallet,
		name: "PayPal",
		detail: "Retiro mínimo $5 USD"
	},
	{
		icon: CircleDollarSign,
		name: "Cripto",
		detail: "BTC · ETH · USDT"
	},
	{
		icon: Coins,
		name: "USDT",
		detail: "Red TRC20 / BEP20"
	},
	{
		icon: Landmark,
		name: "Transferencia",
		detail: "Bancos de LATAM"
	}
];
function LandingPaymentMethods() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto w-full max-w-5xl px-5 py-12 sm:px-8 sm:py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-heading text-2xl font-bold text-white sm:text-3xl",
				children: "Métodos de pago"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-slate-400",
				children: "Elige cómo quieres recibir tus ganancias."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4",
				children: METHODS.map(({ icon: Icon, name, detail }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "liquid rounded-2xl p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex h-10 w-10 items-center justify-center rounded-xl bg-[#2563eb]/25",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5 text-[#7db3ff]" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 font-heading text-sm font-bold text-white",
							children: name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-0.5 text-[10px] uppercase tracking-[0.1em] text-slate-400",
							children: detail
						})
					]
				}, name))
			})
		]
	});
}
var Accordion = Root2;
var AccordionItem = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
	ref,
	className: cn("border-b", className),
	...props
}));
AccordionItem.displayName = "AccordionItem";
var AccordionTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
	className: "flex",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Trigger2, {
		ref,
		className: cn("flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" })]
	})
}));
AccordionTrigger.displayName = Trigger2.displayName;
var AccordionContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("pb-4 pt-0", className),
		children
	})
}));
AccordionContent.displayName = Content2.displayName;
var QUESTIONS = [
	{
		q: "¿Es gratis usar NASETLINK?",
		a: "Sí. Crear tu cuenta, acortar enlaces y recibir pagos es completamente gratis. Solo ganamos cuando tú ganas."
	},
	{
		q: "¿Cuándo pagan?",
		a: "Las solicitudes de retiro se procesan en 24 a 48 horas hábiles una vez alcanzas el mínimo de $5 USD."
	},
	{
		q: "¿Cuánto paga cada 1000 clics?",
		a: "Depende de tu nivel y de los pasos del enlace: desde $3 hasta más de $100 por cada 1000 clics válidos."
	},
	{
		q: "¿Qué es un clic válido?",
		a: "Es una visita real que completa el temporizador del anuncio. Los bots y el tráfico duplicado no se pagan."
	},
	{
		q: "¿Cómo subo de nivel?",
		a: "Acumulando clics válidos y manteniendo buen tráfico. Cada nivel desbloquea anuncios mejor pagados."
	},
	{
		q: "¿Puedo usar varios enlaces a la vez?",
		a: "Sí, no hay límite de enlaces. Puedes crear todos los que necesites desde tu panel."
	}
];
function LandingFaq() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "faq",
		className: "mx-auto w-full max-w-5xl px-5 py-12 sm:px-8 sm:py-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-heading text-2xl font-bold text-white sm:text-3xl",
			children: "Preguntas frecuentes"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accordion, {
			type: "single",
			collapsible: true,
			className: "panel mt-6 rounded-3xl px-5 py-2",
			children: QUESTIONS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionItem, {
				value: item.q,
				className: "border-b border-white/[0.07] last:border-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionTrigger, {
					className: "text-left text-sm font-semibold text-white hover:no-underline",
					children: item.q
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionContent, {
					className: "text-xs leading-relaxed text-slate-400",
					children: item.a
				})]
			}, item.q))
		})]
	});
}
var SOCIAL = [
	{
		icon: Send,
		label: "Telegram"
	},
	{
		icon: Instagram,
		label: "Instagram"
	},
	{
		icon: Youtube,
		label: "YouTube"
	},
	{
		icon: MessageCircle,
		label: "WhatsApp"
	}
];
function LandingFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "border-t border-white/10 bg-[#070d1a]/70",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto w-full max-w-5xl px-5 py-10 sm:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-heading text-base font-bold tracking-[0.2em] text-white",
					children: ["NASET", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[#3b82f6]",
						children: "LINK"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-xs text-xs leading-relaxed text-slate-400",
					children: "Plataforma de monetización de enlaces para creadores de contenido de Latinoamérica."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-2.5",
					children: SOCIAL.map(({ icon: Icon, label }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						title: label,
						className: "flex h-9 w-9 items-center justify-center rounded-xl border border-white/12 bg-white/[0.05] text-slate-300",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" })
					}, label))
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex flex-col gap-3 border-t border-white/[0.08] pt-5 text-[11px] text-slate-500 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" NASETLINK. Todos los derechos reservados."
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Términos y condiciones" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Política de privacidad" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/dashboard",
							className: "text-slate-400 transition-colors hover:text-[#3b82f6]",
							children: "Mi panel"
						})
					]
				})]
			})]
		})
	});
}
function LandingPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "naset-bg relative min-h-screen overflow-x-hidden text-slate-100",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none fixed inset-0 grid-lines" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingHeader, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingHero, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingStats, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingHowItWorks, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EarningsCalculator, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingFeatures, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingPayoutTable, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingPaymentMethods, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingFaq, {})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingFooter, {})
			]
		})]
	});
}
export { LandingPage as component };
