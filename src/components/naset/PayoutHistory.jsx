const STATUS = {
  pending: { label: "Pendiente", className: "text-amber-300 bg-amber-400/10 border-amber-400/30" },
  processing: { label: "En proceso", className: "text-sky-300 bg-sky-400/10 border-sky-400/30" },
  paid: { label: "Pagado", className: "text-emerald-300 bg-emerald-400/10 border-emerald-400/30" },
  rejected: { label: "Rechazado", className: "text-rose-300 bg-rose-400/10 border-rose-400/30" },
};

export default function PayoutHistory({ payouts = [] }) {
  return (
    <section className="panel rounded-3xl p-5 sm:p-7">
      <h2 className="font-heading text-lg font-bold text-white">Historial de retiros</h2>

      {payouts.length === 0 ? (
        <div className="mt-4 rounded-2xl border border-dashed border-white/12 bg-white/[0.02] px-6 py-8 text-center">
          <p className="text-sm text-slate-400">Todavía no has solicitado ningún pago.</p>
        </div>
      ) : (
        <ul className="mt-4 space-y-2.5">
          {payouts.map((payout) => {
            const status = STATUS[payout.status] ?? STATUS.pending;
            return (
              <li
                key={payout.id}
                className="flex items-center justify-between gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.02] px-4 py-3"
              >
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white">
                    ${Number(payout.amount).toFixed(2)} USD
                  </p>
                  <p className="truncate text-[11px] text-slate-500">
                    {payout.paypal_email}
                    {payout.requested_at
                      ? ` · ${new Date(payout.requested_at).toLocaleDateString("es-CO")}`
                      : ""}
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${status.className}`}
                >
                  {status.label}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}