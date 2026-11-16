import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase'
import { collection, query, where, getDocs, updateDoc, doc, increment } from 'firebase/firestore'

export const Route = createFileRoute('/s/$code')({
  component: RedirectPage,
})

function RedirectPage() {
  const { code } = Route.useParams()
  const [status, setStatus] = useState("Preparando tu enlace seguro...")

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
        
        setStatus("Generando pasos de seguridad...");
        
        const apiToken = "773d3c79ed712d7b6faf6f568293fd7d84e93fad";
        // Le pasamos nuestro propio código (alias) a GPLinks para que nos avise cuando gane dinero
        const gplinksUrl = `https://api.gplinks.com/api?api=${apiToken}&url=${encodeURIComponent(linkData.original_url)}&alias=${linkData.short_code}`;
        
        const response = await fetch(gplinksUrl);
        const data = await response.json();

        if (data.status === 'success' && data.shortenedUrl) {
          setStatus("Redirigiendo...");
          // SOLO SUMAMOS EL CLIC AQUÍ (las ganancias las suma GPLinks después)
          await updateDoc(doc(db, "links", linkDoc.id), { clicks: increment(1) });
          
          setTimeout(() => {
            window.location.href = data.shortenedUrl;
          }, 800);
        } else {
          console.log("Error GPLinks:", data);
          window.location.href = linkData.original_url;
        }

      } catch (error) {
        console.error(error);
        setStatus(`Error: ${error.message}`);
      }
    }

    redirect()
  }, [code])

  return (
    <div className="min-h-screen bg-[#0B0F19] flex flex-col items-center justify-center text-white px-4 text-center">
      <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mb-4 animate-pulse">
        <span className="font-bold text-2xl">NS</span>
      </div>
      <h1 className="text-xl font-bold max-w-xs">{status}</h1>
      <p className="text-slate-500 text-sm mt-2">NASETLINK</p>
    </div>
  )
}
