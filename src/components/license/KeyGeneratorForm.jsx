import { useState } from "react";
import { KeyRound, Loader2 } from "lucide-react";

const LENGTHS = [
  { value: 4, label: "Corto" },
  { value: 8, label: "Mediano" },
  { value: 12, label: "Largo" },
];

const DEVICES = [
  { value: 1, label: "1 equipo" },
  { value: 2, label: "2 equipos" },
  { value: 0, label: "Ilimitado" },
];

const segment = (active) =>
  [
    "flex-1 rounded-xl border px-2 py-2 text-[11px] font-semibold transition-all",
    active
      ? "border-[#00f0ff]/60 bg-[#00f0ff]/15 text-[#00f0ff] shadow-[0_0_18px_-6px_rgba(0,240,255,.9)]"
      : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/25",
  ].join(" ");

export default function KeyGeneratorForm({ onCreate, loading }) {
  const [prefix, setPrefix] = useState("PROTECT-VIP-");
  const [length, setLength] = useState(8);
  const [duration, setDuration] = useState(30);
  const [devices, setDevices] = useState(1);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onCreate({
      prefix: prefix.trim(),
      random_length: length,
      duration_days: Math.max(1, Number(duration) || 0),
      device_limit: devices,
    });
  };

  return (
    <section className="panel rounded-3xl p-5 sm:p-7">
      <div className="mb-4 flex items-center gap-2">
        <KeyRound className="h-4 w-4 text-[#00f0ff]" />
        <h2 className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
          Generador de Keys
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="key-prefix"
            className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500"
          >
            Prefijo personalizado
          </label>
          <input
            id="key-prefix"
            value={prefix}
            onChange={(event) => setPrefix(event.target.value)}
            placeholder="PROTECT-VIP-"
            className="mt-1.5 w-full rounded-2xl border border-white/10 bg-[#0a1322] px-4 py-3 font-mono text-sm text-white outline-none transition-colors focus:border-[#3b82f6]/70"
          />
        </div>

        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
            Caracteres aleatorios
          </p>
          <div className="mt-1.5 flex gap-2">
            {LENGTHS.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => setLength(item.value)}
                className={segment(length === item.value)}
              >
                {item.label} · {item.value}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label
              htmlFor="key-duration"
              className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500"
            >
              Duración (días)
            </label>
            <input
              id="key-duration"
              type="number"
              min={1}
              max={3650}
              value={duration}
              onChange={(event) => setDuration(event.target.value)}
              className="mt-1.5 w-full rounded-2xl border border-white/10 bg-[#0a1322] px-4 py-3 font-heading text-sm text-white outline-none transition-colors focus:border-[#3b82f6]/70"
            />
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
              Dispositivos
            </p>
            <div className="mt-1.5 flex gap-1.5">
              {DEVICES.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setDevices(item.value)}
                  className={segment(devices === item.value)}
                >
                  {item.value === 0 ? "∞" : item.value}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2.5 rounded-2xl bg-[#00f0ff] px-6 py-4 font-heading text-sm font-extrabold uppercase tracking-[0.16em] text-[#04141a] shadow-[0_0_44px_-8px_rgba(0,240,255,.85)] transition-all duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" strokeWidth={2.6} />
          ) : (
            <KeyRound className="h-5 w-5" strokeWidth={2.8} />
          )}
          {loading ? "Generando…" : "Crear Key"}
        </button>
      </form>
    </section>
  );
}