import type { Metadata } from "next";
import "./globals.css";
import { LangProvider } from "@/lib/LangContext";

export const metadata: Metadata = {
  title: "Stålco — Professionella Verktyg & Maskiner",
  description: "Stålco levererar professionella verktyg och maskiner. Auktoriserad återförsäljare av DeWalt, Milwaukee, Makita och Bosch.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv">
      <body><LangProvider>{children}</LangProvider></body>
    </html>
  );
}
