# VI&MO - Sťahovací a upratovací servis (Next.js & Firebase)

Toto je frontendová aplikácia pre VI&MO, postavená na Next.js (App Router), Tailwind CSS a Firebase. Aplikácia slúži ako hlavná webová prezentácia firmy, vrátane dynamického blogu, cenníka, a interaktívneho checklistu, ktorých dáta sú spravované cez Firebase Firestore.

## Kľúčové vlastnosti

- **Moderný Tech Stack:** Next.js 14 (App Router), React, TypeScript, Tailwind CSS.
- **Dynamický Backend:** Blogové príspevky, checklist a kontaktné formuláre sú plne napojené na Firebase (Firestore a Authentication).
- **Responzívny Dizajn:** Plne optimalizované pre desktopy, tablety aj mobilné zariadenia.
- **Admin Panel:** Jednoduchá správa článkov cez zabezpečenú administrátorskú sekciu (`/admin`).
- **Progresívna Webová Aplikácia (PWA):** Možnosť inštalácie na domovskú obrazovku a offline prístup.
- **SEO Optimalizácia:** Dynamicky generované metadáta, sitemaps a JSON-LD štruktúrované dáta pre lepšiu viditeľnosť vo vyhľadávačoch.
- **Interaktívne Prvky:** Online kalkulačka, sťahovací checklist s ukladaním postupu, interaktívna mapa pôsobnosti.

## Spustenie lokálne

1.  **Nainštalujte závislosti:**
    ```bash
    npm install
    ```

2.  **Nastavte environmentálne premenné:**
    Vytvorte súbor `.env.local` v koreňovom adresári a vložte doň heslo pre prístup do admin sekcie.
    ```env
    # Heslo pre prístup do administrátorskej sekcie
    NEXT_PUBLIC_ADMIN_PASSWORD="sem_vlozte_bezpecne_heslo"
    ```

3.  **Spustite vývojový server:**
    ```bash
    npm run dev
    ```

    Aplikácia bude dostupná na adrese [http://localhost:3000](http://localhost:3000).

## Štruktúra Projektu

- **`src/app`**: Hlavná adresárová štruktúra Next.js 14 s App Routerom.
  - **`(public)`**: Verejne dostupné stránky (Domov, Blog, Cenník, atď.).
  - **`admin`**: Zabezpečená administrátorská sekcia.
  - **`api`**: Serverless funkcie pre komunikáciu s backendom (napr. ukladanie článkov).
- **`src/components`**: Znovupoužiteľné React komponenty.
- **`src/firebase`**: Konfigurácia, inicializácia a custom hooky pre Firebase.
- **`src/lib`**: Pomocné funkcie, typové definície a statické dáta.
- **`public`**: Statické súbory (obrázky, ikony).
- **`firestore.rules`**: Bezpečnostné pravidlá pre databázu Firestore.
