import { useState } from "react";
import { Link, createFileRoute, useRouter } from "@tanstack/react-router";
import { ShieldAlert } from "lucide-react";
import { toast } from "sonner";
import ApiHint from "@/components/license/ApiHint";
import KeyGeneratorForm from "@/components/license/KeyGeneratorForm";
import KeysTable from "@/components/license/KeysTable";
import NewKeyCard from "@/components/license/NewKeyCard";
import { createLicenseKey, listLicenseKeys } from "@/lib/license-fns";

export const Route = createFileRoute("/_authed/keys")({
  head: () => ({
    meta: [
      { title: "Panel de Keys — NASETLINK" },
      { name: "description", content: "Genera y administra licencias para tus aplicaciones." },
    ],
  }),
  loader: () => listLicenseKeys(),
  component: KeysPage,
});

function KeysPage() {
  const { keys, forbidden } = Route.useLoaderData();
  const router = useRouter();
  const [created, setCreated] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCreate = async (payload) => {
    if (loading) return false;
    setLoading(true);
    try {
      const license = await createLicenseKey({ data: payload });
      setCreated(license);
      await router.invalidate();
      toast.success("Key creada correctamente");
      return true;
    } catch (error) {
      toast.error(error?.message || "No se pudo crear la Key");
      return false;
    } finally {
      setLoading(false);
    }
  };

  if (forbidden) {
    return (
      <div className="panel rounded-3xl p-8 text-center">
        <ShieldAlert className="mx-auto h-8 w-8 text-amber-300" />
        <h1 className="mt-3 font-heading text-lg font-bold text-white">Área de administrador</h1>
        <p className="mt-2 text-sm text-slate-400">
          Tu cuenta no tiene permisos para generar Keys.
        </p>
        <Link
          to="/dashboard"
          className="mt-5 inline-flex items-center justify-center rounded-full bg-[#00f0ff] px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-[#04141a]"
        >
          Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h1 className="font-heading text-2xl font-bold text-white">Panel de Keys</h1>
          <p className="mt-1 text-xs text-slate-400">
            Genera licencias y comparte su enlace único de entrega.
          </p>
        </div>
        <span className="rounded-full border border-[#00f0ff]/35 bg-[#00f0ff]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#00f0ff]">
          Admin
        </span>
      </header>

      {created && <NewKeyCard license={created} />}

      <KeyGeneratorForm onCreate={handleCreate} loading={loading} />

      <KeysTable keys={keys} />

      <ApiHint />
    </div>
  );
}