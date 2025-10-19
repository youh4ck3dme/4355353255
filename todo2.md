# 5 Zadaní (Promptov) na Vylepšenie Projektu na 110%

Tu je 5 podrobných zadaní, ktoré posunú projekt na profesionálnu úroveň. Každé zadanie sa zameriava na inú kľúčovú oblasť.

---

### Prompt 1: Pokročilá SEO Optimalizácia (Sitemap, Robots.txt, JSON-LD)

**Cieľ:** Maximalizovať viditeľnosť webu pre vyhľadávače ako Google a zlepšiť technické SEO.

**Zadanie:**
"Vykonaj komplexnú SEO optimalizáciu. Chcem, aby si:
1.  Vytvoril dynamicky generovaný súbor `sitemap.xml`, ktorý bude obsahovať všetky kľúčové podstránky: domovskú stránku, o nás, cenník, zoznam článkov a všetky publikované články z API. Súbor musí byť dostupný na adrese `/sitemap.xml`.
2.  Pridal súbor `robots.txt`, ktorý povolí indexovanie celej stránky a odkáže na novovytvorenú sitemapu.
3.  Rozšíril existujúce štruktúrované dáta (JSON-LD) o ďalšie typy pre lepšiu sémantiku:
    *   Na hlavnej stránke (`/`) pridaj JSON-LD pre `Organization` a `WebSite` (s možnosťou vyhľadávania na stránke).
    *   Na stránke 'O nás' (`/o-nas`) pridaj JSON-LD typu `LocalBusiness`, ktoré bude obsahovať kontaktné údaje, adresu a typy ponúkaných služieb (`serviceType`).
    *   Na stránke 'Cenník' (`/cennik`) pridaj JSON-LD typu `OfferCatalog`, kde zmapuješ jednotlivé položky z cenníka ako ponuky."

---

### Prompt 2: Vylepšenie Interaktivity a Spätná Väzba Kontaktného Formulára

**Cieľ:** Zlepšiť používateľský zážitok (UX) pri interakcii s formulármi a poskytnúť okamžitú a jasnú spätnú väzbu.

**Zadanie:**
"Vylepši existujúci kontaktný formulár v komponente `ContactForm.tsx`. Chcem, aby si:
1.  Nahradil simuláciu odosielania skutočnou backendovou logikou pomocou **Firebase Functions a Firestore**.
    *   Po odoslaní formulára sa dáta bezpečne uložia do kolekcie `contact_submissions` vo Firestore.
    *   Použi na to Firebase a vytvor serverless funkciu, ktorá bude dáta prijímať a ukladať.
2.  Implementoval pokročilú validáciu na strane klienta pomocou knižnice `zod` predtým, ako sa formulár odošle. Validuj, či je email v správnom formáte a telefónne číslo obsahuje aspoň 9 číslic. Chybové hlášky zobraz priamo pod príslušnými poliami.
3.  Nahradil jednoduchú textovú správu o stave odoslania za elegantné notifikácie (toasty) pomocou komponentov zo `shadcn/ui`. Použi zelený toast pre úspech a červený pre chybu.
4.  Zabezpečil, že tlačidlo 'Odoslať' bude počas odosielania neaktívne a zobrazí sa pri ňom ikona načítavania."

---

### Prompt 3: Implementácia AI Asistenta pre Cenovú Ponuku

**Cieľ:** Pridať inovatívnu a pútavú funkciu, ktorá odlíši stránku od konkurencie.

**Zadanie:**
"Integruj do stránky 'Cenník' (`/cennik`) AI asistenta, ktorý pomôže používateľom odhadnúť cenu sťahovania na základe textového popisu. Chcem, aby si:
1.  Vytvoril nový komponent `AICalculator.tsx`, ktorý bude obsahovať textové pole (`<textarea>`), kde používateľ môže voľne opísať, čo potrebuje presťahovať (napr. 'Potrebujem presťahovať 2-izbový byt z Petržalky do Ružinova, mám veľa kníh a jednu ťažkú práčku. Bez klavíra.').
2.  Použil **Genkit a Google AI (Gemini)** na analýzu textového vstupu. Vytvor Genkit flow s názvom `estimateMovingCostsFlow`, ktorý z textu extrahuje kľúčové parametre: typ bytu, odhadovaný počet pracovníkov, odhadovaný čas a či je sťahovanie v rámci Bratislavy.
3.  Výstup z AI modelu následne použi na automatické predvyplnenie a nastavenie existujúcej 'Online Kalkulačky Ceny' (`PriceCalculator.tsx`).
4.  Pridaj plynulú animáciu, ktorá po zadaní textu a kliknutí na tlačidlo 'Analyzovať AI' automaticky 'posunie' hodnoty na posuvníkoch v kalkulačke na odhadnuté hodnoty."

---

### Prompt 4: Redizajn Blogu s Kategóriami a Filtrovaním

**Cieľ:** Zlepšiť navigáciu a organizáciu obsahu na blogu, aby používatelia ľahšie našli relevantné informácie.

**Zadanie:**
"Prepracuj sekciu blogu a pridaj funkcionalitu kategórií a tagov. Chcem, aby si:
1.  Upravil `BlogList.tsx` a stránku `/blog` tak, aby zobrazovali zoznam dostupných kategórií (napr. 'Tipy na sťahovanie', 'Upratovanie', 'Novinky'). Tieto kategórie môžeš zatiaľ definovať staticky.
2.  Po kliknutí na kategóriu sa zoznam článkov vyfiltruje a zobrazí iba tie, ktoré patria do danej kategórie. (Predpokladajme, že `post` objekt z API bude obsahovať pole `tags` alebo `category`).
3.  Pod každý článok (v `BlogCard.tsx` a na detaile článku) pridaj zobrazenie jeho tagov/kategórií. Každý tag bude klikateľný a presmeruje na zoznam článkov s daným tagom.
4.  Pridaj vizuálne oddelenie pre 'Najnovší článok' a 'Ostatné články' na hlavnej stránke blogu, aby bol najnovší obsah viac v popredí."

---

### Prompt 5: Optimalizácia Výkonu a Obrázkov

**Cieľ:** Zabezpečiť maximálnu rýchlosť načítania stránky a optimalizovať obrázky pre lepší používateľský zážitok a SEO.

**Zadanie:**
"Vykonaj hĺbkovú optimalizáciu výkonu a obrázkov. Chcem, aby si:
1.  Analyzoval všetky obrázky v projekte a zabezpečil, že používajú komponent `next/image` so správne nastavenými atribútmi `priority`, `sizes` a `quality`.
2.  Pre všetky placeholder obrázky z `picsum.photos` pridaj `data-ai-hint` atribút s relevantnými kľúčovými slovami. Zároveň vytvor centrálny súbor `src/lib/placeholder-images.json`, kde budú všetky placeholder obrázky definované a odtiaľ importované do komponentov. Týmto centralizujeme správu placeholderov.
3.  Implementoval 'lazy loading' (lenivé načítavanie) pre komponenty a sekcie, ktoré nie sú okamžite viditeľné na obrazovke pri prvom načítaní (napr. sekcia CTA, pätička). Použi na to dynamický import z Next.js (`next/dynamic`).
4.  Preskúmal veľkosť výsledných JavaScript balíčkov a navrhol optimalizácie. Napríklad, ak sa nejaká ťažká knižnica používa len na jednej stránke, zabezpeč, aby sa nenačítavala na ostatných."
