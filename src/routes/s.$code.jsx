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

        await updateDoc(doc(db, "links", linkDoc.id), { clicks: increment(1) });
        
        setStatus("Generando pasos de seguridad...");
        
        const response = await fetch(`/api/shorten?url=${encodeURIComponent(linkData.original_url)}`);
        
        if (!response.ok) {
           throw new Error(`Servidor respondió: ${response.status}`);
        }

        const data = await response.json();

        if (data.url) {
          setStatus("Redirigiendo...");
          setTimeout(() => {
            window.location.href = data.url;
          }, 1000);
        } else {
          throw new Error("GPLinks no devolvió un enlace válido");
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
