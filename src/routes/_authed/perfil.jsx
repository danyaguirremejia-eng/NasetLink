import { createFileRoute } from "@tanstack/react-router";
import ProfileCard from "@/components/naset/ProfileCard";
import { getDashboard } from "@/lib/server-fns";

export const Route = createFileRoute("/_authed/perfil")({
  head: () => ({
    meta: [
      { title: "Mi Perfil — NASETLINK" },
      { name: "description", content: "Revisa tu cuenta, tu nivel y tus estadísticas." },
    ],
  }),
  loader: () => getDashboard(),
  component: ProfilePage,
});

function ProfilePage() {
  const stats = Route.useLoaderData();
  return <ProfileCard stats={stats} />;
}