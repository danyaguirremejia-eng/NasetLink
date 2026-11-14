import { __toESM } from "./_runtime.mjs";
import { require_react } from "./_libs/react.mjs";
import { Outlet } from "./_libs/@tanstack/react-router+[...].mjs";
import { Link } from "./_libs/@tanstack/react-router+[2...].mjs";
import { useNavigate } from "./_libs/@tanstack/react-router+[3...].mjs";
import { require_jsx_runtime } from "./_libs/react2.mjs";
import { useLocation } from "./_libs/tanstack__react-router.mjs";
import { signOut } from "./_libs/firebase__auth.mjs";
import "./_libs/firebase2.mjs";
import { ArrowRightLeft, Bell, ChartNoAxesColumn, CircleHelp, Code, Ellipsis, Headphones, House } from "./_libs/lucide-react4.mjs";
import { Banknote } from "./_libs/lucide-react7.mjs";
import { ChevronRight, Key } from "./_libs/lucide-react12.mjs";
import { Clock } from "./_libs/lucide-react17.mjs";
import { Flame } from "./_libs/lucide-react26.mjs";
import { Lightbulb } from "./_libs/lucide-react32.mjs";
import { LogOut } from "./_libs/lucide-react38.mjs";
import { Megaphone } from "./_libs/lucide-react40.mjs";
import { MessageCircle } from "./_libs/lucide-react41.mjs";
import { Palette } from "./_libs/lucide-react44.mjs";
import { ShieldAlert } from "./_libs/lucide-react48.mjs";
import { Star } from "./_libs/lucide-react51.mjs";
import { Trophy } from "./_libs/lucide-react55.mjs";
import { User } from "./_libs/lucide-react57.mjs";
import { Users } from "./_libs/lucide-react58.mjs";
import { X } from "./_libs/lucide-react60.mjs";
import { Zap } from "./_libs/lucide-react61.mjs";
import { auth } from "./_ssr/router-DtpLq15p.mjs";
// node_modules/.nitro/vite/services/ssr/assets/_authed-DRUvY_vz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TopBar() {
	const [time, setTime] = (0, import_react.useState)(/* @__PURE__ */ new Date());
	(0, import_react.useEffect)(() => {
		const timer = setInterval(() => setTime(/* @__PURE__ */ new Date()), 6e4);
		return () => clearInterval(timer);
	}, []);
	const formattedTime = time.toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex w-full items-center justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/20 px-3 py-1.5 rounded-full text-xs font-semibold text-blue-400",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Racha 0/9" })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1.5 text-[11px] font-medium text-slate-300 bg-white/5 px-2.5 py-1.5 rounded-full border border-white/5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "w-3.5 h-3.5 text-blue-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formattedTime })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "relative p-1.5 text-slate-400 hover:text-white transition bg-white/5 rounded-full border border-white/5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute top-1 right-1 w-1.5 h-1.5 bg-green-500 rounded-full" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "p-1.5 text-slate-400 hover:text-white transition bg-white/5 rounded-full border border-white/5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "w-4 h-4" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white border border-white/10 uppercase",
					children: "D"
				})
			]
		})]
	});
}
function BottomNav() {
	const location = useLocation();
	const navigate = useNavigate();
	const path = location.pathname;
	const [isMenuOpen, setIsMenuOpen] = (0, import_react.useState)(false);
	const isAdmin = auth.currentUser && ["danyxiter67@gmail.com"].includes(auth.currentUser.email);
	const handleLogout = async () => {
		try {
			await signOut(auth);
			navigate({ to: "/login" });
		} catch (error) {
			console.error("Error al cerrar sesión", error);
		}
	};
	const goTo = (route) => {
		setIsMenuOpen(false);
		navigate({ to: route });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed bottom-4 left-0 right-0 z-40 flex justify-center px-2 pb-safe pointer-events-none",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
			className: "pointer-events-auto flex w-full max-w-[380px] items-center justify-around rounded-[2rem] border border-white/10 bg-[#0f1523]/60 px-1 py-2 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] backdrop-blur-xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/dashboard",
					className: `flex flex-col items-center gap-1 transition-colors ${path === "/dashboard" ? "text-blue-500" : "text-slate-400 hover:text-slate-200"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 ${path === "/dashboard" ? "bg-blue-600 text-white shadow-[0_0_20px_-3px_rgba(37,99,235,0.8)] scale-110" : ""}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, { className: "h-5 w-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `text-[10px] font-semibold ${path === "/dashboard" ? "text-blue-500" : "text-slate-400"}`,
						children: "Inicio"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/links",
					className: `flex flex-col items-center gap-1 transition-colors ${path === "/links" ? "text-blue-500" : "text-slate-400 hover:text-slate-200"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 ${path === "/links" ? "bg-blue-600 text-white shadow-[0_0_20px_-3px_rgba(37,99,235,0.8)] scale-110" : ""}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-5 w-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `text-[10px] font-semibold ${path === "/links" ? "text-blue-500" : "text-slate-400"}`,
						children: "Links"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/stats",
					className: `flex flex-col items-center gap-1 transition-colors ${path === "/stats" ? "text-blue-500" : "text-slate-400 hover:text-slate-200"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 ${path === "/stats" ? "bg-blue-600 text-white shadow-[0_0_20px_-3px_rgba(37,99,235,0.8)] scale-110" : ""}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartNoAxesColumn, { className: "h-5 w-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `text-[10px] font-semibold ${path === "/stats" ? "text-blue-500" : "text-slate-400"}`,
						children: "Stats"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/retiros",
					className: `flex flex-col items-center gap-1 transition-colors ${path === "/retiros" ? "text-blue-500" : "text-slate-400 hover:text-slate-200"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 ${path === "/retiros" ? "bg-blue-600 text-white shadow-[0_0_20px_-3px_rgba(37,99,235,0.8)] scale-110" : ""}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRightLeft, { className: "h-5 w-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `text-[10px] font-semibold ${path === "/retiros" ? "text-blue-500" : "text-slate-400"}`,
						children: "Retiros"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setIsMenuOpen(true),
					className: "flex flex-col items-center gap-1 text-slate-400 hover:text-slate-200 transition-colors",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-10 w-10 items-center justify-center rounded-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, { className: "h-5 w-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] font-semibold",
						children: "Más"
					})]
				})
			]
		})
	}), isMenuOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-0",
			onClick: () => setIsMenuOpen(false)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative w-full max-w-md max-h-[85vh] overflow-y-auto rounded-t-[2rem] sm:rounded-3xl border-t sm:border border-white/10 bg-[#0f1523] p-4 shadow-2xl pb-safe",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto mb-4 h-1.5 w-12 rounded-full bg-slate-700 sm:hidden" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between mb-6 px-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-bold tracking-widest text-slate-400 uppercase",
						children: "Menú"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setIsMenuOpen(false),
						className: "p-1 text-slate-400 hover:text-white bg-white/5 rounded-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-5 h-5" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => goTo("/dashboard"),
							className: "w-full flex items-center justify-between rounded-xl bg-blue-500/10 p-3 text-blue-400 border border-blue-500/20",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "bg-blue-500 text-white p-2 rounded-lg",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, { className: "w-4 h-4" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-sm",
									children: "Inicio"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "w-4 h-4" })]
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "px-2 mb-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest",
							children: "Mi contenido"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuButton, {
									icon: Zap,
									text: "Crear enlace",
									onClick: () => goTo("/links")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuButton, {
									icon: Key,
									text: "Crear key",
									onClick: () => goTo("/keys")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuButton, {
									icon: Code,
									text: "API para desarrolladores",
									onClick: () => goTo("/api")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuButton, {
									icon: Palette,
									text: "Mi página",
									onClick: () => goTo("/personaliza")
								})
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "px-2 mb-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest",
							children: "Ganancias"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuButton, {
								icon: Banknote,
								text: "Retiros",
								onClick: () => goTo("/retiros")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuButton, {
								icon: Users,
								text: "Referidos",
								onClick: () => goTo("/referidos")
							})]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "px-2 mb-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest",
							children: "Rendimiento"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuButton, {
								icon: Trophy,
								text: "Ranking",
								onClick: () => goTo("/ranking")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuButton, {
								icon: Star,
								text: "Niveles",
								onClick: () => goTo("/niveles")
							})]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "px-2 mb-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest",
							children: "Cuenta"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuButton, {
									icon: Megaphone,
									text: "Anuncios",
									onClick: () => goTo("/anuncios")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuButton, {
									icon: Lightbulb,
									text: "Muro de ideas",
									onClick: () => goTo("/sugerencias")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuButton, {
									icon: CircleHelp,
									text: "Ayuda"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuButton, {
									icon: Headphones,
									text: "Soporte"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuButton, {
									icon: User,
									text: "Perfil"
								})
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "px-2 mb-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest",
							children: "Comunidad"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuButton, {
								icon: MessageCircle,
								text: "Chat en vivo"
							})
						})] }),
						isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "px-2 mb-2 text-[10px] font-bold text-red-500/70 uppercase tracking-widest",
							children: "Administración"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => goTo("/admin"),
								className: "w-full flex items-center justify-between p-3 rounded-xl bg-red-500/5 hover:bg-red-500/10 border border-red-500/10 transition-colors text-red-400",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "p-2 rounded-lg bg-red-500/10",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "w-4 h-4" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium text-sm",
										children: "Admin Panel"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "w-4 h-4" })]
							})
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "pt-4 border-t border-white/5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: handleLogout,
								className: "w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-500/10 text-red-400 transition-colors",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "p-2 rounded-lg bg-red-500/10",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "w-4 h-4" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-sm",
									children: "Cerrar sesión"
								})]
							})
						})
					]
				})
			]
		})]
	})] });
}
function MenuButton({ icon: Icon, text, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		onClick,
		className: "w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors text-slate-300",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-2 rounded-lg bg-white/5 text-slate-400",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "w-4 h-4" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-medium text-sm",
				children: text
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "w-4 h-4 text-slate-600" })]
	});
}
function NasetLayout({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "naset-bg relative min-h-screen overflow-x-hidden text-slate-100",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none fixed inset-0 grid-lines" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto w-full max-w-3xl px-4 pb-36 pt-6 sm:px-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-6 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/dashboard",
							className: "group flex items-center gap-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#3b82f6] to-[#00f0ff] shadow-[0_0_24px_-4px_rgba(0,240,255,.8)]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
									viewBox: "0 0 24 24",
									fill: "none",
									className: "h-5 w-5 text-[#04141a]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										d: "M9.5 14.5 14.5 9.5M8 16l-1.2 1.2a3.4 3.4 0 1 1-4.8-4.8L5 9.4M16 8l1.2-1.2a3.4 3.4 0 1 1 4.8 4.8L19 14.6",
										stroke: "currentColor",
										strokeWidth: "2.2",
										strokeLinecap: "round"
									})
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-heading text-lg font-bold tracking-[0.22em] text-white",
								children: ["NASET", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[#00f0ff]",
									children: "LINK"
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full border border-[#00f0ff]/30 bg-[#00f0ff]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#00f0ff]",
							children: "Nivel 2"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-7",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopBar, {})
					}),
					children
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BottomNav, {})
		]
	});
}
function AuthedLayout() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NasetLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) });
}
export { AuthedLayout as component };
