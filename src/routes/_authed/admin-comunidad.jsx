import { useState, useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, getDocs, deleteDoc, doc } from "firebase/firestore";
import { toast } from "sonner";
import { ArrowLeft, MessageSquare, Lightbulb, Trash2, Users } from "lucide-react";

export const Route = createFileRoute("/_authed/admin-comunidad")({
  head: () => ({ meta: [{ title: "Comunidad — Admin" }] }),
  component: AdminComunidadPage,
});

function AdminComunidadPage() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mq = query(collection(db, "chat_global"), orderBy("createdAt", "desc"));
        const mSnap = await getDocs(mq);
        const mList = [];
        mSnap.forEach(doc => mList.push({ id: doc.id, ...doc.data() }));
        setMessages(mList);

        const iq = query(collection(db, "suggestions"), orderBy("createdAt", "desc"));
        const iSnap = await getDocs(iq);
        const iList = [];
        iSnap.forEach(doc => iList.push({ id: doc.id, ...doc.data() }));
        setIdeas(iList);
      } catch (error) { console.error(error); } finally { setLoading(false); }
    };
    fetchData();
  }, []);

  const handleDeleteMessage = async (id) => {
    if(!confirm("¿Borrar este mensaje?")) return;
    try { await deleteDoc(doc(db, "chat_global", id)); setMessages(messages.filter(m => m.id !== id)); toast.success("Mensaje eliminado"); } catch (error) { toast.error("Error"); }
  };

  const handleDeleteIdea = async (id) => {
    if(!confirm("¿Borrar esta idea?")) return;
    try { await deleteDoc(doc(db, "suggestions", id)); setIdeas(ideas.filter(i => i.id !== id)); toast.success("Idea eliminada"); } catch (error) { toast.error("Error"); }
  };

  if (loading) return <div className="text-white text-center mt-10">Cargando...</div>;

  return (
    <div className="space-y-6 pb-24">
      <button onClick={() => navigate({ to: "/admin" })} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium"><ArrowLeft className="w-4 h-4" /> Volver al Admin</button>
      <div><h1 className="text-3xl font-bold text-white mb-1 flex items-center gap-2"><Users className="w-7 h-7 text-purple-500" /> Comunidad</h1></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#0F1523] border border-white/5 rounded-2xl p-5">
          <h3 className="font-bold text-white flex items-center gap-2 mb-4 border-b border-white/5 pb-2"><MessageSquare className="w-5 h-5 text-blue-500" /> Chat Global</h3>
          <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
            {messages.length === 0 ? <p className="text-xs text-slate-500">No hay mensajes.</p> : messages.map(msg => (
              <div key={msg.id} className="bg-black/20 p-3 rounded-xl border border-white/5 flex justify-between items-start">
                <div><p className="text-xs font-bold text-slate-300">{msg.userName}</p><p className="text-sm text-slate-400 mt-1">{msg.text}</p></div>
                <button onClick={() => handleDeleteMessage(msg.id)} className="text-red-500 p-1 hover:bg-red-500/10 rounded"><Trash2 className="w-4 h-4" /></button>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-[#0F1523] border border-white/5 rounded-2xl p-5">
          <h3 className="font-bold text-white flex items-center gap-2 mb-4 border-b border-white/5 pb-2"><Lightbulb className="w-5 h-5 text-yellow-500" /> Muro de Ideas</h3>
          <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
            {ideas.length === 0 ? <p className="text-xs text-slate-500">No hay ideas.</p> : ideas.map(idea => (
              <div key={idea.id} className="bg-black/20 p-3 rounded-xl border border-white/5 flex justify-between items-start">
                <div><p className="text-xs font-bold text-slate-300">{idea.userName} ({idea.votes} votos)</p><p className="text-sm text-slate-400 mt-1">{idea.idea}</p></div>
                <button onClick={() => handleDeleteIdea(idea.id)} className="text-red-500 p-1 hover:bg-red-500/10 rounded"><Trash2 className="w-4 h-4" /></button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
