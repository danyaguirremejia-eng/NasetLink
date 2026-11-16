import { useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { CheckCircle2, Calendar, Users, MousePointerClick, Globe, ShieldCheck, Zap, ArrowRight, Link as LinkIcon, Share2, Banknote, Shield, TrendingUp, Star, Gift, Infinity as InfinityIcon, ChevronDown, Wallet } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: LandingPage,
})

const LEVELS = [
  { name: "LEVEL 1", values: [4.00, 9.00, 12.50, 15.80, 17.50] },
  { name: "LEVEL 2", values: [7.65, 11.25, 15.30, 15.90, 19.00] },
  { name: "LEVEL 3", values: [8.50, 12.50, 17.00, 21.00, 21.50] },
  { name: "LEVEL 4", values: [9.69, 14.25, 19.38, 23.94, 24.00] },
  { name: "LEVEL 5", values: [13.00, 15.00, 19.70, 24.94, 26.50] },
  { name: "LEVEL MAX", values: [13.69, 15.25, 19.70, 24.90, 30.00] },
];

const FAQS = [
  { q: "¿Cuánto cuesta usar NASETLINK?", a: "Es 100% gratis. No pagas nada por registrarte ni por crear enlaces. Solo ganas." },
  { q: "¿Cuándo y cómo me pagan?", a: "Los pagos se procesan del día 1 al 5 de cada mes por lo que generaste el mes anterior. Retiras por PayPal, cripto, USDT o transferencia bancaria." },
  { q: "¿Cómo gano dinero exactamente?", a: "Creas tu enlace, lo compartes en tus redes (YouTube, TikTok, Telegram, Discord) y ganas por cada visita válida. Mientras más visitas reales, más ganas." },
  { q: "¿Qué cuenta como visita válida?", a: "Una visita real de una persona. Nuestro sistema antifraude descarta bots y clics repetidos para que tus ganancias sean siempre limpias y justas." },
  { q: "¿Necesito muchos seguidores?", a: "No. Cualquier creador puede empezar. Con una comunidad pequeña pero activa ya puedes generar ingresos, y subes de nivel a medida que creces." },
  { q: "¿Es seguro para mí y mi dinero?", a: "Sí. Protegemos tu cuenta y tus ganancias con seguridad de nivel profesional, y tienes soporte real cuando lo necesites." },
];

