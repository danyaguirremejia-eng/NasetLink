import { useState, useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { db } from "@/lib/firebase";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { toast } from "sonner";
import { ArrowLeft, ShieldAlert, Search } from "lucide-react";

export const Route = createFileRoute("/_authed/admin-fraude")({
  head: () => ({ meta: [{ title: "Fraude — Admin" }] }),
  component: AdminFraudePage,
});

function AdminFraudePage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const snap = await getDocs(collection(db, "users"));
        const list = [];
        snap.forEach(doc => list.push({ id: doc.id, ...doc.data() }));
        setUsers(list);
      } catch (error) { console.error(error); } finally { setLoading(false); }
    };
    fetchUsers();
  }, []);

  const toggleSuspend = async (id, currentStatus) => {
    if(!confirm("¿Cambiar estado de suspensión de este usuario?")) return;
    try {
      await updateDoc(doc(db, "users", id), { suspended: !currentStatus });
      setUsers(users.map(u => u.id === id ? { ...u, suspended: !currentStatus } : u));
      toast.success(currentStatus ? "Usuario reactivado" : "Usuario suspendido");
    } catch (error) { toast.error("Error al actualizar"); }
  };

  if (loading) return <div className="text-white text-center mt-10">Cargando...</div>;

  return (
    <div className="space-y-6 pb-24">
      <button onClick={() => navigate({ to: "/admin" })} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium"><ArrowLeft className="w-4 h-4" /> Volver al Admin</button>
      <div><h1 className="text-3xl font-bold text-white mb-1 flex items-center gap-2"><ShieldAlert className="w-7 h-7 text-red-500" /> Control de Fraude</h1></div>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
        <input type="text" placeholder="Buscar usuario..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full bg-[#0F1523] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white outline-none focus:border-red-500" />
      </div>
      <div className="space-y-3">
        {users.filter(u => (u.email || "").toLowerCase().includes(search.toLowerCase())).map(u => (
          <div key={u.id} className="bg-[#0F1523] border border-white/5 rounded-2xl p-4 flex justify-between items-center">
            <div><p className="font-bold text-white">{u.displayName || "Sin nombre"}</p><p className="text-xs text-slate-400">{u.email}</p></div>
            <button onClick={() => toggleSuspend(u.id, u.suspended)} className={`px-4 py-2 rounded-lg text-xs font-bold transition ${u.suspended ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>{u.suspended ? "Reactivar" : "Suspender"}</button>
          </div>
        ))}
      </div>
    </div>
  );
}
