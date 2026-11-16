import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase'
import { collection, query, where, getDocs, updateDoc, doc, increment, getDoc } from 'firebase/firestore'
import { Clock, Loader2, ArrowRight, ShieldCheck } from 'lucide-react'

export const Route = createFileRoute('/s/$code')({
  component: RedirectPage,
})

function RedirectPage() {
  const { code } = Route.useParams()
  const [status, setStatus] = useState("loading")
  const [linkData, setLinkData] = useState(null)
  const [timeLeft, setTimeLeft] = useState(5)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchLink = async () => {
      try {
        const q = query(collection(db, "links"), where("short_code", "==", code));
        const snap = await getDocs(q);

        if (snap.empty) {
          setError("Enlace no encontrado o eliminado.");
          setStatus("error");
          return;
        }

        const linkDoc = snap.docs[0];
        const data = linkDoc.data();
        setLinkData({ id: linkDoc.id, ...data });
        
        // Configurar los segundos del temporizador (puedes cambiarlo a 10 si quieres)
        setTimeLeft(5);
        setStatus("waiting");
      } catch (err) {
        setError("Error al procesar el enlace.");
        setStatus("error");
      }
    };
    fetchLink();
  }, [code]);

  // Lógica del temporizador
  useEffect(() => {
    if (status !== "waiting") return;
    if (timeLeft <= 0) {
      setStatus("ready");
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, status]);

  const handleContinue = async () => {
    if (!linkData) return;
    setStatus("redirecting");

    try {
      // 1. Obtener el eCPM configurado
      const settingsSnap = await getDoc(doc(db, "settings", "global"));
      let ecpmActual = 0.70; 
      if (settingsSnap.exists() && settingsSnap.data().ecpmBase) {
        ecpmActual = settingsSnap.data().ecpmBase;
      }
      const gananciaPorClic = ecpmActual / 1000;

      // 2. Sumar clic y ganancia al link
      await updateDoc(doc(db, "links", linkData.id), { 
        clicks: increment(1),
        earnings: increment(gananciaPorClic) 
      });

      // 3. Sumar ganancia al usuario
      if (linkData.userId) {
         await updateDoc(doc(db, "users", linkData.userId), {
           earnings: increment(gananciaPorClic)
         });
      }
      
      // 4. Llamar a ShrinkMe
      const apiToken = "0f4d59d395c5b5d4f2a7d86a5997f2bf2674c4b7";
      const shrinkmeUrl = `https://shrinkme.io/api?api=${apiToken}&url=${encodeURIComponent(linkData.original_url)}&alias=${linkData.short_code}`;
      
      const response = await fetch(shrinkmeUrl);
      const data = await response.json();

      if (data.status === 'success' && data.shortenedUrl) {
        window.location.href = data.shortenedUrl;
      } else {
        window.location.href = linkData.original_url;
      }
    } catch (err) {
      window.location.href = linkData.original_url;
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#0B0F19] flex flex-col items-center justify-center text-white">
        <Loader2 className="w-10 h-10 text-purple-500 animate-spin mb-4" />
        <p className="text-sm text-slate-400">Preparando tu enlace seguro...</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-screen bg-[#0B0F19] flex flex-col items-center justify-center text-white p-5 text-center">
        <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-4">
          <ShieldCheck className="w-10 h-10 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Enlace no válido</h1>
        <p className="text-slate-400">{error}</p>
      </div>
    );
  }

  // PANTALLA DE PASOS (Temporizador)
  return (
    <div className="min-h-screen bg-[#0B0F19] flex flex-col items-center justify-center text-white relative overflow-hidden px-4">
      {/* Luces de fondo */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 bg-purple-600/20 blur-[100px] rounded-full pointer-events-none"></div>
      
      <div className="relative z-10 flex flex-col items-center max-w-md w-full">
        {/* Logo */}
        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-800 rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_30px_-5px_rgba(168,85,247,0.6)]">
          <span className="font-bold text-2xl text-white">NS</span>
        </div>

        <h1 className="text-2xl font-black mb-2 text-center">Verificando enlace...</h1>
        <p className="text-slate-400 text-sm mb-10 text-center">
          Preparando <strong className="text-purple-400">{linkData?.steps || 2} pasos</strong> de seguridad. Por favor, espera.
        </p>

        {/* Temporizador Circular */}
        <div className="relative w-40 h-40 mb-10">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="80" cy="80" r="70" stroke="rgba(255,255,255,0.05)" strokeWidth="8" fill="none" />
            <circle 
              cx="80" cy="80" r="70" 
              stroke="#a855f7" strokeWidth="8" fill="none" 
              strokeDasharray="440" 
              strokeDashoffset={440 - (440 * timeLeft) / 5}
              className="transition-all duration-1000 ease-linear"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {status === "waiting" ? (
              <span className="text-5xl font-black text-white">{timeLeft}</span>
            ) : (
              <Clock className="w-12 h-12 text-purple-500 animate-pulse" />
            )}
          </div>
        </div>

        {/* Botón de Continuar */}
        <button
          onClick={handleContinue}
          disabled={status === "waiting" || status === "redirecting"}
          className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 ${
            status === "ready" 
              ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-[0_0_20px_-5px_rgba(168,85,247,0.5)]' 
              : 'bg-white/5 text-slate-500 cursor-not-allowed'
          }`}
        >
          {status === "redirecting" ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : status === "ready" ? (
            <>Continuar al destino <ArrowRight className="w-5 h-5" /></>
          ) : (
            <>Espera un momento...</>
          )}
        </button>
      </div>
    </div>
  );
}
