import { useState, useEffect } from "react";
import { Clock, MessageCircle, Bell, Flame, User, Ghost, Smile, Gamepad2, Rocket, Shield, Zap, Star, Heart, Skull, Bot, Cat } from "lucide-react";
import { db, auth } from "@/lib/firebase";
import { doc, onSnapshot, collection, query, where, orderBy, updateDoc, limit } from "firebase/firestore";

function AvatarDisplay({ name, className }) {
  const icons = { user: User, ghost: Ghost, smile: Smile, gamepad: Gamepad2, rocket: Rocket, shield: Shield, zap: Zap, star: Star, heart: Heart, skull: Skull, bot: Bot, cat: Cat };
  const Icon = icons[name] || User;
  return <Icon className={className} />;
}

export default function TopBar() {
  const [time, setTime] = useState(new Date());
  const [userData, setUserData] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [showNotifs, setShowNotifs] = useState(false);
  const [lastNotifId, setLastNotifId] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000);
    
    // Pedir permiso para notificaciones del navegador
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!auth.currentUser) return;

    const unsubUser = onSnapshot(doc(db, "users", auth.currentUser.uid), (docSnap) => {
      if (docSnap.exists()) setUserData(docSnap.data());
    });

    const q = query(
      collection(db, "notifications"), 
      where("userId", "in", [auth.currentUser.uid, "all"]),
      orderBy("createdAt", "desc"),
      limit(20)
    );
    
    const unsubNotifs = onSnapshot(q, (snap) => {
      const notifs = [];
      snap.forEach(doc => notifs.push({ id: doc.id, ...doc.data() }));
      setNotifications(notifs);

      // Lógica para lanzar la notificación nativa
      if (notifs.length > 0) {
        const newest = notifs[0];
        // Si la notificación es nueva (no la última que vimos) y no ha sido leída
        if (newest.id !== lastNotifId && !newest.read) {
          setLastNotifId(newest.id);
          
          // Lanzar la notificación del sistema si ya dio permiso
          if ("Notification" in window && Notification.permission === "granted") {
            new Notification(newest.title, {
              body: newest.message,
              icon: "/logo.png",
              badge: "/logo.png"
            });
          }
        }
      }
    });

    return () => { unsubUser(); unsubNotifs(); };
  }, [auth.currentUser, lastNotifId]);

  const markAsRead = async (id) => {
    try {
      await updateDoc(doc(db, "notifications", id), { read: true });
    } catch (error) {
      console.error(error);
    }
  };

  const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const name = userData?.displayName || auth.currentUser?.displayName || "D";
  const initial = name.charAt(0).toUpperCase();
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="flex w-full items-center justify-between relative z-50">
      
      <div className="flex items-center gap-1.5 bg-purple-500/10 border border-purple-500/20 px-3 py-1.5 rounded-full text-xs font-semibold text-purple-400">
        <Flame className="w-3.5 h-3.5" />
        <span>Racha 0/9</span>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-300 bg-white/5 px-2.5 py-1.5 rounded-full border border-white/5">
          <Clock className="w-3.5 h-3.5 text-purple-400" />
          <span>{formattedTime}</span>
        </div>

        <button className="relative p-1.5 text-slate-400 hover:text-white transition bg-white/5 rounded-full border border-white/5">
          <MessageCircle className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-green-500 rounded-full"></span>
        </button>

        <button 
          onClick={() => setShowNotifs(!showNotifs)}
          className="relative p-1.5 text-slate-400 hover:text-white transition bg-white/5 rounded-full border border-white/5"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#0B0F19]"></span>
          )}
        </button>

        <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-xs font-bold text-white border border-white/10 overflow-hidden">
          {userData?.photoURL ? (
            <img src={userData.photoURL} alt="Avatar" className="w-full h-full object-cover" />
          ) : userData?.avatar && userData.avatar !== "user" ? (
            <AvatarDisplay name={userData.avatar} className="w-4 h-4" />
          ) : (
            initial
          )}
        </div>
      </div>

      {showNotifs && (
        <div className="absolute top-12 right-0 w-72 sm:w-80 bg-[#0F1523] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-3 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
            <h3 className="text-sm font-bold text-white">Notificaciones</h3>
            <span className="text-[10px] bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded-full font-bold">{unreadCount} nuevas</span>
          </div>
          
          <div className="max-h-[300px] overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-6">No tienes notificaciones.</p>
            ) : (
              notifications.map(notif => (
                <div 
                  key={notif.id} 
                  onClick={() => markAsRead(notif.id)}
                  className={`p-3 border-b border-white/5 last:border-0 cursor-pointer transition-colors ${notif.read ? 'opacity-60 hover:bg-white/5' : 'bg-purple-500/5 hover:bg-purple-500/10'}`}
                >
                  <p className="text-xs font-bold text-white mb-1">{notif.title}</p>
                  <p className="text-[11px] text-slate-400 leading-snug">{notif.message}</p>
                  <p className="text-[9px] text-slate-600 mt-2">
                    {notif.createdAt ? new Date(notif.createdAt.toMillis()).toLocaleDateString() : "Ahora"}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
