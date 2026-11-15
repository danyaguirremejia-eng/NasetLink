import { useState, useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { toast } from "sonner";
import { ArrowLeft, Save, Settings, ShieldAlert, DollarSign } from "lucide-react";

export const Route = createFileRoute("/_authed/admin/configuracion")({
  head: () => ({ meta: [{ title: "Configuración — NASETLINK" }] }),
  component: AdminConfigPage,
});

function AdminConfigPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [minWithdrawal, setMinWithdrawal] = useState(5);
  const [maintenance, setMaintenance] = useState(false);
  const [ecpmBase, setEcpmBase] = useState(17.50);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const snap = await getDoc(doc(db, "settings", "global"));
        if (snap.exists()) {
          const data = snap.data();
          setMinWithdrawal(data.minWithdrawal || 5);
          setMaintenance(data.maintenance || false);
          setEcpmBase(data.ecpmBase || 17.50);
        }
      } catch (error) { console.error(error); } finally { setLoading(false); }
    };
    fetchSettings();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await setDoc(doc(db, "settings", "global"), {
        minWithdrawal: Number(minWithdrawal), maintenance: maintenance, ecpmBase: Number(ecpmBase), updatedAt: new Date()
      }, { merge: true });
      toast.success("Configuración guardada");
    } catch (error) { toast.error("Error al guardar"); } finally { setSaving(false); }
  };

  if (loading) return <div className="text-white text-center mt-10">Cargando...</div>;

  return (
    <div className="space-y-6 pb-24">
      <button onClick={() => navigate({ to: "/admin" })} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium"><ArrowLeft className="w-4 h-4" /> Volver al Admin</button>
      <div><h1 className="text-3xl font-bold text-white mb-1 flex items-center gap-2"><Settings className="w-7 h-7 text-blue-500" /> Configuración Global</h1></div>
      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-[#0F1523] border border-white/5 rounded-2xl p-5 space-y-5">
          <h3 className="font-bold text-white flex items-center gap-2 border-b border-white/5 pb-3"><DollarSign className="w-5 h-5 text-emerald-500" /> Finanzas</h3>
          <div><label className="block text-xs text-slate-400 mb-2">Mínimo de Retiro (USD)</label><input type="number" step="0.1" value={minWithdrawal} onChange={(e) => setMinWithdrawal(e.target.value)} className="w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 text-white outline-none focus:border-blue-500" /></div>
          <div><label className="block text-xs text-slate-400 mb-2">eCPM Base</label><input type="number" step="0.1" value={ecpmBase} onChange={(e) => setEcpmBase(e.target.value)} className="w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 text-white outline-none focus:border-blue-500" /></div>
        </div>
        <div className="bg-[#0F1523] border border-red-500/20 rounded-2xl p-5 space-y-4">
          <h3 className="font-bold text-white flex items-center gap-2 border-b border-white/5 pb-3"><ShieldAlert className="w-5 h-5 text-red-500" /> Estado</h3>
          <label className="flex items-center justify-between cursor-pointer">
            <p className="text-sm font-bold text-white">Modo Mantenimiento</p>
            <input type="checkbox" checked={maintenance} onChange={(e) => setMaintenance(e.target.checked)} className="w-5 h-5 accent-red-600 rounded" />
          </label>
        </div>
        <button type="submit" disabled={saving} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition disabled:opacity-50"><Save className="w-5 h-5" /> {saving ? "Guardando..." : "Guardar Configuración"}</button>
      </form>
    </div>
  );
}
