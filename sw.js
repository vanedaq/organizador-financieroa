const CACHE_NAME = 'finanzas-app-v1';
const urlsToCache = [
 './',
 './index.html',
 './manifest.json'
];

// Instalar Service Worker
self.addEventListener('install', event => {
 event.waitUntil(
   caches.open(CACHE_NAME)
     .then(cache => {
       return cache.addAll(urlsToCache);
     })
 );
});

// Interceptar requests
self.addEventListener('fetch', event => {
 event.respondWith(
   caches.match(event.request)
     .then(response => {
       // Devolver caché si existe, sino hacer fetch
       if (response) {
         return response;
       }
       return fetch(event.request);
     }
   )
 );
});

// Actualizar Service Worker
self.addEventListener('activate', event => {
 event.waitUntil(
   caches.keys().then(cacheNames => {
     return Promise.all(
       cacheNames.map(cacheName => {
         if (cacheName !== CACHE_NAME) {
           return caches.delete(cacheName);
         }
       })
     );
   })
 );
});