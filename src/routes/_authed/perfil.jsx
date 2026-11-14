import { useState, useEffect, useRef } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { db, auth } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { updateProfile, updatePassword } from "firebase/auth";
import { toast } from "sonner";
import { 
  User, LogOut, Lock, Save, ChevronDown, Image as ImageIcon, Upload, 
  Phone, Globe, Video, Eye, Crown, Wallet, Ghost, Smile, Gamepad2, 
  Rocket, Shield, Zap, Star, Heart, Skull, Bot, Cat 
} from "lucide-react";

export const Route = createFileRoute("/_authed/perfil")({
  head: () => ({ meta: [{ title: "Mi Perfil — NASETLINK" }] }),
  component: PerfilPage,
});

const AVATAR_OPTIONS = [
  "user", "ghost", "smile", "gamepad", "rocket", "shield", 
  "zap", "star", "heart", "skull", "bot", "cat"
];

function AvatarDisplay({ name, className }) {
  const icons = {
    user: User, ghost: Ghost, smile: Smile, gamepad: Gamepad2, rocket: Rocket, 
    shield: Shield, zap: Zap, star: Star, heart: Heart, skull: Skull, bot: Bot, cat: Cat
  };
  const Icon = icons[name] || User;
  return <Icon className={className} />;
}

