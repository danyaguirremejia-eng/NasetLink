import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { auth, db } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { 
  Home, Zap, BarChart2, MoreHorizontal, X, 
  Key, Code, Palette, Banknote, Users, 
  Trophy, Star, Megaphone, Lightbulb, HelpCircle, 
  Headphones, User, MessageCircle, LogOut, ChevronRight, ShieldAlert, ArrowRightLeft
} from "lucide-react";

const OWNER_EMAILS = ["danyxiter67@gmail.com"]; 
const MODERATOR_EMAILS = ["moderador@ejemplo.com"]; 
const ADMIN_EMAILS = ["admin@ejemplo.com"]; 

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    if (!auth.currentUser) return;
    
    const userEmail = auth.currentUser.email;
    
    if (OWNER_EMAILS.includes(userEmail)) { setUserRole('owner'); return; }
    if (MODERATOR_EMAILS.includes(userEmail)) { setUserRole('moderator'); return; }
    if (ADMIN_EMAILS.includes(userEmail)) { setUserRole('admin'); return; }

    const unsub = onSnapshot(doc(db, "users", auth.currentUser.uid), (docSnap) => {
      if (docSnap.exists()) {
        setUserRole(docSnap.data().role);
      }
    });
    return () => unsub();
  }, []);

  const isStaff = userRole === 'owner' || userRole === 'admin' || userRole === 'moderator';

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
      <div className="fixed bottom-4 left-0 right-0 z-40 flex justify-center px-2 pb-safe pointer-events-none">
        <nav className="pointer-events-auto flex w-full max-w-[380px] items-center justify-around rounded-[2rem] border border-white/10 bg-[#0f1523]/60 px-1 py-2 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] backdrop-blur-xl">
          
          <Link to="/dashboard" className={`flex flex-col items-center gap-1 transition-colors ${path === '/dashboard' ? 'text-purple-500' : 'text-slate-400 hover:text-slate-200'}`}>
            <div className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 ${path === '/dashboard' ? 'bg-purple-600 text-white shadow-[0_0_20px_-3px_rgba(168,85,247,0.8)] scale-110' : ''}`}>
              <Home className="h-5 w-5" />
            </div>
            <span className={`text-[10px] font-semibold ${path === '/dashboard' ? 'text-purple-500' : 'text-slate-400'}`}>Inicio</span>
          </Link>

          <Link to="/links" className={`flex flex-col items-center gap-1 transition-colors ${path === '/links' ? 'text-purple-500' : 'text-slate-400 hover:text-slate-200'}`}>
            <div className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 ${path === '/links' ? 'bg-purple-600 text-white shadow-[0_0_20px_-3px_rgba(168,85,247,0.8)] scale-110' : ''}`}>
              <Zap className="h-5 w-5" />
            </div>
            <span className={`text-[10px] font-semibold ${path === '/links' ? 'text-purple-500' : 'text-slate-400'}`}>Links</span>
          </Link>

          <Link to="/stats" className={`flex flex-col items-center gap-1 transition-colors ${path === '/stats' ? 'text-purple-500' : 'text-slate-400 hover:text-slate-200'}`}>
            <div className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 ${path === '/stats' ? 'bg-purple-600 text-white shadow-[0_0_20px_-3px_rgba(168,85,247,0.8)] scale-110' : ''}`}>
              <BarChart2 className="h-5 w-5" />
            </div>
            <span className={`text-[10px] font-semibold ${path === '/stats' ? 'text-purple-500' : 'text-slate-400'}`}>Stats</span>
          </Link>

          <Link to="/retiros" className={`flex flex-col items-center gap-1 transition-colors ${path === '/retiros' ? 'text-purple-500' : 'text-slate-400 hover:text-slate-200'}`}>
            <div className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 ${path === '/retiros' ? 'bg-purple-600 text-white shadow-[0_0_20px_-3px_rgba(168,85,247,0.8)] scale-110' : ''}`}>
              <ArrowRightLeft className="h-5 w-5" />
            </div>
            <span className={`text-[10px] font-semibold ${path === '/retiros' ? 'text-purple-500' : 'text-slate-400'}`}>Retiros</span>
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
                <button 
                  onClick={() => goTo("/dashboard")} 
                  className={`w-full flex items-center justify-between rounded-xl p-3 transition-colors border ${path === '/dashboard' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' : 'text-slate-300 border-transparent hover:bg-white/5'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${path === '/dashboard' ? 'bg-purple-600 text-white' : 'bg-white/5 text-slate-400'}`}><Home className="w-4 h-4" /></div>
                    <span className="font-semibold text-sm">Inicio</span>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div>
                <p className="px-2 mb-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Mi contenido</p>
                <div className="space-y-1">
                  <MenuButton icon={Zap} text="Crear enlace" path="/links" currentPath={path} onClick={() => goTo("/links")} />
                  <MenuButton icon={Key} text="Crear key" path="/keys" currentPath={path} onClick={() => goTo("/keys")} />
                  <MenuButton icon={Code} text="API para desarrolladores" path="/api" currentPath={path} onClick={() => goTo("/api")} />
                  <MenuButton icon={Palette} text="Mi página" path="/personaliza" currentPath={path} onClick={() => goTo("/personaliza")} />
                </div>
              </div>

              <div>
                <p className="px-2 mb-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Ganancias</p>
                <div className="space-y-1">
                  <MenuButton icon={Banknote} text="Retiros" path="/retiros" currentPath={path} onClick={() => goTo("/retiros")} />
                  <MenuButton icon={Users} text="Referidos" path="/referidos" currentPath={path} onClick={() => goTo("/referidos")} />
                </div>
              </div>

              <div>
                <p className="px-2 mb-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Rendimiento</p>
                <div className="space-y-1">
                  <MenuButton icon={Trophy} text="Ranking" path="/ranking" currentPath={path} onClick={() => goTo("/ranking")} />
                  <MenuButton icon={Star} text="Niveles" path="/niveles" currentPath={path} onClick={() => goTo("/niveles")} />
                </div>
              </div>

              <div>
                <p className="px-2 mb-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Cuenta</p>
                <div className="space-y-1">
                  <MenuButton icon={Megaphone} text="Anuncios" path="/anuncios" currentPath={path} onClick={() => goTo("/anuncios")} />
                  <MenuButton icon={Lightbulb} text="Muro de ideas" path="/sugerencias" currentPath={path} onClick={() => goTo("/sugerencias")} />
                  <MenuButton icon={HelpCircle} text="Ayuda" path="/ayuda" currentPath={path} onClick={() => goTo("/ayuda")} />
                  <MenuButton icon={Headphones} text="Soporte" path="/soporte" currentPath={path} onClick={() => goTo("/soporte")} />
                  <MenuButton icon={User} text="Perfil" path="/perfil" currentPath={path} onClick={() => goTo("/perfil")} />
                </div>
              </div>

              <div>
                <p className="px-2 mb-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Comunidad</p>
                <div className="space-y-1">
                  <MenuButton icon={MessageCircle} text="Chat en vivo" path="/chat" currentPath={path} onClick={() => goTo("/chat")} />
                </div>
              </div>

              {isStaff && (
                <div>
                  <p className="px-2 mb-2 text-[10px] font-bold text-red-500/70 uppercase tracking-widest">Administración</p>
                  <div className="space-y-1">
                    <MenuButton icon={ShieldAlert} text="Admin Panel" path="/admin" currentPath={path} onClick={() => goTo("/admin")} isRed={true} />
                  </div>
                </div>
              )}

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

function MenuButton({ icon: Icon, text, onClick, path, currentPath, isRed }) {
  const isActive = currentPath === path;
  
  let baseClass = "w-full flex items-center justify-between p-3 rounded-xl transition-colors border ";
  let iconClass = "p-2 rounded-lg transition-colors ";
  
  if (isRed) {
    baseClass += isActive ? "bg-red-500/10 text-red-400 border-red-500/20" : "text-slate-300 border-transparent hover:bg-white/5";
    iconClass += isActive ? "bg-red-500 text-white" : "bg-white/5 text-slate-400";
  } else {
    baseClass += isActive ? "bg-purple-500/10 text-purple-400 border-purple-500/20" : "text-slate-300 border-transparent hover:bg-white/5";
    iconClass += isActive ? "bg-purple-600 text-white" : "bg-white/5 text-slate-400";
  }

  return (
    <button onClick={onClick} className={baseClass}>
      <div className="flex items-center gap-3">
        <div className={iconClass}>
          <Icon className="w-4 h-4" />
        </div>
        <span className="font-medium text-sm">{text}</span>
      </div>
      <ChevronRight className="w-4 h-4 text-slate-600" />
    </button>
  );
}
