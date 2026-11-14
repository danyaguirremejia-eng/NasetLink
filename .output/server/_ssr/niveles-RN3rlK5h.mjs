import "../_runtime.mjs";
import { require_react } from "../_libs/react.mjs";
import { require_jsx_runtime } from "../_libs/react2.mjs";
import { Award } from "../_libs/lucide-react5.mjs";
import { CircleCheck } from "../_libs/lucide-react15.mjs";
import { Crown, Diamond, Scale, Table } from "../_libs/lucide-react21.mjs";
import { Flame } from "../_libs/lucide-react26.mjs";
import { History } from "../_libs/lucide-react28.mjs";
import { ShieldCheck } from "../_libs/lucide-react49.mjs";
import { Star } from "../_libs/lucide-react51.mjs";
import { Trophy } from "../_libs/lucide-react55.mjs";
import { Route$11 } from "./router-DtpLq15p.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
var LEVELS = [
	{
		id: 1,
		name: "LEVEL 1",
		icon: Award,
		reqClicks: 300,
		reqDays: 9,
		pay: "17.50",
		creators: "1,300",
		color: "text-orange-500",
		bg: "bg-orange-500/10",
		border: "border-orange-500/30"
	},
	{
		id: 2,
		name: "LEVEL 2",
		icon: Star,
		reqClicks: 650,
		reqDays: 14,
		pay: "19.00",
		creators: "7",
		color: "text-slate-400",
		bg: "bg-slate-400/10",
		border: "border-slate-400/30"
	},
	{
		id: 3,
		name: "LEVEL 3",
		icon: Trophy,
		reqClicks: 1100,
		reqDays: 20,
		pay: "21.50",
		creators: "8",
		color: "text-yellow-500",
		bg: "bg-yellow-500/10",
		border: "border-yellow-500/30"
	},
	{
		id: 4,
		name: "LEVEL 4",
		icon: Diamond,
		reqClicks: 1289,
		reqDays: 24,
		pay: "24.00",
		creators: "7",
		color: "text-cyan-400",
		bg: "bg-cyan-400/10",
		border: "border-cyan-400/30"
	},
	{
		id: 5,
		name: "LEVEL 5",
		icon: Crown,
		reqClicks: 2500,
		reqDays: 30,
		pay: "26.50",
		creators: "0",
		color: "text-purple-500",
		bg: "bg-purple-500/10",
		border: "border-purple-500/30"
	},
	{
		id: 6,
		name: "LEVEL MAX",
		icon: Flame,
		reqClicks: 0,
		reqDays: 0,
		pay: "30.00",
		creators: "0",
		color: "text-blue-500",
		bg: "bg-blue-500/10",
		border: "border-blue-500/30"
	}
];
function NivelesPage() {
	const { user } = Route$11.useRouteContext();
	const currentLevel = 1;
	const levelData = LEVELS[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8 pb-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 mb-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bg-blue-500/10 p-2 rounded-xl text-blue-500",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "w-6 h-6" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl font-bold text-white",
					children: "Niveles"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-slate-400 leading-relaxed",
				children: [
					"Subes de nivel con una ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
						className: "text-white",
						children: "racha perfecta"
					}),
					": cumple los clics válidos del día TODOS los días seguidos que pide tu nivel. Más nivel = más te pagamos por cada clic."
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-gradient-to-br from-[#1a1510] via-[#0F1523] to-[#0F1523] border border-orange-500/30 rounded-3xl p-6 relative overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 right-0 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl -mr-16 -mt-16" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between mb-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "bg-orange-500/20 p-4 rounded-2xl border border-orange-500/30",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "w-8 h-8 text-orange-500" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-center gap-1 text-xs text-slate-400 font-bold mb-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "w-4 h-4 text-orange-500" }),
									" Día 1/",
									levelData.reqDays
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] text-slate-500 uppercase tracking-wider",
								children: "Tu racha"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-bold text-orange-500 uppercase tracking-widest mb-1",
						children: "TU NIVEL"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-5xl font-black text-white mb-2",
						children: levelData.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-slate-300 mb-6",
						children: [
							"Ganas ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
								className: "text-white",
								children: ["$", levelData.pay]
							}),
							" por cada 1,000 clics a 6 pasos"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-black/40 border border-white/5 rounded-2xl p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-slate-300 mb-2",
							children: ["Hoy llevas ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
								className: "text-white",
								children: [
									"0 de ",
									levelData.reqClicks,
									" clics válidos"
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-xs text-slate-500",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "w-4 h-4 text-orange-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								"Te faltan ",
								levelData.reqClicks,
								" antes de las 12:00 AM o la racha se pierde entera."
							] })]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "font-bold text-lg text-white mb-1 flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "w-5 h-5 text-blue-500" }), " La escalera"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-slate-400 mb-4",
					children: "Cada salto pide clics válidos diarios durante días seguidos. Sin fallar ni uno."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex overflow-x-auto gap-4 pb-4 no-scrollbar",
					children: LEVELS.map((lvl, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center shrink-0 w-24",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `w-14 h-14 rounded-full flex items-center justify-center border-2 ${index + 1 === currentLevel ? "bg-orange-500 border-orange-400 text-white shadow-[0_0_20px_-5px_rgba(249,115,22,0.8)]" : "bg-[#0F1523] border-white/10 text-slate-600"}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(lvl.icon, { className: "w-6 h-6" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: `text-xs font-bold mt-2 ${index + 1 === currentLevel ? "text-white" : "text-slate-500"}`,
								children: lvl.name
							}),
							lvl.reqClicks > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[9px] text-slate-500 text-center mt-1",
								children: [
									lvl.reqClicks,
									"/día ×",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									lvl.reqDays,
									"d"
								]
							}),
							lvl.reqClicks === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[9px] text-slate-500 mt-1",
								children: "LA CIMA"
							})
						]
					}, lvl.id))
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "font-bold text-lg text-white mb-1 flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table, { className: "w-5 h-5 text-blue-500" }), " Qué pide y qué paga cada nivel"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-slate-400 mb-4",
					children: "El requisito es para SUBIR desde ese nivel al siguiente."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-4",
					children: LEVELS.map((lvl, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `bg-[#0F1523] border ${index + 1 === currentLevel ? "border-orange-500/30" : "border-white/5"} rounded-2xl p-5 relative overflow-hidden`,
						children: [
							index + 1 === currentLevel && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute top-0 right-0 bg-orange-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl z-10",
								children: "TU NIVEL"
							}),
							index + 1 !== currentLevel && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute top-0 right-0 bg-white/5 text-slate-400 text-[10px] font-bold px-3 py-1 rounded-bl-xl z-10",
								children: "POR LLEGAR"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${lvl.bg} ${lvl.color} border ${lvl.border}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(lvl.icon, { className: "w-6 h-6" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "text-2xl font-black text-white",
								children: lvl.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-slate-500 mb-3",
								children: [lvl.creators, " creadores"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: `text-2xl font-black ${lvl.color}`,
									children: ["$", lvl.pay]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-slate-400",
									children: "por cada 1,000 clics a 6 pasos"
								})]
							}),
							lvl.reqClicks > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-black/30 border border-white/5 rounded-xl p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[10px] text-slate-500 font-bold mb-1 uppercase tracking-wider",
									children: ["Para subir a ", LEVELS[index + 1]?.name || "MAX"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm text-white font-medium",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											className: "font-bold",
											children: lvl.reqClicks
										}),
										" clics/día × ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											className: "font-bold",
											children: lvl.reqDays
										}),
										" días seguidos"
									]
								})]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-black/30 border border-white/5 rounded-xl p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] text-slate-500 font-bold mb-1 uppercase tracking-wider",
									children: "Nivel Máximo"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-white font-medium",
									children: "La cima 👑"
								})]
							})
						]
					}, lvl.id))
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
				className: "font-bold text-lg text-white mb-4 flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scale, { className: "w-5 h-5 text-blue-500" }), " Las reglas, clarito"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-[#0F1523] border border-white/5 rounded-2xl p-4 flex gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "bg-orange-500/10 p-2 rounded-xl text-orange-500 shrink-0 h-fit",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "w-5 h-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "text-sm font-bold text-white mb-1",
							children: "Racha perfecta"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-slate-400 leading-relaxed",
							children: "Clics válidos del día ≥ requisito, TODOS los días seguidos. Fallas UN día (aunque sea por 1 clic) y la racha completa se pierde: vuelves a día 0."
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-[#0F1523] border border-white/5 rounded-2xl p-4 flex gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "bg-blue-500/10 p-2 rounded-xl text-blue-500 shrink-0 h-fit",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "w-5 h-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "text-sm font-bold text-white mb-1",
							children: "Nunca bajas"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-slate-400 leading-relaxed",
							children: "Perder la racha no te quita el nivel: sigues donde estás y arrancas de nuevo. No hay bajadas automáticas."
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-[#0F1523] border border-white/5 rounded-2xl p-4 flex gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "bg-green-500/10 p-2 rounded-xl text-green-500 shrink-0 h-fit",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-5 h-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "text-sm font-bold text-white mb-1",
							children: "Solo clics válidos"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-slate-400 leading-relaxed",
							children: "Cuentan los clics válidos que NASETLINK registra, por día cerrado (hora RD, 12:00 AM). No hay promedios ni se suman días."
						})] })]
					})
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "font-bold text-lg text-white mb-1 flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table, { className: "w-5 h-5 text-blue-500" }), " Cuánto te paga tu nivel"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-slate-400 mb-4",
					children: "Por cada 1,000 clics válidos, según los pasos del enlace."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-[#0F1523] border border-white/5 rounded-2xl overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex bg-white/5 border-b border-white/5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex-1 p-3 text-xs font-bold text-slate-400",
							children: "Pasos"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex-1 p-3 text-xs font-bold text-orange-500 text-right bg-orange-500/5",
							children: levelData.name
						})]
					}), [
						2,
						3,
						4,
						5,
						6
					].map((step) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex border-b border-white/5 last:border-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 p-3 text-sm font-medium text-slate-300",
							children: [step, " pasos"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 p-3 text-sm font-bold text-white text-right bg-orange-500/5",
							children: ["$", step === 2 ? "4.00" : step === 3 ? "9.00" : step === 4 ? "12.50" : step === 5 ? "15.80" : "17.50"]
						})]
					}, step))]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "font-bold text-lg text-white mb-1 flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { className: "w-5 h-5 text-blue-500" }), " Tu historial"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-slate-400 mb-4",
					children: "Subidas de nivel y rachas perdidas."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bg-[#0F1523] border border-white/5 rounded-2xl p-6 text-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-slate-500",
						children: "Todavía no hay eventos. Tu primera racha empieza hoy. 🔥"
					})
				})
			] })
		]
	});
}
export { NivelesPage as component };
