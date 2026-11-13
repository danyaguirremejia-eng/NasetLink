import { Copy, KeyRound } from "lucide-react";
import { toast } from "sonner";

const STATUS = {
  active: { label: "Activa", style: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300" },
  expired: { label: "Expirada", style: "border-amber-400/30 bg-amber-400/10 text-amber-300" },
  revoked: { label: "Revocada", style: "border-rose-400/30 bg-rose-400/10 text-rose-300" },
};

const isExpired = (key) => {
  const expires = key.expires_at ? new Date(key.expires_at).getTime() : 0;
  return key.status !== "active" || !expires || expires < Date.now();
};

const copyDelivery = async (id) => {
  try {
    await navigator.clipboard.writeText(`${window.location.origin}/getkey/${id}`);
    toast.success("Enlace de entrega copiado");
  } catch {
    toast.error("No se pudo copiar");
  }
};

export default function KeysTable({ keys }) {
  return (
    <section className="panel rounded-3xl p-5 sm:p-7">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
          Keys generadas
        </h2>
        <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
          {keys.length} {keys.length === 1 ? "key" : "keys"}
        </span>
      </div>

      {keys.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/12 px-4 py-10 text-center">
          <KeyRound className="mx-auto mb-2 h-6 w-6 text-slate-600" />
          <p className="text-sm text-slate-400">Todavía no has generado ninguna Key.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-left">
            <thead>
              <tr className="text-[10px] uppercase tracking-[0.14em] text-slate-500">
                <th className="pb-2 font-semibold">Key</th>
                <th className="pb-2 font-semibold">Estado</th>
                <th className="pb-2 font-semibold">Expira</th>
                <th className="pb-2 font-semibold">Equipos</th>
                <th className="pb-2 text-right font-semibold">Entrega</th>
              </tr>
            </thead>
            <tbody>
              {keys.map((key) => {
                const expired = isExpired(key);
                const status = STATUS[expired ? "expired" : key.status] ?? STATUS.active;
                const limit = Number(key.device_limit) || 0;
                const used = Array.isArray(key.devices) ? key.devices.length : 0;

                return (
                  <tr key={key.id} className="border-t border-white/[0.07] text-xs">
                    <td className="py-3 pr-3 font-mono text-[11px] text-white">{key.key_code}</td>
                    <td className="py-3 pr-3">
                      <span
                        className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${status.style}`}
                      >
                        {status.label}
                      </span>
                      {key.delivered && (
                        <span className="ml-1 inline-flex rounded-full border border-[#3b82f6]/30 bg-[#3b82f6]/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#93c5fd]">
                          Entregada
                        </span>
                      )}
                    </td>
                    <td className="py-3 pr-3 text-slate-300">
                      {key.expires_at ? String(key.expires_at).slice(0, 10) : "—"}
                    </td>
                    <td className="py-3 pr-3 text-slate-300">
                      {used}/{limit === 0 ? "∞" : limit}
                    </td>
                    <td className="py-3 text-right">
                      <button
                        type="button"
                        onClick={() => copyDelivery(key.id)}
                        className="inline-flex items-center gap-1.5 rounded-full border border-white/12 px-3 py-1.5 text-[11px] font-semibold text-slate-200 transition-colors hover:border-[#00f0ff]/50 hover:text-[#00f0ff]"
                      >
                        <Copy className="h-3 w-3" />
                        Copiar
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}