import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, ArrowRight } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAuth } from "@/lib/AuthContext";

const NAV = [
  { href: "#como-funciona", label: "Cómo funciona" },
  { href: "#calculadora", label: "Calculadora" },
  { href: "#pagos", label: "Pagos" },
  { href: "#faq", label: "FAQ" },
];

export default function LandingHeader() {
  const { isAuthenticated } = useAuth();
  const [open, setOpen] = useState(false);

  const cta = isAuthenticated
    ? { to: "/dashboard", label: "Ir a mi panel" }
    : { to: "/register", label: "Crear cuenta" };

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#070d1a]/85 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-5 py-3.5 sm:px-8">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#2563eb] to-[#3b82f6] shadow-[0_0_24px_-4px_rgba(59,130,246,.9)]">
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-white">
              <path
                d="M9.5 14.5 14.5 9.5M8 16l-1.2 1.2a3.4 3.4 0 1 1-4.8-4.8L5 9.4M16 8l1.2-1.2a3.4 3.4 0 1 1 4.8 4.8L19 14.6"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <span className="font-heading text-base font-bold tracking-[0.2em] text-white">
            NASET<span className="text-[#3b82f6]">LINK</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-xs font-semibold text-slate-300 transition-colors hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to={cta.to}
            className="hidden rounded-full bg-[#2563eb] px-4 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-white shadow-[0_10px_28px_-10px_rgba(37,99,235,.95)] transition-transform hover:-translate-y-0.5 sm:inline-flex"
          >
            {cta.label}
          </Link>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Abrir menú"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/[0.06] text-white transition-colors hover:bg-white/[0.12]"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="border-white/10 bg-[#0a1220] text-slate-100">
              <SheetHeader>
                <SheetTitle className="font-heading text-left text-lg text-white">Menú</SheetTitle>
              </SheetHeader>

              <div className="mt-6 flex flex-col gap-1">
                {NAV.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-3 py-3 text-sm font-semibold text-slate-200 transition-colors hover:bg-white/[0.06] hover:text-white"
                  >
                    {item.label}
                  </a>
                ))}
              </div>

              <div className="mt-6 space-y-2.5">
                <Link
                  to={cta.to}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#2563eb] px-4 py-3 text-sm font-bold uppercase tracking-[0.1em] text-white"
                >
                  {cta.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                {!isAuthenticated && (
                  <Link
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center rounded-xl border border-white/15 px-4 py-3 text-sm font-semibold text-slate-200"
                  >
                    Iniciar sesión
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}