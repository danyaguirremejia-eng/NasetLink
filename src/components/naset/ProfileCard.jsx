import { LogOut, Mail, ShieldCheck, TrendingUp, MousePointerClick, Link2 } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { CURRENT_LEVEL, RANK } from "@/lib/levels";

export default function ProfileCard({ stats }) {
  const { user, logout } = useAuth();
  const email = user?.email ?? "";
  const initial = email.charAt(0).toUpperCase() || "N";

  const metrics = [
    { label: "Enlaces", value: stats?.links?.length ?? 0, icon: Link2 },
    { label: "Clics", value: stats?.totalClicks ?? 0, icon: MousePointerClick },
    {
      label: "Ganado",
      value: `$${Number(stats?.totalEarnings ?? 0).toFixed(3)}`,
      icon: TrendingUp,
    },
  ];

  return (
    <div className="space-y-6">
      <section className="panel rounded-3xl p-5 sm:p-7">
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#3b82f6] to-[#00f0ff] font-heading text-xl font-bold text-[#04141a]">
            {initial}
          </span>
          <div className="min-w-0">
            <p className="truncate font-heading text-lg font-bold text-white">
              {user?.full_name || "Mi cuenta"}
            </p>
            <p className="flex items-center gap-1.5 truncate text-xs text-slate-400">
              <Mail className="h-3.5 w-3.5 shrink-0" />
              {email}
            </p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <span className="rounded-full border border-[#00f0ff]/35 bg-[#00f0ff]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#00f0ff]">
            Nivel {CURRENT_LEVEL.level}
          </span>
          <span className="rounded-full border border-white/12 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-300">
            {RANK.icon} {RANK.name}
          </span>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-2.5">
          {metrics.map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.03] px-3 py-3 text-center"
            >
              <Icon className="mx-auto mb-1.5 h-4 w-4 text-[#3b82f6]" />
              <p className="font-heading text-base font-bold text-white">{value}</p>
              <p className="text-[10px] uppercase tracking-[0.12em] text-slate-500">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="panel flex items-center gap-3 rounded-3xl px-5 py-4">
        <ShieldCheck className="h-5 w-5 shrink-0 text-emerald-400" />
        <p className="text-xs leading-relaxed text-slate-400">
          Tu cuenta está protegida. Los pagos se envían únicamente al correo de PayPal que indiques al
          solicitar el retiro.
        </p>
      </section>

      <button
        type="button"
        onClick={logout}
        className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/12 bg-white/[0.04] px-5 py-3.5 text-sm font-semibold text-slate-200 transition-colors hover:border-rose-400/40 hover:text-rose-300"
      >
        <LogOut className="h-4 w-4" />
        Cerrar sesión
      </button>
    </div>
  );
}