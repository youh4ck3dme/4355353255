# VI&MO Blog Frontend (Next.js)

Toto je frontendová časť pre VI&MO Blog, postavená na Next.js a Tailwind CSS. Aplikácia slúži na zobrazovanie obsahu (blogových príspevkov), ktorý je spravovaný cez samostatný backend postavený tiež na Next.js.

## Kľúčové vlastnosti

- **Server-Side Rendering (SSR):** Rýchle načítanie a vynikajúce SEO vďaka Next.js App Router.
- **Responzívny dizajn:** Plne optimalizované pre desktopy, tablety aj mobilné zariadenia.
- **Dynamické routovanie:** Stránky pre jednotlivé príspevky sú generované dynamicky.
- **Statický blog:** Články sú generované z `.mdx` súborov pre maximálny výkon.
- **Progresívna Webová Aplikácia (PWA):** Možnosť inštalácie a základná offline funkcionalita.

## Environmentálne Premenné

Pred nasadením aplikácie je potrebné vytvoriť súbor `.env.local` v koreňovom adresári projektu a nastaviť nasledujúce premenné:

```
# Základná URL adresa pre produkčné nasadenie (používa sa pre sitemapu a meta dáta)
NEXT_PUBLIC_BASE_URL=https://your-production-url.com

# Heslo pre prístup do administrátorskej sekcie
ADMIN_PASSWORD=your_secret_password
```

## Spustenie lokálne

1.  **Nainštalujte závislosti:**
    ```bash
    npm install
    ```

2.  **Nastavte environmentálne premenné:**
    Vytvorte súbor `.env.local` a pridajte do neho potrebné premenné (viď sekcia vyššie).

3.  **Spustite vývojový server:**
    ```bash
    npm run dev
    ```

    Aplikácia bude dostupná na adrese [http://localhost:3000](http://localhost:3000).

## Build a Nasadenie

1.  **Vytvorenie produkčného buildu:**
    ```bash
    npm run build
    ```
    Tento príkaz skontroluje kód, vygeneruje statické súbory a pripraví aplikáciu na nasadenie.

2.  **Spustenie produkčnej verzie lokálne:**
    ```bash
    npm run start
    ```

3.  **Nasadenie na Vercel/Netlify:**
    Táto aplikácia je pripravená na nasadenie na platformy ako **Vercel** alebo **Netlify**.
    - Importujte tento Git repozitár do vášho účtu.
    - Nastavte environmentálne premenné v nastaveniach projektu na danej platforme.
    - Platforma by mala automaticky detegovať Next.js projekt a postarať sa o build a nasadenie.
