import { __toESM } from "../_runtime.mjs";
import { require_react } from "../_libs/react.mjs";
import { require_jsx_runtime } from "../_libs/react2.mjs";
import "../_libs/firebase.mjs";
import { addDoc, collection, getDocs, query, serverTimestamp, where } from "../_libs/@firebase/firestore+[...].mjs";
import { toast } from "../_libs/sonner.mjs";
import { Calendar } from "../_libs/lucide-react8.mjs";
import { ChevronDown } from "../_libs/lucide-react11.mjs";
import { CircleCheck } from "../_libs/lucide-react15.mjs";
import { Clock } from "../_libs/lucide-react17.mjs";
import { History } from "../_libs/lucide-react28.mjs";
import { Hourglass } from "../_libs/lucide-react29.mjs";
import { Send } from "../_libs/lucide-react46.mjs";
import { Wallet } from "../_libs/lucide-react59.mjs";
import { Route$6, db } from "./router-DtpLq15p.mjs";
// node_modules/.nitro/vite/services/ssr/assets/retiros-CHkMiT-g.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function WithdrawalsPage() {
	const { user } = Route$6.useRouteContext();
	const [balance, setBalance] = (0, import_react.useState)(0);
	const [totalEarnings, setTotalEarnings] = (0, import_react.useState)(0);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [amount, setAmount] = (0, import_react.useState)("");
	const [method, setMethod] = (0, import_react.useState)("Binance (USDT)");
	const [requesting, setRequesting] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const fetchBalance = async () => {
			if (!user) return;
			try {
				const q = query(collection(db, "links"), where("userId", "==", user.uid));
				const querySnapshot = await getDocs(q);
				let earnings = 0;
				querySnapshot.forEach((doc) => {
					earnings += doc.data().earnings || 0;
				});
				setTotalEarnings(earnings);
				setBalance(earnings);
			} catch (error) {
				console.error("Error cargando balance:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchBalance();
	}, [user]);
	const handleRequest = async () => {
		const val = Number(amount);
		if (!val || val < 5) return toast.error("El monto mínimo es $5.00");
		if (val > balance) return toast.error("No tienes saldo suficiente");
		setRequesting(true);
		try {
			await addDoc(collection(db, "withdrawals"), {
				userId: user.uid,
				amount: val,
				method,
				status: "pending",
				createdAt: serverTimestamp()
			});
			toast.success("¡Solicitud de retiro enviada!");
			setAmount("");
		} catch (error) {
			console.error(error);
			toast.error("Error al procesar el retiro");
		} finally {
			setRequesting(false);
		}
	};
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "text-center text-white mt-10 font-bold",
		children: "Cargando datos..."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 pb-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl font-bold text-white mb-1",
					children: "Retiros"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-slate-400",
					children: "Retira lo de meses anteriores del 1 al 5. Lo de este mes se libera el próximo."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "inline-flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full mt-3 text-xs font-semibold text-slate-300",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "w-3.5 h-3.5" }), " Abre el día 1 del próximo mes"]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-gradient-to-br from-blue-600 via-purple-600 to-red-500 rounded-3xl p-6 shadow-lg relative overflow-hidden text-white",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-white/90 mb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, { className: "w-5 h-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-medium",
							children: "Disponible para retirar"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "text-5xl font-black mb-5",
						children: [balance.toFixed(2).replace(".", ","), " US$"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "inline-flex items-center gap-2 bg-black/20 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "bg-white/20 w-4 h-4 rounded-full flex items-center justify-center font-bold text-[10px]",
									children: "i"
								}), "Mínimo $5.00"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "inline-flex items-center gap-2 bg-black/20 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm",
									children: "🏛️"
								}), " Banco de mi país: mínimo $50.00"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "inline-flex items-center gap-2 bg-black/20 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "w-3.5 h-3.5" }),
									" Este mes llevas ",
									totalEarnings.toFixed(2).replace(".", ","),
									" US$ · lo cobras el próximo"
								]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-[#0F1523] border border-white/5 rounded-2xl p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-bold text-white mb-4",
					children: "Resumen"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-center border-b border-white/5 pb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "bg-yellow-500/10 p-2 rounded-lg text-yellow-500",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hourglass, { className: "w-4 h-4" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm text-slate-300",
									children: "En proceso"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-bold text-sm text-white",
								children: "0,00 US$"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-center border-b border-white/5 pb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "bg-green-500/10 p-2 rounded-lg text-green-500",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-4 h-4" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm text-slate-300",
									children: "Total cobrado"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-bold text-sm text-white",
								children: "0,00 US$"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "bg-blue-500/10 p-2 rounded-lg text-blue-500",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, { className: "w-4 h-4" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm text-slate-300",
									children: "Total ganado"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-bold text-sm text-white",
								children: [totalEarnings.toFixed(2).replace(".", ","), " US$"]
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-[#0F1523] border border-white/5 rounded-2xl p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-4 mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "bg-blue-500/10 p-2.5 rounded-xl text-blue-500 shrink-0 h-fit",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "w-5 h-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-bold text-white text-sm",
							children: "Retiros del 15 de octubre al 14 de noviembre"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-slate-400 mt-1",
							children: "El pago llega del 15 al 20 de noviembre · 0 día(s) para cerrar"
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2 mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 bg-white/5 p-3 rounded-xl text-xs text-slate-300",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "bg-blue-500 text-white w-5 h-5 rounded flex items-center justify-center font-bold shrink-0",
									children: "1"
								}),
								"Pides el ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "text-white",
									children: "1 y el 2"
								}),
								" · el pago llega del ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "text-white",
									children: "1 al 5"
								}),
								"."
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 bg-white/5 p-3 rounded-xl text-xs text-slate-300",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "bg-blue-500 text-white w-5 h-5 rounded flex items-center justify-center font-bold shrink-0",
									children: "2"
								}),
								"Pides ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "text-white",
									children: "del 15 al 14"
								}),
								" · el pago llega del ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "text-white",
									children: "15 al 20"
								}),
								"."
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[10px] text-slate-500 flex items-start gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "w-3.5 h-3.5 shrink-0 mt-0.5" }), " Todo con la hora de Venezuela (UTC-4): cuando allí son las 12 de la noche, cambia el día para todos."]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-[#0F1523] border border-white/5 rounded-2xl p-5 space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "block text-xs text-slate-400 mb-2",
					children: "Monto a retirar"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-bold",
							children: "$"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "number",
							value: amount,
							onChange: (e) => setAmount(e.target.value),
							placeholder: "0.00",
							className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-8 pr-4 text-white outline-none focus:border-blue-500 font-medium"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: handleRequest,
						disabled: requesting,
						className: "bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 rounded-xl flex items-center gap-2 transition disabled:opacity-50",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "w-4 h-4" }), requesting ? "..." : "Pedir"]
					})]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: method,
						onChange: (e) => setMethod(e.target.value),
						className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 text-white outline-none focus:border-blue-500 appearance-none font-medium",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "Binance (USDT)",
							children: "Binance (USDT)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "PayPal",
							children: "PayPal"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" })]
				}) })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-[#0F1523] border border-white/5 rounded-2xl p-5 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { className: "w-5 h-5 text-blue-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-bold text-white",
						children: "Historial"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-slate-500 py-6",
					children: "Aún no tienes retiros."
				})]
			})
		]
	});
}
export { WithdrawalsPage as component };
