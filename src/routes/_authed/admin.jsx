import { useState, useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { db, auth } from "@/lib/firebase";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { toast } from "sonner";
import { ShieldAlert, Search, CheckCircle2, XCircle, BadgeCheck, Star, Ban, Loader2 } from "lucide-react";

export const Route = createFileRoute("/_authed/admin")({
  head: () => ({ meta: [{ title: "Admin Panel — NASETLINK" }] }),
  component: AdminPage,
});

// PON TU CORREO DE ADMINISTRADOR AQUÍ
const ADMIN_EMAILS = ["danyxiter67@gmail.com", "tu-correo@gmail.com"]; 

function AdminPage() {
  const { user } = Route.useRouteContext();
  const navigate = useNavigate();
  
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [updating, setUpdating] = useState(null);

  // Verificar si es admin
  const isAdmin = user && ADMIN_EMAILS.includes(user.email);

  useEffect(() => {
    if (!isAdmin) {
      toast.error("No tienes permiso para estar aquí");
      navigate({ to: "/dashboard" });
      return;
    }
    fetchUsers();
  }, [user, isAdmin]);

  const fetchUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const fetchedUsers = [];
      querySnapshot.forEach((doc) => {
        fetchedUsers.push({ id: doc.id, ...doc.data() });
      });
      setUsers(fetchedUsers);
    } catch (error) {
      console.error("Error cargando usuarios:", error);
      toast.error("Error al cargar la lista de usuarios");
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (uid, data) => {
    setUpdating(uid);
    try {
      await updateDoc(doc(db, "users", uid), data);
      setUsers(users.map(u => u.id === uid ? { ...u, ...data } : u));
      toast.success("Usuario actualizado");
    } catch (error) {
      console.error(error);
      toast.error("Error al actualizar");
    } finally {
      setUpdating(null);
    }
  };

  const filteredUsers = users.filter(u => 
    (u.email || "").toLowerCase().includes(search.toLowerCase()) || 
    (u.displayName || "").toLowerCase().includes(search.toLowerCase()) ||
    u.id.includes(search)
  );

  if (loading || !isAdmin) {
    return <div className="text-center text-white mt-10 font-bold">Verificando permisos...</div>;
  }

  return (
    <div className="space-y-6 pb-24">
      
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="bg-red-500/10 p-2.5 rounded-xl text-red-500">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-white leading-tight">Panel de Administrador</h1>
          <p className="text-sm text-slate-400 mt-1">Gestiona usuarios, niveles y verificaciones.</p>
        </div>
      </div>

      {/* Buscador */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
        <input
          type="text"
          placeholder="Buscar por correo, nombre o UID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#0F1523] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-slate-600 outline-none focus:border-blue-500 transition-colors"
        />
      </div>

      {/* Lista de Usuarios */}
      <div className="space-y-3">
        {filteredUsers.map((u) => (
          <div key={u.id} className="bg-[#0F1523] border border-white/5 rounded-2xl p-4 flex flex-col gap-4">
            
            {/* Info del usuario */}
            <div className="flex items-start justify-between">
              <div>
                <p className="font-bold text-white flex items-center gap-2">
                  {u.displayName || "Sin nombre"}
                  {u.verified && <BadgeCheck className="w-4 h-4 text-blue-500" />}
                  {u.role === 'influencer' && <Star className="w-4 h-4 text-yellow-500" />}
                </p>
                <p className="text-xs text-slate-400">{u.email || "Sin correo"}</p>
                <p className="text-[10px] text-slate-600 font-mono mt-1">UID: {u.id}</p>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-slate-300 bg-white/5 px-2 py-1 rounded-lg">
                  Nivel {u.level || 1}
                </span>
                <span className={`block text-[10px] mt-2 font-bold ${u.suspended ? 'text-red-500' : 'text-green-500'}`}>
                  {u.suspended ? 'SUSPENDIDO' : 'ACTIVO'}
                </span>
              </div>
            </div>

            {/* Acciones */}
            <div className="flex flex-wrap gap-2 border-t border-white/5 pt-3">
              
              {/* Verificar */}
              <button 
                onClick={() => updateUser(u.id, { verified: !u.verified })}
                disabled={updating === u.id}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${u.verified ? 'bg-blue-500/20 text-blue-400' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}
              >
                <BadgeCheck className="w-3.5 h-3.5" /> {u.verified ? 'Quitar Verif.' : 'Verificar'}
              </button>

              {/* Influencer */}
              <button 
                onClick={() => updateUser(u.id, { role: u.role === 'influencer' ? 'user' : 'influencer' })}
                disabled={updating === u.id}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${u.role === 'influencer' ? 'bg-yellow-500/20 text-yellow-500' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}
              >
                <Star className="w-3.5 h-3.5" /> {u.role === 'influencer' ? 'Quitar Influ.' : 'Influencer'}
              </button>

              {/* Dar Nivel */}
              <button 
                onClick={() => updateUser(u.id, { level: (u.level || 1) + 1 })}
                disabled={updating === u.id}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-white/5 text-slate-400 hover:bg-white/10 transition"
              >
                <Star className="w-3.5 h-3.5" /> +1 Nivel
              </button>

              {/* Suspender */}
              <button 
                onClick={() => updateUser(u.id, { suspended: !u.suspended })}
                disabled={updating === u.id}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${u.suspended ? 'bg-red-500 text-white' : 'bg-red-500/10 text-red-500 hover:bg-red-500/20'}`}
              >
                {u.suspended ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Ban className="w-3.5 h-3.5" />}
                {u.suspended ? 'Reactivar' : 'Suspender'}
              </button>

              {updating === u.id && <Loader2 className="w-4 h-4 animate-spin text-slate-400 ml-auto" />}
            </div>
          </div>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-slate-500 text-sm py-10">No se encontraron usuarios.</div>
        )}
      </div>
    </div>
  );
}
