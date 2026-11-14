import { useState } from "react";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { 
  Home, Zap, BarChart2, MoreHorizontal, X, 
  Key, Code, Palette, Banknote, Users, 
  Trophy, Star, Megaphone, Lightbulb, HelpCircle, 
  Headphones, User, MessageCircle, LogOut, ChevronRight 
} from "lucide-react";

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate({ to: "/login" });
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

  const goTo = (route) => {
    setIsMenuOpen(false);
    navigate({ to: route });
  };

  return (
    <>
      <div className="fixed bottom-4 left-0 right-0 z-40 flex justify-center px-4 pb-safe pointer-events-none">
        <nav className="pointer-events-auto flex w-full max-w-[340px] items-center justify-around rounded-[2rem] border border-white/10 bg-[#0f1523]/60 px-2 py-2 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] backdrop-blur-xl">
          
          <Link to="/dashboard" className={`flex flex-col items-center gap-1 transition-colors ${path === '/dashboard' ? 'text-blue-500' : 'text-slate-400 hover:text-slate-200'}`}>
            <div className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 ${path === '/dashboard' ? 'bg-blue-600 text-white shadow-[0_0_20px_-3px_rgba(37,99,235,0.8)] scale-110' : ''}`}>
              <Home className="h-5 w-5" />
            </div>
            <span className={`text-[10px] font-semibold ${path === '/dashboard' ? 'text-blue-500' : 'text-slate-400'}`}>Inicio</span>
          </Link>

          <Link to="/links" className={`flex flex-col items-center gap-1 transition-colors ${path === '/links' ? 'text-blue-500' : 'text-slate-400 hover:text-slate-200'}`}>
            <div className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 ${path === '/links' ? 'bg-blue-600 text-white shadow-[0_0_20px_-3px_rgba(37,99,235,0.8)] scale-110' : ''}`}>
              <Zap className="h-5 w-5" />
            </div>
            <span className={`text-[10px] font-semibold ${path === '/links' ? 'text-blue-500' : 'text-slate-400'}`}>Links</span>
          </Link>

          <Link to="/stats" className={`flex flex-col items-center gap-1 transition-colors ${path === '/stats' ? 'text-blue-500' : 'text-slate-400 hover:text-slate-200'}`}>
            <div className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 ${path === '/stats' ? 'bg-blue-600 text-white shadow-[0_0_20px_-3px_rgba(37,99,235,0.8)] scale-110' : ''}`}>
              <BarChart2 className="h-5 w-5" />
            </div>
            <span className={`text-[10px] font-semibold ${path === '/stats' ? 'text-blue-500' : 'text-slate-400'}`}>Stats</span>
          </Link>

          <button 
            type="button"
            onClick={() => setIsMenuOpen(true)}
            className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full">
              <MoreHorizontal className="h-5 w-5" />
            </div>
            <span className="text-[10px] font-semibold">Más</span>
          </button>
        </nav>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center">
          <div className="absolute inset-0" onClick={() => setIsMenuOpen(false)}></div>

          <div className="relative w-full max-w-md max-h-[85vh] overflow-y-auto rounded-t-[2rem] sm:rounded-3xl border-t sm:border border-white/10 bg-[#0f1523] p-4 shadow-2xl pb-safe">
            <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-slate-700 sm:hidden"></div>

            <div className="flex items-center justify-between mb-6 px-2">
              <span className="text-xs font-bold tracking-widest text-slate-400 uppercase">Menú</span>
              <button onClick={() => setIsMenuOpen(false)} className="p-1 text-slate-400 hover:text-white bg-white/5 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              
              <div>
                <button onClick={() => goTo("/dashboard")} className="w-full flex items-center justify-between rounded-xl bg-blue-500/10 p-3 text-blue-400 border border-blue-500/20">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-500 text-white p-2 rounded-lg"><Home className="w-4 h-4" /></div>
                    <span className="font-semibold text-sm">Inicio</span>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div>
                <p className="px-2 mb-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Mi contenido</p>
                <div className="space-y-1">
                  <MenuButton icon={Zap} text="Crear enlace" onClick={() => goTo("/links")} />
                  <MenuButton icon={Key} text="Crear key" onClick={() => goTo("/keys")} />
                  <MenuButton icon={Code} text="API para desarrolladores" onClick={() => goTo("/api")} />
                  <MenuButton icon={Palette} text="Mi página" />
                </div>
              </div>

              <div>
                <p className="px-2 mb-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Ganancias</p>
                <div className="space-y-1">
                  <MenuButton icon={Banknote} text="Retiros" onClick={() => goTo("/retiros")} />
                  <MenuButton icon={Users} text="Referidos" />
                </div>
              </div>

              <div>
                <p className="px-2 mb-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Rendimiento</p>
                <div className="space-y-1">
                  <MenuButton icon={Trophy} text="Ranking" />
                  <MenuButton icon={Star} text="Niveles" />
                </div>
              </div>

              <div>
                <p className="px-2 mb-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Cuenta</p>
                <div className="space-y-1">
                  <MenuButton icon={Megaphone} text="Anuncios" />
                  <MenuButton icon={Lightbulb} text="Muro de ideas" />
                  <MenuButton icon={HelpCircle} text="Ayuda" />
                  <MenuButton icon={Headphones} text="Soporte" />
                  <MenuButton icon={User} text="Perfil" />
                </div>
              </div>

              <div>
                <p className="px-2 mb-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Comunidad</p>
                <div className="space-y-1">
                  <MenuButton icon={MessageCircle} text="Chat en vivo" />
                </div>
              </div>

              <div className="pt-4 border-t border-white/5">
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-500/10 text-red-400 transition-colors"
                >
                  <div className="p-2 rounded-lg bg-red-500/10">
                    <LogOut className="w-4 h-4" />
                  </div>
                  <span className="font-semibold text-sm">Cerrar sesión</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}

function MenuButton({ icon: Icon, text, onClick }) {
  return (
    <button onClick={onClick} className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors text-slate-300">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-white/5 text-slate-400">
          <Icon className="w-4 h-4" />
        </div>
        <span className="font-medium text-sm">{text}</span>
      </div>
      <ChevronRight className="w-4 h-4 text-slate-600" />
    </button>
  );
}
