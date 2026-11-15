import { useState, useEffect } from "react";
import { Clock, MessageCircle, Bell, Flame, User, Ghost, Smile, Gamepad2, Rocket, Shield, Zap, Star, Heart, Skull, Bot, Cat } from "lucide-react";
import { db, auth } from "@/lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";

// Función para mostrar el icono del avatar si no hay foto
function AvatarDisplay({ name, className }) {
  const icons = { user: User, ghost: Ghost, smile: Smile, gamepad: Gamepad2, rocket: Rocket, shield: Shield, zap: Zap, star: Star, heart: Heart, skull: Skull, bot: Bot, cat: Cat };
  const Icon = icons[name] || User;
  return <Icon className={className} />;
}

export default function TopBar() {
  const [time, setTime] = useState(new Date());
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Escuchar los datos del usuario en tiempo real
    if (auth.currentUser) {
      const unsub = onSnapshot(doc(db, "users", auth.currentUser.uid), (docSnap) => {
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      });
      return () => unsub();
    }
  }, []);

  const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  // Sacar la inicial del nombre si no hay foto
  const name = userData?.displayName || auth.currentUser?.displayName || "D";
  const initial = name.charAt(0).toUpperCase();

  return (
    <div className="flex w-full items-center justify-between">
      
      {/* Racha */}
      <div className="flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/20 px-3 py-1.5 rounded-full text-xs font-semibold text-blue-400">
        <Flame className="w-3.5 h-3.5" />
        <span>Racha 0/9</span>
      </div>

      {/* Iconos de la derecha */}
      <div className="flex items-center gap-2">
        
        {/* Reloj */}
        <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-300 bg-white/5 px-2.5 py-1.5 rounded-full border border-white/5">
          <Clock className="w-3.5 h-3.5 text-blue-400" />
          <span>{formattedTime}</span>
        </div>

        {/* Chat */}
        <button className="relative p-1.5 text-slate-400 hover:text-white transition bg-white/5 rounded-full border border-white/5">
          <MessageCircle className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-green-500 rounded-full"></span>
        </button>

        {/* Notificaciones */}
        <button className="p-1.5 text-slate-400 hover:text-white transition bg-white/5 rounded-full border border-white/5">
          <Bell className="w-4 h-4" />
        </button>

        {/* Avatar Dinámico */}
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white border border-white/10 overflow-hidden">
          {userData?.photoURL ? (
            <img src={userData.photoURL} alt="Avatar" className="w-full h-full object-cover" />
          ) : userData?.avatar && userData.avatar !== "user" ? (
            <AvatarDisplay name={userData.avatar} className="w-4 h-4" />
          ) : (
            initial
          )}
        </div>
        
      </div>
    </div>
  );
}
