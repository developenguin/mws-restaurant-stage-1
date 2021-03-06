const staticCacheName = 'restaurant-reviews-v3';

self.addEventListener('install', function(event) {

  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      cache.addAll([
        'img/1.jpg',
        'img/2.jpg',
        'img/3.jpg',
        'img/4.jpg',
        'img/5.jpg',
        'img/6.jpg',
        'img/7.jpg',
        'img/8.jpg',
        'img/9.jpg',
        'img/10.jpg'
      ]);

      return cache.addAll([
        '/',
        'js/main.js',
        'js/dbhelper.js',
        'js/restaurant_info.js',
        'index.html',
        'restaurant.html',
        'css/styles.css',
        'css/grid.css',
        'data/restaurants.json'
      ]);
    })
  );
});

self.addEventListener('activate', function(event) {

  /* Wait until all cache names are available, then delete all old caches */
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('restaurant-reviews-') &&
            cacheName !== staticCacheName;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {

  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        return response || fetch(event.request);
      })
      .catch(() => {
        console.log('Something went wrong checking the cache!')
      })
  );

});
