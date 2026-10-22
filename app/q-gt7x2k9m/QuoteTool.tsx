"use client";

import { useEffect, useMemo, useState } from "react";
import jsPDF from "jspdf";

/**
 * Staff quote maker (hidden URL).
 *
 * Pick up to 3 vehicles to quote side by side, dates (nights/days are derived),
 * guide language, hotel category, tickets, activities, pickup/drop, currency,
 * then download a branded PDF generated in the browser (jsPDF).
 *
 * The PDF shows only customer prices. Costs, margins and bank details are kept
 * in this browser's localStorage (never in the code or repository). Items whose
 * rate is still 0 block the download so a quote never goes out with a Rs. 0 item.
 */

type VehKey = "sedan" | "suv" | "crysta" | "tempo" | "urbania";
type HotelKey = "none" | "h3" | "h4" | "h5" | "lux";
type Cur = "USD" | "EUR" | "GBP" | "AUD" | "INR";
type Tier = "Standard" | "Premium" | "Luxury";

const VEH: Record<VehKey, { label: string; sub: string }> = {
    sedan: { label: "Sedan", sub: "Comfortable, up to 3 guests" },
    suv: { label: "SUV", sub: "Spacious, great value for 4 guests" },
    crysta: { label: "Innova Crysta", sub: "Premium and spacious" },
    tempo: { label: "Tempo Traveller", sub: "Ideal for larger groups" },
    urbania: { label: "Urbania", sub: "Premium group van" },
};
const HOTEL: Record<HotelKey, string> = {
    none: "No hotel (transport and guide only)",
    h3: "3-star hotel",
    h4: "4-star hotel",
    h5: "5-star hotel",
    lux: "Luxury / heritage hotel",
};
const ACTIVITIES: { key: string; label: string }[] = [
    { key: "elephantRide", label: "Elephant ride" },
    { key: "jeepRide", label: "Jeep ride" },
    { key: "canterRide", label: "Canter ride" },
    { key: "boatRide", label: "Boat ride" },
    { key: "folkDance", label: "Folk dance show" },
    { key: "elephantVillage", label: "Elephant village visit" },
    { key: "tigerSafari", label: "Tiger safari" },
    { key: "sanctuary", label: "Wildlife sanctuary visit" },
];
const GUIDE_LANGS = ["English", "Hindi", "French", "German", "Spanish", "Italian", "Japanese", "Mandarin Chinese", "Russian"];
const CUR_LABEL: Record<Cur, string> = {
    USD: "US Dollar (USD)", EUR: "Euro (EUR)", GBP: "British Pound (GBP)", AUD: "Australian Dollar (AUD)", INR: "Indian Rupee (INR)",
};
const CUR_PREFIX: Record<Cur, string> = { USD: "US $", EUR: "EUR ", GBP: "GBP ", AUD: "AUD ", INR: "Rs. " };

type Settings = {
    veh: Record<VehKey, number>;      // cost per day (Rs.)
    guide: number;                    // guide cost per day (Rs.)
    langGuideExtra: number;           // extra per day for a non-English/Hindi guide (Rs.)
    hotel: Record<Exclude<HotelKey, "none">, number>; // cost per room per night (Rs.)
    tickets: number;                  // monument tickets cost per person per day (Rs.)
    tierUplift: { Premium: number; Luxury: number }; // extra cost per person per day (Rs.)
    act: Record<string, number>;      // activity cost per person (Rs.)
    profit: number; gst: number; gateway: number;
    fx: Record<Exclude<Cur, "INR">, number>; // Rs. per 1 unit of currency
};
type Bank = {
    holder: string; bank: string; branch: string; account: string; ifsc: string; swift: string; address: string;
};

// Known rates come from the owner's rate sheet. Anything unknown is 0 and must be filled in.
const DEFAULT_SETTINGS: Settings = {
    veh: { sedan: 1500, suv: 2000, crysta: 3000, tempo: 0, urbania: 0 },
    guide: 2500,
    langGuideExtra: 0,
    hotel: { h3: 0, h4: 0, h5: 0, lux: 0 },
    tickets: 0,
    tierUplift: { Premium: 0, Luxury: 0 },
    act: Object.fromEntries(ACTIVITIES.map((a) => [a.key, 0])),
    profit: 25, gst: 5, gateway: 3,
    fx: { USD: 83, EUR: 90, GBP: 105, AUD: 54 }, // approximate: update to today's rate
};
const EMPTY_BANK: Bank = { holder: "", bank: "", branch: "", account: "", ifsc: "", swift: "", address: "" };

