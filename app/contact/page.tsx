"use client";

import React, { useState } from "react";
import {
    MapPin, Phone, Mail, Clock, Send, CheckCircle, Calendar,
    Users, Globe, Package, MessageSquare, User, Building2,
    ArrowRight, ShieldCheck, Sparkles, PhoneCall, Headphones
} from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import SectionHeading from "@/components/shared/SectionHeading";
import RelatedPages from "@/components/shared/RelatedPages";
import { Badge } from "@/components/ui/badge";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

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
            const whatsappMessage = `Hi! I'm ${values.name}. Inquiry: ${values.subject}. Message: ${values.message}`;
            const whatsappUrl = `https://wa.me/918979810991?text=${encodeURIComponent(whatsappMessage)}`;
            window.open(whatsappUrl, '_blank');
            setSubmitted(true);
            toast({ title: 'Message Initiated', description: "Check your WhatsApp for the open chat!" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-ivory-100">
            {/* Minimal High-End Hero */}
            <section className="relative pt-44 pb-32 overflow-hidden bg-white">
                <div className="container mx-auto px-4 text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <Badge className="bg-maroon-600/10 text-maroon-600 border-none mb-8 px-6 py-2 uppercase tracking-[0.3em] text-[9px] font-black">
                            Concierge Access
                        </Badge>
                        <h1 className="text-4xl sm:text-6xl md:text-8xl font-display font-bold text-gray-900 mb-8 leading-tight tracking-tighter">
                            Let's Talk <span className="text-maroon-600">Adventure.</span>
                        </h1>
                        <p className="text-xl text-gray-500 font-light leading-relaxed max-w-2xl mx-auto">
                            Whether you're ready to book or just starting to dream, our travel architects are here to guide your every step.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="pb-40">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">

                        {/* Info Column */}
                        <div className="lg:col-span-5 space-y-12">
                            <div className="p-6 sm:p-8 lg:p-12 bg-white rounded-3xl shadow-sm border border-gray-100 relative group overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-maroon-600/5 rounded-bl-[5rem] translate-x-8 -translate-y-8 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500" />
                                <div className="relative z-10">
                                    <div className="flex items-center gap-6 mb-10">
                                        <div className="w-16 h-16 rounded-2xl bg-maroon-600/5 flex items-center justify-center text-maroon-600">
                                            <PhoneCall size={28} />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-gray-900">Immediate Help</h3>
                                            <p className="text-xs text-gray-500 uppercase tracking-widest font-black">Global Support</p>
                                        </div>
                                    </div>
                                    <div className="space-y-6">
                                        <div className="flex flex-col">
                                            <span className="text-xs font-black text-gray-500 uppercase tracking-widest mb-1">WhatsApp / Calling</span>
                                            <a href="tel:+918979810991" className="text-2xl font-bold text-maroon-600 hover:text-black transition-colors">+91 89798 10991</a>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-xs font-black text-gray-500 uppercase tracking-widest mb-1">Email Concierge</span>
                                            <a href="mailto:info@guideindiatours.com" className="text-xl font-bold text-gray-900 hover:text-maroon-600 transition-colors">info@guideindiatours.com</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 sm:p-8 lg:p-12 bg-black rounded-3xl shadow-2xl relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-br from-maroon-600/30 to-transparent" />
                                <div className="relative z-10 text-white">
                                    <div className="flex items-center gap-6 mb-10">
                                        <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center">
                                            <MapPin size={28} />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold">Agra Office</h3>
                                            <p className="text-xs text-white/40 uppercase tracking-widest font-black">Strategic Location</p>
                                        </div>
                                    </div>
                                    <address className="not-italic text-lg text-white/70 leading-relaxed font-light mb-8">
                                        31/84A, Jangjeet Nagar,<br />
                                        Shamsabad Road, Agra 282001, Uttar Pradesh, India
                                    </address>
                                    <a
                                        href="https://maps.google.com/?q=Guide+India+Tours+Agra"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 text-sm font-bold text-gold-500 hover:text-white transition-colors uppercase tracking-widest"
                                    >
                                        Get Directions <ArrowRight size={16} />
                                    </a>
                                </div>
                            </div>

                            {/* Trust Badges */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-8 bg-gray-50 rounded-3xl flex flex-col items-center text-center">
                                    <ShieldCheck className="w-8 h-8 text-maroon-600 mb-4" />
                                    <span className="text-xs font-black uppercase text-gray-500">100% Secure</span>
                                </div>
                                <div className="p-8 bg-gray-50 rounded-3xl flex flex-col items-center text-center">
                                    <Headphones className="w-8 h-8 text-maroon-600 mb-4" />
                                    <span className="text-xs font-black uppercase text-gray-500">Expert Support</span>
                                </div>
                            </div>
                        </div>

                        {/* Form Column */}
                        <div className="lg:col-span-7">
                            <div className="bg-white p-6 sm:p-8 lg:p-20 rounded-3xl shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] border border-gray-50">
                                <div className="mb-12">
                                    <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">Inquiry Form</h2>
                                    <p className="text-lg text-gray-400 font-light">Complete the details below and an agent will reach out within 2 hours.</p>
                                </div>

                                <FormProvider {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                            <FormField control={form.control} name="name" render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-xs font-black uppercase tracking-widest text-gray-500">Full Name</FormLabel>
                                                    <FormControl>
                                                        <input className="w-full bg-transparent border-b-2 border-gray-100 py-4 focus:border-maroon-600 focus:ring-2 focus:ring-maroon-600/20 outline-none transition-all text-lg font-bold" placeholder="John Doe" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )} />
                                            <FormField control={form.control} name="email" render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-xs font-black uppercase tracking-widest text-gray-500">Email Address</FormLabel>
                                                    <FormControl>
                                                        <input className="w-full bg-transparent border-b-2 border-gray-100 py-4 focus:border-maroon-600 focus:ring-2 focus:ring-maroon-600/20 outline-none transition-all text-lg font-bold" placeholder="john@example.com" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )} />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                            <FormField control={form.control} name="phone" render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-xs font-black uppercase tracking-widest text-gray-500">Phone / WhatsApp</FormLabel>
                                                    <FormControl>
                                                        <input className="w-full bg-transparent border-b-2 border-gray-100 py-4 focus:border-maroon-600 focus:ring-2 focus:ring-maroon-600/20 outline-none transition-all text-lg font-bold" placeholder="+91 000 000 0000" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )} />
                                            <FormField control={form.control} name="subject" render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-xs font-black uppercase tracking-widest text-gray-500">Inquiry Type</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger className="border-none border-b-2 border-gray-100 rounded-none px-0 py-8 focus:ring-2 focus:ring-maroon-600/30 focus:border-maroon-600 h-auto text-lg font-bold">
                                                                <SelectValue placeholder="Select type" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent className="rounded-2xl border-none shadow-2xl">
                                                            <SelectItem value="Tour Booking">Tour Booking</SelectItem>
                                                            <SelectItem value="Guide Booking">Guide Booking</SelectItem>
                                                            <SelectItem value="Custom Experience">Custom Experience</SelectItem>
                                                            <SelectItem value="Corporate/Group">Corporate/Group</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )} />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                            <FormField control={form.control} name="city" render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-xs font-black uppercase tracking-widest text-gray-500">City</FormLabel>
                                                    <FormControl>
                                                        <input className="w-full bg-transparent border-b-2 border-gray-100 py-4 focus:border-maroon-600 focus:ring-2 focus:ring-maroon-600/20 outline-none transition-all text-lg font-bold" placeholder="London" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )} />
                                            <FormField control={form.control} name="country" render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-xs font-black uppercase tracking-widest text-gray-500">Country</FormLabel>
                                                    <FormControl>
                                                        <input className="w-full bg-transparent border-b-2 border-gray-100 py-4 focus:border-maroon-600 focus:ring-2 focus:ring-maroon-600/20 outline-none transition-all text-lg font-bold" placeholder="United Kingdom" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )} />
                                        </div>

                                        <FormField control={form.control} name="message" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-xs font-black uppercase tracking-widest text-gray-500">Message / Request</FormLabel>
                                                <FormControl>
                                                    <textarea
                                                        className="w-full bg-transparent border-b-2 border-gray-100 py-4 focus:border-maroon-600 focus:ring-2 focus:ring-maroon-600/20 outline-none transition-all text-lg font-bold min-h-[150px] resize-none"
                                                        placeholder="Tell us about your passions and preferred pace..."
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />

                                        <Button type="submit" className="w-full py-10 rounded-2xl bg-maroon-600 hover:bg-black text-white text-xl font-display font-bold shadow-2xl transition-all duration-500 group overflow-hidden relative" disabled={loading}>
                                            <span className="relative z-10 flex items-center justify-center gap-3">
                                                {loading ? "Initializing..." : "Submit Inquiry"}
                                                <ArrowRight className="w-6 h-6 transform group-hover:translate-x-2 transition-transform" />
                                            </span>
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                        </Button>
                                    </form>
                                </FormProvider>
                            </div>
                        </div>
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
