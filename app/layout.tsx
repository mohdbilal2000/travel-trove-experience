import type { Metadata } from 'next'
import { Inter, Playfair_Display, Cormorant_Garamond } from 'next/font/google'
import './globals.css'
import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import ContactButton from "@/components/shared/ContactButton"
import FloatingContact from "@/components/shared/FloatingContact"
import { generateConnectedGraphSchema } from "@/lib/schemaGenerator"

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })
const cormorant = Cormorant_Garamond({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
    variable: '--font-cormorant'
})

export const metadata: Metadata = {
    title: 'Guide India Tours | Premium Golden Triangle Tours Delhi, Agra, Jaipur',
    description: 'Experience India\'s Golden Triangle with expert guides. Customized Delhi, Agra & Jaipur tours with luxury hotels, private transportation & 24/7 support. Book your dream India tour today!',
    keywords: 'Golden Triangle Tours, Delhi tours, Agra tours, Jaipur tours, Taj Mahal visit, India travel packages, luxury India tours, same day Agra tour, Jaipur sightseeing, Ranthambore tiger safari, Udaipur lake palace, Varanasi Ganges, Shimla hill station, honeymoon tours India, corporate tours India',
    metadataBase: new URL('https://guideindiatours.com'),
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://guideindiatours.com',
        siteName: 'Guide India Tours',
        images: [
            {
                url: '/images/og-default.jpg',
                width: 1200,
                height: 630,
                alt: 'Guide India Tours - Golden Triangle Travel Expert',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        site: '@guideindia',
        creator: '@guideindia',
        images: ['/images/og-default.jpg'],
    },
    verification: {},
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className={`${inter.variable} ${playfair.variable} ${cormorant.variable}`}>
            <head>
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(generateConnectedGraphSchema()) }}
                />
            </head>
            <body className="font-sans antialiased">
                <Navbar />
                {children}
                <Footer />
                <ContactButton />
                <FloatingContact />
                <Toaster />
                <Sonner />
            </body>
        </html>
    )
}
