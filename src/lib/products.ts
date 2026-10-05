// Unsplash-bilder (fungerande ID:n från gamla sajten). Byt mot riktiga produktbilder vid behov.
const IMG = {
  drill: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=640&q=75&fit=crop",
  impact: "https://images.unsplash.com/photo-1590635023142-73c3d34f2805?w=640&q=75&fit=crop",
  grinder: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=640&q=75&fit=crop",
  hammer: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=640&q=75&fit=crop",
  tools: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=640&q=75&fit=crop",
  sds: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=640&q=75&fit=crop",
};

export type Product = {
  id: number; name: string; cat: number; brand: string; spec: string;
  price: number; oldPrice: number; img: string; pos?: string; stock: boolean; hot: boolean;
};

// cat: 1 Elverktyg · 2 Handverktyg · 3 Maskiner · 4 Mätinstrument · 5 Skydd
export const products: Product[] = [
  { id: 1, name: "DeWalt DCD796 XR", cat: 1, brand: "DeWalt", spec: "18V · Borstlös · 70 Nm", price: 2490, oldPrice: 2990, img: IMG.drill, stock: true, hot: true },
  { id: 2, name: "Milwaukee M18 FMTIW2", cat: 1, brand: "Milwaukee", spec: "18V FUEL · 1000 Nm", price: 3890, oldPrice: 4490, img: IMG.impact, stock: true, hot: true },
  { id: 3, name: "Makita DGA504Z", cat: 1, brand: "Makita", spec: "18V · 125 mm · BL-motor", price: 1890, oldPrice: 2290, img: IMG.grinder, stock: true, hot: false },
  { id: 4, name: "Bahco 808050 P", cat: 2, brand: "Bahco", spec: "6 delar · ERGO · Härdad spets", price: 449, oldPrice: 599, img: IMG.tools, pos: "20% 50%", stock: true, hot: true },
  { id: 5, name: "Hultafors TROY", cat: 2, brand: "Hultafors", spec: "35 mm · Utbytbara slagytor", price: 529, oldPrice: 649, img: IMG.hammer, stock: true, hot: false },
  { id: 6, name: "Knipex StepCut", cat: 2, brand: "Knipex", spec: "260 mm · Höger · Rostfri", price: 639, oldPrice: 790, img: IMG.tools, pos: "80% 40%", stock: true, hot: false },
  { id: 7, name: "Bosch GBH 2-26 DFR", cat: 3, brand: "Bosch", spec: "230V · SDS-plus · 2,7 J", price: 2190, oldPrice: 2690, img: IMG.sds, stock: false, hot: false },
  { id: 8, name: "Makita HS7601J", cat: 3, brand: "Makita", spec: "1200W · 190 mm · MAKPAC", price: 1690, oldPrice: 1990, img: IMG.grinder, pos: "30% 70%", stock: true, hot: false },
  { id: 9, name: "Hilti TE 30-AVR", cat: 3, brand: "Hilti", spec: "230V · SDS-plus · 3,3 J · AVR", price: 5990, oldPrice: 6790, img: IMG.sds, pos: "70% 30%", stock: true, hot: true },
  { id: 10, name: "Stanley FatMax 5m", cat: 4, brand: "Stanley", spec: "5 m · Självlåsande · Magnetisk", price: 290, oldPrice: 390, img: IMG.tools, pos: "50% 20%", stock: true, hot: false },
  { id: 11, name: "Mitutoyo 500-196", cat: 4, brand: "Mitutoyo", spec: "150 mm · 0,01 mm · IP67", price: 1490, oldPrice: 1790, img: IMG.tools, pos: "40% 80%", stock: true, hot: true },
  { id: 12, name: "Stabila LAX 300 G", cat: 4, brand: "Stabila", spec: "Grön · 20 m · Självavvägande", price: 2390, oldPrice: 2890, img: IMG.tools, pos: "90% 90%", stock: true, hot: false },
  { id: 13, name: "3M Peltor X5A", cat: 5, brand: "3M", spec: "37 dB · Bygel · Komfort", price: 549, oldPrice: 690, img: IMG.tools, pos: "10% 10%", stock: true, hot: false },
  { id: 14, name: "Snickers 9320", cat: 5, brand: "Snickers", spec: "Skärskydd C · Touch · Stl 9", price: 259, oldPrice: 329, img: IMG.hammer, pos: "70% 60%", stock: true, hot: false },
  { id: 15, name: "Hultafors RX Klar", cat: 5, brand: "Hultafors", spec: "Anti-imma · UV400 · Klar", price: 189, oldPrice: 249, img: IMG.impact, pos: "20% 80%", stock: true, hot: true },
];

export const fmt = (n: number) => n.toLocaleString("sv-SE").replace(/ /g, " ") + " kr";
