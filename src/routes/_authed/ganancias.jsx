import { createFileRoute } from "@tanstack/react-router";
import LevelsTable from "@/components/naset/LevelsTable";

export const Route = createFileRoute("/_authed/ganancias")({
  head: () => ({
    meta: [
      { title: "Pagos y niveles — NASETLINK" },
      { name: "description", content: "Tabla de pagos por cada 1000 clics según el nivel de anuncios." },
    ],
  }),
  component: EarningsPage,
});

function EarningsPage() {
  return (
    <div className="space-y-6">
      <LevelsTable />
    </div>
  );
}