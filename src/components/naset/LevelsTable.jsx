import { LEVELS, CURRENT_LEVEL, RANK } from "@/lib/levels";

export default function LevelsTable() {
  return (
    <section className="panel rounded-3xl p-5 sm:p-7">
      <h1 className="font-heading text-xl font-bold text-white">💰 Pagos por 1000 clics</h1>
      <p className="mt-1 text-sm text-slate-400">
        Cuanto más largo es el anuncio, mejor paga cada visita.
      </p>

      <div className="mt-5 -mx-1 overflow-x-auto no-scrollbar">
        <table className="w-full min-w-[420px] border-collapse text-left">
          <thead>
            <tr className="text-[10px] uppercase tracking-[0.16em] text-slate-500">
              <th className="px-2 pb-3 font-semibold">Nivel</th>
              <th className="px-2 pb-3 font-semibold">Tiempo de espera</th>
              <th className="px-2 pb-3 text-right font-semibold">Pago</th>
            </tr>
          </thead>
          <tbody>
            {LEVELS.map((row) => {
              const active = row.level === CURRENT_LEVEL.level;
              return (
                <tr
                  key={row.level}
                  className={[
                    "border-t border-white/[0.07]",
                    active ? "bg-[#00f0ff]/[0.06]" : "",
                  ].join(" ")}
                >
                  <td className="px-2 py-3.5">
                    <span
                      className={[
                        "inline-flex items-center gap-2 text-sm font-semibold",
                        active ? "text-[#00f0ff]" : "text-slate-200",
                      ].join(" ")}
                    >
                      Nivel {row.level}
                      {active && (
                        <span className="rounded-full bg-[#00f0ff]/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#00f0ff]">
                          Actual
                        </span>
                      )}
                    </span>
                  </td>
                  <td className="px-2 py-3.5 text-sm text-slate-400">{row.seconds} seg</td>
                  <td className="px-2 py-3.5 text-right text-sm font-bold text-emerald-400">
                    ${row.rate.toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-300">
        Estás en Nivel {CURRENT_LEVEL.level} de anuncios. Tu rango general es{" "}
        <span className="font-semibold text-white">
          {RANK.icon} {RANK.name}
        </span>
        .
      </p>
    </section>
  );
}