const MAROON: [number, number, number] = [107, 16, 32];
const GOLD: [number, number, number] = [224, 182, 74];
const INK: [number, number, number] = [34, 38, 46];
const GREY: [number, number, number] = [107, 114, 128];

const dayText = (n: number) => `${n} Day${n > 1 ? "s" : ""}`;
const nightText = (n: number) => `${n} Night${n === 1 ? "" : "s"}`;
const fmtDate = (iso: string) => new Date(iso + "T00:00:00").toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "long", year: "numeric" });

function defaultItinerary(days: number): string {
    const d = [
        "Day 1 - Agra Sightseeing\nPickup at your preferred time. Visit Agra Fort, the magnificent Mughal fortress with royal palaces and rich history, followed by Mehtab Bagh, the riverside garden with scenic views of the Taj Mahal (weather permitting). Return to your hotel after sightseeing.",
        "Day 2 - Taj Mahal and Baby Taj\nEarly-morning pickup for the world-famous Taj Mahal: its gardens, marble inlay work and love story, with assistance for family photographs at suitable locations. Then visit Itimad-ud-Daulah's Tomb (Baby Taj), an elegant marble mausoleum famous for its delicate inlay. Return comfortably to your hotel.",
    ];
    return Array.from({ length: days }, (_, i) =>
        d[i] ?? `Day ${i + 1} - Customised\nSightseeing planned around your interests. Details to be confirmed with you.`).join("\n\n");
}

