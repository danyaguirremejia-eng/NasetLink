import { __toESM } from "../_runtime.mjs";
import { require_react } from "../_libs/react.mjs";
import { require_jsx_runtime } from "../_libs/react2.mjs";
import "../_libs/firebase.mjs";
import { doc, getDoc, setDoc } from "../_libs/@firebase/firestore+[...].mjs";
import { toast } from "../_libs/sonner.mjs";
import { CodeXml, RefreshCcw, RefreshCw } from "../_libs/lucide-react19.mjs";
import { Copy } from "../_libs/lucide-react20.mjs";
import { ShieldAlert } from "../_libs/lucide-react48.mjs";
import { TrendingUp } from "../_libs/lucide-react53.mjs";
import { Zap } from "../_libs/lucide-react61.mjs";
import { Route$16, db } from "./router-DtpLq15p.mjs";
// node_modules/.nitro/vite/services/ssr/assets/api-C4boMIj3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ApiPage() {
	const { user } = Route$16.useRouteContext();
	const [token, setToken] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [activeTab, setActiveTab] = (0, import_react.useState)("php");
	const domain = window.location.origin;
	(0, import_react.useEffect)(() => {
		const fetchToken = async () => {
			if (!user) return;
			try {
				const userRef = doc(db, "users", user.uid);
				const snap = await getDoc(userRef);
				if (snap.exists() && snap.data().apiToken) setToken(snap.data().apiToken);
				else {
					const newToken = Array.from({ length: 40 }, () => Math.floor(Math.random() * 36).toString(36)).join("");
					await setDoc(userRef, { apiToken: newToken }, { merge: true });
					setToken(newToken);
				}
			} catch (error) {
				console.error("Error cargando token:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchToken();
	}, [user]);
	const generateNewToken = async () => {
		if (!confirm("¿Seguro que quieres cambiar tu token? El anterior dejará de funcionar.")) return;
		try {
			const newToken = Array.from({ length: 40 }, () => Math.floor(Math.random() * 36).toString(36)).join("");
			await setDoc(doc(db, "users", user.uid), { apiToken: newToken }, { merge: true });
			setToken(newToken);
			toast.success("Token actualizado");
		} catch (error) {
			toast.error("Error al cambiar el token");
		}
	};
	const copyText = (text) => {
		navigator.clipboard.writeText(text);
		toast.success("Copiado al portapapeles");
	};
	const apiEndpoint = `${domain}/api?api=${token}&url=`;
	const codeExamples = {
		php: `<?php
$token = '${token}';
$url   = urlencode('https://tudestino.com');

$r = json_decode(file_get_contents("${domain}/api?api=$token&url=$url"), true);

if ($r['status'] === 'success') {
    echo $r['shortenedUrl'];
} else {
    echo 'Error: ' . $r['message'];
}
?>`,
		js: `const token = '${token}';
const url   = encodeURIComponent('https://tudestino.com');

const r = await fetch(\`${domain}/api?api=\${token}&url=\${url}\`).then(res => res.json());

if (r.status === 'success') console.log(r.shortenedUrl);
else console.error(r.message);`,
		py: `import requests

token = '${token}'
url = 'https://tudestino.com'

r = requests.get(f'${domain}/api?api={token}&url={url}').json()

if r['status'] == 'success':
    print(r['shortenedUrl'])
else:
    print('Error:', r['message'])`,
		curl: `curl -X GET "${domain}/api?api=${token}&url=https://tudestino.com"`
	};
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "text-white text-center mt-10",
		children: "Cargando API..."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 pb-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-3 items-start",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bg-blue-500/10 p-2.5 rounded-xl text-blue-500 shrink-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeXml, { className: "w-6 h-6" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-black text-white leading-tight",
					children: "API para desarrolladores"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-slate-400 mt-1",
					children: "Crea enlaces de NASETLINK desde tu web, tu bot o tu app, sin entrar al panel."
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-[#0F1523] border border-white/5 rounded-2xl p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3",
						children: "Tu Token"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2 items-center mb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex-1 bg-black/40 border border-white/10 rounded-xl p-3 text-sm text-slate-300 font-mono truncate",
							children: token
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => copyText(token),
							className: "bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl transition",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "w-5 h-5" })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2 items-start text-xs text-yellow-500 mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-base leading-none",
							children: "🔒"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Es como tu contraseña: con él cualquiera crea enlaces a tu nombre. No lo compartas." })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: generateNewToken,
						className: "border border-white/10 text-slate-300 hover:bg-white/5 text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-2 transition",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "w-4 h-4" }), " Cambiar token"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-[#0F1523] border border-white/5 rounded-2xl p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2",
						children: "Cómo usarla"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-slate-300 mb-4",
						children: [
							"Manda un ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "text-white",
								children: "GET"
							}),
							" con tu token y el enlace a acortar. Te responde en ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "text-white",
								children: "JSON"
							}),
							" o en ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "text-white",
								children: "texto"
							}),
							"."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2 items-center bg-black/40 border border-white/10 rounded-xl p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-sm text-slate-400 font-mono truncate flex-1",
							children: [apiEndpoint, "..."]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => copyText(apiEndpoint),
							className: "bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shrink-0 hover:bg-blue-700 transition",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "w-3.5 h-3.5" }), " Copiar"]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-[#0F1523] border border-white/5 rounded-2xl p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4",
					children: "Parámetros"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-[70px_1fr] gap-2 items-start border-b border-white/5 pb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-red-400 font-mono",
								children: "api"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-xs text-slate-300",
								children: ["Tu token ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-yellow-500 font-bold",
									children: "OBLIGATORIO"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-[70px_1fr] gap-2 items-start border-b border-white/5 pb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-red-400 font-mono",
								children: "url"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-xs text-slate-300",
								children: ["A dónde mandas a tu gente ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-yellow-500 font-bold",
									children: "OBLIGATORIO"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-[70px_1fr] gap-2 items-start border-b border-white/5 pb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-red-400 font-mono",
								children: "alias"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-xs text-slate-300",
								children: [
									"Nombre del enlace: ",
									window.location.host,
									"/alias. Si no lo pones, se crea uno corto"
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-[70px_1fr] gap-2 items-start border-b border-white/5 pb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-red-400 font-mono",
								children: "steps"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-slate-300",
								children: "Pasos, del 2 al 6. Si no lo pones: 6"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-[70px_1fr] gap-2 items-start border-b border-white/5 pb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-red-400 font-mono",
								children: "name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-slate-300",
								children: "Cómo se ve en tu lista de enlaces"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-[70px_1fr] gap-2 items-start",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-red-400 font-mono",
								children: "format"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-xs text-slate-300",
								children: [
									"Pon ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-red-400 font-mono",
										children: "text"
									}),
									" para recibir solo el enlace, sin JSON"
								]
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-[#0F1523] border border-white/5 rounded-2xl p-5 space-y-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2",
					children: "Si sale bien"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bg-black/50 border border-white/5 rounded-xl p-4 overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
						className: "text-xs text-green-400 font-mono",
						children: `{"status":"success","shortenedUrl":"${domain}/mienlace"}`
					})
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2",
					children: "Si algo falla"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bg-black/50 border border-white/5 rounded-xl p-4 overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
						className: "text-xs text-red-400 font-mono",
						children: `{"status":"error","message":"Ese alias ya está en uso, elige otro."}`
					})
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-[#0F1523] border border-white/5 rounded-2xl p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4",
						children: "Ejemplos listos para copiar"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-2 mb-3 overflow-x-auto pb-1 no-scrollbar",
						children: [
							"PHP",
							"JavaScript",
							"Python",
							"cURL"
						].map((tab) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setActiveTab(tab.toLowerCase() === "javascript" ? "js" : tab.toLowerCase()),
							className: `px-4 py-2 rounded-lg text-xs font-bold transition whitespace-nowrap ${activeTab === (tab.toLowerCase() === "javascript" ? "js" : tab.toLowerCase()) ? "bg-blue-600 text-white" : "bg-white/5 text-slate-400 hover:bg-white/10"}`,
							children: tab
						}, tab))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative bg-black/50 border border-white/5 rounded-xl p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => copyText(codeExamples[activeTab]),
							className: "absolute top-3 right-3 bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 hover:bg-blue-700 transition",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "w-3.5 h-3.5" }), " Copiar"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
							className: "text-xs text-slate-300 font-mono overflow-x-auto pt-8",
							children: codeExamples[activeTab]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-[#0F1523] border border-white/5 rounded-xl p-4 flex gap-3 text-slate-300 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "w-5 h-5 text-blue-500 shrink-0" }),
							" El enlace queda ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "text-white",
								children: "activo al momento"
							}),
							". Si hay muchos pidiéndose a la vez, puede tardar unos segundos."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-[#0F1523] border border-white/5 rounded-xl p-4 flex gap-3 text-slate-300 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCcw, { className: "w-5 h-5 text-blue-500 shrink-0" }),
							" Si pides ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "text-white",
								children: "el mismo destino con los mismos pasos"
							}),
							", te devuelve el mismo enlace, no uno nuevo."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-[#0F1523] border border-white/5 rounded-xl p-4 flex gap-3 text-slate-300 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "w-5 h-5 text-blue-500 shrink-0" }),
							" Los enlaces salen en ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-blue-500",
								children: "Crear enlace"
							}),
							" con sus clics y ganancias, igual que los demás."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-[#0F1523] border border-white/5 rounded-xl p-4 flex gap-3 text-slate-300 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "w-5 h-5 text-blue-500 shrink-0" }),
							" Si tu token se filtró, ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "text-white",
								children: "cámbialo"
							}),
							": el viejo deja de funcionar al instante."
						]
					})
				]
			})
		]
	});
}
export { ApiPage as component };
