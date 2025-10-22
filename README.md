
# VI&MO Blog Frontend (Next.js)

Toto je frontendová časť pre VI&MO Blog, postavená na Next.js, Tailwind CSS a Firebase. Aplikácia slúži na zobrazovanie obsahu (blogových príspevkov), ktorý je spravovaný cez administrátorský panel a ukladaný vo Firestore.

## Kľúčové vlastnosti

- **Server-Side Rendering (SSR) & Static Site Generation (SSG):** Rýchle načítanie a vynikajúce SEO vďaka Next.js App Router.
- **Responzívny dizajn:** Plne optimalizované pre desktopy, tablety aj mobilné zariadenia.
- **Dynamický blogový systém:** Články sú načítavané priamo z Firestore databázy.
- **Admin Panel:** Jednoduchá správa článkov cez zabezpečený admin panel.
- **Progresívna Webová Aplikácia (PWA):** Možnosť inštalácie a základná offline funkcionalita.
- **Interaktívne prvky:** Checklist pre sťahovanie, online kalkulačka, interaktívna mapa.

## Spustenie lokálne

1.  **Nainštalujte závislosti:**
    ```bash
    npm install
    ```

2.  **Nastavte environmentálne premenné:**
    Vytvorte súbor `.env.local` v koreňovom adresári a pridajte do neho potrebné premenné.
    ```env
    # Základná URL adresa pre lokálne prostredie (používa sa pre sitemapu a meta dáta)
    NEXT_PUBLIC_BASE_URL=http://localhost:3000

    # Heslo pre prístup do administrátorskej sekcie
    NEXT_PUBLIC_ADMIN_PASSWORD=vasetajneheslo
    ```

3.  **Spustite vývojový server:**
    ```bash
    npm run dev
    ```

    Aplikácia bude dostupná na adrese [http://localhost:3000](http://localhost:3000).

## Build a Nasadenie na Produkciu

1.  **Nastavte produkčné environment premenné:**
    Pred nasadením je **nevyhnutné** nastaviť environment premenné priamo v nastaveniach vášho hostingového providera (napr. Vercel, Netlify, Firebase Hosting).
    
    - `NEXT_PUBLIC_BASE_URL`: Nastavte na vašu finálnu produkčnú doménu (napr. `https://app.viandmo.com`).
    - `NEXT_PUBLIC_ADMIN_PASSWORD`: Nastavte na silné a unikátne heslo.

2.  **Vytvorenie produkčného buildu:**
    Najprv vyčistite staré buildy a potom vytvorte nový.
    ```bash
    npm run clean
    npm run build
    ```
    Tento príkaz skontroluje kód, vygeneruje statické súbory a pripraví aplikáciu na nasadenie.

3.  **Spustenie produkčnej verzie lokálne (na testovanie):**
    ```bash
    npm run start
    ```

4.  **Nasadenie (napr. na Vercel/Netlify):**
    - Pripojte tento Git repozitár k vášmu účtu na hostingovej platforme.
    - V nastaveniach projektu na danej platforme nastavte produkčné environmentálne premenné.
    - Platforma by mala automaticky detegovať Next.js projekt a postarať sa o build a nasadenie po každom `git push` do hlavnej vetvy.

