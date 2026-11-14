import { __toESM } from "../_runtime.mjs";
import { require_react } from "../_libs/react.mjs";
import { require_jsx_runtime } from "../_libs/react2.mjs";
import "../_libs/firebase.mjs";
import { collection, getDocs, query, where } from "../_libs/@firebase/firestore+[...].mjs";
import { Banknote } from "../_libs/lucide-react7.mjs";
import { Calendar } from "../_libs/lucide-react8.mjs";
import { ChartColumn, Globe } from "../_libs/lucide-react9.mjs";
import { MousePointerClick } from "../_libs/lucide-react43.mjs";
import { Smartphone } from "../_libs/lucide-react50.mjs";
import { Trophy } from "../_libs/lucide-react55.mjs";
import { Route$5, db } from "./router-DtpLq15p.mjs";
// node_modules/.nitro/vite/services/ssr/assets/stats-C-7CCoJQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function StatsPage() {
	const { user } = Route$5.useRouteContext();
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [totalClicks, setTotalClicks] = (0, import_react.useState)(0);
	const [totalEarnings, setTotalEarnings] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		const fetchStats = async () => {
			if (!user) return;
			try {
				const q = query(collection(db, "links"), where("userId", "==", user.uid));
				const querySnapshot = await getDocs(q);
				let clicks = 0;
				let earnings = 0;
				querySnapshot.forEach((doc) => {
					const data = doc.data();
					clicks += data.clicks || 0;
					earnings += data.earnings || 0;
				});
				setTotalClicks(clicks);
				setTotalEarnings(earnings);
			} catch (error) {
				console.error("Error cargando stats:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchStats();
	}, [user]);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "text-center text-white mt-10 font-bold",
		children: "Cargando estadísticas..."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 pb-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-bold text-white mb-1",
				children: "Estadísticas"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-slate-400",
				children: "El histórico completo de tu cuenta."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-[#0F1523] border border-white/5 rounded-2xl p-4 flex flex-col justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "bg-blue-500/10 p-2 rounded-xl w-fit text-blue-500 mb-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MousePointerClick, { className: "w-5 h-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-2xl font-black text-white",
							children: totalClicks
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-slate-400 mt-1",
							children: "Clics válidos (total)"
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-[#0F1523] border border-white/5 rounded-2xl p-4 flex flex-col justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "bg-green-500/10 p-2 rounded-xl w-fit text-green-500 mb-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Banknote, { className: "w-5 h-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "text-xl font-black text-white",
							children: [totalEarnings.toFixed(2).replace(".", ","), " US$"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-slate-400 mt-1",
							children: "Ganado (histórico)"
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-[#0F1523] border border-white/5 rounded-2xl p-4 flex flex-col justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "bg-indigo-500/10 p-2 rounded-xl w-fit text-indigo-500 mb-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "w-5 h-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-xl font-black text-white",
							children: "$0.00"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-slate-400 mt-1",
							children: "eCPM real"
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-[#0F1523] border border-white/5 rounded-2xl p-4 flex flex-col justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "bg-purple-500/10 p-2 rounded-xl w-fit text-purple-500 mb-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "w-5 h-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-xl font-black text-white",
							children: "$0.00"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-slate-400 mt-1",
							children: "Mejor mes"
						})] })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-[#0F1523] border border-white/5 rounded-2xl p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 mb-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { className: "w-5 h-5 text-blue-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-bold text-white",
						children: "Ganancias por mes"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-center py-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-slate-500",
						children: "Sin datos todavía."
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-[#0F1523] border border-white/5 rounded-2xl p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 mb-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smartphone, { className: "w-5 h-5 text-blue-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-bold text-white",
						children: "Dispositivos"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-center py-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-slate-500",
						children: "Sin clics todavía."
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-[#0F1523] border border-white/5 rounded-2xl p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 mb-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "w-5 h-5 text-blue-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-bold text-white",
							children: "Detalle por mes"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between text-xs font-bold text-slate-400 border-b border-white/5 pb-2 mb-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-1/4",
								children: "MES"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-1/4 text-center",
								children: "CLICS"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-1/4 text-right",
								children: "GANADO"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-1/4 text-right",
								children: "ECPM"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-center py-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-slate-500 leading-relaxed",
							children: "Aún no tienes actividad. Cuando generes tus primeros clics aparecerá aquí."
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-[#0F1523] border border-white/5 rounded-2xl p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 mb-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "w-5 h-5 text-blue-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-bold text-white",
						children: "Navegadores"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-center py-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-slate-500",
						children: "Sin clics todavía."
					})
				})]
			})
		]
	});
}
export { StatsPage as component };
