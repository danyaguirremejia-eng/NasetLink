import { __toESM } from "../_runtime.mjs";
import { require_react } from "../_libs/react.mjs";
import { require_jsx_runtime } from "../_libs/react2.mjs";
import "../_libs/firebase.mjs";
import { collection, doc, getDoc, getDocs, query, setDoc, where } from "../_libs/@firebase/firestore+[...].mjs";
import { toast } from "../_libs/sonner.mjs";
import { Award } from "../_libs/lucide-react5.mjs";
import { Clock } from "../_libs/lucide-react17.mjs";
import { Copy } from "../_libs/lucide-react20.mjs";
import { Flame } from "../_libs/lucide-react26.mjs";
import { Gift } from "../_libs/lucide-react27.mjs";
import { Hourglass } from "../_libs/lucide-react29.mjs";
import { MessageCircle } from "../_libs/lucide-react41.mjs";
import { MousePointerClick } from "../_libs/lucide-react43.mjs";
import { TrendingUp } from "../_libs/lucide-react53.mjs";
import { Wallet } from "../_libs/lucide-react59.mjs";
import { X } from "../_libs/lucide-react60.mjs";
import { Route$15, db } from "./router-DtpLq15p.mjs";
// node_modules/.nitro/vite/services/ssr/assets/dashboard-CDdfrQIB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LinksTable({ links = [], onCopy }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "panel rounded-3xl p-5 sm:p-7",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-heading text-lg font-bold text-white",
				children: "Mis Enlaces"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400",
				children: [
					links.length,
					" ",
					links.length === 1 ? "enlace" : "enlaces"
				]
			})]
		}), links.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "rounded-2xl border border-dashed border-white/12 bg-white/[0.02] px-6 py-10 text-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-slate-400",
				children: "Aún no tienes links. Crea uno arriba."
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "-mx-1 overflow-x-auto no-scrollbar",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full min-w-[520px] border-collapse text-left",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "text-[10px] uppercase tracking-[0.16em] text-slate-500",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-2 pb-3 font-semibold",
							children: "URL Corta"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-2 pb-3 font-semibold",
							children: "Clics"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-2 pb-3 text-right font-semibold",
							children: "Ganancias"
						})
					]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: links.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-t border-white/[0.07]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							className: "px-2 py-3.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-mono text-[13px] text-[#00f0ff]",
									children: ["/s/", link.short_code]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => onCopy?.(link),
									className: "rounded-md p-1 text-slate-500 transition-colors hover:bg-white/10 hover:text-white",
									"aria-label": "Copiar enlace",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-3.5 w-3.5" })
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-0.5 max-w-[240px] truncate text-[11px] text-slate-500",
								children: link.original_url
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-2 py-3.5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1.5 text-sm font-semibold text-slate-200",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MousePointerClick, { className: "h-3.5 w-3.5 text-[#3b82f6]" }), link.clicks ?? 0]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-2 py-3.5 text-right",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1 text-sm font-bold text-emerald-400",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-3.5 w-3.5" }),
									"$",
									Number(link.earnings ?? 0).toFixed(3)
								]
							})
						})
					]
				}, link.id)) })]
			})
		})]
	});
}
function DashboardPage() {
	const { user } = Route$15.useRouteContext();
	const [links, setLinks] = (0, import_react.useState)([]);
	const [balance, setBalance] = (0, import_react.useState)(0);
	const [totalClicks, setTotalClicks] = (0, import_react.useState)(0);
	const [totalEarnings, setTotalEarnings] = (0, import_react.useState)(0);
	const [loadingData, setLoadingData] = (0, import_react.useState)(true);
	const [showPromo, setShowPromo] = (0, import_react.useState)(true);
	const [meta, setMeta] = (0, import_react.useState)(0);
	const [showMetaModal, setShowMetaModal] = (0, import_react.useState)(false);
	const [metaInput, setMetaInput] = (0, import_react.useState)("");
	const fetchData = async () => {
		if (!user) return;
		setLoadingData(true);
		try {
			const q = query(collection(db, "links"), where("userId", "==", user.uid));
			const querySnapshot = await getDocs(q);
			let fetchedLinks = [];
			let tClicks = 0;
			let tEarnings = 0;
			querySnapshot.forEach((doc) => {
				const data = doc.data();
				fetchedLinks.push({
					id: doc.id,
					...data
				});
				tClicks += data.clicks || 0;
				tEarnings += data.earnings || 0;
			});
			setLinks(fetchedLinks.reverse());
			setTotalClicks(tClicks);
			setTotalEarnings(tEarnings);
			setBalance(tEarnings);
			const userRef = doc(db, "users", user.uid);
			const userSnap = await getDoc(userRef);
			if (userSnap.exists() && userSnap.data().metaMensual) setMeta(userSnap.data().metaMensual);
		} catch (error) {
			console.error("Error al cargar datos:", error);
			toast.error("No se pudieron cargar los datos");
		} finally {
			setLoadingData(false);
		}
	};
	(0, import_react.useEffect)(() => {
		fetchData();
	}, [user]);
	const handleCopy = async (text) => {
		try {
			await navigator.clipboard.writeText(text);
			toast.success("Copiado al portapapeles");
		} catch {
			toast.error("No se pudo copiar");
		}
	};
	const handleSaveMeta = async () => {
		const val = Number(metaInput);
		if (!val || val <= 0) return toast.error("Ingresa un valor válido");
		try {
			await setDoc(doc(db, "users", user.uid), { metaMensual: val }, { merge: true });
			setMeta(val);
			setShowMetaModal(false);
			setMetaInput("");
			toast.success("¡Meta guardada!");
		} catch (err) {
			toast.error("Error al guardar la meta");
		}
	};
	const getSaludo = () => {
		const hora = (/* @__PURE__ */ new Date()).getHours();
		if (hora >= 6 && hora < 12) return "Buenos días";
		if (hora >= 12 && hora < 20) return "Buenas tardes";
		return "Buenas noches";
	};
	const nombreUsuario = user?.displayName?.split(" ")[0] || user?.email?.split("@")[0] || "Usuario";
	const domain = window.location.origin;
	if (loadingData) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "text-center text-white mt-10 font-bold",
		children: "Cargando NASETLINK..."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 pb-6 relative",
		children: [
			showMetaModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-[#0F1523] border border-white/10 rounded-3xl p-6 w-full max-w-sm shadow-2xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-xl font-bold text-white mb-2",
							children: "Definir meta"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-slate-400 mb-4",
							children: "¿Cuál es tu meta de ganancias este mes? (USD)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "number",
							value: metaInput,
							onChange: (e) => setMetaInput(e.target.value),
							placeholder: "Ej. 50",
							className: "w-full bg-black/30 border border-white/10 rounded-xl p-3 text-white mb-6 outline-none focus:border-blue-500"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setShowMetaModal(false),
								className: "flex-1 py-3 text-sm font-bold text-slate-300 bg-white/5 hover:bg-white/10 rounded-xl transition",
								children: "Cancelar"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: handleSaveMeta,
								className: "flex-1 py-3 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition",
								children: "Aceptar"
							})]
						})
					]
				})
			}),
			showPromo && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative bg-[#0F1523] border border-green-500/20 rounded-2xl p-4 flex items-start gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bg-green-500/10 p-2 rounded-xl text-green-500 shrink-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "w-6 h-6" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-bold text-sm mb-1 text-white",
								children: "Entra al grupo oficial de NASETLINK"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-slate-400 leading-relaxed mb-3",
								children: [
									"Ahí avisamos los pagos, los cambios de eCPM y los sorteos ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-white",
										children: "antes que en ningún lado"
									}),
									"."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: "#",
								className: "bg-green-500 hover:bg-green-600 text-white text-sm font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition w-full max-w-[200px]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "w-4 h-4" }), " Unirme ahora"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setShowPromo(false),
						className: "text-slate-500 hover:text-white p-1 absolute top-3 right-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-4 h-4" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "text-3xl font-black tracking-tight text-white",
				children: [
					getSaludo(),
					", ",
					nombreUsuario,
					" 👋"
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-slate-400 text-sm mt-1",
				children: "Este es el pulso de tu cuenta."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 mb-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-1 h-4 bg-blue-500 rounded-full" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-bold text-lg text-white",
					children: "Resumen"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-5 shadow-lg relative overflow-hidden mb-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between items-start mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-blue-100",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-medium",
								children: "Tu saldo"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "bg-white/20 text-white text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-sm",
							children: "Noviembre"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						className: "text-5xl font-black mb-4",
						children: ["$", balance.toFixed(2)]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2 mb-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-blue-100 flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "w-4 h-4" }), " Generado este mes"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-semibold",
								children: ["$", totalEarnings.toFixed(2)]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-blue-100 flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, { className: "w-4 h-4" }), " Puedes retirar ya"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-semibold",
								children: ["$", balance.toFixed(2)]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "bg-white text-blue-700 font-bold text-sm py-2 px-4 rounded-xl flex items-center gap-2 hover:bg-blue-50 transition",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, { className: "w-4 h-4" }), " Retirar"]
					})
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-[#0F1523] border border-white/5 rounded-2xl p-5 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-slate-400 mb-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hourglass, { className: "w-4 h-4 text-blue-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm",
							children: "Pendiente"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-4xl font-black text-white",
						children: "$0.00"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs text-slate-500 flex items-center gap-1 mt-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "w-3 h-3" }), " En proceso"]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-white/5 rounded-xl px-4 py-2 text-right",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-slate-400 mb-1",
						children: "Total ganado"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-bold text-lg text-white",
						children: ["$", totalEarnings.toFixed(2)]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-[#0F1523] border border-white/5 rounded-2xl p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between items-center mb-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "bg-orange-500/10 p-2 rounded-xl text-orange-500 border border-orange-500/20",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "w-6 h-6" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-slate-400",
								children: "Tu nivel · Bronce"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-bold text-lg text-white",
								children: "LEVEL 1"
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-white/5 rounded-xl px-3 py-2 text-center border border-white/5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-center gap-1 text-xs text-slate-400 mb-0.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "w-3 h-3 text-blue-500" }), " RACHA"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-bold text-sm text-white",
								children: "Día 1/9"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-slate-400",
									children: "Hoy llevas"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-slate-400",
									children: ["Para subir a ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-white",
										children: "LEVEL 1"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between items-end",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-3xl font-black text-white",
									children: [
										totalClicks,
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-lg text-slate-500 font-medium",
											children: "/ 300"
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-slate-400 font-medium",
									children: "300/día × 9 días"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-full bg-white/10 h-2 rounded-full overflow-hidden",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "bg-blue-500 h-full rounded-full",
									style: { width: `${Math.min(totalClicks / 300 * 100, 100)}%` }
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-slate-400 mt-2",
								children: [
									"Te faltan ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-white",
										children: Math.max(300 - totalClicks, 0)
									}),
									" clics válidos antes de las 12:00 AM"
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-1.5 mt-4",
						children: [
							1,
							2,
							3,
							4,
							5,
							6,
							7,
							8,
							9
						].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `flex-1 aspect-square flex items-center justify-center rounded-lg border text-xs font-bold ${i === 1 ? "border-blue-500 bg-blue-500/10 text-blue-400" : "border-white/10 bg-white/5 text-slate-500"}`,
							children: i
						}, i))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 bg-white/5 rounded-lg p-2 text-center text-xs text-slate-400",
						children: [
							"Falla ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "text-white",
								children: "1 día"
							}),
							" – racha completa perdida · nunca bajas de nivel"
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-4 gap-2 bg-[#0F1523] p-1 rounded-xl border border-white/5",
				children: [
					"Hoy",
					"Ayer",
					"Este mes",
					"Mes ant."
				].map((tab, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: `py-2 text-[11px] font-semibold rounded-lg ${i === 0 ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"}`,
					children: tab
				}, tab))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-3 gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-[#0F1523] border border-white/5 rounded-2xl p-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "bg-blue-500/10 p-1.5 rounded-lg w-fit mb-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, { className: "w-4 h-4 text-blue-500" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
								className: "text-lg font-black text-white",
								children: ["$", totalEarnings.toFixed(2)]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] text-slate-400 mt-0.5",
								children: "Ganancias"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-[#0F1523] border border-white/5 rounded-2xl p-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "bg-blue-500/10 p-1.5 rounded-lg w-fit mb-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "w-4 h-4 text-blue-500" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "text-lg font-black text-white",
								children: totalClicks
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] text-slate-400 mt-0.5",
								children: "Clics"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-[#0F1523] border border-white/5 rounded-2xl p-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "bg-blue-500/10 p-1.5 rounded-lg w-fit mb-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "w-4 h-4 text-blue-500" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "text-lg font-black text-white",
								children: "$17.50"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] text-slate-400 mt-0.5",
								children: "eCPM"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LinksTable, {
				links,
				onCopy: () => handleCopy(`${domain}/s/${links.short_code}`)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-[#0F1523] border border-white/5 rounded-2xl p-6 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-center gap-2 mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bg-blue-500/10 p-2 rounded-xl",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "w-5 h-5 text-blue-500" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-bold text-lg text-white",
						children: "Meta del mes"
					})]
				}), meta > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-slate-400 mb-1",
							children: "Tu meta actual"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-3xl font-black text-blue-500",
							children: ["$", meta.toFixed(2)]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => {
								setMetaInput(meta);
								setShowMetaModal(true);
							},
							className: "mt-3 text-xs text-slate-400 hover:text-white underline",
							children: "Editar meta"
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-slate-400 mb-2",
						children: "Define tu meta del mes"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-slate-500 mb-4",
						children: [
							"Sugerida: ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "text-slate-300",
								children: "$5.00"
							}),
							" (un 25% más que tu mes pasado)"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setShowMetaModal(true),
						className: "bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2.5 px-6 rounded-xl transition",
						children: "Poner meta"
					})
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-[#0F1523] border border-white/5 rounded-2xl p-4 flex items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bg-pink-500/10 p-2.5 rounded-xl text-pink-500",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gift, { className: "w-6 h-6" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-bold text-sm text-white",
						children: "Invita y gana"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-slate-400 mt-0.5",
						children: "Comisión durante 6 meses."
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => handleCopy(`${domain}/register?ref=${user?.uid}`),
					className: "bg-white/10 hover:bg-white/20 text-white p-2.5 rounded-lg transition flex items-center gap-2 text-xs font-bold shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "w-4 h-4" }), " Copiar"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-center text-[10px] text-slate-600 font-mono pb-4",
				children: "NASETLINK build 32"
			})
		]
	});
}
export { DashboardPage as component };