function PerfilPage() {
  const { user } = Route.useRouteContext();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  const [loading, setLoading] = useState(true);
  const [savingData, setSavingData] = useState(false);
  const [savingPass, setSavingPass] = useState(false);

  const [displayName, setDisplayName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [country, setCountry] = useState("");
  const [channelLink, setChannelLink] = useState("");
  const [about, setAbout] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("user");

  const [payoutMethod, setPayoutMethod] = useState("Binance");
  const [payoutName, setPayoutName] = useState("");
  const [payoutAccount, setPayoutAccount] = useState("");

  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const [userCode, setUserCode] = useState("");
  const [memberSince, setMemberSince] = useState("");
  const [userLevel, setUserLevel] = useState(1);
  const [referrals, setReferrals] = useState(0);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      try {
        const docRef = doc(db, "users", user.uid);
        const snap = await getDoc(docRef);
        
        if (snap.exists()) {
          const data = snap.data();
          setDisplayName(data.displayName || user.displayName || "");
          setWhatsapp(data.whatsapp || "");
          setCountry(data.country || "");
          setChannelLink(data.channelLink || "");
          setAbout(data.about || "");
          setPhotoURL(data.photoURL || user.photoURL || "");
          setSelectedAvatar(data.avatar || "user");
          
          setPayoutMethod(data.payoutMethod || "Binance");
          setPayoutName(data.payoutName || "");
          setPayoutAccount(data.payoutAccount || "");
          
          setUserLevel(data.level || 1);
          setReferrals(data.referralsCount || 0);
          setUserCode(data.referralCode || user.uid.substring(0, 8).toUpperCase());
          
          if (data.createdAt) {
            setMemberSince(new Date(data.createdAt.toMillis()).toLocaleDateString());
          } else {
            setMemberSince(new Date().toLocaleDateString());
          }
        }
      } catch (error) {
        console.error("Error cargando perfil:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user]);

  const handleSaveData = async (e) => {
    if(e) e.preventDefault();
    setSavingData(true);
    try {
      if (displayName !== user.displayName) {
        await updateProfile(auth.currentUser, { displayName });
      }

      await setDoc(doc(db, "users", user.uid), {
        displayName, whatsapp, country, channelLink, about,
        avatar: selectedAvatar, photoURL,
        payoutMethod, payoutName, payoutAccount,
        updatedAt: new Date()
      }, { merge: true });

      toast.success("Guardado correctamente");
    } catch (error) {
      toast.error("Error al guardar los datos");
    } finally {
      setSavingData(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 200;
        const scaleSize = MAX_WIDTH / img.width;
        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scaleSize;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        const dataUrl = canvas.toDataURL("image/jpeg", 0.8);
        setPhotoURL(dataUrl);
        setSelectedAvatar(""); 
        toast.success("Foto cargada. ¡Dale a Guardar Avatar!");
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPass !== confirmPass) return toast.error("Las contraseñas no coinciden");
    if (newPass.length < 6) return toast.error("La contraseña debe tener al menos 6 caracteres");
    
    setSavingPass(true);
    try {
      await updatePassword(auth.currentUser, newPass);
      toast.success("Contraseña actualizada");
      setCurrentPass(""); setNewPass(""); setConfirmPass("");
    } catch (error) {
      if (error.code === 'auth/requires-recent-login') {
        toast.error("Por seguridad, cierra sesión y vuelve a entrar para cambiar la contraseña.");
      } else {
        toast.error("Error al cambiar la contraseña");
      }
    } finally {
      setSavingPass(false);
    }
  };

  const handleLogout = async () => {
    await auth.signOut();
    navigate({ to: "/login" });
  };

  if (loading) return <div className="text-center text-white mt-10 font-bold">Cargando perfil...</div>;

  return (
    <div className="space-y-6 pb-24">
      <div>
        <h1 className="text-3xl font-bold text-white mb-1">Mi perfil</h1>
        <p className="text-sm text-slate-400">Administra tu cuenta y tu seguridad.</p>
      </div>

      {/* AVATARES */}
      <div className="bg-[#0F1523] border border-white/5 rounded-2xl p-5">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center shadow-lg border-2 border-white/10 overflow-hidden text-white shrink-0">
            {photoURL ? <img src={photoURL} alt="Avatar" className="w-full h-full object-cover" /> : <AvatarDisplay name={selectedAvatar} className="w-8 h-8" />}
          </div>
          <div>
            <h3 className="font-bold text-white text-lg">Tu avatar</h3>
            <p className="text-xs text-slate-400">Elige uno de la galería o sube tu foto.</p>
            {(selectedAvatar !== "user" || photoURL) && (
              <button type="button" onClick={() => { setSelectedAvatar("user"); setPhotoURL(""); }} className="text-xs text-red-400 mt-1 hover:text-red-300">Quitar avatar</button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-6 gap-2 mb-4">
          {AVATAR_OPTIONS.map((av) => (
            <button 
              key={av} 
              type="button" 
              onClick={() => { setSelectedAvatar(av); setPhotoURL(""); }}
              className={`aspect-square flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition border-2 ${selectedAvatar === av ? 'border-blue-500 text-blue-500' : 'border-transparent text-slate-400'}`}
            >
              <AvatarDisplay name={av} className="w-6 h-6" />
            </button>
          ))}
        </div>
        
        <div className="border-t border-white/5 pt-4">
          <p className="text-sm text-slate-400 mb-2">O sube tu foto (JPG, PNG o WEBP)</p>
          <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageUpload} />

          <div onClick={() => fileInputRef.current?.click()} className="flex items-center gap-3 bg-black/30 border border-white/10 rounded-xl p-3 cursor-pointer hover:border-blue-500/50 transition-colors mb-4">
            <ImageIcon className="w-5 h-5 text-blue-500" />
            <div className="flex-1">
              <p className="text-xs font-bold text-white">Elegir una foto de mi galería</p>
              <p className="text-[10px] text-slate-500">{photoURL ? "Foto cargada en memoria" : "Ningún archivo elegido"}</p>
            </div>
            <button type="button" className="text-slate-400"><Upload className="w-4 h-4" /></button>
          </div>

          <button onClick={handleSaveData} disabled={savingData} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition">
            <Save className="w-4 h-4" /> {savingData ? "Guardando..." : "Guardar Avatar"}
          </button>
        </div>
      </div>

      {/* DATOS DEL USUARIO */}
      <div className="bg-[#0F1523] border border-white/5 rounded-2xl p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center border border-white/10 text-white shrink-0">
            {photoURL ? <img src={photoURL} alt="Avatar" className="w-full h-full object-cover rounded-full" /> : <AvatarDisplay name={selectedAvatar} className="w-6 h-6" />}
          </div>
          <div>
            <h3 className="font-bold text-white text-lg">{displayName || "Creador"}</h3>
            <p className="text-xs text-slate-400">{user?.email}</p>
          </div>
        </div>
        
        <div className="space-y-3 border-t border-white/5 pt-4 mb-4">
          <div className="flex justify-between text-sm items-center">
            <span className="text-slate-400">Nivel</span>
            <span className="font-bold text-blue-500 flex items-center gap-1"><Crown className="w-4 h-4" /> LEVEL {userLevel}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Miembro desde</span>
            <span className="font-medium text-white">{memberSince}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Referidos</span>
            <span className="font-medium text-white">{referrals}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Código</span>
            <span className="font-mono text-white">{userCode}</span>
          </div>
        </div>

        <button type="button" onClick={handleLogout} className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-500 font-bold text-sm py-3 rounded-xl flex items-center justify-center gap-2 transition border border-red-500/20">
          <LogOut className="w-4 h-4" /> Cerrar sesión
        </button>
      </div>

      {/* DATOS PERSONALES */}
      <div className="bg-[#0F1523] border border-white/5 rounded-2xl p-5 space-y-4">
        <h3 className="font-bold text-white text-lg flex items-center gap-2 mb-2">
          <User className="w-5 h-5 text-blue-500" /> Datos personales
        </h3>
        
        <div>
          <label className="block text-xs text-slate-400 mb-2">Nombre</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white text-sm outline-none focus:border-blue-500" />
          </div>
        </div>

        <div>
          <label className="block text-xs text-slate-400 mb-2">WhatsApp *</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input type="text" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="+1 809 000 0000" className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white text-sm outline-none focus:border-blue-500" />
          </div>
        </div>

        <div>
          <label className="block text-xs text-slate-400 mb-2">País</label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <select value={country} onChange={(e) => setCountry(e.target.value)} className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white text-sm outline-none focus:border-blue-500 appearance-none">
              <option value="">— Selecciona —</option>
              <option value="DO">República Dominicana</option>
              <option value="VE">Venezuela</option>
              <option value="CO">Colombia</option>
              <option value="MX">México</option>
              <option value="AR">Argentina</option>
              <option value="OTRO">Otro</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="block text-xs text-slate-400 mb-2">Link de tu canal</label>
          <div className="relative">
            <Video className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input type="url" value={channelLink} onChange={(e) => setChannelLink(e.target.value)} placeholder="https://youtube.com/@tucanal" className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white text-sm outline-none focus:border-blue-500" />
          </div>
        </div>

        <div>
          <label className="block text-xs text-slate-400 mb-2">Sobre ti (lo ven los demás en tu perfil)</label>
          <textarea value={about} onChange={(e) => setAbout(e.target.value)} maxLength={200} rows={3} placeholder="Cuenta quién eres, qué subes, dónde te encuentran..." className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-white text-sm outline-none focus:border-blue-500 resize-none" />
        </div>

        <button onClick={handleSaveData} disabled={savingData} className="w-full bg-[#2563eb] hover:bg-blue-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition shadow-lg shadow-blue-500/20 mt-2">
          <Save className="w-5 h-5" /> {savingData ? "Guardando..." : "Guardar Datos Personales"}
        </button>
      </div>

      {/* CAMBIAR CONTRASEÑA */}
      <form onSubmit={handleChangePassword} className="bg-[#0F1523] border border-white/5 rounded-2xl p-5 space-y-4 mt-6">
        <h3 className="font-bold text-white text-lg flex items-center gap-2 mb-2">
          <Lock className="w-5 h-5 text-blue-500" /> Cambiar contraseña
        </h3>
        
        <div>
          <label className="block text-xs text-slate-400 mb-2">Actual</label>
          <input type="password" value={currentPass} onChange={(e) => setCurrentPass(e.target.value)} placeholder="••••••••" className="w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 text-white text-sm outline-none focus:border-blue-500" />
        </div>
        <div>
          <label className="block text-xs text-slate-400 mb-2">Nueva</label>
          <input type="password" value={newPass} onChange={(e) => setNewPass(e.target.value)} placeholder="••••••••" className="w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 text-white text-sm outline-none focus:border-blue-500" />
        </div>
        <div>
          <label className="block text-xs text-slate-400 mb-2">Repetir</label>
          <input type="password" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} placeholder="••••••••" className="w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 text-white text-sm outline-none focus:border-blue-500" />
        </div>

        <button type="submit" disabled={savingPass} className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm py-3 px-6 rounded-xl transition disabled:opacity-50 mt-2">
          {savingPass ? "Actualizando..." : "Actualizar contraseña"}
        </button>
      </form>

      {/* MÉTODOS DE PAGO */}
      <div className="bg-[#0F1523] border border-white/5 rounded-2xl p-5 space-y-4 mt-6">
        <div>
          <p className="text-xs text-slate-400 mb-2">Guárdalo una vez y tu retiro se llenará solo. Puedes cambiarlo cuando quieras.</p>
          <h3 className="font-bold text-white text-lg mb-1">¿Cómo quieres cobrar?</h3>
        </div>

        <div className="space-y-3">
          <label className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition ${payoutMethod === 'Binance' ? 'border-blue-500 bg-blue-500/5' : 'border-white/10 bg-black/20'}`}>
            <div className="flex items-center gap-3">
              <div className="bg-yellow-500/10 p-2 rounded-lg text-yellow-500"><Wallet className="w-5 h-5" /></div>
              <div>
                <p className="text-sm font-bold text-white">Binance Pay</p>
                <p className="text-[10px] text-slate-400">A tu Pay ID o correo de Binance</p>
              </div>
            </div>
            <input type="radio" name="payout" value="Binance" checked={payoutMethod === "Binance"} onChange={() => setPayoutMethod("Binance")} className="w-5 h-5 accent-blue-600" />
          </label>

          <label className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition ${payoutMethod === 'PayPal' ? 'border-blue-500 bg-blue-500/5' : 'border-white/10 bg-black/20'}`}>
            <div className="flex items-center gap-3">
              <div className="bg-blue-500/10 p-2 rounded-lg text-blue-500 font-bold italic text-lg">P</div>
              <div>
                <p className="text-sm font-bold text-white">PayPal</p>
                <p className="text-[10px] text-slate-400">A tu correo de PayPal</p>
              </div>
            </div>
            <input type="radio" name="payout" value="PayPal" checked={payoutMethod === "PayPal"} onChange={() => setPayoutMethod("PayPal")} className="w-5 h-5 accent-blue-600" />
          </label>
        </div>

        <div className="pt-2">
          <label className="block text-xs text-slate-400 mb-2">Nombre del titular (quien recibe)</label>
          <input type="text" value={payoutName} onChange={(e) => setPayoutName(e.target.value)} placeholder="Nombre completo" className="w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 text-white text-sm outline-none focus:border-blue-500" />
        </div>
        
        <div>
          <label className="block text-xs text-slate-400 mb-2">
            {payoutMethod === 'Binance' ? 'Pay ID o correo de Binance' : 'Correo de PayPal'}
          </label>
          <input 
            type="text" 
            value={payoutAccount} 
            onChange={(e) => setPayoutAccount(e.target.value)} 
            placeholder={payoutMethod === 'Binance' ? "Ej: 123456789 o correo" : "tucorreo@paypal.com"} 
            className="w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 text-white text-sm outline-none focus:border-blue-500" 
          />
        </div>
        
        <button type="button" onClick={handleSaveData} disabled={savingData} className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-xl transition mt-2">
          Guardar método de pago
        </button>
      </div>

    </div>
  );

