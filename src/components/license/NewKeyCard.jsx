import { useEffect, useState } from "react";
import { Copy, Radio, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

const copyText = async (value, message) => {
  try {
    await navigator.clipboard.writeText(value);
    toast.success(message);
  } catch {
    toast.error("No se pudo copiar");
  }
};

export default function NewKeyCard({ license }) {
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const deliveryPath = `/getkey/${license.id}`;
  const deliveryUrl = `${origin}${deliveryPath}`;

  return (
    <section className="rounded-3xl border border-[#00f0ff]/40 bg-[#00f0ff]/[0.07] p-5 sm:p-6">
      <div className="mb-3 flex items-center gap-2">
        <ShieldCheck className="h-4 w-4 text-[#00f0ff]" />
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#00f0ff]">
          Key creada · activa · no entregada
        </p>
      </div>

      <p className="break-all font-mono text-lg font-bold text-white">{license.key_code}</p>

      <div className="mt-4 rounded-2xl border border-white/10 bg-[#0a1322] px-4 py-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
          Enlace único de entrega
        </p>
        <p className="mt-1 break-all font-mono text-xs text-[#7bfaff]">{deliveryUrl || deliveryPath}</p>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => copyText(license.key_code, "Key copiada")}
          className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/20"
        >
          <Copy className="h-3.5 w-3.5" />
          Copiar Key
        </button>
        <button
          type="button"
          onClick={() => copyText(deliveryUrl, "Enlace de entrega copiado")}
          className="inline-flex items-center gap-2 rounded-full bg-[#3b82f6] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#2563eb]"
        >
          <Radio className="h-3.5 w-3.5" />
          Copiar enlace de entrega
        </button>
      </div>
    </section>
  );
}