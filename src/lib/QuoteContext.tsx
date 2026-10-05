"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type Items = Record<number, number>;
type Ctx = {
  items: Items; open: boolean; setOpen: (o: boolean) => void;
  add: (id: number) => void; setQty: (id: number, q: number) => void; clear: () => void;
  count: number; prefill: string; setPrefill: (s: string) => void;
};
const QuoteContext = createContext<Ctx | null>(null);

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Items>({});
  const [open, setOpen] = useState(false);
  const [prefill, setPrefill] = useState("");
  const add = (id: number) => setItems((s) => ({ ...s, [id]: (s[id] ?? 0) + 1 }));
  const setQty = (id: number, q: number) =>
    setItems((s) => {
      const n = { ...s };
      if (q <= 0) delete n[id]; else n[id] = q;
      return n;
    });
  const count = Object.values(items).reduce((a, b) => a + b, 0);
  return (
    <QuoteContext.Provider value={{ items, open, setOpen, add, setQty, clear: () => setItems({}), count, prefill, setPrefill }}>
      {children}
    </QuoteContext.Provider>
  );
}

export function useQuote() {
  const c = useContext(QuoteContext);
  if (!c) throw new Error("useQuote utanför QuoteProvider");
  return c;
}
