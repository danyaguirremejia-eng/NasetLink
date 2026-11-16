import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, FileText } from 'lucide-react'

export const Route = createFileRoute('/terminos')({
  component: TerminosPage,
})

function TerminosPage() {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-white p-6 md:p-12 overflow-y-auto">
      <div className="max-w-3xl mx-auto space-y-6">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" /> Volver al inicio
        </Link>
        
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-purple-500/20 p-3 rounded-2xl"><FileText className="w-8 h-8 text-purple-500" /></div>
          <h1 className="text-3xl font-black">Términos y Condiciones</h1>
        </div>

        <div className="bg-[#0F1523] border border-white/5 rounded-3xl p-6 md:p-8 space-y-4 text-sm text-slate-300 leading-relaxed">
          <p><strong className="text-white">1. Aceptación de los Términos</strong><br/>Al registrarte y usar NASETLINK, aceptas estos términos en su totalidad. Si no estás de acuerdo, por favor no utilices la plataforma.</p>
          
          <p><strong className="text-white">2. Uso del Servicio</strong><br/>NASETLINK es una plataforma para acortar y monetizar enlaces. Queda estrictamente prohibido usar nuestros servicios para distribuir malware, phishing, contenido ilegal, o cualquier material que viole los derechos de autor. Nos reservamos el derecho de suspender cualquier cuenta que infrinja estas normas.</p>
          
          <p><strong className="text-white">3. Pagos y Retiros</strong><br/>Los usuarios ganan dinero por clics válidos generados en sus enlaces. El monto mínimo de retiro es de $5.00 USD. Los pagos se procesan dentro de los plazos establecidos en el panel de usuario. Nos reservamos el derecho de rechazar pagos si se detecta fraude o bots.</p>
          
          <p><strong className="text-white">4. Modificaciones</strong><br/>Podemos actualizar estos términos en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación en esta página.</p>
        </div>
      </div>
    </div>
  )
}
