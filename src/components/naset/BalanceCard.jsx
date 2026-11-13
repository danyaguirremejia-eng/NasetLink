import { useState } from "react";
import { toast } from "sonner";
import { Wallet, Loader2 } from "lucide-react";
import { MIN_PAYOUT } from "@/lib/levels";
import { requestPayout } from "@/lib/server-fns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function BalanceCard({ balance = 0, onRequested }) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const canWithdraw = balance >= MIN_PAYOUT;
  const missing = Math.max(0, MIN_PAYOUT - balance);

  const handleRequest = async (event) => {
    event.preventDefault();
    if (!canWithdraw || loading) return;
    setLoading(true);
    try {
      await requestPayout({ data: { paypal_email: email.trim() } });
      toast.success("Solicitud enviada. Revisaremos tu pago en 24-48 h.");
      setOpen(false);
      setEmail("");
      onRequested?.();
    } catch (error) {
      toast.error(error?.message || "No se pudo enviar la solicitud");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="panel rounded-3xl p-5 sm:p-7">
      <div className="flex items-center gap-2 text-slate-400">
        <Wallet className="h-4 w-4 text-[#3b82f6]" />
        <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em]">Saldo Disponible</h2>
      </div>

      <p className="mt-2 font-heading text-4xl font-bold text-white">
        ${Number(balance).toFixed(2)}
      </p>

      <button
        type="button"
        onClick={() => setOpen(true)}
        disabled={!canWithdraw}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#00f0ff] px-5 py-3.5 font-heading text-sm font-extrabold uppercase tracking-[0.12em] text-[#04141a] shadow-[0_0_36px_-10px_rgba(0,240,255,.9)] transition-all duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400 disabled:shadow-none"
      >
        Solicitar Pago por PayPal
      </button>

      {!canWithdraw && (
        <p className="mt-3 text-center text-xs text-amber-300/90">
          El retiro mínimo es de ${MIN_PAYOUT.toFixed(2)} USD. Te faltan ${missing.toFixed(2)}.
        </p>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="border-white/10 bg-[#0d1626] text-slate-100">
          <DialogHeader>
            <DialogTitle className="font-heading text-lg">Solicitar pago</DialogTitle>
            <DialogDescription className="text-slate-400">
              Se enviarán ${Number(balance).toFixed(2)} USD a tu cuenta de PayPal.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleRequest} className="space-y-4">
            <div className="rounded-2xl border border-white/10 bg-[#0a1322] px-4 py-3 focus-within:border-[#3b82f6]/70">
              <label
                htmlFor="paypal-email"
                className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500"
              >
                Correo de PayPal
              </label>
              <input
                id="paypal-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tucorreo@paypal.com"
                className="mt-1 w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-600"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#00f0ff] px-4 py-3 text-sm font-bold uppercase tracking-[0.12em] text-[#04141a] disabled:opacity-60"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              Enviar solicitud
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}