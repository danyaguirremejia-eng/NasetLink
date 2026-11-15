import { useState, useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { db, auth } from "@/lib/firebase";
import { collection, getDocs, doc, updateDoc, addDoc, serverTimestamp, query, orderBy, onSnapshot } from "firebase/firestore";
import { toast } from "sonner";
import { ShieldAlert, Search, CheckCircle2, BadgeCheck, Star, Ban, Loader2, Megaphone, Send, Headphones, MessageSquare, Minus, Plus, DollarSign, Mail, Shield, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/_authed/admin")({
  head: () => ({ meta: [{ title: "Admin Panel — NASETLINK" }] }),
  component: AdminPage,
});

function AdminPage() {
  const navigate = useNavigate();
  
  const [myRole, setMyRole] = useState(null);
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [updating, setUpdating] = useState(null);

  const [annTitle, setAnnTitle] = useState("");
  const [annMessage, setAnnMessage] = useState("");
  const [annType, setAnnType] = useState("info");
  const [publishing, setPublishing] = useState(false);

  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");

  // REGLAS DE PODER:
  // Owner y Moderador tienen control total
  const isSuperStaff = myRole === 'owner' || myRole === 'moderator';
  // Admin solo puede gestionar usuarios y ver tickets
  const isStaff = myRole === 'owner' || myRole === 'moderator' || myRole === 'admin';

  useEffect(() => {
    if (!auth.currentUser) return;
    
    const unsub = onSnapshot(doc(db, "users", auth.currentUser.uid), (docSnap) => {
      if (docSnap.exists()) {
        const role = docSnap.data().role;
        setMyRole(role);
        
        if (role !== 'owner' && role !== 'admin' && role !== 'moderator') {
          toast.error("No tienes permiso para estar aquí");
          navigate({ to: "/dashboard" });
        } else {
          fetchData();
        }
      }
    });
    return () => unsub();
  }, [navigate]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const usersSnap = await getDocs(collection(db, "users"));
      const linksSnap = await getDocs(collection(db, "links"));
      const earningsMap = {};
      
      linksSnap.forEach((linkDoc) => {
        const data = linkDoc.data();
        if (data.userId) {
          earningsMap[data.userId] = (earningsMap[data.userId] || 0) + (data.earnings || 0);
        }
      });

      const uList = [];
      usersSnap.forEach((doc) => {
        const data = doc.data();
        uList.push({ 
          id: doc.id, 
          ...data, 
          totalEarnings: earningsMap[doc.id] || 0
        });
      });
      setUsers(uList);

      const q = query(collection(db, "tickets"), orderBy("createdAt", "desc"));
      const ticketsSnap = await getDocs(q);
      const tList = [];
      ticketsSnap.forEach(doc => tList.push({ id: doc.id, ...doc.data() }));
      setTickets(tList);

    } catch (error) {
      console.error("Error cargando datos:", error);
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
      toast.error("Error al actualizar");
    } finally {
      setUpdating(null);
    }
  };

  const handlePublishAnnouncement = async (e) => {
    e.preventDefault();
    if (!annTitle.trim() || !annMessage.trim()) return toast.error("Llena los campos");
    setPublishing(true);
    try {
      await addDoc(collection(db, "announcements"), {
        title: annTitle, message: annMessage, type: annType, createdAt: serverTimestamp()
      });
      toast.success("¡Anuncio publicado!");
      setAnnTitle(""); setAnnMessage(""); setAnnType("info");
    } catch (error) {
      toast.error("Error al publicar");
    } finally {
      setPublishing(false);
    }
  };

  const handleReplyTicket = async (ticketId) => {
    if (!replyText.trim()) return;
    try {
      await updateDoc(doc(db, "tickets", ticketId), {
        adminReply: replyText,
        status: "resolved"
      });
      setTickets(tickets.map(t => t.id === ticketId ? { ...t, adminReply: replyText, status: "resolved" } : t));
      setReplyingTo(null);
      setReplyText("");
      toast.success("Respuesta enviada");
    } catch (error) {
      toast.error("Error al responder");
    }
  };

  if (loading || !isStaff) {
    return <div className="text-center text-white mt-10 font-bold">Verificando permisos...</div>;
  }

  return (
    <div className="space-y-6 pb-24">
      <div className="flex items-center gap-3">
        <div className="bg-red-500/10 p-2.5 rounded-xl text-red-500">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-white leading-tight">Admin Panel</h1>
          <p className="text-sm text-slate-400 mt-1 flex items-center gap-1">
            Rol actual: 
            <span className={`font-bold uppercase flex items-center gap-1 ${myRole === 'owner' ? 'text-red-500' : myRole === 'moderator' ? 'text-purple-500' : 'text-blue-500'}`}>
              {myRole === 'owner' ? <ShieldCheck className="w-4 h-4" /> : <Shield className="w-4 h-4" />}
              {myRole}
            </span>
          </p>
        </div>
      </div>

      <div className={`grid ${isSuperStaff ? 'grid-cols-3' : 'grid-cols-2'} gap-2 bg-[#0F1523] p-1 rounded-xl border border-white/5`}>
        <button onClick={() => setActiveTab("users")} className={`py-2 text-xs font-bold rounded-lg transition ${activeTab === 'users' ? 'bg-red-500/20 text-red-400' : 'text-slate-400'}`}>Usuarios</button>
        
        {/* Solo Owner y Moderador ven la pestaña de Anuncios */}
        {isSuperStaff && (
          <button onClick={() => setActiveTab("announcements")} className={`py-2 text-xs font-bold rounded-lg transition ${activeTab === 'announcements' ? 'bg-blue-500/20 text-blue-400' : 'text-slate-400'}`}>Anuncios</button>
        )}
        
        <button onClick={() => setActiveTab("tickets")} className={`py-2 text-xs font-bold rounded-lg transition relative ${activeTab === 'tickets' ? 'bg-green-500/20 text-green-400' : 'text-slate-400'}`}>
          Soporte
          {tickets.filter(t => t.status === 'pending').length > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          )}
        </button>
      </div>

      {activeTab === "users" && (
        <>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input type="text" placeholder="Buscar por correo o nombre..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full bg-[#0F1523] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-slate-600 outline-none focus:border-red-500 transition-colors" />
          </div>
          <div className="space-y-3">
            {users.filter(u => (u.email || "").toLowerCase().includes(search.toLowerCase()) || (u.displayName || "").toLowerCase().includes(search.toLowerCase())).map((u) => (
              <div key={u.id} className="bg-[#0F1523] border border-white/5 rounded-2xl p-4 flex flex-col gap-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-bold text-white flex items-center gap-2">
                      {u.displayName || "Sin nombre"} 
                      {u.role === 'owner' && <ShieldCheck className="w-4 h-4 text-red-500" title="Owner" />}
                      {u.role === 'moderator' && <Shield className="w-4 h-4 text-purple-500" title="Moderador" />}
                      {u.role === 'admin' && <Shield className="w-4 h-4 text-blue-500" title="Admin" />}
                      {u.verified && <BadgeCheck className="w-4 h-4 text-blue-500" />} 
                      {u.role === 'influencer' && <Star className="w-4 h-4 text-yellow-500" />}
                    </p>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
                      <Mail className="w-3.5 h-3.5" /> {u.email || "Registrado con Google"}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-slate-300 bg-white/5 px-2 py-1 rounded-lg border border-white/10">Nivel {u.level || 1}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between bg-black/20 p-2 rounded-xl border border-white/5">
                  <div className="flex items-center gap-2 text-sm text-green-400 font-bold">
                    <DollarSign className="w-4 h-4" /> {u.totalEarnings.toFixed(2)} <span className="text-[10px] text-slate-500 font-normal">ganados</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${u.suspended ? 'bg-red-500/20 text-red-500' : 'bg-green-500/20 text-green-500'}`}>
                    {u.suspended ? 'SUSPENDIDO' : 'ACTIVO'}
                  </span>
                </div>

                {/* SELECTOR DE ROL (Owner y Moderador pueden usarlo) */}
                {isSuperStaff && u.id !== auth.currentUser?.uid && (
                  <div className="flex items-center gap-2 border-t border-white/5 pt-3">
                    <Shield className="w-4 h-4 text-slate-400" />
                    <select 
                      value={u.role || "user"} 
                      onChange={(e) => updateUser(u.id, { role: e.target.value })}
                      className="bg-black/30 border border-white/10 text-white text-xs rounded-lg p-2 outline-none focus:border-blue-500 w-full"
                    >
                      <option value="user">Quitar Rango (Usuario normal)</option>
                      <option value="admin">Admin (Básico)</option>
                      <option value="moderator">Moderador (Control Total)</option>
                      {/* Solo el Owner puede nombrar a otro Owner por seguridad */}
                      {myRole === 'owner' && <option value="owner">Owner (Dueño)</option>}
                    </select>
                  </div>
                )}

                <div className="flex flex-wrap gap-2 border-t border-white/5 pt-3">
                  <button onClick={() => updateUser(u.id, { verified: !u.verified })} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${u.verified ? 'bg-blue-500/20 text-blue-400' : 'bg-white/5 text-slate-400'}`}><BadgeCheck className="w-3.5 h-3.5" /> {u.verified ? 'Quitar Verif.' : 'Verificar'}</button>
                  <button onClick={() => updateUser(u.id, { role: u.role === 'influencer' ? 'user' : 'influencer' })} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${u.role === 'influencer' ? 'bg-yellow-500/20 text-yellow-500' : 'bg-white/5 text-slate-400'}`}><Star className="w-3.5 h-3.5" /> {u.role === 'influencer' ? 'Quitar Influ.' : 'Influencer'}</button>
                  
                  <button onClick={() => updateUser(u.id, { level: Math.max(1, (u.level || 1) - 1) })} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-white/5 text-slate-400 hover:bg-white/10 transition"><Minus className="w-3.5 h-3.5" /> -1 Nivel</button>
                  <button onClick={() => updateUser(u.id, { level: (u.level || 1) + 1 })} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-white/5 text-slate-400 hover:bg-white/10 transition"><Plus className="w-3.5 h-3.5" /> +1 Nivel</button>

                  <button onClick={() => updateUser(u.id, { suspended: !u.suspended })} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${u.suspended ? 'bg-red-500 text-white' : 'bg-red-500/10 text-red-500'}`}>{u.suspended ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Ban className="w-3.5 h-3.5" />}{u.suspended ? 'Reactivar' : 'Suspender'}</button>
                  {updating === u.id && <Loader2 className="w-4 h-4 animate-spin text-slate-400 ml-auto" />}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === "announcements" && isSuperStaff && (
        <div className="bg-[#0F1523] border border-blue-500/20 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Megaphone className="w-5 h-5 text-blue-500" />
            <h2 className="font-bold text-white">Publicar Anuncio</h2>
          </div>
          <form onSubmit={handlePublishAnnouncement} className="space-y-3">
            <input type="text" placeholder="Título del anuncio" value={annTitle} onChange={(e) => setAnnTitle(e.target.value)} className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-white text-sm outline-none focus:border-blue-500" />
            <textarea placeholder="Escribe el mensaje aquí..." value={annMessage} onChange={(e) => setAnnMessage(e.target.value)} rows={4} className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-white text-sm outline-none focus:border-blue-500 resize-none" />
            <div className="flex gap-2">
              {['info', 'success', 'warning'].map((t) => (
                <button key={t} type="button" onClick={() => setAnnType(t)} className={`flex-1 py-2 text-xs font-bold rounded-lg border transition ${annType === t ? 'bg-blue-600 border-blue-500 text-white' : 'border-white/10 text-slate-400 hover:bg-white/5'}`}>
                  {t === 'info' ? 'Azul' : t === 'success' ? 'Verde' : 'Amarillo'}
                </button>
              ))}
            </div>
            <button type="submit" disabled={publishing} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition disabled:opacity-50">
              <Send className="w-4 h-4" /> {publishing ? "Publicando..." : "Publicar Anuncio"}
            </button>
          </form>
        </div>
      )}

      {activeTab === "tickets" && (
        <div className="space-y-4">
          {tickets.length === 0 ? (
            <div className="bg-[#0F1523] border border-white/5 rounded-2xl p-8 text-center">
              <p className="text-sm text-slate-500">No hay tickets de soporte todavía.</p>
            </div>
          ) : (
            tickets.map(ticket => (
              <div key={ticket.id} className="bg-[#0F1523] border border-white/5 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-white text-sm">{ticket.subject}</h4>
                  <div className={`px-2 py-1 rounded-md text-[10px] font-bold ${ticket.status === 'resolved' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                    {ticket.status === 'resolved' ? 'RESUELTO' : 'PENDIENTE'}
                  </div>
                </div>
                <p className="text-xs text-slate-400 mb-2">De: <span className="text-slate-300 font-medium">{ticket.userEmail}</span></p>
                <p className="text-sm text-slate-300 mb-4">{ticket.message}</p>
                
                {ticket.adminReply ? (
                  <div className="bg-blue-500/5 border border-blue-500/10 rounded-xl p-3">
                    <p className="text-[10px] font-bold text-blue-500 mb-1">Tu respuesta:</p>
                    <p className="text-xs text-slate-300">{ticket.adminReply}</p>
                  </div>
                ) : replyingTo === ticket.id ? (
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Escribe la solución..." 
                      className="flex-1 bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-blue-500"
                    />
                    <button onClick={() => handleReplyTicket(ticket.id)} className="bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-lg">Enviar</button>
                  </div>
                ) : (
                  <button onClick={() => setReplyingTo(ticket.id)} className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 font-bold transition">
                    <MessageSquare className="w-3.5 h-3.5" /> Responder a este ticket
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      )}

    </div>
  );
}
