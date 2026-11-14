import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { toast } from "sonner";
import { 
  Palette, Image as ImageIcon, Pipette, Rocket, Share2, UserCheck, 
  Save, Sparkles, Gamepad2, Feather, Flame, Download, User, Youtube, 
  MessageCircle, Send, Instagram, CheckSquare 
} from "lucide-react";

export const Route = createFileRoute("/_authed/personaliza")({
  head: () => ({ meta: [{ title: "Mi página — NASETLINK" }] }),
  component: PersonalizaPage,
});

function PersonalizaPage() {
  const { user } = Route.useRouteContext();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Estados del formulario
  const [template, setTemplate] = useState("Aurora");
  const [brandColor, setBrandColor] = useState("#3b82f6");
  const [bgColor, setBgColor] = useState("#0a0e17");
  const [title, setTitle] = useState("Descarga tu archivo");
  const [message, setMessage] = useState("¡Gracias por tu visita! Tu archivo está listo.");
  const [buttonText, setButtonText] = useState("Descargar");
  
  // Redes sociales
  const [socials, setSocials] = useState({
    youtube: "", tiktok: "", telegram: "", instagram: "", discord: ""
  });

  // Verificador
  const [verifierActive, setVerifierActive] = useState(false);
  const [verifyLinks, setVerifyLinks] = useState({ youtube: "", whatsapp: "", tiktok: "" });

  useEffect(() => {
    const fetchConfig = async () => {
      if (!user) return;
      try {
        const docRef = doc(db, "users", user.uid);
        const snap = await getDoc(docRef);
        if (snap.exists() && snap.data().pageSettings) {
          const data = snap.data().pageSettings;
          setTemplate(data.template || "Aurora");
          setBrandColor(data.brandColor || "#3b82f6");
          setBgColor(data.bgColor || "#0a0e17");
          setTitle(data.title || "Descarga tu archivo");
          setMessage(data.message || "¡Gracias por tu visita! Tu archivo está listo.");
          setButtonText(data.buttonText || "Descargar");
          setSocials(data.socials || { youtube: "", tiktok: "", telegram: "", instagram: "", discord: "" });
          setVerifierActive(data.verifierActive || false);
          setVerifyLinks(data.verifyLinks || { youtube: "", whatsapp: "", tiktok: "" });
        }
      } catch (error) {
        console.error("Error cargando config:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchConfig();
  }, [user]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, "users", user.uid), {
        pageSettings: {
          template, brandColor, bgColor, title, message, buttonText, socials, verifierActive, verifyLinks
        }
      }, { merge: true });
      toast.success("¡Página guardada con éxito!");
    } catch (error) {
      console.error(error);
      toast.error("Error al guardar los cambios");
    } finally {
      setSaving(false);
    }
  };

  const templates = [
    { id: "Aurora", icon: Sparkles, desc: "Premium" },
    { id: "Neon", icon: Gamepad2, desc: "Gamer" },
    { id: "Minimal", icon: Feather, desc: "Limpia" },
    { id: "Glow", icon: Flame, desc: "Vibrante" },
  ];

  if (loading) return <div className="text-white text-center mt-10">Cargando configuración...</div>;

  return (
    <div className="space-y-6 pb-24">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-white mb-1">Mi página</h1>
        <p className="text-sm text-slate-400">Personaliza tu página de descarga. Se aplica a todos tus enlaces.</p>
      </div>

      {/* Vista Previa */}
      <div className="bg-[#0F1523] border border-white/5 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="bg-blue-500/10 p-1.5 rounded-lg text-blue-500"><User className="w-4 h-4" /></div>
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Vista previa en vivo</span>
        </div>
        <div className="rounded-xl p-6 text-center border border-white/10" style={{ backgroundColor: bgColor }}>
          <div className="w-16 h-16 rounded-full mx-auto mb-4 bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">{title || "Título"}</h2>
          <p className="text-xs text-slate-400 mb-6">{message || "Mensaje de bienvenida"}</p>
          
          <div className="bg-black/40 border border-white/5 rounded-xl p-3 flex items-center gap-3 mb-6 text-left">
            <div className="p-2 rounded-lg text-white" style={{ backgroundColor: brandColor }}><Download className="w-4 h-4" /></div>
            <div>
              <p className="text-sm font-bold text-white">Tu archivo está listo</p>
              <p className="text-[10px] text-slate-400">archivo.zip · 24 MB</p>
            </div>
          </div>
          
          <button className="w-full py-3 rounded-xl font-bold text-white transition-opacity hover:opacity-90 shadow-lg" style={{ backgroundColor: brandColor }}>
            <Download className="w-4 h-4 inline mr-2" /> {buttonText || "Descargar"}
          </button>
        </div>
      </div>

      {/* Plantillas */}
      <div className="bg-[#0F1523] border border-white/5 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-1">
          <Palette className="w-5 h-5 text-blue-500" />
          <h3 className="font-bold text-white">Plantilla de tu página</h3>
        </div>
        <p className="text-xs text-slate-400 mb-4">Elige el estilo. Se aplica a tu página de descarga con tus colores.</p>
        
        <div className="grid grid-cols-2 gap-3">
          {templates.map((tpl) => (
            <button
              key={tpl.id}
              onClick={() => setTemplate(tpl.id)}
              className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-colors ${template === tpl.id ? 'border-blue-500 bg-blue-500/10' : 'border-white/10 bg-black/20 hover:border-white/20'}`}
            >
              <tpl.icon className={`w-6 h-6 mb-2 ${template === tpl.id ? 'text-blue-500' : 'text-slate-400'}`} />
              <span className={`text-sm font-bold ${template === tpl.id ? 'text-white' : 'text-slate-300'}`}>{tpl.id}</span>
              <span className="text-[10px] text-slate-500">{tpl.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Logo y Fondo */}
      <div className="bg-[#0F1523] border border-white/5 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <ImageIcon className="w-5 h-5 text-blue-500" />
          <h3 className="font-bold text-white">Logo y fondo</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-slate-300 mb-2">Logo</label>
            <div className="flex items-center gap-3">
              <button className="bg-[#1e293b] hover:bg-[#334155] text-blue-400 text-xs font-bold py-2 px-3 rounded-lg border border-blue-500/20 transition">Seleccionar archivo</button>
              <span className="text-xs text-slate-500">Sin archivos seleccionados</span>
            </div>
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-2">Imagen de fondo</label>
            <div className="flex items-center gap-3">
              <button className="bg-[#1e293b] hover:bg-[#334155] text-blue-400 text-xs font-bold py-2 px-3 rounded-lg border border-blue-500/20 transition">Seleccionar archivo</button>
              <span className="text-xs text-slate-500">Sin archivos seleccionados</span>
            </div>
          </div>
        </div>
      </div>

      {/* Colores */}
      <div className="bg-[#0F1523] border border-white/5 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Pipette className="w-5 h-5 text-blue-500" />
          <h3 className="font-bold text-white">Colores</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-black/20 border border-white/10 rounded-xl p-3">
            <span className="text-sm text-slate-300">Color de marca</span>
            <div className="relative w-12 h-8 rounded overflow-hidden cursor-pointer shadow-inner border border-white/20">
              <input type="color" value={brandColor} onChange={(e) => setBrandColor(e.target.value)} className="absolute -top-2 -left-2 w-16 h-16 cursor-pointer" />
            </div>
          </div>
          <div className="flex items-center justify-between bg-black/20 border border-white/10 rounded-xl p-3">
            <span className="text-sm text-slate-300">Color de fondo</span>
            <div className="relative w-12 h-8 rounded overflow-hidden cursor-pointer shadow-inner border border-white/20">
              <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="absolute -top-2 -left-2 w-16 h-16 cursor-pointer" />
            </div>
          </div>
          <p className="text-[10px] text-slate-500">El color de fondo se usa si no subes una imagen.</p>
        </div>
      </div>

      {/* Mensaje y Botón */}
      <div className="bg-[#0F1523] border border-white/5 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Rocket className="w-5 h-5 text-blue-500" />
          <h3 className="font-bold text-white">Mensaje y botón</h3>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-xs text-slate-400 mb-2">Título</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white text-sm outline-none focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-2">Mensaje de bienvenida</label>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={2} className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white text-sm outline-none focus:border-blue-500 resize-none" />
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-2">Texto del botón</label>
            <input type="text" value={buttonText} onChange={(e) => setButtonText(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white text-sm outline-none focus:border-blue-500" />
          </div>
        </div>
      </div>

      {/* Redes sociales */}
      <div className="bg-[#0F1523] border border-white/5 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Share2 className="w-5 h-5 text-blue-500" />
          <h3 className="font-bold text-white">Redes sociales</h3>
        </div>
        <div className="space-y-3">
          <SocialInput icon={Youtube} placeholder="youtube.com/@tucanal" value={socials.youtube} onChange={v => setSocials({...socials, youtube: v})} />
          <SocialInput icon={MusicIcon} placeholder="tiktok.com/@tucuenta" value={socials.tiktok} onChange={v => setSocials({...socials, tiktok: v})} />
          <SocialInput icon={Send} placeholder="t.me/tucanal" value={socials.telegram} onChange={v => setSocials({...socials, telegram: v})} />
          <SocialInput icon={Instagram} placeholder="instagram.com/tucuenta" value={socials.instagram} onChange={v => setSocials({...socials, instagram: v})} />
          <SocialInput icon={Gamepad2} placeholder="discord.gg/tuservidor" value={socials.discord} onChange={v => setSocials({...socials, discord: v})} />
        </div>
      </div>

      {/* Verificador de suscripción */}
      <div className="bg-[#0F1523] border border-white/5 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-2">
          <UserCheck className="w-5 h-5 text-blue-500" />
          <h3 className="font-bold text-white">Verificador de suscripción</h3>
          <span className="bg-white/10 text-[10px] font-bold text-slate-300 px-2 py-0.5 rounded-full ml-auto">OPCIONAL</span>
        </div>
        <p className="text-xs text-slate-400 mb-4 leading-relaxed">
          Pide a tus visitantes subscribirse / unirse antes de descargar. Tocan el botón, esperan 3s de verificación y se pone verde.
        </p>
        
        <div className="flex items-center justify-between bg-black/20 border border-white/10 rounded-xl p-3 mb-4">
          <div className="flex items-center gap-2 text-sm text-slate-300">
            <UserCheck className="w-4 h-4" /> Activar verificador en mi página
          </div>
          <input 
            type="checkbox" 
            checked={verifierActive} 
            onChange={(e) => setVerifierActive(e.target.checked)}
            className="w-5 h-5 accent-blue-600 rounded cursor-pointer" 
          />
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-xs text-slate-400 mb-2">Enlace para subscribirse (YouTube)</label>
            <input type="text" placeholder="youtube.com/@tucanal?sub_confirmation=1" value={verifyLinks.youtube} onChange={(e) => setVerifyLinks({...verifyLinks, youtube: e.target.value})} className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white text-sm outline-none focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-2">Enlace del canal de WhatsApp</label>
            <input type="text" placeholder="whatsapp.com/channel/xxxxx" value={verifyLinks.whatsapp} onChange={(e) => setVerifyLinks({...verifyLinks, whatsapp: e.target.value})} className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white text-sm outline-none focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-2">Enlace de tu TikTok</label>
            <input type="text" placeholder="tiktok.com/@tucuenta" value={verifyLinks.tiktok} onChange={(e) => setVerifyLinks({...verifyLinks, tiktok: e.target.value})} className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white text-sm outline-none focus:border-blue-500" />
          </div>
        </div>
        <p className="text-[10px] text-slate-500 mt-3">Deja un enlace vacío para no pedir ese paso. Si no activas el verificador, tu página funciona normal.</p>
      </div>

      {/* Botón Guardar */}
      <button 
        onClick={handleSave} 
        disabled={saving}
        className="w-full bg-[#2563eb] hover:bg-blue-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition disabled:opacity-50 shadow-lg shadow-blue-500/20"
      >
        <Save className="w-5 h-5" /> {saving ? "Guardando..." : "Guardar mi página"}
      </button>

    </div>
  );
}

// Componente auxiliar para inputs con icono
function SocialInput({ icon: Icon, placeholder, value, onChange }) {
  return (
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
        <Icon className="w-4 h-4" />
      </div>
      <input 
        type="text" 
        placeholder={placeholder} 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white text-sm outline-none focus:border-blue-500" 
      />
    </div>
  );
}

// Icono de TikTok (Lucide no tiene uno exacto)
function MusicIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  );
}
