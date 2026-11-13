import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Shield, BarChart3, MessageCircle, User } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const shell =
  "liquid inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold tracking-wide whitespace-nowrap";

const FAQ = [
  {
    q: "¿Cuándo se acreditan mis ganancias?",
    a: "Las ganancias se suman a tu saldo en el momento en que un visitante completa el temporizador del enlace.",
  },
  {
    q: "¿Cuál es el retiro mínimo?",
    a: "El mínimo para solicitar un pago por PayPal es de $5.00 USD.",
  },
  {
    q: "¿Cómo subo de nivel?",
    a: "Cada nivel desbloquea anuncios más largos y mejor pago por cada 1000 clics. Se avanza con clics válidos acumulados.",
  },
];

export default function TopBar() {
  const [modeOpen, setModeOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <header className="flex flex-wrap items-center gap-2.5">
      <button type="button" onClick={() => setModeOpen(true)} className={`${shell} text-white`}>
        <Shield className="h-4 w-4 text-[#00f0ff]" strokeWidth={2.2} />
        Modo
      </button>

      <Link
        to="/ganancias"
        className={`${shell} border-emerald-200/40 text-emerald-950`}
        style={{
          background: "linear-gradient(140deg, #6ef2a4 0%, #22d17a 100%)",
          backdropFilter: "blur(10px)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,.55), 0 10px 26px -10px rgba(34,209,122,.9)",
        }}
      >
        <BarChart3 className="h-4 w-4" strokeWidth={2.4} />
        Estado
      </Link>

      <button
        type="button"
        onClick={() => setChatOpen(true)}
        className={`${shell} border-white/70 text-slate-900`}
        style={{
          background: "linear-gradient(140deg, #ffffff 0%, #e8f1ff 100%)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,.9), 0 10px 26px -12px rgba(255,255,255,.8)",
        }}
      >
        <MessageCircle className="h-4 w-4 text-[#3b82f6]" strokeWidth={2.4} />
        Chat
      </button>

      <Link
        to="/perfil"
        className={`${shell} text-[#04141a]`}
        style={{
          background: "linear-gradient(140deg, #7bfaff 0%, #00f0ff 55%, #33b7ff 100%)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,.7), 0 10px 28px -8px rgba(0,240,255,.85)",
        }}
      >
        <User className="h-4 w-4" strokeWidth={2.6} />
        Mi Perfil
      </Link>

      <Dialog open={modeOpen} onOpenChange={setModeOpen}>
        <DialogContent className="border-white/10 bg-[#0d1626] text-slate-100">
          <DialogHeader>
            <DialogTitle className="font-heading text-lg">Modo de anuncios</DialogTitle>
            <DialogDescription className="text-slate-400">
              Estás en el Nivel 2 · anuncios de 10 segundos · $1.00 por cada 1000 clics.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 text-sm text-slate-300">
            <p>
              Los niveles más altos pagan más por clic, pero el visitante debe esperar más segundos antes
              de continuar a la descarga.
            </p>
            <Link
              to="/ganancias"
              onClick={() => setModeOpen(false)}
              className="inline-flex items-center rounded-full bg-[#00f0ff] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#04141a]"
            >
              Ver todos los niveles
            </Link>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={chatOpen} onOpenChange={setChatOpen}>
        <DialogContent className="border-white/10 bg-[#0d1626] text-slate-100">
          <DialogHeader>
            <DialogTitle className="font-heading text-lg">Chat de soporte</DialogTitle>
            <DialogDescription className="text-slate-400">
              Respuestas rápidas a las dudas más comunes.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            {FAQ.map((item) => (
              <div key={item.q} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                <p className="text-sm font-semibold text-white">{item.q}</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-400">{item.a}</p>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
}