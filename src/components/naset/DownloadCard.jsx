import { useEffect, useState } from "react";
import { Download, Loader2, ShieldCheck } from "lucide-react";
import { COUNTDOWN_SECONDS } from "@/lib/levels";
import { registerClick } from "@/lib/server-fns";

export default function DownloadCard({ link }) {
  const [seconds, setSeconds] = useState(COUNTDOWN_SECONDS);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setSeconds((value) => (value > 0 ? value - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);

  let host = "";
  try {
    host = new URL(link.original_url).hostname;
  } catch {
    host = link.original_url;
  }

  const ready = seconds === 0;
  const progress = Math.min(100, ((COUNTDOWN_SECONDS - seconds) / COUNTDOWN_SECONDS) * 100);

  const handleContinue = async () => {
    if (!ready || busy) return;
    setBusy(true);
    try {
      const result = await registerClick({ data: { code: link.short_code } });
      window.location.href = result?.original_url || link.original_url;
    } catch {
      window.location.href = link.original_url;
    }
  };

  return (
    <div className="panel w-full rounded-3xl p-6 text-center sm:p-8">
      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500">
        Enlace verificado
      </p>
      <h1 className="mt-2 font-heading text-2xl font-bold leading-tight text-white">
        Tu archivo está casi listo
      </h1>
      <p className="mt-1 text-xs text-slate-400">
        Espera mientras preparamos la descarga de <span className="text-slate-200">{host}</span>
      </p>

      {/* Espacio para anuncio */}
      <div className="relative mt-6 overflow-hidden rounded-2xl border border-dashed border-white/15 bg-[#0a1322]/80">
        <div className="flex h-40 flex-col items-center justify-center gap-1.5 px-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#3b82f6]">
            Espacio publicitario
          </span>
          <span className="text-[11px] text-slate-500">Anuncio patrocinado de {COUNTDOWN_SECONDS} s</span>
        </div>
        <span className="pointer-events-none absolute inset-0 animate-[float-slow_4s_ease-in-out_infinite] bg-gradient-to-tr from-[#3b82f6]/10 via-transparent to-[#00f0ff]/10" />
      </div>

      <div className="mt-7">
        <p
          className="font-heading text-[72px] font-bold leading-none text-[#00f0ff]"
          style={{ textShadow: "0 0 34px rgba(0,240,255,.55)" }}
        >
          {String(seconds).padStart(2, "0")}
        </p>
        <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
          {ready ? "Listo para continuar" : "Segundos restantes"}
        </p>

        <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#3b82f6] to-[#00f0ff] transition-all duration-1000 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <button
        type="button"
        onClick={handleContinue}
        disabled={!ready || busy}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 py-4 font-heading text-sm font-extrabold uppercase tracking-[0.12em] text-emerald-950 shadow-[0_0_40px_-12px_rgba(16,185,129,.95)] transition-all duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400 disabled:shadow-none"
      >
        {busy ? <Loader2 className="h-5 w-5 animate-spin" /> : <Download className="h-5 w-5" strokeWidth={2.6} />}
        Continuar a la descarga
      </button>

      <p className="mt-4 flex items-center justify-center gap-1.5 text-[10px] text-slate-500">
        <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
        Serás redirigido a {host}
      </p>
    </div>
  );
}