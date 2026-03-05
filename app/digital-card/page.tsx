"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Phone, Mail, MapPin, Star, Download, Globe, Award,
    Users, Clock, CheckCircle, Calendar, MessageCircle,
    Share2, Heart, Sparkles
} from "lucide-react";
import QRCode from "react-qr-code";
import jsPDF from "jspdf";
import FloatingContact from "@/components/shared/FloatingContact";

export default function DigitalCardPage() {
    const [isDownloading, setIsDownloading] = useState(false);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [isSharing, setIsSharing] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    const handleDownloadCard = async () => {
        setIsDownloading(true);
        try {
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: [210, 297]
            });

            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();

            pdf.setFillColor(254, 247, 240);
            pdf.rect(0, 0, pageWidth, pageHeight, 'F');

            pdf.setFillColor(255, 255, 255);
            pdf.roundedRect(15, 20, pageWidth - 30, pageHeight - 40, 8, 8, 'F');

            pdf.setFontSize(24);
            pdf.setTextColor(139, 69, 19);
            pdf.text('Guide India Tours', pageWidth / 2, 40, { align: 'center' });

            pdf.setFontSize(11);
            pdf.setTextColor(31, 41, 55);
            pdf.text('Call: +91 9410000991', pageWidth / 2, 90, { align: 'center' });
            pdf.text('Email: info@guideindiatours.com', pageWidth / 2, 100, { align: 'center' });
            pdf.text('Visit: guideindiatours.com', pageWidth / 2, 110, { align: 'center' });

            pdf.save('GuideIndiaTours-DigitalCard.pdf');
        } catch (error) {
            console.error('Error generating PDF:', error);
        } finally {
            setIsDownloading(false);
        }
    };

    const handleShare = async () => {
        setIsSharing(true);
        try {
            if (navigator.share) {
                await navigator.share({
                    title: 'Guide India Tours - Digital Card',
                    text: 'Premium Golden Triangle Tours',
                    url: window.location.href
                });
            } else {
                await navigator.clipboard.writeText(window.location.href);
                alert('Copied to clipboard!');
            }
        } catch (error) {
            console.error('Error sharing:', error);
        } finally {
            setIsSharing(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pt-32 pb-20 px-4">
            <div className="max-w-3xl mx-auto">
                <motion.div
                    ref={cardRef}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden border border-gray-100"
                >
                    <div className="relative z-10 text-center">
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-maroon-700 rounded-2xl text-white font-bold text-3xl mb-6">
                            GIT
                        </div>
                        <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-2">Guide India Tours</h1>
                        <p className="text-maroon-700 font-medium mb-8">Golden Triangle Travel Experts</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center text-white">
                                    <Phone size={20} />
                                </div>
                                <div className="text-left">
                                    <div className="text-sm font-bold">+91 9410000991</div>
                                    <div className="text-xs text-gray-500">Call / WhatsApp</div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white">
                                    <Mail size={20} />
                                </div>
                                <div className="text-left">
                                    <div className="text-sm font-bold">info@guideindiatours.com</div>
                                    <div className="text-xs text-gray-500">Email us</div>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 bg-white border-2 border-dashed border-gray-200 rounded-2xl inline-block mb-10">
                            <QRCode value="https://guideindiatours.com" size={150} />
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={handleDownloadCard}
                                disabled={isDownloading}
                                className="flex-1 bg-maroon-600 text-white py-4 rounded-xl font-bold flex items-center justify-center space-x-2 shadow-lg"
                            >
                                <Download size={20} />
                                <span>{isDownloading ? "Generating..." : "Download Card"}</span>
                            </button>
                            <button
                                onClick={handleShare}
                                disabled={isSharing}
                                className="flex-1 bg-blue-600 text-white py-4 rounded-xl font-bold flex items-center justify-center space-x-2 shadow-lg"
                            >
                                <Share2 size={20} />
                                <span>Share Card</span>
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
            <FloatingContact />
        </div>
    );
}
