import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, Shield } from 'lucide-react'

export const Route = createFileRoute('/privacidad')({
  component: PrivacidadPage,
})

function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-white p-6 md:p-12 overflow-y-auto">
      <div className="max-w-3xl mx-auto space-y-6">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" /> Volver al inicio
        </Link>
        
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-blue-500/20 p-3 rounded-2xl"><Shield className="w-8 h-8 text-blue-500" /></div>
          <h1 className="text-3xl font-black">Política de Privacidad</h1>
        </div>

        <div className="bg-[#0F1523] border border-white/5 rounded-3xl p-6 md:p-8 space-y-4 text-sm text-slate-300 leading-relaxed">
          <p><strong className="text-white">1. Información que recopilamos</strong><br/>Recopilamos tu nombre, correo electrónico y foto de perfil (si usas Google) para crear tu cuenta. También registramos los clics, el país y el dispositivo de los usuarios que visitan tus enlaces para generar estadísticas y calcular tus ganancias.</p>
          
          <p><strong className="text-white">2. Uso de la información</strong><br/>Usamos tus datos para gestionar tu cuenta, procesar tus retiros y mejorar la plataforma. No vendemos tu información personal a terceros.</p>
          
          <p><strong className="text-white">3. Cookies</strong><br/>Utilizamos cookies para mantener tu sesión iniciada y para que nuestros socios publicitarios (como ShrinkMe) puedan mostrar anuncios relevantes.</p>
          
          <p><strong className="text-white">4. Seguridad</strong><br/>Tus contraseñas están encriptadas. Nos tomamos muy en serio la seguridad de tu cuenta y aplicamos medidas para protegerla.</p>
        </div>
      </div>
    </div>
  )
}
