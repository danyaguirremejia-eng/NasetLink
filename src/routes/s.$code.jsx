import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase'
import { collection, query, where, getDocs, updateDoc, doc, increment, getDoc } from 'firebase/firestore'

export const Route = createFileRoute('/s/$code')({
  component: RedirectPage,
})

function RedirectPage() {
  const { code } = Route.useParams()
  const [status, setStatus] = useState("Preparando tu enlace seguro...")

  useEffect(() => {
    const redirect = async () => {
      try {
        // 1. Buscar el link
        const q = query(collection(db, "links"), where("short_code", "==", code));
        const snap = await getDocs(q);

        if (snap.empty) {
          setStatus("Enlace no encontrado o eliminado.");
          return;
        }

        const linkDoc = snap.docs[0];
        const linkData = linkDoc.data();

        // 2. Obtener el eCPM configurado en el admin
        const settingsSnap = await getDoc(doc(db, "settings", "global"));
        let ecpmActual = 0.70; 
        if (settingsSnap.exists() && settingsSnap.data().ecpmBase) {
          ecpmActual = settingsSnap.data().ecpmBase;
        }

        const gananciaPorClic = ecpmActual / 1000;

        // 3. Sumar clic y ganancia
        await updateDoc(doc(db, "links", linkDoc.id), { 
          clicks: increment(1),
          earnings: increment(gananciaPorClic) 
        });

        if (linkData.userId) {
           await updateDoc(doc(db, "users", linkData.userId), {
             earnings: increment(gananciaPorClic)
           });
        }
        
        setStatus("Generando pasos de seguridad...");
        
        // 4. Llamar a la API de ShrinkMe
        const apiToken = "0f4d59d395c5b5d4f2a7d86a5997f2bf2674c4b7";
        const shrinkmeUrl = `https://shrinkme.io/api?api=${apiToken}&url=${encodeURIComponent(linkData.original_url)}&alias=${linkData.short_code}`;
        
        const response = await fetch(shrinkmeUrl);
        const data = await response.json();

        if (data.status === 'success' && data.shortenedUrl) {
          setStatus("Redirigiendo...");
          setTimeout(() => {
            window.location.href = data.shortenedUrl;
          }, 800);
        } else {
          // Si falla, lo mandamos directo
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
