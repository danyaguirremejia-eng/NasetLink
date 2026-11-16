import { useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { CheckCircle2, Calendar, Users, MousePointerClick, Globe, ShieldCheck, Zap, ArrowRight, Calculator, TrendingUp } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: LandingPage,
})

function LandingPage() {
  const [visits, setVisits] = useState(14000);
  const [steps, setSteps] = useState(2);

  // Lógica de cálculo (basada en el eCPM promedio de $5.00)
  const calculateEarnings = () => {
    const baseEcpm = 5.00; 
    // Mientras más pasos, más paga (aprox)
    const multiplier = steps === 2 ? 1 : steps === 3 ? 1.5 : steps === 4 ? 2 : steps === 5 ? 2.5 : 3;
    const estimated = (visits / 1000) * baseEcpm * multiplier;
    return estimated.toFixed(2);
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white font-sans selection:bg-purple-500/30 relative overflow-hidden">
      
      {/* Luces de fondo */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#0B0F19]/60 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="NASETLINK Logo" className="h-8 w-8 object-contain drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
            <span className="text-lg sm:text-xl font-black tracking-tighter">
              NASET<span className="text-purple-500">LINK</span>
            </span>
          </div>

          {/* Menú Desktop */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#como-funciona" className="hover:text-white transition">Cómo funciona</a>
            <a href="#calculadora" className="hover:text-white transition">Calculadora</a>
            <Link to="/terminos" className="hover:text-white transition">Pagos</Link>
            <Link to="/ayuda" className="hover:text-white transition">FAQ</Link>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link to="/login" className="hidden sm:flex text-sm font-medium text-slate-300 hover:text-white transition">
              Iniciar sesión
            </Link>
            <Link to="/register" className="bg-purple-600 hover:bg-purple-700 text-white text-xs sm:text-sm font-bold py-2 px-4 rounded-xl transition shadow-[0_0_20px_-5px_rgba(168,85,247,0.5)]">
              Crear cuenta
            </Link>
          </div>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="max-w-6xl mx-auto px-4 pt-12 pb-20 sm:pt-20 sm:pb-24 relative z-10">
        
        {/* Hero Section */}
        <section className="flex flex-col items-center text-center space-y-6 mb-20 sm:mb-28">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-[10px] sm:text-xs font-semibold text-purple-400 backdrop-blur-md">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-purple-500 animate-pulse"></span>
            La plataforma #1 de monetización en Latinoamérica
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight max-w-4xl leading-[1.1]">
            Monetiza tus enlaces <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
              como un profesional
            </span>
          </h1>

          <p className="text-slate-400 text-sm sm:text-lg max-w-2xl leading-relaxed px-2">
            Acorta y comparte tus enlaces en YouTube, TikTok, Telegram o Discord. Gana dinero real por cada visita con los eCPM más altos del mercado.
          </p>

          <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3 pt-4 px-4 sm:px-0">
            <Link to="/register" className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm sm:text-lg py-3.5 sm:py-4 px-6 sm:px-8 rounded-2xl flex items-center justify-center gap-2 transition-all hover:scale-105 shadow-[0_0_30px_-5px_rgba(168,85,247,0.5)]">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 fill-white" /> Empezar gratis
            </Link>
            <a href="#calculadora" className="w-full sm:w-auto bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-sm sm:text-lg py-3.5 sm:py-4 px-6 sm:px-8 rounded-2xl flex items-center justify-center gap-2 transition-all backdrop-blur-md">
              <Calculator className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" /> Calcular ganancias
            </a>
          </div>
        </section>

        {/* Stats Section */}
        <section id="estadisticas" className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-20 sm:mb-32">
          <div className="bg-[#0F1523]/60 backdrop-blur-xl border border-white/5 rounded-3xl p-4 sm:p-6 flex flex-col items-center text-center">
            <div className="bg-purple-500/10 p-2 sm:p-3 rounded-2xl mb-3 sm:mb-4"><Users className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" /></div>
            <h3 className="text-2xl sm:text-4xl font-black text-white">1,324</h3>
            <p className="text-[10px] sm:text-sm text-slate-400 mt-1">Usuarios activos</p>
          </div>
          <div className="bg-[#0F1523]/60 backdrop-blur-xl border border-white/5 rounded-3xl p-4 sm:p-6 flex flex-col items-center text-center">
            <div className="bg-purple-500/10 p-2 sm:p-3 rounded-2xl mb-3 sm:mb-4"><MousePointerClick className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" /></div>
            <h3 className="text-2xl sm:text-4xl font-black text-white">1.8M+</h3>
            <p className="text-[10px] sm:text-sm text-slate-400 mt-1">Clics válidos</p>
          </div>
          <div className="bg-[#0F1523]/60 backdrop-blur-xl border border-white/5 rounded-3xl p-4 sm:p-6 flex flex-col items-center text-center">
            <div className="bg-purple-500/10 p-2 sm:p-3 rounded-2xl mb-3 sm:mb-4"><Globe className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" /></div>
            <h3 className="text-2xl sm:text-4xl font-black text-white">190</h3>
            <p className="text-[10px] sm:text-sm text-slate-400 mt-1">Países</p>
          </div>
          <div className="bg-[#0F1523]/60 backdrop-blur-xl border border-white/5 rounded-3xl p-4 sm:p-6 flex flex-col items-center text-center">
            <div className="bg-purple-500/10 p-2 sm:p-3 rounded-2xl mb-3 sm:mb-4"><ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" /></div>
            <h3 className="text-2xl sm:text-4xl font-black text-white">24/7</h3>
            <p className="text-[10px] sm:text-sm text-slate-400 mt-1">Antifraude</p>
          </div>
        </section>

        {/* CALCULADORA */}
        <section id="calculadora" className="mb-20 sm:mb-32 bg-[#0F1523]/60 backdrop-blur-xl border border-white/5 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-black mb-2 text-white">Calcula tus ganancias</h2>
            <p className="text-sm text-slate-400">Ajusta tus visitas y los pasos de tu enlace para ver cuánto puedes ganar.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-8">
              <div>
                <div className="flex justify-between text-sm font-bold mb-3">
                  <span className="text-slate-300">Visitas mensuales</span>
                  <span className="text-purple-400">{visits.toLocaleString()}</span>
                </div>
                <input 
                  type="range" min="1000" max="100000" step="1000" value={visits} 
                  onChange={(e) => setVisits(Number(e.target.value))}
                  className="w-full accent-purple-500" 
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1"><span>1K</span><span>100K</span></div>
              </div>

              <div>
                <div className="flex justify-between text-sm font-bold mb-3">
                  <span className="text-slate-300">Pasos del enlace</span>
                  <span className="text-purple-400">{steps} pasos</span>
                </div>
                <input 
                  type="range" min="2" max="6" step="1" value={steps} 
                  onChange={(e) => setSteps(Number(e.target.value))}
                  className="w-full accent-purple-500" 
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1"><span>2</span><span>6</span></div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-900/40 to-[#0F1523] border border-purple-500/30 rounded-2xl p-6 text-center">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Ganancia estimada al mes</p>
              <h3 className="text-5xl font-black text-white mb-2">${calculateEarnings()}</h3>
              <p className="text-[10px] text-slate-500 mb-4">eCPM aplicado: ~$5.00 / 1000 clics</p>
              <Link to="/register" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition">
                Empezar a ganar <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Cómo Funciona */}
        <section id="como-funciona" className="text-center mb-16 sm:mb-24">
          <h2 className="text-2xl sm:text-4xl font-black mb-3 sm:mb-4">Empieza a ganar en 3 simples pasos</h2>
          <p className="text-slate-400 text-sm sm:text-base mb-8 sm:mb-12 max-w-xl mx-auto px-4">No necesitas experiencia previa. Crea tu cuenta, acorta tus enlaces y empieza a recibir pagos por cada visita.</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-[#0F1523]/40 backdrop-blur-md border border-white/5 rounded-3xl p-6 sm:p-8 text-left relative overflow-hidden group">
              <div className="text-5xl sm:text-6xl font-black text-white/5 absolute -top-2 -right-2 group-hover:text-purple-500/10 transition-colors">01</div>
              <div className="bg-purple-500/10 p-2.5 sm:p-3 rounded-2xl w-fit mb-4 sm:mb-6"><Zap className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" /></div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">Crea tu enlace</h3>
              <p className="text-xs sm:text-sm text-slate-400">Pega la URL de tu archivo o video y genera un enlace corto listo para monetizar.</p>
            </div>
            <div className="bg-[#0F1523]/40 backdrop-blur-md border border-white/5 rounded-3xl p-6 sm:p-8 text-left relative overflow-hidden group">
              <div className="text-5xl sm:text-6xl font-black text-white/5 absolute -top-2 -right-2 group-hover:text-purple-500/10 transition-colors">02</div>
              <div className="bg-purple-500/10 p-2.5 sm:p-3 rounded-2xl w-fit mb-4 sm:mb-6"><Users className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" /></div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">Compártelo</h3>
              <p className="text-xs sm:text-sm text-slate-400">Publica tu enlace en redes sociales, foros o grupos. Mientras más visitas, más ganas.</p>
            </div>
            <div className="bg-[#0F1523]/40 backdrop-blur-md border border-white/5 rounded-3xl p-6 sm:p-8 text-left relative overflow-hidden group">
              <div className="text-5xl sm:text-6xl font-black text-white/5 absolute -top-2 -right-2 group-hover:text-purple-500/10 transition-colors">03</div>
              <div className="bg-purple-500/10 p-2.5 sm:p-3 rounded-2xl w-fit mb-4 sm:mb-6"><CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" /></div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">Cobra tu dinero</h3>
              <p className="text-xs sm:text-sm text-slate-400">Solicita tu retiro cuando llegues al mínimo. Pagos rápidos y seguros directo a tu cuenta.</p>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-6 sm:py-8 text-center text-[10px] sm:text-sm text-slate-500 bg-[#0B0F19]/80 backdrop-blur-md relative z-10">
        <div className="flex justify-center gap-4 sm:gap-6 mb-3 sm:mb-4">
          <Link to="/terminos" className="hover:text-white transition">Términos y Condiciones</Link>
          <Link to="/privacidad" className="hover:text-white transition">Privacidad</Link>
        </div>
        <p>© 2026 NASETLINK. Todos los derechos reservados.</p>
      </footer>
    </div>
  )
}
