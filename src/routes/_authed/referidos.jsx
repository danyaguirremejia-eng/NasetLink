import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Users, Share2, Copy, Send, Download, Zap, Wallet, UserCheck, List, Facebook } from "lucide-react";

export const Route = createFileRoute("/_authed/referidos")({
  head: () => ({ meta: [{ title: "Referidos — NASETLINK" }] }),
  component: ReferidosPage,
});

function ReferidosPage() {
  const { user } = Route.useRouteContext();
  const domain = window.location.origin;
  
  // Tu link de referidos real
  const refLink = `${domain}/register?ref=${user?.uid}`;
  
  // Texto personalizado para compartir (Sin copyright)
  const shareMessage = `🔥 Estoy generando ingresos extra con mis enlaces en NASETLINK. Únete gratis con mi enlace y empieza a ganar tú también: ${refLink}`;

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copiado al portapapeles");
  };

  const shareWhatsApp = () => window.open(`https://wa.me/?text=${encodeURIComponent(shareMessage)}`, '_blank');
  const shareTelegram = () => window.open(`https://t.me/share/url?url=${encodeURIComponent(refLink)}&text=${encodeURIComponent(shareMessage)}`, '_blank');
  const shareTwitter = () => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}`, '_blank');
  const shareFacebook = () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(refLink)}`, '_blank');

  // URL del generador de QR (usando una API pública para no instalar librerías)
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(refLink)}&color=0a0e17&bgcolor=ffffff`;

  return (
    <div className="space-y-6 pb-24">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-white mb-1">Invita y gana</h1>
        <p className="text-sm text-slate-400 leading-relaxed">
          Ganas <strong className="text-blue-500">5%</strong> de lo que generen tus invitados durante <strong className="text-white">6 meses</strong>. A ellos no se les descuenta nada.
        </p>
      </div>

      {/* Tu Link */}
      <div className="bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] rounded-2xl p-5 shadow-lg relative overflow-hidden">
        <div className="flex items-center gap-2 text-blue-100 mb-3">
          <Users className="w-5 h-5" />
          <span className="text-sm font-medium">Tu link de invitación</span>
        </div>
        <div className="flex gap-2 items-center bg-black/20 border border-white/10 rounded-xl p-2 pl-4">
          <span className="text-sm text-white font-mono truncate flex-1">{refLink}</span>
          <button onClick={() => copyToClipboard(refLink)} className="bg-white text-blue-700 font-bold text-xs px-4 py-2.5 rounded-lg flex items-center gap-1.5 transition hover:bg-blue-50 shrink-0">
            <Copy className="w-4 h-4" /> Copiar
          </button>
        </div>
      </div>

      {/* Kit para invitar */}
      <div className="bg-[#0F1523] border border-white/5 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Share2 className="w-5 h-5 text-blue-500" />
          <h3 className="font-bold text-white">Kit para invitar</h3>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mb-6">
          <button onClick={shareTelegram} className="flex flex-col items-center justify-center bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl p-3 transition-colors">
            <Send className="w-6 h-6 text-[#2AABEE] mb-2" />
            <span className="text-xs font-medium text-slate-300">Telegram</span>
          </button>
          <button onClick={shareTwitter} className="flex flex-col items-center justify-center bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl p-3 transition-colors">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-white mb-2" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            <span className="text-xs font-medium text-slate-300">X (Twitter)</span>
          </button>
          <button onClick={shareFacebook} className="flex flex-col items-center justify-center bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl p-3 transition-colors">
            <Facebook className="w-6 h-6 text-[#1877F2] mb-2" />
            <span className="text-xs font-medium text-slate-300">Facebook</span>
          </button>
        </div>

        {/* QR */}
        <div className="bg-black/20 border border-white/5 rounded-2xl p-6 flex flex-col items-center">
          <div className="bg-white p-3 rounded-xl mb-4">
            <img src={qrUrl} alt="QR Code" className="w-40 h-40" />
          </div>
          <a href={qrUrl} target="_blank" rel="noreferrer" className="bg-white/5 hover:bg-white/10 border border-white/10 text-blue-400 text-xs font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition">
            <Download className="w-4 h-4" /> Descargar QR
          </a>
        </div>

        {/* Mensaje listo */}
        <div className="mt-4">
          <p className="text-xs text-slate-400 mb-2">Mensaje listo para pegar</p>
          <div className="bg-black/50 border border-white/5 rounded-xl p-4 mb-3">
            <p className="text-sm text-slate-300 leading-relaxed">
              {shareMessage}
            </p>
          </div>
          <button onClick={() => copyToClipboard(shareMessage)} className="bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold py-2.5 px-4 rounded-lg flex items-center gap-2 transition">
            <Copy className="w-4 h-4" /> Copiar mensaje
          </button>
        </div>
      </div>

      {/* Estadísticas Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-[#0F1523] border border-white/5 rounded-2xl p-5">
          <div className="bg-blue-500/10 p-2 rounded-xl w-fit text-blue-500 mb-3"><Users className="w-5 h-5" /></div>
          <h3 className="text-2xl font-black text-white">0</h3>
          <p className="text-xs text-slate-400 mt-1">Invitados</p>
        </div>
        
        <div className="bg-[#0F1523] border border-white/5 rounded-2xl p-5">
          <div className="bg-green-500/10 p-2 rounded-xl w-fit text-green-500 mb-3"><UserCheck className="w-5 h-5" /></div>
          <h3 className="text-2xl font-black text-white">0</h3>
          <p className="text-xs text-slate-400 mt-1">Aprobados</p>
        </div>
        
        <div className="bg-[#0F1523] border border-white/5 rounded-2xl p-5">
          <div className="bg-blue-500/10 p-2 rounded-xl w-fit text-blue-500 mb-3"><Zap className="w-5 h-5" /></div>
          <h3 className="text-2xl font-black text-white">0</h3>
          <p className="text-xs text-slate-400 mt-1">Ya generando</p>
        </div>
        
        <div className="bg-[#0F1523] border border-white/5 rounded-2xl p-5">
          <div className="bg-green-500/10 p-2 rounded-xl w-fit text-green-500 mb-3"><Wallet className="w-5 h-5" /></div>
          <h3 className="text-2xl font-black text-white">$0.00</h3>
          <p className="text-xs text-slate-400 mt-1">Ganado por referidos</p>
        </div>
      </div>

      {/* Lista de Invitados */}
      <div className="bg-[#0F1523] border border-white/5 rounded-2xl p-5 text-center">
        <div className="flex items-center justify-center gap-2 mb-6 text-white font-bold">
          <List className="w-5 h-5 text-blue-500" />
          <h3>Tus invitados</h3>
        </div>
        
        <div className="bg-white/5 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Send className="w-6 h-6 text-blue-500" />
        </div>
        <h4 className="font-bold text-white mb-1">Aún no tienes invitados</h4>
        <p className="text-xs text-slate-400 max-w-[200px] mx-auto leading-relaxed">
          Comparte tu link con otros creadores y empieza a ganar comisión.
        </p>
      </div>

    </div>
  );
}
