import { Metadata } from "next";
import GermanProgrammePage, { GermanProgrammeContent } from "../_components/GermanProgrammePage";
import { getProgrammeBySlug } from "@/data/plans/programmes";

// Prices come from the same rate-card programme record as the English page —
// the two language versions can never drift apart.
const programme = getProgrammeBySlug("delhi-agra-same-day")!;
const sedanTotal = programme.pricing!.vehicleTiers[0].totalEUR!;

const BASE_URL = "https://www.guideindiatours.com";
const PATH = "/de/delhi-agra-same-day";
const EN_PATH = "/plans/delhi-agra-same-day";

export const metadata: Metadata = {
    title: `Tagesausflug Delhi–Agra: Private Taj-Mahal-Tour — ab ${programme.fromPriceEUR} € | Guide India Tours`,
    description: `Private Taj-Mahal-Tagestour ab Delhi mit eigenem Wagen, Fahrer und lizenziertem Guide — ab ${programme.fromPriceEUR} € pro Person. Transparente Preise: Transport, Guide und Monument-Tickets einzeln aufgeführt. Deutschsprachige Guides auf Anfrage.`,
    alternates: {
        canonical: `${BASE_URL}${PATH}`,
        languages: {
            'de': `${BASE_URL}${PATH}`,
            'en': `${BASE_URL}${EN_PATH}`,
            'x-default': `${BASE_URL}${EN_PATH}`,
        },
    },
    openGraph: {
        title: `Tagesausflug Delhi–Agra: Private Taj-Mahal-Tour — ab ${programme.fromPriceEUR} €`,
        description: "Privater Wagen, lizenzierter Guide, transparente Preise. Deutschsprachige Guides auf Anfrage.",
        url: `${BASE_URL}${PATH}`,
        locale: 'de_DE',
        type: 'article',
        images: [{ url: `${BASE_URL}${programme.image}`, width: 1200, height: 630, alt: "Taj Mahal Tagestour ab Delhi" }],
    },
};

