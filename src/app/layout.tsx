import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Stålco — Professionella Verktyg & Maskiner",
  description: "Stålco levererar professionella verktyg, maskiner och industriutrustning. Auktoriserad återförsäljare av DeWalt, Milwaukee, Makita och Bosch.",
  keywords: ["verktyg", "maskiner", "industriverktyg", "DeWalt", "Milwaukee", "Makita", "Bosch"],
  openGraph: {
    title: "Stålco — Professionella Verktyg & Maskiner",
    description: "Proffsutrustning för proffs. Fri frakt, 30 dagars retur.",
    siteName: "Stålco",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv">
      <body>{children}</body>
    </html>
  );
}
