import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Search, ChevronDown, Wallet, Banknote, Star, Gamepad2, Users, Palette, Shield, Headphones, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/_authed/ayuda")({
  head: () => ({ meta: [{ title: "Centro de Ayuda — NASETLINK" }] }),
  component: AyudaPage,
});

const FAQ_DATA = [
  {
    category: "Ganar dinero",
    icon: Wallet,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    questions: [
      { q: "¿Cómo genero ingresos con NASETLINK?", a: "Creas tu enlace único en Mis enlaces y lo compartes en tus videos, bio y grupos. Cada persona que entra por tu link y completa los pasos te genera ganancias automáticamente. Mientras más visitas reales, más ganas. 🚀" },
      { q: "¿Qué es un clic válido?", a: "Es una visita real que completa el recorrido de tu enlace hasta el final. No cuentan los bots ni las visitas repetidas de la misma persona en poco tiempo." },
      { q: "¿Cuánto me pagan por cada visita?", a: "Depende de tu nivel y de la cantidad de pasos de tu enlace (esto se llama eCPM: lo que se paga por cada 1.000 visitas). Mientras subes de nivel, tu eCPM mejora y ganas más por lo mismo." },
      { q: "¿Por qué a veces un clic no cuenta?", a: "Para proteger a todos del fraude, una misma IP solo paga 1 clic por enlace cada 6 horas. Las visitas repetidas se registran pero no se pagan. Así el sistema es justo y sostenible." },
    ]
  },
  {
    category: "Cobros y retiros",
    icon: Banknote,
    color: "text-green-500",
    bg: "bg-green-500/10",
    questions: [
      { q: "¿Cuándo puedo retirar mi dinero?", a: "Los retiros abren del día 1 al 5 de cada mes. Dentro de esa ventana pides tu retiro y se procesa." },
      { q: "¿Cuál es el mínimo para retirar?", a: "Depende de tu nivel. En tu nivel (LEVEL 1) el mínimo es $5.00." },
      { q: "¿Por qué no puedo retirar lo que gané este mes?", a: "Lo que generas en el mes actual se libera el mes siguiente (es una medida normal para evitar fraudes y contracargos). Todo lo de meses anteriores sí lo puedes retirar completo. En Retiros ves claramente tu saldo disponible para retirar." },
      { q: "¿Por qué métodos me pagan?", a: "Por PayPal, Binance (USDT) o transferencia bancaria. Al pedir el retiro eliges el método y pones el nombre del titular de la cuenta." },
      { q: "¿Cuánto tarda en llegar el pago?", a: "Una vez que solicitas dentro de la ventana, el equipo procesa el pago y te llega una notificación y un correo cuando esté enviado, con el comprobante." },
    ]
  },
  {
    category: "Niveles",
    icon: Star,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
    questions: [
      { q: "¿Qué son los niveles y cómo subo?", a: "Los niveles (Bronce → Diamante) premian tu constancia. Al subir, tu eCPM mejora (ganas más por visita) y baja tu mínimo de retiro. Sube generando de forma constante. Míralo en Niveles." },
    ]
  },
  {
    category: "Ruleta y boosts",
    icon: Gamepad2,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    questions: [
      { q: "¿Qué es la Ruleta de la Suerte?", a: "Un juego donde giras sacrificando $5.00 de tu saldo por la chance de ganar dinero o un boost de eCPM. Es azar: juega por diversión, no como forma de ingreso." },
      { q: "¿Qué son los boosts de eCPM?", a: "Premios de la ruleta que suben (o a veces bajan) tu eCPM por unas horas. Si te sale un +5% por 24h, durante ese tiempo tus clics pagan más. Si ganas uno, lo ves arriba en la ruleta con su cuenta regresiva." },
    ]
  },
  {
    category: "Referidos",
    icon: Users,
    color: "text-pink-500",
    bg: "bg-pink-500/10",
    questions: [
      { q: "¿Cómo funcionan los referidos?", a: "Invitas a otros creadores con tu enlace de referido. Cuando ellos ganan, tú recibes un 5% extra de bono durante 6 meses — y a ellos no se les descuenta nada. Míralo en Referidos." },
    ]
  },
  {
    category: "Mi página y enlaces",
    icon: Palette,
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
    questions: [
      { q: "¿Cómo personalizo mi página de descarga?", a: "En Mi página cambias el nombre, logo, fondo y los pasos que ven tus visitas. Hazla con tu marca para que se vea profesional." },
      { q: "¿Qué es el verificador de suscripción?", a: "Un extra opcional: puedes poner botones de Suscribirse (YouTube) y Unirse al canal de WhatsApp. Cuando la persona los toca y vuelve, se verifica y desbloquea la descarga. Así creces tu comunidad." },
      { q: "¿Puedo tener varios enlaces o canales?", a: "Sí. Puedes pedir enlaces adicionales para distintos canales desde la misma cuenta; el admin los aprueba y todo suma a tu mismo saldo." },
    ]
  },
  {
    category: "Cuenta y seguridad",
    icon: Shield,
    color: "text-slate-300",
    bg: "bg-slate-500/10",
    questions: [
      { q: "Mi cuenta está pendiente, ¿qué hago?", a: "Las cuentas nuevas se revisan a mano para mantener la plataforma limpia. En cuanto te aprueban recibes un correo y ya puedes entrar. Si tarda, escríbenos por WhatsApp aquí abajo. 👇" },
      { q: "¿Es seguro? ¿Mis datos están protegidos?", a: "Sí. Tus contraseñas van encriptadas, la web fuerza conexión segura y hay protección contra ataques y fraudes. Nunca pedimos claves de tus cuentas de pago por fuera de la plataforma." },
      { q: "¿Cómo cambio mi contraseña?", a: "En Perfil puedes cambiar tu contraseña. Si la olvidaste, usa '¿Olvidaste tu contraseña?' en la pantalla de inicio de sesión." },
    ]
  }
];

function AyudaPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [openItems, setOpenItems] = useState([]);

  const toggleItem = (id) => {
    if (openItems.includes(id)) {
      setOpenItems(openItems.filter(i => i !== id));
    } else {
      setOpenItems([...openItems, id]);
    }
  };

  const filteredData = FAQ_DATA.map(cat => {
    const filteredQs = cat.questions.filter(q => 
      q.q.toLowerCase().includes(search.toLowerCase()) || 
      q.a.toLowerCase().includes(search.toLowerCase())
    );
    return { ...cat, questions: filteredQs };
  }).filter(cat => cat.questions.length > 0);

  return (
    <div className="space-y-6 pb-24">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-1 flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-xl text-white"><MessageCircle className="w-6 h-6" /></div>
          Centro de ayuda
        </h1>
        <p className="text-sm text-slate-400">Todo lo que necesitas saber para ganar y cobrar con NASETLINK.</p>
      </div>

      {/* Buscador */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
        <input
          type="text"
          placeholder="Busca tu duda... (ej: retiro, ruleta, clic)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#0F1523] border border-white/10 rounded-xl py-3.5 pl-10 pr-4 text-white placeholder-slate-600 outline-none focus:border-blue-500 transition-colors"
        />
      </div>

      {/* Categorías FAQ */}
      <div className="space-y-6">
        {filteredData.length === 0 ? (
          <p className="text-center text-slate-500 text-sm py-10">No encontramos resultados para tu búsqueda.</p>
        ) : (
          filteredData.map((cat, catIndex) => (
            <div key={catIndex} className="bg-[#0F1523] border border-white/5 rounded-2xl overflow-hidden">
              <div className="flex items-center gap-2 p-4 border-b border-white/5 bg-white/[0.02]">
                <div className={`p-1.5 rounded-lg ${cat.bg} ${cat.color}`}>
                  <cat.icon className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-white text-sm">{cat.category}</h3>
              </div>
              
              <div className="divide-y divide-white/5">
                {cat.questions.map((q, qIndex) => {
                  const itemId = `${catIndex}-${qIndex}`;
                  const isOpen = openItems.includes(itemId);
                  return (
                    <div key={qIndex}>
                      <button
                        onClick={() => toggleItem(itemId)}
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-white/[0.02] transition-colors"
                      >
                        <span className="text-sm font-medium text-slate-200 pr-4">{q.q}</span>
                        <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 pt-1">
                          <p className="text-sm text-slate-400 leading-relaxed">{q.a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer Contacto */}
      <div className="bg-[#0F1523] border border-green-500/20 rounded-2xl p-6 mt-8">
        <h3 className="font-bold text-white text-lg flex items-center gap-2 mb-2">
          <MessageCircle className="w-5 h-5 text-green-500" /> ¿No resolviste tu duda?
        </h3>
        <p className="text-sm text-slate-400 mb-5 leading-relaxed">
          Abre un <strong className="text-white">ticket de soporte</strong> aquí en la plataforma, o escríbenos directo por WhatsApp. 💬
        </p>
        <button 
          onClick={() => navigate({ to: "/soporte" })}
          className="bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/20 text-blue-400 text-sm font-bold py-3 px-5 rounded-xl flex items-center gap-2 transition"
        >
          <Headphones className="w-4 h-4" /> Abrir un ticket
        </button>
      </div>

    </div>
  );
}
