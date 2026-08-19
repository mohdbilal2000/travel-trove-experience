import { Metadata } from "next";
import GermanProgrammePage, { GermanProgrammeContent } from "../_components/GermanProgrammePage";
import { getProgrammeBySlug } from "@/data/plans/programmes";

// Prices come from the same rate-card programme record as the English page —
// the two language versions can never drift apart.
const programme = getProgrammeBySlug("golden-triangle-3-days")!;
const sedanTotal = programme.pricing!.vehicleTiers[0].totalEUR!;

const BASE_URL = "https://www.guideindiatours.com";
const PATH = "/de/golden-triangle-3-days";
const EN_PATH = "/plans/golden-triangle-3-days";

export const metadata: Metadata = {
    title: `3 Tage Goldenes Dreieck: Delhi, Agra & Jaipur — ab ${programme.fromPriceEUR} € | Guide India Tours`,
    description: `Privat geführte 3-Tage-Tour durch das Goldene Dreieck (Delhi, Agra, Jaipur) — ab ${programme.fromPriceEUR} € pro Person. Sonnenaufgang im Taj Mahal, Fatehpur Sikri, Amber Fort. Transparente Preise, deutschsprachige Guides auf Anfrage.`,
    alternates: {
        canonical: `${BASE_URL}${PATH}`,
        languages: {
            'de': `${BASE_URL}${PATH}`,
            'en': `${BASE_URL}${EN_PATH}`,
            'x-default': `${BASE_URL}${EN_PATH}`,
        },
    },
    openGraph: {
        title: `3 Tage Goldenes Dreieck: Delhi, Agra & Jaipur — ab ${programme.fromPriceEUR} €`,
        description: "Sonnenaufgang im Taj Mahal, Fatehpur Sikri und das Amber Fort — privat geführt, mit transparenten Preisen.",
        url: `${BASE_URL}${PATH}`,
        locale: 'de_DE',
        type: 'article',
        images: [{ url: `${BASE_URL}${programme.image}`, width: 1200, height: 630, alt: "Goldenes Dreieck in 3 Tagen" }],
    },
};

