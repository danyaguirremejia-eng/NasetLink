import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { MousePointerClick, Banknote, Globe, Trophy, BarChart3, Smartphone, Calendar } from "lucide-react";

export const Route = createFileRoute("/_authed/stats")({
  head: () => ({
    meta: [{ title: "Estadísticas — NASETLINK" }],
  }),
  component: StatsPage,
});

function StatsPage() {
  const { user } = Route.useRouteContext();
  
  const [loading, setLoading] = useState(true);
  const [totalClicks, setTotalClicks] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      if (!user) return;
      try {
        const q = query(collection(db, "links"), where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        
        let clicks = 0;
        let earnings = 0;
        
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          clicks += data.clicks || 0;
          earnings += data.earnings || 0;
        });
        
        setTotalClicks(clicks);
        setTotalEarnings(earnings);
      } catch (error) {
        console.error("Error cargando stats:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
  }, [user]);

  if (loading) {
    return <div className="text-center text-white mt-10 font-bold">Cargando estadísticas...</div>;
  }

  return (
    <div className="space-y-6 pb-24">
      
      {/* Encabezado */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-1">Estadísticas</h1>
        <p className="text-sm text-slate-400">El histórico completo de tu cuenta.</p>
      </div>

      {/* Tarjetas Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-[#0F1523] border border-white/5 rounded-2xl p-4 flex flex-col justify-between">
          <div className="bg-blue-500/10 p-2 rounded-xl w-fit text-blue-500 mb-4">
            <MousePointerClick className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-white">{totalClicks}</h3>
            <p className="text-[11px] text-slate-400 mt-1">Clics válidos (total)</p>
          </div>
        </div>

        <div className="bg-[#0F1523] border border-white/5 rounded-2xl p-4 flex flex-col justify-between">
          <div className="bg-green-500/10 p-2 rounded-xl w-fit text-green-500 mb-4">
            <Banknote className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white">{totalEarnings.toFixed(2).replace('.', ',')} US$</h3>
            <p className="text-[11px] text-slate-400 mt-1">Ganado (histórico)</p>
          </div>
        </div>

        <div className="bg-[#0F1523] border border-white/5 rounded-2xl p-4 flex flex-col justify-between">
          <div className="bg-indigo-500/10 p-2 rounded-xl w-fit text-indigo-500 mb-4">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white">$0.00</h3>
            <p className="text-[11px] text-slate-400 mt-1">eCPM real</p>
          </div>
        </div>

        <div className="bg-[#0F1523] border border-white/5 rounded-2xl p-4 flex flex-col justify-between">
          <div className="bg-purple-500/10 p-2 rounded-xl w-fit text-purple-500 mb-4">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white">$0.00</h3>
            <p className="text-[11px] text-slate-400 mt-1">Mejor mes</p>
          </div>
        </div>
      </div>

      {/* Ganancias por mes */}
      <div className="bg-[#0F1523] border border-white/5 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-6">
          <BarChart3 className="w-5 h-5 text-blue-500" />
          <h3 className="font-bold text-white">Ganancias por mes</h3>
        </div>
        <div className="text-center py-6">
          <p className="text-sm text-slate-500">Sin datos todavía.</p>
        </div>
      </div>

      {/* Dispositivos */}
      <div className="bg-[#0F1523] border border-white/5 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-6">
          <Smartphone className="w-5 h-5 text-blue-500" />
          <h3 className="font-bold text-white">Dispositivos</h3>
        </div>
        <div className="text-center py-6">
          <p className="text-sm text-slate-500">Sin clics todavía.</p>
        </div>
      </div>

      {/* Detalle por mes */}
      <div className="bg-[#0F1523] border border-white/5 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-6">
          <Calendar className="w-5 h-5 text-blue-500" />
          <h3 className="font-bold text-white">Detalle por mes</h3>
        </div>
        
        <div className="flex justify-between text-xs font-bold text-slate-400 border-b border-white/5 pb-2 mb-4">
          <span className="w-1/4">MES</span>
          <span className="w-1/4 text-center">CLICS</span>
          <span className="w-1/4 text-right">GANADO</span>
          <span className="w-1/4 text-right">ECPM</span>
        </div>
        
        <div className="text-center py-4">
          <p className="text-xs text-slate-500 leading-relaxed">
            Aún no tienes actividad. Cuando generes tus primeros clics aparecerá aquí.
          </p>
        </div>
      </div>

      {/* Navegadores */}
      <div className="bg-[#0F1523] border border-white/5 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-6">
          <Globe className="w-5 h-5 text-blue-500" />
          <h3 className="font-bold text-white">Navegadores</h3>
        </div>
        <div className="text-center py-6">
          <p className="text-sm text-slate-500">Sin clics todavía.</p>
        </div>
      </div>

    </div>
  );
}
