# Návod: Ako Nahrať Projekt do Vlastného Git Repozitára

Tento sprievodca vás prevedie krokmi potrebnými na nahratie vášho projektu z Firebase Studia do vášho vlastného súkromného alebo verejného Git repozitára (napr. na GitHub). Tento krok je nevyhnutný, aby skript `deploy.sh` mohol projekt automaticky stiahnuť a nasadiť na váš VPS.

Predpokladáme, že máte vytvorený účet na službe ako [GitHub](https://github.com/), [GitLab](https://gitlab.com/) alebo [Bitbucket](https://bitbucket.org/).

---

### Krok 1: Vytvorenie Nového Repozitára na GitHube

1.  **Prihláste sa do svojho GitHub účtu.**
2.  **Vytvorte nový repozitár:** Kliknite na tlačidlo **"New"** alebo prejdite na [github.com/new](https://github.com/new).
3.  **Názov Repozitára:** Zadajte názov, napríklad `woopanel`.
4.  **Typ Repozitára:** Dôrazne odporúčame zvoliť **"Private"** (Súkromný), aby bol váš kód chránený.
5.  **DÔLEŽITÉ:** **Nezaškrtávajte** žiadne z nasledujúcich polí:
    *   `Add a README file`
    *   `Add .gitignore`
    *   `Choose a license`
    Váš projekt už tieto súbory obsahuje a ich opätovným vytvorením by vznikli konflikty.
6.  **Vytvorte repozitár:** Kliknite na tlačidlo **"Create repository"**.

Po vytvorení repozitára vás GitHub presmeruje na stránku s inštrukciami a URL adresou vášho nového repozitára. Skopírujte si **HTTPS** URL. Bude vyzerať nejako takto:
`https://github.com/VASE-MENO/woopanel.git`

---

### Krok 2: Nahratie Vášho Projektu z Lokálneho Počítača

Tieto príkazy spustite v termináli (príkazovom riadku) **na vašom lokálnom počítači**, v priečinku, kde máte uložený tento projekt.

1.  **Inicializujte Git v projekte:**
    *Tento krok vytvorí lokálny repozitár vo vašom projekte.*
    ```bash
    git init -b main
    ```

2.  **Pridajte všetky súbory do Gitu:**
    *Tento príkaz pripraví všetky súbory projektu na odoslanie.*
    ```bash
    git add .
    ```

3.  **Vytvorte prvý "commit" (záznam zmien):**
    *Týmto vytvoríte prvú snímku vášho projektu.*
    ```bash
    git commit -m "Prvotné nahránie projektu WOOPANEL"
    ```

4.  **Pripojte lokálny repozitár k vzdialenému (na GitHube):**
    *Nahraďte `URL_VASHHO_REPOZITARA` URL adresou, ktorú ste skopírovali v kroku 1.*
    ```bash
    git remote add origin URL_VASHHO_REPOZITARA
    ```
    Napríklad:
    ```bash
    git remote add origin https://github.com/VASE-MENO/woopanel.git
    ```

5.  **Odošlite ("push") váš kód na GitHub:**
    *Tento príkaz nahrá všetky vaše súbory do vzdialeného repozitára.*
    ```bash
    git push -u origin main
    ```
    Pri tomto kroku si od vás terminál môže vypýtať vaše prihlasovacie meno a heslo/token do GitHubu.

---

### Hotovo!

Váš kód je teraz bezpečne uložený vo vašom súkromnom Git repozitári.

Teraz môžete pokračovať v nasadení na váš VPS podľa návodu v súbore `deploy.md`. Nezabudnite v skripte `deploy.sh` nastaviť premennú `GIT_REPO_URL` na URL adresu vášho nového repozitára.
