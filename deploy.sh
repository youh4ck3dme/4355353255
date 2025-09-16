#!/bin/bash

# --- Skript na Automatizované Nasadenie Next.js Aplikácie na VPS ---

# Zastaví skript pri akejkoľvek chybe
set -e

# --- Konfigurácia (upravte iba pri prvom nasadení) ---
APP_NAME="woopanel"                                           # Názov aplikácie pre PM2
GIT_REPO_URL="https://github.com/youh4ck3dme/woopaneldashboard.git"    # URL vášho Git repozitára (iba pre prvé klonovanie)
PROJECT_DIR="/var/www/woopanel"                               # Cesta k adresáru projektu na serveri
NODE_VERSION="20"                                             # Verzia Node.js

# --- 1. Aktualizácia servera a inštalácia závislostí ---
echo "▶️  Aktualizujem server a inštalujem základné nástroje..."
sudo apt-get update
sudo apt-get install -y git curl unzip

# --- 2. Inštalácia NVM (Node Version Manager) a správnej verzie Node.js ---
if ! command -v nvm &> /dev/null
then
    echo "▶️  Inštalujem NVM..."
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
    source ~/.bashrc
else
    echo "✅ NVM je už nainštalované."
fi

# Načítanie NVM do aktuálnej session
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Inštalácia a použitie správnej verzie Node.js
echo "▶️  Inštalujem a používam Node.js v$NODE_VERSION..."
nvm install $NODE_VERSION
nvm use $NODE_VERSION
nvm alias default $NODE_VERSION

# --- 3. Inštalácia PM2 (Process Manager) ---
if ! command -v pm2 &> /dev/null
then
    echo "▶️  Inštalujem PM2 globálne..."
    npm install pm2 -g
else
    echo "✅ PM2 je už nainštalované."
fi

# --- 4. Klonovanie alebo aktualizácia repozitára ---
if [ -d "$PROJECT_DIR/.git" ]; then
    echo "▶️  Adresár projektu existuje. Sťahujem najnovšie zmeny z Git..."
    cd $PROJECT_DIR
    git pull
else
    echo "▶️  Adresár projektu neexistuje. Klonujem repozitár z $GIT_REPO_URL..."
    # Uisti sa, že nadradený adresár existuje
    sudo mkdir -p $(dirname $PROJECT_DIR)
    sudo chown $USER:$USER $(dirname $PROJECT_DIR)
    git clone $GIT_REPO_URL $PROJECT_DIR
    cd $PROJECT_DIR
fi

# --- 5. Inštalácia závislostí a build aplikácie ---
echo "▶️  Inštalujem projektové závislosti..."
npm install

echo "▶️  Vytváram produkčný build..."
npm run build

# --- 6. Správa premenných prostredia ---
# Uistite sa, že súbor .env.production existuje v adresári projektu.
if [ ! -f ".env.production" ]; then
    echo "⚠️  UPOZORNENIE: Súbor .env.production nebol nájdený."
    echo "Vytváram vzorový súbor .env.production..."
    echo "GEMINI_API_KEY=VAŠ_API_KĽÚČ_SEM" > .env.production
    echo "🛑  AKCIA VYŽADOVANÁ: Upravte súbor '$PROJECT_DIR/.env.production' a zadajte správny API kľúč."
    echo "Potom spustite skript znova."
    exit 1
fi

# --- 7. Spustenie alebo reštartovanie aplikácie cez PM2 ---
echo "▶️  Spúšťam alebo reštartujem aplikáciu '$APP_NAME' cez PM2..."

# Skontroluje, či aplikácia už beží v PM2
if pm2 describe $APP_NAME &> /dev/null; then
    echo "Aplikácia už beží, reštartujem ju..."
    pm2 reload $APP_NAME --exp-backoff-restart-delay=100
else
    echo "Prvé spustenie aplikácie..."
    pm2 start npm --name "$APP_NAME" -- start
fi

# Nastaví automatické spustenie PM2 po reštarte servera
pm2 startup | sudo bash -
pm2 save

echo "✅ Aplikácia bola úspešne nasadená a beží pod PM2!"
echo "URL aplikácie: http://<VAŠA_IP_ADRESA>:3000 (ak nie je nakonfigurovaný reverzný proxy)"
echo "Stav aplikácie môžete skontrolovať príkazom: pm2 status"

exit 0
