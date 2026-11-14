import { __toESM } from "../_runtime.mjs";
import { require_react } from "../_libs/react.mjs";
import { useNavigate } from "../_libs/@tanstack/react-router+[3...].mjs";
import { require_jsx_runtime } from "../_libs/react2.mjs";
import "../_libs/firebase.mjs";
import { addDoc, collection, doc, getDocs, increment, orderBy, query, serverTimestamp, updateDoc } from "../_libs/@firebase/firestore+[...].mjs";
import { toast } from "../_libs/sonner.mjs";
import { ArrowLeft } from "../_libs/lucide-react3.mjs";
import { CircleCheck } from "../_libs/lucide-react15.mjs";
import { Clock } from "../_libs/lucide-react17.mjs";
import { Flame } from "../_libs/lucide-react26.mjs";
import { Lightbulb } from "../_libs/lucide-react32.mjs";
import { MessageSquare } from "../_libs/lucide-react42.mjs";
import { Send } from "../_libs/lucide-react46.mjs";
import { Route$4, db } from "./router-DtpLq15p.mjs";
// node_modules/.nitro/vite/services/ssr/assets/sugerencias-CU-6XAqH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ADMIN_EMAILS = ["danyxiter67@gmail.com"];
function SugerenciasPage() {
	const { user } = Route$4.useRouteContext();
	const navigate = useNavigate();
	const [ideas, setIdeas] = (0, import_react.useState)([]);
	const [newIdea, setNewIdea] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [sortBy, setSortBy] = (0, import_react.useState)("newest");
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [replyingTo, setReplyingTo] = (0, import_react.useState)(null);
	const [replyText, setReplyText] = (0, import_react.useState)("");
	const isAdmin = user && ADMIN_EMAILS.includes(user.email);
	const nombreUsuario = user?.displayName || user?.email?.split("@")[0] || "Creador";
	const fetchIdeas = async () => {
		try {
			const q = query(collection(db, "suggestions"), orderBy("createdAt", "desc"));
			const snap = await getDocs(q);
			const fetched = [];
			snap.forEach((doc) => fetched.push({
				id: doc.id,
				...doc.data()
			}));
			setIdeas(fetched);
		} catch (error) {
			console.error(error);
			toast.error("Error al cargar las ideas");
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		fetchIdeas();
	}, []);
	const handlePublish = async (e) => {
		e.preventDefault();
		if (!newIdea.trim()) return toast.error("Escribe tu idea primero");
		if (newIdea.length > 600) return toast.error("La idea es muy larga (máx 600)");
		setSubmitting(true);
		try {
			await addDoc(collection(db, "suggestions"), {
				userId: user.uid,
				userName: nombreUsuario,
				idea: newIdea,
				votes: 0,
				status: "pending",
				adminReply: "",
				createdAt: serverTimestamp()
			});
			toast.success("¡Idea publicada!");
			setNewIdea("");
			fetchIdeas();
		} catch (error) {
			toast.error("Error al publicar");
		} finally {
			setSubmitting(false);
		}
	};
	const handleVote = async (id) => {
		try {
			await updateDoc(doc(db, "suggestions", id), { votes: increment(1) });
			setIdeas(ideas.map((i) => i.id === id ? {
				...i,
				votes: i.votes + 1
			} : i));
			toast.success("¡Voto registrado!");
		} catch (error) {
			toast.error("Error al votar");
		}
	};
	const handleReply = async (id) => {
		if (!replyText.trim()) return;
		try {
			await updateDoc(doc(db, "suggestions", id), {
				adminReply: replyText,
				status: "in-progress"
			});
			setIdeas(ideas.map((i) => i.id === id ? {
				...i,
				adminReply: replyText,
				status: "in-progress"
			} : i));
			setReplyingTo(null);
			setReplyText("");
			toast.success("Respuesta enviada");
		} catch (error) {
			toast.error("Error al responder");
		}
	};
	const sortedIdeas = [...ideas].sort((a, b) => {
		if (sortBy === "voted") return b.votes - a.votes;
		return b.createdAt?.toMillis() - a.createdAt?.toMillis();
	});
	const totalIdeas = ideas.length;
	const totalVotes = ideas.reduce((acc, curr) => acc + (curr.votes || 0), 0);
	const inProgress = ideas.filter((i) => i.status === "in-progress").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 pb-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => navigate({ to: "/dashboard" }),
				className: "flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "w-4 h-4" }), " Volver a mi panel"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-[#0F1523] border border-white/5 rounded-3xl p-8 text-center relative overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl -mt-10" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bg-blue-600 w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightbulb, { className: "w-8 h-8 text-white" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-3xl font-black text-white mb-3",
						children: "¿Qué le ponemos a NASETLINK?"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-slate-400 leading-relaxed max-w-sm mx-auto mb-8",
						children: "Escribe lo que te gustaría que tuviera la plataforma. Lo leemos todo, y aquí abajo se ve tu nombre junto a tu idea."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-3 gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-black/30 border border-white/5 rounded-2xl p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-xl font-black text-white",
									children: totalIdeas
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1",
									children: "Ideas"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-black/30 border border-white/5 rounded-2xl p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-xl font-black text-white",
									children: totalVotes
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1",
									children: "Votos"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-black/30 border border-white/5 rounded-2xl p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-xl font-black text-white",
									children: inProgress
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1",
									children: "En marcha"
								})]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-[#0F1523] border border-white/5 rounded-3xl p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold uppercase",
						children: nombreUsuario[0]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-bold text-white",
						children: nombreUsuario
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] text-slate-500",
						children: "Va a salir con tu nombre de creador"
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handlePublish,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2",
							children: "Tu idea"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: newIdea,
							onChange: (e) => setNewIdea(e.target.value),
							maxLength: 600,
							placeholder: "Me gustaría que NASETLINK tuviera...",
							className: "w-full bg-black/30 border border-white/10 rounded-2xl p-4 text-white text-sm outline-none focus:border-blue-500 resize-none h-32 mb-3"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs text-slate-500 font-mono",
								children: [newIdea.length, "/600"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "submit",
								disabled: submitting,
								className: "bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm py-2.5 px-5 rounded-xl flex items-center gap-2 transition disabled:opacity-50",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "w-4 h-4" }),
									" ",
									submitting ? "Publicando..." : "Publicar"
								]
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setSortBy("newest"),
					className: `flex items-center justify-center gap-2 py-3 rounded-xl border font-bold text-sm transition ${sortBy === "newest" ? "bg-blue-600/10 border-blue-500/30 text-blue-500" : "bg-[#0F1523] border-white/5 text-slate-400 hover:text-white"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "w-4 h-4" }), " Más nuevas"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setSortBy("voted"),
					className: `flex items-center justify-center gap-2 py-3 rounded-xl border font-bold text-sm transition ${sortBy === "voted" ? "bg-blue-600/10 border-blue-500/30 text-blue-500" : "bg-[#0F1523] border-white/5 text-slate-400 hover:text-white"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "w-4 h-4" }), " Más votadas"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-4",
				children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-center text-slate-500 text-sm py-10",
					children: "Cargando ideas..."
				}) : sortedIdeas.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-center text-slate-500 text-sm py-10",
					children: "Aún no hay ideas. ¡Sé el primero en proponer algo!"
				}) : sortedIdeas.map((idea) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-[#0F1523] border border-white/5 rounded-2xl p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between mb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-8 h-8 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-slate-300 font-bold text-xs uppercase",
									children: idea.userName ? idea.userName[0] : "U"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-bold text-white",
									children: idea.userName || "Usuario"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] text-slate-500",
									children: idea.createdAt ? new Date(idea.createdAt.toMillis()).toLocaleDateString() : "Reciente"
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => handleVote(idea.id),
								className: "flex flex-col items-center justify-center bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl px-3 py-2 transition group",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "w-4 h-4 text-slate-400 group-hover:text-orange-500 transition-colors mb-1" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-bold text-white",
									children: idea.votes || 0
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-slate-300 leading-relaxed mb-4",
							children: idea.idea
						}),
						idea.adminReply ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 mt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 mb-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-3.5 h-3.5 text-blue-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-bold text-blue-500 uppercase tracking-wider",
									children: "Respuesta del equipo"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-slate-300",
								children: idea.adminReply
							})]
						}) : isAdmin ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 border-t border-white/5 pt-3",
							children: replyingTo === idea.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									value: replyText,
									onChange: (e) => setReplyText(e.target.value),
									placeholder: "Escribe una respuesta...",
									className: "flex-1 bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-blue-500"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => handleReply(idea.id),
									className: "bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-lg",
									children: "Enviar"
								})]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setReplyingTo(idea.id),
								className: "flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 font-bold transition",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "w-3.5 h-3.5" }), " Responder como Admin"]
							})
						}) : null
					]
				}, idea.id))
			})
		]
	});
}
export { SugerenciasPage as component };
