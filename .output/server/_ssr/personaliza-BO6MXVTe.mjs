import { __toESM } from "../_runtime.mjs";
import { require_react } from "../_libs/react.mjs";
import { require_jsx_runtime } from "../_libs/react2.mjs";
import "../_libs/firebase.mjs";
import { doc, getDoc, setDoc } from "../_libs/@firebase/firestore+[...].mjs";
import { toast } from "../_libs/sonner.mjs";
import { Download } from "../_libs/lucide-react22.mjs";
import { Feather, Gamepad2, Image, Pipette, Rocket, Save } from "../_libs/lucide-react25.mjs";
import { Flame } from "../_libs/lucide-react26.mjs";
import { Instagram, Sparkles, Youtube } from "../_libs/lucide-react31.mjs";
import { Palette } from "../_libs/lucide-react44.mjs";
import { Send } from "../_libs/lucide-react46.mjs";
import { Share2 } from "../_libs/lucide-react47.mjs";
import { UserCheck } from "../_libs/lucide-react56.mjs";
import { User } from "../_libs/lucide-react57.mjs";
import { Route$9, db } from "./router-DtpLq15p.mjs";
// node_modules/.nitro/vite/services/ssr/assets/personaliza-BO6MXVTe.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PersonalizaPage() {
	const { user } = Route$9.useRouteContext();
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [template, setTemplate] = (0, import_react.useState)("Aurora");
	const [brandColor, setBrandColor] = (0, import_react.useState)("#3b82f6");
	const [bgColor, setBgColor] = (0, import_react.useState)("#0a0e17");
	const [title, setTitle] = (0, import_react.useState)("Descarga tu archivo");
	const [message, setMessage] = (0, import_react.useState)("¡Gracias por tu visita! Tu archivo está listo.");
	const [buttonText, setButtonText] = (0, import_react.useState)("Descargar");
	const [socials, setSocials] = (0, import_react.useState)({
		youtube: "",
		tiktok: "",
		telegram: "",
		instagram: "",
		discord: ""
	});
	const [verifierActive, setVerifierActive] = (0, import_react.useState)(false);
	const [verifyLinks, setVerifyLinks] = (0, import_react.useState)({
		youtube: "",
		whatsapp: "",
		tiktok: ""
	});
	(0, import_react.useEffect)(() => {
		const fetchConfig = async () => {
			if (!user) return;
			try {
				const docRef = doc(db, "users", user.uid);
				const snap = await getDoc(docRef);
				if (snap.exists() && snap.data().pageSettings) {
					const data = snap.data().pageSettings;
					setTemplate(data.template || "Aurora");
					setBrandColor(data.brandColor || "#3b82f6");
					setBgColor(data.bgColor || "#0a0e17");
					setTitle(data.title || "Descarga tu archivo");
					setMessage(data.message || "¡Gracias por tu visita! Tu archivo está listo.");
					setButtonText(data.buttonText || "Descargar");
					setSocials(data.socials || {
						youtube: "",
						tiktok: "",
						telegram: "",
						instagram: "",
						discord: ""
					});
					setVerifierActive(data.verifierActive || false);
					setVerifyLinks(data.verifyLinks || {
						youtube: "",
						whatsapp: "",
						tiktok: ""
					});
				}
			} catch (error) {
				console.error("Error cargando config:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchConfig();
	}, [user]);
	const handleSave = async () => {
		setSaving(true);
		try {
			await setDoc(doc(db, "users", user.uid), { pageSettings: {
				template,
				brandColor,
				bgColor,
				title,
				message,
				buttonText,
				socials,
				verifierActive,
				verifyLinks
			} }, { merge: true });
			toast.success("¡Página guardada con éxito!");
		} catch (error) {
			console.error(error);
			toast.error("Error al guardar los cambios");
		} finally {
			setSaving(false);
		}
	};
	const templates = [
		{
			id: "Aurora",
			icon: Sparkles,
			desc: "Premium"
		},
		{
			id: "Neon",
			icon: Gamepad2,
			desc: "Gamer"
		},
		{
			id: "Minimal",
			icon: Feather,
			desc: "Limpia"
		},
		{
			id: "Glow",
			icon: Flame,
			desc: "Vibrante"
		}
	];
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "text-white text-center mt-10",
		children: "Cargando configuración..."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 pb-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-black text-white mb-1",
				children: "Mi página"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-slate-400",
				children: "Personaliza tu página de descarga. Se aplica a todos tus enlaces."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-[#0F1523] border border-white/5 rounded-2xl p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 mb-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bg-blue-500/10 p-1.5 rounded-lg text-blue-500",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "w-4 h-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-bold text-slate-300 uppercase tracking-wider",
						children: "Vista previa en vivo"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl p-6 text-center border border-white/10",
					style: { backgroundColor: bgColor },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-16 h-16 rounded-full mx-auto mb-4 bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "w-8 h-8 text-white" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xl font-bold text-white mb-2",
							children: title || "Título"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-slate-400 mb-6",
							children: message || "Mensaje de bienvenida"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-black/40 border border-white/5 rounded-xl p-3 flex items-center gap-3 mb-6 text-left",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "p-2 rounded-lg text-white",
								style: { backgroundColor: brandColor },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "w-4 h-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-bold text-white",
								children: "Tu archivo está listo"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] text-slate-400",
								children: "archivo.zip · 24 MB"
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "w-full py-3 rounded-xl font-bold text-white transition-opacity hover:opacity-90 shadow-lg",
							style: { backgroundColor: brandColor },
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "w-4 h-4 inline mr-2" }),
								" ",
								buttonText || "Descargar"
							]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-[#0F1523] border border-white/5 rounded-2xl p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 mb-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Palette, { className: "w-5 h-5 text-blue-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-bold text-white",
							children: "Plantilla de tu página"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-slate-400 mb-4",
						children: "Elige el estilo. Se aplica a tu página de descarga con tus colores."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-2 gap-3",
						children: templates.map((tpl) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setTemplate(tpl.id),
							className: `flex flex-col items-center justify-center p-4 rounded-xl border transition-colors ${template === tpl.id ? "border-blue-500 bg-blue-500/10" : "border-white/10 bg-black/20 hover:border-white/20"}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(tpl.icon, { className: `w-6 h-6 mb-2 ${template === tpl.id ? "text-blue-500" : "text-slate-400"}` }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `text-sm font-bold ${template === tpl.id ? "text-white" : "text-slate-300"}`,
									children: tpl.id
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] text-slate-500",
									children: tpl.desc
								})
							]
						}, tpl.id))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-[#0F1523] border border-white/5 rounded-2xl p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "w-5 h-5 text-blue-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-bold text-white",
						children: "Logo y fondo"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "block text-sm text-slate-300 mb-2",
						children: "Logo"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "bg-[#1e293b] hover:bg-[#334155] text-blue-400 text-xs font-bold py-2 px-3 rounded-lg border border-blue-500/20 transition",
							children: "Seleccionar archivo"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-slate-500",
							children: "Sin archivos seleccionados"
						})]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "block text-sm text-slate-300 mb-2",
						children: "Imagen de fondo"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "bg-[#1e293b] hover:bg-[#334155] text-blue-400 text-xs font-bold py-2 px-3 rounded-lg border border-blue-500/20 transition",
							children: "Seleccionar archivo"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-slate-500",
							children: "Sin archivos seleccionados"
						})]
					})] })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-[#0F1523] border border-white/5 rounded-2xl p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pipette, { className: "w-5 h-5 text-blue-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-bold text-white",
						children: "Colores"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between bg-black/20 border border-white/10 rounded-xl p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm text-slate-300",
								children: "Color de marca"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "relative w-12 h-8 rounded overflow-hidden cursor-pointer shadow-inner border border-white/20",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "color",
									value: brandColor,
									onChange: (e) => setBrandColor(e.target.value),
									className: "absolute -top-2 -left-2 w-16 h-16 cursor-pointer"
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between bg-black/20 border border-white/10 rounded-xl p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm text-slate-300",
								children: "Color de fondo"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "relative w-12 h-8 rounded overflow-hidden cursor-pointer shadow-inner border border-white/20",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "color",
									value: bgColor,
									onChange: (e) => setBgColor(e.target.value),
									className: "absolute -top-2 -left-2 w-16 h-16 cursor-pointer"
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] text-slate-500",
							children: "El color de fondo se usa si no subes una imagen."
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-[#0F1523] border border-white/5 rounded-2xl p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rocket, { className: "w-5 h-5 text-blue-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-bold text-white",
						children: "Mensaje y botón"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-xs text-slate-400 mb-2",
							children: "Título"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							value: title,
							onChange: (e) => setTitle(e.target.value),
							className: "w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white text-sm outline-none focus:border-blue-500"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-xs text-slate-400 mb-2",
							children: "Mensaje de bienvenida"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: message,
							onChange: (e) => setMessage(e.target.value),
							rows: 2,
							className: "w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white text-sm outline-none focus:border-blue-500 resize-none"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-xs text-slate-400 mb-2",
							children: "Texto del botón"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							value: buttonText,
							onChange: (e) => setButtonText(e.target.value),
							className: "w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white text-sm outline-none focus:border-blue-500"
						})] })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-[#0F1523] border border-white/5 rounded-2xl p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "w-5 h-5 text-blue-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-bold text-white",
						children: "Redes sociales"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SocialInput, {
							icon: Youtube,
							placeholder: "youtube.com/@tucanal",
							value: socials.youtube,
							onChange: (v) => setSocials({
								...socials,
								youtube: v
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SocialInput, {
							icon: MusicIcon,
							placeholder: "tiktok.com/@tucuenta",
							value: socials.tiktok,
							onChange: (v) => setSocials({
								...socials,
								tiktok: v
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SocialInput, {
							icon: Send,
							placeholder: "t.me/tucanal",
							value: socials.telegram,
							onChange: (v) => setSocials({
								...socials,
								telegram: v
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SocialInput, {
							icon: Instagram,
							placeholder: "instagram.com/tucuenta",
							value: socials.instagram,
							onChange: (v) => setSocials({
								...socials,
								instagram: v
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SocialInput, {
							icon: Gamepad2,
							placeholder: "discord.gg/tuservidor",
							value: socials.discord,
							onChange: (v) => setSocials({
								...socials,
								discord: v
							})
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-[#0F1523] border border-white/5 rounded-2xl p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 mb-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserCheck, { className: "w-5 h-5 text-blue-500" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-bold text-white",
								children: "Verificador de suscripción"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "bg-white/10 text-[10px] font-bold text-slate-300 px-2 py-0.5 rounded-full ml-auto",
								children: "OPCIONAL"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-slate-400 mb-4 leading-relaxed",
						children: "Pide a tus visitantes subscribirse / unirse antes de descargar. Tocan el botón, esperan 3s de verificación y se pone verde."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between bg-black/20 border border-white/10 rounded-xl p-3 mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-sm text-slate-300",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserCheck, { className: "w-4 h-4" }), " Activar verificador en mi página"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: verifierActive,
							onChange: (e) => setVerifierActive(e.target.checked),
							className: "w-5 h-5 accent-blue-600 rounded cursor-pointer"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-xs text-slate-400 mb-2",
								children: "Enlace para subscribirse (YouTube)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								placeholder: "youtube.com/@tucanal?sub_confirmation=1",
								value: verifyLinks.youtube,
								onChange: (e) => setVerifyLinks({
									...verifyLinks,
									youtube: e.target.value
								}),
								className: "w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white text-sm outline-none focus:border-blue-500"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-xs text-slate-400 mb-2",
								children: "Enlace del canal de WhatsApp"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								placeholder: "whatsapp.com/channel/xxxxx",
								value: verifyLinks.whatsapp,
								onChange: (e) => setVerifyLinks({
									...verifyLinks,
									whatsapp: e.target.value
								}),
								className: "w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white text-sm outline-none focus:border-blue-500"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-xs text-slate-400 mb-2",
								children: "Enlace de tu TikTok"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								placeholder: "tiktok.com/@tucuenta",
								value: verifyLinks.tiktok,
								onChange: (e) => setVerifyLinks({
									...verifyLinks,
									tiktok: e.target.value
								}),
								className: "w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white text-sm outline-none focus:border-blue-500"
							})] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] text-slate-500 mt-3",
						children: "Deja un enlace vacío para no pedir ese paso. Si no activas el verificador, tu página funciona normal."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: handleSave,
				disabled: saving,
				className: "w-full bg-[#2563eb] hover:bg-blue-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition disabled:opacity-50 shadow-lg shadow-blue-500/20",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "w-5 h-5" }),
					" ",
					saving ? "Guardando..." : "Guardar mi página"
				]
			})
		]
	});
}
function SocialInput({ icon: Icon, placeholder, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute left-3 top-1/2 -translate-y-1/2 text-slate-500",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "w-4 h-4" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type: "text",
			placeholder,
			value,
			onChange: (e) => onChange(e.target.value),
			className: "w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white text-sm outline-none focus:border-blue-500"
		})]
	});
}
function MusicIcon(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M9 18V5l12-2v13" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "6",
				cy: "18",
				r: "3"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "18",
				cy: "16",
				r: "3"
			})
		]
	});
}
export { PersonalizaPage as component };
