import { __toESM } from "../_runtime.mjs";
import { require_react } from "../_libs/react.mjs";
import { useNavigate } from "../_libs/@tanstack/react-router+[3...].mjs";
import { require_jsx_runtime } from "../_libs/react2.mjs";
import "../_libs/firebase.mjs";
import { addDoc, collection, doc, getDocs, serverTimestamp, updateDoc } from "../_libs/@firebase/firestore+[...].mjs";
import { toast } from "../_libs/sonner.mjs";
import { BadgeCheck, Ban } from "../_libs/lucide-react6.mjs";
import { CircleCheck } from "../_libs/lucide-react15.mjs";
import { LoaderCircle } from "../_libs/lucide-react35.mjs";
import { Megaphone } from "../_libs/lucide-react40.mjs";
import { Search } from "../_libs/lucide-react45.mjs";
import { Send } from "../_libs/lucide-react46.mjs";
import { ShieldAlert } from "../_libs/lucide-react48.mjs";
import { Star } from "../_libs/lucide-react51.mjs";
import { Route$18, db } from "./router-DtpLq15p.mjs";
// node_modules/.nitro/vite/services/ssr/assets/admin-BVyOq6Tw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ADMIN_EMAILS = ["danyxiter67@gmail.com"];
function AdminPage() {
	const { user } = Route$18.useRouteContext();
	const navigate = useNavigate();
	const [users, setUsers] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [search, setSearch] = (0, import_react.useState)("");
	const [updating, setUpdating] = (0, import_react.useState)(null);
	const [annTitle, setAnnTitle] = (0, import_react.useState)("");
	const [annMessage, setAnnMessage] = (0, import_react.useState)("");
	const [annType, setAnnType] = (0, import_react.useState)("info");
	const [publishing, setPublishing] = (0, import_react.useState)(false);
	const isAdmin = user && ADMIN_EMAILS.includes(user.email);
	(0, import_react.useEffect)(() => {
		if (!isAdmin) {
			toast.error("No tienes permiso para estar aquí");
			navigate({ to: "/dashboard" });
			return;
		}
		fetchUsers();
	}, [user, isAdmin]);
	const fetchUsers = async () => {
		try {
			const querySnapshot = await getDocs(collection(db, "users"));
			const fetchedUsers = [];
			querySnapshot.forEach((doc) => {
				fetchedUsers.push({
					id: doc.id,
					...doc.data()
				});
			});
			setUsers(fetchedUsers);
		} catch (error) {
			console.error("Error cargando usuarios:", error);
		} finally {
			setLoading(false);
		}
	};
	const updateUser = async (uid, data) => {
		setUpdating(uid);
		try {
			await updateDoc(doc(db, "users", uid), data);
			setUsers(users.map((u) => u.id === uid ? {
				...u,
				...data
			} : u));
			toast.success("Usuario actualizado");
		} catch (error) {
			toast.error("Error al actualizar");
		} finally {
			setUpdating(null);
		}
	};
	const handlePublishAnnouncement = async (e) => {
		e.preventDefault();
		if (!annTitle.trim() || !annMessage.trim()) return toast.error("Llena los campos");
		setPublishing(true);
		try {
			await addDoc(collection(db, "announcements"), {
				title: annTitle,
				message: annMessage,
				type: annType,
				createdAt: serverTimestamp()
			});
			toast.success("¡Anuncio publicado!");
			setAnnTitle("");
			setAnnMessage("");
			setAnnType("info");
		} catch (error) {
			toast.error("Error al publicar");
		} finally {
			setPublishing(false);
		}
	};
	const filteredUsers = users.filter((u) => (u.email || "").toLowerCase().includes(search.toLowerCase()) || (u.displayName || "").toLowerCase().includes(search.toLowerCase()) || u.id.includes(search));
	if (loading || !isAdmin) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "text-center text-white mt-10 font-bold",
		children: "Verificando permisos..."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 pb-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bg-red-500/10 p-2.5 rounded-xl text-red-500",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "w-6 h-6" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-black text-white leading-tight",
					children: "Panel de Administrador"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-slate-400 mt-1",
					children: "Gestiona usuarios y publica anuncios."
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-[#0F1523] border border-blue-500/20 rounded-2xl p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Megaphone, { className: "w-5 h-5 text-blue-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-bold text-white",
						children: "Publicar Anuncio"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handlePublishAnnouncement,
					className: "space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							placeholder: "Título del anuncio",
							value: annTitle,
							onChange: (e) => setAnnTitle(e.target.value),
							className: "w-full bg-black/30 border border-white/10 rounded-xl p-3 text-white text-sm outline-none focus:border-blue-500"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							placeholder: "Escribe el mensaje aquí...",
							value: annMessage,
							onChange: (e) => setAnnMessage(e.target.value),
							rows: 4,
							className: "w-full bg-black/30 border border-white/10 rounded-xl p-3 text-white text-sm outline-none focus:border-blue-500 resize-none"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex gap-2",
							children: [
								"info",
								"success",
								"warning"
							].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setAnnType(t),
								className: `flex-1 py-2 text-xs font-bold rounded-lg border transition ${annType === t ? "bg-blue-600 border-blue-500 text-white" : "border-white/10 text-slate-400 hover:bg-white/5"}`,
								children: t === "info" ? "Info (Azul)" : t === "success" ? "Éxito (Verde)" : "Alerta (Amarillo)"
							}, t))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "submit",
							disabled: publishing,
							className: "w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition disabled:opacity-50",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "w-4 h-4" }),
								" ",
								publishing ? "Publicando..." : "Publicar Anuncio"
							]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mt-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "text",
					placeholder: "Buscar usuario...",
					value: search,
					onChange: (e) => setSearch(e.target.value),
					className: "w-full bg-[#0F1523] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-slate-600 outline-none focus:border-blue-500 transition-colors"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: filteredUsers.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-[#0F1523] border border-white/5 rounded-2xl p-4 flex flex-col gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-bold text-white flex items-center gap-2",
							children: [
								u.displayName || "Sin nombre",
								u.verified && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, { className: "w-4 h-4 text-blue-500" }),
								u.role === "influencer" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "w-4 h-4 text-yellow-500" })
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-slate-400",
							children: u.email || "Sin correo"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-right",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs font-bold text-slate-300 bg-white/5 px-2 py-1 rounded-lg",
								children: ["Nivel ", u.level || 1]
							})
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2 border-t border-white/5 pt-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => updateUser(u.id, { verified: !u.verified }),
								className: `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${u.verified ? "bg-blue-500/20 text-blue-400" : "bg-white/5 text-slate-400"}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, { className: "w-3.5 h-3.5" }),
									" ",
									u.verified ? "Quitar Verif." : "Verificar"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => updateUser(u.id, { role: u.role === "influencer" ? "user" : "influencer" }),
								className: `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${u.role === "influencer" ? "bg-yellow-500/20 text-yellow-500" : "bg-white/5 text-slate-400"}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "w-3.5 h-3.5" }),
									" ",
									u.role === "influencer" ? "Quitar Influ." : "Influencer"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => updateUser(u.id, { level: (u.level || 1) + 1 }),
								className: "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-white/5 text-slate-400",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "w-3.5 h-3.5" }), " +1 Nivel"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => updateUser(u.id, { suspended: !u.suspended }),
								className: `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${u.suspended ? "bg-red-500 text-white" : "bg-red-500/10 text-red-500"}`,
								children: [u.suspended ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, { className: "w-3.5 h-3.5" }), u.suspended ? "Reactivar" : "Suspender"]
							}),
							updating === u.id && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-4 h-4 animate-spin text-slate-400 ml-auto" })
						]
					})]
				}, u.id))
			})
		]
	});
}
export { AdminPage as component };
