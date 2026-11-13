import { PAYOUT_STEPS, PLAN_LEVELS, ecpmFor } from "@/lib/levels";

export default function LandingPayoutTable() {
  return (
    <section id="pagos" className="mx-auto w-full max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
      <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl">Tabla de pagos</h2>
      <p className="mt-2 text-sm text-slate-400">
        USD por cada 1000 clics válidos según tu nivel y los pasos del enlace.
      </p>

      <div className="panel mt-6 overflow-hidden rounded-3xl">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full min-w-[460px] border-collapse text-left">
            <thead>
              <tr className="bg-white/[0.04] text-[10px] uppercase tracking-[0.14em] text-slate-400">
                <th className="px-4 py-3 font-semibold">Nivel</th>
                {PAYOUT_STEPS.map((steps) => (
                  <th key={steps} className="px-3 py-3 text-center font-semibold">
                    {steps} pasos
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PLAN_LEVELS.map((level) => {
                const isMax = level.id === PLAN_LEVELS.length;
                return (
                  <tr
                    key={level.id}
                    className={[
                      "border-t border-white/[0.07]",
                      isMax ? "bg-[#3b82f6]/[0.09]" : "",
                    ].join(" ")}
                  >
                    <td className="px-4 py-3 text-xs font-semibold text-white">
                      {level.label}
                      {isMax && (
                        <span className="ml-2 rounded-full bg-[#3b82f6]/25 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#9ec5ff]">
                          Top
                        </span>
                      )}
                    </td>
                    {PAYOUT_STEPS.map((steps) => (
                      <td
                        key={steps}
                        className={[
                          "px-3 py-3 text-center text-sm font-bold",
                          isMax ? "text-[#9ec5ff]" : "text-emerald-400",
                        ].join(" ")}
                      >
                        ${ecpmFor(level.id, steps).toFixed(2)}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}