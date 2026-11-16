import { createAPIFileRoute } from '@tanstack/react-start/api'
import { db } from '@/lib/firebase'
import { collection, query, where, getDocs, doc, updateDoc, increment } from 'firebase/firestore'

export const APIRoute = createAPIFileRoute('/api/postback')({
  GET: async ({ request }) => {
    const url = new URL(request.url)
    
    // GPLinks envía estos parámetros en la URL
    const alias = url.searchParams.get('alias') // Nuestro short_code
    const amount = parseFloat(url.searchParams.get('amount')) // El dinero real ganado
    const status = url.searchParams.get('status')

    if (!alias || isNaN(amount)) {
      return new Response("Faltan parámetros", { status: 400 })
    }

    try {
      // Buscamos el link por su código corto
      const q = query(collection(db, "links"), where("short_code", "==", alias))
      const snap = await getDocs(q)

      if (!snap.empty) {
        const linkDoc = snap.docs[0]
        const linkData = linkDoc.data()

        // Sumamos el dinero exacto al link
        await updateDoc(doc(db, "links", linkDoc.id), {
          earnings: increment(amount)
        })

        // Sumamos el dinero exacto al perfil del usuario
        if (linkData.userId) {
          await updateDoc(doc(db, "users", linkData.userId), {
            earnings: increment(amount)
          })
        }
      }

      return new Response("OK", { status: 200 })
    } catch (error) {
      console.error("Error en postback:", error)
      return new Response("Error interno", { status: 500 })
    }
  }
})
