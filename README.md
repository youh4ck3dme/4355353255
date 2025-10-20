# VI&MO Blog Frontend (Next.js)

Toto je frontendová časť pre VI&MO Blog, postavená na Next.js a Tailwind CSS. Aplikácia slúži na zobrazovanie obsahu (blogových príspevkov), ktorý je spravovaný cez samostatný backend postavený tiež na Next.js.

## Kľúčové vlastnosti

- **Server-Side Rendering (SSR):** Rýchle načítanie a vynikajúce SEO vďaka Next.js App Router.
- **Responzívny dizajn:** Plne optimalizované pre desktopy, tablety aj mobilné zariadenia.
- **Dynamické routovanie:** Stránky pre jednotlivé príspevky sú generované dynamicky.
- **Statický blog:** Články sú generované z `.mdx` súborov pre maximálny výkon.

## Spustenie lokálne

1.  **Nainštalujte závislosti:**
    ```bash
    npm install
    ```

2.  **Spustite vývojový server:**
    ```bash
    npm run dev
    ```

    Aplikácia bude dostupná na adrese [http://localhost:3000](http://localhost:3000).

## Nasadenie na Vercel

Táto aplikácia je pripravená na nasadenie na platformu **Vercel**.

1.  **Importujte projekt:** Vo vašom Vercel účte importujte tento Git repozitár.
2.  **Nastavte build príkaz:** Vercel by mal automaticky detegovať Next.js projekt. Uistite sa, že nastavenia sú správne.
3.  **Nastavte premenné prostredia:** V nastaveniach projektu na Verceli pridajte premennú prostredia `NEXT_PUBLIC_BASE_URL` s hodnotou vašej produkčnej domény (napr. `https://app.viandmo.com`).
4.  **Nasaďte:** Po kliknutí na "Deploy" sa Vercel postará o build a nasadenie.
