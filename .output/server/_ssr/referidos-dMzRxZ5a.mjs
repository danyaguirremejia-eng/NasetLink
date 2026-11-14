import "../_runtime.mjs";
import { require_react } from "../_libs/react.mjs";
import { require_jsx_runtime } from "../_libs/react2.mjs";
import { toast } from "../_libs/sonner.mjs";
import { Copy } from "../_libs/lucide-react20.mjs";
import { Download } from "../_libs/lucide-react22.mjs";
import { Facebook, List } from "../_libs/lucide-react24.mjs";
import { Send } from "../_libs/lucide-react46.mjs";
import { Share2 } from "../_libs/lucide-react47.mjs";
import { UserCheck } from "../_libs/lucide-react56.mjs";
import { Users } from "../_libs/lucide-react58.mjs";
import { Wallet } from "../_libs/lucide-react59.mjs";
import { Zap } from "../_libs/lucide-react61.mjs";
import { Route$7 } from "./router-DtpLq15p.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
function ReferidosPage() {
	const { user } = Route$7.useRouteContext();
	const refLink = `${window.location.origin}/register?ref=${user?.uid}`;
	const shareMessage = `🔥 Estoy generando ingresos extra con mis enlaces en NASETLINK. Únete gratis con mi enlace y empieza a ganar tú también: ${refLink}`;
	const copyToClipboard = (text) => {
		navigator.clipboard.writeText(text);
		toast.success("Copiado al portapapeles");
	};
	const shareTelegram = () => window.open(`https://t.me/share/url?url=${encodeURIComponent(refLink)}&text=${encodeURIComponent(shareMessage)}`, "_blank");
	const shareTwitter = () => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}`, "_blank");
	const shareFacebook = () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(refLink)}`, "_blank");
	const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(refLink)}&color=0a0e17&bgcolor=ffffff`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 pb-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-black text-white mb-1",
				children: "Invita y gana"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-slate-400 leading-relaxed",
				children: [
					"Ganas ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
						className: "text-blue-500",
						children: "5%"
					}),
					" de lo que generen tus invitados durante ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
						className: "text-white",
						children: "6 meses"
					}),
					". A ellos no se les descuenta nada."
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] rounded-2xl p-5 shadow-lg relative overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-blue-100 mb-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "w-5 h-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm font-medium",
						children: "Tu link de invitación"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2 items-center bg-black/20 border border-white/10 rounded-xl p-2 pl-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm text-white font-mono truncate flex-1",
						children: refLink
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => copyToClipboard(refLink),
						className: "bg-white text-blue-700 font-bold text-xs px-4 py-2.5 rounded-lg flex items-center gap-1.5 transition hover:bg-blue-50 shrink-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "w-4 h-4" }), " Copiar"]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-[#0F1523] border border-white/5 rounded-2xl p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "w-5 h-5 text-blue-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-bold text-white",
							children: "Kit para invitar"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-3 gap-2 mb-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: shareTelegram,
								className: "flex flex-col items-center justify-center bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl p-3 transition-colors",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "w-6 h-6 text-[#2AABEE] mb-2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-medium text-slate-300",
									children: "Telegram"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: shareTwitter,
								className: "flex flex-col items-center justify-center bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl p-3 transition-colors",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
									viewBox: "0 0 24 24",
									className: "w-6 h-6 text-white mb-2",
									fill: "currentColor",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-medium text-slate-300",
									children: "X (Twitter)"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: shareFacebook,
								className: "flex flex-col items-center justify-center bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl p-3 transition-colors",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Facebook, { className: "w-6 h-6 text-[#1877F2] mb-2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-medium text-slate-300",
									children: "Facebook"
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-black/20 border border-white/5 rounded-2xl p-6 flex flex-col items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "bg-white p-3 rounded-xl mb-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: qrUrl,
								alt: "QR Code",
								className: "w-40 h-40"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: qrUrl,
							target: "_blank",
							rel: "noreferrer",
							className: "bg-white/5 hover:bg-white/10 border border-white/10 text-blue-400 text-xs font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "w-4 h-4" }), " Descargar QR"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-slate-400 mb-2",
								children: "Mensaje listo para pegar"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "bg-black/50 border border-white/5 rounded-xl p-4 mb-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-slate-300 leading-relaxed",
									children: shareMessage
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => copyToClipboard(shareMessage),
								className: "bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold py-2.5 px-4 rounded-lg flex items-center gap-2 transition",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "w-4 h-4" }), " Copiar mensaje"]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-[#0F1523] border border-white/5 rounded-2xl p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "bg-blue-500/10 p-2 rounded-xl w-fit text-blue-500 mb-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "w-5 h-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-2xl font-black text-white",
								children: "0"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-slate-400 mt-1",
								children: "Invitados"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-[#0F1523] border border-white/5 rounded-2xl p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "bg-green-500/10 p-2 rounded-xl w-fit text-green-500 mb-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserCheck, { className: "w-5 h-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-2xl font-black text-white",
								children: "0"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-slate-400 mt-1",
								children: "Aprobados"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-[#0F1523] border border-white/5 rounded-2xl p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "bg-blue-500/10 p-2 rounded-xl w-fit text-blue-500 mb-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "w-5 h-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-2xl font-black text-white",
								children: "0"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-slate-400 mt-1",
								children: "Ya generando"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-[#0F1523] border border-white/5 rounded-2xl p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "bg-green-500/10 p-2 rounded-xl w-fit text-green-500 mb-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, { className: "w-5 h-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-2xl font-black text-white",
								children: "$0.00"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-slate-400 mt-1",
								children: "Ganado por referidos"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-[#0F1523] border border-white/5 rounded-2xl p-5 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-center gap-2 mb-6 text-white font-bold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, { className: "w-5 h-5 text-blue-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Tus invitados" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bg-white/5 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "w-6 h-6 text-blue-500" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "font-bold text-white mb-1",
						children: "Aún no tienes invitados"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-slate-400 max-w-[200px] mx-auto leading-relaxed",
						children: "Comparte tu link con otros creadores y empieza a ganar comisión."
					})
				]
			})
		]
	});
}
export { ReferidosPage as component };
