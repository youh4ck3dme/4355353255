# Návod na Nasadenie WOOPANEL na VPS

Tento dokument popisuje, ako nasadiť a spustiť Next.js aplikáciu WOOPANEL na vlastnom virtuálnom serveri (VPS) s operačným systémom Ubuntu. Proces využíva `git`, `nvm`, `Node.js` a `pm2` na automatizáciu a správu aplikácie.

## 1. Príprava Servera (VPS)

Pred spustením skriptu sa uistite, že máte:
- Čerstvo nainštalovaný **Ubuntu 22.04 LTS** alebo novší.
- Prístup na server cez **SSH** s `sudo` právami.
- **Git** nainštalovaný (`sudo apt-get install git`).
- **Firewall** nakonfigurovaný tak, aby povoľoval prichádzajúce spojenia na portoch `22` (SSH), `80` (HTTP) a `443` (HTTPS).

## 2. Príprava Projektu

1.  **Vytvorte si Git repozitár:**
    *   Ak ho ešte nemáte, nahrajte kód projektu do vášho súkromného alebo verejného repozitára na GitHube, GitLabe alebo inej službe.

2.  **Konfigurácia `deploy.sh`:**
    *   Otvorte súbor `deploy.sh` a upravte nasledujúce premenné na začiatku skriptu:
        *   `GIT_REPO_URL`: Vložte URL vášho Git repozitára (napr. `https://github.com/vaše-meno/woopanel.git`).
        *   `PROJECT_DIR`: Cesta, kam sa má projekt na serveri naklonovať (prednastavené `/var/www/woopanel` je dobrá voľba).
        *   `APP_NAME`: Názov pre proces v `pm2` (prednastavené `woopanel` je ideálne).

## 3. Postup Nasadenia

### Krok 1: Skopírujte `deploy.sh` na server

Pripojte sa na váš VPS cez SSH a skopírujte obsah súboru `deploy.sh` na server.

```bash
# Pripojte sa na server
ssh vaše-meno@vaša-ip-adresa

# Vytvorte súbor deploy.sh a vložte doň obsah
nano deploy.sh
```

Vložte obsah, uložte (`CTRL+O`) a zatvorte (`CTRL+X`).

### Krok 2: Udeľte skriptu práva na spustenie

```bash
chmod +x deploy.sh
```

### Krok 3: Spustite deployment skript

```bash
./deploy.sh
```

Skript automaticky vykoná nasledujúce kroky:
1.  Aktualizuje server.
2.  Nainštaluje `nvm` (Node Version Manager) pre správu verzií Node.js.
3.  Nainštaluje odporúčanú verziu Node.js (`v20`).
4.  Nainštaluje `pm2` – procesný manažér, ktorý udrží vašu aplikáciu neustále spustenú.
5.  Naklonuje váš projekt z Git repozitára.
6.  Nainštaluje všetky `npm` závislosti.
7.  Spustí `npm run build` na vytvorenie produkčnej verzie aplikácie.
8.  Vytvorí vzorový `.env.production` súbor.
9.  **Zastaví sa a požiada vás o úpravu `.env.production` súboru.**

### Krok 4: Nastavenie premenných prostredia

Po prvom spustení sa skript zastaví. Musíte manuálne nastaviť vaše API kľúče.

```bash
# Otvorte súbor .env.production v adresári projektu
nano /var/www/woopanel/.env.production
```

Upravte hodnotu `GEMINI_API_KEY` a uložte súbor.

### Krok 5: Opätovné spustenie skriptu

Spustite skript znova. Tentokrát nájde existujúci projekt, stiahne posledné zmeny, nainštaluje závislosti, vytvorí build a reštartuje aplikáciu pomocou `pm2`.

```bash
./deploy.sh
```

## 4. Konfigurácia Reverzného Proxy (Nginx)

Vaša aplikácia teraz beží na porte `3000`. Aby bola dostupná na štandardnom porte `80` (HTTP), je potrebné nastaviť reverzný proxy server, napríklad Nginx.

1.  **Nainštalujte Nginx:**
    ```bash
    sudo apt-get install nginx
    ```

2.  **Vytvorte konfiguračný súbor pre vašu doménu:**
    ```bash
    sudo nano /etc/nginx/sites-available/woopanel
    ```

3.  **Vložte nasledujúcu konfiguráciu** (nahraďte `vaša-domena.com` vašou reálnou doménou alebo IP adresou):
    ```nginx
    server {
        listen 80;
        server_name vaša-domena.com www.vaša-domena.com;

        location / {
            proxy_pass http://localhost:3000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
    }
    ```

4.  **Aktivujte konfiguráciu a reštartujte Nginx:**
    ```bash
    sudo ln -s /etc/nginx/sites-available/woopanel /etc/nginx/sites-enabled/
    sudo nginx -t  # Skontroluje syntax konfigurácie
    sudo systemctl restart nginx
    ```

## 5. Hotovo!

Vaša aplikácia WOOPANEL by teraz mala byť dostupná na vašej doméne. `pm2` sa postará o to, aby aplikácia zostala spustená aj po reštarte servera.

### Užitočné `pm2` príkazy:
- `pm2 status` – Zobrazí stav všetkých bežiacich aplikácií.
- `pm2 logs woopanel` – Zobrazí logy pre vašu aplikáciu.
- `pm2 restart woopanel` – Reštartuje aplikáciu.
- `pm2 stop woopanel` – Zastaví aplikáciu.
