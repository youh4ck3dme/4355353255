# 10 Vylepšení pre Aplikáciu VI&MO (+ Prompty)

Tu je 10 konkrétnych a detailných zadaní (promptov), ktoré posunú vašu aplikáciu na ďalšiu úroveň. Každý prompt je navrhnutý tak, aby ho bolo možné priamo zadať AI asistentovi na implementáciu.

---

### 1. Interaktívny Sťahovací Checklist
**Vylepšenie:** Premeniť statický checklist na plne interaktívnu a personalizovanú pomôcku, ktorá si pamätá stav pre každého používateľa.

**PROMPT #1:**
"Vylepši existujúcu stránku `/checklist`. Chcem, aby si:
1. Prepojil checklist s Firebase. Keď používateľ zaškrtne položku, jej stav sa uloží do Firestore databázy pod jeho unikátnym (anonymným) `userId`.
2. Zabezpeč, aby si aplikácia pamätala stav zaškrtnutých políčok aj po opätovnom načítaní stránky alebo na inom zariadení (po prihlásení).
3. Pridaj vizuálny ukazovateľ progresu (progress bar), ktorý bude v reálnom čase ukazovať, koľko percent úloh je už splnených pre každú kategóriu.
4. Pod každú kategóriu checklistu pridaj tlačidlo 'Resetovať', ktoré odznačí všetky položky v danej kategórii."

---

### 2. Pokročilá Kalkulačka Ceny s Odoslaním Dopytu
**Vylepšenie:** Spraviť z kalkulačky nástroj na generovanie dopytov – používateľ si nielen vypočíta cenu, ale jedným klikom odošle dopyt s predvyplnenými údajmi.

**PROMPT #2:**
"Vylepši 'Online Kalkulačku Ceny' na stránke `/cennik`. Chcem, aby si:
1. Pridal nové vstupné polia: 'Poschodie (odkiaľ)', 'Poschodie (kam)', a prepínače 'Výťah k dispozícii (áno/nie)'.
2. Upravil algoritmus výpočtu ceny tak, aby zohľadňoval tieto nové parametre (napr. prirážka za každé poschodie bez výťahu).
3. Pod výslednú cenu pridal tlačidlo 'Odoslať nezáväzný dopyt'.
4. Po kliknutí na toto tlačidlo sa používateľ presmeruje na kontaktný formulár, kde budú údaje z kalkulačky (počet pracovníkov, hodiny, vzdialenosť, poschodia) automaticky predvyplnené v textovom poli správy."

---

### 3. Správa Blogu cez Admin Panel
**Vylepšenie:** Umožniť jednoduchú správu (vytváranie a editáciu) blogových článkov priamo z webovej administrácie bez nutnosti zasahovať do kódu.

**PROMPT #3:**
"Vylepši existujúci admin panel na `/admin/blog`. Chcem, aby si:
1. Na stránke `/admin/blog/new` a `/admin/blog/edit/[slug]` implementoval logiku pre skutočné ukladanie a aktualizáciu `.mdx` súborov na serveri pomocou serverless funkcie (napr. cez API route v Next.js).
2. Po úspešnom uložení alebo aktualizácii článku zabezpeč, aby sa zoznam článkov na stránke `/admin/blog` automaticky obnovil bez nutnosti manuálneho refreshu stránky.
3. Pridaj do formulára pre editáciu možnosť zmeniť 'status' článku z 'draft' na 'published' a naopak. Publikované články budú viditeľné pre verejnosť, koncepty len v admin paneli."

---

### 4. Interaktívna Mapa Lokalít
**Vylepšenie:** Premeniť statický zoznam lokalít na vizuálne pútavú a interaktívnu mapu.

**PROMPT_4:**
"Vytvor novú stránku `/lokality` a na nej komponent `InteractiveMap.tsx`. Chcem, aby si:
1. Zobrazil SVG mapu Bratislavy a okolia.
2. Na mape vyznačil všetky lokality, v ktorých VI&MO pôsobí (napr. Petržalka, Ružinov, Senec). Údaje o lokalitách a ich SVG koordinátoch si zober z `src/lib/locations.ts`.
3. Pri prejdení myšou (hover) ponad bod na mape sa zobrazí názov lokality.
4. Po kliknutí na bod sa používateľ presmeruje na príslušný blogový článok o danej lokalite, ak existuje (na základe `slug` v `locations.ts`)."

---

### 5. PWA Notifikácie o Novinkách
**Vylepšenie:** Zvýšiť angažovanosť používateľov zasielaním push notifikácií o nových blogových článkoch alebo špeciálnych ponukách.

