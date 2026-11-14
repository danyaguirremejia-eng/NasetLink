import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import ShortenCard from "@/components/naset/ShortenCard";
import LinksTable from "@/components/naset/LinksTable";
import ShortLinkResult from "@/components/naset/ShortLinkResult";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import { Home, Zap, BarChart2, QrCode, MoreHorizontal, Clock, MessageCircle, Bell, Flame, Smartphone, TrendingUp, Wallet, Hourglass, Award, Gift, Copy, Trophy, X } from "lucide-react";

export const Route = createFileRoute("/_authed/dashboard")({
  head: () => ({
    meta: [
      { title: "Panel — DNLINK" },
      { name: "description", content: "Acorta tus enlaces, comparte y gana dinero." },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const { user } = Route.useRouteContext();

  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [created, setCreated] = useState(null);
  const [links, setLinks] = useState([]);
  const [balance, setBalance] = useState(0);
  const [totalClicks, setTotalClicks] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [loadingData, setLoadingData] = useState(true);
  
  // Estados para cerrar banners
  const [showPromo, setShowPromo] = useState(true);
  const [showInstall, setShowInstall] = useState(true);

  const fetchData = async () => {
    if (!user) return;
    setLoadingData(true);
    try {
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
    } catch (error) {
      console.error("Error al cargar datos:", error);
      toast.error("No se pudieron cargar tus enlaces");
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!url.trim() || loading) return;
    setLoading(true);
    try {
      const chars = "abcdefghijkmnpqrstuvwxyz23456789";
      let code = "";
      for (let i = 0; i < 7; i++) code += chars[Math.floor(Math.random() * chars.length)];

      const docRef = await addDoc(collection(db, "links"), {
        original_url: url,
        short_code: code,
        clicks: 0,
        earnings: 0,
        userId: user.uid,
        createdAt: serverTimestamp()
      });

      const newLink = { id: docRef.id, original_url: url, short_code: code, clicks: 0, earnings: 0 };
      setCreated(newLink);
      setUrl("");
      fetchData();
    } catch (error) {
      toast.error(error?.message || "No se pudo acortar el enlace");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copiado al portapapeles");
    } catch {
      toast.error("No se pudo copiar");
    }
  };

  const getSaludo = () => {
    const hora = new Date().getHours();
    if (hora >= 6 && hora < 12) return "Buenos días";
    if (hora >= 12 && hora < 20) return "Buenas tardes";
    return "Buenas noches";
  };

  const nombreUsuario = user?.displayName?.split(" ")[0] || user?.email?.split("@")[0] || "Dany";

  if (loadingData) {
    return <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center text-white font-bold">Cargando DNLINK...</div>;
  }

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white pb-24 font-sans selection:bg-blue-500/30">
      {/* Top Bar */}
      <header className="sticky top-0 z-40 bg-[#0B0F19]/80 backdrop-blur-md border-b border-white/5 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl font-black tracking-tighter">DN<span className="text-blue-500">LINK</span></span>
          <div className="flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/20 px-2 py-1 rounded-full text-xs font-semibold">
            <Flame className="w-3.5 h-3.5 text-blue-500" />
            <span>Racha 0/9</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-300 bg-white/5 px-2.5 py-1.5 rounded-full">
            <Clock className="w-3.5 h-3.5 text-blue-400" />
            <span>{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
          </div>
          <button className="relative p-2 text-slate-400 hover:text-white transition">
            <MessageCircle className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-green-500 rounded-full border-2 border-[#0B0F19]"></span>
          </button>
          <button className="p-2 text-slate-400 hover:text-white transition">
            <Bell className="w-5 h-5" />
          </button>
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold border border-white/10 uppercase">
            {nombreUsuario[0]}
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 pt-4 space-y-6">
        {/* Promo Banner */}
        {showPromo && (
          <div className="relative bg-[#0F1523] border border-green-500/20 rounded-2xl p-4 flex items-start gap-4">
            <div className="bg-green-500/10 p-2 rounded-xl text-green-500 shrink-0">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-sm mb-1 text-white">Entra al grupo oficial de DNLINK</h3>
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

        {/* Greeting */}
        <div>
          <h1 className="text-3xl font-black tracking-tight">
            {getSaludo()}, {nombreUsuario} 👋
          </h1>
          <p className="text-slate-400 text-sm mt-1">Este es el pulso de tu cuenta.</p>
        </div>

        {/* Install Banner */}
        {showInstall && (
          <div className="relative bg-[#0F1523] border border-white/5 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-500/10 p-2.5 rounded-xl text-blue-500">
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-white">Instala DNLINK en tu celular</h3>
                <p className="text-xs text-slate-400 mt-0.5 max-w-[170px] leading-snug">Ícono propio, abre sin navegador y carga más rápido.</p>
              </div>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 px-3 rounded-lg flex items-center gap-1.5 transition">
              <Smartphone className="w-3.5 h-3.5" /> Instalar
            </button>
            <button onClick={() => setShowInstall(false)} className="text-slate-500 hover:text-white p-1 absolute top-2 right-2">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Formulario real para crear enlaces */}
        <ShortLinkResult link={created} />
        <ShortenCard url={url} onUrlChange={setUrl} onSubmit={handleSubmit} loading={loading} />

        {/* Resumen */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
            <h2 className="font-bold text-lg text-white">Resumen</h2>
          </div>

          {/* Balance Card */}
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
        
        {/* Pending */}
        <div className="bg-[#0F1523] border border-white/5 rounded-2xl p-5 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-slate-400 mb-1">
              <Hourglass className="w-4 h-4 text-blue-500" />
              <span className="text-sm">Pendiente</span>
            </div>
            <h3 className="text-4xl font-black">$0.00</h3>
            <span className="text-xs text-slate-500 flex items-center gap-1 mt-1"><Clock className="w-3 h-3" /> En proceso</span>
          </div>
          <div className="bg-white/5 rounded-xl px-4 py-2 text-right">
            <p className="text-xs text-slate-400 mb-1">Total ganado</p>
            <p className="font-bold text-lg">${totalEarnings.toFixed(2)}</p>
          </div>
        </div>

        {/* Level Card */}
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
              <span className="text-3xl font-black">{totalClicks} <span className="text-lg text-slate-500 font-medium">/ 300</span></span>
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

        {/* Stats */}
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
            <h4 className="text-lg font-black">${totalEarnings.toFixed(2)}</h4>
            <p className="text-[10px] text-slate-400 mt-0.5">Ganancias</p>
          </div>
          <div className="bg-[#0F1523] border border-white/5 rounded-2xl p-3">
            <div className="bg-blue-500/10 p-1.5 rounded-lg w-fit mb-2"><TrendingUp className="w-4 h-4 text-blue-500" /></div>
            <h4 className="text-lg font-black">{totalClicks}</h4>
            <p className="text-[10px] text-slate-400 mt-0.5">Clics</p>
          </div>
          <div className="bg-[#0F1523] border border-white/5 rounded-2xl p-3">
            <div className="bg-blue-500/10 p-1.5 rounded-lg w-fit mb-2"><TrendingUp className="w-4 h-4 text-blue-500" /></div>
            <h4 className="text-lg font-black">$17.50</h4>
            <p className="text-[10px] text-slate-400 mt-0.5">eCPM</p>
          </div>
        </div>

        {/* Tabla de enlaces real */}
        <LinksTable links={links} onCopy={() => handleCopy(`${window.location.origin}/s/${links.short_code}`)} />

        {/* Meta Section */}
        <div className="bg-[#0F1523] border border-white/5 rounded-2xl p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="bg-blue-500/10 p-2 rounded-xl"><TrendingUp className="w-5 h-5 text-blue-500" /></div>
            <h3 className="font-bold text-lg text-white">Meta del mes</h3>
          </div>
          <p className="text-sm text-slate-400 mb-2">Define tu meta del mes</p>
          <p className="text-xs text-slate-500 mb-4">Sugerida: <strong className="text-slate-300">$5.00</strong> (un 25% más que tu mes pasado)</p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2.5 px-6 rounded-xl transition">Poner meta</button>
        </div>

        {/* Invita y gana */}
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
            onClick={() => handleCopy(`${window.location.origin}/register?ref=${user?.uid}`)}
            className="bg-white/10 hover:bg-white/20 text-white p-2.5 rounded-lg transition flex items-center gap-2 text-xs font-bold"
          >
            <Copy className="w-4 h-4" /> Copiar
          </button>
        </div>

      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#0F1523]/90 backdrop-blur-lg border-t border-white/10 pb-safe z-50">
        <div className="max-w-md mx-auto flex justify-around items-center p-2">
          <button className="flex flex-col items-center gap-1 text-blue-500">
            <div className="bg-blue-500 text-white p-2 rounded-full shadow-lg shadow-blue-500/30">
              <Home className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold">Inicio</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-white transition">
            <Zap className="w-5 h-5" />
            <span className="text-[10px]">Links</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-white transition">
            <BarChart2 className="w-5 h-5" />
            <span className="text-[10px]">Stats</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-white transition">
            <QrCode className="w-5 h-5" />
            <span className="text-[10px]">QR</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-white transition">
            <MoreHorizontal className="w-5 h-5" />
            <span className="text-[10px]">Más</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
