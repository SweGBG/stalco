import type { Metadata, Viewport } from "next";
import "@fontsource-variable/archivo/wdth.css";
import "@fontsource-variable/manrope";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "./globals.css";
import { LangProvider } from "@/lib/LangContext";
import { QuoteProvider } from "@/lib/QuoteContext";

export const metadata: Metadata = {
  title: "Stålco — Professionella verktyg & maskiner",
  description: "Stålco levererar professionella verktyg och maskiner. Auktoriserad återförsäljare av DeWalt, Milwaukee, Makita, Bosch och Hilti.",
};

export const viewport: Viewport = { themeColor: "#0b1119" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv">
      <body>
        <LangProvider>
          <QuoteProvider>{children}</QuoteProvider>
        </LangProvider>
      </body>
    </html>
  );
}