const content: GermanProgrammeContent = {
    path: PATH,
    englishPath: EN_PATH,
    title: "3 Tage Goldenes Dreieck: Delhi, Agra & Jaipur",
    duration: "3 Tage",
    fromPriceEUR: programme.fromPriceEUR!,
    image: programme.image,
    imageAlt: "Das Goldene Dreieck: Delhi, Agra und Jaipur in drei Tagen",
    descriptionParagraphs: [
        "Indiens berühmteste Route — Delhi, Agra und Jaipur — in drei präzise geplanten, privat geführten Tagen. Die Gassen von Old Delhi und die Prachtboulevards von Neu-Delhi, der Taj Mahal bei Sonnenaufgang, Kaiser Akbars verlassene Hauptstadt Fatehpur Sikri und zum Abschluss die rosarote Stadt Jaipur, gekrönt vom Amber Fort.",
        "Drei Tage sind das Minimum, in dem sich das Goldene Dreieck gut bereisen lässt. Mit eigenem Wagen, eigenem Fahrer und lizenzierten Guides in jeder Stadt gibt es kein Warten und kein Gruppengedränge — nur die Höhepunkte, jeweils zur besten Tageszeit.",
    ],
    highlights: [
        "Sonnenaufgang im Taj Mahal am zweiten Tag",
        "Rikscha-Fahrt durch Old Delhi und das Humayun-Mausoleum",
        "Fatehpur Sikri auf dem Weg von Agra nach Jaipur",
        "Amber Fort, Stadtpalast und Hawa Mahal in Jaipur",
        "Lizenzierte Guides in jeder Stadt, privater Wagen durchgehend",
    ],
    inclusions: [
        "Privater klimatisierter Wagen an allen drei Tagen",
        "Staatlich lizenzierte Guides in Delhi, Agra und Jaipur",
        "Abholung am Hotel/Flughafen und finaler Transfer (Delhi oder Jaipur)",
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
        guideIncluded: "Staatlich lizenzierte Guides — Englisch oder Hindi im Preis enthalten",
        languageSupplement: "Deutschsprachiger Guide (auch Spanisch, Französisch, Russisch, Italienisch): +1.000 ₹ pro Tag — männliche und weibliche Guides verfügbar",
        tickets: [
            { monument: "Humayun-Mausoleum, Delhi", foreignerPrice: "600 ₹" },
            { monument: "Qutub Minar, Delhi", foreignerPrice: "600 ₹" },
            { monument: "Taj Mahal", foreignerPrice: "1.100 ₹ (+200 ₹ optional für das Hauptmausoleum)" },
            { monument: "Agra Fort", foreignerPrice: "650 ₹" },
            { monument: "Fatehpur Sikri", foreignerPrice: "610 ₹" },
            { monument: "Amber Fort, Jaipur", foreignerPrice: "550 ₹" },
            { monument: "Stadtpalast, Jaipur", foreignerPrice: "700 ₹" },
            { monument: "Jantar Mantar, Jaipur", foreignerPrice: "200 ₹" },
            { monument: "Hawa Mahal (Fassade kostenlos)", foreignerPrice: "200 ₹ für den Innenbesuch", optional: true },
        ],
        ticketsNote: "Kinder unter 15 Jahren haben in den meisten ASI-Monumenten freien Eintritt.",
        notIncluded: [
            "Hotels (auf Wunsch separat angeboten — von soliden 3-Sterne-Häusern bis zum Palasthotel)",
            "Mahlzeiten und Getränke",
            "Trinkgelder (optional, nach eigenem Ermessen)",
        ],
    },
    timeline: [
        {
            day: 1,
            time: "08:30",
            title: "Abholung in Delhi & Old Delhi am Vormittag",
            description: "Jama Masjid, eine Rikscha-Fahrt durch die Gewürz- und Silbergassen von Chandni Chowk und ein Fotostopp am Roten Fort — mit Ihrem Delhi-Guide.",
        },
        {
            day: 1,
            time: "13:00",
            title: "Mittagessen, dann Neu-Delhi",
            description: "Das Humayun-Mausoleum — der Garten-Grabbau, der dem Taj Mahal als Vorbild diente — und der Qutub Minar, dazu eine Fahrt vorbei am India Gate und dem Präsidentenpalast.",
        },
        {
            day: 1,
            time: "16:30",
            title: "Über den Expressway nach Agra",
            description: "Rund 3,5 Stunden Fahrt; Check-in im Hotel und früh schlafen — der morgige Tag beginnt vor Sonnenaufgang.",
        },
        {
            day: 2,
            time: "05:45",
            title: "Sonnenaufgang im Taj Mahal",
            description: "Zwei Stunden im Inneren, direkt zur Öffnung der Tore, mit Ihrem Agra-Guide. (Freitags ist der Taj geschlossen — wir legen Ihre Reisetage entsprechend.)",
        },
        {
            day: 2,
            time: "08:30",
            title: "Frühstück & Agra Fort",
            description: "Zurück ins Hotel zum Frühstück und Check-out, dann 90 Minuten in der gewaltigen roten Festung.",
        },
        {
            day: 2,
            time: "11:30",
            title: "Fatehpur Sikri unterwegs",
            description: "Eine Stunde westlich von Agra: das Buland Darwaza, der Panch Mahal und das Grab des Sufi-Heiligen Salim Chishti — mit Mittagessen in der Nähe.",
        },
        {
            day: 2,
            time: "14:30",
            title: "Weiterfahrt nach Jaipur",
            description: "Rund 3,5 Stunden hinüber nach Rajasthan; der Abend in der rosaroten Stadt gehört Ihnen.",
        },
        {
            day: 3,
            time: "08:30",
            title: "Amber Fort",
            description: "Jaipurs Palastfestung auf dem Bergrücken im Morgenlicht — Spiegelsäle, Wehrgänge und der Blick über den See.",
        },
        {
            day: 3,
            time: "11:00",
            title: "Jal Mahal & Stadtpalast",
            description: "Fotostopp am Wasserpalast, danach der königliche Stadtpalast und die astronomischen Instrumente des Jantar Mantar.",
        },
        {
            day: 3,
            time: "14:30",
            title: "Hawa Mahal & Basare",
            description: "Die rosa Wabenfassade des Palasts der Winde — und auf Wunsch eine Stunde in Jaipurs Blockdruck- und Edelsteinbasaren.",
        },
        {
            day: 3,
            time: "16:00",
            title: "Abreise",
            description: "Rückfahrt nach Delhi (rund 5 Stunden) oder Transfer zum Flughafen Jaipur bzw. zu Ihrem Hotel — Sie entscheiden bei der Buchung.",
        },
    ],
    faqs: [
        {
            question: "Sind die Hotels im Ab-Preis enthalten?",
            answer: "Nein — der Ab-Preis umfasst privaten Transport, lizenzierte Guides und die gesamte Logistik. Hotels bieten wir separat an, damit Sie das Budget bestimmen: vom soliden 3-Sterne-Haus bis zum Palasthotel. Wir buchen sie gerne zusammen mit der Tour.",
        },
        {
            question: "Gibt es deutschsprachige Guides?",
            answer: "Ja — deutschsprachige Guides (männlich oder weiblich) sind gegen einen Aufpreis von 1.000 ₹ pro Tag verfügbar, in jeder der drei Städte. Die Verfügbarkeit ist begrenzt; bitte fragen Sie möglichst früh an, besonders für Oktober bis März.",
        },
        {
            question: "Reichen drei Tage für das Goldene Dreieck?",
            answer: "Drei Tage decken alle Höhepunkte in einem gut getakteten, aber machbaren Rhythmus ab — siehe den Stundenplan oben. Wer ruhigere Vormittage, eine Tiger-Safari in Ranthambhore oder mehr Basarzeit möchte, wählt unsere 4- bis 6-Tage-Varianten oder die große 10-Tage-Rajasthan-Route.",
        },
        {
            question: "Wie viel Fahrzeit ist eingeplant?",
            answer: "Delhi–Agra etwa 3,5 Stunden, Agra–Jaipur etwa 4,5 Stunden inklusive des Stopps in Fatehpur Sikri, Jaipur–Delhi etwa 5 Stunden (oder Sie fliegen ab Jaipur). Alles im privaten klimatisierten Wagen, mit Pausen, wann immer Sie möchten.",
        },
        {
            question: "Was passiert, wenn ein Freitag in meine Reisedaten fällt?",
            answer: "Der Taj Mahal ist freitags geschlossen. Wir ordnen die drei Tage so an, dass Ihr Agra-Morgen nicht auf einen Freitag fällt — meist durch Umkehren der Reiserichtung. Das prüfen wir, sobald Sie uns Ihre Daten schicken.",
        },
        {
            question: "Kann die Tour in Jaipur oder Agra beginnen und enden?",
            answer: "Ja — das Dreieck funktioniert in jeder Richtung und ab jeder der drei Städte oder ihrer Flughäfen. Nennen Sie uns per WhatsApp Ihren Startpunkt, und wir sortieren dasselbe Programm entsprechend um.",
        },
    ],
    whatsappMessage: 'Hallo! Ich interessiere mich für die Tour "3 Tage Goldenes Dreieck (Delhi–Agra–Jaipur)". Bitte senden Sie mir ein Angebot. Gerne auch Informationen zu deutschsprachigen Guides.',
};

export default function GoldenTriangle3DaysGermanPage() {
    return <GermanProgrammePage content={content} />;
}
