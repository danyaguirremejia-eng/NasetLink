import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { toast } from "sonner";
import { Code2, Key, Copy, RefreshCw, AlertTriangle, Zap, RefreshCcw, TrendingUp, ShieldAlert, CheckCircle2, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/_authed/api")({
  head: () => ({ meta: [{ title: "API para desarrolladores — NASETLINK" }] }),
  component: ApiPage,
});

function ApiPage() {
  const { user } = Route.useRouteContext();
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("php");

  const domain = window.location.origin;

  useEffect(() => {
    const fetchToken = async () => {
      if (!user) return;
      try {
        const userRef = doc(db, "users", user.uid);
        const snap = await getDoc(userRef);
        
        if (snap.exists() && snap.data().apiToken) {
          setToken(snap.data().apiToken);
        } else {
          const newToken = Array.from({length: 40}, () => Math.floor(Math.random() * 36).toString(36)).join('');
          await setDoc(userRef, { apiToken: newToken }, { merge: true });
          setToken(newToken);
        }
      } catch (error) {
        console.error("Error cargando token:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchToken();
  }, [user]);

  const generateNewToken = async () => {
    if (!confirm("¿Seguro que quieres cambiar tu token? El anterior dejará de funcionar.")) return;
    try {
      const newToken = Array.from({length: 40}, () => Math.floor(Math.random() * 36).toString(36)).join('');
      await setDoc(doc(db, "users", user.uid), { apiToken: newToken }, { merge: true });
      setToken(newToken);
      toast.success("Token actualizado");
    } catch (error) {
      toast.error("Error al cambiar el token");
    }
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copiado al portapapeles");
  };

  const apiEndpoint = `${domain}/api?api=${token}&url=`;

  const codeExamples = {
    php: `<?php
$token = '${token}';
$url   = urlencode('https://tudestino.com');

$r = json_decode(file_get_contents("${domain}/api?api=$token&url=$url"), true);

if ($r['status'] === 'success') {
    echo $r['shortenedUrl'];
} else {
    echo 'Error: ' . $r['message'];
}
?>`,
    js: `const token = '${token}';
const url   = encodeURIComponent('https://tudestino.com');

const r = await fetch(\`${domain}/api?api=\${token}&url=\${url}\`).then(res => res.json());

if (r.status === 'success') console.log(r.shortenedUrl);
else console.error(r.message);`,
    py: `import requests

token = '${token}'
url = 'https://tudestino.com'

r = requests.get(f'${domain}/api?api={token}&url={url}').json()

if r['status'] == 'success':
    print(r['shortenedUrl'])
else:
    print('Error:', r['message'])`,
    curl: `curl -X GET "${domain}/api?api=${token}&url=https://tudestino.com"`
  };

  if (loading) return <div className="text-white text-center mt-10">Cargando API...</div>;

  return (
    <div className="space-y-6 pb-24">
      
      {/* Header */}
      <div className="flex gap-3 items-start">
        <div className="bg-blue-500/10 p-2.5 rounded-xl text-blue-500 shrink-0">
          <Code2 className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-white leading-tight">API para desarrolladores</h1>
          <p className="text-sm text-slate-400 mt-1">Crea enlaces de NASETLINK desde tu web, tu bot o tu app, sin entrar al panel.</p>
        </div>
      </div>

      {/* Token */}
      <div className="bg-[#0F1523] border border-white/5 rounded-2xl p-5">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Tu Token</p>
        <div className="flex gap-2 items-center mb-3">
          <div className="flex-1 bg-black/40 border border-white/10 rounded-xl p-3 text-sm text-slate-300 font-mono truncate">
            {token}
          </div>
          <button onClick={() => copyText(token)} className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl transition">
            <Copy className="w-5 h-5" />
          </button>
        </div>
        <div className="flex gap-2 items-start text-xs text-yellow-500 mb-4">
          <span className="text-base leading-none">🔒</span>
          <p>Es como tu contraseña: con él cualquiera crea enlaces a tu nombre. No lo compartas.</p>
        </div>
        <button onClick={generateNewToken} className="border border-white/10 text-slate-300 hover:bg-white/5 text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-2 transition">
          <RefreshCw className="w-4 h-4" /> Cambiar token
        </button>
      </div>

      {/* Cómo usarla */}
      <div className="bg-[#0F1523] border border-white/5 rounded-2xl p-5">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Cómo usarla</p>
        <p className="text-sm text-slate-300 mb-4">Manda un <strong className="text-white">GET</strong> con tu token y el enlace a acortar. Te responde en <strong className="text-white">JSON</strong> o en <strong className="text-white">texto</strong>.</p>
        <div className="flex gap-2 items-center bg-black/40 border border-white/10 rounded-xl p-3">
          <span className="text-sm text-slate-400 font-mono truncate flex-1">{apiEndpoint}...</span>
          <button onClick={() => copyText(apiEndpoint)} className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shrink-0 hover:bg-blue-700 transition">
            <Copy className="w-3.5 h-3.5" /> Copiar
          </button>
        </div>
      </div>

      {/* Parámetros */}
      <div className="bg-[#0F1523] border border-white/5 rounded-2xl p-5">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Parámetros</p>
        <div className="space-y-3">
          <div className="grid grid-cols-[70px_1fr] gap-2 items-start border-b border-white/5 pb-2">
            <span className="text-xs text-red-400 font-mono">api</span>
            <div className="text-xs text-slate-300">Tu token <span className="text-yellow-500 font-bold">OBLIGATORIO</span></div>
          </div>
          <div className="grid grid-cols-[70px_1fr] gap-2 items-start border-b border-white/5 pb-2">
            <span className="text-xs text-red-400 font-mono">url</span>
            <div className="text-xs text-slate-300">A dónde mandas a tu gente <span className="text-yellow-500 font-bold">OBLIGATORIO</span></div>
          </div>
          <div className="grid grid-cols-[70px_1fr] gap-2 items-start border-b border-white/5 pb-2">
            <span className="text-xs text-red-400 font-mono">alias</span>
            <div className="text-xs text-slate-300">Nombre del enlace: {window.location.host}/alias. Si no lo pones, se crea uno corto</div>
          </div>
          <div className="grid grid-cols-[70px_1fr] gap-2 items-start border-b border-white/5 pb-2">
            <span className="text-xs text-red-400 font-mono">steps</span>
            <div className="text-xs text-slate-300">Pasos, del 2 al 6. Si no lo pones: 6</div>
          </div>
          <div className="grid grid-cols-[70px_1fr] gap-2 items-start border-b border-white/5 pb-2">
            <span className="text-xs text-red-400 font-mono">name</span>
            <div className="text-xs text-slate-300">Cómo se ve en tu lista de enlaces</div>
          </div>
          <div className="grid grid-cols-[70px_1fr] gap-2 items-start">
            <span className="text-xs text-red-400 font-mono">format</span>
            <div className="text-xs text-slate-300">Pon <span className="text-red-400 font-mono">text</span> para recibir solo el enlace, sin JSON</div>
          </div>
        </div>
      </div>

      {/* Respuestas */}
      <div className="bg-[#0F1523] border border-white/5 rounded-2xl p-5 space-y-5">
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Si sale bien</p>
          <div className="bg-black/50 border border-white/5 rounded-xl p-4 overflow-x-auto">
            <pre className="text-xs text-green-400 font-mono">
{`{"status":"success","shortenedUrl":"${domain}/mienlace"}`}
            </pre>
          </div>
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Si algo falla</p>
          <div className="bg-black/50 border border-white/5 rounded-xl p-4 overflow-x-auto">
            <pre className="text-xs text-red-400 font-mono">
{`{"status":"error","message":"Ese alias ya está en uso, elige otro."}`}
            </pre>
          </div>
        </div>
      </div>

      {/* Ejemplos listos */}
      <div className="bg-[#0F1523] border border-white/5 rounded-2xl p-5">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Ejemplos listos para copiar</p>
        
        <div className="flex gap-2 mb-3 overflow-x-auto pb-1 no-scrollbar">
          {['PHP', 'JavaScript', 'Python', 'cURL'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase() === 'javascript' ? 'js' : tab.toLowerCase())}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition whitespace-nowrap ${activeTab === (tab.toLowerCase() === 'javascript' ? 'js' : tab.toLowerCase()) ? 'bg-blue-600 text-white' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative bg-black/50 border border-white/5 rounded-xl p-4">
          <button 
            onClick={() => copyText(codeExamples[activeTab])} 
            className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 hover:bg-blue-700 transition"
          >
            <Copy className="w-3.5 h-3.5" /> Copiar
          </button>
          <pre className="text-xs text-slate-300 font-mono overflow-x-auto pt-8">
            {codeExamples[activeTab]}
          </pre>
        </div>
      </div>

      {/* Notas */}
      <div className="space-y-3">
        <div className="bg-[#0F1523] border border-white/5 rounded-xl p-4 flex gap-3 text-slate-300 text-sm">
          <Zap className="w-5 h-5 text-blue-500 shrink-0" /> El enlace queda <strong className="text-white">activo al momento</strong>. Si hay muchos pidiéndose a la vez, puede tardar unos segundos.
        </div>
        <div className="bg-[#0F1523] border border-white/5 rounded-xl p-4 flex gap-3 text-slate-300 text-sm">
          <RefreshCcw className="w-5 h-5 text-blue-500 shrink-0" /> Si pides <strong className="text-white">el mismo destino con los mismos pasos</strong>, te devuelve el mismo enlace, no uno nuevo.
        </div>
        <div className="bg-[#0F1523] border border-white/5 rounded-xl p-4 flex gap-3 text-slate-300 text-sm">
          <TrendingUp className="w-5 h-5 text-blue-500 shrink-0" /> Los enlaces salen en <span className="text-blue-500">Crear enlace</span> con sus clics y ganancias, igual que los demás.
        </div>
        <div className="bg-[#0F1523] border border-white/5 rounded-xl p-4 flex gap-3 text-slate-300 text-sm">
          <ShieldAlert className="w-5 h-5 text-blue-500 shrink-0" /> Si tu token se filtró, <strong className="text-white">cámbialo</strong>: el viejo deja de funcionar al instante.
        </div>
      </div>

    </div>
  );
}
