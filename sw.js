// sw.js - Service Worker

// You will need 3 event listeners:
//   - One for installation
//   - One for activation ( check out MDN's clients.claim() for this step )
//   - One for fetch requests

/*
var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
    'https://cse110lab6.herokuapp.com/entries'
  ];

self.addEventListener('install', function(event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
          .then(function(cache) {
            console.log('Opened cache'); 
            return cache.addAll(urlsToCache);
          })
      );
  });
  
  self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          // Cache hit - return response
          if (response) {
            return response;
          }
          return fetch(event.request).then(
            function(response) {
                // Check if we received a valid response
                if(!response || response.status !== 200 || response.type !== 'basic') {
                    return response;
                }
                var responseToCache = response.clone();

                caches.open(CACHE_NAME)
                    .then(function(cache) {
                        cache.put(event.request, responseToCache);
                    });

                return response;
                }
          );
        })
    );
  });

  self.addEventListener('activate', event => {
    event.waitUntil(clients.claim());
  });

  */ 

  // sw.js - Service Worker

// You will need 3 event listeners:
//   - One for installation
//   - One for activation ( check out MDN's clients.claim() for this step )
//   - One for fetch requests
var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
    'https://cse110lab6.herokuapp.com/entries'
  ];
self.addEventListener('install', function(event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
          .then(function(cache) {
            console.log('Opened cache'); 
            return cache.addAll(urlsToCache);
          })
      );
  });
  self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          // Cache hit - return response
          if (response) {
            return response;
          }
          return fetch(event.request).then(
            function(response) {
                // Check if we received a valid response
                if(!response || response.status !== 200 || response.type !== 'basic') {
                    return response;
                }
                var responseToCache = response.clone();

                caches.open(CACHE_NAME)
                    .then(function(cache) {
                        cache.put(event.request, responseToCache);
                    });

                return response;
                }
          );
        })
    );
  });

  self.addEventListener('activate', event => {
    event.waitUntil(clients.claim());
  });

//   self.addEventListener('activate', function(event) {

//     var cacheAllowlist = ['pages-cache-v1', 'blog-posts-cache-v1'];
  
//     event.waitUntil(
//       clients.claim(),
//       caches.keys().then(function(cacheNames) {
//         return Promise.all(
//           cacheNames.map(function(cacheName) {
//             if (cacheAllowlist.indexOf(cacheName) === -1) {
//               return caches.delete(cacheName);
//             }
//           })
//         );
//       })
//     );
//   });
