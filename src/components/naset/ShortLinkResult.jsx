import { useEffect, useState } from "react";
import { Copy, ExternalLink } from "lucide-react";

export default function ShortLinkResult({ link }) {
  const [origin, setOrigin] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  useEffect(() => {
    setCopied(false);
  }, [link?.short_code]);

  if (!link) return null;

  const fullUrl = `${origin}/s/${link.short_code}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="rounded-2xl border border-[#00f0ff]/35 bg-[#00f0ff]/[0.07] p-4">
      <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#00f0ff]">
        Enlace listo
      </p>
      <div className="flex flex-wrap items-center gap-2">
        <span className="min-w-0 flex-1 truncate font-mono text-sm text-white">{fullUrl}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[11px] font-semibold text-white transition-colors hover:border-[#00f0ff]/60 hover:text-[#00f0ff]"
        >
          <Copy className="h-3.5 w-3.5" />
          {copied ? "Copiado" : "Copiar"}
        </button>
        <a
          href={fullUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full bg-[#3b82f6] px-3 py-1.5 text-[11px] font-semibold text-white transition-colors hover:bg-[#2563eb]"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          Abrir
        </a>
      </div>
    </div>
  );
}