import { createFileRoute, Link } from '@tanstack/react-router'
import { CheckCircle2, Calendar, Users, MousePointerClick, Globe, ShieldCheck, Zap } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: LandingPage,
})

function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-white font-sans selection:bg-purple-500/30">
      
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#0B0F19]/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="NASETLINK Logo" className="h-8 w-8 object-contain drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
            <span className="text-xl font-black tracking-tighter">
              NASET<span className="text-purple-500">LINK</span>
            </span>
          </div>

          {/* Menú Desktop */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
            <Link to="/" className="hover:text-white transition">Cómo funciona</Link>
            <Link to="/" className="hover:text-white transition">Calculadora</Link>
            <Link to="/" className="hover:text-white transition">Pagos</Link>
            <Link to="/" className="hover:text-white transition">FAQ</Link>
          </nav>

          {/* Botón Crear Cuenta */}
          <div className="flex items-center gap-3">
            <Link to="/login" className="hidden sm:flex text-sm font-medium text-slate-300 hover:text-white transition">
              Iniciar sesión
            </Link>
            <Link to="/register" className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold py-2 px-4 rounded-lg transition shadow-lg shadow-purple-500/20">
              Crear cuenta
            </Link>
          </div>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="max-w-5xl mx-auto px-4 pt-12 pb-24 sm:px-6 space-y-20">
        
        {/* Hero Section */}
        <section className="flex flex-col items-center text-center space-y-6">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 px-3 py-1.5 rounded-full text-xs font-semibold text-purple-400">
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
            La plataforma #1 de monetización en Latinoamérica
          </div>

          {/* Título */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight max-w-3xl leading-tight">
            Monetiza tus enlaces <br className="hidden sm:block" />
            <span className="text-purple-500">como un profesional</span>
          </h1>

          {/* Subtítulo */}
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl leading-relaxed">
            Acorta y comparte tus enlaces en YouTube, TikTok, Telegram o Discord, y gana dinero real por cada visita. Retiros rápidos y ganancias siempre justas.
          </p>

          {/* Botones */}
          <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3 pt-4">
            <Link to="/register" className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white font-bold text-base py-3.5 px-8 rounded-xl flex items-center justify-center gap-2 transition shadow-lg shadow-purple-500/20">
              <Zap className="w-5 h-5 fill-white" /> Empezar gratis
            </Link>
            <Link to="/" className="w-full sm:w-auto bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-base py-3.5 px-8 rounded-xl flex items-center justify-center gap-2 transition">
              <CalculatorIcon className="w-5 h-5 text-purple-500" /> Calcular ganancias
            </Link>
          </div>

          {/* Checks */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 pt-4 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-500" /> Registro gratis, sin inversión
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-purple-500" /> Pagos del 1 al 5 de cada mes
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#0F1523] border border-white/5 rounded-2xl p-6 flex flex-col items-center text-center">
            <div className="bg-purple-500/10 p-3 rounded-xl mb-4"><Users className="w-6 h-6 text-purple-500" /></div>
            <h3 className="text-3xl font-black text-white">1324</h3>
            <p className="text-xs text-slate-400 mt-1">Usuarios activos</p>
          </div>
          <div className="bg-[#0F1523] border border-white/5 rounded-2xl p-6 flex flex-col items-center text-center">
            <div className="bg-purple-500/10 p-3 rounded-xl mb-4"><MousePointerClick className="w-6 h-6 text-purple-500" /></div>
            <h3 className="text-3xl font-black text-white">1.8M+</h3>
            <p className="text-xs text-slate-400 mt-1">Clics válidos</p>
          </div>
          <div className="bg-[#0F1523] border border-white/5 rounded-2xl p-6 flex flex-col items-center text-center">
            <div className="bg-purple-500/10 p-3 rounded-xl mb-4"><Globe className="w-6 h-6 text-purple-500" /></div>
            <h3 className="text-3xl font-black text-white">190</h3>
            <p className="text-xs text-slate-400 mt-1">Países</p>
          </div>
          <div className="bg-[#0F1523] border border-white/5 rounded-2xl p-6 flex flex-col items-center text-center">
            <div className="bg-purple-500/10 p-3 rounded-xl mb-4"><ShieldCheck className="w-6 h-6 text-purple-500" /></div>
            <h3 className="text-3xl font-black text-white">24/7</h3>
            <p className="text-xs text-slate-400 mt-1">Antifraude</p>
          </div>
        </section>

      </main>
    </div>
  )
}

function CalculatorIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="16" height="20" x="4" y="2" rx="2" />
      <line x1="8" x2="16" y1="6" y2="6" />
      <line x1="16" x2="16" y1="14" y2="18" />
      <path d="M16 10h.01" />
      <path d="M12 10h.01" />
      <path d="M8 10h.01" />
      <path d="M12 14h.01" />
      <path d="M8 14h.01" />
      <path d="M12 18h.01" />
      <path d="M8 18h.01" />
    </svg>
  )
}
