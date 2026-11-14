import { __toESM } from "../_runtime.mjs";
import { require_react } from "../_libs/react.mjs";
import { useNavigate } from "../_libs/@tanstack/react-router+[3...].mjs";
import { require_jsx_runtime } from "../_libs/react2.mjs";
import "../_libs/firebase.mjs";
import { addDoc, collection, serverTimestamp } from "../_libs/@firebase/firestore+[...].mjs";
import { toast } from "../_libs/sonner.mjs";
import { Link } from "../_libs/lucide-react34.mjs";
import { LoaderCircle } from "../_libs/lucide-react35.mjs";
import { Tag } from "../_libs/lucide-react52.mjs";
import { Zap } from "../_libs/lucide-react61.mjs";
import { Route$12, db } from "./router-DtpLq15p.mjs";
// node_modules/.nitro/vite/services/ssr/assets/links-Cz3dLKiV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CreateLinkPage() {
	const { user } = Route$12.useRouteContext();
	const navigate = useNavigate();
	const [url, setUrl] = (0, import_react.useState)("");
	const [name, setName] = (0, import_react.useState)("");
	const [slug, setSlug] = (0, import_react.useState)("");
	const [steps, setSteps] = (0, import_react.useState)(6);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const handleCreate = async (e) => {
		e.preventDefault();
		if (!url.trim()) return toast.error("Pega un enlace válido");
		setLoading(true);
		try {
			let finalCode = slug.trim().toLowerCase().replace(/[^a-z0-9]/g, "");
			if (!finalCode) {
				const chars = "abcdefghijkmnpqrstuvwxyz23456789";
				for (let i = 0; i < 7; i++) finalCode += chars[Math.floor(Math.random() * 32)];
			}
			await addDoc(collection(db, "links"), {
				original_url: url,
				name: name || "Sin nombre",
				short_code: finalCode,
				steps,
				clicks: 0,
				earnings: 0,
				userId: user.uid,
				createdAt: serverTimestamp()
			});
			toast.success("¡Enlace creado con éxito!");
			navigate({ to: "/dashboard" });
		} catch (error) {
			console.error(error);
			toast.error("Error al crear el enlace");
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 pb-20",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-2xl font-bold text-white mb-2",
			children: "Crear enlace"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-slate-400 leading-relaxed",
			children: "Un enlace de NASETLINK que manda a tu gente a donde quieras. Se arma al instante."
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: handleCreate,
			className: "space-y-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-[#0F1523] border border-white/5 rounded-2xl p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-sm font-semibold text-white mb-2",
							children: ["Tu enlace ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-slate-500 font-normal",
								children: "(a dónde mandas a tu gente)"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "url",
								value: url,
								onChange: (e) => setUrl(e.target.value),
								placeholder: "https://midescarga.com/archivo.zip",
								className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-slate-600 outline-none focus:border-blue-500 transition-colors",
								required: true
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-slate-500 mt-2",
							children: "Cualquier enlace: tu tienda, un archivo, un grupo, un video..."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-[#0F1523] border border-white/5 rounded-2xl p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm font-semibold text-white mb-2",
						children: ["Nombre ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-slate-500 font-normal",
							children: "(solo para ti)"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							value: name,
							onChange: (e) => setName(e.target.value),
							placeholder: "Ej: Mi app, Canal de FF...",
							className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-slate-600 outline-none focus:border-blue-500 transition-colors"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-[#0F1523] border border-white/5 rounded-2xl p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-sm font-semibold text-white mb-2",
							children: ["Nombre del enlace ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-slate-500 font-normal",
								children: "— opcional"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold",
								children: "@"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: slug,
								onChange: (e) => setSlug(e.target.value),
								placeholder: "mitienda",
								className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-slate-600 outline-none focus:border-blue-500 transition-colors"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-slate-500 mt-2",
							children: [
								"Quedará como ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-slate-400",
									children: [
										window.location.host,
										"/s/",
										slug || "link-aleatorio"
									]
								}),
								". Vacío = uno corto al azar."
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-[#0F1523] border border-white/5 rounded-2xl p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-sm font-semibold text-white mb-3",
							children: ["Pasos ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-slate-500 font-normal",
								children: "— más pasos, más te pagan"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-5 gap-2",
							children: [
								2,
								3,
								4,
								5,
								6
							].map((step) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setSteps(step),
								className: `flex flex-col items-center justify-center py-3 rounded-xl border transition-colors ${steps === step ? "bg-blue-500/10 border-blue-500 text-white" : "bg-black/20 border-white/10 text-slate-400 hover:border-white/20"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-lg font-bold",
									children: step
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: `text-[10px] mt-0.5 ${steps === step ? "text-blue-400" : "text-slate-500"}`,
									children: ["~$", step === 2 ? "4.00" : step === 3 ? "9.00" : step === 4 ? "12.50" : step === 5 ? "15.00" : "17.50"]
								})]
							}, step))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-white mt-4 font-medium",
							children: [
								"Con ",
								steps,
								" pasos ganas aprox. ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
									className: "text-blue-400",
									children: [
										"~$",
										steps === 2 ? "4.00" : steps === 3 ? "9.00" : steps === 4 ? "12.50" : steps === 5 ? "15.00" : "17.50",
										" por cada 1.000 clics"
									]
								}),
								"."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-slate-500 mt-1",
							children: "Es un estimado según tu nivel. Lo que ganes de verdad depende de cuántos clics sean válidos."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "submit",
					disabled: loading,
					className: "w-full bg-[#2563eb] hover:bg-blue-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-50",
					children: [loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-5 h-5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "w-5 h-5 fill-white" }), loading ? "Creando..." : "Crear mi enlace"]
				})
			]
		})]
	});
}
export { CreateLinkPage as component };