export default function QuoteTool() {
    // trip
    const [client, setClient] = useState("");
    const [adults, setAdults] = useState(3);
    const [children, setChildren] = useState(0);
    const [childAges, setChildAges] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [daysManual, setDaysManual] = useState(2);
    const [pickup, setPickup] = useState("");
    const [drop, setDrop] = useState("");
    const [tier, setTier] = useState<Tier>("Standard");
    // choices
    const [vehs, setVehs] = useState<VehKey[]>(["suv", "crysta"]);
    const [guideLang, setGuideLang] = useState("English");
    const [hotel, setHotel] = useState<HotelKey>("none");
    const [hotelName, setHotelName] = useState("");
    const [rooms, setRooms] = useState(0); // 0 = auto
    const [tickets, setTickets] = useState(false);
    const [acts, setActs] = useState<string[]>([]);
    const [mode, setMode] = useState<"pp" | "total">("pp");
    const [currency, setCurrency] = useState<Cur>("USD");
    const [showBank, setShowBank] = useState(true);
    const [itin, setItin] = useState(defaultItinerary(2));
    const [itinTouched, setItinTouched] = useState(false);
    // saved in this browser only
    const [s, setS] = useState<Settings>(DEFAULT_SETTINGS);
    const [bank, setBank] = useState<Bank>(EMPTY_BANK);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        try {
            const raw = localStorage.getItem("git-quote-settings");
            if (raw) {
                const p = JSON.parse(raw);
                setS({ ...DEFAULT_SETTINGS, ...p, veh: { ...DEFAULT_SETTINGS.veh, ...p.veh }, hotel: { ...DEFAULT_SETTINGS.hotel, ...p.hotel },
                    act: { ...DEFAULT_SETTINGS.act, ...p.act }, fx: { ...DEFAULT_SETTINGS.fx, ...p.fx }, tierUplift: { ...DEFAULT_SETTINGS.tierUplift, ...p.tierUplift } });
            }
            const b = localStorage.getItem("git-quote-bank");
            if (b) setBank({ ...EMPTY_BANK, ...JSON.parse(b) });
        } catch { /* storage unavailable: defaults are used */ }
        setLoaded(true);
    }, []);
    useEffect(() => {
        if (!loaded) return;
        try { localStorage.setItem("git-quote-settings", JSON.stringify(s)); localStorage.setItem("git-quote-bank", JSON.stringify(bank)); } catch { /* ignore */ }
    }, [s, bank, loaded]);

    const dateSpan = start && end ? Math.round((new Date(end).getTime() - new Date(start).getTime()) / 86400000) + 1 : 0;
    const days = dateSpan > 0 ? dateSpan : daysManual;
    const nights = Math.max(0, days - 1);
    const pax = Math.max(1, adults + children);
    const roomCount = rooms > 0 ? rooms : Math.max(1, Math.ceil(adults / 2) + (children > 0 && adults % 2 === 0 ? 0 : 0));
    const langExtra = guideLang !== "none" && !["English", "Hindi"].includes(guideLang);

    useEffect(() => { if (!itinTouched) setItin(defaultItinerary(days)); }, [days, itinTouched]);

    const toggle = <T,>(arr: T[], v: T, max = 99) => (arr.includes(v) ? arr.filter((x) => x !== v) : arr.length < max ? [...arr, v] : arr);

    const calc = useMemo(() => {
        const warnings: string[] = [];
        if (dateSpan < 0 || (start && end && dateSpan <= 0)) warnings.push("End date must be after the start date.");
        if (vehs.length === 0) warnings.push("Select at least one vehicle.");
        const shared =
            (hotel !== "none" ? nights * roomCount * s.hotel[hotel] : 0) +
            (tickets ? days * pax * s.tickets : 0) +
            acts.reduce((a, k) => a + pax * (s.act[k] || 0), 0) +
            (tier !== "Standard" ? days * pax * s.tierUplift[tier] : 0);
        if (hotel !== "none" && s.hotel[hotel] <= 0) warnings.push(`Set the cost for "${HOTEL[hotel]}" in the Rates panel.`);
        if (hotel !== "none" && nights === 0) warnings.push("A hotel needs at least 1 night: choose an end date after the start date.");
        if (tickets && s.tickets <= 0) warnings.push("Set the monument tickets cost in the Rates panel, or untick tickets.");
        acts.forEach((k) => { if (!(s.act[k] > 0)) warnings.push(`Set the price for "${ACTIVITIES.find((a) => a.key === k)?.label}" in the Rates panel.`); });
        if (langExtra && s.langGuideExtra <= 0) { /* extra is optional: 0 means no surcharge */ }
        const mult = (1 + s.profit / 100) * (1 + s.gst / 100) * (1 + s.gateway / 100);
        const rows = vehs.map((v) => {
            if (!(s.veh[v] > 0)) warnings.push(`Set the per-day cost for ${VEH[v].label} in the Rates panel.`);
            const guideDay = guideLang === "none" ? 0 : s.guide + (langExtra ? s.langGuideExtra : 0);
            const cost = days * (s.veh[v] + guideDay) + shared;
            const totalInr = cost * mult;
            const per = currency === "INR" ? totalInr / pax : totalInr / s.fx[currency] / pax;
            const pp = currency === "INR" ? Math.round(per / 10) * 10 : Math.round(per);
            return { v, cost, totalInr, pp, total: pp * pax };
        });
        return { rows, warnings: Array.from(new Set(warnings)), shared };
    }, [vehs, days, nights, roomCount, hotel, tickets, acts, tier, guideLang, langExtra, pax, currency, s, start, end, dateSpan]);

    const money = (n: number) => `${CUR_PREFIX[currency]}${n.toLocaleString(currency === "INR" ? "en-IN" : "en-US")}`;
    const canDownload = calc.warnings.length === 0;

    const makePdf = () => {
        const pdf = new jsPDF({ unit: "mm", format: "a4" });
        const W = 210, H = 297, M = 16, textW = W - M * 2;
        let y = 0;
        const footer = () => {
            pdf.setFillColor(17, 24, 39); pdf.rect(0, H - 22, W, 22, "F");
            pdf.setFont("helvetica", "bold"); pdf.setFontSize(10); pdf.setTextColor(...GOLD); pdf.text("GUIDE INDIA TOURS", M, H - 14);
            pdf.setFont("helvetica", "normal"); pdf.setFontSize(8); pdf.setTextColor(255, 255, 255);
            pdf.text("www.guideindiatours.com  |  info@guideindiatours.com  |  WhatsApp: +91 89798 10991", M, H - 9.5);
            pdf.setTextColor(156, 163, 175); pdf.text("Quality  |  Safety  |  Peace of Mind", M, H - 5.5);
        };
        const header = () => {
            pdf.setFillColor(...MAROON); pdf.rect(0, 0, W, 28, "F");
            pdf.setFont("times", "bold"); pdf.setFontSize(20); pdf.setTextColor(255, 255, 255); pdf.text("GUIDE INDIA ", M, 14);
            const w = pdf.getTextWidth("GUIDE INDIA "); pdf.setTextColor(...GOLD); pdf.text("TOURS", M + w, 14);
            pdf.setFont("helvetica", "normal"); pdf.setFontSize(8); pdf.setTextColor(243, 217, 222);
            pdf.text("Government-Approved Tour Guide & Private Travel Services  |  Since 2004", M, 21);
        };
        const newPage = () => { footer(); pdf.addPage(); header(); y = 38; };
        const need = (h: number) => { if (y + h > H - 28) newPage(); };
        const heading = (t: string) => {
            need(16); pdf.setFont("times", "bold"); pdf.setFontSize(13); pdf.setTextColor(...MAROON); pdf.text(t, M, y);
            pdf.setDrawColor(...GOLD); pdf.setLineWidth(0.6); pdf.line(M, y + 2, W - M, y + 2); y += 9;
        };
        const para = (t: string, size = 10, color: [number, number, number] = INK) => {
            pdf.setFont("helvetica", "normal"); pdf.setFontSize(size); pdf.setTextColor(...color);
            for (const ln of pdf.splitTextToSize(t, textW) as string[]) { need(6); pdf.text(ln, M, y); y += size * 0.5 + 1.2; }
        };
        const bullets = (items: string[], x: number, w: number, top: number, color: [number, number, number]) => {
            let yy = top; pdf.setFont("helvetica", "normal"); pdf.setFontSize(9.2); pdf.setTextColor(...color);
            for (const t of items) {
                const ls = pdf.splitTextToSize(t, w - 5) as string[]; pdf.text("-", x, yy);
                ls.forEach((ln, i) => pdf.text(ln, x + 4, yy + i * 4.6)); yy += ls.length * 4.6 + 1.2;
            }
            return yy;
        };
        const listH = (items: string[], w: number) => items.reduce((a, t) => a + (pdf.splitTextToSize(t, w - 5) as string[]).length * 4.6 + 1.2, 0);

        header(); y = 38;
        const today = new Date();
        const qno = `GIT-${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}-${Math.floor(100 + Math.random() * 900)}`;
        pdf.setFont("helvetica", "normal"); pdf.setFontSize(8); pdf.setTextColor(243, 217, 222);
        pdf.text(`Quotation No: ${qno}`, W - M, 12, { align: "right" });
        pdf.text(`Date: ${today.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}`, W - M, 17, { align: "right" });
        pdf.text("Valid for 7 days", W - M, 22, { align: "right" });

        pdf.setFont("times", "bold"); pdf.setFontSize(17); pdf.setTextColor(...MAROON);
        pdf.text(`${tier} Tour Itinerary & Quotation`, M, y); y += 7;
        para(`Prepared for ${client.trim() || "our valued guest"} - thank you for choosing Guide India Tours.`, 10, GREY); y += 3;

        const guests = `${adults} Adult${adults > 1 ? "s" : ""}${children ? ` + ${children} Child${children > 1 ? "ren" : ""}${childAges.trim() ? ` (${childAges.trim()})` : ""}` : ""}`;
        const when = start && end ? `${fmtDate(start)} to ${fmtDate(end)}` : start ? fmtDate(start) : "To be confirmed";
        const rowsO: [string, string][] = [
            ["Guests", guests],
            ["Travel dates", when],
            ["Duration", `${dayText(days)} / ${nightText(nights)}`],
            ["Pickup point", pickup.trim() || "To be confirmed"],
            ["Drop point", drop.trim() || "To be confirmed"],
            ["Package", tier],
            ["Guide", guideLang === "none" ? "Not included" : `${guideLang}-speaking, government-approved`],
        ];
        if (hotel !== "none") rowsO.push(["Hotel", `${HOTEL[hotel]}${hotelName.trim() ? ` - ${hotelName.trim()}` : ""} (${roomCount} room${roomCount > 1 ? "s" : ""}, ${nightText(nights)})`]);
        else if (hotelName.trim()) rowsO.push(["Hotel", hotelName.trim()]);
        const boxH = rowsO.length * 6.2 + 6;
        need(boxH + 4);
        pdf.setFillColor(250, 246, 239); pdf.setDrawColor(236, 227, 210); pdf.setLineWidth(0.3); pdf.roundedRect(M, y, textW, boxH, 2.5, 2.5, "FD");
        let by = y + 7;
        for (const [k, v] of rowsO) {
            pdf.setFont("helvetica", "bold"); pdf.setFontSize(9.5); pdf.setTextColor(...MAROON); pdf.text(`${k}:`, M + 5, by);
            pdf.setFont("helvetica", "normal"); pdf.setTextColor(...INK); pdf.text((pdf.splitTextToSize(v, textW - 42) as string[])[0], M + 38, by); by += 6.2;
        }
        y += boxH + 8;

        heading("Itinerary");
        for (const block of itin.split(/\n{2,}/)) {
            const [title, ...rest] = block.split("\n"); if (!title.trim()) continue;
            need(16); pdf.setFont("helvetica", "bold"); pdf.setFontSize(10.5); pdf.setTextColor(...INK); pdf.text(title.trim(), M, y); y += 5.5;
            if (rest.join(" ").trim()) para(rest.join(" ").trim(), 9.8, [74, 85, 97]); y += 3;
        }
        if (acts.length) {
            need(20); heading("Activities included");
            para(acts.map((k) => ACTIVITIES.find((a) => a.key === k)?.label).join("  |  "), 9.8, INK); y += 2;
        }

        // pricing options
        need(56); heading(`Pricing (${tier} package)`);
        const n = calc.rows.length, gap = 5, bw = (textW - gap * (n - 1)) / n;
        calc.rows.forEach((r, i) => {
            const x = M + i * (bw + gap);
            pdf.setFillColor(250, 246, 239); pdf.setDrawColor(...(i === n - 1 && n > 1 ? MAROON : [236, 227, 210] as [number, number, number])); pdf.setLineWidth(0.5);
            pdf.roundedRect(x, y, bw, 34, 3, 3, "FD");
            pdf.setFont("helvetica", "bold"); pdf.setFontSize(8.5); pdf.setTextColor(...MAROON);
            pdf.text(`OPTION ${i + 1}  |  ${VEH[r.v].label.toUpperCase()}`, x + 4, y + 7);
            pdf.setFont("times", "bold"); pdf.setFontSize(n > 2 ? 15 : 19); pdf.setTextColor(...INK);
            pdf.text(money(mode === "pp" ? r.pp : r.total), x + 4, y + 17);
            pdf.setFont("helvetica", "normal"); pdf.setFontSize(8.5); pdf.setTextColor(...GREY);
            pdf.text(mode === "pp" ? "per person" : `total for ${pax} guest${pax > 1 ? "s" : ""}`, x + 4, y + 22.5);
            pdf.text(mode === "pp" ? `${money(r.total)} total (${pax} guests)` : `${money(r.pp)} per person`, x + 4, y + 28);
        });
        y += 39;
        para(`All taxes included${tickets ? "" : "  |  entry tickets not included"}${hotel === "none" ? "  |  accommodation not included" : ""}.`, 9, GREY); y += 3;

        const included = [
            `Private AC ${calc.rows.map((r) => VEH[r.v].label).join(" / ")} with professional driver for ${dayText(days)}`,
            ...(guideLang === "none" ? [] : [`${guideLang}-speaking, government-approved tour guide`]),
            ...(hotel !== "none" ? [`${nightText(nights)} in a ${HOTEL[hotel]} (${roomCount} room${roomCount > 1 ? "s" : ""})`] : []),
            ...(tickets ? ["Monument entry tickets"] : []),
            ...acts.map((k) => ACTIVITIES.find((a) => a.key === k)!.label),
            "Pickup and drop-off at the points mentioned above",
            "Fuel, parking, tolls and driver allowances",
            "Complimentary bottled drinking water during sightseeing",
            "Assistance with family photography at suitable spots",
            "Entry assistance via the fastest authorized route*",
            "All applicable taxes (GST)",
        ];
        const notIncluded = [
            ...(tickets ? [] : ["Monument entry tickets (purchased directly by guests)"]),
            ...(hotel === "none" ? ["Hotel accommodation"] : []),
            "Meals and personal expenses",
            "Tips / gratuities",
            "Professional or paid photography services",
            "Anything not listed under Included",
        ];
        const colW = (textW - 8) / 2;
        need(18 + Math.max(listH(included, colW), listH(notIncluded, colW)));
        const top = y;
        pdf.setFont("times", "bold"); pdf.setFontSize(13); pdf.setTextColor(...MAROON); pdf.text("Included", M, y); pdf.text("Not included", M + colW + 8, y);
        pdf.setDrawColor(...GOLD); pdf.setLineWidth(0.6); pdf.line(M, y + 2, M + colW, y + 2); pdf.line(M + colW + 8, y + 2, W - M, y + 2);
        const y1 = bullets(included, M, colW, top + 9, INK), y2 = bullets(notIncluded, M + colW + 8, colW, top + 9, GREY);
        y = Math.max(y1, y2) + 4;
        para("*Priority or skip-the-line access depends on monument rules and the ticket type; security checks and queues may still apply. Photography assistance is included but professional photographers are not, unless agreed separately.", 8.2, GREY); y += 4;

        heading("Taxes & payment");
        para("All applicable taxes (GST) are included in the price shown. A secure payment link is shared on confirmation, or you may pay by bank transfer using the details below. A deposit confirms your booking and the balance is due before the tour, as per our terms.", 9.5); y += 2;

        const bankRows: [string, string][] = ([
            ["Account holder", bank.holder], ["Bank", bank.bank], ["Branch", bank.branch], ["Account number", bank.account],
            ["IFSC code", bank.ifsc], ["SWIFT / BIC code", bank.swift], ["Bank address", bank.address],
        ] as [string, string][]).filter(([, v]) => v.trim());
        if (showBank && bankRows.length) {
            need(10 + bankRows.length * 6.2 + 8); heading("Bank details");
            const bh = bankRows.length * 6.2 + 6;
            pdf.setFillColor(250, 246, 239); pdf.setDrawColor(236, 227, 210); pdf.setLineWidth(0.3); pdf.roundedRect(M, y, textW, bh, 2.5, 2.5, "FD");
            let yy = y + 7;
            for (const [k, v] of bankRows) {
                pdf.setFont("helvetica", "bold"); pdf.setFontSize(9.5); pdf.setTextColor(...MAROON); pdf.text(`${k}:`, M + 5, yy);
                pdf.setFont("helvetica", "normal"); pdf.setTextColor(...INK); pdf.text((pdf.splitTextToSize(v, textW - 52) as string[])[0], M + 45, yy); yy += 6.2;
            }
            y += bh + 5;
        }
        para("We look forward to welcoming you and providing a comfortable, informative and memorable experience.", 9.8, GREY);
        footer();
        pdf.save(`GuideIndiaTours-Quote-${(client.trim() || "Guest").replace(/[^a-z0-9]+/gi, "-")}.pdf`);
    };

    const inp = "w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-base text-gray-900";
    const lab = "block text-xs font-semibold text-gray-600 mb-1";
    const card = "bg-white rounded-2xl border border-gray-200 p-5";
    const num = (v: number, set: (n: number) => void) => <input type="number" min={0} className={inp} value={v} onChange={(e) => set(+e.target.value || 0)} />;

    return (
        <main className="min-h-screen bg-gray-50 pt-28 pb-16">
            <div className="container mx-auto max-w-3xl px-4 space-y-5">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Quote Maker</h1>
                    <p className="text-sm text-gray-500">Fill the details and download a client-ready PDF. The PDF shows only the final customer price.</p>
                </div>

                <section className={card + " grid grid-cols-1 sm:grid-cols-2 gap-4"}>
                    <label><span className={lab}>Client name</span><input className={inp} value={client} onChange={(e) => setClient(e.target.value)} placeholder="Mr. Raj" /></label>
                    <label><span className={lab}>Package type</span>
                        <select className={inp} value={tier} onChange={(e) => setTier(e.target.value as Tier)}>
                            <option>Standard</option><option>Premium</option><option>Luxury</option>
                        </select></label>
                    <label><span className={lab}>Adults</span>
                        <select className={inp} value={adults} onChange={(e) => setAdults(+e.target.value)}>{Array.from({ length: 30 }, (_, i) => i + 1).map((n) => <option key={n}>{n}</option>)}</select></label>
                    <label><span className={lab}>Children</span>
                        <select className={inp} value={children} onChange={(e) => setChildren(+e.target.value)}>{Array.from({ length: 11 }, (_, i) => i).map((n) => <option key={n}>{n}</option>)}</select></label>
                    {children > 0 && <label className="sm:col-span-2"><span className={lab}>Children ages (optional)</span><input className={inp} value={childAges} onChange={(e) => setChildAges(e.target.value)} placeholder="13 years" /></label>}
                    <label><span className={lab}>Start date</span><input type="date" className={inp} value={start} onChange={(e) => setStart(e.target.value)} /></label>
                    <label><span className={lab}>End date</span><input type="date" className={inp} value={end} min={start} onChange={(e) => setEnd(e.target.value)} /></label>
                    {dateSpan > 0 ? (
                        <p className="sm:col-span-2 text-sm font-semibold text-[#6b1020]">{dayText(days)} / {nightText(nights)}</p>
                    ) : (
                        <label><span className={lab}>Days (when no dates are set)</span>
                            <select className={inp} value={daysManual} onChange={(e) => setDaysManual(+e.target.value)}>{Array.from({ length: 21 }, (_, i) => i + 1).map((n) => <option key={n} value={n}>{dayText(n)} / {nightText(n - 1)}</option>)}</select></label>
                    )}
                    <label><span className={lab}>Pickup point</span><input className={inp} value={pickup} onChange={(e) => setPickup(e.target.value)} placeholder="Delhi airport / hotel name" /></label>
                    <label><span className={lab}>Drop point</span><input className={inp} value={drop} onChange={(e) => setDrop(e.target.value)} placeholder="Agra hotel / Jaipur" /></label>
                </section>

                <section className={card}>
                    <h2 className="font-semibold text-gray-900 mb-1">Vehicles <span className="text-xs font-normal text-gray-400">(select up to 3 to show side by side)</span></h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {(Object.keys(VEH) as VehKey[]).map((k) => (
                            <label key={k} className={`flex items-start gap-2 rounded-lg border p-3 cursor-pointer ${vehs.includes(k) ? "border-[#6b1020] bg-[#faf6ef]" : "border-gray-200"}`}>
                                <input type="checkbox" className="mt-1" checked={vehs.includes(k)} onChange={() => setVehs(toggle(vehs, k, 3))} />
                                <span><b className="text-sm">{VEH[k].label}</b><br /><span className="text-xs text-gray-500">{VEH[k].sub}</span></span>
                            </label>
                        ))}
                    </div>
                </section>

                <section className={card + " grid grid-cols-1 sm:grid-cols-2 gap-4"}>
                    <label><span className={lab}>Guide</span>
                        <select className={inp} value={guideLang} onChange={(e) => setGuideLang(e.target.value)}>
                            <option value="none">No guide</option>
                            {GUIDE_LANGS.map((l) => <option key={l} value={l}>{l}-speaking guide</option>)}
                        </select></label>
                    <label><span className={lab}>Monument entry tickets</span>
                        <select className={inp} value={tickets ? "yes" : "no"} onChange={(e) => setTickets(e.target.value === "yes")}>
                            <option value="no">Not included (guests buy directly)</option><option value="yes">Included in price</option>
                        </select></label>
                    <label><span className={lab}>Hotel category</span>
                        <select className={inp} value={hotel} onChange={(e) => setHotel(e.target.value as HotelKey)}>
                            {(Object.keys(HOTEL) as HotelKey[]).map((k) => <option key={k} value={k}>{HOTEL[k]}</option>)}</select></label>
                    <label><span className={lab}>Hotel name (optional)</span><input className={inp} value={hotelName} onChange={(e) => setHotelName(e.target.value)} placeholder="Radisson Hotel Agra" /></label>
                    {hotel !== "none" && <label><span className={lab}>Rooms (0 = auto: 1 per 2 adults)</span>
                        <input type="number" min={0} className={inp} value={rooms} onChange={(e) => setRooms(+e.target.value || 0)} /><span className="text-xs text-gray-400">Using {roomCount} room{roomCount > 1 ? "s" : ""}</span></label>}
                    <div className="sm:col-span-2">
                        <span className={lab}>Activities and experiences</span>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {ACTIVITIES.map((a) => (
                                <label key={a.key} className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm cursor-pointer ${acts.includes(a.key) ? "border-[#6b1020] bg-[#faf6ef]" : "border-gray-200"}`}>
                                    <input type="checkbox" checked={acts.includes(a.key)} onChange={() => setActs(toggle(acts, a.key))} />{a.label}
                                </label>
                            ))}
                        </div>
                    </div>
                    <label><span className={lab}>Show price as</span>
                        <select className={inp} value={mode} onChange={(e) => setMode(e.target.value as "pp" | "total")}><option value="pp">Per person</option><option value="total">Total (whole group)</option></select></label>
                    <label><span className={lab}>Currency</span>
                        <select className={inp} value={currency} onChange={(e) => setCurrency(e.target.value as Cur)}>
                            {(Object.keys(CUR_LABEL) as Cur[]).map((c) => <option key={c} value={c}>{CUR_LABEL[c]}</option>)}</select></label>
                    <label className="sm:col-span-2"><span className={lab}>Itinerary (editable)</span>
                        <textarea className={inp + " font-mono text-sm"} rows={9} value={itin} onChange={(e) => { setItin(e.target.value); setItinTouched(true); }} />
                        <span className="text-xs text-gray-400">Separate days with a blank line. The first line of each block is the day title.</span></label>
                </section>

                <section className="rounded-2xl bg-[#6b1020] text-white p-6">
                    <div className="text-xs uppercase tracking-widest text-white/60">{tier} - {dayText(days)} / {nightText(nights)} - {pax} guest{pax > 1 ? "s" : ""}</div>
                    <div className="grid gap-4 mt-3" style={{ gridTemplateColumns: `repeat(${Math.max(1, calc.rows.length)}, minmax(0, 1fr))` }}>
                        {calc.rows.map((r, i) => (
                            <div key={r.v} className="rounded-xl bg-white/10 p-4">
                                <div className="text-xs text-white/60">Option {i + 1} - {VEH[r.v].label}</div>
                                <div className="text-2xl font-bold mt-1">{money(mode === "pp" ? r.pp : r.total)}</div>
                                <div className="text-xs text-white/70">{mode === "pp" ? `per person (${money(r.total)} total)` : `total (${money(r.pp)} per person)`}</div>
                            </div>
                        ))}
                    </div>
                    {calc.warnings.length > 0 && (
                        <ul className="mt-4 rounded-lg bg-[#e0b64a] text-black text-sm p-3 list-disc pl-6 space-y-1">{calc.warnings.map((w) => <li key={w}>{w}</li>)}</ul>
                    )}
                    <button onClick={makePdf} disabled={!canDownload} className="mt-5 w-full sm:w-auto rounded-full bg-[#e0b64a] px-8 py-3 font-bold text-black hover:bg-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed">Download PDF</button>
                </section>

                <details className={card}>
                    <summary className="cursor-pointer text-sm font-semibold text-gray-700">Bank details (shown on the PDF, saved only in this browser)</summary>
                    <label className="flex items-center gap-2 mt-4 text-sm text-gray-700"><input type="checkbox" checked={showBank} onChange={(e) => setShowBank(e.target.checked)} /> Show bank details on the PDF</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                        {([["holder", "Account holder name"], ["bank", "Bank name"], ["branch", "Branch"], ["account", "Account number"], ["ifsc", "IFSC code"], ["swift", "SWIFT / BIC code"]] as [keyof Bank, string][]).map(([k, l]) => (
                            <label key={k}><span className={lab}>{l}</span><input className={inp} value={bank[k]} onChange={(e) => setBank({ ...bank, [k]: e.target.value })} /></label>
                        ))}
                        <label className="sm:col-span-2"><span className={lab}>Bank address</span><input className={inp} value={bank.address} onChange={(e) => setBank({ ...bank, address: e.target.value })} /></label>
                    </div>
                </details>

                <details className={card}>
                    <summary className="cursor-pointer text-sm font-semibold text-gray-700">Rates - internal costs in Rs. (never shown to the client, saved only in this browser)</summary>
                    <div className="mt-4 space-y-4 text-sm">
                        <div><b>Vehicle cost per day</b><div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
                            {(Object.keys(VEH) as VehKey[]).map((k) => <label key={k}><span className={lab}>{VEH[k].label}</span>{num(s.veh[k], (n) => setS({ ...s, veh: { ...s.veh, [k]: n } }))}</label>)}</div></div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            <label><span className={lab}>Guide cost per day</span>{num(s.guide, (n) => setS({ ...s, guide: n }))}</label>
                            <label><span className={lab}>Extra per day for foreign-language guide</span>{num(s.langGuideExtra, (n) => setS({ ...s, langGuideExtra: n }))}</label>
                            <label><span className={lab}>Monument tickets per person per day</span>{num(s.tickets, (n) => setS({ ...s, tickets: n }))}</label>
                        </div>
                        <div><b>Hotel cost per room per night</b><div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
                            {(["h3", "h4", "h5", "lux"] as const).map((k) => <label key={k}><span className={lab}>{HOTEL[k]}</span>{num(s.hotel[k], (n) => setS({ ...s, hotel: { ...s.hotel, [k]: n } }))}</label>)}</div></div>
                        <div><b>Activity cost per person</b><div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
                            {ACTIVITIES.map((a) => <label key={a.key}><span className={lab}>{a.label}</span>{num(s.act[a.key] || 0, (n) => setS({ ...s, act: { ...s.act, [a.key]: n } }))}</label>)}</div></div>
                        <div><b>Premium / Luxury extra cost per person per day</b><div className="grid grid-cols-2 gap-3 mt-2">
                            <label><span className={lab}>Premium</span>{num(s.tierUplift.Premium, (n) => setS({ ...s, tierUplift: { ...s.tierUplift, Premium: n } }))}</label>
                            <label><span className={lab}>Luxury</span>{num(s.tierUplift.Luxury, (n) => setS({ ...s, tierUplift: { ...s.tierUplift, Luxury: n } }))}</label></div></div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            <label><span className={lab}>Profit %</span>{num(s.profit, (n) => setS({ ...s, profit: n }))}</label>
                            <label><span className={lab}>GST %</span>{num(s.gst, (n) => setS({ ...s, gst: n }))}</label>
                            <label><span className={lab}>Razorpay fee %</span>{num(s.gateway, (n) => setS({ ...s, gateway: n }))}</label>
                        </div>
                        <div><b>Exchange rates (Rs. per 1 unit) - update to today&apos;s rate</b><div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
                            {(["USD", "EUR", "GBP", "AUD"] as const).map((c) => <label key={c}><span className={lab}>{c}</span>{num(s.fx[c], (n) => setS({ ...s, fx: { ...s.fx, [c]: n || DEFAULT_SETTINGS.fx[c] } }))}</label>)}</div></div>
                        <div className="flex flex-wrap items-center gap-3">
                            <p className="text-xs text-gray-400">Shared costs for this quote (hotel, tickets, activities, tier): Rs. {Math.round(calc.shared).toLocaleString("en-IN")}</p>
                            <button type="button" className="text-xs underline text-gray-500" onClick={() => { if (confirm("Reset all rates to defaults?")) setS(DEFAULT_SETTINGS); }}>Reset rates</button>
                        </div>
                    </div>
                </details>
            </div>
        </main>
    );
}
