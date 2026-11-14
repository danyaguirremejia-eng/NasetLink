import { __toESM } from "../_runtime.mjs";
import { require_react } from "../_libs/react.mjs";
import { require_jsx_runtime } from "../_libs/react2.mjs";
import "../_libs/firebase.mjs";
import { collection, getDocs, query, where } from "../_libs/@firebase/firestore+[...].mjs";
import { toast } from "../_libs/sonner.mjs";
import { Link2 } from "../_libs/lucide-react33.mjs";
import { LogOut } from "../_libs/lucide-react38.mjs";
import { Mail } from "../_libs/lucide-react39.mjs";
import { MousePointerClick } from "../_libs/lucide-react43.mjs";
import { ShieldCheck } from "../_libs/lucide-react49.mjs";
import { TrendingUp } from "../_libs/lucide-react53.mjs";
import { Route$10, db, useAuth } from "./router-DtpLq15p.mjs";
import { CURRENT_LEVEL, RANK } from "./levels-DQTdmijI.mjs";
// node_modules/.nitro/vite/services/ssr/assets/perfil-CDPIjBlT.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProfileCard({ stats }) {
	const { user, logout } = useAuth();
	const email = user?.email ?? "";
	const initial = email.charAt(0).toUpperCase() || "N";
	const metrics = [
		{
			label: "Enlaces",
			value: stats?.links?.length ?? 0,
			icon: Link2
		},
		{
			label: "Clics",
			value: stats?.totalClicks ?? 0,
			icon: MousePointerClick
		},
		{
			label: "Ganado",
			value: `$${Number(stats?.totalEarnings ?? 0).toFixed(3)}`,
			icon: TrendingUp
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel rounded-3xl p-5 sm:p-7",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#3b82f6] to-[#00f0ff] font-heading text-xl font-bold text-[#04141a]",
							children: initial
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate font-heading text-lg font-bold text-white",
								children: user?.full_name || "Mi cuenta"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "flex items-center gap-1.5 truncate text-xs text-slate-400",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-3.5 w-3.5 shrink-0" }), email]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "rounded-full border border-[#00f0ff]/35 bg-[#00f0ff]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#00f0ff]",
							children: ["Nivel ", CURRENT_LEVEL.level]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "rounded-full border border-white/12 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-300",
							children: [
								RANK.icon,
								" ",
								RANK.name
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 grid grid-cols-3 gap-2.5",
						children: metrics.map(({ label, value, icon: Icon }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-white/[0.08] bg-white/[0.03] px-3 py-3 text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "mx-auto mb-1.5 h-4 w-4 text-[#3b82f6]" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-heading text-base font-bold text-white",
									children: value
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] uppercase tracking-[0.12em] text-slate-500",
									children: label
								})
							]
						}, label))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel flex items-center gap-3 rounded-3xl px-5 py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-5 w-5 shrink-0 text-emerald-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs leading-relaxed text-slate-400",
					children: "Tu cuenta está protegida. Los pagos se envían únicamente al correo de PayPal que indiques al solicitar el retiro."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: logout,
				className: "flex w-full items-center justify-center gap-2 rounded-2xl border border-white/12 bg-white/[0.04] px-5 py-3.5 text-sm font-semibold text-slate-200 transition-colors hover:border-rose-400/40 hover:text-rose-300",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" }), "Cerrar sesión"]
			})
		]
	});
}
function ProfilePage() {
	const { user } = Route$10.useRouteContext();
	const [stats, setStats] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		if (!user) return;
		const fetchStats = async () => {
			try {
				const q = query(collection(db, "links"), where("userId", "==", user.uid));
				const snap = await getDocs(q);
				let tClicks = 0;
				let tEarnings = 0;
				snap.forEach((doc) => {
					const data = doc.data();
					tClicks += data.clicks || 0;
					tEarnings += data.earnings || 0;
				});
				setStats({
					totalClicks: tClicks,
					totalEarnings: tEarnings,
					balance: tEarnings,
					links: snap.docs.map((d) => d.data())
				});
			} catch (error) {
				toast.error("Error cargando estadísticas");
			} finally {
				setLoading(false);
			}
		};
		fetchStats();
	}, [user]);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "text-center text-white mt-10",
		children: "Cargando perfil..."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileCard, { stats });
}
export { ProfilePage as component };
