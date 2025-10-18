# VI&MO Blog Frontend (Next.js)

Toto je frontendová časť pre VI&MO Blog, postavená na Next.js a TailWind CSS. Aplikácia slúži na zobrazovanie obsahu (blogových príspevkov), ktorý je spravovaný cez samostatný [WOOPANEL backend](https://github.com/woopanel/dashboard).

## Kľúčové vlastnosti

- **Server-Side Rendering (SSR):** Rýchle načítanie a vynikajúce SEO vďaka Next.js.
- **Responzívny dizajn:** Plne optimalizované pre desktopy, tablety aj mobilné zariadenia.
- **Dynamické routovanie:** Stránky pre jednotlivé príspevky sú generované dynamicky.
- **Prepojenie na Headless CMS:** Dáta sú načítavané cez REST API z WOOPANEL backendu.

## Spustenie lokálne

1.  **Nainštalujte závislosti:**
    ```bash
    npm install
    ```

2.  **Vytvorte `.env.development.local` súbor:**
    Do koreňového adresára projektu pridajte súbor `.env.development.local` a nastavte URL vášho lokálne bežiaceho backendu:
    ```
    NEXT_PUBLIC_API_URL=http://localhost:9002/api
    ```

3.  **Spustite vývojový server:**
    ```bash
    npm run dev
    ```

    Aplikácia bude dostupná na adrese [http://localhost:3000](http://localhost:3000).

## Nasadenie

Táto aplikácia je pripravená na nasadenie na platformu **Vercel**.

1.  **Importujte projekt:** Vo vašom Vercel účte importujte tento Git repozitár.
2.  **Nastavte premenné prostredia:** V nastaveniach projektu na Verceli pridajte premennú prostredia `NEXT_PUBLIC_API_URL` a nastavte ju na **verejnú URL adresu** vášho nasadeného WOOPANEL backendu.
3.  **Nasaďte:** Vercel automaticky deteguje, že ide o Next.js projekt a postará sa o build a nasadenie.
