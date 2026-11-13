import { Link, useLocation } from "@tanstack/react-router";
import { Home, Wallet, Banknote, User, KeyRound } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";

const items = [
  { to: "/dashboard", label: "Inicio", icon: Home },
  { to: "/ganancias", label: "Ganancias", icon: Wallet },
  { to: "/retiros", label: "Retiros", icon: Banknote },
  { to: "/perfil", label: "Perfil", icon: User },
];

const adminItem = { to: "/keys", label: "Keys", icon: KeyRound };

export default function BottomNav() {
  const { pathname } = useLocation();
  const { user } = useAuth();
  const links = user?.role === "admin" ? [...items, adminItem] : items;

  return (
    <nav className="fixed inset-x-0 bottom-4 z-40 flex justify-center px-4">
      <div className="liquid flex w-full max-w-md items-center justify-between gap-1 rounded-full p-1.5">
        {links.map(({ to, label, icon: Icon }) => {
          const active = to === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(to);
          return (
            <Link
              key={to}
              to={to}
              className={[
                "flex flex-1 flex-col items-center gap-1 rounded-full px-2 py-2 text-[10px] font-semibold tracking-wide transition-colors",
                active
                  ? "bg-[#00f0ff]/15 text-[#00f0ff]"
                  : "text-slate-300/80 hover:text-white",
              ].join(" ")}
            >
              <Icon className="h-[18px] w-[18px]" strokeWidth={2.2} />
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}