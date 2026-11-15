import { useState, useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { ArrowLeft, User, DollarSign, Link as LinkIcon } from "lucide-react";

export const Route = createFileRoute("/_authed/admin-creadores")({
  head: () => ({ meta: [{ title: "Creadores — Admin" }] }),
  component: AdminCreadoresPage,
});

function AdminCreadoresPage() {
  const navigate = useNavigate();
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersSnap = await getDocs(collection(db, "users"));
        const linksSnap = await getDocs(collection(db, "links"));
        const earningsMap = {};
        const linksCount = {};
        linksSnap.forEach(l => {
          const d = l.data();
          if (d.userId) {
            earningsMap[d.userId] = (earningsMap[d.userId] || 0) + (d.earnings || 0);
            linksCount[d.userId] = (linksCount[d.userId] || 0) + 1;
          }
        });
        const list = [];
        usersSnap.forEach(doc => {
          const data = doc.data();
          list.push({ id: doc.id, ...data, totalEarnings: earningsMap[doc.id] || 0, totalLinks: linksCount[doc.id] || 0 });
        });
        list.sort((a, b) => b.totalEarnings - a.totalEarnings);
        setCreators(list);
      } catch (error) { console.error(error); } finally { setLoading(false); }
    };
    fetchData();
  }, []);

  if (loading) return <div className="text-white text-center mt-10">Cargando...</div>;

  return (
    <div className="space-y-6 pb-24">
      <button onClick={() => navigate({ to: "/admin" })} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium"><ArrowLeft className="w-4 h-4" /> Volver al Admin</button>
      <div><h1 className="text-3xl font-bold text-white mb-1 flex items-center gap-2"><User className="w-7 h-7 text-yellow-500" /> Top Creadores</h1></div>
      <div className="space-y-3">
        {creators.map((c, index) => (
          <div key={c.id} className="bg-[#0F1523] border border-white/5 rounded-2xl p-4 flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-xs font-bold text-slate-400 shrink-0">#{index + 1}</div>
            <div className="flex-1"><p className="font-bold text-white">{c.displayName || "Creador"}</p><p className="text-xs text-slate-500">{c.email || "Google"}</p></div>
            <div className="text-right">
              <p className="text-sm font-bold text-green-400 flex items-center gap-1 justify-end"><DollarSign className="w-3 h-3"/> {c.totalEarnings.toFixed(2)}</p>
              <p className="text-[10px] text-slate-500 flex items-center gap-1 justify-end"><LinkIcon className="w-3 h-3"/> {c.totalLinks} enlaces</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
