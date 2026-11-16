import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase'
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore'
import { User, Youtube, Send, Instagram, Gamepad2, Link as LinkIcon, ExternalLink, Loader2 } from 'lucide-react'

export const Route = createFileRoute('/u/$uid')({
  component: PublicProfilePage,
})

function PublicProfilePage() {
  const { uid } = Route.useParams()
  const [profile, setProfile] = useState(null)
  const [links, setLinks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Cargar datos del usuario
        const userDoc = await getDoc(doc(db, "users", uid))
        if (userDoc.exists()) {
          setProfile(userDoc.data())
        }

        // 2. Cargar sus enlaces
        const q = query(collection(db, "links"), where("userId", "==", uid))
        const linksSnap = await getDocs(q)
        const fetchedLinks = []
        linksSnap.forEach(doc => fetchedLinks.push({ id: doc.id, ...doc.data() }))
        
        // Ordenar por más reciente
        fetchedLinks.sort((a, b) => (b.createdAt?.toMillis() || 0) - (a.createdAt?.toMillis() || 0))
        setLinks(fetchedLinks)
      } catch (error) {
        console.error("Error cargando perfil público:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [uid])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-[#0B0F19] flex flex-col items-center justify-center text-white p-5 text-center">
        <User className="w-16 h-16 text-slate-600 mb-4" />
        <h1 className="text-2xl font-bold mb-2">Usuario no encontrado</h1>
        <p className="text-slate-400 mb-6">Este creador no existe o cambió su nombre.</p>
        <Link to="/" className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-xl font-bold transition">Ir a NASETLINK</Link>
      </div>
    )
  }

  const socials = profile.socials || {}

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white font-sans selection:bg-purple-500/30 relative overflow-hidden flex flex-col items-center py-12 px-4">
      {/* Fondo decorativo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-64 bg-purple-600/20 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-md flex flex-col items-center">
        
        {/* Avatar */}
        <div className="w-28 h-28 rounded-full bg-[#0F1523] border-4 border-purple-500 shadow-[0_0_30px_-5px_rgba(168,85,247,0.5)] overflow-hidden flex items-center justify-center mb-4">
          {profile.photoURL ? (
            <img src={profile.photoURL} alt="Avatar" className="w-full h-full object-cover" />
          ) : (
            <User className="w-12 h-12 text-slate-400" />
          )}
        </div>

        {/* Nombre y Bio */}
        <h1 className="text-2xl font-black mb-1">{profile.displayName || "Creador"}</h1>
        <p className="text-sm text-slate-400 text-center mb-6 max-w-xs">{profile.about || "¡Bienvenido a mi perfil de NASETLINK!"}</p>

        {/* Redes Sociales */}
        <div className="flex gap-3 mb-8">
          {socials.youtube && <a href={socials.youtube} target="_blank" rel="noreferrer" className="p-3 bg-white/5 hover:bg-red-500/20 hover:text-red-500 rounded-full transition"><Youtube className="w-5 h-5" /></a>}
          {socials.telegram && <a href={socials.telegram} target="_blank" rel="noreferrer" className="p-3 bg-white/5 hover:bg-blue-500/20 hover:text-blue-500 rounded-full transition"><Send className="w-5 h-5" /></a>}
          {socials.instagram && <a href={socials.instagram} target="_blank" rel="noreferrer" className="p-3 bg-white/5 hover:bg-pink-500/20 hover:text-pink-500 rounded-full transition"><Instagram className="w-5 h-5" /></a>}
          {socials.discord && <a href={socials.discord} target="_blank" rel="noreferrer" className="p-3 bg-white/5 hover:bg-indigo-500/20 hover:text-indigo-500 rounded-full transition"><Gamepad2 className="w-5 h-5" /></a>}
        </div>

        {/* Lista de Enlaces */}
        <div className="w-full space-y-3">
          {links.length === 0 ? (
            <div className="text-center py-8 bg-white/5 rounded-2xl border border-white/5">
              <LinkIcon className="w-8 h-8 text-slate-500 mx-auto mb-2" />
              <p className="text-slate-400 text-sm">Este creador aún no tiene enlaces públicos.</p>
            </div>
          ) : (
            links.map(link => (
              <a 
                key={link.id} 
                href={`/s/${link.short_code}`} 
                className="w-full bg-[#0F1523] border border-white/10 hover:border-purple-500/50 p-4 rounded-2xl flex items-center justify-between group transition-all hover:scale-[1.02] shadow-lg hover:shadow-purple-500/10"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-purple-500/10 p-2 rounded-xl text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                    <LinkIcon className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-sm text-white">{link.name || "Enlace sin nombre"}</p>
                    <p className="text-[10px] text-slate-500 truncate max-w-[200px]">{link.original_url}</p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-purple-400 transition-colors" />
              </a>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-1">Powered by</p>
          <Link to="/" className="text-lg font-black tracking-tighter hover:opacity-80 transition">
            NASET<span className="text-purple-500">LINK</span>
          </Link>
        </div>

      </div>
    </div>
  )
}
