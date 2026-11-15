import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "sonner";
import { ArrowLeft, Send, Megaphone, Bell } from "lucide-react";

export const Route = createFileRoute("/_authed/admin-comunicaciones")({
  head: () => ({ meta: [{ title: "Comunicaciones — Admin" }] }),
  component: AdminComunicacionesPage,
});

function AdminComunicacionesPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) return toast.error("Llena los campos");
    setSending(true);
    try {
      await addDoc(collection(db, "notifications"), { userId: "all", title: title, message: message, read: false, createdAt: serverTimestamp() });
      toast.success("¡Mensaje enviado a todos!");
      setTitle(""); setMessage("");
    } catch (error) { toast.error("Error al enviar"); } finally { setSending(false); }
  };

  return (
    <div className="space-y-6 pb-24 max-w-2xl mx-auto">
      <button onClick={() => navigate({ to: "/admin" })} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium"><ArrowLeft className="w-4 h-4" /> Volver al Admin</button>
      <div><h1 className="text-3xl font-bold text-white mb-1 flex items-center gap-2"><Megaphone className="w-7 h-7 text-blue-500" /> Mensajes</h1></div>
      <div className="bg-[#0F1523] border border-blue-500/20 rounded-2xl p-6">
        <form onSubmit={handleSend} className="space-y-4">
          <div><label className="block text-xs font-bold text-slate-400 mb-2 uppercase">Título del Mensaje</label><input type="text" placeholder="Ej: ¡Nuevo sorteo!" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 text-white outline-none focus:border-blue-500" /></div>
          <div><label className="block text-xs font-bold text-slate-400 mb-2 uppercase">Mensaje</label><textarea placeholder="Escribe los detalles aquí..." value={message} onChange={(e) => setMessage(e.target.value)} rows={5} className="w-full bg-black/30 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-blue-500 resize-none" /></div>
          <button type="submit" disabled={sending} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition disabled:opacity-50"><Bell className="w-5 h-5" /> {sending ? "Enviando..." : "Enviar Notificación a Todos"}</button>
        </form>
      </div>
    </div>
  );
}
