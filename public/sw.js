// Identifikátor a verzia cache
const CACHE_NAME = 'vimo-cache-v1';

// Zoznam súborov na predbežné uloženie do cache
// Zahŕňa kľúčové statické zdroje a offline stránku
const urlsToCache = [
  '/',
  '/offline',
  '/styles/globals.css', // Prispôsobte cesty podľa vašej štruktúry
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

// Fáza Inštalácie: Uloženie základných zdrojov do cache
self.addEventListener('install', event => {
  // Počkáme, kým sa dokončí cachovanie
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch(err => {
        console.error('Failed to cache', err);
      })
  );
});

// Fáza Aktivácie: Správa starých cache
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME]; // Ponecháme len aktuálnu verziu cache

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName); // Zmažeme staré verzie
          }
        })
      );
    })
  );
});

// Fáza Načítavania (Fetch): Interceptovanie sieťových požiadaviek
self.addEventListener('fetch', event => {
  // Reagujeme len na GET požiadavky
  if (event.request.method !== 'GET') {
    return;
  }

  // Ignorujeme požiadavky na administrátorské a API cesty
  if (event.request.url.includes('/admin') || event.request.url.includes('/api')) {
      return;
  }

  event.respondWith(
    // Stratégia: Network First (sieť ako prvá)
    fetch(event.request)
      .then(response => {
        // Ak je požiadavka úspešná, uložíme jej kópiu do cache
        // a vrátime originálnu odpoveď
        const responseToCache = response.clone();
        caches.open(CACHE_NAME)
          .then(cache => {
            cache.put(event.request, responseToCache);
          });
        return response;
      })
      .catch(() => {
        // Ak sieť zlyhá (offline režim), pokúsime sa nájsť odpoveď v cache
        return caches.match(event.request)
          .then(response => {
            // Ak je zdroj nájdený v cache, vrátime ho
            if (response) {
              return response;
            }
            // Ak zdroj nie je ani v sieti, ani v cache,
            // vrátime našu predpripravenú offline stránku
            // Platí len pre navigačné požiadavky (napr. na HTML stránky)
            if (event.request.mode === 'navigate') {
              return caches.match('/offline');
            }
          });
      })
  );
});
