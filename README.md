git init
# VI&MO - Sťahovanie a Upratovanie (Next.js & Firebase)

Tento projekt je moderná webová aplikácia vytvorená pre firmu VI&MO, ktorá poskytuje sťahovacie a upratovacie služby. Aplikácia je postavená na platforme Next.js a využíva Firebase pre backendové služby, ako sú autentifikácia a databáza Firestore.

## Kľúčové technológie

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **UI knižnica**: [ShadCN UI](https://ui.shadcn.com/)
- **Štýlovanie**: [Tailwind CSS](https://tailwindcss.com/)
- **Backend & Databáza**: [Firebase](https://firebase.google.com/) (Authentication, Firestore)
- **Formuláre**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **Deployment**: Optimalizované pre Vercel alebo Firebase App Hosting

## Štruktúra projektu

- **`/src/app/(public)`**: Verejne dostupné stránky (Domov, Služby, Blog, Kontakt).
- **`/src/app/admin`**: Zabezpečená administrátorská sekcia pre správu obsahu (napr. blogových článkov).
- **`/src/components`**: Znovupoužiteľné React komponenty (napr. Header, Footer, GlassCard).
- **`/src/lib`**: Pomocné funkcie, konfiguračné súbory a definície typov (napr. pripojenie k Firebase, dáta pre služby).
- **`/src/firebase`**: Konfigurácia a provider pre Firebase služby.
- **`/firestore.rules`**: Bezpečnostné pravidlá pre databázu Firestore.
- **`/docs/backend.json`**: Definuje dátovú schému a štruktúru Firestore.

## Príprava a spustenie

### 1. Klonovanie repozitára

```bash
git clone <URL_repozitara>
cd <nazov_repozitara>
```

### 2. Inštalácia závislostí

Projekt používa `npm` ako správcu balíčkov.

```bash
npm install
```

### 3. Nastavenie premenných prostredia

Vytvorte súbor `.env.local` v koreňovom adresári projektu skopírovaním obsahu zo súboru `.env.example`.

```bash
cp .env.example .env.local
```

Následne vyplňte všetky požadované hodnoty v `.env.local`. Tieto údaje získate z vášho Firebase projektu a ďalších nastavení.

**Dôležité:** Súbor `.env.local` je v `.gitignore` a nikdy by nemal byť súčasťou Git repozitára.

### 4. Spustenie vývojového servera

Po nainštalovaní závislostí a nastavení premenných prostredia môžete spustiť lokálny vývojový server.

```bash
npm run dev
```

Aplikácia bude dostupná na adrese [http://localhost:3000](http://localhost:3000).

## Dostupné skripty

- **`npm run dev`**: Spustí aplikáciu vo vývojovom režime s hot-reloadingom.
- **`npm run build`**: Vytvorí optimalizovanú produkčnú verziu aplikácie.
- **`npm run start`**: Spustí produkčný server (vyžaduje predošlé spustenie `npm run build`).
- **`npm run lint`**: Spustí ESLint na kontrolu kvality kódu.

## Administrátorská sekcia

- **URL**: `/admin`
- **Prístup**: Prístup do administrátorskej sekcie je chránený heslom, ktoré je definované v premennej prostredia `NEXT_PUBLIC_ADMIN_PASSWORD`.
- **Funkcionalita**: Momentálne umožňuje vytvárať a upravovať blogové články, ktoré sú ukladané do Firestore databázy.
# bratislava-stahovanie.info-firebase
