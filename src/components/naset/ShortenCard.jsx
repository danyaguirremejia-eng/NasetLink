import { Link2, Loader2 } from "lucide-react";

export default function ShortenCard({ url, onUrlChange, onSubmit, loading }) {
  return (
    <section className="panel rounded-3xl p-5 sm:p-7">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
          Acortar enlace
        </h2>
        <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#00f0ff]/80">
          $1.00 / 1000 clics
        </span>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="rounded-2xl border border-white/10 bg-[#0a1322] px-4 py-3 transition-colors focus-within:border-[#3b82f6]/70 focus-within:shadow-[0_0_0_3px_rgba(59,130,246,.16)]">
          <label htmlFor="long-url" className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
            Pega tu enlace largo
          </label>
          <input
            id="long-url"
            type="text"
            inputMode="url"
            autoComplete="off"
            placeholder="Pega tu link de MediaFire…"
            value={url}
            onChange={(e) => onUrlChange(e.target.value)}
            className="mt-1 w-full bg-transparent font-body text-sm text-white outline-none placeholder:text-slate-600"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="group relative flex w-full items-center justify-center gap-2.5 rounded-2xl bg-[#00f0ff] px-6 py-4 font-heading text-sm font-extrabold uppercase tracking-[0.16em] text-[#04141a] shadow-[0_0_44px_-8px_rgba(0,240,255,.85)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_60px_-6px_rgba(0,240,255,.95)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" strokeWidth={2.6} />
          ) : (
            <Link2 className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" strokeWidth={2.8} />
          )}
          {loading ? "Generando…" : "Acortar y ganar"}
        </button>
      </form>
    </section>
  );
}