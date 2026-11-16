import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { db, auth } from "@/lib/firebase";
import { collection, query, where, getDocs, addDoc, serverTimestamp, doc, getDoc, setDoc } from "firebase/firestore";
import { toast } from "sonner";
import { Wallet, Clock, Calendar, Send, CheckCircle2, Hourglass, ChevronDown, History, AlertCircle } from "lucide-react";

export const Route = createFileRoute("/_authed/retiros")({
  head: () => ({ meta: [{ title: "Retiros — NASETLINK" }] }),
  component: WithdrawalsPage,
});

function WithdrawalsPage() {
  const { user } = Route.useRouteContext();
  
  const [balance, setBalance] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [pendingAmount, setPendingAmount] = useState(0);
  const [paidAmount, setPaidAmount] = useState(0);
  const [minWithdrawal, setMinWithdrawal] = useState(5); 
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("Binance (USDT)");
  const [accountInput, setAccountInput] = useState("");
  const [isMethodOpen, setIsMethodOpen] = useState(false);
  const [requesting, setRequesting] = useState(false);

  const fetchData = async () => {
    if (!user) return;
    try {
      const q = query(collection(db, "links"), where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);
      let earnings = 0;
      querySnapshot.forEach((doc) => { earnings += doc.data().earnings || 0; });
      setTotalEarnings(earnings);

      const wq = query(collection(db, "withdrawals"), where("userId", "==", user.uid));
      const wSnap = await getDocs(wq);
      let wTotal = 0;
      let pTotal = 0;
      let paidTotal = 0;
      
      wSnap.forEach(doc => {
        const wData = doc.data();
        if (wData.status === 'pending') { pTotal += wData.amount; wTotal += wData.amount; }
        if (wData.status === 'paid') { paidTotal += wData.amount; wTotal += wData.amount; }
      });
      
      setPendingAmount(pTotal);
      setPaidAmount(paidTotal);
      setBalance(Math.max(0, earnings - wTotal));

      const settingsSnap = await getDoc(doc(db, "settings", "global"));
      if (settingsSnap.exists() && settingsSnap.data().minWithdrawal !== undefined) {
        setMinWithdrawal(Number(settingsSnap.data().minWithdrawal));
      }

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const uData = userSnap.data();
        setUserProfile(uData);
        if (uData.payoutMethod === "Binance" && method === "Binance (USDT)") {
          setAccountInput(uData.payoutAccount || "");
        } else if (uData.payoutMethod === "PayPal" && method === "PayPal") {
          setAccountInput(uData.payoutAccount || "");
        }
      }
    } catch (error) {
      console.error("Error cargando datos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [user]);

  const handleMethodSelect = (newMethod) => {
    setMethod(newMethod);
    setIsMethodOpen(false);
    
    if (userProfile) {
      if (newMethod === "Binance (USDT)" && userProfile.payoutMethod === "Binance") {
        setAccountInput(userProfile.payoutAccount || "");
      } else if (newMethod === "PayPal" && userProfile.payoutMethod === "PayPal") {
        setAccountInput(userProfile.payoutAccount || "");
      } else {
        setAccountInput(""); 
      }
    }
  };

  const handleRequest = async () => {
    const val = Number(amount);
    if (!val || val < minWithdrawal) return toast.error(`El monto mínimo es $${minWithdrawal}`);
    if (val > balance) return toast.error("No tienes saldo suficiente");
    if (!accountInput.trim()) {
      return toast.error(`Ingresa tu ${method === 'Binance (USDT)' ? 'ID o correo de Binance' : 'correo de PayPal'}`);
    }
    
    setRequesting(true);
    try {
      await setDoc(doc(db, "users", user.uid), {
        payoutMethod: method === "Binance (USDT)" ? "Binance" : "PayPal",
        payoutAccount: accountInput
      }, { merge: true });

      await addDoc(collection(db, "withdrawals"), {
        userId: user.uid, 
        amount: val, 
        method: method, 
        account: accountInput, 
        status: "pending", 
        createdAt: serverTimestamp()
      });
      
      toast.success("¡Solicitud enviada!");
      setAmount("");
      setAccountInput(""); 
      fetchData(); 
    } catch (error) {
      toast.error("Error al procesar el retiro");
    } finally {
      setRequesting(false);
    }
  };

  if (loading) return <div className="text-center text-white mt-10 font-bold">Cargando datos...</div>;

  return (
    <div className="space-y-6 pb-24">
      <div>
        <h1 className="text-3xl font-black text-white mb-2 tracking-tight">Retiros</h1>
        <p className="text-sm text-slate-400">Retira tus ganancias de forma rápida y segura.</p>
        <div className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full mt-3 text-xs font-semibold text-slate-300 backdrop-blur-md">
          <Clock className="w-3.5 h-3.5 text-purple-400" /> Abre el día 1 del próximo mes
        </div>
      </div>

      <div className="bg-gradient-to-br from-purple-700 via-indigo-800 to-blue-900 rounded-3xl p-6 shadow-2xl relative overflow-hidden text-white border border-white/10">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
        <div className="flex items-center gap-2 text-purple-100 mb-3 relative z-10"><Wallet className="w-5 h-5" /><span className="text-sm font-medium">Disponible para retirar</span></div>
        <h2 className="text-5xl font-black mb-6 relative z-10">{balance.toFixed(2).replace('.', ',')} US$</h2>
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 bg-black/20 border border-white/10 px-4 py-2 rounded-xl text-xs font-medium backdrop-blur-sm">
            <span className="bg-white/20 w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px]">i</span> Mínimo ${minWithdrawal.toFixed(2)}
          </div>
          <br/>
          <div className="inline-flex items-center gap-2 bg-black/20 border border-white/10 px-4 py-2 rounded-xl text-xs font-medium backdrop-blur-sm">
            <Calendar className="w-3.5 h-3.5" /> Este mes llevas {totalEarnings.toFixed(2).replace('.', ',')} US$
          </div>
        </div>
      </div>

      <div className="bg-[#0F1523]/60 backdrop-blur-xl border border-white/5 rounded-3xl p-6 shadow-lg">
        <h3 className="font-bold text-white mb-5">Resumen</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b border-white/5 pb-4">
            <div className="flex items-center gap-3"><div className="bg-yellow-500/10 p-2.5 rounded-xl text-yellow-500"><Hourglass className="w-5 h-5" /></div><span className="text-sm text-slate-300">En proceso</span></div>
            <span className="font-bold text-sm text-white">{pendingAmount.toFixed(2).replace('.', ',')} US$</span>
          </div>
          <div className="flex justify-between items-center border-b border-white/5 pb-4">
            <div className="flex items-center gap-3"><div className="bg-green-500/10 p-2.5 rounded-xl text-green-500"><CheckCircle2 className="w-5 h-5" /></div><span className="text-sm text-slate-300">Total cobrado</span></div>
            <span className="font-bold text-sm text-white">{paidAmount.toFixed(2).replace('.', ',')} US$</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3"><div className="bg-purple-500/10 p-2.5 rounded-xl text-purple-500"><Wallet className="w-5 h-5" /></div><span className="text-sm text-slate-300">Total ganado</span></div>
            <span className="font-bold text-sm text-white">{totalEarnings.toFixed(2).replace('.', ',')} US$</span>
          </div>
        </div>
      </div>

      <div className="bg-[#0F1523]/60 backdrop-blur-xl border border-white/5 rounded-3xl p-6 shadow-lg space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">Monto a retirar</label>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">$</span>
              <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" className="w-full bg-black/30 border border-white/10 rounded-2xl py-3.5 pl-9 pr-4 text-white outline-none focus:border-purple-500 font-medium" />
            </div>
            <button onClick={handleRequest} disabled={requesting} className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-6 rounded-2xl flex items-center gap-2 transition disabled:opacity-50 shadow-[0_0_15px_-5px_rgba(168,85,247,0.5)]">
              <Send className="w-4 h-4" /> {requesting ? "..." : "Pedir"}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">Método de pago</label>
          <div className="relative">
            <button type="button" onClick={() => setIsMethodOpen(!isMethodOpen)} className="w-full flex items-center justify-between bg-black/30 border border-white/10 rounded-2xl py-3.5 px-5 text-white outline-none focus:border-purple-500 font-medium transition-colors">
              {method} <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isMethodOpen ? 'rotate-180' : ''}`} />
            </button>
            {isMethodOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#0F1523] border border-white/10 rounded-2xl overflow-hidden z-50 shadow-2xl">
                <button type="button" onClick={() => handleMethodSelect("Binance (USDT)")} className={`w-full text-left px-5 py-4 text-sm font-medium transition-colors hover:bg-white/5 ${method === "Binance (USDT)" ? "text-purple-400 bg-purple-500/5" : "text-slate-300"}`}>Binance (USDT)</button>
                <button type="button" onClick={() => handleMethodSelect("PayPal")} className={`w-full text-left px-5 py-4 text-sm font-medium transition-colors hover:bg-white/5 ${method === "PayPal" ? "text-purple-400 bg-purple-500/5" : "text-slate-300"}`}>PayPal</button>
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">
            {method === 'Binance (USDT)' ? 'ID o correo de Binance' : 'Correo de PayPal'}
          </label>
          <input 
            type="text" 
            value={accountInput} 
            onChange={(e) => setAccountInput(e.target.value)} 
            placeholder={method === 'Binance (USDT)' ? "Ej: 123456789 o correo@binance.com" : "tucorreo@paypal.com"} 
            className="w-full bg-black/30 border border-white/10 rounded-2xl py-3.5 px-5 text-white outline-none focus:border-purple-500 font-medium" 
          />
          {!accountInput && (
            <p className="text-[10px] text-yellow-500 mt-2 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> 
              Debes ingresar tu cuenta para recibir el pago.
            </p>
          )}
        </div>
      </div>

      <div className="bg-[#0F1523]/60 backdrop-blur-xl border border-white/5 rounded-3xl p-6 shadow-lg text-center">
        <div className="flex items-center gap-2 mb-4 justify-center"><History className="w-5 h-5 text-purple-500" /><h3 className="font-bold text-white">Historial</h3></div>
        <p className="text-sm text-slate-500 py-6">Aún no tienes retiros.</p>
      </div>
    </div>
  );
}
