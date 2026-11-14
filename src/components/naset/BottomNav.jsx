import { Link, useLocation } from "@tanstack/react-router";
import { Home, Zap, BarChart2, MoreHorizontal } from "lucide-react";

export default function BottomNav() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 flex justify-center px-4 pb-safe pointer-events-none">
      <nav 
        className="pointer-events-auto flex w-full max-w-[340px] items-center justify-around rounded-[2rem] border border-white/10 bg-[#0f1523]/60 px-2 py-2 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] backdrop-blur-xl"
      >
        
        {/* Inicio */}
        <Link 
          to="/dashboard" 
          className={`flex flex-col items-center gap-1 transition-colors ${path === '/dashboard' ? 'text-blue-500' : 'text-slate-400 hover:text-slate-200'}`}
        >
          <div className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 ${path === '/dashboard' ? 'bg-blue-600 text-white shadow-[0_0_20px_-3px_rgba(37,99,235,0.8)] scale-110' : ''}`}>
            <Home className="h-5 w-5" />
          </div>
          <span className={`text-[10px] font-semibold ${path === '/dashboard' ? 'text-blue-500' : 'text-slate-400'}`}>Inicio</span>
        </Link>

        {/* Links */}
        <Link 
          to="/links" 
          className={`flex flex-col items-center gap-1 transition-colors ${path === '/links' ? 'text-blue-500' : 'text-slate-400 hover:text-slate-200'}`}
        >
          <div className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 ${path === '/links' ? 'bg-blue-600 text-white shadow-[0_0_20px_-3px_rgba(37,99,235,0.8)] scale-110' : ''}`}>
            <Zap className="h-5 w-5" />
          </div>
          <span className={`text-[10px] font-semibold ${path === '/links' ? 'text-blue-500' : 'text-slate-400'}`}>Links</span>
        </Link>

        {/* Stats */}
        <Link 
          to="/stats" 
          className={`flex flex-col items-center gap-1 transition-colors ${path === '/stats' ? 'text-blue-500' : 'text-slate-400 hover:text-slate-200'}`}
        >
          <div className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 ${path === '/stats' ? 'bg-blue-600 text-white shadow-[0_0_20px_-3px_rgba(37,99,235,0.8)] scale-110' : ''}`}>
            <BarChart2 className="h-5 w-5" />
          </div>
          <span className={`text-[10px] font-semibold ${path === '/stats' ? 'text-blue-500' : 'text-slate-400'}`}>Stats</span>
        </Link>

        {/* Más */}
        <button 
          type="button"
          className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-200 transition-colors"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full">
            <MoreHorizontal className="h-5 w-5" />
          </div>
          <span className="text-[10px] font-semibold">Más</span>
        </button>

      </nav>
    </div>
  );
}
