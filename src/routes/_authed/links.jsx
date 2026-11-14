import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Link as LinkIcon, Tag, Zap, Loader2 } from "lucide-react";

export const Route = createFileRoute("/_authed/links")({
  head: () => ({
    meta: [{ title: "Crear Enlace — NASETLINK" }],
  }),
  component: CreateLinkPage,
});

function CreateLinkPage() {
  const { user } = Route.useRouteContext();
  const navigate = useNavigate();

  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [steps, setSteps] = useState(6);
  const [loading, setLoading] = useState(false);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!url.trim()) return toast.error("Pega un enlace válido");
    setLoading(true);

    try {
      // Si no pone slug, generamos uno aleatorio
      let finalCode = slug.trim().toLowerCase().replace(/[^a-z0-9]/g, "");
      if (!finalCode) {
        const chars = "abcdefghijkmnpqrstuvwxyz23456789";
        for (let i = 0; i < 7; i++) finalCode += chars[Math.floor(Math.random() * chars.length)];
      }

      await addDoc(collection(db, "links"), {
        original_url: url,
        name: name || "Sin nombre",
        short_code: finalCode,
        steps: steps,
        clicks: 0,
        earnings: 0,
        userId: user.uid,
        createdAt: serverTimestamp()
      });

      toast.success("¡Enlace creado con éxito!");
      navigate({ to: "/dashboard" }); // Te regresa al dashboard al terminar
    } catch (error) {
      console.error(error);
      toast.error("Error al crear el enlace");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-20">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Crear enlace</h1>
        <p className="text-sm text-slate-400 leading-relaxed">
          Un enlace de NASETLINK que manda a tu gente a donde quieras. Se arma al instante.
        </p>
      </div>

      <form onSubmit={handleCreate} className="space-y-5">
        {/* URL */}
        <div className="bg-[#0F1523] border border-white/5 rounded-2xl p-4">
          <label className="block text-sm font-semibold text-white mb-2">
            Tu enlace <span className="text-slate-500 font-normal">(a dónde mandas a tu gente)</span>
          </label>
          <div className="relative">
            <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://midescarga.com/archivo.zip"
              className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-slate-600 outline-none focus:border-blue-500 transition-colors"
              required
            />
          </div>
          <p className="text-xs text-slate-500 mt-2">Cualquier enlace: tu tienda, un archivo, un grupo, un video...</p>
        </div>

        {/* Nombre */}
        <div className="bg-[#0F1523] border border-white/5 rounded-2xl p-4">
          <label className="block text-sm font-semibold text-white mb-2">
            Nombre <span className="text-slate-500 font-normal">(solo para ti)</span>
          </label>
          <div className="relative">
            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: Mi app, Canal de FF..."
              className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-slate-600 outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* Slug personalizado */}
        <div className="bg-[#0F1523] border border-white/5 rounded-2xl p-4">
          <label className="block text-sm font-semibold text-white mb-2">
            Nombre del enlace <span className="text-slate-500 font-normal">— opcional</span>
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">@</span>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="mitienda"
              className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-slate-600 outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <p className="text-xs text-slate-500 mt-2">
            Quedará como <span className="text-slate-400">{window.location.host}/s/{slug || "link-aleatorio"}</span>. Vacío = uno corto al azar.
          </p>
        </div>

        {/* Pasos */}
        <div className="bg-[#0F1523] border border-white/5 rounded-2xl p-4">
          <label className="block text-sm font-semibold text-white mb-3">
            Pasos <span className="text-slate-500 font-normal">— más pasos, más te pagan</span>
          </label>
          <div className="grid grid-cols-5 gap-2">
            {[2, 3, 4, 5, 6].map((step) => (
              <button
                key={step}
                type="button"
                onClick={() => setSteps(step)}
                className={`flex flex-col items-center justify-center py-3 rounded-xl border transition-colors ${
                  steps === step 
                    ? "bg-blue-500/10 border-blue-500 text-white" 
                    : "bg-black/20 border-white/10 text-slate-400 hover:border-white/20"
                }`}
              >
                <span className="text-lg font-bold">{step}</span>
                <span className={`text-[10px] mt-0.5 ${steps === step ? "text-blue-400" : "text-slate-500"}`}>
                  ~${step === 2 ? "4.00" : step === 3 ? "9.00" : step === 4 ? "12.50" : step === 5 ? "15.00" : "17.50"}
                </span>
              </button>
            ))}
          </div>
          <p className="text-sm text-white mt-4 font-medium">
            Con {steps} pasos ganas aprox. <strong className="text-blue-400">~${steps === 2 ? "4.00" : steps === 3 ? "9.00" : steps === 4 ? "12.50" : steps === 5 ? "15.00" : "17.50"} por cada 1.000 clics</strong>.
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Es un estimado según tu nivel. Lo que ganes de verdad depende de cuántos clics sean válidos.
          </p>
        </div>

        {/* Botón Crear */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#2563eb] hover:bg-blue-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5 fill-white" />}
          {loading ? "Creando..." : "Crear mi enlace"}
        </button>
      </form>
    </div>
  );
}
