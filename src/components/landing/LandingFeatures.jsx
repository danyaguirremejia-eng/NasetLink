import {
  ShieldCheck,
  Activity,
  Layers,
  Users,
  Wallet,
  Link2,
} from "lucide-react";

const FEATURES = [
  { icon: ShieldCheck, title: "Ganancias protegidas", text: "Filtros antifraude que descartan tráfico inválido y bots." },
  { icon: Activity, title: "Estadísticas en vivo", text: "Clics, países y dispositivos actualizados al segundo." },
  { icon: Layers, title: "Sistema de niveles", text: "Sube de nivel y desbloquea tarifas más altas por visita." },
  { icon: Users, title: "Programa de referidos", text: "Invita creadores y gana un porcentaje de sus ingresos." },
  { icon: Wallet, title: "Pagos puntuales", text: "Retira desde $5 USD por PayPal, cripto o transferencia." },
  { icon: Link2, title: "Enlaces ilimitados", text: "Crea todos los enlaces que necesites, sin restricciones." },
];

export default function LandingFeatures() {
  return (
    <section className="mx-auto w-full max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
      <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl">
        Todo lo que necesitas para cobrar
      </h2>
      <p className="mt-2 text-sm text-slate-400">Herramientas pensadas para creadores de contenido.</p>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map(({ icon: Icon, title, text }) => (
          <div key={title} className="liquid rounded-2xl p-5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2563eb]/25">
              <Icon className="h-5 w-5 text-[#7db3ff]" />
            </span>
            <h3 className="mt-3.5 font-heading text-sm font-bold text-white">{title}</h3>
            <p className="mt-1.5 text-xs leading-relaxed text-slate-400">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}