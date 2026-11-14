import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import ProfileCard from "@/components/naset/ProfileCard";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { toast } from "sonner";

export const Route = createFileRoute("/_authed/perfil")({
  head: () => ({
    meta: [
      { title: "Mi Perfil — NASETLINK" },
      { name: "description", content: "Revisa tu cuenta, tu nivel y tus estadísticas." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const { user } = Route.useRouteContext();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    
    const fetchStats = async () => {
      try {
        const q = query(collection(db, "links"), where("userId", "==", user.uid));
        const snap = await getDocs(q);
        let tClicks = 0;
        let tEarnings = 0;
        
        snap.forEach((doc) => {
          const data = doc.data();
          tClicks += data.clicks || 0;
          tEarnings += data.earnings || 0;
        });

        setStats({ 
          totalClicks: tClicks, 
          totalEarnings: tEarnings, 
          balance: tEarnings, 
          links: snap.docs.map(d => d.data()) 
        });
      } catch (error) {
        toast.error("Error cargando estadísticas");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user]);

  if (loading) return <div className="text-center text-white mt-10">Cargando perfil...</div>;

  return <ProfileCard stats={stats} />;
}
