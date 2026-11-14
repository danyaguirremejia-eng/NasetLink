import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, addDoc, deleteDoc, doc, serverTimestamp } from "firebase/firestore";
import { toast } from "sonner";
import { 
  Key, Clock, SlidersHorizontal, Plug, Copy, ChevronDown, ChevronRight, 
  Tag, Zap, Loader2, XCircle, Info, Shield, CheckCircle2 
} from "lucide-react";

export const Route = createFileRoute("/_authed/keys")({
  head: () => ({ meta: [{ title: "Crear Key — NASETLINK" }] }),
  component: KeysPage,
});

function KeysPage() {
  const { user } = Route.useRouteContext();

  const [prefix, setPrefix] = useState("");
  const [duration, setDuration] = useState("1");
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [steps, setSteps] = useState(6);
  
  const [loading, setLoading] = useState(false);
  const [myKeys, setMyKeys] = useState([]);
  
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showCode, setShowCode] = useState(false);

  const domain = window.location.origin;
  const verifyUrl = `${domain}/api/llave.php?k=LA_LLAVE`;

  useEffect(() => {
    fetchKeys();
  }, [user]);

  const fetchKeys = async () => {
    if (!user) return;
    try {
      const q = query(collection(db, "keys"), where("userId", "==", user.uid));
      const snap = await getDocs(q);
      const fetched = [];
      snap.forEach(doc => fetched.push({ id: doc.id, ...doc.data() }));
      setMyKeys(fetched.reverse());
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const p = prefix.trim().toUpperCase() || "MIAPP";
      const randomChars = () => Math.random().toString(36).substring(2, 6).toUpperCase();
      const generatedKey = `${p}-${randomChars()}-${randomChars()}-${randomChars()}`;
      
      const finalSlug = slug.trim().toLowerCase().replace(/[^a-z0-9]/g, "") || Math.random().toString(36).substring(2, 9);

      await addDoc(collection(db, "keys"), {
        userId: user.uid,
        key: generatedKey,
        prefix: p,
        duration: `${duration} día(s)`,
        name: name || "Sin nombre",
        slug: finalSlug,
        steps: steps,
        clicks: 0,
        earnings: 0,
        createdAt: serverTimestamp()
      });

      toast.success("¡Key creada con éxito!");
      setPrefix(""); setName(""); setSlug(""); setSteps(6);
      fetchKeys();
    } catch (error) {
      console.error(error);
      toast.error("Error al crear la key");
    } finally {
      setLoading(false);
    }
  };

  const handleRevoke = async (keyId) => {
    if (!confirm("¿Seguro que quieres revocar esta key?")) return;
    try {
      await deleteDoc(doc(db, "keys", keyId));
      toast.success("Key revocada");
      fetchKeys();
    } catch (error) {
      toast.error("Error al revocar");
    }
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copiado");
  };

  const keyPreview = `${prefix.trim().toUpperCase() || "MIAPP"}-XXXX-XXXX-XXXX`;

  return (
    <div className="space-y-6 pb-24">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Key className="w-6 h-6 text-blue-500" />
          <h1 className="text-2xl font-bold text-white">Crear key</h1>
        </div>
        <p className="text-sm text-slate-400 leading-relaxed">
          Un enlace de NASETLINK que entrega una licencia para tu app. Tu gente pasa los pasos, recibe su key y tú cobras.
        </p>
      </div>

      <form onSubmit={handleCreate} className="space-y-5">
        
        {/* Prefijo */}
        <div className="bg-[#0F1523] border border-white/5 rounded-2xl p-4">
          <label className="block text-sm font-semibold text-white mb-2">
            Prefijo de la key <span className="text-slate-500 font-normal">(cómo empieza)</span>
          </label>
          <div className="relative mb-3">
            <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              type="text"
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              placeholder="BRASILEIRO"
              className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-slate-600 outline-none focus:border-blue-500 uppercase"
            />
          </div>
          <div className="bg-black/20 border border-white/5 rounded-lg p-3 text-sm font-mono text-slate-300">
            Tu key será: <span className="text-white font-bold">{keyPreview}</span>
          </div>
        </div>

        {/* Duración */}
        <div className="bg-[#0F1523] border border-white/5 rounded-2xl p-4">
          <label className="block text-sm font-semibold text-white mb-2">
            Duración <span className="text-slate-500 font-normal">(cuánto sirve la key)</span>
          </label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white outline-none focus:border-blue-500 appearance-none"
            >
              <option value="1">1 día</option>
              <option value="7">7 días</option>
              <option value="30">30 días</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
          </div>
          <p className="text-xs text-slate-500 mt-2">Cada persona que pase los pasos recibe su propia key, que vence en ese tiempo.</p>
        </div>

        {/* Opciones avanzadas (Toggle) */}
        <div className="border border-white/5 rounded-2xl overflow-hidden">
          <button 
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="w-full flex items-center gap-2 p-4 bg-[#0F1523] text-sm font-semibold text-white hover:bg-white/5 transition"
          >
            {showAdvanced ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            <SlidersHorizontal className="w-4 h-4 text-blue-500" />
            Opciones avanzadas de la key
          </button>
          {showAdvanced && (
            <div className="p-4 bg-[#0F1523] border-t border-white/5">
              <p className="text-xs text-slate-400">Configuraciones extra se pueden añadir aquí.</p>
            </div>
          )}
        </div>

        {/* URL de Verificación */}
        <div className="bg-[#0F1523] border border-white/5 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2 text-white font-semibold text-sm">
            <Plug className="w-5 h-5 text-blue-500" /> Dirección para verificar la key (tu app pregunta aquí)
          </div>
          <div className="flex gap-2">
            <div className="flex-1 bg-black/30 border border-white/10 rounded-xl p-3 text-sm text-slate-300 font-mono truncate">
              {verifyUrl}
            </div>
            <button type="button" onClick={() => copyText(verifyUrl)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-xl font-bold text-sm flex items-center gap-2">
              <Copy className="w-4 h-4" /> Copiar
            </button>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">Cambia <strong className="text-slate-300">LA_LLAVE</strong> por la key del usuario. Responde valida: true o false.</p>
        </div>

        {/* Nombre y Slug */}
        <div className="bg-[#0F1523] border border-white/5 rounded-2xl p-4 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-white mb-2">Nombre <span className="text-slate-500 font-normal">(solo para ti)</span></label>
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ej: Mi app, Canal de FF..." className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-slate-600 outline-none focus:border-blue-500" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-white mb-2">Nombre del enlace <span className="text-slate-500 font-normal">— opcional</span></label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">@</span>
              <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="mitienda" className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-slate-600 outline-none focus:border-blue-500" />
            </div>
            <p className="text-xs text-slate-500 mt-2">Quedará como <span className="text-slate-400">{window.location.host}/s/{slug || "aleatorio"}</span>.</p>
          </div>
        </div>

        {/* Pasos */}
        <div className="bg-[#0F1523] border border-white/5 rounded-2xl p-4">
          <label className="block text-sm font-semibold text-white mb-3">
            Pasos <span className="text-slate-500 font-normal">— más pasos, más te pagan</span>
          </label>
          <div className="grid grid-cols-5 gap-2">
            {[2, 3, 4, 5, 6].map((step) => (
              <button key={step} type="button" onClick={() => setSteps(step)} className={`flex flex-col items-center justify-center py-3 rounded-xl border transition ${steps === step ? "bg-blue-500/10 border-blue-500 text-white" : "bg-black/20 border-white/10 text-slate-400 hover:border-white/20"}`}>
                <span className="text-lg font-bold">{step}</span>
                <span className={`text-[10px] mt-0.5 ${steps === step ? "text-blue-400" : "text-slate-500"}`}>~${step === 2 ? "4.00" : step === 3 ? "9.00" : step === 4 ? "12.50" : step === 5 ? "15.80" : "17.50"}</span>
              </button>
            ))}
          </div>
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 mt-4 flex items-center gap-3">
            <div className="bg-blue-500/20 p-2 rounded-lg text-blue-500"><Zap className="w-5 h-5" /></div>
            <p className="text-sm text-white font-medium">Con {steps} pasos ganas aprox. <strong className="text-blue-400">~${steps === 2 ? "4.00" : steps === 3 ? "9.00" : steps === 4 ? "12.50" : steps === 5 ? "15.80" : "17.50"} por cada 1.000 clics</strong>.</p>
          </div>
        </div>

        {/* Botón Crear */}
        <button type="submit" disabled={loading} className="w-full bg-[#2563eb] hover:bg-blue-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition disabled:opacity-50">
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Key className="w-5 h-5" />}
          {loading ? "Creando..." : "Crear mi key"}
        </button>
      </form>

      {/* Cómo conectar (Toggle) */}
      <div className="border border-white/5 rounded-2xl overflow-hidden">
        <button type="button" onClick={() => setShowCode(!showCode)} className="w-full flex items-center gap-2 p-4 bg-[#0F1523] text-sm font-semibold text-white hover:bg-white/5 transition">
          {showCode ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          <Plug className="w-4 h-4 text-blue-500" /> Cómo conectar tu app (código listo)
        </button>
        {showCode && (
          <div className="p-4 bg-black/40 border-t border-white/5">
            <pre className="text-xs text-green-400 overflow-x-auto">
{`$ch = curl_init("${verifyUrl}");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$d = json_decode(curl_exec($ch), true);
if ($d["valida"]) { /* deja entrar */ }`}
            </pre>
          </div>
        )}
      </div>

      {/* Revocar Key */}
      <div className="bg-[#0F1523] border border-white/5 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-2">
          <XCircle className="w-5 h-5 text-red-500" />
          <h3 className="font-bold text-white">Revocar una key</h3>
        </div>
        <p className="text-xs text-slate-400 mb-4">Anula una key al instante (si la están compartiendo). Pega la key completa.</p>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input type="text" placeholder="PREFIJO-XXXX-XXXX-XXXX" className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-9 pr-4 text-white outline-none focus:border-red-500 font-mono text-sm" />
          </div>
          <button type="button" className="bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20 px-4 rounded-xl font-bold text-sm transition">Revocar</button>
        </div>
      </div>

      {/* Cómo funciona */}
      <div className="bg-[#0F1523] border border-white/5 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Info className="w-5 h-5 text-blue-500" />
          <h3 className="font-bold text-white">Cómo funciona</h3>
        </div>
        <div className="space-y-4">
          <div className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center font-bold text-xs shrink-0">1</div>
            <p className="text-sm text-slate-300">Eliges cómo empieza la key, cuánto dura y los pasos.</p>
          </div>
          <div className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center font-bold text-xs shrink-0">2</div>
            <p className="text-sm text-slate-300">En segundos te damos un enlace de <strong className="text-white">NASETLINK</strong> para compartir.</p>
          </div>
          <div className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center font-bold text-xs shrink-0">3</div>
            <p className="text-sm text-slate-300">Tu gente pasa los pasos y recibe su key. <strong className="text-white">Tú cobras.</strong></p>
          </div>
        </div>
        <div className="mt-4 bg-blue-500/5 border border-blue-500/10 rounded-xl p-3 flex gap-2 items-start">
          <Shield className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
          <p className="text-xs text-slate-400">Tu app verifica la key en <strong className="text-blue-400">/api/llave.php</strong>. El código listo está arriba.</p>
        </div>
      </div>

      {/* Mis Keys */}
      <div>
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center justify-between">
          MIS KEYS <span>({myKeys.length})</span>
        </h2>
        
        {myKeys.length === 0 ? (
          <div className="bg-[#0F1523] border border-white/5 rounded-2xl p-8 text-center">
            <div className="bg-white/5 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Key className="w-6 h-6 text-slate-500" />
            </div>
            <p className="text-sm text-slate-400">Todavía no has creado ninguna key. Crea la primera arriba. 👇</p>
          </div>
        ) : (
          <div className="space-y-3">
            {myKeys.map(k => (
              <div key={k.id} className="bg-[#0F1523] border border-white/5 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <p className="font-bold text-white font-mono">{k.key}</p>
                  <p className="text-xs text-slate-500">{k.name} · {k.steps} pasos · {k.duration}</p>
                </div>
                <button onClick={() => handleRevoke(k.id)} className="text-red-400 p-2 hover:bg-red-500/10 rounded-lg transition">
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
