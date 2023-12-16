
self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('your-cache-name').then((cache) => {
        return cache.addAll([
          '/',
          '/index.html',
          // Add other static assets here
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          // Return the cached response if it exists
          if (response) {
            return response;
          }
  
          // Fetch and cache the resource
          return fetch(event.request)
            .then((res) => {
              // Check if the response is valid
              if (!res || res.status !== 200 || res.type !== 'basic') {
                return res;
              }
  
              const responseToCache = res.clone();
  
              caches.open('your-cache-name')
                .then((cache) => {
                  cache.put(event.request, responseToCache);
                });
  
              return res;
            });
        })
    );
  });
