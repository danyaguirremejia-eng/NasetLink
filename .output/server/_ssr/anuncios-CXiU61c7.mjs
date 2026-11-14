import { __toESM } from "../_runtime.mjs";
import { require_react } from "../_libs/react.mjs";
import { require_jsx_runtime } from "../_libs/react2.mjs";
import "../_libs/firebase.mjs";
import { collection, getDocs, orderBy, query } from "../_libs/@firebase/firestore+[...].mjs";
import { CircleCheck } from "../_libs/lucide-react15.mjs";
import { Info } from "../_libs/lucide-react30.mjs";
import { TriangleAlert } from "../_libs/lucide-react54.mjs";
import { db } from "./router-DtpLq15p.mjs";
// node_modules/.nitro/vite/services/ssr/assets/anuncios-CXiU61c7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AnunciosPage() {
	const [announcements, setAnnouncements] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		const fetchAnnouncements = async () => {
			try {
				const q = query(collection(db, "announcements"), orderBy("createdAt", "desc"));
				const snap = await getDocs(q);
				const fetched = [];
				snap.forEach((doc) => fetched.push({
					id: doc.id,
					...doc.data()
				}));
				setAnnouncements(fetched);
			} catch (error) {
				console.error("Error cargando anuncios:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchAnnouncements();
	}, []);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "text-center text-white mt-10 font-bold",
		children: "Cargando anuncios..."
	});
	const getStyle = (type) => {
		switch (type) {
			case "success": return {
				icon: CircleCheck,
				color: "text-green-500",
				bg: "bg-green-500/10",
				border: "border-green-500/20"
			};
			case "warning": return {
				icon: TriangleAlert,
				color: "text-yellow-500",
				bg: "bg-yellow-500/10",
				border: "border-yellow-500/20"
			};
			default: return {
				icon: Info,
				color: "text-blue-500",
				bg: "bg-blue-500/10",
				border: "border-blue-500/20"
			};
		}
	};
	const formatDate = (timestamp) => {
		if (!timestamp) return "";
		return timestamp.toDate().toLocaleDateString("es-ES", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric"
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 pb-24",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-3xl font-bold text-white mb-1",
			children: "Anuncios"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-slate-400",
			children: "Novedades y comunicados del equipo NASETLINK."
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-4",
			children: announcements.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-[#0F1523] border border-white/5 rounded-2xl p-8 text-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-slate-500",
					children: "No hay anuncios por ahora."
				})
			}) : announcements.map((ann) => {
				const style = getStyle(ann.type);
				const Icon = style.icon;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `bg-[#0F1523] border ${style.border} rounded-2xl p-5`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `${style.bg} ${style.color} p-2.5 rounded-xl shrink-0`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "w-6 h-6" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-2 mb-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-bold text-white leading-tight text-lg",
									children: ann.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] text-slate-500 shrink-0 font-mono mt-1",
									children: formatDate(ann.createdAt)
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-slate-300 leading-relaxed whitespace-pre-wrap",
								children: ann.message
							})]
						})]
					})
				}, ann.id);
			})
		})]
	});
}
export { AnunciosPage as component };
