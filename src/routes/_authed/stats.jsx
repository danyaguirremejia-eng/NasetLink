import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { db, auth } from "@/lib/firebase";
import { collection, query, where, getDocs, doc, onSnapshot } from "firebase/firestore";
import { MousePointerClick, Banknote, Globe, Trophy, BarChart3, Smartphone, Calendar } from "lucide-react";

export const Route = createFileRoute("/_authed/stats")({
  head: () => ({ meta: [{ title: "Estadísticas — NASETLINK" }] }),
  component: StatsPage,
});

function StatsPage() {
  const [loading, setLoading] = useState(true);
  const [totalClicks, setTotalClicks] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [devices, setDevices] = useState({});
  const [countries, setCountries] = useState({});

  useEffect(() => {
    if (!auth.currentUser) return;

    // Cargar enlaces para clics y ganancias
    const fetchLinks = async () => {
      try {
        const q = query(collection(db, "links"), where("userId", "==", auth.currentUser.uid));
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
    
    fetchLinks();

    // Escuchar dispositivos y países en tiempo real
    const unsub = onSnapshot(doc(db, "users", auth.currentUser.uid), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.stats) {
          setDevices(data.stats.devices || {});
          setCountries(data.stats.countries || {});
        }
      }
    });

    return () => unsub();
  }, []);

  if (loading) {
    return <div className="text-center text-white mt-10 font-bold">Cargando estadísticas...</div>;
  }

  return (
    <div className="space-y-6 pb-24">
      <div>
        <h1 className="text-3xl font-bold text-white mb-1">Estadísticas</h1>
        <p className="text-sm text-slate-400">El histórico completo de tu cuenta.</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-[#0F1523] border border-white/5 rounded-2xl p-4 flex flex-col justify-between">
          <div className="bg-blue-500/10 p-2 rounded-xl w-fit text-blue-500 mb-4"><MousePointerClick className="w-5 h-5" /></div>
          <div>
            <h3 className="text-2xl font-black text-white">{totalClicks}</h3>
            <p className="text-[11px] text-slate-400 mt-1">Clics válidos (total)</p>
          </div>
        </div>

        <div className="bg-[#0F1523] border border-white/5 rounded-2xl p-4 flex flex-col justify-between">
          <div className="bg-green-500/10 p-2 rounded-xl w-fit text-green-500 mb-4"><Banknote className="w-5 h-5" /></div>
          <div>
            <h3 className="text-xl font-black text-white">{totalEarnings.toFixed(2).replace('.', ',')} US$</h3>
            <p className="text-[11px] text-slate-400 mt-1">Ganado (histórico)</p>
          </div>
        </div>
      </div>

      <div className="bg-[#0F1523] border border-white/5 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Smartphone className="w-5 h-5 text-blue-500" />
          <h3 className="font-bold text-white">Dispositivos</h3>
        </div>
        {Object.keys(devices).length === 0 ? (
          <p className="text-sm text-slate-500 text-center py-4">Sin clics todavía.</p>
        ) : (
          <div className="space-y-3">
            {Object.entries(devices).map(([device, count]) => (
              <div key={device} className="flex justify-between items-center text-sm">
                <span className="text-slate-300">{device}</span>
                <span className="font-bold text-white bg-white/5 px-2 py-1 rounded">{count}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-[#0F1523] border border-white/5 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Globe className="w-5 h-5 text-blue-500" />
          <h3 className="font-bold text-white">Países</h3>
        </div>
        {Object.keys(countries).length === 0 ? (
          <p className="text-sm text-slate-500 text-center py-4">Sin clics todavía.</p>
        ) : (
          <div className="space-y-3">
            {Object.entries(countries).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([country, count]) => (
              <div key={country} className="flex justify-between items-center text-sm">
                <span className="text-slate-300">{country}</span>
                <span className="font-bold text-white bg-white/5 px-2 py-1 rounded">{count}</span>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