**PROMPT_5:**
"Implementuj PWA push notifikácie. Chcem, aby si:
1. Na stránke vytvoril tlačidlo 'Prihlásiť sa na odber noviniek', ktoré požiada používateľa o povolenie zasielať notifikácie.
2. Po udelení súhlasu uložil `subscription` objekt do Firestore databázy.
3. Vytvoril zabezpečenú serverless funkciu, ktorú môže administrátor zavolať na odoslanie notifikácie všetkým prihláseným používateľom (napr. 'Nový článok na blogu: 5 tipov, ako baliť krehké veci').
4. Zabezpečil, že po kliknutí na notifikáciu sa používateľ presmeruje na príslušnú stránku (napr. nový článok)."

---

### 6. Porovnávač Služieb
**Vylepšenie:** Pomôcť zákazníkom lepšie sa rozhodnúť vytvorením nástroja, kde si môžu porovnať, čo ktorá služba obsahuje.

**PROMPT_6:**
"Na stránke `/sluzby` vytvor sekciu 'Porovnanie služieb'. Chcem, aby si:
1. Zobrazil tabuľku, kde v riadkoch budú jednotlivé aspekty sťahovania (napr. 'Balenie nábytku', 'Demontáž', 'Poistenie', 'Odvoz odpadu').
2. V stĺpcoch budú vaše hlavné balíčky služieb (napr. 'Základné sťahovanie', 'Full Service').
3. Pomocou ikon (✔ a ❌) vizuálne odlíš, čo ktorý balíček obsahuje.
4. Pridaj ku každému balíčku tlačidlo 'Zistiť viac', ktoré presmeruje na detail služby."

---

### 7. Vernostný Program "VI&MO Club"
**Vylepšenie:** Motivovať zákazníkov k opakovanému využitiu služieb a odporúčaniam.

**PROMPT_7:**
"Vytvor novú podstránku `/klub` pre vernostný program 'VI&MO Club'. Chcem, aby si:
1. Vytvoril jednoduchý registračný formulár (email a heslo) s využitím Firebase Authentication.
2. Po prihlásení zobrazil používateľovi jeho 'vernostný panel', kde uvidí:
   - Svoj unikátny zľavový kód (napr. `JANO10`), ktorý môže zdieľať.
   - Počet využití jeho kódu inými ľuďmi.
   - Získanú odmenu (napr. 'Zľava 15% na ďalšie sťahovanie').
3. Vytvor logiku, ktorá bude sledovať použitie kódov a pripisovať odmeny."

---

### 8. Fotogaléria Realizácií
**Vylepšenie:** Zvýšiť dôveryhodnosť ukážkami reálnej práce.

**PROMPT_8:**
"Vytvor novú stránku `/referencie`. Chcem, aby si:
1. Vytvoril responzívnu fotogalériu s filtrom podľa typu služby (napr. 'Sťahovanie bytov', 'Vypratávanie', 'Sťahovanie firiem').
2. Každá fotka v galérii by mala mať krátky popis (napr. 'Sťahovanie 3-izbového bytu v Ružinove').
3. Implementuj 'lazy loading' pre obrázky, aby sa stránka načítavala rýchlo.
4. Pridaj možnosť zväčšenia obrázku po kliknutí (lightbox)."

---

### 9. Zdieľanie na Sociálne Siete
**Vylepšenie:** Umožniť používateľom jednoducho zdieľať blogové články.

**PROMPT_9:**
"Na detailnej stránke každého blogového článku (`/blog/[slug]`) pridaj tlačidlá na zdieľanie. Chcem, aby si:
1. Implementoval tlačidlá pre zdieľanie na Facebook, Twitter a cez WhatsApp.
2. Zabezpečil, že pri zdieľaní sa automaticky načíta titulok článku, jeho popis a hlavný obrázok (využi Open Graph meta tagy, ktoré by mali byť už pripravené).
3. Tlačidlá umiestni na viditeľné miesto, napríklad pod titulok článku a na koniec článku."

---

### 10. Temný Režim (Dark Mode)
**Vylepšenie:** Zlepšiť používateľský komfort a pridať moderný vizuálny prvok.

**PROMPT_10:**
"Implementuj do celej aplikácie možnosť prepínania medzi svetlým a tmavým režimom (dark mode). Chcem, aby si:
1. Použil knižnicu `next-themes` a Tailwind CSS na definovanie farebnej schémy pre oba režimy.
2. Pridal do hlavičky (Header) prepínač (ikonu slnka/mesiaca), ktorý umožní používateľovi zmeniť režim.
3. Zabezpečil, aby si aplikácia pamätala posledné zvolené nastavenie používateľa (pomocou `localStorage`).
4. Vytvoril plynulý prechod medzi režimami bez prebliknutia stránky."
