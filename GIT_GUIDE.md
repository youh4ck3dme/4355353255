# Návod: Ako Nahrať Projekt do Vlastného Git Repozitára

Tento sprievodca vás prevedie krokmi potrebnými na nahratie vášho projektu z Firebase Studia do vášho vlastného súkromného alebo verejného Git repozitára (napr. na GitHub). Tento krok je nevyhnutný, aby skript `deploy.sh` mohol projekt automaticky stiahnuť a nasadiť na váš VPS.

Predpokladáme, že máte vytvorený účet na službe ako [GitHub](https://github.com/), [GitLab](https://gitlab.com/) alebo [Bitbucket](https://bitbucket.org/).

---

### Krok 1: Vytvorenie Nového Repozitára na GitHube

1.  **Prihláste sa do svojho GitHub účtu.**
2.  **Vytvorte nový repozitár:** Kliknite na tlačidlo **"New"** alebo prejdite na [github.com/new](https://github.com/new).
3.  **Názov Repozitára:** Zadajte názov `woopaneldashboard`.
4.  **Typ Repozitára:** Dôrazne odporúčame zvoliť **"Private"** (Súkromný), aby bol váš kód chránený.
5.  **DÔLEŽITÉ:** **Nezaškrtávajte** žiadne z nasledujúcich polí:
    *   `Add a README file`
    *   `Add .gitignore`
    *   `Choose a license`
    Váš projekt už tieto súbory obsahuje a ich opätovným vytvorením by vznikli konflikty.
6.  **Vytvorte repozitár:** Kliknite na tlačidlo **"Create repository"**.

Po vytvorení repozitára vám GitHub zobrazí URL adresu. Mala by vyzerať takto:
`https://github.com/youh4ck3dme/woopaneldashboard.git`

---

### Krok 2: Nahratie Vášho Projektu z Lokálneho Počítača

Tieto príkazy spustite v termináli (príkazovom riadku) **na vašom lokálnom počítači**, v priečinku, kde máte uložený tento projekt.

1.  **Inicializujte Git v projekte (ak ste tak ešte neurobili):**
    ```bash
    git init -b main
    ```

2.  **Pridajte všetky súbory do Gitu:**
    ```bash
    git add .
    ```

3.  **Vytvorte prvý "commit" (záznam zmien):**
    ```bash
    git commit -m "Prvotné nahránie projektu WOOPANEL Dashboard"
    ```

4.  **Pripojte lokálny repozitár k vzdialenému (na GitHube):**
    ```bash
    git remote add origin https://github.com/youh4ck3dme/woopaneldashboard.git
    ```

5.  **Odošlite ("push") váš kód na GitHub:**
    *Pri tomto kroku si od vás terminál môže vypýtať vaše prihlasovacie meno a heslo/token do GitHubu.*
    ```bash
    git push -u origin main
    ```

---

### Hotovo!

Váš kód je teraz bezpečne uložený vo vašom súkromnom Git repozitári `woopaneldashboard`.

Teraz môžete pokračovať v nasadení na váš VPS podľa návodu v súbore `deploy.md`. Nezabudnite v skripte `deploy.sh` nastaviť premennú `GIT_REPO_URL` na `https://github.com/youh4ck3dme/woopaneldashboard.git`.
