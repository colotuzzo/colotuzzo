import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Colotuzzo — A family name from Veneto, Italy",
  description:
    "A small digital home for people who carry the surname Colotuzzo, for relatives, and for those who share a bond with its roots.",
  openGraph: {
    title: "Colotuzzo",
    description: "A small digital home for Colotuzzos around the world.",
    siteName: "colotuzzo.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
