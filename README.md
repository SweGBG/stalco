# Stålco — v2 "Smedja & ritning"

Next.js 16 + React 19. Ren CSS, inga animationsbibliotek, ingen Tailwind.

```bash
npm install
npm run dev
```

- Innehåll/översättningar: `src/lib/i18n.ts` (SV + EN)
- Produkter: `src/lib/products.ts`
- Emblemet (kugghjul + hammare) är SVG: `src/components/Emblem.tsx`
- Kontaktformuläret är demo (visar bara "skickat"). Koppla till Resend via en `/api`-route vid behov.
