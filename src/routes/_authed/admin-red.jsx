import { useState, useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { ArrowLeft, Users, Network } from "lucide-react";

export const Route = createFileRoute("/_authed/admin-red")({
  head: () => ({ meta: [{ title: "Red — Admin" }] }),
  component: AdminRedPage,
});

function AdminRedPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snap = await getDocs(collection(db, "users"));
        const list = [];
        snap.forEach(doc => list.push({ id: doc.id, ...doc.data() }));
        setUsers(list);
      } catch (error) { console.error(error); } finally { setLoading(false); }
    };
    fetchData();
  }, []);

  if (loading) return <div className="text-white text-center mt-10">Cargando...</div>;

  const referredUsers = users.filter(u => u.referredBy);

  return (
    <div className="space-y-6 pb-24">
      <button onClick={() => navigate({ to: "/admin" })} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium"><ArrowLeft className="w-4 h-4" /> Volver al Admin</button>
      <div><h1 className="text-3xl font-bold text-white mb-1 flex items-center gap-2"><Network className="w-7 h-7 text-blue-500" /> Red de Referidos</h1></div>
      <div className="bg-[#0F1523] border border-white/5 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-4 text-white font-bold border-b border-white/5 pb-2"><Users className="w-5 h-5 text-blue-500" /> Invitaciones</div>
        {referredUsers.length === 0 ? <p className="text-sm text-slate-500 text-center py-4">Aún no hay referidos.</p> : (
          <div className="space-y-3">
            {referredUsers.map(u => {
              const inviter = users.find(x => x.uid === u.referredBy || x.referralCode === u.referredBy);
              return (
                <div key={u.id} className="flex justify-between items-center bg-black/20 p-3 rounded-xl border border-white/5">
                  <div><p className="text-sm font-bold text-white">{u.displayName || "Usuario"}</p><p className="text-[10px] text-slate-500">Invitado por: <span className="text-blue-400">{inviter?.displayName || "Desconocido"}</span></p></div>
                  <span className="text-xs font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded">Activo</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
