import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Award, Star, Trophy, Diamond, Crown, Flame, ShieldCheck, CheckCircle2, Scale, Table, History } from "lucide-react";

export const Route = createFileRoute("/_authed/niveles")({
  head: () => ({ meta: [{ title: "Niveles — NASETLINK" }] }),
  component: NivelesPage,
});

// Datos de los niveles corregidos
const LEVELS = [
  { id: 1, name: "LEVEL 1", icon: Award, reqClicks: 300, reqDays: 9, pay: "17.50", creators: "1,300", color: "text-orange-500", bg: "bg-orange-500/10", border: "border-orange-500/30" },
  { id: 2, name: "LEVEL 2", icon: Star, reqClicks: 650, reqDays: 14, pay: "19.00", creators: "7", color: "text-slate-400", bg: "bg-slate-400/10", border: "border-slate-400/30" },
  { id: 3, name: "LEVEL 3", icon: Trophy, reqClicks: 1100, reqDays: 20, pay: "21.50", creators: "8", color: "text-yellow-500", bg: "bg-yellow-500/10", border: "border-yellow-500/30" },
  { id: 4, name: "LEVEL 4", icon: Diamond, reqClicks: 1289, reqDays: 24, pay: "24.00", creators: "7", color: "text-cyan-400", bg: "bg-cyan-400/10", border: "border-cyan-400/30" },
  { id: 5, name: "LEVEL 5", icon: Crown, reqClicks: 2500, reqDays: 30, pay: "26.50", creators: "0", color: "text-purple-500", bg: "bg-purple-500/10", border: "border-purple-500/30" },
  { id: 6, name: "LEVEL MAX", icon: Flame, reqClicks: 0, reqDays: 0, pay: "30.00", creators: "0", color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/30" },
];

function NivelesPage() {
  const { user } = Route.useRouteContext();
  
  // Simulamos que el usuario está en el Nivel 1 (luego lo conectas a user.level si quieres)
  const currentLevel = 1;
  const levelData = LEVELS[currentLevel - 1];

  return (
    <div className="space-y-8 pb-24">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="bg-blue-500/10 p-2 rounded-xl text-blue-500"><Trophy className="w-6 h-6" /></div>
          <h1 className="text-3xl font-bold text-white">Niveles</h1>
        </div>
        <p className="text-sm text-slate-400 leading-relaxed">
          Subes de nivel con una <strong className="text-white">racha perfecta</strong>: cumple los clics válidos del día TODOS los días seguidos que pide tu nivel. Más nivel = más te pagamos por cada clic.
        </p>
      </div>

      {/* Tarjeta de Nivel Actual */}
      <div className="bg-gradient-to-br from-[#1a1510] via-[#0F1523] to-[#0F1523] border border-orange-500/30 rounded-3xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
        
        <div className="flex items-center justify-between mb-6">
          <div className="bg-orange-500/20 p-4 rounded-2xl border border-orange-500/30">
            <Award className="w-8 h-8 text-orange-500" />
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-center">
            <div className="flex items-center justify-center gap-1 text-xs text-slate-400 font-bold mb-1">
              <Flame className="w-4 h-4 text-orange-500" /> Día 1/{levelData.reqDays}
            </div>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider">Tu racha</p>
          </div>
        </div>

        <p className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-1">TU NIVEL</p>
        <h2 className="text-5xl font-black text-white mb-2">{levelData.name}</h2>
        <p className="text-sm text-slate-300 mb-6">Ganas <strong className="text-white">${levelData.pay}</strong> por cada 1,000 clics a 6 pasos</p>

        <div className="bg-black/40 border border-white/5 rounded-2xl p-4">
          <p className="text-sm text-slate-300 mb-2">Hoy llevas <strong className="text-white">0 de {levelData.reqClicks} clics válidos</strong></p>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Flame className="w-4 h-4 text-orange-500" />
            <p>Te faltan {levelData.reqClicks} antes de las 12:00 AM o la racha se pierde entera.</p>
          </div>
        </div>
      </div>

      {/* La Escalera */}
      <div>
        <h3 className="font-bold text-lg text-white mb-1 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-blue-500" /> La escalera
        </h3>
        <p className="text-xs text-slate-400 mb-4">Cada salto pide clics válidos diarios durante días seguidos. Sin fallar ni uno.</p>
        
        <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar">
          {LEVELS.map((lvl, index) => (
            <div key={lvl.id} className="flex flex-col items-center shrink-0 w-24">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center border-2 ${index + 1 === currentLevel ? 'bg-orange-500 border-orange-400 text-white shadow-[0_0_20px_-5px_rgba(249,115,22,0.8)]' : 'bg-[#0F1523] border-white/10 text-slate-600'}`}>
                <lvl.icon className="w-6 h-6" />
              </div>
              <p className={`text-xs font-bold mt-2 ${index + 1 === currentLevel ? 'text-white' : 'text-slate-500'}`}>{lvl.name}</p>
              {lvl.reqClicks > 0 && <p className="text-[9px] text-slate-500 text-center mt-1">{lvl.reqClicks}/día ×<br/>{lvl.reqDays}d</p>}
              {lvl.reqClicks === 0 && <p className="text-[9px] text-slate-500 mt-1">LA CIMA</p>}
            </div>
          ))}
        </div>
      </div>

      {/* Qué pide y qué paga cada nivel */}
      <div>
        <h3 className="font-bold text-lg text-white mb-1 flex items-center gap-2">
          <Table className="w-5 h-5 text-blue-500" /> Qué pide y qué paga cada nivel
        </h3>
        <p className="text-xs text-slate-400 mb-4">El requisito es para SUBIR desde ese nivel al siguiente.</p>
        
        <div className="space-y-4">
          {LEVELS.map((lvl, index) => (
            <div key={lvl.id} className={`bg-[#0F1523] border ${index + 1 === currentLevel ? 'border-orange-500/30' : 'border-white/5'} rounded-2xl p-5 relative overflow-hidden`}>
              {index + 1 === currentLevel && (
                <div className="absolute top-0 right-0 bg-orange-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl z-10">TU NIVEL</div>
              )}
              {index + 1 !== currentLevel && (
                <div className="absolute top-0 right-0 bg-white/5 text-slate-400 text-[10px] font-bold px-3 py-1 rounded-bl-xl z-10">POR LLEGAR</div>
              )}
              
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${lvl.bg} ${lvl.color} border ${lvl.border}`}>
                <lvl.icon className="w-6 h-6" />
              </div>
              
              <h4 className="text-2xl font-black text-white">{lvl.name}</h4>
              <p className="text-xs text-slate-500 mb-3">{lvl.creators} creadores</p>
              
              <div className="mb-4">
                <p className={`text-2xl font-black ${lvl.color}`}>${lvl.pay}</p>
                <p className="text-xs text-slate-400">por cada 1,000 clics a 6 pasos</p>
              </div>

              {lvl.reqClicks > 0 ? (
                <div className="bg-black/30 border border-white/5 rounded-xl p-3">
                  <p className="text-[10px] text-slate-500 font-bold mb-1 uppercase tracking-wider">Para subir a {LEVELS[index + 1]?.name || 'MAX'}</p>
                  <p className="text-sm text-white font-medium"><strong className="font-bold">{lvl.reqClicks}</strong> clics/día × <strong className="font-bold">{lvl.reqDays}</strong> días seguidos</p>
                </div>
              ) : (
                <div className="bg-black/30 border border-white/5 rounded-xl p-3">
                  <p className="text-[10px] text-slate-500 font-bold mb-1 uppercase tracking-wider">Nivel Máximo</p>
                  <p className="text-sm text-white font-medium">La cima 👑</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Reglas Claras */}
      <div>
        <h3 className="font-bold text-lg text-white mb-4 flex items-center gap-2">
          <Scale className="w-5 h-5 text-blue-500" /> Las reglas, clarito
        </h3>
        <div className="space-y-3">
          <div className="bg-[#0F1523] border border-white/5 rounded-2xl p-4 flex gap-4">
            <div className="bg-orange-500/10 p-2 rounded-xl text-orange-500 shrink-0 h-fit"><Flame className="w-5 h-5" /></div>
            <div>
              <h4 className="text-sm font-bold text-white mb-1">Racha perfecta</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Clics válidos del día ≥ requisito, TODOS los días seguidos. Fallas UN día (aunque sea por 1 clic) y la racha completa se pierde: vuelves a día 0.</p>
            </div>
          </div>
          <div className="bg-[#0F1523] border border-white/5 rounded-2xl p-4 flex gap-4">
            <div className="bg-blue-500/10 p-2 rounded-xl text-blue-500 shrink-0 h-fit"><ShieldCheck className="w-5 h-5" /></div>
            <div>
              <h4 className="text-sm font-bold text-white mb-1">Nunca bajas</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Perder la racha no te quita el nivel: sigues donde estás y arrancas de nuevo. No hay bajadas automáticas.</p>
            </div>
          </div>
          <div className="bg-[#0F1523] border border-white/5 rounded-2xl p-4 flex gap-4">
            <div className="bg-green-500/10 p-2 rounded-xl text-green-500 shrink-0 h-fit"><CheckCircle2 className="w-5 h-5" /></div>
            <div>
              <h4 className="text-sm font-bold text-white mb-1">Solo clics válidos</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Cuentan los clics válidos que NASETLINK registra, por día cerrado (hora RD, 12:00 AM). No hay promedios ni se suman días.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabla de Pagos */}
      <div>
        <h3 className="font-bold text-lg text-white mb-1 flex items-center gap-2">
          <Table className="w-5 h-5 text-blue-500" /> Cuánto te paga tu nivel
        </h3>
        <p className="text-xs text-slate-400 mb-4">Por cada 1,000 clics válidos, según los pasos del enlace.</p>
        
        <div className="bg-[#0F1523] border border-white/5 rounded-2xl overflow-hidden">
          <div className="flex bg-white/5 border-b border-white/5">
            <div className="flex-1 p-3 text-xs font-bold text-slate-400">Pasos</div>
            <div className="flex-1 p-3 text-xs font-bold text-orange-500 text-right bg-orange-500/5">{levelData.name}</div>
          </div>
          {[2, 3, 4, 5, 6].map((step) => (
            <div key={step} className="flex border-b border-white/5 last:border-0">
              <div className="flex-1 p-3 text-sm font-medium text-slate-300">{step} pasos</div>
              <div className="flex-1 p-3 text-sm font-bold text-white text-right bg-orange-500/5">
                ${step === 2 ? "4.00" : step === 3 ? "9.00" : step === 4 ? "12.50" : step === 5 ? "15.80" : "17.50"}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tu historial */}
      <div>
        <h3 className="font-bold text-lg text-white mb-1 flex items-center gap-2">
          <History className="w-5 h-5 text-blue-500" /> Tu historial
        </h3>
        <p className="text-xs text-slate-400 mb-4">Subidas de nivel y rachas perdidas.</p>
        <div className="bg-[#0F1523] border border-white/5 rounded-2xl p-6 text-center">
          <p className="text-sm text-slate-500">Todavía no hay eventos. Tu primera racha empieza hoy. 🔥</p>
        </div>
      </div>

    </div>
  );
}
