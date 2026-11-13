import { useEffect, useState } from "react";
import { Cloud, GraduationCap, Link2, Loader2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { claimLicenseKey } from "@/lib/license-fns";
import KeyReveal from "./KeyReveal";

const AD_SECONDS = 6;

const AD_POOL = [
  {
    tag: "Seguridad",
    title: "Navega sin límites",
    copy: "Protege tus datos en cada conexión con la app de seguridad del patrocinador.",
    icon: ShieldCheck,
    gradient: "from-[#3b82f6] via-[#1d4ed8] to-[#0b1220]",
  },
  {
    tag: "Cursos",
    title: "Aprende diseño web gratis",
    copy: "Clases cortas de interfaz y código para lanzar tu primer proyecto esta semana.",
    icon: GraduationCap,
    gradient: "from-[#00f0ff] via-[#0891b2] to-[#0b1220]",
  },
  {
    tag: "Almacenamiento",
    title: "Tu nube personal",
    copy: "Guarda archivos y compártelos con un solo enlace desde cualquier dispositivo.",
    icon: Cloud,
    gradient: "from-[#6366f1] via-[#3b82f6] to-[#0b1220]",
  },
  {
    tag: "NASETLINK",
    title: "Gana con tus enlaces",
    copy: "Acorta enlaces y recibe $1.00 por cada 1000 clics completados.",
    icon: Link2,
    gradient: "from-[#22d3ee] via-[#3b82f6] to-[#1e3a8a]",
  },
];

export default function AdGate({ info }) {
  const [ads, setAds] = useState(null);
  const [index, setIndex] = useState(0);
  const [seconds, setSeconds] = useState(AD_SECONDS);
  const [result, setResult] = useState(null);
  const [claiming, setClaiming] = useState(false);

  useEffect(() => {
    const total = 2 + Math.floor(Math.random() * 3);
    setAds([...AD_POOL].sort(() => Math.random() - 0.5).slice(0, total));
  }, []);

  useEffect(() => {
    if (!ads || index >= ads.length) return;
    setSeconds(AD_SECONDS);
    const startedAt = Date.now();
    const timer = setInterval(() => {
      const left = AD_SECONDS - Math.floor((Date.now() - startedAt) / 1000);
      if (left <= 0) {
        clearInterval(timer);
        setSeconds(0);
        setIndex((value) => value + 1);
      } else {
        setSeconds(left);
      }
    }, 250);
    return () => clearInterval(timer);
  }, [ads, index]);

  const reveal = async () => {
    if (claiming) return;
    setClaiming(true);
    try {
      setResult(await claimLicenseKey({ data: { id: info.id } }));
    } catch {
      toast.error("No se pudo obtener la Key, inténtalo de nuevo");
    } finally {
      setClaiming(false);
    }
  };

  if (result && !result.ok) {
    return (
      <div className="panel rounded-3xl p-8 text-center">
        <h1 className="font-heading text-xl font-bold text-white">Esta Key ya no está disponible</h1>
        <p className="mt-2 text-sm text-slate-400">
          La licencia expiró o fue revocada por el administrador.
        </p>
      </div>
    );
  }

  if (result?.ok) return <KeyReveal license={result} />;

  if (!ads) {
    return (
      <div className="panel flex items-center justify-center gap-3 rounded-3xl p-10 text-sm text-slate-400">
        <Loader2 className="h-4 w-4 animate-spin text-[#00f0ff]" />
        Preparando tus anuncios…
      </div>
    );
  }

  const ad = ads[index];

  if (!ad) {
    return (
      <div className="panel rounded-3xl p-7 text-center">
        <span className="inline-flex rounded-full border border-[#00f0ff]/40 bg-[#00f0ff]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#00f0ff]">
          Anuncios completados
        </span>
        <h1 className="mt-4 font-heading text-xl font-bold text-white">Ya puedes ver tu Key</h1>
        <p className="mt-2 text-sm text-slate-400">
          Completaste los {ads.length} anuncios. Tu licencia está lista para copiar.
        </p>
        <button
          type="button"
          onClick={reveal}
          disabled={claiming}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#00f0ff] px-6 py-4 font-heading text-sm font-extrabold uppercase tracking-[0.16em] text-[#04141a] shadow-[0_0_44px_-8px_rgba(0,240,255,.85)] transition-all hover:-translate-y-0.5 disabled:opacity-60"
        >
          {claiming && <Loader2 className="h-4 w-4 animate-spin" />}
          {claiming ? "Preparando…" : "Mostrar mi Key"}
        </button>
      </div>
    );
  }

  const Icon = ad.icon;
  const progress = ((AD_SECONDS - seconds) / AD_SECONDS) * 100;

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between px-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
        <span>
          Anuncio {index + 1} de {ads.length}
        </span>
        <span>{seconds > 0 ? `Espera ${seconds}s` : "Listo"}</span>
      </div>

      <div className={`relative overflow-hidden rounded-3xl border border-white/12 bg-gradient-to-br ${ad.gradient} p-6`}>
        <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
        <div className="relative">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/90">
            <Icon className="h-3 w-3" />
            {ad.tag}
          </span>
          <h2 className="mt-4 font-heading text-xl font-bold leading-snug text-white">{ad.title}</h2>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/80">{ad.copy}</p>
          <span className="mt-5 inline-flex items-center rounded-full bg-white px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#0f172a]">
            Más información
          </span>
        </div>

        <div className="relative mt-6 h-1.5 w-full overflow-hidden rounded-full bg-black/30">
          <div
            className="h-full rounded-full bg-[#00f0ff] transition-[width] duration-200 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <p className="px-1 text-center text-[10px] uppercase tracking-[0.14em] text-slate-600">
        Anuncio simulado · clave protegida por NASETLINK
      </p>
    </section>
  );
}