import { useState, useEffect, useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { db, auth } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, doc } from "firebase/firestore";
import { toast } from "sonner";
import { Mic, Send, Wifi, Volume2, User } from "lucide-react";

export const Route = createFileRoute("/_authed/chat")({
  head: () => ({ meta: [{ title: "Chat en vivo — NASETLINK" }] }),
  component: ChatPage,
});

function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [myProfile, setMyProfile] = useState(null);
  const messagesEndRef = useRef(null);

  // 1. Escuchar los datos de MI perfil en tiempo real (para tener la foto actualizada)
  useEffect(() => {
    if (!auth.currentUser) return;
    const unsubProfile = onSnapshot(doc(db, "users", auth.currentUser.uid), (docSnap) => {
      if (docSnap.exists()) {
        setMyProfile(docSnap.data());
      }
    });
    return () => unsubProfile();
  }, []);

  // 2. Escuchar mensajes en tiempo real
  useEffect(() => {
    const q = query(collection(db, "chat_global"), orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = [];
      snapshot.forEach((doc) => {
        msgs.push({ id: doc.id, ...doc.data() });
      });
      setMessages(msgs);
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    });

    return () => unsubscribe();
  }, []);

  const handleSendText = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const text = newMessage;
    setNewMessage("");

    try {
      await addDoc(collection(db, "chat_global"), {
        text: text,
        userId: auth.currentUser.uid,
        userName: myProfile?.displayName || auth.currentUser.displayName || auth.currentUser.email?.split("@")[0] || "Creador",
        // Usamos la foto de Firestore, o el avatar, o nada
        userAvatar: myProfile?.photoURL || "", 
        userIcon: myProfile?.avatar || "user",
        type: "text",
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      toast.error("Error al enviar mensaje");
    }
  };

  const getTime = (timestamp) => {
    if (!timestamp) return "Enviando...";
    const date = new Date(timestamp.toMillis());
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] bg-[#0B0F19] rounded-2xl border border-white/5 overflow-hidden">
      
      <div className="bg-[#0F1523] border-b border-white/5 p-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600/20 border border-blue-500/30 rounded-xl flex items-center justify-center">
            <span className="text-blue-500 font-black text-xs">NS</span>
          </div>
          <div>
            <h2 className="text-white font-bold text-sm">Sala general</h2>
            <div className="flex items-center gap-1 text-[10px] text-green-500 font-medium">
              <Wifi className="w-3 h-3" /> EN LÍNEA
            </div>
          </div>
        </div>
        <button className="p-2 bg-white/5 rounded-lg text-slate-400 hover:text-white transition">
          <Volume2 className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center opacity-30">
            <div className="text-4xl font-black mb-2 text-white">NASETLINK</div>
            <p className="text-xs">Sé el primero en escribir en el chat global.</p>
          </div>
        ) : (
          messages.map((msg) => {
            const isMe = msg.userId === auth.currentUser?.uid;
            return (
              <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'} mb-2`}>
                <div className={`max-w-[85%] flex gap-2 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                  
                  {/* Avatar */}
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0 text-white font-bold text-xs mt-auto shadow-md overflow-hidden border border-white/10">
                    {msg.userAvatar ? (
                      <img src={msg.userAvatar} className="w-full h-full object-cover" alt="avatar" />
                    ) : (
                      msg.userName[0].toUpperCase()
                    )}
                  </div>

                  <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                    {!isMe && (
                      <p className="text-[11px] text-slate-400 mb-1 ml-1 font-medium">{msg.userName}</p>
                    )}
                    
                    <div className={`p-2.5 px-3 rounded-2xl relative pb-5 min-w-[100px] shadow-sm ${isMe ? 'bg-blue-600 text-white rounded-tr-sm' : 'bg-[#0F1523] text-slate-200 border border-white/5 rounded-tl-sm'}`}>
                      <p className="text-sm break-words leading-relaxed pr-2">{msg.text}</p>
                      <span className={`text-[9px] absolute bottom-1.5 right-2.5 ${isMe ? 'text-blue-200' : 'text-slate-500'}`}>
                        {getTime(msg.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-3 bg-[#0F1523] border-t border-white/5 shrink-0">
        <form onSubmit={handleSendText} className="flex items-center gap-2">
          <button type="button" className="p-2.5 bg-white/5 text-slate-400 hover:text-white rounded-xl transition">
            <Mic className="w-5 h-5" />
          </button>

          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Escribe algo..."
            className="flex-1 bg-black/30 border border-white/10 rounded-xl py-3 px-4 text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500"
          />

          <button 
            type="submit" 
            disabled={!newMessage.trim()}
            className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition disabled:opacity-50 disabled:bg-slate-700"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
        <div className="text-right mt-1 mr-2">
          <span className="text-[10px] text-slate-600">{newMessage.length}/400</span>
        </div>
      </div>

    </div>
  );
}
