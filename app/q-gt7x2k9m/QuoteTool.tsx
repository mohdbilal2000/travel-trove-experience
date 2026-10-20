"use client";

import { useEffect, useMemo, useState } from "react";
import jsPDF from "jspdf";

/**
 * Staff quote maker (hidden URL). Pick adults, car, days and whether to show the
 * price per person or in total, then download a branded PDF.
 *
 * The PDF contains only the customer price - never cost, profit or fees.
 * Rates below are COST per day in INR and are editable on the page.
 */

type CarKey = "sedan" | "suv" | "crysta";

const CARS: Record<CarKey, { label: string; sub: string; costPerDay: number }> = {
    sedan: { label: "Sedan", sub: "Comfortable, up to 3 guests", costPerDay: 1500 },
    suv: { label: "SUV", sub: "Spacious, great value for 4 guests", costPerDay: 2000 },
    crysta: { label: "Innova Crysta", sub: "Premium and spacious, best for families", costPerDay: 3000 },
};

const GUIDE_COST_PER_DAY = 2500;

const MAROON: [number, number, number] = [107, 16, 32];
const GOLD: [number, number, number] = [224, 182, 74];
const INK: [number, number, number] = [34, 38, 46];
const GREY: [number, number, number] = [107, 114, 128];

const INCLUDED = [
    "Private AC vehicle with professional driver",
    "English-speaking, government-approved tour guide",
    "Hotel pickup and drop-off",
    "Fuel, parking, tolls and driver allowances",
    "Complimentary bottled drinking water during sightseeing",
    "Assistance with family photography at suitable spots",
    "Entry assistance via the fastest authorized route*",
    "All applicable taxes (GST)",
    "Comfortable sightseeing at your own pace",
];
const NOT_INCLUDED = [
    "Monument entry tickets (purchased directly by guests)",
    "Meals and personal expenses",
    "Tips / gratuities",
    "Professional or paid photography services",
    "Anything not listed under Included",
];

function defaultItinerary(days: number): string {
    const d = [
        "Day 1 - Agra Sightseeing\nPickup from your hotel at your preferred time. Visit Agra Fort, the magnificent Mughal fortress with royal palaces and rich history, followed by Mehtab Bagh, the riverside garden with scenic views of the Taj Mahal (weather permitting). Return to your hotel after sightseeing.",
        "Day 2 - Taj Mahal and Baby Taj\nEarly-morning pickup for the world-famous Taj Mahal: its gardens, marble inlay work and love story, with assistance for family photographs at suitable locations. Then visit Itimad-ud-Daulah's Tomb (Baby Taj), an elegant marble mausoleum famous for its delicate inlay. Return comfortably to your hotel.",
    ];
    const out: string[] = [];
    for (let i = 0; i < days; i++) {
        out.push(d[i] ?? `Day ${i + 1} - Customised\nSightseeing planned around your interests, for example Fatehpur Sikri, local markets or a relaxed day. Details to be confirmed with you.`);
    }
    return out.join("\n\n");
}

const inr = (n: number) => `Rs. ${Math.round(n).toLocaleString("en-IN")}`;

