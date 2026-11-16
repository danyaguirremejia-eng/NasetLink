import { createAPIFileRoute } from '@tanstack/react-start/api'

export const APIRoute = createAPIFileRoute('/api/shorten')({
  GET: async ({ request }) => {
    const url = new URL(request.url)
    const longUrl = url.searchParams.get('url')

    if (!longUrl) {
      return new Response(JSON.stringify({ error: 'Falta la URL de destino' }), { status: 400, headers: { 'Content-Type': 'application/json' } })
    }

    const apiToken = "773d3c79ed712d7b6faf6f568293fd7d84e93fad"
    
    try {
      const gplinksUrl = `https://api.gplinks.com/api?api=${apiToken}&url=${encodeURIComponent(longUrl)}`
      const res = await fetch(gplinksUrl)
      const data = await res.json()

      if (data.status === 'success' && data.shortenedUrl) {
        return new Response(JSON.stringify({ url: data.shortenedUrl }), { headers: { 'Content-Type': 'application/json' } })
      } else {
        return new Response(JSON.stringify({ error: 'GPLinks rechazó la solicitud', details: data }), { status: 500, headers: { 'Content-Type': 'application/json' } })
      }
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Error de conexión con GPLinks' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
    }
  }
})
