import Link from "next/link";
import type { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";
import { generateFAQSchema } from "@/lib/schemaGenerator";
import { siteConfig } from "@/lib/siteConfig";

/**
 * German and Spanish versions of /taj-mahal-tickets. Every figure and rule is
 * copied from the English page (itself sourced from the ASI), so the three
 * pages cannot drift: change a price there, change it in `prices` below.
 */
const prices = {
  foreign: ["₹1,100", "₹200", "₹1,300"],
  saarc: ["₹540", "₹200", "₹740"],
  indian: ["₹50", "₹200", "₹250"],
};

type T = {
  lang: "de" | "es";
  path: string;
  title: string;
  description: string;
  h1: string;
  subtitle: string;
  badge: string;
  crumb: string;
  quickLabel: string;
  quick: { lead: string; text: string }[];
  tableHead: string[];
  tableRows: { label: string; cells: string[] }[];
  sections: { h: string; p: string; links?: { href: string; label: string; external?: boolean }[] }[];
  faqs: { question: string; answer: string }[];
  note: string;
  num: (s: string) => string;
};

const de = (s: string) => s.replace(/,/g, ".");

export const deTickets: T = {
  lang: "de",
  path: "de/taj-mahal-eintritt",
  title: "Taj Mahal Eintritt 2026: Preise für Ausländer, Mausoleum, Tickets online",
  description: "Ausländische Besucher zahlen ₹1.100 Eintritt plus ₹200 für das Hauptmausoleum, zusammen ₹1.300. Kinder unter 15 Jahren haben freien Eintritt, freitags ist geschlossen. Tickets online über das offizielle ASI-Portal.",
  h1: "Taj Mahal Eintritt 2026",
  subtitle: "Eintrittspreise für ausländische Besucher, das Mausoleum-Ticket und wo Sie Tickets kaufen.",
  badge: "Aktualisiert 2026",
  crumb: "Taj Mahal Eintritt",
  quickLabel: "Kurzantwort",
  quick: [
    { lead: "Ausländische Besucher:", text: "₹1.100 für den Komplex plus ₹200 für die zentrale Mausoleumskammer, zusammen ₹1.300." },
    { lead: "Kinder unter 15 Jahren:", text: "freier Eintritt in den Komplex, unabhängig von der Nationalität. Für die Mausoleumskammer ist ein Ticket nötig, wenn Sie hineingehen möchten." },
    { lead: "Freitags geschlossen:", text: "Das Taj Mahal ist jeden Freitag ganztägig geschlossen." },
    { lead: "Tickets:", text: "am besten online über das offizielle ASI-Portal, so sparen Sie die Warteschlange an den Schaltern am Eingang." },
    { lead: "Hinweis:", text: "Die Preise gelten in indischen Rupien und werden von der ASI festgelegt. Sie können sich ändern, prüfen Sie den aktuellen Preis vor Ihrem Besuch." },
  ],
  tableHead: ["Kategorie", "Komplex", "Mausoleum", "Gesamt"],
  tableRows: [
    { label: "Ausländischer Besucher", cells: prices.foreign.map(de) },
    { label: "SAARC / BIMSTEC", cells: prices.saarc.map(de) },
    { label: "Indische Staatsbürger", cells: prices.indian.map(de) },
    { label: "Kind unter 15 Jahren", cells: ["Frei", "₹200 (optional)", "Frei (oder ₹200)"] },
  ],
  sections: [
    { h: "Wo kaufe ich die Tickets?", p: "Am besten buchen Sie online über die offiziellen ASI-Portale. So vermeiden Sie die Schlange an den Schaltern am Eingang.", links: [
      { href: "https://asi.payumoney.com", label: "asi.payumoney.com", external: true },
      { href: "https://tickets.tajmahal.gov.in", label: "tickets.tajmahal.gov.in", external: true },
    ] },
    { h: "Kombiticket für Agra", p: "Es gibt ein kombiniertes Ticket für die Denkmäler von Agra: Taj Mahal, Agra Fort, Fatehpur Sikri, Itimad-ud-Daulah und Akbars Grabmal in Sikandra, gültig innerhalb von 24 Stunden." },
    { h: "Nachtbesichtigung", p: "Die Nachtbesichtigung findet nur an 5 Nächten pro Monat rund um den Vollmond statt, außer im Ramadan. Die Tickets müssen mindestens 24 Stunden im Voraus im ASI-Büro in Agra gebucht werden und werden nicht am Eingang verkauft." },
    { h: "Mit unserer Tagestour ab Delhi", p: "Auf unserer Same Day Agra Tour ab Delhi sind alle Eintrittsgelder für die Denkmäler enthalten. Die Tourseite ist auf Englisch. Deutschsprachige Guides finden Sie auf unserer deutschen Guide-Seite.", links: [
      { href: "/same-day-agra-tour-from-delhi", label: "Same Day Agra Tour ab Delhi (Englisch)" },
      { href: "/guide/de", label: "Deutschsprachiger Reiseführer in Agra" },
    ] },
  ],
  faqs: [
    { question: "Wie viel kostet der Taj Mahal Eintritt für Ausländer?", answer: "Die Archaeological Survey of India verlangt von ausländischen Besuchern ₹1.100 für den Komplex plus ₹200 für die zentrale Mausoleumskammer, zusammen ₹1.300." },
    { question: "Brauche ich ein extra Ticket für das Mausoleum?", answer: "Ja. Wenn Sie die zentrale Mausoleumskammer betreten möchten, kommen ₹200 zum Eintritt hinzu." },
    { question: "Ist das Taj Mahal freitags geöffnet?", answer: "Nein. Das Taj Mahal ist jeden Freitag ganztägig geschlossen. Die anderen Denkmäler in Agra bleiben geöffnet." },
    { question: "Kann ich Tickets online kaufen?", answer: "Ja, über die offiziellen ASI-Portale asi.payumoney.com oder tickets.tajmahal.gov.in. Der Online-Kauf erspart die Schlange an den Schaltern am Eingang und wird empfohlen." },
    { question: "Sind Kinder frei?", answer: "Ja. Kinder unter 15 Jahren betreten den Komplex unabhängig von der Nationalität kostenlos. Für die Mausoleumskammer benötigen sie ein Ticket, wenn Sie hineingehen möchten." },
  ],
  note: "Quelle: Archaeological Survey of India (tajmahal.gov.in). Die Preise können sich ändern.",
  num: de,
};

const es = (s: string) => s.replace(/,/g, ".");

export const esTickets: T = {
  lang: "es",
  path: "es/entradas-taj-mahal",
  title: "Entradas Taj Mahal 2026: precio para extranjeros, mausoleo y dónde comprarlas",
  description: "Los visitantes extranjeros pagan ₹1.100 por la entrada más ₹200 por el mausoleo principal, en total ₹1.300. Los niños menores de 15 años entran gratis y el viernes está cerrado. Entradas en línea en el portal oficial de la ASI.",
  h1: "Entradas del Taj Mahal 2026",
  subtitle: "Precio de la entrada para visitantes extranjeros, la entrada al mausoleo y dónde comprarla.",
  badge: "Actualizado 2026",
  crumb: "Entradas Taj Mahal",
  quickLabel: "Respuesta rápida",
  quick: [
    { lead: "Visitantes extranjeros:", text: "₹1.100 por el complejo más ₹200 por la cámara central del mausoleo, en total ₹1.300." },
    { lead: "Niños menores de 15 años:", text: "entrada gratuita al complejo, sea cual sea la nacionalidad. Necesitan entrada para la cámara del mausoleo si quieres entrar." },
    { lead: "Cerrado los viernes:", text: "el Taj Mahal está cerrado todo el día todos los viernes." },
    { lead: "Entradas:", text: "lo mejor es comprarlas en línea en el portal oficial de la ASI, así te ahorras la cola en las taquillas de la entrada." },
    { lead: "Nota:", text: "los precios están en rupias indias y los fija la ASI. Pueden cambiar, así que comprueba el precio actual antes de tu visita." },
  ],
  tableHead: ["Categoría", "Complejo", "Mausoleo", "Total"],
  tableRows: [
    { label: "Visitante extranjero", cells: prices.foreign.map(es) },
    { label: "SAARC / BIMSTEC", cells: prices.saarc.map(es) },
    { label: "Ciudadano indio", cells: prices.indian.map(es) },
    { label: "Niño menor de 15 años", cells: ["Gratis", "₹200 (opcional)", "Gratis (o ₹200)"] },
  ],
  sections: [
    { h: "¿Dónde compro las entradas?", p: "Lo más sencillo es reservar en línea en los portales oficiales de la ASI. Así evitas la cola en las taquillas de la entrada.", links: [
      { href: "https://asi.payumoney.com", label: "asi.payumoney.com", external: true },
      { href: "https://tickets.tajmahal.gov.in", label: "tickets.tajmahal.gov.in", external: true },
    ] },
    { h: "Entrada combinada de Agra", p: "Existe una entrada combinada para los monumentos de Agra: Taj Mahal, Fuerte de Agra, Fatehpur Sikri, Itimad-ud-Daulah y la Tumba de Akbar en Sikandra, válida durante 24 horas." },
    { h: "Visita nocturna", p: "La visita nocturna solo se celebra 5 noches al mes alrededor de la luna llena, salvo durante el Ramadán. Las entradas deben reservarse con al menos 24 horas de antelación en la oficina de la ASI en Agra y no se venden en la entrada." },
    { h: "Con nuestra excursión de un día desde Delhi", p: "En nuestra Same Day Agra Tour desde Delhi están incluidas todas las entradas a los monumentos. La página del tour está en inglés. Los guías en español están en nuestra página de guías en español.", links: [
      { href: "/same-day-agra-tour-from-delhi", label: "Excursión de un día a Agra desde Delhi (inglés)" },
      { href: "/guide/es", label: "Guía en español en Agra" },
    ] },
  ],
  faqs: [
    { question: "¿Cuánto cuesta la entrada al Taj Mahal para extranjeros?", answer: "La Archaeological Survey of India cobra a los visitantes extranjeros ₹1.100 por el complejo más ₹200 por la cámara central del mausoleo, en total ₹1.300." },
    { question: "¿Necesito una entrada aparte para el mausoleo?", answer: "Sí. Si quieres entrar en la cámara central del mausoleo, se suman ₹200 a la entrada." },
    { question: "¿Está abierto el Taj Mahal los viernes?", answer: "No. El Taj Mahal está cerrado todo el día todos los viernes. Los demás monumentos de Agra siguen abiertos." },
    { question: "¿Puedo comprar las entradas en línea?", answer: "Sí, en los portales oficiales de la ASI, asi.payumoney.com o tickets.tajmahal.gov.in. Comprar en línea evita la cola en las taquillas de la entrada y es lo recomendable." },
    { question: "¿Los niños entran gratis?", answer: "Sí. Los niños menores de 15 años entran gratis al complejo, sea cual sea su nacionalidad. Necesitan entrada para la cámara del mausoleo si quieres entrar." },
  ],
  note: "Fuente: Archaeological Survey of India (tajmahal.gov.in). Los precios pueden cambiar.",
  num: es,
};

const BASE = siteConfig.url;
const EN = `${BASE}/taj-mahal-tickets`;
export const ticketAlternates = {
  en: EN,
  de: `${BASE}/de/taj-mahal-eintritt`,
  es: `${BASE}/es/entradas-taj-mahal`,
  "x-default": EN,
};

export const ticketsMetadata = (t: T): Metadata => {
  const url = `${BASE}/${t.path}`;
  return {
    title: t.title,
    description: t.description,
    alternates: { canonical: url, languages: ticketAlternates },
    openGraph: { title: t.title, description: t.description, url, siteName: siteConfig.name, type: "article", images: [{ url: `${BASE}/images/og-default.jpg`, width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title: t.title, description: t.description },
  };
};

export default function LocalizedTickets({ t }: { t: T }) {
  const url = `${BASE}/${t.path}`;
  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: t.title,
    description: t.description,
    dateModified: siteConfig.contentUpdated,
    inLanguage: t.lang,
    isPartOf: { "@id": `${BASE}/#website` },
    about: { "@id": `${BASE}/#organization` },
    speakable: { "@type": "SpeakableSpecification", cssSelector: ["main h1", "#quick-answer"] },
  };
  return (
    <main className="bg-white min-h-screen" lang={t.lang}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([webPage, generateFAQSchema(t.faqs)]) }} />
      <PageHero breadcrumbs={[{ label: t.crumb }]} badge={t.badge} title={t.h1} subtitle={t.subtitle} />

      <section className="py-12 bg-ivory-100">
        <div className="container mx-auto px-4 max-w-4xl">
          <div id="quick-answer" className="bg-white rounded-3xl border border-gray-100 p-8 md:p-12 shadow-sm">
            <p className="text-[11px] sm:text-[10px] font-black uppercase tracking-[0.3em] text-maroon-600 mb-4">{t.quickLabel}</p>
            <ul className="space-y-3 text-gray-700 font-light">
              {t.quick.map((q) => (<li key={q.lead}><strong className="text-gray-900">{q.lead}</strong> {q.text}</li>))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-white border border-gray-100 rounded-2xl p-4 md:p-6 overflow-x-auto">
            <table className="w-full text-left text-base">
              <thead>
                <tr className="border-b border-gray-100 text-[11px] font-black uppercase tracking-widest text-gray-400">
                  {t.tableHead.map((h) => (<th key={h} className="py-3 pr-4">{h}</th>))}
                </tr>
              </thead>
              <tbody>
                {t.tableRows.map((r) => (
                  <tr key={r.label} className="border-b border-gray-50">
                    <td className="py-3 pr-4 font-semibold text-gray-900">{r.label}</td>
                    {r.cells.map((c, i) => (<td key={i} className="py-3 pr-4 text-gray-700">{c}</td>))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 italic mt-4">{t.note}</p>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-3xl space-y-10 text-lg text-gray-600 font-light leading-relaxed">
          {t.sections.map((s) => (
            <div key={s.h}>
              <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">{s.h}</h2>
              <p>{s.p}</p>
              {s.links && (
                <p className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-base">
                  {s.links.map((l) => l.external
                    ? (<a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="font-bold text-maroon-600 underline underline-offset-2">{l.label}</a>)
                    : (<Link key={l.href} href={l.href} className="font-bold text-maroon-600 underline underline-offset-2">{l.label}</Link>))}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-gray-50 border-t border-gray-100" aria-labelledby="faq-heading">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 id="faq-heading" className="text-3xl font-display font-bold text-gray-900 mb-8">FAQ</h2>
          <div className="space-y-4">
            {t.faqs.map((f) => (
              <div key={f.question} className="bg-white rounded-2xl border border-gray-100 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{f.question}</h3>
                <p className="text-gray-600 font-light leading-relaxed">{f.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
