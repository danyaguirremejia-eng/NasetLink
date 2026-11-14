import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "sonner";
import { Headphones, Send, MessageCircle, CheckCircle2, Clock, Plus, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/_authed/soporte")({
  head: () => ({ meta: [{ title: "Soporte — NASETLINK" }] }),
  component: SoportePage,
});

function SoportePage() {
  const { user } = Route.useRouteContext();
  
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchTickets = async () => {
    if (!user) return;
    try {
      const q = query(collection(db, "tickets"), where("userId", "==", user.uid));
      const snap = await getDocs(q);
      const fetched = [];
      snap.forEach(doc => fetched.push({ id: doc.id, ...doc.data() }));
      // Ordenar en memoria por fecha (más nuevos primero)
      fetched.sort((a, b) => b.createdAt?.toMillis() - a.createdAt?.toMillis());
      setTickets(fetched);
    } catch (error) {
      console.error("Error cargando tickets:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return toast.error("Llena todos los campos");
    setSubmitting(true);
    try {
      await addDoc(collection(db, "tickets"), {
        userId: user.uid,
        userEmail: user.email,
        subject: subject,
        message: message,
        status: "pending",
        adminReply: "",
        createdAt: serverTimestamp()
      });
      toast.success("¡Ticket enviado! Te responderemos pronto.");
      setSubject("");
      setMessage("");
      setShowForm(false);
      fetchTickets();
    } catch (error) {
      toast.error("Error al enviar el ticket");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 pb-24">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-1 flex items-center gap-2">
          <Headphones className="w-7 h-7 text-blue-500" /> Soporte
        </h1>
        <p className="text-sm text-slate-400">¿Tienes un problema o duda? Abre un ticket y te responderemos aquí mismo.</p>
      </div>

      {/* Botón para abrir nuevo ticket */}
      {!showForm && (
        <button 
          onClick={() => setShowForm(true)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition shadow-lg shadow-blue-500/20"
        >
          <Plus className="w-5 h-5" /> Abrir un ticket
        </button>
      )}

      {/* Formulario de Ticket */}
      {showForm && (
        <div className="bg-[#0F1523] border border-blue-500/30 rounded-2xl p-5 relative">
          <button onClick={() => setShowForm(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="font-bold text-white mb-4 flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-blue-500" /> Nuevo Ticket
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs text-slate-400 mb-2">Asunto</label>
              <input 
                type="text" 
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Ej: Problema con un retiro"
                className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-white text-sm outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-2">Mensaje</label>
              <textarea 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                placeholder="Explica tu problema con el mayor detalle posible..."
                className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-white text-sm outline-none focus:border-blue-500 resize-none"
              />
            </div>
            <button 
              type="submit" 
              disabled={submitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition disabled:opacity-50"
            >
              <Send className="w-4 h-4" /> {submitting ? "Enviando..." : "Enviar Ticket"}
            </button>
          </form>
        </div>
      )}

      {/* Lista de Tickets */}
      <div className="space-y-4 mt-6">
        <h3 className="font-bold text-white">Tus tickets anteriores</h3>
        
        {loading ? (
          <p className="text-sm text-slate-500 text-center py-6">Cargando tickets...</p>
        ) : tickets.length === 0 ? (
          <div className="bg-[#0F1523] border border-white/5 rounded-2xl p-8 text-center">
            <div className="bg-white/5 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Headphones className="w-6 h-6 text-slate-500" />
            </div>
            <p className="text-sm text-slate-400">No has abierto ningún ticket. Si necesitas ayuda, usa el botón de arriba.</p>
          </div>
        ) : (
          tickets.map((ticket) => (
            <div key={ticket.id} className="bg-[#0F1523] border border-white/5 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-white text-sm">{ticket.subject}</h4>
                <div className={`px-2 py-1 rounded-md text-[10px] font-bold flex items-center gap-1 ${ticket.status === 'resolved' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                  {ticket.status === 'resolved' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                  {ticket.status === 'resolved' ? 'RESUELTO' : 'PENDIENTE'}
                </div>
              </div>
              <p className="text-xs text-slate-400 mb-4">{ticket.message}</p>
              
              {ticket.adminReply && (
                <div className="bg-blue-500/5 border border-blue-500/10 rounded-xl p-3">
                  <p className="text-[10px] font-bold text-blue-500 mb-1">Respuesta del equipo:</p>
                  <p className="text-xs text-slate-300">{ticket.adminReply}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>

    </div>
  );
}
