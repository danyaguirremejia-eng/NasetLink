import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase'
import { collection, query, where, getDocs, updateDoc, doc, increment } from 'firebase/firestore'

export const Route = createFileRoute('/s/$code')({
  component: RedirectPage,
})

function RedirectPage() {
  const { code } = Route.useParams()
  const [status, setStatus] = useState("Verificando enlace...")

  useEffect(() => {
    const redirect = async () => {
      try {
        const q = query(collection(db, "links"), where("short_code", "==", code));
        const snap = await getDocs(q);

        if (snap.empty) {
          setStatus("Enlace no encontrado o eliminado.");
          return;
        }

        const linkDoc = snap.docs[0];
        const linkData = linkDoc.data();
        const userRef = doc(db, "users", linkData.userId);

        // Detectar Dispositivo
        const ua = navigator.userAgent;
        let device = "Desktop";
        if (/android/i.test(ua)) device = "Android";
        else if (/iPad|iPhone|iPod/.test(ua)) device = "iOS";

        // Detectar País (Usando una API gratuita)
        let country = "Desconocido";
        try {
          const res = await fetch('https://ipapi.co/json/');
          const data = await res.json();
          country = data.country_name || "Desconocido";
        } catch (err) {
          console.log("No se pudo obtener el país");
        }

        // Actualizar clics en el link y en el perfil del usuario
        await updateDoc(doc(db, "links", linkDoc.id), { clicks: increment(1) });
        
        try {
          await updateDoc(userRef, {
            [`stats.devices.${device}`]: increment(1),
            [`stats.countries.${country}`]: increment(1)
          });
        } catch (e) {
            // Si el campo no existe, lo creamos (Firebase a veces requiere inicializar)
            await updateDoc(userRef, {
                stats: { devices: { [device]: 1 }, countries: { [country]: 1 } }
            });
        }

        setStatus("Redirigiendo...");
        
        setTimeout(() => {
          window.location.href = linkData.original_url; 
        }, 1500);

      } catch (error) {
        console.error(error);
        setStatus("Error al procesar el enlace.");
      }
    }

    redirect()
  }, [code])

  return (
    <div className="min-h-screen bg-[#0B0F19] flex flex-col items-center justify-center text-white">
      <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-4 animate-pulse">
        <span className="font-bold text-2xl">NS</span>
      </div>
      <h1 className="text-xl font-bold">{status}</h1>
      <p className="text-slate-500 text-sm mt-2">NASETLINK</p>
    </div>
  )
}
