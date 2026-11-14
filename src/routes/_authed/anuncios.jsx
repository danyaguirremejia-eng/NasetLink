import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { CheckCircle2, AlertTriangle, Info } from "lucide-react";

export const Route = createFileRoute("/_authed/anuncios")({
  head: () => ({ meta: [{ title: "Anuncios — NASETLINK" }] }),
  component: AnunciosPage,
});

function AnunciosPage() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const q = query(collection(db, "announcements"), orderBy("createdAt", "desc"));
        const snap = await getDocs(q);
        const fetched = [];
        snap.forEach(doc => fetched.push({ id: doc.id, ...doc.data() }));
        setAnnouncements(fetched);
      } catch (error) {
        console.error("Error cargando anuncios:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnnouncements();
  }, []);

  if (loading) return <div className="text-center text-white mt-10 font-bold">Cargando anuncios...</div>;

  const getStyle = (type) => {
    switch (type) {
      case "success": return { icon: CheckCircle2, color: "text-green-500", bg: "bg-green-500/10", border: "border-green-500/20" };
      case "warning": return { icon: AlertTriangle, color: "text-yellow-500", bg: "bg-yellow-500/10", border: "border-yellow-500/20" };
      default: return { icon: Info, color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" };
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "";
    const date = timestamp.toDate();
    return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  return (
    <div className="space-y-6 pb-24">
      <div>
        <h1 className="text-3xl font-bold text-white mb-1">Anuncios</h1>
        <p className="text-sm text-slate-400">Novedades y comunicados del equipo NASETLINK.</p>
      </div>

      <div className="space-y-4">
        {announcements.length === 0 ? (
          <div className="bg-[#0F1523] border border-white/5 rounded-2xl p-8 text-center">
            <p className="text-sm text-slate-500">No hay anuncios por ahora.</p>
          </div>
        ) : (
          announcements.map((ann) => {
            const style = getStyle(ann.type);
            const Icon = style.icon;
            return (
              <div key={ann.id} className={`bg-[#0F1523] border ${style.border} rounded-2xl p-5`}>
                <div className="flex items-start gap-4">
                  <div className={`${style.bg} ${style.color} p-2.5 rounded-xl shrink-0`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-bold text-white leading-tight text-lg">{ann.title}</h3>
                      <span className="text-[10px] text-slate-500 shrink-0 font-mono mt-1">{formatDate(ann.createdAt)}</span>
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">{ann.message}</p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
