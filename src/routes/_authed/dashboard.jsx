import { useState, useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import LinksTable from "@/components/naset/LinksTable";
import { db, auth } from "@/lib/firebase";
import { collection, query, where, getDocs, doc, onSnapshot } from "firebase/firestore";
import { Clock, MessageCircle, TrendingUp, Wallet, Hourglass, Award, Gift, Copy, X, Flame, BadgeCheck, Star } from "lucide-react";

export const Route = createFileRoute("/_authed/dashboard")({
  head: () => ({ meta: [{ title: "Panel — NASETLINK" }] }),
  component: DashboardPage,
});

function DashboardPage() {
  const { user } = Route.useRouteContext();
  const navigate = useNavigate();

  const [links, setLinks] = useState([]);
  const [balance, setBalance] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [loadingData, setLoadingData] = useState(true);
  const [userData, setUserData] = useState(null);
  const [globalSettings, setGlobalSettings] = useState({ ecpmBase: 1.5 });
  
  // Estados para los filtros
  const [activeTab, setActiveTab] = useState("Hoy");
  const [filteredClicks, setFilteredClicks] = useState(0);
  const [filteredEarnings, setFilteredEarnings] = useState(0);
  const [clickLogs, setClickLogs] = useState([]);

  const [showPromo, setShowPromo] = useState(true);

  useEffect(() => {
    if (!user) return;

    const unsubUser = onSnapshot(doc(db, "users", user.uid), (docSnap) => {
      if (docSnap.exists()) setUserData(docSnap.data());
    });

    const unsubSettings = onSnapshot(doc(db, "settings", "global"), (docSnap) => {
      if (docSnap.exists()) setGlobalSettings({ ecpmBase: docSnap.data().ecpmBase || 1.5 });
    });

    const fetchData = async () => {
      setLoadingData(true);
      try {
        // 1. Cargar links
        const q = query(collection(db, "links"), where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        let fetchedLinks = [];
        let tEarnings = 0;

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          fetchedLinks.push({ id: doc.id, ...data });
          tEarnings += data.earnings || 0;
        });

        setLinks(fetchedLinks.reverse());
        setTotalEarnings(tEarnings);
        setBalance(tEarnings);

        // 2. Cargar historial de clics para los filtros
        const logsQ = query(collection(db, "click_logs"), where("userId", "==", user.uid));
        const logsSnap = await getDocs(logsQ);
        let logsList = [];
        logsSnap.forEach(doc => logsList.push({ id: doc.id, ...doc.data() }));
        setClickLogs(logsList);

      } catch (error) {
        console.error("Error al cargar datos:", error);
      } finally {
        setLoadingData(false);
      }
    };

    fetchData();

    return () => { unsubUser(); unsubSettings(); };
  }, [user]);

  // Efecto que se ejecuta cada vez que cambias de pestaña o llegan nuevos logs
  useEffect(() => {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const startOfYesterday = startOfToday - 86400000;
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1).getTime();

    let clicks = 0;
    let earnings = 0;

    clickLogs.forEach(log => {
      if (!log.createdAt) return;
      const logTime = log.createdAt.toMillis();

      if (activeTab === "Hoy" && logTime >= startOfToday) {
        clicks++; earnings += log.earnings;
      } else if (activeTab === "Ayer" && logTime >= startOfYesterday && logTime < startOfToday) {
        clicks++; earnings += log.earnings;
      } else if (activeTab === "Este mes" && logTime >= startOfMonth) {
        clicks++; earnings += log.earnings;
      } else if (activeTab === "Mes ant." && logTime >= startOfLastMonth && logTime < startOfMonth) {
        clicks++; earnings += log.earnings;
      }
    });

    setFilteredClicks(clicks);
    setFilteredEarnings(earnings);

  }, [activeTab, clickLogs]);

  const handleCopy = async (text) => {
    try { await navigator.clipboard.writeText(text); toast.success("Copiado"); } catch { toast.error("No se pudo copiar"); }
  };

  const getSaludo = () => {
    const hora = new Date().getHours();
    if (hora >= 6 && hora < 12) return "Buenos días";
    if (hora >= 12 && hora < 20) return "Buenas tardes";
    return "Buenas noches";
  };

  const nombreUsuario = userData?.displayName?.split(" ")[0] || user?.displayName?.split(" ")[0] || user?.email?.split("@")[0] || "Usuario";
  const userLevel = userData?.level || 1;
  const isVerified = userData?.verified || false;
  const isInfluencer = userData?.role === 'influencer';
  const domain = window.location.origin;

  if (loadingData) {
    return <div className="text-center text-white mt-10 font-bold">Cargando NASETLINK...</div>;
  }

  return (
    <div className="space-y-6 pb-6 relative">
      
      {showPromo && (
        <div className="relative bg-[#0F1523]/60 backdrop-blur-xl border border-green-500/20 rounded-3xl p-5 flex items-start gap-4 shadow-lg">
          <div className="bg-green-500/10 p-2.5 rounded-xl text-green-500 shrink-0"><MessageCircle className="w-6 h-6" /></div>
          <div className="flex-1">
            <h3 className="font-bold text-sm mb-1 text-white">Entra al grupo oficial de NASETLINK</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">Ahí avisamos los pagos, los cambios de eCPM y los sorteos <strong className="text-white">antes que en ningún lado</strong>.</p>
            <a href="https://chat.whatsapp.com/JAqf2gVEFlz59saw6MVveK" target="_blank" rel="noopener noreferrer" className="bg-green-500 hover:bg-green-600 text-white text-sm font-semibold py-2 px-4 rounded-xl flex items-center justify-center gap-2 transition w-full max-w-[200px]"><MessageCircle className="w-4 h-4" /> Unirme ahora</a>
          </div>
          <button onClick={() => setShowPromo(false)} className="text-slate-500 hover:text-white p-1 absolute top-3 right-3"><X className="w-4 h-4" /></button>
        </div>
      )}

      <div>
        <h1 className="text-3xl font-black tracking-tight text-white flex items-center gap-2 flex-wrap">
          {getSaludo()}, {nombreUsuario} 👋
          {isVerified && <BadgeCheck className="w-7 h-7 text-blue-500" title="Verificado" />}
          {isInfluencer && <Star className="w-7 h-7 text-yellow-500" title="Influencer" />}
        </h1>
        <p className="text-slate-400 text-sm mt-1">Este es el pulso de tu cuenta.</p>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1 h-4 bg-purple-500 rounded-full"></div>
          <h2 className="font-bold text-lg text-white">Resumen</h2>
        </div>

        <div className="bg-gradient-to-br from-purple-700 to-indigo-900 rounded-3xl p-6 shadow-2xl relative overflow-hidden mb-4 border border-white/10">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
          <div className="flex justify-between items-start mb-6 relative z-10">
            <div className="flex items-center gap-2 text-purple-100"><Wallet className="w-5 h-5" /><span className="text-sm font-medium">Tu saldo</span></div>
            <span className="bg-white/10 border border-white/20 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md">Histórico</span>
          </div>
          <h3 className="text-5xl font-black mb-6 relative z-10">${balance.toFixed(2)}</h3>
          <div className="space-y-3 mb-6 relative z-10">
            <div className="flex justify-between text-sm"><span className="text-purple-200 flex items-center gap-1.5"><TrendingUp className="w-4 h-4" /> Generado histórico</span><span className="font-semibold">${totalEarnings.toFixed(2)}</span></div>
            <div className="flex justify-between text-sm"><span className="text-purple-200 flex items-center gap-1.5"><Wallet className="w-4 h-4" /> Puedes retirar ya</span><span className="font-semibold">${balance.toFixed(2)}</span></div>
          </div>
          <button onClick={() => navigate({ to: "/retiros" })} className="bg-white text-purple-800 font-bold text-sm py-2.5 px-6 rounded-xl flex items-center gap-2 hover:bg-purple-50 transition relative z-10 shadow-lg"><Wallet className="w-4 h-4" /> Retirar</button>
        </div>
      </div>
      
      <div className="bg-[#0F1523]/60 backdrop-blur-xl border border-white/5 rounded-3xl p-5 flex items-center justify-between shadow-lg">
        <div>
          <div className="flex items-center gap-2 text-slate-400 mb-1"><Hourglass className="w-4 h-4 text-purple-500" /><span className="text-sm">Pendiente</span></div>
          <h3 className="text-4xl font-black text-white">$0.00</h3>
          <span className="text-xs text-slate-500 flex items-center gap-1 mt-1"><Clock className="w-3 h-3" /> En proceso</span>
        </div>
        <div className="bg-white/5 rounded-2xl px-5 py-3 text-right border border-white/5">
          <p className="text-xs text-slate-400 mb-1">Total ganado</p>
          <p className="font-bold text-xl text-white">${totalEarnings.toFixed(2)}</p>
        </div>
      </div>

      <div className="bg-[#0F1523]/60 backdrop-blur-xl border border-white/5 rounded-3xl p-5 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-orange-500/10 p-2.5 rounded-xl text-orange-500 border border-orange-500/20"><Award className="w-6 h-6" /></div>
            <div><p className="text-xs text-slate-400">Tu nivel actual</p><p className="font-bold text-lg text-white">LEVEL {userLevel}</p></div>
          </div>
          <div className="bg-white/5 rounded-xl px-4 py-2.5 text-center border border-white/5">
            <div className="flex items-center justify-center gap-1 text-xs text-slate-400 mb-0.5"><Flame className="w-3 h-3 text-orange-500" /> RACHA</div>
            <p className="font-bold text-sm text-white">Día 1/9</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Hoy llevas</span>
            <span className="text-slate-400">Para subir a <strong className="text-white">LEVEL {userLevel + 1}</strong></span>
          </div>
          <div className="flex justify-between items-end mb-1">
            <span className="text-3xl font-black text-white">{filteredClicks} <span className="text-lg text-slate-500 font-medium">/ 300</span></span>
            <span className="text-xs text-slate-400 font-medium">300/día × 9 días</span>
          </div>
          <div className="w-full bg-white/5 h-2.5 rounded-full overflow-hidden border border-white/5">
            <div className="bg-gradient-to-r from-orange-500 to-purple-500 h-full rounded-full" style={{ width: `${Math.min((filteredClicks/300)*100, 100)}%` }}></div>
          </div>
          <p className="text-xs text-slate-400 mt-3">Te faltan <strong className="text-white">{Math.max(300 - filteredClicks, 0)}</strong> clics válidos antes de las 12:00 AM</p>
        </div>
        
        <div className="flex gap-1.5 mt-5">
          {[1,2,3,4,5,6,7,8,9].map(i => (
            <div key={i} className={`flex-1 aspect-square flex items-center justify-center rounded-lg border text-xs font-bold ${i === 1 ? 'border-purple-500 bg-purple-500/10 text-purple-400' : 'border-white/5 bg-white/5 text-slate-500'}`}>{i}</div>
          ))}
        </div>
      </div>

      {/* BOTONES DE FILTRO FUNCIONALES */}
      <div className="grid grid-cols-4 gap-2 bg-[#0F1523]/60 backdrop-blur-xl p-1.5 rounded-2xl border border-white/5 shadow-lg">
        {['Hoy', 'Ayer', 'Este mes', 'Mes ant.'].map((tab) => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)}
            className={`py-2 text-[11px] font-semibold rounded-xl transition ${activeTab === tab ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
          >
            {tab}
          </button>
        ))}
      </div>
      
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-[#0F1523]/60 backdrop-blur-xl border border-white/5 rounded-3xl p-4 shadow-lg">
          <div className="bg-purple-500/10 p-2 rounded-xl w-fit mb-3"><Wallet className="w-4 h-4 text-purple-500" /></div>
          <h4 className="text-xl font-black text-white">${filteredEarnings.toFixed(2)}</h4>
          <p className="text-[10px] text-slate-400 mt-0.5">Ganancias</p>
        </div>
        <div className="bg-[#0F1523]/60 backdrop-blur-xl border border-white/5 rounded-3xl p-4 shadow-lg">
          <div className="bg-purple-500/10 p-2 rounded-xl w-fit mb-3"><TrendingUp className="w-4 h-4 text-purple-500" /></div>
          <h4 className="text-xl font-black text-white">{filteredClicks}</h4>
          <p className="text-[10px] text-slate-400 mt-0.5">Clics</p>
        </div>
        <div className="bg-[#0F1523]/60 backdrop-blur-xl border border-white/5 rounded-3xl p-4 shadow-lg">
          <div className="bg-purple-500/10 p-2 rounded-xl w-fit mb-3"><TrendingUp className="w-4 h-4 text-purple-500" /></div>
          <h4 className="text-xl font-black text-white">${globalSettings.ecpmBase.toFixed(2)}</h4>
          <p className="text-[10px] text-slate-400 mt-0.5">eCPM</p>
        </div>
      </div>

      <LinksTable links={links} onCopy={(link) => handleCopy(`${domain}/s/${link.short_code}`)} />

      <div className="bg-[#0F1523]/60 backdrop-blur-xl border border-white/5 rounded-3xl p-5 flex items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="bg-pink-500/10 p-3 rounded-xl text-pink-500"><Gift className="w-6 h-6" /></div>
          <div><h3 className="font-bold text-sm text-white">Invita y gana</h3><p className="text-xs text-slate-400 mt-0.5">Comisión durante 6 meses.</p></div>
        </div>
        <button onClick={() => handleCopy(`${domain}/register?ref=${user?.uid}`)} className="bg-white/5 hover:bg-white/10 border border-white/10 text-white p-3 rounded-xl transition flex items-center gap-2 text-xs font-bold shrink-0"><Copy className="w-4 h-4" /> Copiar</button>
      </div>
      
      <div className="text-center text-[10px] text-slate-600 font-mono pb-4">NASETLINK build 32</div>
    </div>
  );
}
