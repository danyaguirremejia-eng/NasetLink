import { Link } from "@tanstack/react-router";
import { Send, Instagram, Youtube, MessageCircle } from "lucide-react";

const SOCIAL = [
  { icon: Send, label: "Telegram" },
  { icon: Instagram, label: "Instagram" },
  { icon: Youtube, label: "YouTube" },
  { icon: MessageCircle, label: "WhatsApp" },
];

export default function LandingFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#070d1a]/70">
      <div className="mx-auto w-full max-w-5xl px-5 py-10 sm:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-heading text-base font-bold tracking-[0.2em] text-white">
              NASET<span className="text-[#3b82f6]">LINK</span>
            </p>
            <p className="mt-2 max-w-xs text-xs leading-relaxed text-slate-400">
              Plataforma de monetización de enlaces para creadores de contenido de Latinoamérica.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            {SOCIAL.map(({ icon: Icon, label }) => (
              <span
                key={label}
                title={label}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/12 bg-white/[0.05] text-slate-300"
              >
                <Icon className="h-4 w-4" />
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-white/[0.08] pt-5 text-[11px] text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} NASETLINK. Todos los derechos reservados.</p>
          <div className="flex flex-wrap items-center gap-4">
            <span>Términos y condiciones</span>
            <span>Política de privacidad</span>
            <Link to="/dashboard" className="text-slate-400 transition-colors hover:text-[#3b82f6]">
              Mi panel
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}