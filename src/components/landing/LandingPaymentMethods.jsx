import { Wallet, Coins, CircleDollarSign, Landmark } from "lucide-react";

const METHODS = [
  { icon: Wallet, name: "PayPal", detail: "Retiro mínimo $5 USD" },
  { icon: CircleDollarSign, name: "Cripto", detail: "BTC · ETH · USDT" },
  { icon: Coins, name: "USDT", detail: "Red TRC20 / BEP20" },
  { icon: Landmark, name: "Transferencia", detail: "Bancos de LATAM" },
];

export default function LandingPaymentMethods() {
  return (
    <section className="mx-auto w-full max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
      <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl">Métodos de pago</h2>
      <p className="mt-2 text-sm text-slate-400">Elige cómo quieres recibir tus ganancias.</p>

      <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {METHODS.map(({ icon: Icon, name, detail }) => (
          <div key={name} className="liquid rounded-2xl p-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2563eb]/25">
              <Icon className="h-5 w-5 text-[#7db3ff]" />
            </span>
            <p className="mt-3 font-heading text-sm font-bold text-white">{name}</p>
            <p className="mt-0.5 text-[10px] uppercase tracking-[0.1em] text-slate-400">{detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}