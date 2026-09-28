import type { Metadata } from "next";
import { Syne, Instrument_Serif, Plus_Jakarta_Sans, Space_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["700", "800"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "IEEE Computer Society MBITS — Systems, AI & Computing Architecture",
  description:
    "MBITS IEEE Computer Society Student Branch Chapter. Engineering production-grade machine intelligence, distributed systems, and open-source computing architecture.",
  icons: {
    icon: "/assets/logos/ieee-cs-dark.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${instrumentSerif.variable} ${plusJakarta.variable} ${spaceMono.variable} antialiased`}
    >
      <body className="bg-obsidian text-white font-sans selection:bg-lime selection:text-obsidian overflow-x-hidden min-h-screen">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
