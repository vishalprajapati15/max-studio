import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import UniversalBackground from "@/components/background/UniversalBackground";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://YOUR-DOMAIN.com"),

  title: {
    default: "MAX Studio | Professional Photography Studio in Delhi",
    template: "%s | MAX Studio Delhi",
  },

  description:
    "MAX Studio is a professional photography studio in Delhi offering portrait photography, passport photos, pre-wedding photography, product photography and professional photo services.",

  keywords: [
    "photo studio in Delhi",
    "photography studio in Delhi",
    "professional photographer Delhi",
    "portrait photography Delhi",
    "passport photo studio Delhi",
    "pre wedding photography Delhi",
    "product photography Delhi",
    "professional photo studio Delhi",
  ],

  authors: [{ name: "MAX Studio" }],
  creator: "MAX Studio",

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://YOUR-DOMAIN.com",
    siteName: "MAX Studio",
    title: "MAX Studio | Professional Photography Studio in Delhi",
    description:
      "Professional photography and photo studio services in Delhi.",
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <UniversalBackground>
          <Navbar />
          {children}
          <Footer />
        </UniversalBackground>
      </body>
    </html>
  );
}