const content: GermanProgrammeContent = {
    path: PATH,
    englishPath: EN_PATH,
    title: "Tagesausflug Delhi–Agra: Die Taj-Mahal-Tour",
    duration: "1 Tag",
    fromPriceEUR: programme.fromPriceEUR!,
    image: programme.image,
    imageAlt: "Der Taj Mahal in Agra — private Tagestour ab Delhi",
    descriptionParagraphs: [
        "Der Klassiker unter Indiens Tagestouren, richtig gemacht: frühmorgens private Abholung an Ihrem Hotel in Delhi, über den Yamuna Expressway nach Agra, zwei geführte Stunden im Taj Mahal, ein entspanntes Mittagessen, das Rote Fort von Agra — und am Abend zurück in Delhi.",
        "Kein Sammelbus, keine fremde Reisegruppe, kein Warten: Ihr eigener Wagen, Ihr eigener Fahrer und ein staatlich lizenzierter Guide — zeitlich so geplant, dass Sie vor der Mittagshitze und den großen Gruppen im Taj Mahal stehen.",
    ],
    highlights: [
        "Privater Wagen von Tür zu Tür ab Hotel oder Flughafen Delhi",
        "Yamuna Expressway — Delhi–Agra in rund 3,5 Stunden",
        "Zwei voll geführte Stunden im Taj Mahal",
        "Agra Fort mit dem berühmten Taj-Blick vom Musamman Burj",
        "Tickets ohne Anstehen — Ihr Guide kauft sie vorab",
    ],
    inclusions: [
        "Privater klimatisierter Wagen, Delhi–Agra–Delhi",
        "Staatlich lizenzierter Guide in Agra",
        "Abholung und Rücktransfer: Hotel oder Flughafen Delhi",
        "Alle Mautgebühren, Parkplätze, Kraftstoff und Fahrerspesen",
    ],
    pricing: {
        basis: "Ab-Preis pro Person bei 2 Reisenden in einer privaten Limousine, mit Tickets für internationale Gäste und englischsprachigem Guide. Die Preise sind Richtwerte für die angegebene Gruppengröße und Saison; Monument-Tickets zu offiziellen Preisen. Ihr verbindliches Angebot erhalten Sie innerhalb von 2 Stunden per WhatsApp.",
        vehicleTiers: [
            { tier: "Limousine", models: "Dzire, Etios", capacity: "1–3 Reisende", totalEUR: sedanTotal, basis: "Gesamtpreis für 2 Reisende" },
            { tier: "SUV", models: "Innova, Ertiga", capacity: "4–6 Reisende", totalEUR: null },
            { tier: "Innova Crysta", models: "Crysta", capacity: "5–7 Reisende", totalEUR: null },
            { tier: "Force Urbania", models: "Urbania Van", capacity: "8–12 Reisende", totalEUR: null },
        ],
        guideIncluded: "Staatlich lizenzierter Guide — Englisch oder Hindi im Preis enthalten",
        languageSupplement: "Deutschsprachiger Guide (auch Spanisch, Französisch, Russisch, Italienisch): +1.000 ₹ pro Tag — männliche und weibliche Guides verfügbar",
        tickets: [
            { monument: "Taj Mahal", foreignerPrice: "1.100 ₹ (+200 ₹ optional für das Hauptmausoleum)" },
            { monument: "Agra Fort", foreignerPrice: "650 ₹" },
            { monument: "Mehtab Bagh (optional)", foreignerPrice: "300 ₹", optional: true },
        ],
        ticketsNote: "Kinder unter 15 Jahren haben in den meisten ASI-Monumenten freien Eintritt.",
        notIncluded: [
            "Hotels (auf Wunsch separat angeboten)",
            "Mahlzeiten und Getränke",
            "Trinkgelder (optional, nach eigenem Ermessen)",
        ],
    },
    timeline: [
        {
            time: "06:30",
            title: "Abholung in Delhi",
            description: "Ihr Fahrer erwartet Sie im Hotel (oder am Flughafen) — früh genug, um dem Stadtverkehr zu entgehen. Sie möchten den Sonnenaufgang am Taj Mahal erleben? Abfahrt um 3:30 Uhr ist möglich, sagen Sie einfach Bescheid.",
        },
        {
            time: "07:00",
            title: "Über den Yamuna Expressway",
            description: "Rund 3,5 Stunden auf Indiens bester Autobahn, mit einer sauberen Raststätte für den Kaffee auf halber Strecke.",
        },
        {
            time: "10:15",
            title: "Ihr Guide & der Taj Mahal",
            description: "Ihr lizenzierter Guide erwartet Sie mit den Tickets am Eingang. Zwei Stunden im Inneren: die Geschichte von Shah Jahan und Mumtaz Mahal, die perfekte Symmetrie, die besten Fotospots — und auf Wunsch das Hauptmausoleum (optionales 200-₹-Ticket). Freitags ist der Taj Mahal geschlossen.",
        },
        {
            time: "12:45",
            title: "Mittagessen in Agra",
            description: "Entspanntes Mittagessen in einem empfohlenen Restaurant (auf eigene Rechnung) — probieren Sie die Mughlai-Klassiker.",
        },
        {
            time: "13:45",
            title: "Agra Fort",
            description: "Rund 90 Minuten in der Festungsresidenz, in der Shah Jahan von seinem eigenen Sohn gefangen gehalten wurde — mit dem berühmten Blick auf den Taj vom Musamman Burj.",
        },
        {
            time: "15:30",
            title: "Optionaler Stopp, dann Rückfahrt",
            description: "Wenn die Zeit reicht: der Taj-Blick vom Mehtab Bagh am Flussufer oder eine Marmor-Einlegearbeiten-Werkstatt. Danach zurück über den Expressway.",
        },
        {
            time: "19:30",
            title: "Ankunft in Delhi",
            description: "Am Hotel — oder direkt am Flughafen: Diese Tour passt perfekt vor einen Nachtflug.",
        },
    ],
    faqs: [
        {
            question: "Gibt es deutschsprachige Guides?",
            answer: "Ja — deutschsprachige Guides (männlich oder weiblich) sind gegen einen Aufpreis von 1.000 ₹ pro Tag verfügbar. Die Verfügbarkeit ist begrenzt, besonders in der Hauptsaison von Oktober bis März: Bitte fragen Sie so früh wie möglich an.",
        },
        {
            question: "Wie lange dauert die Fahrt von Delhi nach Agra?",
            answer: "Rund 3,5 Stunden pro Richtung über den Yamuna Expressway (etwa 230 km), in einem privaten klimatisierten Wagen mit Pause auf halber Strecke. Von Tür zu Tür dauert der gesamte Tag etwa 13 Stunden.",
        },
        {
            question: "Können wir den Taj Mahal bei Sonnenaufgang sehen?",
            answer: "Ja — mit unserer Sonnenaufgangs-Variante starten Sie gegen 3:30 Uhr in Delhi und betreten den Taj Mahal direkt zur Öffnung. Der frühe Wecker lohnt sich: weiches Licht, kaum Besucher. Fragen Sie einfach per WhatsApp danach.",
        },
        {
            question: "An welchen Tagen findet die Tour statt?",
            answer: "Täglich außer freitags — dann ist der Taj Mahal für Besucher geschlossen. Falls nur der Freitag möglich ist, gestalten wir den Tag mit Agra Fort, Itmad-ud-Daulah und dem Taj-Blick vom Mehtab Bagh, der täglich zugänglich ist.",
        },
        {
            question: "Sind die Monument-Tickets im Preis enthalten?",
            answer: "Die Tickets sind einzeln aufgeführt und werden vor Ort zu offiziellen Preisen bezahlt — derzeit 1.100 ₹ für den Taj Mahal (ausländische Gäste, +200 ₹ optional für das Hauptmausoleum) und 650 ₹ für das Agra Fort. Ihr Guide kauft sie vorab, sodass Sie nie anstehen.",
        },
        {
            question: "Ist die Fahrt sicher und komfortabel?",
            answer: "Ja — alle Fahrzeuge haben eine gewerbliche Tourismuszulassung, Sicherheitsgurte und Klimaanlage, und unsere geprüften Fahrer fahren diese Strecke täglich. Wir überladen nie: Limousinen nehmen bis zu 3 Gäste, größere Gruppen reisen im SUV, Crysta oder Urbania-Van.",
        },
    ],
    whatsappMessage: 'Hallo! Ich interessiere mich für den "Tagesausflug Delhi–Agra (Taj-Mahal-Tour)". Bitte senden Sie mir ein Angebot. Gerne auch Informationen zu deutschsprachigen Guides.',
};

export default function DelhiAgraSameDayGermanPage() {
    return <GermanProgrammePage content={content} />;
}
