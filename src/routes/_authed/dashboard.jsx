import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import LinksTable from "@/components/naset/LinksTable";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, doc, getDoc, setDoc } from "firebase/firestore";
import { Clock, MessageCircle, TrendingUp, Wallet, Hourglass, Award, Gift, Copy, X, Flame } from "lucide-react";

export const Route = createFileRoute("/_authed/dashboard")({
  head: () => ({
    meta: [
      { title: "Panel — NASETLINK" },
      { name: "description", content: "Acorta tus enlaces, comparte y gana dinero." },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const { user } = Route.useRouteContext();

  const [links, setLinks] = useState([]);
  const [balance, setBalance] = useState(0);
  const [totalClicks, setTotalClicks] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [loadingData, setLoadingData] = useState(true);
  
  const [showPromo, setShowPromo] = useState(true);

  // Estados para la meta
  const [meta, setMeta] = useState(0);
  const [showMetaModal, setShowMetaModal] = useState(false);
  const [metaInput, setMetaInput] = useState("");

  const fetchData = async () => {
    if (!user) return;
    setLoadingData(true);
    try {
      // 1. Cargar enlaces
      const q = query(collection(db, "links"), where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);

      let fetchedLinks = [];
      let tClicks = 0;
      let tEarnings = 0;

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        fetchedLinks.push({ id: doc.id, ...data });
        tClicks += data.clicks || 0;
        tEarnings += data.earnings || 0;
      });

      setLinks(fetchedLinks.reverse());
      setTotalClicks(tClicks);
      setTotalEarnings(tEarnings);
      setBalance(tEarnings);

      // 2. Cargar meta del usuario
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists() && userSnap.data().metaMensual) {
        setMeta(userSnap.data().metaMensual);
      }

    } catch (error) {
      console.error("Error al cargar datos:", error);
      toast.error("No se pudieron cargar los datos");
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copiado al portapapeles");
    } catch {
      toast.error("No se pudo copiar");
    }
  };

  const handleSaveMeta = async () => {
    const val = Number(metaInput);
    if (!val || val <= 0) return toast.error("Ingresa un valor válido");
    try {
      await setDoc(doc(db, "users", user.uid), { metaMensual: val }, { merge: true });
      setMeta(val);
      setShowMetaModal(false);
      setMetaInput("");
      toast.success("¡Meta guardada!");
    } catch (err) {
      toast.error("Error al guardar la meta");
    }
  };

  const getSaludo = () => {
    const hora = new Date().getHours();
    if (hora >= 6 && hora < 12) return "Buenos días";
    if (hora >= 12 && hora < 20) return "Buenas tardes";
    return "Buenas noches";
  };

  const nombreUsuario = user?.displayName?.split(" ")[0] || user?.email?.split("@")[0] || "Usuario";
  const domain = window.location.origin;

  if (loadingData) {
    return <div className="text-center text-white mt-10 font-bold">Cargando NASETLINK...</div>;
  }

  return (
    <div className="space-y-6 pb-6 relative">
      
      {showMetaModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[#0F1523] border border-white/10 rounded-3xl p-6 w-full max-w-sm shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-2">Definir meta</h3>
            <p className="text-sm text-slate-400 mb-4">¿Cuál es tu meta de ganancias este mes? (USD)</p>
            <input 
              type="number" 
              value={metaInput}
              onChange={(e) => setMetaInput(e.target.value)}
              placeholder="Ej. 50"
              className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-white mb-6 outline-none focus:border-blue-500"
            />
            <div className="flex gap-3">
              <button onClick={() => setShowMetaModal(false)} className="flex-1 py-3 text-sm font-bold text-slate-300 bg-white/5 hover:bg-white/10 rounded-xl transition">Cancelar</button>
              <button onClick={handleSaveMeta} className="flex-1 py-3 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition">Aceptar</button>
            </div>
          </div>
        </div>
      )}

      {showPromo && (
        <div className="relative bg-[#0F1523] border border-green-500/20 rounded-2xl p-4 flex items-start gap-4">
          <div className="bg-green-500/10 p-2 rounded-xl text-green-500 shrink-0">
            <MessageCircle className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-sm mb-1 text-white">Entra al grupo oficial de NASETLINK</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Ahí avisamos los pagos, los cambios de eCPM y los sorteos <strong className="text-white">antes que en ningún lado</strong>.
            </p>
            <a href="#" className="bg-green-500 hover:bg-green-600 text-white text-sm font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition w-full max-w-[200px]">
              <MessageCircle className="w-4 h-4" /> Unirme ahora
            </a>
          </div>
          <button onClick={() => setShowPromo(false)} className="text-slate-500 hover:text-white p-1 absolute top-3 right-3">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div>
        <h1 className="text-3xl font-black tracking-tight text-white">
          {getSaludo()}, {nombreUsuario} 👋
        </h1>
        <p className="text-slate-400 text-sm mt-1">Este es el pulso de tu cuenta.</p>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
          <h2 className="font-bold text-lg text-white">Resumen</h2>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-5 shadow-lg relative overflow-hidden mb-4">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2 text-blue-100">
              <Wallet className="w-4 h-4" />
              <span className="text-sm font-medium">Tu saldo</span>
            </div>
            <span className="bg-white/20 text-white text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-sm">Noviembre</span>
          </div>
          <h3 className="text-5xl font-black mb-4">${balance.toFixed(2)}</h3>
          <div className="space-y-2 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-blue-100 flex items-center gap-1.5"><TrendingUp className="w-4 h-4" /> Generado este mes</span>
              <span className="font-semibold">${totalEarnings.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-blue-100 flex items-center gap-1.5"><Wallet className="w-4 h-4" /> Puedes retirar ya</span>
              <span className="font-semibold">${balance.toFixed(2)}</span>
            </div>
          </div>
          <button className="bg-white text-blue-700 font-bold text-sm py-2 px-4 rounded-xl flex items-center gap-2 hover:bg-blue-50 transition">
            <Wallet className="w-4 h-4" /> Retirar
          </button>
        </div>
      </div>
      
      <div className="bg-[#0F1523] border border-white/5 rounded-2xl p-5 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-slate-400 mb-1">
            <Hourglass className="w-4 h-4 text-blue-500" />
            <span className="text-sm">Pendiente</span>
          </div>
          <h3 className="text-4xl font-black text-white">$0.00</h3>
          <span className="text-xs text-slate-500 flex items-center gap-1 mt-1"><Clock className="w-3 h-3" /> En proceso</span>
        </div>
        <div className="bg-white/5 rounded-xl px-4 py-2 text-right">
          <p className="text-xs text-slate-400 mb-1">Total ganado</p>
          <p className="font-bold text-lg text-white">${totalEarnings.toFixed(2)}</p>
        </div>
      </div>

      <div className="bg-[#0F1523] border border-white/5 rounded-2xl p-5">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-orange-500/10 p-2 rounded-xl text-orange-500 border border-orange-500/20">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400">Tu nivel · Bronce</p>
              <p className="font-bold text-lg text-white">LEVEL 1</p>
            </div>
          </div>
          <div className="bg-white/5 rounded-xl px-3 py-2 text-center border border-white/5">
            <div className="flex items-center justify-center gap-1 text-xs text-slate-400 mb-0.5">
              <Flame className="w-3 h-3 text-blue-500" /> RACHA
            </div>
            <p className="font-bold text-sm text-white">Día 1/9</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Hoy llevas</span>
            <span className="text-slate-400">Para subir a <strong className="text-white">LEVEL 1</strong></span>
          </div>
          <div className="flex justify-between items-end">
            <span className="text-3xl font-black text-white">{totalClicks} <span className="text-lg text-slate-500 font-medium">/ 300</span></span>
            <span className="text-xs text-slate-400 font-medium">300/día × 9 días</span>
          </div>
          <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
            <div className="bg-blue-500 h-full rounded-full" style={{ width: `${Math.min((totalClicks/300)*100, 100)}%` }}></div>
          </div>
          <p className="text-xs text-slate-400 mt-2">Te faltan <strong className="text-white">{Math.max(300 - totalClicks, 0)}</strong> clics válidos antes de las 12:00 AM</p>
        </div>
        
        <div className="flex gap-1.5 mt-4">
          {[1,2,3,4,5,6,7,8,9].map(i => (
            <div key={i} className={`flex-1 aspect-square flex items-center justify-center rounded-lg border text-xs font-bold ${i === 1 ? 'border-blue-500 bg-blue-500/10 text-blue-400' : 'border-white/10 bg-white/5 text-slate-500'}`}>
              {i}
            </div>
          ))}
        </div>
        <div className="mt-4 bg-white/5 rounded-lg p-2 text-center text-xs text-slate-400">
          Falla <strong className="text-white">1 día</strong> – racha completa perdida · nunca bajas de nivel
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 bg-[#0F1523] p-1 rounded-xl border border-white/5">
        {['Hoy', 'Ayer', 'Este mes', 'Mes ant.'].map((tab, i) => (
          <button key={tab} className={`py-2 text-[11px] font-semibold rounded-lg ${i === 0 ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}>
            {tab}
          </button>
        ))}
      </div>
      
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-[#0F1523] border border-white/5 rounded-2xl p-3">
          <div className="bg-blue-500/10 p-1.5 rounded-lg w-fit mb-2"><Wallet className="w-4 h-4 text-blue-500" /></div>
          <h4 className="text-lg font-black text-white">${totalEarnings.toFixed(2)}</h4>
          <p className="text-[10px] text-slate-400 mt-0.5">Ganancias</p>
        </div>
        <div className="bg-[#0F1523] border border-white/5 rounded-2xl p-3">
          <div className="bg-blue-500/10 p-1.5 rounded-lg w-fit mb-2"><TrendingUp className="w-4 h-4 text-blue-500" /></div>
          <h4 className="text-lg font-black text-white">{totalClicks}</h4>
          <p className="text-[10px] text-slate-400 mt-0.5">Clics</p>
        </div>
        <div className="bg-[#0F1523] border border-white/5 rounded-2xl p-3">
          <div className="bg-blue-500/10 p-1.5 rounded-lg w-fit mb-2"><TrendingUp className="w-4 h-4 text-blue-500" /></div>
          <h4 className="text-lg font-black text-white">$17.50</h4>
          <p className="text-[10px] text-slate-400 mt-0.5">eCPM</p>
        </div>
      </div>

      <LinksTable links={links} onCopy={() => handleCopy(`${domain}/s/${links.short_code}`)} />

      <div className="bg-[#0F1523] border border-white/5 rounded-2xl p-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="bg-blue-500/10 p-2 rounded-xl"><TrendingUp className="w-5 h-5 text-blue-500" /></div>
          <h3 className="font-bold text-lg text-white">Meta del mes</h3>
        </div>
        
        {meta > 0 ? (
          <div className="mb-4">
            <p className="text-sm text-slate-400 mb-1">Tu meta actual</p>
            <p className="text-3xl font-black text-blue-500">${meta.toFixed(2)}</p>
            <button onClick={() => { setMetaInput(meta); setShowMetaModal(true); }} className="mt-3 text-xs text-slate-400 hover:text-white underline">Editar meta</button>
          </div>
        ) : (
          <>
            <p className="text-sm text-slate-400 mb-2">Define tu meta del mes</p>
            <p className="text-xs text-slate-500 mb-4">Sugerida: <strong className="text-slate-300">$5.00</strong> (un 25% más que tu mes pasado)</p>
            <button onClick={() => setShowMetaModal(true)} className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2.5 px-6 rounded-xl transition">Poner meta</button>
          </>
        )}
      </div>

      <div className="bg-[#0F1523] border border-white/5 rounded-2xl p-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-pink-500/10 p-2.5 rounded-xl text-pink-500">
            <Gift className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white">Invita y gana</h3>
            <p className="text-xs text-slate-400 mt-0.5">Comisión durante 6 meses.</p>
          </div>
        </div>
        <button 
          onClick={() => handleCopy(`${domain}/register?ref=${user?.uid}`)}
          className="bg-white/10 hover:bg-white/20 text-white p-2.5 rounded-lg transition flex items-center gap-2 text-xs font-bold shrink-0"
        >
          <Copy className="w-4 h-4" /> Copiar
        </button>
      </div>
      
      <div className="text-center text-[10px] text-slate-600 font-mono pb-4">
        NASETLINK build 32
      </div>

    </div>
  );
}
