import { Link, createFileRoute } from "@tanstack/react-router";
import DownloadCard from "@/components/naset/DownloadCard";
import { getLinkByCode } from "@/lib/server-fns";

export const Route = createFileRoute("/s/$code")({
  head: () => ({
    meta: [
      { title: "Preparando tu descarga — NASETLINK" },
      { name: "description", content: "Espera unos segundos y continúa a tu descarga." },
    ],
  }),
  loader: async ({ params }) => {
    if (!/^[a-zA-Z0-9]{4,24}$/.test(params.code)) return null;
    return getLinkByCode({ data: { code: params.code } });
  },
  component: DownloadPage,
});

function DownloadPage() {
  const link = Route.useLoaderData();

  return (
    <div className="naset-bg flex min-h-screen flex-col items-center justify-center px-4 py-10">
      <div className="pointer-events-none fixed inset-0 grid-lines" />

      <div className="relative w-full max-w-md">
        <div className="mb-6 flex items-center justify-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#3b82f6] to-[#00f0ff]">
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-[#04141a]">
              <path
                d="M9.5 14.5 14.5 9.5M8 16l-1.2 1.2a3.4 3.4 0 1 1-4.8-4.8L5 9.4M16 8l1.2-1.2a3.4 3.4 0 1 1 4.8 4.8L19 14.6"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <span className="font-heading text-base font-bold tracking-[0.22em] text-white">
            NASET<span className="text-[#00f0ff]">LINK</span>
          </span>
        </div>

        {link ? (
          <DownloadCard link={link} />
        ) : (
          <div className="panel rounded-3xl p-8 text-center">
            <h1 className="font-heading text-xl font-bold text-white">Este enlace no existe</h1>
            <p className="mt-2 text-sm text-slate-400">
              Puede haber expirado o estar mal escrito. Revisa la dirección e inténtalo de nuevo.
            </p>
            <Link
              to="/"
              className="mt-5 inline-flex items-center justify-center rounded-full bg-[#00f0ff] px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-[#04141a]"
            >
              Ir a NASETLINK
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}