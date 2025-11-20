The above error occurred in the <NotFoundErrorBoundary> component:


    at InnerLayoutRouter (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/layout-router.js:243:11)

    at RedirectErrorBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/redirect-boundary.js:74:9)

    at RedirectBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/redirect-boundary.js:82:11)

    at NotFoundErrorBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/not-found-boundary.js:76:9)

    at NotFoundBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/not-found-boundary.js:84:11)

    at LoadingBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/layout-router.js:348:11)

    at ErrorBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/error-boundary.js:160:11)

    at InnerScrollAndFocusHandler (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/layout-router.js:153:9)

    at ScrollAndFocusHandler (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/layout-router.js:228:11)

    at RenderFromTemplateContext (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/render-from-template-context.js:16:44)

    at OuterLayoutRouter (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/layout-router.js:369:11)

    at main

    at div

    at FirebaseProvider (webpack-internal:///(app-pages-browser)/./src/firebase/provider.tsx:62:11)

    at PublicLayout (Server)

    at InnerLayoutRouter (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/layout-router.js:243:11)

    at RedirectErrorBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/redirect-boundary.js:74:9)

    at RedirectBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/redirect-boundary.js:82:11)

    at NotFoundErrorBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/not-found-boundary.js:76:9)

    at NotFoundBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/not-found-boundary.js:84:11)

    at LoadingBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/layout-router.js:348:11)

    at ErrorBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/error-boundary.js:160:11)

    at InnerScrollAndFocusHandler (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/layout-router.js:153:9)

    at ScrollAndFocusHandler (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/layout-router.js:228:11)

    at RenderFromTemplateContext (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/render-from-template-context.js:16:44)

    at OuterLayoutRouter (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/layout-router.js:369:11)

    at O (webpack-internal:///(app-pages-browser)/./node_modules/next-themes/dist/index.mjs:28:24)

    at z (webpack-internal:///(app-pages-browser)/./node_modules/next-themes/dist/index.mjs:21:47)

    at Providers (webpack-internal:///(app-pages-browser)/./src/components/Providers.tsx:10:11)

    at body

    at html

    at RootLayout (Server)

    at RedirectErrorBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/redirect-boundary.js:74:9)

    at RedirectBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/redirect-boundary.js:82:11)

    at NotFoundErrorBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/not-found-boundary.js:76:9)

    at NotFoundBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/not-found-boundary.js:84:11)

    at DevRootNotFoundBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/dev-root-not-found-boundary.js:33:11)

    at ReactDevOverlay (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/react-dev-overlay/app/ReactDevOverlay.js:87:9)

    at HotReload (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/react-dev-overlay/app/hot-reloader-client.js:321:11)

    at Router (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/app-router.js:207:11)

    at ErrorBoundaryHandler (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/error-boundary.js:113:9)

    at ErrorBoundary (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/error-boundary.js:160:11)

    at AppRouter (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/app-router.js:577:13)

    at ServerRoot (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/app-index.js:112:27)

    at Root (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/app-index.js:117:11)


React will try to recreate this component tree from scratch using the error boundary you provided, ReactDevOverlay.

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
