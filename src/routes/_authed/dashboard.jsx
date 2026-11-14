import { useState, useEffect } from "react";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { toast } from "sonner";
import ShortenCard from "@/components/naset/ShortenCard";
import LinksTable from "@/components/naset/LinksTable";
import ShortLinkResult from "@/components/naset/ShortLinkResult";
import BalanceCard from "@/components/naset/BalanceCard";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, addDoc, serverTimestamp } from "firebase/firestore";

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
  const router = useRouter();
  
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [created, setCreated] = useState(null);
  
  // Estados para los datos reales de Firestore
  const [links, setLinks] = useState([]);
  const [balance, setBalance] = useState(0);
  const [totalClicks, setTotalClicks] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [loadingData, setLoadingData] = useState(true);

  // Función para cargar los datos
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
      setBalance(tEarnings); // El saldo es igual a las ganancias por ahora
    } catch (error) {
      console.error("Error al cargar datos:", error);
      toast.error("No se pudieron cargar tus enlaces");
    } finally {
      setLoadingData(false);
    }
  };

  // Cargar datos al entrar a la página
  useEffect(() => {
    fetchData();
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!url.trim() || loading) return;
    setLoading(true);
    try {
      // Generar código aleatorio
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
      fetchData(); // Recargar la tabla
    } catch (error) {
      toast.error(error?.message || "No se pudo acortar el enlace");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async (link) => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/s/${link.short_code}`);
      toast.success("Enlace copiado");
    } catch {
      toast.error("No se pudo copiar el enlace");
    }
  };

  if (loadingData) {
    return <div className="text-center text-white mt-10">Cargando datos...</div>;
  }

  return (
    <div className="space-y-6">
      <ShortLinkResult link={created} />
      <ShortenCard url={url} onUrlChange={setUrl} onSubmit={handleSubmit} loading={loading} />
      <BalanceCard balance={balance} onRequested={fetchData} />
      <LinksTable links={links} onCopy={handleCopy} />
    </div>
  );
}
