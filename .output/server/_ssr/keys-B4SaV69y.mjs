import { __toESM } from "../_runtime.mjs";
import { require_react } from "../_libs/react.mjs";
import { require_jsx_runtime } from "../_libs/react2.mjs";
import "../_libs/firebase.mjs";
import { addDoc, collection, deleteDoc, doc, getDocs, query, serverTimestamp, where } from "../_libs/@firebase/firestore+[...].mjs";
import { toast } from "../_libs/sonner.mjs";
import { ChevronDown } from "../_libs/lucide-react11.mjs";
import { ChevronRight, Key } from "../_libs/lucide-react12.mjs";
import { CircleX, Plug, Shield, SlidersHorizontal } from "../_libs/lucide-react16.mjs";
import { Clock } from "../_libs/lucide-react17.mjs";
import { Copy } from "../_libs/lucide-react20.mjs";
import { Info } from "../_libs/lucide-react30.mjs";
import { LoaderCircle } from "../_libs/lucide-react35.mjs";
import { Tag } from "../_libs/lucide-react52.mjs";
import { Zap } from "../_libs/lucide-react61.mjs";
import { Route$13, db } from "./router-DtpLq15p.mjs";
// node_modules/.nitro/vite/services/ssr/assets/keys-B4SaV69y.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function KeysPage() {
	const { user } = Route$13.useRouteContext();
	const [prefix, setPrefix] = (0, import_react.useState)("");
	const [duration, setDuration] = (0, import_react.useState)("1");
	const [name, setName] = (0, import_react.useState)("");
	const [slug, setSlug] = (0, import_react.useState)("");
	const [steps, setSteps] = (0, import_react.useState)(6);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [myKeys, setMyKeys] = (0, import_react.useState)([]);
	const [showAdvanced, setShowAdvanced] = (0, import_react.useState)(false);
	const [showCode, setShowCode] = (0, import_react.useState)(false);
	const verifyUrl = `${window.location.origin}/api/llave.php?k=LA_LLAVE`;
	(0, import_react.useEffect)(() => {
		fetchKeys();
	}, [user]);
	const fetchKeys = async () => {
		if (!user) return;
		try {
			const q = query(collection(db, "keys"), where("userId", "==", user.uid));
			const snap = await getDocs(q);
			const fetched = [];
			snap.forEach((doc) => fetched.push({
				id: doc.id,
				...doc.data()
			}));
			setMyKeys(fetched.reverse());
		} catch (error) {
			console.error(error);
		}
	};
	const handleCreate = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const p = prefix.trim().toUpperCase() || "MIAPP";
			const randomChars = () => Math.random().toString(36).substring(2, 6).toUpperCase();
			const generatedKey = `${p}-${randomChars()}-${randomChars()}-${randomChars()}`;
			const finalSlug = slug.trim().toLowerCase().replace(/[^a-z0-9]/g, "") || Math.random().toString(36).substring(2, 9);
			await addDoc(collection(db, "keys"), {
				userId: user.uid,
				key: generatedKey,
				prefix: p,
				duration: `${duration} día(s)`,
				name: name || "Sin nombre",
				slug: finalSlug,
				steps,
				clicks: 0,
				earnings: 0,
				createdAt: serverTimestamp()
			});
			toast.success("¡Key creada con éxito!");
			setPrefix("");
			setName("");
			setSlug("");
			setSteps(6);
			fetchKeys();
		} catch (error) {
			console.error(error);
			toast.error("Error al crear la key");
		} finally {
			setLoading(false);
		}
	};
	const handleRevoke = async (keyId) => {
		if (!confirm("¿Seguro que quieres revocar esta key?")) return;
		try {
			await deleteDoc(doc(db, "keys", keyId));
			toast.success("Key revocada");
			fetchKeys();
		} catch (error) {
			toast.error("Error al revocar");
		}
	};
	const copyText = (text) => {
		navigator.clipboard.writeText(text);
		toast.success("Copiado");
	};
	const keyPreview = `${prefix.trim().toUpperCase() || "MIAPP"}-XXXX-XXXX-XXXX`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 pb-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 mb-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Key, { className: "w-6 h-6 text-blue-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-bold text-white",
					children: "Crear key"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-slate-400 leading-relaxed",
				children: "Un enlace de NASETLINK que entrega una licencia para tu app. Tu gente pasa los pasos, recibe su key y tú cobras."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleCreate,
				className: "space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-[#0F1523] border border-white/5 rounded-2xl p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block text-sm font-semibold text-white mb-2",
								children: ["Prefijo de la key ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-slate-500 font-normal",
									children: "(cómo empieza)"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative mb-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Key, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									value: prefix,
									onChange: (e) => setPrefix(e.target.value),
									placeholder: "BRASILEIRO",
									className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-slate-600 outline-none focus:border-blue-500 uppercase"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-black/20 border border-white/5 rounded-lg p-3 text-sm font-mono text-slate-300",
								children: ["Tu key será: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-white font-bold",
									children: keyPreview
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-[#0F1523] border border-white/5 rounded-2xl p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block text-sm font-semibold text-white mb-2",
								children: ["Duración ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-slate-500 font-normal",
									children: "(cuánto sirve la key)"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: duration,
										onChange: (e) => setDuration(e.target.value),
										className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white outline-none focus:border-blue-500 appearance-none",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "1",
												children: "1 día"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "7",
												children: "7 días"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "30",
												children: "30 días"
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-slate-500 mt-2",
								children: "Cada persona que pase los pasos recibe su propia key, que vence en ese tiempo."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border border-white/5 rounded-2xl overflow-hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setShowAdvanced(!showAdvanced),
							className: "w-full flex items-center gap-2 p-4 bg-[#0F1523] text-sm font-semibold text-white hover:bg-white/5 transition",
							children: [
								showAdvanced ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "w-4 h-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "w-4 h-4" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "w-4 h-4 text-blue-500" }),
								"Opciones avanzadas de la key"
							]
						}), showAdvanced && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-4 bg-[#0F1523] border-t border-white/5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-slate-400",
								children: "Configuraciones extra se pueden añadir aquí."
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-[#0F1523] border border-white/5 rounded-2xl p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 mb-2 text-white font-semibold text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plug, { className: "w-5 h-5 text-blue-500" }), " Dirección para verificar la key (tu app pregunta aquí)"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex-1 bg-black/30 border border-white/10 rounded-xl p-3 text-sm text-slate-300 font-mono truncate",
									children: verifyUrl
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => copyText(verifyUrl),
									className: "bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-xl font-bold text-sm flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "w-4 h-4" }), " Copiar"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[11px] text-slate-500 mt-2",
								children: [
									"Cambia ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-slate-300",
										children: "LA_LLAVE"
									}),
									" por la key del usuario. Responde valida: true o false."
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-[#0F1523] border border-white/5 rounded-2xl p-4 space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
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
								className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-slate-600 outline-none focus:border-blue-500"
							})]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
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
									className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-slate-600 outline-none focus:border-blue-500"
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
											slug || "aleatorio"
										]
									}),
									"."
								]
							})
						] })]
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
									className: `flex flex-col items-center justify-center py-3 rounded-xl border transition ${steps === step ? "bg-blue-500/10 border-blue-500 text-white" : "bg-black/20 border-white/10 text-slate-400 hover:border-white/20"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-lg font-bold",
										children: step
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: `text-[10px] mt-0.5 ${steps === step ? "text-blue-400" : "text-slate-500"}`,
										children: ["~$", step === 2 ? "4.00" : step === 3 ? "9.00" : step === 4 ? "12.50" : step === 5 ? "15.80" : "17.50"]
									})]
								}, step))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 mt-4 flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "bg-blue-500/20 p-2 rounded-lg text-blue-500",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "w-5 h-5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm text-white font-medium",
									children: [
										"Con ",
										steps,
										" pasos ganas aprox. ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
											className: "text-blue-400",
											children: [
												"~$",
												steps === 2 ? "4.00" : steps === 3 ? "9.00" : steps === 4 ? "12.50" : steps === 5 ? "15.80" : "17.50",
												" por cada 1.000 clics"
											]
										}),
										"."
									]
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "submit",
						disabled: loading,
						className: "w-full bg-[#2563eb] hover:bg-blue-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition disabled:opacity-50",
						children: [loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-5 h-5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Key, { className: "w-5 h-5" }), loading ? "Creando..." : "Crear mi key"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border border-white/5 rounded-2xl overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setShowCode(!showCode),
					className: "w-full flex items-center gap-2 p-4 bg-[#0F1523] text-sm font-semibold text-white hover:bg-white/5 transition",
					children: [
						showCode ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "w-4 h-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "w-4 h-4" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plug, { className: "w-4 h-4 text-blue-500" }),
						" Cómo conectar tu app (código listo)"
					]
				}), showCode && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-4 bg-black/40 border-t border-white/5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
						className: "text-xs text-green-400 overflow-x-auto",
						children: `$ch = curl_init("${verifyUrl}");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$d = json_decode(curl_exec($ch), true);
