import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Syne, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "YASH.EXE — Happy Birthday Yash Manghnani",
  description:
    "A Celebration of Code, Creativity & Leadership. An interactive digital birthday experience for Yash Manghnani, Flutter Developer & Technology Leader.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${plusJakarta.variable} ${jetbrainsMono.variable} dark scroll-smooth`}
    >
      <body className="min-h-screen overflow-x-hidden bg-[#080711] font-sans text-white antialiased selection:bg-[#A855F7]/40 selection:text-[#22D3EE]">
        {children}
      </body>
    </html>
  );
}
