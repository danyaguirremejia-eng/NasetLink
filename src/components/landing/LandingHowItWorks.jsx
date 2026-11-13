import { Link2, Share2, Wallet } from "lucide-react";

const STEPS = [
  {
    icon: Link2,
    title: "Crea tu enlace",
    text: "Pega la URL de tu archivo y genera un enlace corto listo para monetizar.",
  },
  {
    icon: Share2,
    title: "Compártelo",
    text: "Publica tu enlace en redes, foros o grupos y atrae visitas reales.",
  },
  {
    icon: Wallet,
    title: "Gana dinero",
    text: "Cada visita que completa el anuncio suma saldo a tu cuenta al instante.",
  },
];

export default function LandingHowItWorks() {
  return (
    <section id="como-funciona" className="mx-auto w-full max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
      <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl">Cómo funciona</h2>
      <p className="mt-2 text-sm text-slate-400">Tres pasos y empiezas a cobrar por tu tráfico.</p>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {STEPS.map(({ icon: Icon, title, text }, index) => (
          <div key={title} className="panel rounded-3xl p-5">
            <div className="flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#3b82f6]/15">
                <Icon className="h-5 w-5 text-[#3b82f6]" />
              </span>
              <span className="font-heading text-2xl font-bold text-white/10">0{index + 1}</span>
            </div>
            <h3 className="mt-4 font-heading text-base font-bold text-white">{title}</h3>
            <p className="mt-1.5 text-xs leading-relaxed text-slate-400">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}