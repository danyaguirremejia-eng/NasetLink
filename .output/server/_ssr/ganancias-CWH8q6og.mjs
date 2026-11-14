import { require_jsx_runtime } from "../_libs/react2.mjs";
import { CURRENT_LEVEL, LEVELS, RANK } from "./levels-DQTdmijI.mjs";
// node_modules/.nitro/vite/services/ssr/assets/ganancias-CWH8q6og.js
var import_jsx_runtime = require_jsx_runtime();
function LevelsTable() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "panel rounded-3xl p-5 sm:p-7",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-heading text-xl font-bold text-white",
				children: "💰 Pagos por 1000 clics"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-slate-400",
				children: "Cuanto más largo es el anuncio, mejor paga cada visita."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5 -mx-1 overflow-x-auto no-scrollbar",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[420px] border-collapse text-left",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "text-[10px] uppercase tracking-[0.16em] text-slate-500",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-2 pb-3 font-semibold",
								children: "Nivel"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-2 pb-3 font-semibold",
								children: "Tiempo de espera"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-2 pb-3 text-right font-semibold",
								children: "Pago"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: LEVELS.map((row) => {
						const active = row.level === CURRENT_LEVEL.level;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: ["border-t border-white/[0.07]", active ? "bg-[#00f0ff]/[0.06]" : ""].join(" "),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-2 py-3.5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: ["inline-flex items-center gap-2 text-sm font-semibold", active ? "text-[#00f0ff]" : "text-slate-200"].join(" "),
										children: [
											"Nivel ",
											row.level,
											active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "rounded-full bg-[#00f0ff]/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#00f0ff]",
												children: "Actual"
											})
										]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "px-2 py-3.5 text-sm text-slate-400",
									children: [row.seconds, " seg"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "px-2 py-3.5 text-right text-sm font-bold text-emerald-400",
									children: ["$", row.rate.toFixed(2)]
								})
							]
						}, row.level);
					}) })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-5 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-300",
				children: [
					"Estás en Nivel ",
					CURRENT_LEVEL.level,
					" de anuncios. Tu rango general es",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-semibold text-white",
						children: [
							RANK.icon,
							" ",
							RANK.name
						]
					}),
					"."
				]
			})
		]
	});
}
function EarningsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LevelsTable, {})
	});
}
export { EarningsPage as component };
