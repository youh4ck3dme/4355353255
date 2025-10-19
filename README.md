# VI&MO Blog Frontend (Next.js)

Toto je frontendová časť pre VI&MO Blog, postavená na Next.js a Tailwind CSS. Aplikácia slúži na zobrazovanie obsahu (blogových príspevkov), ktorý je spravovaný cez samostatný backend postavený tiež na Next.js.

## Kľúčové vlastnosti

- **Server-Side Rendering (SSR):** Rýchle načítanie a vynikajúce SEO vďaka Next.js App Router.
- **Responzívny dizajn:** Plne optimalizované pre desktopy, tablety aj mobilné zariadenia.
- **Dynamické routovanie:** Stránky pre jednotlivé príspevky sú generované dynamicky.
- **Prepojenie na Headless CMS:** Dáta sú načítavané cez REST API z backendu.

## Spustenie lokálne

1.  **Nainštalujte závislosti:**
    ```bash
    npm install
    ```

2.  **Vytvorte `.env.local` súbor:**
    Do koreňového adresára projektu pridajte súbor `.env.local` a nastavte URL vášho lokálne bežiaceho backendu:
    ```
    NEXT_PUBLIC_API_URL=http://localhost:3002/api
    ```
    *Poznámka: Backend musí bežať, aby frontend mohol načítať dáta.*

3.  **Spustite vývojový server:**
    ```bash
    npm run dev
    ```

    Aplikácia bude dostupná na adrese [http://localhost:3000](http://localhost:3000).

## Nasadenie

Táto aplikácia je pripravená na nasadenie na platformu **Vercel**.

1.  **Importujte projekt:** Vo vašom Vercel účte importujte tento Git repozitár.
2.  **Nastavte premenné prostredia:** V nastaveniach projektu na Verceli pridajte premennú prostredia `NEXT_PUBLIC_API_URL` a nastavte ju na **verejnú URL adresu** vášho nasadeného backendu.
3.  **Nasaďte:** Vercel automaticky deteguje, že ide o Next.js projekt a postará sa o build a nasadenie.
4.  **Konfigurácia domén pre obrázky:** Ak váš backend servuje obrázky z vlastnej domény, nezabudnite túto doménu pridať do súboru `next.config.ts` v sekcii `images.remotePatterns`.
