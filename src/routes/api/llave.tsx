import { createAPIFileRoute } from '@tanstack/react-start/api'
import { db } from '@/lib/firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'

export const APIRoute = createAPIFileRoute('/api/llave')({
  GET: async ({ request }) => {
    const url = new URL(request.url)
    const key = url.searchParams.get('k')
    
    // Cabeceras para permitir que cualquier app consulte
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
    }

    if (!key) {
      return new Response(JSON.stringify({ valida: false, error: 'No se proporcionó ninguna llave' }), { status: 400, headers })
    }

    // 🔑 1. Validar si es la Llave Maestra
    if (key === 'DANY-XITERS') {
      return new Response(JSON.stringify({ valida: true, tipo: 'master', message: 'Llave de Owner VIP' }), { status: 200, headers })
    }

    // 🔍 2. Validar si la llave existe en la base de datos (las que crean los usuarios)
    try {
      const q = query(collection(db, "keys"), where("key", "==", key));
      const snap = await getDocs(q);
      
      if (!snap.empty) {
        // La llave existe y es válida
        return new Response(JSON.stringify({ valida: true, tipo: 'normal', message: 'Llave válida' }), { status: 200, headers })
      } else {
        // No existe en la base de datos
        return new Response(JSON.stringify({ valida: false, error: 'Llave inválida o no existe' }), { status: 200, headers })
      }
    } catch (error) {
      console.error("Error validando llave:", error)
      return new Response(JSON.stringify({ valida: false, error: 'Error interno del servidor' }), { status: 500, headers })
    }
  },
  OPTIONS: async () => {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    })
  }
})