export default function QuoteTool() {
    const [client, setClient] = useState("");
    const [adults, setAdults] = useState(3);
    const [children, setChildren] = useState(0);
    const [childAges, setChildAges] = useState("");
    const [car, setCar] = useState<CarKey>("suv");
    const [days, setDays] = useState(2);
    const [mode, setMode] = useState<"pp" | "total">("pp");
    const [currency, setCurrency] = useState<"USD" | "INR">("USD");
    const [start, setStart] = useState("");
    const [hotel, setHotel] = useState("");
    const [includeGuide, setIncludeGuide] = useState(true);
    const [itin, setItin] = useState(defaultItinerary(2));
    const [itinTouched, setItinTouched] = useState(false);

    // Editable rates (hidden unless opened)
    const [carRates, setCarRates] = useState<Record<CarKey, number>>({
        sedan: CARS.sedan.costPerDay, suv: CARS.suv.costPerDay, crysta: CARS.crysta.costPerDay,
    });
    const [guideRate, setGuideRate] = useState(GUIDE_COST_PER_DAY);
    const [profit, setProfit] = useState(25);
    const [gst, setGst] = useState(5);
    const [gateway, setGateway] = useState(3);
    const [fx, setFx] = useState(83);

    useEffect(() => {
        if (!itinTouched) setItin(defaultItinerary(days));
    }, [days, itinTouched]);

    const pax = Math.max(1, adults + children);

    const calc = useMemo(() => {
        const cost = days * (carRates[car] + (includeGuide ? guideRate : 0));
        const totalInr = cost * (1 + profit / 100) * (1 + gst / 100) * (1 + gateway / 100);
        const ppRaw = currency === "USD" ? totalInr / fx / pax : totalInr / pax;
        // round per-person first so per-person x guests always equals the total shown
        const pp = currency === "USD" ? Math.round(ppRaw) : Math.round(ppRaw / 10) * 10;
        return { cost, totalInr, pp, total: pp * pax };
    }, [days, car, carRates, guideRate, includeGuide, profit, gst, gateway, fx, pax, currency]);

    const money = (n: number) => (currency === "USD" ? `US $${n.toLocaleString("en-US")}` : inr(n));

    const makePdf = () => {
        const pdf = new jsPDF({ unit: "mm", format: "a4" });
        const W = 210, H = 297, M = 16;
        const textW = W - M * 2;
        let y = 0;

        const footer = () => {
            pdf.setFillColor(17, 24, 39);
            pdf.rect(0, H - 22, W, 22, "F");
            pdf.setFont("helvetica", "bold"); pdf.setFontSize(10); pdf.setTextColor(...GOLD);
            pdf.text("GUIDE INDIA TOURS", M, H - 14);
            pdf.setFont("helvetica", "normal"); pdf.setFontSize(8); pdf.setTextColor(255, 255, 255);
            pdf.text("www.guideindiatours.com  |  info@guideindiatours.com  |  WhatsApp: +91 89798 10991", M, H - 9.5);
            pdf.setTextColor(156, 163, 175);
            pdf.text("Quality  |  Safety  |  Peace of Mind", M, H - 5.5);
        };
        const header = () => {
            pdf.setFillColor(...MAROON);
            pdf.rect(0, 0, W, 28, "F");
            pdf.setFont("times", "bold"); pdf.setFontSize(20); pdf.setTextColor(255, 255, 255);
            pdf.text("GUIDE INDIA ", M, 14);
            const w = pdf.getTextWidth("GUIDE INDIA ");
            pdf.setTextColor(...GOLD); pdf.text("TOURS", M + w, 14);
            pdf.setFont("helvetica", "normal"); pdf.setFontSize(8); pdf.setTextColor(243, 217, 222);
            pdf.text("Government-Approved Tour Guide & Private Travel Services  |  Since 2004", M, 21);
        };
        const newPage = () => { footer(); pdf.addPage(); header(); y = 38; };
        const need = (h: number) => { if (y + h > H - 28) newPage(); };
        const heading = (t: string) => {
            need(14);
            pdf.setFont("times", "bold"); pdf.setFontSize(13); pdf.setTextColor(...MAROON);
            pdf.text(t, M, y);
            pdf.setDrawColor(...GOLD); pdf.setLineWidth(0.6); pdf.line(M, y + 2, W - M, y + 2);
            y += 9;
        };
        const para = (t: string, size = 10, color: [number, number, number] = INK, bold = false) => {
            pdf.setFont("helvetica", bold ? "bold" : "normal"); pdf.setFontSize(size); pdf.setTextColor(...color);
            const lines = pdf.splitTextToSize(t, textW) as string[];
            for (const ln of lines) { need(6); pdf.text(ln, M, y); y += size * 0.5 + 1.2; }
        };

        header();
        y = 38;
        const today = new Date();
        const qno = `GIT-${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}-${Math.floor(100 + Math.random() * 900)}`;
        pdf.setFont("helvetica", "normal"); pdf.setFontSize(8); pdf.setTextColor(243, 217, 222);
        pdf.text(`Quotation No: ${qno}`, W - M, 12, { align: "right" });
        pdf.text(`Date: ${today.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}`, W - M, 17, { align: "right" });
        pdf.text("Valid for 7 days", W - M, 22, { align: "right" });

        pdf.setFont("times", "bold"); pdf.setFontSize(17); pdf.setTextColor(...MAROON);
        pdf.text("Private Tour Itinerary & Quotation", M, y); y += 7;
        para(`Prepared for ${client.trim() || "our valued guest"} - thank you for choosing Guide India Tours.`, 10, GREY);
        y += 3;

        // overview box
        const guests = `${adults} Adult${adults > 1 ? "s" : ""}${children ? ` + ${children} Child${children > 1 ? "ren" : ""}${childAges.trim() ? ` (${childAges.trim()})` : ""}` : ""}`;
        const dateTxt = start
            ? new Date(start + "T00:00:00").toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })
            : "To be confirmed";
        const rows: [string, string][] = [
            ["Guests", guests],
            ["Travel dates", `${dateTxt}  (${days} Day${days > 1 ? "s" : ""})`],
            ["Hotel", hotel.trim() || "To be confirmed"],
            ["Vehicle", `Private AC ${CARS[car].label}`],
            ["Services", `Professional driver${includeGuide ? " and English-speaking, government-approved tour guide" : ""}`],
        ];
        const boxH = rows.length * 6.2 + 6;
        need(boxH + 4);
        pdf.setFillColor(250, 246, 239); pdf.setDrawColor(236, 227, 210); pdf.setLineWidth(0.3);
        pdf.roundedRect(M, y, textW, boxH, 2.5, 2.5, "FD");
        let by = y + 7;
        for (const [k, v] of rows) {
            pdf.setFont("helvetica", "bold"); pdf.setFontSize(9.5); pdf.setTextColor(...MAROON); pdf.text(`${k}:`, M + 5, by);
            pdf.setFont("helvetica", "normal"); pdf.setTextColor(...INK);
            const vl = pdf.splitTextToSize(v, textW - 40) as string[];
            pdf.text(vl[0], M + 35, by);
            by += 6.2;
        }
        y += boxH + 8;

        heading("Itinerary");
        for (const block of itin.split(/\n{2,}/)) {
            const [title, ...rest] = block.split("\n");
            if (!title.trim()) continue;
            need(16);
            pdf.setFont("helvetica", "bold"); pdf.setFontSize(10.5); pdf.setTextColor(...INK);
            pdf.text(title.trim(), M, y); y += 5.5;
            if (rest.join(" ").trim()) para(rest.join(" ").trim(), 9.8, [74, 85, 97]);
            y += 3;
        }

        // pricing
        need(54);
        heading("Pricing");
        const big = mode === "pp" ? `${money(calc.pp)} per person` : `${money(calc.total)} total`;
        const small = mode === "pp"
            ? `${money(calc.total)} total for ${pax} guest${pax > 1 ? "s" : ""}`
            : `${money(calc.pp)} per person (${pax} guest${pax > 1 ? "s" : ""})`;
        pdf.setFillColor(250, 246, 239); pdf.setDrawColor(...MAROON); pdf.setLineWidth(0.5);
        pdf.roundedRect(M, y, textW, 30, 3, 3, "FD");
        pdf.setFont("helvetica", "bold"); pdf.setFontSize(9); pdf.setTextColor(...MAROON);
        pdf.text(`${CARS[car].label.toUpperCase()}  |  ${days} DAY${days > 1 ? "S" : ""}`, M + 6, y + 8);
        pdf.setFont("times", "bold"); pdf.setFontSize(24); pdf.setTextColor(...INK);
        pdf.text(big, M + 6, y + 19);
        pdf.setFont("helvetica", "normal"); pdf.setFontSize(9.5); pdf.setTextColor(...GREY);
        pdf.text(`${small}  |  all taxes included  |  entry tickets not included`, M + 6, y + 26);
        y += 38;

        // included / not included
        const colW = (textW - 8) / 2;
        const listHeight = (items: string[]) => items.reduce((a, t) => a + (pdf.splitTextToSize(t, colW - 5) as string[]).length * 4.6 + 1.2, 0);
        need(18 + Math.max(listHeight(INCLUDED), listHeight(NOT_INCLUDED)));
        const top = y;
        pdf.setFont("times", "bold"); pdf.setFontSize(13); pdf.setTextColor(...MAROON);
        pdf.text("Included", M, y); pdf.text("Not included", M + colW + 8, y);
        pdf.setDrawColor(...GOLD); pdf.setLineWidth(0.6);
        pdf.line(M, y + 2, M + colW, y + 2); pdf.line(M + colW + 8, y + 2, W - M, y + 2);
        const draw = (items: string[], x: number, color: [number, number, number]) => {
            let yy = top + 9;
            pdf.setFont("helvetica", "normal"); pdf.setFontSize(9.2); pdf.setTextColor(...color);
            for (const t of items) {
                const ls = pdf.splitTextToSize(t, colW - 5) as string[];
                pdf.text("-", x, yy);
                ls.forEach((ln, i) => pdf.text(ln, x + 4, yy + i * 4.6));
                yy += ls.length * 4.6 + 1.2;
            }
            return yy;
        };
        const y1 = draw(INCLUDED, M, INK);
        const y2 = draw(NOT_INCLUDED, M + colW + 8, GREY);
        y = Math.max(y1, y2) + 4;

        para("*Priority or skip-the-line access depends on monument rules and the ticket type; security checks and queues may still apply. Photography assistance is included but professional photographers are not, unless agreed separately.", 8.2, GREY);
        y += 4;
        heading("Taxes & payment");
        para("All applicable taxes (GST) are included in the price shown. A secure payment link is shared on confirmation; a deposit confirms your booking and the balance is due before the tour, as per our terms.", 9.5);
        y += 3;
        para("We look forward to welcoming you and providing a comfortable, informative and memorable experience.", 9.8, GREY);

        footer();
        const safe = (client.trim() || "Guest").replace(/[^a-z0-9]+/gi, "-");
        pdf.save(`GuideIndiaTours-Quote-${safe}.pdf`);
    };

    const inp = "w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-base text-gray-900";
    const lab = "block text-xs font-semibold text-gray-600 mb-1";

    return (
        <main className="min-h-screen bg-gray-50 pt-28 pb-16">
            <div className="container mx-auto max-w-3xl px-4">
                <h1 className="text-2xl font-bold text-gray-900">Quote Maker</h1>
                <p className="text-sm text-gray-500 mb-6">Fill the details and download a client-ready PDF. Prices show only the final customer rate.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white rounded-2xl border border-gray-200 p-5">
                    <label><span className={lab}>Client name</span><input className={inp} value={client} onChange={(e) => setClient(e.target.value)} placeholder="Mr. Raj" /></label>
                    <label><span className={lab}>Hotel</span><input className={inp} value={hotel} onChange={(e) => setHotel(e.target.value)} placeholder="Radisson Hotel Agra" /></label>
                    <label><span className={lab}>Adults</span>
                        <select className={inp} value={adults} onChange={(e) => setAdults(+e.target.value)}>
                            {Array.from({ length: 15 }, (_, i) => i + 1).map((n) => <option key={n} value={n}>{n}</option>)}
                        </select>
                    </label>
                    <label><span className={lab}>Children</span>
                        <select className={inp} value={children} onChange={(e) => setChildren(+e.target.value)}>
                            {Array.from({ length: 9 }, (_, i) => i).map((n) => <option key={n} value={n}>{n}</option>)}
                        </select>
                    </label>
                    {children > 0 && (
                        <label className="sm:col-span-2"><span className={lab}>Children ages (optional)</span><input className={inp} value={childAges} onChange={(e) => setChildAges(e.target.value)} placeholder="13 years" /></label>
                    )}
                    <label><span className={lab}>Car</span>
                        <select className={inp} value={car} onChange={(e) => setCar(e.target.value as CarKey)}>
                            {(Object.keys(CARS) as CarKey[]).map((k) => <option key={k} value={k}>{CARS[k].label} - {CARS[k].sub}</option>)}
                        </select>
                    </label>
                    <label><span className={lab}>Days</span>
                        <select className={inp} value={days} onChange={(e) => setDays(+e.target.value)}>
                            {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => <option key={n} value={n}>{n} day{n > 1 ? "s" : ""}</option>)}
                        </select>
                    </label>
                    <label><span className={lab}>Show price as</span>
                        <select className={inp} value={mode} onChange={(e) => setMode(e.target.value as "pp" | "total")}>
                            <option value="pp">Per person</option>
                            <option value="total">Total (whole group)</option>
                        </select>
                    </label>
                    <label><span className={lab}>Currency</span>
                        <select className={inp} value={currency} onChange={(e) => setCurrency(e.target.value as "USD" | "INR")}>
                            <option value="USD">US Dollar (USD)</option>
                            <option value="INR">Indian Rupee (INR)</option>
                        </select>
                    </label>
                    <label><span className={lab}>Start date (optional)</span><input type="date" className={inp} value={start} onChange={(e) => setStart(e.target.value)} /></label>
                    <label className="flex items-center gap-2 pt-6 text-sm text-gray-700"><input type="checkbox" checked={includeGuide} onChange={(e) => setIncludeGuide(e.target.checked)} /> Include guide</label>
                    <label className="sm:col-span-2"><span className={lab}>Itinerary (editable)</span>
                        <textarea className={inp + " font-mono text-sm"} rows={9} value={itin} onChange={(e) => { setItin(e.target.value); setItinTouched(true); }} />
                        <span className="text-xs text-gray-400">Separate days with a blank line. First line of each block is the day title.</span>
                    </label>
                </div>

                <div className="mt-5 rounded-2xl bg-[#6b1020] text-white p-6">
                    <div className="text-xs uppercase tracking-widest text-white/60">{CARS[car].label} - {days} day{days > 1 ? "s" : ""} - {pax} guest{pax > 1 ? "s" : ""}</div>
                    <div className="text-3xl font-bold mt-1">{mode === "pp" ? `${money(calc.pp)} per person` : `${money(calc.total)} total`}</div>
                    <div className="text-sm text-white/70 mt-1">{mode === "pp" ? `${money(calc.total)} total` : `${money(calc.pp)} per person`}</div>
                    <button onClick={makePdf} className="mt-5 w-full sm:w-auto rounded-full bg-[#e0b64a] px-8 py-3 font-bold text-black hover:bg-white transition-colors">Download PDF</button>
                </div>

                <details className="mt-5 rounded-2xl border border-gray-200 bg-white p-5">
                    <summary className="cursor-pointer text-sm font-semibold text-gray-700">Rates (internal, never shown to the client)</summary>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4 text-sm">
                        {(Object.keys(CARS) as CarKey[]).map((k) => (
                            <label key={k}><span className={lab}>{CARS[k].label} cost / day (Rs.)</span>
                                <input type="number" className={inp} value={carRates[k]} onChange={(e) => setCarRates({ ...carRates, [k]: +e.target.value })} /></label>
                        ))}
                        <label><span className={lab}>Guide cost / day (Rs.)</span><input type="number" className={inp} value={guideRate} onChange={(e) => setGuideRate(+e.target.value)} /></label>
                        <label><span className={lab}>Profit %</span><input type="number" className={inp} value={profit} onChange={(e) => setProfit(+e.target.value)} /></label>
                        <label><span className={lab}>GST %</span><input type="number" className={inp} value={gst} onChange={(e) => setGst(+e.target.value)} /></label>
                        <label><span className={lab}>Razorpay fee %</span><input type="number" className={inp} value={gateway} onChange={(e) => setGateway(+e.target.value)} /></label>
                        <label><span className={lab}>Rs. per US $1</span><input type="number" className={inp} value={fx} onChange={(e) => setFx(+e.target.value || 83)} /></label>
                    </div>
                    <p className="text-xs text-gray-400 mt-3">Our cost for this quote: {inr(calc.cost)}. Customer total: {inr(calc.totalInr)}.</p>
                </details>
            </div>
        </main>
    );
}
