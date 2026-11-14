import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "sonner";
import { Wallet, Clock, Calendar, Send, CheckCircle2, Hourglass, ChevronDown, History } from "lucide-react";

export const Route = createFileRoute("/_authed/retiros")({
  head: () => ({
    meta: [{ title: "Retiros — NASETLINK" }],
  }),
  component: WithdrawalsPage,
});

function WithdrawalsPage() {
  const { user } = Route.useRouteContext();
  
  const [balance, setBalance] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [loading, setLoading] = useState(true);
  
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("Binance (USDT)");
  const [requesting, setRequesting] = useState(false);

  useEffect(() => {
    const fetchBalance = async () => {
      if (!user) return;
      try {
        const q = query(collection(db, "links"), where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        let earnings = 0;
        querySnapshot.forEach((doc) => {
          earnings += doc.data().earnings || 0;
        });
        setTotalEarnings(earnings);
        setBalance(earnings); // Asumiendo que todo lo ganado está disponible
      } catch (error) {
        console.error("Error cargando balance:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBalance();
  }, [user]);

  const handleRequest = async () => {
    const val = Number(amount);
    if (!val || val < 5) return toast.error("El monto mínimo es $5.00");
    if (val > balance) return toast.error("No tienes saldo suficiente");
    
    setRequesting(true);
    try {
      await addDoc(collection(db, "withdrawals"), {
        userId: user.uid,
        amount: val,
        method: method,
        status: "pending",
        createdAt: serverTimestamp()
      });
      toast.success("¡Solicitud de retiro enviada!");
      setAmount("");
    } catch (error) {
      console.error(error);
      toast.error("Error al procesar el retiro");
    } finally {
      setRequesting(false);
    }
  };

  if (loading) {
    return <div className="text-center text-white mt-10 font-bold">Cargando datos...</div>;
  }

  return (
    <div className="space-y-6 pb-24">
      
      {/* Encabezado */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-1">Retiros</h1>
        <p className="text-sm text-slate-400">Retira lo de meses anteriores del 1 al 5. Lo de este mes se libera el próximo.</p>
        <div className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full mt-3 text-xs font-semibold text-slate-300">
          <Clock className="w-3.5 h-3.5" /> Abre el día 1 del próximo mes
        </div>
      </div>

      {/* Tarjeta de Saldo */}
      <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-red-500 rounded-3xl p-6 shadow-lg relative overflow-hidden text-white">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
        <div className="flex items-center gap-2 text-white/90 mb-2">
          <Wallet className="w-5 h-5" />
          <span className="text-sm font-medium">Disponible para retirar</span>
        </div>
        <h2 className="text-5xl font-black mb-5">{balance.toFixed(2).replace('.', ',')} US$</h2>
        
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-black/20 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm">
            <span className="bg-white/20 w-4 h-4 rounded-full flex items-center justify-center font-bold text-[10px]">i</span>
            Mínimo $5.00
          </div>
          <br/>
          <div className="inline-flex items-center gap-2 bg-black/20 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm">
            <span className="text-sm">🏛️</span> Banco de mi país: mínimo $50.00
          </div>
          <br/>
          <div className="inline-flex items-center gap-2 bg-black/20 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm">
            <Calendar className="w-3.5 h-3.5" /> Este mes llevas {totalEarnings.toFixed(2).replace('.', ',')} US$ · lo cobras el próximo
          </div>
        </div>
      </div>

      {/* Resumen */}
      <div className="bg-[#0F1523] border border-white/5 rounded-2xl p-5">
        <h3 className="font-bold text-white mb-4">Resumen</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b border-white/5 pb-3">
            <div className="flex items-center gap-3">
              <div className="bg-yellow-500/10 p-2 rounded-lg text-yellow-500"><Hourglass className="w-4 h-4" /></div>
              <span className="text-sm text-slate-300">En proceso</span>
            </div>
            <span className="font-bold text-sm text-white">0,00 US$</span>
          </div>
          <div className="flex justify-between items-center border-b border-white/5 pb-3">
            <div className="flex items-center gap-3">
              <div className="bg-green-500/10 p-2 rounded-lg text-green-500"><CheckCircle2 className="w-4 h-4" /></div>
              <span className="text-sm text-slate-300">Total cobrado</span>
            </div>
            <span className="font-bold text-sm text-white">0,00 US$</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-blue-500/10 p-2 rounded-lg text-blue-500"><Wallet className="w-4 h-4" /></div>
              <span className="text-sm text-slate-300">Total ganado</span>
            </div>
            <span className="font-bold text-sm text-white">{totalEarnings.toFixed(2).replace('.', ',')} US$</span>
          </div>
        </div>
      </div>

      {/* Calendario */}
      <div className="bg-[#0F1523] border border-white/5 rounded-2xl p-5">
        <div className="flex gap-4 mb-4">
          <div className="bg-blue-500/10 p-2.5 rounded-xl text-blue-500 shrink-0 h-fit">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-white text-sm">Retiros del 15 de octubre al 14 de noviembre</h3>
            <p className="text-xs text-slate-400 mt-1">El pago llega del 15 al 20 de noviembre · 0 día(s) para cerrar</p>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 bg-white/5 p-3 rounded-xl text-xs text-slate-300">
            <span className="bg-blue-500 text-white w-5 h-5 rounded flex items-center justify-center font-bold shrink-0">1</span>
            Pides el <strong className="text-white">1 y el 2</strong> · el pago llega del <strong className="text-white">1 al 5</strong>.
          </div>
          <div className="flex items-center gap-2 bg-white/5 p-3 rounded-xl text-xs text-slate-300">
            <span className="bg-blue-500 text-white w-5 h-5 rounded flex items-center justify-center font-bold shrink-0">2</span>
            Pides <strong className="text-white">del 15 al 14</strong> · el pago llega del <strong className="text-white">15 al 20</strong>.
          </div>
        </div>

        <p className="text-[10px] text-slate-500 flex items-start gap-1.5">
          <Clock className="w-3.5 h-3.5 shrink-0 mt-0.5" /> Todo con la hora de Venezuela (UTC-4): cuando allí son las 12 de la noche, cambia el día para todos.
        </p>
      </div>

      {/* Formulario */}
      <div className="bg-[#0F1523] border border-white/5 rounded-2xl p-5 space-y-4">
        <div>
          <label className="block text-xs text-slate-400 mb-2">Monto a retirar</label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-bold">$</span>
              <input 
                type="number" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-8 pr-4 text-white outline-none focus:border-blue-500 font-medium"
              />
            </div>
            <button 
              onClick={handleRequest}
              disabled={requesting}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 rounded-xl flex items-center gap-2 transition disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              {requesting ? "..." : "Pedir"}
            </button>
          </div>
        </div>

        <div>
          <div className="relative">
            <select 
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 text-white outline-none focus:border-blue-500 appearance-none font-medium"
            >
              <option value="Binance (USDT)">Binance (USDT)</option>
              <option value="PayPal">PayPal</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Historial */}
      <div className="bg-[#0F1523] border border-white/5 rounded-2xl p-5 text-center">
        <div className="flex items-center gap-2 mb-4">
          <History className="w-5 h-5 text-blue-500" />
          <h3 className="font-bold text-white">Historial</h3>
        </div>
        <p className="text-sm text-slate-500 py-6">Aún no tienes retiros.</p>
      </div>

    </div>
  );
}