if ($d["valida"]) { /* deja entrar */ }`
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-[#0F1523] border border-white/5 rounded-2xl p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 mb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "w-5 h-5 text-red-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-bold text-white",
							children: "Revocar una key"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-slate-400 mb-4",
						children: "Anula una key al instante (si la están compartiendo). Pega la key completa."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Key, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								placeholder: "PREFIJO-XXXX-XXXX-XXXX",
								className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-9 pr-4 text-white outline-none focus:border-red-500 font-mono text-sm"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20 px-4 rounded-xl font-bold text-sm transition",
							children: "Revocar"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-[#0F1523] border border-white/5 rounded-2xl p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "w-5 h-5 text-blue-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-bold text-white",
							children: "Cómo funciona"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-6 h-6 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center font-bold text-xs shrink-0",
									children: "1"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-slate-300",
									children: "Eliges cómo empieza la key, cuánto dura y los pasos."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-6 h-6 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center font-bold text-xs shrink-0",
									children: "2"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm text-slate-300",
									children: [
										"En segundos te damos un enlace de ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											className: "text-white",
											children: "NASETLINK"
										}),
										" para compartir."
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-6 h-6 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center font-bold text-xs shrink-0",
									children: "3"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm text-slate-300",
									children: ["Tu gente pasa los pasos y recibe su key. ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-white",
										children: "Tú cobras."
									})]
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 bg-blue-500/5 border border-blue-500/10 rounded-xl p-3 flex gap-2 items-start",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "w-4 h-4 text-blue-500 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-slate-400",
							children: [
								"Tu app verifica la key en ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "text-blue-400",
									children: "/api/llave.php"
								}),
								". El código listo está arriba."
							]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "text-sm font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center justify-between",
				children: ["MIS KEYS ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					"(",
					myKeys.length,
					")"
				] })]
			}), myKeys.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-[#0F1523] border border-white/5 rounded-2xl p-8 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bg-white/5 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Key, { className: "w-6 h-6 text-slate-500" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-slate-400",
					children: "Todavía no has creado ninguna key. Crea la primera arriba. 👇"
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: myKeys.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-[#0F1523] border border-white/5 rounded-2xl p-4 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-bold text-white font-mono",
						children: k.key
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-slate-500",
						children: [
							k.name,
							" · ",
							k.steps,
							" pasos · ",
							k.duration
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => handleRevoke(k.id),
						className: "text-red-400 p-2 hover:bg-red-500/10 rounded-lg transition",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "w-5 h-5" })
					})]
				}, k.id))
			})] })
		]
	});
}
export { KeysPage as component };
