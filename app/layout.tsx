import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SkyGuide | Inteligencia para tus Viajes",
  description: "Consulta el clima en tiempo real, pronóstico por horas y consejos inteligentes sobre qué empacar para tu próximo destino.",
  keywords: ["clima", "viajes", "pronóstico", "nextjs", "react"],
  authors: [{ name: "Fiorella" }],
  openGraph: {
    title: "SkyGuide - Travel Intelligence",
    description: "No dejes que el clima te sorprenda. Planifica tu maleta con SkyGuide.",
    type: "website",
    images: ["./preview.png"], 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
