import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const QUESTIONS = [
  {
    q: "¿Es gratis usar NASETLINK?",
    a: "Sí. Crear tu cuenta, acortar enlaces y recibir pagos es completamente gratis. Solo ganamos cuando tú ganas.",
  },
  {
    q: "¿Cuándo pagan?",
    a: "Las solicitudes de retiro se procesan en 24 a 48 horas hábiles una vez alcanzas el mínimo de $5 USD.",
  },
  {
    q: "¿Cuánto paga cada 1000 clics?",
    a: "Depende de tu nivel y de los pasos del enlace: desde $3 hasta más de $100 por cada 1000 clics válidos.",
  },
  {
    q: "¿Qué es un clic válido?",
    a: "Es una visita real que completa el temporizador del anuncio. Los bots y el tráfico duplicado no se pagan.",
  },
  {
    q: "¿Cómo subo de nivel?",
    a: "Acumulando clics válidos y manteniendo buen tráfico. Cada nivel desbloquea anuncios mejor pagados.",
  },
  {
    q: "¿Puedo usar varios enlaces a la vez?",
    a: "Sí, no hay límite de enlaces. Puedes crear todos los que necesites desde tu panel.",
  },
];

export default function LandingFaq() {
  return (
    <section id="faq" className="mx-auto w-full max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
      <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl">Preguntas frecuentes</h2>

      <Accordion type="single" collapsible className="panel mt-6 rounded-3xl px-5 py-2">
        {QUESTIONS.map((item) => (
          <AccordionItem key={item.q} value={item.q} className="border-b border-white/[0.07] last:border-0">
            <AccordionTrigger className="text-left text-sm font-semibold text-white hover:no-underline">
              {item.q}
            </AccordionTrigger>
            <AccordionContent className="text-xs leading-relaxed text-slate-400">
              {item.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}