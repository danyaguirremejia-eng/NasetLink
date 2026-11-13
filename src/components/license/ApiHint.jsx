import { useEffect, useState } from "react";
import { Copy, Terminal } from "lucide-react";
import { toast } from "sonner";

export default function ApiHint() {
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const endpoint = `${origin}/api/validate?key=TU-KEY`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(endpoint);
      toast.success("Endpoint copiado");
    } catch {
      toast.error("No se pudo copiar");
    }
  };

  return (
    <section className="panel rounded-3xl p-5 sm:p-6">
      <div className="mb-2 flex items-center gap-2">
        <Terminal className="h-4 w-4 text-[#3b82f6]" />
        <h2 className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
          API de validación
        </h2>
      </div>
      <p className="text-xs leading-relaxed text-slate-400">
        Usa este endpoint desde tu app Android. Añade <span className="font-mono text-[#7bfaff]">
          &amp;device=ID
        </span>{" "}
        para registrar el equipo y respetar el límite de dispositivos.
      </p>
      <div className="mt-3 flex items-center gap-2 rounded-2xl border border-white/10 bg-[#0a1322] px-4 py-3">
        <code className="min-w-0 flex-1 truncate font-mono text-[11px] text-[#7bfaff]">
          {endpoint}
        </code>
        <button
          type="button"
          onClick={copy}
          className="shrink-0 rounded-full bg-white/10 p-2 text-slate-200 transition-colors hover:bg-white/20"
          aria-label="Copiar endpoint"
        >
          <Copy className="h-3.5 w-3.5" />
        </button>
      </div>
      <p className="mt-3 font-mono text-[11px] text-slate-500">
        {`{ "status": "valid", "expires": "YYYY-MM-DD" }`}
      </p>
    </section>
  );
}