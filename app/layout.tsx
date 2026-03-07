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

  metadataBase: new URL('https://climate-intelligence.vercel.app/'),

  title: "Climate Intelligence | Intelligence for your travels",
  description: "Check real-time weather, hourly forecasts, and smart tips on what to pack for your next destination.",
  keywords: ["weather", "travel", "forecast", "nextjs", "react"],
  authors: [{ name: "Fiorella Rios Campos" }],
  openGraph: {
    title: "Climate Intelligence",
    description: "Don't let the weather catch you off guard. Plan your trip with SkyGuide.",
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
