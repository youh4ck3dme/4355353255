# Návod na Nasadenie WOOPANEL na VPS

Tento dokument popisuje, ako nasadiť a spustiť Next.js aplikáciu WOOPANEL na vlastnom virtuálnom serveri (VPS) s operačným systémom Ubuntu. Proces využíva `git`, `nvm`, `Node.js` a `pm2` na automatizáciu a správu aplikácie.

## 1. Príprava Servera (VPS)

Pred spustením skriptu sa uistite, že máte:
- Čerstvo nainštalovaný **Ubuntu 22.04 LTS** alebo novší.
- Prístup na server cez **SSH** s `sudo` právami.
- **Firewall** nakonfigurovaný tak, aby povoľoval prichádzajúce spojenia na portoch `22` (SSH), `80` (HTTP) a `443` (HTTPS).

## 2. Príprava na Prvé Nasadenie

1.  **Vytvorte si Git repozitár:**
    *   Ak ho ešte nemáte, nahrajte kód projektu do vášho súkromného alebo verejného repozitára na GitHube, GitLabe alebo inej službe.

2.  **Konfigurácia `deploy.sh`:**
    *   Otvorte súbor `deploy.sh` a **pred prvým spustením** upravte nasledujúce premenné na začiatku skriptu:
        *   `GIT_REPO_URL`: Vložte HTTPS alebo SSH URL vášho Git repozitára (napr. `https://github.com/vaše-meno/woopanel.git`).
        *   `PROJECT_DIR`: Cesta, kam sa má projekt na serveri naklonovať (prednastavené `/var/www/woopanel` je dobrá voľba).
        *   `APP_NAME`: Názov pre proces v `pm2` (prednastavené `woopanel` je ideálne).

## 3. Postup Nasadenia

### Krok 1: Skopírujte `deploy.sh` na server

Pripojte sa na váš VPS cez SSH a uložte obsah skriptu `deploy.sh` na server.

```bash
# Pripojte sa na server
ssh vaše-meno@vaša-ip-adresa

# Vytvorte súbor deploy.sh a vložte doň obsah
nano deploy.sh
```

Vložte upravený obsah, uložte (`CTRL+O`) a zatvorte (`CTRL+X`).

### Krok 2: Udeľte skriptu práva na spustenie

```bash
chmod +x deploy.sh
```

### Krok 3: Prvé spustenie skriptu

Spustite skript. **Je dôležité spúšťať ho ako bežný používateľ, nie pod `sudo`.**

```bash
./deploy.sh
```

Skript automaticky vykoná nasledujúce kroky:
1.  Aktualizuje server a nainštaluje `git`.
2.  Nainštaluje `nvm` (Node Version Manager).
3.  Nainštaluje odporúčanú verziu Node.js (`v20`) a `pm2`.
4.  Naklonuje váš projekt z Git repozitára.
5.  Nainštaluje všetky `npm` závislosti a spustí `npm run build`.
6.  Vytvorí vzorový `.env.production` súbor.
7.  **Zastaví sa a požiada vás o úpravu `.env.production` súboru.**

### Krok 4: Nastavenie Premenných Prostredia

Po prvom spustení sa skript zastaví. Musíte manuálne nastaviť vaše API kľúče.

```bash
# Otvorte súbor .env.production v adresári projektu
nano /var/www/woopanel/.env.production
```

Upravte hodnotu `GEMINI_API_KEY` a uložte súbor.

### Krok 5: Opätovné spustenie skriptu

Spustite skript znova. Tentokrát už nájde existujúci projekt, stiahne posledné zmeny (`git pull`), preinštaluje závislosti, vytvorí nový build a bezpečne reštartuje aplikáciu pomocou `pm2`.

```bash
./deploy.sh
```

## 4. Konfigurácia Reverzného Proxy (Nginx)

Vaša aplikácia teraz beží na porte `3000`. Aby bola dostupná na štandardnom porte `80` (HTTP) a `443` (HTTPS), je potrebné nastaviť reverzný proxy server, napríklad Nginx.

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

## 5. Zabezpečenie pomocou SSL (Certbot)

Dôrazne sa odporúča zabezpečiť vašu stránku pomocou bezplatného SSL certifikátu od Let's Encrypt.

1.  **Nainštalujte Certbot:**
    ```bash
    sudo apt-get install certbot python3-certbot-nginx
    ```

2.  **Spustite Certbot pre vašu doménu:**
    ```bash
    sudo certbot --nginx -d vaša-domena.com -d www.vaša-domena.com
    ```
    Certbot automaticky upraví vašu Nginx konfiguráciu a nastaví presmerovanie z HTTP na HTTPS.

## 6. Hotovo!

Vaša aplikácia WOOPANEL by teraz mala byť bezpečne dostupná na vašej doméne. `pm2` sa postará o to, aby aplikácia zostala spustená aj po reštarte servera.

### Užitočné `pm2` príkazy:
- `pm2 status` – Zobrazí stav všetkých bežiacich aplikácií.
- `pm2 logs woopanel` – Zobrazí logy pre vašu aplikáciu.
- `pm2 restart woopanel` – Reštartuje aplikáciu.
- `pm2 stop woopanel` – Zastaví aplikáciu.
- `pm2 save` - Uloží aktuálny zoznam procesov pre obnovenie po reštarte.
