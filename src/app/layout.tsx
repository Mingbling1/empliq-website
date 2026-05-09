import type { Metadata } from "next";
import { Fraunces, Inter, Newsreader, JetBrains_Mono, Bricolage_Grotesque } from "next/font/google";
import { Toaster } from "sileo";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
  style: ["italic", "normal"],
});

const jetMono = JetBrains_Mono({
  variable: "--font-mono-jet",
  subsets: ["latin"],
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://empliq.io";

export const metadata: Metadata = {
  title: {
    default: "empliq — Cada empresa peruana tiene su versión oficial. Aquí guardamos la otra.",
    template: "%s · empliq",
  },
  description:
    "Red anónima de profesionales peruanos. Sueldos reales, reseñas honestas y la verdad sobre cómo se trabaja en cada empresa del Perú. 85,000 empresas indexadas. Tu identidad jamás expuesta.",
  applicationName: "empliq",
  keywords: [
    "salarios Perú",
    "sueldos empresas peruanas",
    "transparencia laboral Perú",
    "reseñas anónimas empresas",
    "cuánto pagan en BCP",
    "sueldos Interbank",
    "salarios Alicorp",
    "sueldos BBVA Perú",
    "sueldos Rappi Perú",
    "comparar salarios Lima",
    "transparencia salarial",
    "Glassdoor Perú",
  ],
  authors: [{ name: "empliq" }],
  creator: "empliq",

  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
    languages: { "es-PE": "/" },
  },

  openGraph: {
    type: "website",
    locale: "es_PE",
    url: SITE_URL,
    siteName: "empliq",
    title: "empliq — La otra versión de cada empresa peruana",
    description:
      "Red anónima de profesionales peruanos compartiendo sueldos reales y reseñas honestas. 85,000 empresas indexadas.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "empliq — Transparencia laboral para el Perú",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "empliq — La otra versión de cada empresa peruana",
    description:
      "Red anónima. Sueldos reales y reseñas honestas. 85,000 empresas peruanas indexadas.",
    images: ["/og-image.png"],
    creator: "@empliq",
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fontVars = `${fraunces.variable} ${inter.variable} ${newsreader.variable} ${jetMono.variable} ${bricolage.variable}`;
  return (
    <html lang="es-PE">
      <body className={`${fontVars} antialiased`}>
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
