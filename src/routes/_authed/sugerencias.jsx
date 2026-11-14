import { useState, useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { db, auth } from "@/lib/firebase";
import { collection, query, orderBy, getDocs, addDoc, updateDoc, doc, serverTimestamp, increment } from "firebase/firestore";
import { toast } from "sonner";
import { ArrowLeft, Lightbulb, Send, Clock, Flame, MessageSquare, CheckCircle2, ChevronDown, User } from "lucide-react";

export const Route = createFileRoute("/_authed/sugerencias")({
  head: () => ({ meta: [{ title: "Muro de ideas — NASETLINK" }] }),
  component: SugerenciasPage,
});

const ADMIN_EMAILS = ["danyxiter67@gmail.com"];

function SugerenciasPage() {
  const { user } = Route.useRouteContext();
  const navigate = useNavigate();
  
  const [ideas, setIdeas] = useState([]);
  const [newIdea, setNewIdea] = useState("");
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("newest"); // newest | voted
  const [submitting, setSubmitting] = useState(false);

  // Estado para respuestas del admin
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");

  const isAdmin = user && ADMIN_EMAILS.includes(user.email);
  const nombreUsuario = user?.displayName || user?.email?.split("@")[0] || "Creador";

  const fetchIdeas = async () => {
    try {
      const q = query(collection(db, "suggestions"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      const fetched = [];
      snap.forEach(doc => fetched.push({ id: doc.id, ...doc.data() }));
      setIdeas(fetched);
    } catch (error) {
      console.error(error);
      toast.error("Error al cargar las ideas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIdeas();
  }, []);

  const handlePublish = async (e) => {
    e.preventDefault();
    if (!newIdea.trim()) return toast.error("Escribe tu idea primero");
    if (newIdea.length > 600) return toast.error("La idea es muy larga (máx 600)");
    
    setSubmitting(true);
    try {
      await addDoc(collection(db, "suggestions"), {
        userId: user.uid,
        userName: nombreUsuario,
        idea: newIdea,
        votes: 0,
        status: "pending",
        adminReply: "",
        createdAt: serverTimestamp()
      });
      toast.success("¡Idea publicada!");
      setNewIdea("");
      fetchIdeas();
    } catch (error) {
      toast.error("Error al publicar");
    } finally {
      setSubmitting(false);
    }
  };

  const handleVote = async (id) => {
    try {
      await updateDoc(doc(db, "suggestions", id), { votes: increment(1) });
      setIdeas(ideas.map(i => i.id === id ? { ...i, votes: i.votes + 1 } : i));
      toast.success("¡Voto registrado!");
    } catch (error) {
      toast.error("Error al votar");
    }
  };

  const handleReply = async (id) => {
    if (!replyText.trim()) return;
    try {
      await updateDoc(doc(db, "suggestions", id), { adminReply: replyText, status: "in-progress" });
      setIdeas(ideas.map(i => i.id === id ? { ...i, adminReply: replyText, status: "in-progress" } : i));
      setReplyingTo(null);
      setReplyText("");
      toast.success("Respuesta enviada");
    } catch (error) {
      toast.error("Error al responder");
    }
  };

  const sortedIdeas = [...ideas].sort((a, b) => {
    if (sortBy === "voted") return b.votes - a.votes;
    return b.createdAt?.toMillis() - a.createdAt?.toMillis();
  });

  // Calcular estadísticas
  const totalIdeas = ideas.length;
  const totalVotes = ideas.reduce((acc, curr) => acc + (curr.votes || 0), 0);
  const inProgress = ideas.filter(i => i.status === "in-progress").length;

  return (
    <div className="space-y-6 pb-24">
      
      {/* Botón Volver */}
      <button onClick={() => navigate({ to: "/dashboard" })} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium">
        <ArrowLeft className="w-4 h-4" /> Volver a mi panel
      </button>

      {/* Hero Card */}
      <div className="bg-[#0F1523] border border-white/5 rounded-3xl p-8 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl -mt-10"></div>
        
        <div className="bg-blue-600 w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30">
          <Lightbulb className="w-8 h-8 text-white" />
        </div>
        
        <h1 className="text-3xl font-black text-white mb-3">¿Qué le ponemos a NASETLINK?</h1>
        <p className="text-sm text-slate-400 leading-relaxed max-w-sm mx-auto mb-8">
          Escribe lo que te gustaría que tuviera la plataforma. Lo leemos todo, y aquí abajo se ve tu nombre junto a tu idea.
        </p>

        <div className="grid grid-cols-3 gap-3">
          <div className="bg-black/30 border border-white/5 rounded-2xl p-3">
            <h3 className="text-xl font-black text-white">{totalIdeas}</h3>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1">Ideas</p>
          </div>
          <div className="bg-black/30 border border-white/5 rounded-2xl p-3">
            <h3 className="text-xl font-black text-white">{totalVotes}</h3>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1">Votos</p>
          </div>
          <div className="bg-black/30 border border-white/5 rounded-2xl p-3">
            <h3 className="text-xl font-black text-white">{inProgress}</h3>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1">En marcha</p>
          </div>
        </div>
      </div>

      {/* Formulario para publicar idea */}
      <div className="bg-[#0F1523] border border-white/5 rounded-3xl p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold uppercase">
            {nombreUsuario[0]}
          </div>
          <div>
            <p className="text-sm font-bold text-white">{nombreUsuario}</p>
            <p className="text-[10px] text-slate-500">Va a salir con tu nombre de creador</p>
          </div>
        </div>

        <form onSubmit={handlePublish}>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Tu idea</p>
          <textarea
            value={newIdea}
            onChange={(e) => setNewIdea(e.target.value)}
            maxLength={600}
            placeholder="Me gustaría que NASETLINK tuviera..."
            className="w-full bg-black/30 border border-white/10 rounded-2xl p-4 text-white text-sm outline-none focus:border-blue-500 resize-none h-32 mb-3"
          />
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-mono">{newIdea.length}/600</span>
            <button type="submit" disabled={submitting} className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm py-2.5 px-5 rounded-xl flex items-center gap-2 transition disabled:opacity-50">
              <Send className="w-4 h-4" /> {submitting ? "Publicando..." : "Publicar"}
            </button>
          </div>
        </form>
      </div>

      {/* Filtros */}
      <div className="grid grid-cols-2 gap-3">
        <button onClick={() => setSortBy("newest")} className={`flex items-center justify-center gap-2 py-3 rounded-xl border font-bold text-sm transition ${sortBy === "newest" ? 'bg-blue-600/10 border-blue-500/30 text-blue-500' : 'bg-[#0F1523] border-white/5 text-slate-400 hover:text-white'}`}>
          <Clock className="w-4 h-4" /> Más nuevas
        </button>
        <button onClick={() => setSortBy("voted")} className={`flex items-center justify-center gap-2 py-3 rounded-xl border font-bold text-sm transition ${sortBy === "voted" ? 'bg-blue-600/10 border-blue-500/30 text-blue-500' : 'bg-[#0F1523] border-white/5 text-slate-400 hover:text-white'}`}>
          <Flame className="w-4 h-4" /> Más votadas
        </button>
      </div>

      {/* Lista de Ideas */}
      <div className="space-y-4">
        {loading ? (
          <p className="text-center text-slate-500 text-sm py-10">Cargando ideas...</p>
        ) : sortedIdeas.length === 0 ? (
          <p className="text-center text-slate-500 text-sm py-10">Aún no hay ideas. ¡Sé el primero en proponer algo!</p>
        ) : (
          sortedIdeas.map((idea) => (
            <div key={idea.id} className="bg-[#0F1523] border border-white/5 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-slate-300 font-bold text-xs uppercase">
                    {idea.userName ? idea.userName[0] : "U"}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{idea.userName || "Usuario"}</p>
                    <p className="text-[10px] text-slate-500">
                      {idea.createdAt ? new Date(idea.createdAt.toMillis()).toLocaleDateString() : "Reciente"}
                    </p>
                  </div>
                </div>
                
                {/* Botón de Votar */}
                <button onClick={() => handleVote(idea.id)} className="flex flex-col items-center justify-center bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl px-3 py-2 transition group">
                  <Flame className="w-4 h-4 text-slate-400 group-hover:text-orange-500 transition-colors mb-1" />
                  <span className="text-xs font-bold text-white">{idea.votes || 0}</span>
                </button>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed mb-4">{idea.idea}</p>

              {/* Respuesta del Admin */}
              {idea.adminReply ? (
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 mt-4">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                    <span className="text-[10px] font-bold text-blue-500 uppercase tracking-wider">Respuesta del equipo</span>
                  </div>
                  <p className="text-xs text-slate-300">{idea.adminReply}</p>
                </div>
              ) : isAdmin ? (
                <div className="mt-4 border-t border-white/5 pt-3">
                  {replyingTo === idea.id ? (
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Escribe una respuesta..." 
                        className="flex-1 bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-blue-500"
                      />
                      <button onClick={() => handleReply(idea.id)} className="bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-lg">Enviar</button>
                    </div>
                  ) : (
                    <button onClick={() => setReplyingTo(idea.id)} className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 font-bold transition">
                      <MessageSquare className="w-3.5 h-3.5" /> Responder como Admin
                    </button>
                  )}
                </div>
              ) : null}
            </div>
          ))
        )}
      </div>

    </div>
  );
}
