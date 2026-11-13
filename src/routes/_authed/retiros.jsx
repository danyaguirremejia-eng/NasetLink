import { createFileRoute, useRouter } from "@tanstack/react-router";
import BalanceCard from "@/components/naset/BalanceCard";
import PayoutHistory from "@/components/naset/PayoutHistory";
import { getDashboard } from "@/lib/server-fns";

export const Route = createFileRoute("/_authed/retiros")({
  head: () => ({
    meta: [
      { title: "Retiros — NASETLINK" },
      { name: "description", content: "Consulta tu saldo disponible y solicita pagos por PayPal." },
    ],
  }),
  loader: () => getDashboard(),
  component: WithdrawalsPage,
});

function WithdrawalsPage() {
  const { balance, payouts } = Route.useLoaderData();
  const router = useRouter();

  return (
    <div className="space-y-6">
      <BalanceCard balance={balance} onRequested={() => router.invalidate()} />
      <PayoutHistory payouts={payouts} />
    </div>
  );
}