function LandingPage() {
  const [visits, setVisits] = useState(50000);
  const [steps, setSteps] = useState(6);
  const [levelIndex, setLevelIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);

  const currentLevel = LEVELS[levelIndex];
  const estimatedEarnings = ((visits / 1000) * currentLevel.values[steps - 2]).toFixed(2);

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white font-sans selection:bg-purple-500/30 relative overflow-hidden">
      
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#0B0F19]/60 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="NASETLINK Logo" className="h-8 w-8 object-contain drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
            <span className="text-xl font-black tracking-tighter">NASET<span className="text-purple-500">LINK</span></span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
            <a href="#como-funciona" className="hover:text-white transition">Cómo funciona</a>
            <a href="#calculadora" className="hover:text-white transition">Calculadora</a>
            <a href="#niveles" className="hover:text-white transition">Niveles</a>
            <a href="#pagos" className="hover:text-white transition">Pagos</a>
            <a href="#faq" className="hover:text-white transition">FAQ</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/login" className="hidden sm:flex text-sm font-medium text-slate-300 hover:text-white transition">Iniciar sesión</Link>
            <Link to="/register" className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold py-2 px-4 rounded-xl transition shadow-[0_0_20px_-5px_rgba(168,85,247,0.5)]">Crear cuenta</Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 pt-12 pb-20 sm:pt-20 relative z-10">
        
        {/* Hero */}
        <section className="flex flex-col items-center text-center space-y-6 mb-24">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 px-4 py-2 rounded-full text-xs font-semibold text-purple-400 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
            La plataforma #1 de monetización en Latinoamérica
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight max-w-4xl leading-[1.1]">
            Monetiza tus enlaces <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">como un profesional</span>
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl leading-relaxed">
            Acorta y comparte tus enlaces en YouTube, TikTok, Telegram o Discord, y gana dinero real por cada visita. Retiros rápidos y ganancias siempre justas.
          </p>
          <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3 pt-4">
            <Link to="/register" className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white font-bold text-lg py-4 px-8 rounded-2xl flex items-center justify-center gap-2 transition-all hover:scale-105 shadow-[0_0_30px_-5px_rgba(168,85,247,0.5)]">
              <Zap className="w-5 h-5 fill-white" /> Empezar gratis
            </Link>
            <a href="#calculadora" className="w-full sm:w-auto bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-lg py-4 px-8 rounded-2xl flex items-center justify-center gap-2 transition-all backdrop-blur-md">
              Calcular ganancias
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 pt-4 text-sm text-slate-400 font-medium">
            <div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-purple-500" /> Registro gratis, sin inversión</div>
            <div className="flex items-center gap-2"><Calendar className="w-5 h-5 text-purple-500" /> Pagos del 1 al 5 de cada mes</div>
          </div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-32">
          {[
            { icon: Users, value: "1,324", label: "Usuarios activos" },
            { icon: MousePointerClick, value: "1.8M+", label: "Clics válidos" },
            { icon: Globe, value: "190", label: "Países" },
            { icon: ShieldCheck, value: "24/7", label: "Antifraude" }
          ].map((stat, i) => (
            <div key={i} className="bg-[#0F1523]/60 backdrop-blur-xl border border-white/5 rounded-3xl p-6 flex flex-col items-center text-center">
              <div className="bg-purple-500/10 p-3 rounded-2xl mb-4"><stat.icon className="w-6 h-6 text-purple-500" /></div>
              <h3 className="text-4xl font-black text-white">{stat.value}</h3>
              <p className="text-sm text-slate-400 mt-1">{stat.label}</p>
            </div>
          ))}
        </section>

        {/* Cómo funciona */}
        <section id="como-funciona" className="text-center mb-32">
          <h2 className="text-3xl md:text-4xl font-black mb-4">Ganar dinero es muy fácil</h2>
          <p className="text-slate-400 mb-12 max-w-xl mx-auto">Tres pasos y empiezas a generar ingresos con tus enlaces.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: LinkIcon, title: "Crea tu enlace", desc: "Acorta tu archivo o URL y obtén tu enlace monetizado en segundos." },
              { icon: Share2, title: "Compártelo", desc: "Publícalo en tus redes y con tu comunidad: YouTube, TikTok, Telegram, Discord." },
              { icon: Banknote, title: "Gana dinero", desc: "Recibe ganancias por cada visita válida y retíralas cuando quieras." }
            ].map((step, i) => (
              <div key={i} className="bg-[#0F1523]/40 backdrop-blur-md border border-white/5 rounded-3xl p-8 text-left relative overflow-hidden group">
                <div className="text-6xl font-black text-white/5 absolute -top-2 -right-2 group-hover:text-purple-500/10 transition-colors">0{i + 1}</div>
                <div className="bg-purple-500/10 p-3 rounded-2xl w-fit mb-6"><step.icon className="w-6 h-6 text-purple-500" /></div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-slate-400">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Calculadora */}
        <section id="calculadora" className="mb-32 bg-[#0F1523]/60 backdrop-blur-xl border border-white/5 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black mb-3 text-white">Calcula cuánto puedes ganar</h2>
            <p className="text-slate-400">Mueve el control según tus visitas mensuales y elige tu nivel.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-8">
              <div>
                <div className="flex justify-between text-sm font-bold mb-3">
                  <span className="text-slate-300">Visitas válidas al mes</span>
                  <span className="text-purple-400">{visits.toLocaleString()}</span>
                </div>
                <input type="range" min="1000" max="1000000" step="10000" value={visits} onChange={(e) => setVisits(Number(e.target.value))} className="w-full accent-purple-500" />
                <div className="flex justify-between text-xs text-slate-500 mt-2"><span>1K</span><span>1M</span></div>
              </div>
              <div>
                <div className="flex justify-between text-sm font-bold mb-3">
                  <span className="text-slate-300">Número de pasos del enlace</span>
                  <span className="text-purple-400">{steps}</span>
                </div>
                <input type="range" min="2" max="6" step="1" value={steps} onChange={(e) => setSteps(Number(e.target.value))} className="w-full accent-purple-500" />
                <div className="flex justify-between text-xs text-slate-500 mt-2"><span>2</span><span>6</span></div>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-300 mb-3">Tu nivel</p>
                <div className="grid grid-cols-2 gap-2">
                  {LEVELS.map((lvl, i) => (
                    <button key={i} onClick={() => setLevelIndex(i)} className={`py-2.5 rounded-xl border text-xs font-bold transition ${levelIndex === i ? 'bg-purple-600 border-purple-500 text-white' : 'bg-black/30 border-white/5 text-slate-400 hover:border-white/20'}`}>
                      {lvl.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-900/40 to-[#0F1523] border border-purple-500/30 rounded-2xl p-8 flex flex-col justify-center items-center text-center">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Ganancia estimada al mes</p>
              <h3 className="text-6xl font-black text-white mb-2">${estimatedEarnings}</h3>
              <p className="text-sm text-slate-400 mb-1">eCPM aplicado: <strong className="text-purple-400">${currentLevel.values[steps - 2].toFixed(2)}</strong> por 1.000 visitas</p>
              <p className="text-[10px] text-slate-500 mb-6">Estimación referencial. Tus ganancias reales dependen del país y del nivel.</p>
              <Link to="/register" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition"><Zap className="w-5 h-5 fill-white" /> Empezar a ganar</Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="mb-32">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black mb-3">Hecho para creadores</h2>
            <p className="text-slate-400">Una plataforma completa, moderna y pensada para que ganes más.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: Shield, title: "Ganancias protegidas", desc: "Solo cuentan las visitas reales. Tus ingresos siempre limpios y justos." },
              { icon: TrendingUp, title: "Estadísticas en vivo", desc: "Controla tus visitas y ganancias de hoy, semana y mes al instante." },
              { icon: Star, title: "Sistema de niveles", desc: "Bronce, Plata, Oro y Diamante. Sube de nivel y gana un eCPM mayor." },
              { icon: Users, title: "Programa de referidos", desc: "Invita a otros creadores y gana comisión por su actividad." },
              { icon: Calendar, title: "Pagos puntuales", desc: "Lo que generas cada mes se te paga del día 1 al 5 del mes siguiente." },
              { icon: InfinityIcon, title: "Enlaces ilimitados", desc: "Crea todos los enlaces que necesites y monetiza sin ningún límite." }
            ].map((feat, i) => (
              <div key={i} className="bg-[#0F1523]/40 border border-white/5 rounded-3xl p-6 flex items-start gap-4 hover:border-purple-500/30 transition-colors">
                <div className="bg-purple-500/10 p-2.5 rounded-xl shrink-0"><feat.icon className="w-5 h-5 text-purple-500" /></div>
                <div><h4 className="font-bold text-white mb-1">{feat.title}</h4><p className="text-xs text-slate-400 leading-relaxed">{feat.desc}</p></div>
              </div>
            ))}
          </div>
        </section>

        {/* Niveles / Tabla */}
        <section id="niveles" className="mb-32">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black mb-3">Sube de nivel, gana más</h2>
            <p className="text-slate-400">Mientras más creces, mayor es tu eCPM y tus beneficios.</p>
          </div>
          <div className="bg-[#0F1523]/60 backdrop-blur-xl border border-white/5 rounded-3xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.02]">
                    <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Tu Nivel</th>
                    <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">2 Pasos</th>
                    <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">3 Pasos</th>
                    <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">4 Pasos</th>
                    <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">5 Pasos</th>
                    <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">6 Pasos</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {LEVELS.map((lvl, i) => (
                    <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-4 text-sm font-bold text-white">{lvl.name}</td>
                      {lvl.values.map((val, j) => (
                        <td key={j} className="p-4 text-sm font-medium text-slate-300">${val.toFixed(2)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-center text-[10px] text-slate-500 mt-4">Lo que pagamos por cada 1.000 clics válidos. El tope es lo que ganas con un enlace de 6 pasos.</p>
        </section>

        {/* Pagos */}
        <section id="pagos" className="mb-32 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-3">Cobra como quieras</h2>
          <p className="text-slate-400 mb-10">Retira por tus métodos favoritos. Los pagos se procesan <strong className="text-white">del 1 al 5 de cada mes</strong> por lo generado el mes anterior.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { name: "PayPal", icon: "P" },
              { name: "Cripto", icon: "₿" },
              { name: "USDT", icon: "$" },
              { name: "Transferencia", icon: "🏛" }
            ].map((pay, i) => (
              <div key={i} className="bg-[#0F1523]/40 border border-white/5 rounded-3xl p-6 flex flex-col items-center justify-center hover:border-purple-500/30 transition-colors">
                <span className="text-3xl font-black text-purple-500 mb-3">{pay.icon}</span>
                <p className="text-sm font-bold text-white">{pay.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mb-24 max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black mb-3">Preguntas frecuentes</h2>
            <p className="text-slate-400">Todo lo que necesitas saber antes de empezar.</p>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-[#0F1523]/60 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left font-bold text-white hover:bg-white/[0.02] transition-colors">
                  {faq.q}
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-sm text-slate-400 leading-relaxed">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-slate-400 mt-8">¿Otra pregunta? <Link to="/register" className="text-purple-400 font-bold hover:underline">Crea tu cuenta</Link> y escríbenos por soporte.</p>
        </section>

        {/* CTA Final */}
        <section className="text-center mb-24">
          <h2 className="text-3xl md:text-5xl font-black mb-4">Empieza a ganar <span className="text-purple-500">hoy mismo</span></h2>
          <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto">Crea tu cuenta gratis en menos de un minuto y comparte tu primer enlace monetizado.</p>
          <Link to="/register" className="inline-flex bg-purple-600 hover:bg-purple-700 text-white font-bold text-lg py-4 px-10 rounded-2xl items-center gap-2 transition-all hover:scale-105 shadow-[0_0_30px_-5px_rgba(168,85,247,0.5)]">
            <Zap className="w-5 h-5 fill-white" /> Crear mi cuenta
          </Link>
        </section>

      </main>

      <footer className="border-t border-white/5 py-8 text-center text-sm text-slate-500 bg-[#0B0F19]/80 backdrop-blur-md relative z-10">
        <div className="flex justify-center gap-6 mb-4">
          <Link to="/terminos" className="hover:text-white transition">Términos y Condiciones</Link>
          <Link to="/privacidad" className="hover:text-white transition">Privacidad</Link>
        </div>
        <p>© 2026 NASETLINK. Todos los derechos reservados.</p>
      </footer>
    </div>
  )
}
