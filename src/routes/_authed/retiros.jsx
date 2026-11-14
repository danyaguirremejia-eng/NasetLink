import { useState, useEffect } from "react";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import BalanceCard from "@/components/naset/BalanceCard";
import PayoutHistory from "@/components/naset/PayoutHistory";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { toast } from "sonner";

export const Route = createFileRoute("/_authed/retiros")({
  head: () => ({
    meta: [
      { title: "Retiros — NASETLINK" },
      { name: "description", content: "Consulta tu saldo disponible y solicita pagos por PayPal." },
    ],
  }),
  component: WithdrawalsPage,
});

function WithdrawalsPage() {
  const { user } = Route.useRouteContext();
  const router = useRouter();
  
  const [balance, setBalance] = useState(0);
  const [payouts, setPayouts] = useState([]); // Aquí guardaremos los retiros históricos
  const [loadingData, setLoadingData] = useState(true);

  const fetchData = async () => {
    if (!user) return;
    setLoadingData(true);
    try {
      // 1. Calculamos el saldo leyendo los enlaces del usuario
      const q = query(collection(db, "links"), where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);
      
      let tEarnings = 0;
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        tEarnings += data.earnings || 0;
      });

      setBalance(tEarnings);
      
      // (Nota: Aquí podrías hacer otra consulta a una colección de "payouts" 
      // si implementas el guardado de retiros en el futuro)
      setPayouts([]);

    } catch (error) {
      console.error("Error al cargar saldo:", error);
      toast.error("No se pudo cargar tu saldo");
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  if (loadingData) {
    return <div className="text-center text-white mt-10">Cargando información de retiros...</div>;
  }

  return (
    <div className="space-y-6">
      <BalanceCard balance={balance} onRequested={fetchData} />
      <PayoutHistory payouts={payouts} />
    </div>
  );
}
