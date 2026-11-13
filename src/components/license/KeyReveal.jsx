import { CheckCircle2, Copy, MonitorSmartphone, Timer } from "lucide-react";
import { toast } from "sonner";

export default function KeyReveal({ license }) {
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(license.key_code);
      toast.success("Key copiada");
    } catch {
      toast.error("No se pudo copiar");
    }
  };

  const devices = Number(license.device_limit) || 0;
  const expires = license.expires_at ? String(license.expires_at).slice(0, 10) : "—";

  return (
    <section className="panel rounded-3xl p-7 text-center">
      <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-400" />
      <h1 className="mt-3 font-heading text-xl font-bold text-white">¡Tu Key está lista!</h1>
      <p className="mt-1.5 text-sm text-slate-400">
        Cópiala y actívala en la app para empezar a usarla.
      </p>

      <div className="mt-5 rounded-2xl border border-[#00f0ff]/40 bg-[#00f0ff]/[0.08] px-4 py-5">
        <p className="break-all font-mono text-lg font-bold tracking-wide text-white">
          {license.key_code}
        </p>
      </div>

      <button
        type="button"
        onClick={copy}
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#00f0ff] px-6 py-3.5 font-heading text-sm font-extrabold uppercase tracking-[0.16em] text-[#04141a] transition-transform hover:-translate-y-0.5"
      >
        <Copy className="h-4 w-4" />
        Copiar Key
      </button>

      <div className="mt-5 grid grid-cols-2 gap-2.5 text-left">
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] px-3 py-3">
          <Timer className="mb-1.5 h-4 w-4 text-[#3b82f6]" />
          <p className="font-heading text-sm font-bold text-white">{expires}</p>
          <p className="text-[10px] uppercase tracking-[0.12em] text-slate-500">Vence</p>
        </div>
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] px-3 py-3">
          <MonitorSmartphone className="mb-1.5 h-4 w-4 text-[#3b82f6]" />
          <p className="font-heading text-sm font-bold text-white">
            {devices === 0 ? "Ilimitados" : devices}
          </p>
          <p className="text-[10px] uppercase tracking-[0.12em] text-slate-500">Dispositivos</p>
        </div>
      </div>
    </section>
  );
}