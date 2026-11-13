import { Users, MousePointerClick, Globe2, ShieldCheck } from "lucide-react";

const STATS = [
  { label: "Usuarios activos", value: "128K+", icon: Users },
  { label: "Clics válidos", value: "42M", icon: MousePointerClick },
  { label: "Países", value: "190", icon: Globe2 },
  { label: "Antifraude", value: "24/7", icon: ShieldCheck },
];

export default function LandingStats() {
  return (
    <section className="mx-auto w-full max-w-5xl px-5 pb-4 sm:px-8">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {STATS.map(({ label, value, icon: Icon }) => (
          <div key={label} className="liquid rounded-2xl px-4 py-4">
            <Icon className="h-4 w-4 text-[#3b82f6]" />
            <p className="mt-2 font-heading text-2xl font-bold text-white">{value}</p>
            <p className="text-[10px] uppercase tracking-[0.14em] text-slate-400">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}