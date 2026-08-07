"use client";

import React, { useState } from "react";
import {
    MapPin, Mail, CheckCircle, Globe, Package, MessageSquare, User,
    ArrowRight, ShieldCheck, Sparkles, PhoneCall, Headphones
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import RelatedPages from "@/components/shared/RelatedPages";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { Badge } from "@/components/ui/badge";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import { homeFaqs } from "@/data/homeFaqs";
import { WHATSAPP_NUMBER, CONTACT_EMAIL } from "@/lib/planner";

const contactFormSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    phone: z.string().min(10, { message: "Please enter a valid phone number" }),
    city: z.string().min(2, { message: "City required" }),
    country: z.string().min(2, { message: "Country required" }),
    subject: z.string({ required_error: "Please select an inquiry type" }),
    message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

/** Same field chrome as the homepage trip planner: boxed, rounded, maroon focus ring. */
const fieldClass =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-800 placeholder:font-normal placeholder:text-gray-400 focus:border-maroon-600 focus:ring-2 focus:ring-maroon-600/20 outline-none transition-all";

const labelClass = "text-sm font-semibold text-gray-800";

/** Numbered step header, mirroring the homepage planner's StepBadge. */
const StepBadge = ({ n, label, icon: Icon }: { n: number; label: string; icon: React.ElementType }) => (
    <div className="flex items-center gap-2.5 mb-3">
        <span className="flex items-center justify-center w-7 h-7 rounded-full bg-maroon-600 text-white text-sm font-bold font-sans shadow-sm">
            {n}
        </span>
        <span className="flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wider text-royal-800">
            <Icon className="w-4 h-4 text-maroon-600" />
            {label}
        </span>
    </div>
);

const buildInquiryText = (values: ContactFormValues) =>
    [
        `Hi! I'm ${values.name}.`,
        `Inquiry type: ${values.subject}`,
        `From: ${values.city}, ${values.country}`,
        `Email: ${values.email}`,
        `Phone: ${values.phone}`,
        "",
        values.message,
    ].join("\n");

export default function ContactPage() {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const form = useForm<ContactFormValues>({
        resolver: zodResolver(contactFormSchema),
        defaultValues: {
            name: "", email: "", phone: "", city: "", country: "", subject: "", message: "",
        },
    });

    const onSubmit = async (values: ContactFormValues) => {
        setLoading(true);
        try {
            const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildInquiryText(values))}`;
            window.open(whatsappUrl, '_blank');
            setSubmitted(true);
            toast({ title: 'Message Initiated', description: "Check your WhatsApp for the open chat!" });
        } finally {
            setLoading(false);
        }
    };

    const emailInstead = form.handleSubmit((values) => {
        const subject = `Tour inquiry — ${values.subject}`;
        window.location.href =
            `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildInquiryText(values))}`;
    });

    return (
        <main className="min-h-screen bg-ivory-100">
            {/* Minimal High-End Hero */}
            <section className="relative pt-28 pb-12 md:pt-36 md:pb-16 overflow-hidden bg-white">
                <div className="container mx-auto px-4 text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <Badge className="bg-maroon-600/10 text-maroon-600 border-none mb-6 px-5 py-1.5 uppercase tracking-[0.3em] text-[11px] font-bold">
                            Concierge Access
                        </Badge>
                        <h1 className="font-display font-light leading-[1.05] tracking-wide text-4xl sm:text-5xl lg:text-6xl text-royal-800 mb-5">
                            Let&apos;s Talk <span className="text-maroon-600">Adventure</span>
                        </h1>
                        <p className="text-base sm:text-lg lg:text-xl text-gray-600 font-light leading-relaxed max-w-2xl mx-auto">
                            Whether you&apos;re ready to book or just starting to dream, our travel architects are here to
                            guide your every step — with a reply on WhatsApp within 2 hours.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="pb-16 md:pb-24">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

                        {/* Info Column */}
                        <div className="lg:col-span-5 space-y-6">
                            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
                                <div className="bg-gradient-to-r from-royal-800 to-royal-900 px-5 sm:px-7 py-4 flex items-center gap-3 text-white">
                                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                                        <PhoneCall size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-display text-xl font-semibold">Immediate Help</h3>
                                        <p className="text-[11px] text-white/70 uppercase tracking-widest font-medium">Global Support · 24/7</p>
                                    </div>
                                </div>
                                <div className="p-5 sm:p-7 space-y-3">
                                    <a href="tel:+919410000991" className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 hover:border-maroon-600/40 hover:bg-maroon-50/30 transition-colors">
                                        <span>
                                            <span className="block text-xs text-gray-500">Call us</span>
                                            <span className="block text-base font-bold text-maroon-600">+91 94100 00991</span>
                                        </span>
                                        <ArrowRight className="w-4 h-4 text-maroon-600 flex-shrink-0" />
                                    </a>
                                    <a href="https://wa.me/918979810991" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 hover:border-maroon-600/40 hover:bg-maroon-50/30 transition-colors">
                                        <span>
                                            <span className="block text-xs text-gray-500">WhatsApp</span>
                                            <span className="block text-base font-bold text-maroon-600">+91 89798 10991</span>
                                        </span>
                                        <WhatsAppIcon className="w-5 h-5 text-[#25D366] flex-shrink-0" />
                                    </a>
                                    <a href="mailto:info@guideindiatours.com" className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 hover:border-maroon-600/40 hover:bg-maroon-50/30 transition-colors">
                                        <span className="min-w-0">
                                            <span className="block text-xs text-gray-500">Email concierge</span>
                                            <span className="block text-base font-bold text-gray-900 truncate">info@guideindiatours.com</span>
                                        </span>
                                        <Mail className="w-4 h-4 text-maroon-600 flex-shrink-0 ml-2" />
                                    </a>
                                    <p className="text-xs text-gray-500 pt-1">
                                        Open 24/7 &middot; India Standard Time (UTC+5:30)
                                    </p>
                                </div>
                            </div>

                            <div className="bg-royal-800 rounded-3xl shadow-lg relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-maroon-600/30 to-transparent" />
                                <div className="relative z-10 text-white p-5 sm:p-7">
                                    <div className="flex items-center gap-3 mb-5">
                                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                                            <MapPin size={20} />
                                        </div>
                                        <div>
                                            <h3 className="font-display text-xl font-semibold">Agra Office</h3>
                                            <p className="text-[11px] text-white/60 uppercase tracking-widest font-medium">Visit us in person</p>
                                        </div>
                                    </div>
                                    <address className="not-italic text-base text-white/75 leading-relaxed font-light mb-5">
                                        31/84A, Jangjeet Nagar,<br />
                                        Shamsabad Road, Agra 282001, Uttar Pradesh, India
                                    </address>
                                    <a
                                        href="https://maps.google.com/?q=Guide+India+Tours+Agra"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-sm font-bold text-gold-500 hover:text-white transition-colors uppercase tracking-widest"
                                    >
                                        Get Directions <ArrowRight size={16} />
                                    </a>
                                </div>
                            </div>

                            {/* Trust Badges */}
                            <div className="grid grid-cols-2 gap-3">
                                <div className="p-5 bg-white border border-gray-200 rounded-2xl flex flex-col items-center text-center">
                                    <ShieldCheck className="w-7 h-7 text-maroon-600 mb-2" />
                                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-600">100% Secure</span>
                                </div>
                                <div className="p-5 bg-white border border-gray-200 rounded-2xl flex flex-col items-center text-center">
                                    <Headphones className="w-7 h-7 text-maroon-600 mb-2" />
                                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-600">Expert Support</span>
                                </div>
                            </div>
                        </div>

                        {/* Form Column */}
                        <div className="lg:col-span-7">
                            <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 overflow-hidden text-left">
                                {/* Header — same bar as the homepage planner */}
                                <div className="bg-gradient-to-r from-maroon-600 to-maroon-700 px-5 sm:px-7 py-4 flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-white">
                                        <Sparkles className="w-5 h-5 text-gold-500" />
                                        <h2 className="font-display text-xl sm:text-2xl font-semibold">Send an Inquiry</h2>
                                    </div>
                                    <span className="hidden sm:inline text-white/80 text-xs uppercase tracking-widest">Reply in 2 hrs</span>
                                </div>

                                <div className="p-5 sm:p-7">
                                    <p className="text-sm text-gray-500 mb-6">
                                        Complete the details below and an agent will reach out within 2 hours. Our team is
                                        available 24/7 (India Standard Time, UTC+5:30).
                                    </p>

                                    <AnimatePresence>
                                        {submitted && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 12, scale: 0.97 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 8 }}
                                                transition={{ duration: 0.35, ease: "easeOut" }}
                                                className="mb-6 rounded-2xl bg-gradient-to-br from-royal-50 to-amber-50/60 border border-gold-500/20 p-4"
                                            >
                                                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-maroon-600 mb-2">
                                                    <Sparkles className="w-3.5 h-3.5 text-gold-500" /> Inquiry Sent
                                                </p>
                                                <p className="flex items-start gap-2 text-sm text-royal-800">
                                                    <CheckCircle className="w-4 h-4 text-jade-600 mt-0.5 flex-shrink-0" />
                                                    <span>
                                                        Your WhatsApp chat is open with the details pre-filled — just hit send.
                                                        Prefer email? Use the button below instead.
                                                    </span>
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    <FormProvider {...form}>
                                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                            {/* 1. Your details */}
                                            <section>
                                                <StepBadge n={1} label="Your Details" icon={User} />
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                    <FormField control={form.control} name="name" render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className={labelClass}>Full Name</FormLabel>
                                                            <FormControl>
                                                                <input className={fieldClass} placeholder="John Doe" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )} />
                                                    <FormField control={form.control} name="email" render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className={labelClass}>Email Address</FormLabel>
                                                            <FormControl>
                                                                <input type="email" className={fieldClass} placeholder="john@example.com" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )} />
                                                </div>
                                                <div className="mt-3">
                                                    <FormField control={form.control} name="phone" render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className={labelClass}>Phone / WhatsApp</FormLabel>
                                                            <FormControl>
                                                                <input type="tel" className={fieldClass} placeholder="+91 000 000 0000" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )} />
                                                </div>
                                            </section>

                                            {/* 2. Where you're travelling from */}
                                            <section>
                                                <StepBadge n={2} label="Where You're From" icon={Globe} />
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                    <FormField control={form.control} name="city" render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className={labelClass}>City</FormLabel>
                                                            <FormControl>
                                                                <input className={fieldClass} placeholder="London" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )} />
                                                    <FormField control={form.control} name="country" render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className={labelClass}>Country</FormLabel>
                                                            <FormControl>
                                                                <input className={fieldClass} placeholder="United Kingdom" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )} />
                                                </div>
                                            </section>

                                            {/* 3. Inquiry type */}
                                            <section>
                                                <StepBadge n={3} label="Inquiry Type" icon={Package} />
                                                <FormField control={form.control} name="subject" render={({ field }) => (
                                                    <FormItem>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <FormControl>
                                                                <SelectTrigger className="w-full h-auto rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-800 focus:border-maroon-600 focus:ring-2 focus:ring-maroon-600/20 focus:ring-offset-0 transition-all">
                                                                    <SelectValue placeholder="Select an inquiry type" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent className="rounded-xl border border-gray-200 shadow-xl">
                                                                <SelectItem value="Tour Booking">Tour Booking</SelectItem>
                                                                <SelectItem value="Guide Booking">Guide Booking</SelectItem>
                                                                <SelectItem value="Custom Experience">Custom Experience</SelectItem>
                                                                <SelectItem value="Corporate/Group">Corporate/Group</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )} />
                                            </section>

                                            {/* 4. Message */}
                                            <section>
                                                <StepBadge n={4} label="Your Message" icon={MessageSquare} />
                                                <FormField control={form.control} name="message" render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <textarea
                                                                className={`${fieldClass} min-h-[140px] resize-none leading-relaxed`}
                                                                placeholder="Tell us about your dates, group size and what you'd love to see..."
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )} />
                                                <p className="mt-2 text-xs text-gray-500">
                                                    Tip: the Taj Mahal is closed on Fridays — mention your dates and we&apos;ll plan around it.
                                                </p>
                                            </section>

                                            {/* CTAs — same pairing as the homepage planner */}
                                            <div className="border-t border-gray-100 pt-5 flex flex-col gap-2.5">
                                                <Button
                                                    type="submit"
                                                    disabled={loading}
                                                    className="w-full h-14 bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#20BA5A] hover:to-[#0fa873] text-white font-bold text-base rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                                                >
                                                    <WhatsAppIcon className="w-5 h-5 mr-2" />
                                                    {loading ? "Opening WhatsApp…" : "Send on WhatsApp"}
                                                </Button>
                                                <div className="flex gap-2.5">
                                                    <Button
                                                        type="button"
                                                        onClick={emailInstead}
                                                        variant="outline"
                                                        className="flex-1 h-11 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold rounded-xl"
                                                    >
                                                        <Mail className="w-4 h-4 mr-2" /> Email instead
                                                    </Button>
                                                    <Button
                                                        asChild
                                                        variant="ghost"
                                                        className="flex-1 h-11 text-maroon-600 hover:bg-maroon-50 font-semibold rounded-xl"
                                                    >
                                                        <Link href="/plans">
                                                            Browse tours <ArrowRight className="w-4 h-4 ml-1.5" />
                                                        </Link>
                                                    </Button>
                                                </div>
                                            </div>
                                        </form>
                                    </FormProvider>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Preview */}
            <section className="py-14 md:py-20 bg-white border-t border-gray-100">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-10 text-center">
                        Quick Answers Before You <span className="text-maroon-600">Write</span>
                    </h2>
                    <div className="space-y-4">
                        {homeFaqs.slice(0, 4).map((faq) => (
                            <details key={faq.question} className="group bg-ivory-100 rounded-2xl p-6">
                                <summary className="cursor-pointer font-bold text-gray-900 text-lg list-none flex justify-between items-center gap-4">
                                    {faq.question}
                                    <span aria-hidden="true" className="text-maroon-600 transition-transform group-open:rotate-45 text-2xl leading-none">+</span>
                                </summary>
                                <p className="text-gray-600 font-light leading-relaxed mt-4">{faq.answer}</p>
                            </details>
                        ))}
                    </div>
                    <div className="text-center mt-8">
                        <Link href="/faq" className="text-sm font-bold text-maroon-600 hover:text-black uppercase tracking-widest">
                            See all FAQs →
                        </Link>
                    </div>
                </div>
            </section>

            <RelatedPages
                title="Explore More"
                pages={[
                    {
                        href: "/plans",
                        title: "Browse Tours",
                        description: "Explore our curated tour packages for the Golden Triangle and beyond.",
                    },
                    {
                        href: "/guide-booking",
                        title: "Book a Guide",
                        description: "Reserve a government-authorized heritage guide for your next monument visit.",
                    },
                    {
                        href: "/faq",
                        title: "Frequently Asked Questions",
                        description: "Find answers to common questions about bookings, guides, and travel logistics.",
                    },
                ]}
            />
        </main>
    );
}
