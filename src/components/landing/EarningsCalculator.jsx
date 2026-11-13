import { useState } from "react";
import { TrendingUp } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { PLAN_LEVELS, ecpmFor } from "@/lib/levels";

const MIN_VISITS = 1000;
const MAX_VISITS = 1000000;

function visitsFromPercent(percent) {
  const value = MIN_VISITS * Math.pow(MAX_VISITS / MIN_VISITS, percent / 100);
  return Math.round(value / 1000) * 1000;
}

function formatVisits(visits) {
  if (visits >= 1000000) return "1M";
  return `${Math.round(visits / 1000)}K`;
}

export default function EarningsCalculator() {
  const [visitsPercent, setVisitsPercent] = useState(38);
  const [steps, setSteps] = useState(2);
  const [levelId, setLevelId] = useState(1);

  const visits = visitsFromPercent(visitsPercent);
  const ecpm = ecpmFor(levelId, steps);
  const earnings = (visits / 1000) * ecpm;

  return (
    <section id="calculadora" className="mx-auto w-full max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
      <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl">
        Calcula tus ganancias
      </h2>
      <p className="mt-2 text-sm text-slate-400">
        Ajusta tus visitas, los pasos de tu enlace y tu nivel para ver cuánto puedes ganar.
      </p>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_1fr]">
        <div className="panel space-y-7 rounded-3xl p-5 sm:p-7">
          <div>
            <div className="flex items-baseline justify-between">
              <label htmlFor="visits" className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                Visitas mensuales
              </label>
              <span className="font-heading text-sm font-bold text-white">
                {visits.toLocaleString("en-US")}
              </span>
            </div>
            <Slider
              id="visits"
              className="mt-3"
              min={0}
              max={100}
              step={1}
              value={[visitsPercent]}
              onValueChange={([value]) => setVisitsPercent(value)}
            />
            <div className="mt-1 flex justify-between text-[10px] uppercase tracking-[0.12em] text-slate-500">
              <span>1K</span>
              <span>{formatVisits(visits)}</span>
              <span>1M</span>
            </div>
          </div>

          <div>
            <div className="flex items-baseline justify-between">
              <label htmlFor="steps" className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                Pasos del enlace
              </label>
              <span className="font-heading text-sm font-bold text-white">{steps}</span>
            </div>
            <Slider
              id="steps"
              className="mt-3"
              min={1}
              max={6}
              step={1}
              value={[steps]}
              onValueChange={([value]) => setSteps(value)}
            />
            <div className="mt-1 flex justify-between text-[10px] uppercase tracking-[0.12em] text-slate-500">
              <span>1</span>
              <span>6</span>
            </div>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
              Nivel de pago
            </p>
            <div className="mt-2.5 grid grid-cols-3 gap-1.5">
              {PLAN_LEVELS.map((level) => {
                const active = level.id === levelId;
                return (
                  <button
                    key={level.id}
                    type="button"
                    onClick={() => setLevelId(level.id)}
                    className={[
                      "rounded-xl border px-2 py-2 text-[10px] font-bold uppercase tracking-[0.08em] transition-colors",
                      active
                        ? "border-[#3b82f6] bg-[#2563eb] text-white shadow-[0_8px_22px_-10px_rgba(37,99,235,1)]"
                        : "border-white/12 bg-white/[0.04] text-slate-300 hover:border-[#3b82f6]/50 hover:text-white",
                    ].join(" ")}
                  >
                    {level.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-3xl border border-[#3b82f6]/35 bg-gradient-to-br from-[#1d4ed8]/35 via-[#0b1526]/85 to-[#3b82f6]/15 p-6 backdrop-blur-xl">
          <div>
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#3b82f6]/20">
              <TrendingUp className="h-5 w-5 text-[#7db3ff]" />
            </span>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300">
              Ganancia estimada al mes
            </p>
            <p className="mt-1 font-heading text-4xl font-bold leading-none text-white sm:text-5xl">
              $
              {earnings.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>

          <div className="mt-6 space-y-2 border-t border-white/10 pt-4 text-xs">
            <div className="flex items-center justify-between text-slate-300">
              <span>eCPM aplicado</span>
              <span className="font-semibold text-white">${ecpm.toFixed(2)} / 1000 clics</span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span>Cálculo</span>
              <span>
                {visits.toLocaleString("en-US")} × ${ecpm.toFixed(2)} / 1000
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}