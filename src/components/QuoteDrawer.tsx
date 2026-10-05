"use client";
import { useEffect } from "react";
import { useLang } from "@/lib/LangContext";
import { useQuote } from "@/lib/QuoteContext";
import { products, fmt } from "@/lib/products";

// B2B-offertlista: samla produkter, skicka som förifyllt meddelande till kontaktformuläret.
export default function QuoteDrawer() {
  const { tr } = useLang();
  const q = tr.quote;
  const { items, open, setOpen, setQty, clear, count, setPrefill } = useQuote();

  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open, setOpen]);

  const rows = Object.entries(items).map(([id, qty]) => ({ p: products.find((x) => x.id === Number(id))!, qty }));
  const total = rows.reduce((s, r) => s + r.p.price * r.qty, 0);

  const send = () => {
    const lines = rows.map((r) => `• ${r.qty} × ${r.p.name} (${r.p.brand})`).join("\n");
    setPrefill(`${q.msgIntro}\n${lines}`);
    setOpen(false);
    setTimeout(() => document.getElementById("kontakt")?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  return (
    <>
      <button className={`quote-fab ${count > 0 ? "show" : ""}`} onClick={() => setOpen(true)} aria-label={`${tr.nav.quote} (${count})`}>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h7l5 5v13H7z" /><path d="M14 3v5h5M10 13h6M10 17h6" /></svg>
        <b key={count}>{count}</b>
      </button>

      <div className={`drawer-scrim ${open ? "open" : ""}`} onClick={() => setOpen(false)} />
      <aside className={`drawer ${open ? "open" : ""}`} aria-hidden={!open} aria-label={q.title}>
        <header>
          <h3>{q.title}</h3>
          <button className="x" onClick={() => setOpen(false)} aria-label={tr.nav.close} tabIndex={open ? 0 : -1}>
            <svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18" /></svg>
          </button>
        </header>

        {rows.length === 0 ? (
          <p className="drawer-empty">{q.empty}</p>
        ) : (
          <ul className="drawer-list">
            {rows.map(({ p, qty }) => (
              <li key={p.id}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.img} alt="" style={{ objectPosition: p.pos ?? "center" }} />
                <div>
                  <small>{p.brand}</small>
                  <strong>{p.name}</strong>
                  <span>{fmt(p.price)}</span>
                </div>
                <div className="qty">
                  <button onClick={() => setQty(p.id, qty - 1)} aria-label="−" tabIndex={open ? 0 : -1}>−</button>
                  <output>{qty}</output>
                  <button onClick={() => setQty(p.id, qty + 1)} aria-label="+" tabIndex={open ? 0 : -1}>+</button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <footer>
          <div className="drawer-total">
            <span>{q.total}</span>
            <strong>{fmt(total)}</strong>
          </div>
          <p className="drawer-vat">{q.vat} {fmt(Math.round(total * 0.2))}</p>
          <p className="drawer-note">{q.note}</p>
          <div className="drawer-btns">
            <button className="btn btn-hot" onClick={send} disabled={rows.length === 0} tabIndex={open ? 0 : -1}>{q.send}</button>
            <button className="btn btn-ghost" onClick={clear} disabled={rows.length === 0} tabIndex={open ? 0 : -1}>{q.clear}</button>
          </div>
        </footer>
      </aside>
    </>
  );
}
