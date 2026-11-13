import { createFileRoute } from "@tanstack/react-router";
import LandingHeader from "@/components/landing/LandingHeader";
import LandingHero from "@/components/landing/LandingHero";
import LandingStats from "@/components/landing/LandingStats";
import LandingHowItWorks from "@/components/landing/LandingHowItWorks";
import EarningsCalculator from "@/components/landing/EarningsCalculator";
import LandingFeatures from "@/components/landing/LandingFeatures";
import LandingPayoutTable from "@/components/landing/LandingPayoutTable";
import LandingPaymentMethods from "@/components/landing/LandingPaymentMethods";
import LandingFaq from "@/components/landing/LandingFaq";
import LandingFooter from "@/components/landing/LandingFooter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NASETLINK — Monetiza tus enlaces como un profesional" },
      {
        name: "description",
        content:
          "Acorta enlaces, compártelos y gana dinero por cada visita válida. Calcula tus ganancias y cobra por PayPal, cripto o transferencia.",
      },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="naset-bg relative min-h-screen overflow-x-hidden text-slate-100">
      <div className="pointer-events-none fixed inset-0 grid-lines" />

      <div className="relative">
        <LandingHeader />
        <main>
          <LandingHero />
          <LandingStats />
          <LandingHowItWorks />
          <EarningsCalculator />
          <LandingFeatures />
          <LandingPayoutTable />
          <LandingPaymentMethods />
          <LandingFaq />
        </main>
        <LandingFooter />
      </div>
    </div>
  );
}