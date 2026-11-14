import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Trophy, User, Eye, EyeOff, Flame } from "lucide-react";

export const Route = createFileRoute("/_authed/ranking")({
  head: () => ({ meta: [{ title: "Ranking — NASETLINK" }] }),
  component: RankingPage,
});

function RankingPage() {
  const { user } = Route.useRouteContext();
  const [earnings, setEarnings] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hidden, setHidden] = useState(false);
  
  const [activeTab, setActiveTab] = useState("Este mes");

  useEffect(() => {
    const fetchEarnings = async () => {
      if (!user) return;
      try {
        const q = query(collection(db, "links"), where("userId", "==", user.uid));
        const snap = await getDocs(q);
        let total = 0;
        snap.forEach(doc => {
          total += doc.data().earnings || 0;
        });
        setEarnings(total);
      } catch (error) {
        console.error("Error cargando ranking:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEarnings();
  }, [user]);

  const getSaludo = () => {
    const hora = new Date().getHours();
    if (hora >= 6 && hora < 12) return "Buenos días";
    if (hora >= 12 && hora < 20) return "Buenas tardes";
    return "Buenas noches";
  };

  const nombreUsuario = user?.displayName?.split(" ")[0] || user?.email?.split("@")[0] || "Usuario";

  if (loading) return <div className="text-center text-white mt-10 font-bold">Cargando ranking...</div>;

  return (
    <div className="space-y-6 pb-24">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-white mb-1">
          {getSaludo()}, {nombreUsuario} 👋
        </h1>
        <p className="text-sm text-slate-400">Los que más generan en la plataforma. ¡Sube tu posición! 🔥</p>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-4 gap-2">
        {['Hoy', 'Esta semana', 'Este mes', 'Mes anterior'].map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 text-[11px] font-semibold rounded-xl transition-colors ${activeTab === tab ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'bg-[#0F1523] border border-white/5 text-slate-400 hover:text-white'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tarjeta de Posición del Usuario (AZUL/CIAN) */}
      <div className="bg-gradient-to-br from-[#1e3a8a] via-[#2563eb] to-[#06b6d4] rounded-3xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
        
        <div className="flex items-center gap-2 text-white/90 mb-6">
          <User className="w-5 h-5" />
          <span className="text-sm font-medium">Tu posición · {activeTab}</span>
        </div>
        
        <div className="flex items-baseline gap-2 mb-6">
          <div className="h-2 w-12 bg-white rounded-full"></div>
          <h2 className="text-4xl font-black text-white">#{earnings > 0 ? "1" : "-"}</h2>
          <p className="text-sm text-white/80">de 5 creadores</p>
        </div>

        <div className="inline-flex items-center gap-2 bg-black/30 border border-white/10 px-4 py-2 rounded-xl backdrop-blur-md">
          <div className="bg-white/20 p-1 rounded-md"><Flame className="w-4 h-4 text-white" /></div>
          <span className="text-white font-medium text-sm">Generaste ${earnings.toFixed(2)}</span>
        </div>
      </div>

      {/* Podio Top 3 */}
      <div className="grid grid-cols-3 gap-2 items-end pt-4">
        {/* 2do Lugar */}
        <div className="bg-[#0F1523] border border-white/5 rounded-2xl p-4 text-center pb-6 relative">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-xs font-bold text-white border-4 border-[#0F1523]">2°</div>
          <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-3 flex items-center justify-center">
            <User className="w-7 h-7 text-white" />
          </div>
          <p className="text-sm font-bold text-white leading-tight">Emon Vai</p>
        </div>
        
        {/* 1er Lugar */}
        <div className="bg-[#0F1523] border border-yellow-500/30 rounded-2xl p-4 text-center pb-8 relative shadow-[0_0_30px_-10px_rgba(234,179,8,0.3)]">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-xs font-bold text-white border-4 border-[#0F1523]">1°</div>
          <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-3 flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <p className="text-sm font-bold text-white leading-tight">No.mbs.<br/>Le.nson.</p>
        </div>

        {/* 3er Lugar */}
        <div className="bg-[#0F1523] border border-white/5 rounded-2xl p-4 text-center pb-6 relative">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-orange-700 rounded-full flex items-center justify-center text-xs font-bold text-white border-4 border-[#0F1523]">3°</div>
          <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-3 flex items-center justify-center">
            <User className="w-7 h-7 text-white" />
          </div>
          <p className="text-sm font-bold text-white leading-tight">xXCris_Cra<br/>ftXx</p>
        </div>
      </div>

      {/* Top 5 Lista (4 y 5) */}
      <div>
        <div className="flex items-center justify-between mb-3 mt-6">
          <h3 className="text-sm font-bold text-white">Top 5 · {activeTab}</h3>
          <span className="text-xs text-slate-500">5 creadores</span>
        </div>
        <div className="bg-[#0F1523] border border-white/5 rounded-2xl overflow-hidden">
          <div className="flex items-center gap-4 p-4 border-b border-white/5">
            <span className="text-sm font-bold text-slate-500 w-4">#4</span>
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center"><User className="w-5 h-5 text-white" /></div>
            <p className="text-sm font-bold text-white">C3SAR MODZ OFC</p>
          </div>
          <div className="flex items-center gap-4 p-4">
            <span className="text-sm font-bold text-slate-500 w-4">#5</span>
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center"><User className="w-5 h-5 text-white" /></div>
            <p className="text-sm font-bold text-white">Pana18 Bonilla</p>
          </div>
        </div>
      </div>

      {/* Tu posición y botón ocultar */}
      <div className="bg-[#0F1523] border border-white/5 rounded-2xl p-4 flex items-center justify-between mt-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400">Tu posición este mes</p>
            <p className="text-sm font-bold text-white">{earnings > 0 ? "Estás en el Top" : "Sin clics este mes"} · 5 creadores</p>
          </div>
        </div>
        <button 
          onClick={() => setHidden(!hidden)}
          className="bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold py-2 px-3 rounded-lg flex items-center gap-2 transition"
        >
          {hidden ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          {hidden ? 'Mostrarme' : 'Ocultarme'}
        </button>
      </div>
      
      <p className="text-[10px] text-slate-500 flex items-start gap-1.5 px-2">
        <Eye className="w-3.5 h-3.5 shrink-0 mt-0.5" /> 
        Si te ocultas, sigues contando para tu posición, pero los demás te ven como "Creador anónimo" y sin foto.
      </p>

    </div>
  );
}
