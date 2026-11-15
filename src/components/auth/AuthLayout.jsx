import { Link } from "@tanstack/react-router";

export function AuthLayout({ icon: Icon, title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-[#0B0F19] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden text-white">
      {/* Fondo con efecto de cuadrícula */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        
        {/* NUEVO LOGO MORADO */}
        <div className="flex flex-col items-center justify-center mb-8">
          <img 
            src="/logo.png" 
            alt="NASETLINK" 
            className="w-20 h-20 object-contain mb-4 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]" 
          />
          <h2 className="text-center text-3xl font-black tracking-tighter">
            NASET<span className="text-purple-500">LINK</span>
          </h2>
        </div>

        {/* Tarjeta con el formulario */}
        <div className="bg-[#0F1523] py-8 px-4 shadow-2xl sm:rounded-2xl sm:px-10 border border-white/5">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
            <p className="text-sm text-slate-400">{subtitle}</p>
          </div>
          
          {children}
        </div>

      </div>
    </div>
  );
}
