import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "sonner";
import { Headphones, Send, MessageSquare, CheckCircle2, Clock, Tag } from "lucide-react";

export const Route = createFileRoute("/_authed/soporte")({
  head: () => ({ meta: [{ title: "Soporte — NASETLINK" }] }),
  component: SoportePage,
});

function SoportePage() {
  const { user } = Route.useRouteContext();
  
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  
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
      // Ordenar por fecha, los más recientes primero
      fetched.sort((a, b) => (b.createdAt?.toMillis() || 0) - (a.createdAt?.toMillis() || 0));
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
      toast.success("¡Ticket enviado con éxito!");
      setSubject("");
      setMessage("");
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
        <p className="text-sm text-slate-400">¿Un problema o duda? Abre un ticket y te respondemos aquí mismo.</p>
      </div>

      {/* Formulario de Ticket (Siempre visible) */}
      <div className="bg-[#0F1523] border border-white/5 rounded-2xl p-5">
        <h2 className="font-bold text-white text-lg mb-4 flex items-center gap-2">
          <span className="text-blue-500 font-bold text-xl">+</span> Nuevo ticket
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-slate-400 mb-2">Asunto</label>
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="text" 
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Ej: No me llegó mi pago"
                className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white text-sm outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-2">Mensaje</label>
            <textarea 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              placeholder="Cuéntanos con detalle..."
              className="w-full bg-black/30 border border-white/10 rounded-xl p-4 text-white text-sm outline-none focus:border-blue-500 resize-none transition-colors"
            />
          </div>
          <button 
            type="submit" 
            disabled={submitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition disabled:opacity-50"
          >
            <Send className="w-4 h-4" /> {submitting ? "Enviando..." : "Enviar ticket"}
          </button>
        </form>
      </div>

      {/* Lista de Tickets */}
      <div className="mt-8">
        <h3 className="font-bold text-slate-400 text-sm mb-3">Mis tickets</h3>
        
        {loading ? (
          <p className="text-sm text-slate-500 text-center py-6">Cargando...</p>
        ) : tickets.length === 0 ? (
          <div className="bg-[#0F1523] border border-white/5 rounded-2xl p-10 flex flex-col items-center justify-center text-center">
            <div className="bg-white/5 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <MessageSquare className="w-6 h-6 text-slate-400" />
            </div>
            <h4 className="text-white font-bold text-lg mb-2">No hay conversaciones todavía</h4>
            <p className="text-sm text-slate-400 max-w-[250px]">
              Abre un ticket con el formulario de arriba y aquí verás la respuesta del equipo.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {tickets.map((ticket) => (
              <div key={ticket.id} className="bg-[#0F1523] border border-white/5 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-3">
                  <h4 className="font-bold text-white text-sm truncate pr-2">{ticket.subject}</h4>
                  <div className={`px-2 py-1 rounded-md text-[10px] font-bold flex items-center gap-1 shrink-0 ${ticket.status === 'resolved' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                    {ticket.status === 'resolved' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                    {ticket.status === 'resolved' ? 'RESUELTO' : 'PENDIENTE'}
                  </div>
                </div>
                <p className="text-sm text-slate-300 mb-4">{ticket.message}</p>
                
                {ticket.adminReply && (
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                    <p className="text-[10px] font-bold text-blue-500 mb-1 flex items-center gap-1">
                      <Headphones className="w-3 h-3" /> Respuesta del equipo:
                    </p>
                    <p className="text-sm text-slate-200">{ticket.adminReply}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
