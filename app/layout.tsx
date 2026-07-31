import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const SITE_NAME = "Travokart";
const DEFAULT_TITLE = "Travokart | Explore Exclusive Tour Packages";
const DEFAULT_DESC =
  "Travokart is a travel marketplace linking travellers with handpicked domestic and international tour packages — comfortable, affordable and unforgettable. Best travel agency in Panchkula, Tricity & North India.";
const OG_IMAGE = "/media/2025/12/bora-bora-pics.jpg";

export const metadata: Metadata = {
  metadataBase: new URL("https://travokart.com"),
  title: {
    default: DEFAULT_TITLE,
    template: "%s | Travokart",
  },
  description: DEFAULT_DESC,
  applicationName: SITE_NAME,
  keywords: [
    "Travokart", "tour packages", "travel agency Panchkula", "holiday packages",
    "domestic tour packages", "international tour packages", "Himachal packages",
    "Bali packages", "Dubai packages", "Maldives packages", "Thailand packages",
    "honeymoon packages", "best travel agency Tricity", "book tours online",
  ],
  authors: [{ name: "Explore Travokart Vocations LLP" }],
  creator: "Explore Travokart Vocations LLP",
  publisher: "Explore Travokart Vocations LLP",
  alternates: { canonical: "/" },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESC,
    url: "/",
    locale: "en_IN",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Travokart — Explore Exclusive Tour Packages" }],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESC,
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  other: {
    "codex-preview": "development",
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: "Explore Travokart Vocations LLP",
  alternateName: "Travokart",
  url: "https://travokart.com",
  logo: "https://travokart.com/brand/logo.png",
  image: "https://travokart.com" + OG_IMAGE,
  description: DEFAULT_DESC,
  telephone: "+91-98728-89763",
  email: "info@travokart.com",
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: "#1, Level-2, SCO-215, Sector-14",
    addressLocality: "Panchkula",
    addressRegion: "Haryana",
    postalCode: "134113",
    addressCountry: "IN",
  },
  areaServed: ["India", "Tricity", "North India"],
  aggregateRating: { "@type": "AggregateRating", ratingValue: "5.0", reviewCount: "17" },
  sameAs: [
    "https://facebook.com/",
    "https://instagram.com/",
    "https://youtube.com/",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${jakarta.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
