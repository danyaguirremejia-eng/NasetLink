import { Link } from "@tanstack/react-router";

export function RegisterShell({ title, subtitle, children, footer }) {
  return (
    <div className="naset-bg relative min-h-screen text-foreground">
      <div className="grid-lines pointer-events-none absolute inset-0" aria-hidden="true" />
      <main className="relative mx-auto flex min-h-screen w-full max-w-lg flex-col px-4 py-8 sm:py-12">
        <Link to="/" className="mx-auto mb-8 flex items-center gap-2.5" aria-label="NASETLINK, ir al inicio">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#2563eb] to-[#3b82f6] shadow-[0_0_24px_-4px_rgba(59,130,246,.9)]">
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-white" aria-hidden="true">
              <path
                d="M9.5 14.5 14.5 9.5M8 16l-1.2 1.2a3.4 3.4 0 1 1-4.8-4.8L5 9.4M16 8l1.2-1.2a3.4 3.4 0 1 1 4.8 4.8L19 14.6"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <span className="font-heading text-lg font-bold tracking-[0.2em] text-white">
            NASET<span className="text-primary">LINK</span>
          </span>
        </Link>

        <div className="mb-6 text-center">
          <h1 className="font-heading text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h1>
          {subtitle && <p className="mt-2 text-pretty text-sm text-muted-foreground sm:text-base">{subtitle}</p>}
        </div>

        <div className="panel rounded-2xl p-5 sm:p-8">{children}</div>

        {footer && <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div>}
      </main>
    </div>
  );
}
