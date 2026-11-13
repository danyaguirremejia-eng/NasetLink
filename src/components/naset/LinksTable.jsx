import { Copy, MousePointerClick, TrendingUp } from "lucide-react";

export default function LinksTable({ links = [], onCopy }) {
  return (
    <section className="panel rounded-3xl p-5 sm:p-7">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-heading text-lg font-bold text-white">Mis Enlaces</h2>
        <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
          {links.length} {links.length === 1 ? "enlace" : "enlaces"}
        </span>
      </div>

      {links.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/12 bg-white/[0.02] px-6 py-10 text-center">
          <p className="text-sm text-slate-400">Aún no tienes links. Crea uno arriba.</p>
        </div>
      ) : (
        <div className="-mx-1 overflow-x-auto no-scrollbar">
          <table className="w-full min-w-[520px] border-collapse text-left">
            <thead>
              <tr className="text-[10px] uppercase tracking-[0.16em] text-slate-500">
                <th className="px-2 pb-3 font-semibold">URL Corta</th>
                <th className="px-2 pb-3 font-semibold">Clics</th>
                <th className="px-2 pb-3 text-right font-semibold">Ganancias</th>
              </tr>
            </thead>
            <tbody>
              {links.map((link) => (
                <tr key={link.id} className="border-t border-white/[0.07]">
                  <td className="px-2 py-3.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[13px] text-[#00f0ff]">
                        /s/{link.short_code}
                      </span>
                      <button
                        type="button"
                        onClick={() => onCopy?.(link)}
                        className="rounded-md p-1 text-slate-500 transition-colors hover:bg-white/10 hover:text-white"
                        aria-label="Copiar enlace"
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <p className="mt-0.5 max-w-[240px] truncate text-[11px] text-slate-500">
                      {link.original_url}
                    </p>
                  </td>
                  <td className="px-2 py-3.5">
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-200">
                      <MousePointerClick className="h-3.5 w-3.5 text-[#3b82f6]" />
                      {link.clicks ?? 0}
                    </span>
                  </td>
                  <td className="px-2 py-3.5 text-right">
                    <span className="inline-flex items-center gap-1 text-sm font-bold text-emerald-400">
                      <TrendingUp className="h-3.5 w-3.5" />
                      ${Number(link.earnings ?? 0).toFixed(3)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}