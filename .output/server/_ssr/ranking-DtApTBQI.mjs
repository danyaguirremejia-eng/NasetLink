import { __toESM } from "../_runtime.mjs";
import { require_react } from "../_libs/react.mjs";
import { require_jsx_runtime } from "../_libs/react2.mjs";
import "../_libs/firebase.mjs";
import { collection, getDocs, query, where } from "../_libs/@firebase/firestore+[...].mjs";
import { Eye, EyeOff } from "../_libs/lucide-react23.mjs";
import { Flame } from "../_libs/lucide-react26.mjs";
import { User } from "../_libs/lucide-react57.mjs";
import { Route$8, db } from "./router-DtpLq15p.mjs";
// node_modules/.nitro/vite/services/ssr/assets/ranking-DtApTBQI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function RankingPage() {
	const { user } = Route$8.useRouteContext();
	const [earnings, setEarnings] = (0, import_react.useState)(0);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [hidden, setHidden] = (0, import_react.useState)(false);
	const [activeTab, setActiveTab] = (0, import_react.useState)("Este mes");
	(0, import_react.useEffect)(() => {
		const fetchEarnings = async () => {
			if (!user) return;
			try {
				const q = query(collection(db, "links"), where("userId", "==", user.uid));
				const snap = await getDocs(q);
				let total = 0;
				snap.forEach((doc) => {
					total += doc.data().earnings || 0;
				});
				setEarnings(total);
			} catch (error) {
				console.error("Error cargando ranking:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchEarnings();
	}, [user]);
	const getSaludo = () => {
		const hora = (/* @__PURE__ */ new Date()).getHours();
		if (hora >= 6 && hora < 12) return "Buenos días";
		if (hora >= 12 && hora < 20) return "Buenas tardes";
		return "Buenas noches";
	};
	const nombreUsuario = user?.displayName?.split(" ")[0] || user?.email?.split("@")[0] || "Usuario";
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "text-center text-white mt-10 font-bold",
		children: "Cargando ranking..."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 pb-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "text-3xl font-black text-white mb-1",
				children: [
					getSaludo(),
					", ",
					nombreUsuario,
					" 👋"
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-slate-400",
				children: "Los que más generan en la plataforma. ¡Sube tu posición! 🔥"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-4 gap-2",
				children: [
					"Hoy",
					"Esta semana",
					"Este mes",
					"Mes anterior"
				].map((tab) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setActiveTab(tab),
					className: `py-2 text-[11px] font-semibold rounded-xl transition-colors ${activeTab === tab ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" : "bg-[#0F1523] border border-white/5 text-slate-400 hover:text-white"}`,
					children: tab
				}, tab))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-gradient-to-br from-[#1e3a8a] via-[#2563eb] to-[#06b6d4] rounded-3xl p-6 shadow-xl relative overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-white/90 mb-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "w-5 h-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-sm font-medium",
							children: ["Tu posición · ", activeTab]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-baseline gap-2 mb-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-2 w-12 bg-white rounded-full" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "text-4xl font-black text-white",
								children: ["#", earnings > 0 ? "1" : "-"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-white/80",
								children: "de 5 creadores"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "inline-flex items-center gap-2 bg-black/30 border border-white/10 px-4 py-2 rounded-xl backdrop-blur-md",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "bg-white/20 p-1 rounded-md",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "w-4 h-4 text-white" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-white font-medium text-sm",
							children: ["Generaste $", earnings.toFixed(2)]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-3 gap-2 items-end pt-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-[#0F1523] border border-white/5 rounded-2xl p-4 text-center pb-6 relative",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-xs font-bold text-white border-4 border-[#0F1523]",
								children: "2°"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-3 flex items-center justify-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "w-7 h-7 text-white" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-bold text-white leading-tight",
								children: "Emon Vai"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-[#0F1523] border border-yellow-500/30 rounded-2xl p-4 text-center pb-8 relative shadow-[0_0_30px_-10px_rgba(234,179,8,0.3)]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-xs font-bold text-white border-4 border-[#0F1523]",
								children: "1°"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-3 flex items-center justify-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "w-8 h-8 text-white" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm font-bold text-white leading-tight",
								children: [
									"No.mbs.",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									"Le.nson."
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-[#0F1523] border border-white/5 rounded-2xl p-4 text-center pb-6 relative",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-orange-700 rounded-full flex items-center justify-center text-xs font-bold text-white border-4 border-[#0F1523]",
								children: "3°"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-3 flex items-center justify-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "w-7 h-7 text-white" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm font-bold text-white leading-tight",
								children: [
									"xXCris_Cra",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									"ftXx"
								]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between mb-3 mt-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "text-sm font-bold text-white",
					children: ["Top 5 · ", activeTab]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-slate-500",
					children: "5 creadores"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-[#0F1523] border border-white/5 rounded-2xl overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-4 p-4 border-b border-white/5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-bold text-slate-500 w-4",
							children: "#4"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "w-5 h-5 text-white" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-bold text-white",
							children: "C3SAR MODZ OFC"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-4 p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-bold text-slate-500 w-4",
							children: "#5"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "w-5 h-5 text-white" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-bold text-white",
							children: "Pana18 Bonilla"
						})
					]
				})]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-[#0F1523] border border-white/5 rounded-2xl p-4 flex items-center justify-between mt-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "w-5 h-5 text-blue-500" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] text-slate-400",
						children: "Tu posición este mes"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm font-bold text-white",
						children: [earnings > 0 ? "Estás en el Top" : "Sin clics este mes", " · 5 creadores"]
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setHidden(!hidden),
					className: "bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold py-2 px-3 rounded-lg flex items-center gap-2 transition",
					children: [hidden ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "w-4 h-4" }), hidden ? "Mostrarme" : "Ocultarme"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-[10px] text-slate-500 flex items-start gap-1.5 px-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "w-3.5 h-3.5 shrink-0 mt-0.5" }), "Si te ocultas, sigues contando para tu posición, pero los demás te ven como \"Creador anónimo\" y sin foto."]
			})
		]
	});
}
export { RankingPage as component };
