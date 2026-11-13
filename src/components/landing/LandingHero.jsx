import { Link } from "@tanstack/react-router";
import { Sparkles, Calculator } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";

export default function LandingHero() {
  const { isAuthenticated } = useAuth();

  return (
    <section id="inicio" className="mx-auto w-full max-w-5xl px-5 pb-10 pt-12 sm:px-8 sm:pb-16 sm:pt-20">
      <span className="inline-flex items-center gap-2 rounded-full border border-[#3b82f6]/40 bg-[#3b82f6]/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#7db3ff]">
        <Sparkles className="h-3.5 w-3.5" />
        +128.000 creadores ya monetizan
      </span>

      <h1 className="mt-5 font-heading text-4xl font-bold leading-[1.08] text-white sm:text-6xl">
        Monetiza tus enlaces <span className="text-[#3b82f6]">como un profesional</span>
      </h1>

      <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
        Convierte cada descarga en ingresos. Acorta tu enlace, compártelo y cobra por cada visita válida
        con las tarifas más altas del mercado.
      </p>

      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Link
          to={isAuthenticated ? "/dashboard" : "/register"}
          className="inline-flex items-center justify-center rounded-full bg-[#2563eb] px-7 py-3.5 font-heading text-sm font-bold uppercase tracking-[0.1em] text-white shadow-[0_16px_40px_-14px_rgba(37,99,235,1)] transition-transform hover:-translate-y-0.5"
        >
          {isAuthenticated ? "Ir a mi panel" : "Empezar gratis"}
        </Link>
        <a
          href="#calculadora"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-7 py-3.5 font-heading text-sm font-bold uppercase tracking-[0.1em] text-slate-100 backdrop-blur-md transition-colors hover:border-[#3b82f6]/50 hover:text-white"
        >
          <Calculator className="h-4 w-4 text-[#3b82f6]" />
          Calcular ganancias
        </a>
      </div>
    </section>
  );
}