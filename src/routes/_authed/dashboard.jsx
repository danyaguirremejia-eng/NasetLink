import { useState } from "react";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { toast } from "sonner";
import ShortenCard from "@/components/naset/ShortenCard";
import LinksTable from "@/components/naset/LinksTable";
import ShortLinkResult from "@/components/naset/ShortLinkResult";
import BalanceCard from "@/components/naset/BalanceCard";
import { createShortLink, getDashboard } from "@/lib/server-fns";

export const Route = createFileRoute("/_authed/dashboard")({
  head: () => ({
    meta: [
      { title: "Panel — NASETLINK" },
      {
        name: "description",
        content: "Acorta tus enlaces, comparte y gana dinero por cada visita completada.",
      },
    ],
  }),
  loader: () => getDashboard(),
  component: DashboardPage,
});

function DashboardPage() {
  const { links, balance } = Route.useLoaderData();
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [created, setCreated] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!url.trim() || loading) return;
    setLoading(true);
    try {
      const link = await createShortLink({ data: { url } });
      setCreated(link);
      setUrl("");
      await router.invalidate();
    } catch (error) {
      toast.error(error?.message || "No se pudo acortar el enlace");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async (link) => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/s/${link.short_code}`);
      toast.success("Enlace copiado");
    } catch {
      toast.error("No se pudo copiar el enlace");
    }
  };

  return (
    <div className="space-y-6">
      <ShortLinkResult link={created} />
      <ShortenCard url={url} onUrlChange={setUrl} onSubmit={handleSubmit} loading={loading} />
      <BalanceCard balance={balance} onRequested={() => router.invalidate()} />
      <LinksTable links={links} onCopy={handleCopy} />
    </div>
  );
}