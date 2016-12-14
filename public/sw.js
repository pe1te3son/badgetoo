/* eslint-env serviceworker */
/* globals fetch */
(function () {
  'use strict';
  var CACHE_VERSION = 'v1';

  self.addEventListener('install', function (event) {
    event.waitUntil(
      caches.open(CACHE_VERSION)
    );
  });

  self.addEventListener('fetch', function (event) {
    event.respondWith(
      caches.match(event.request).then(function (resp) {
        return resp || fetch(event.request).then(function (response) {
          caches.open(CACHE_VERSION).then(function (cache) {
            cache.put(event.request, response.clone());
          });
          return response;
        });
      }).catch(function () {
        console.log('not in cache');
      })
    );
  });

  self.addEventListener('activate', function (event) {
    var cacheWhitelist = [CACHE_VERSION];

    event.waitUntil(
      caches.keys().then(function (keyList) {
        return Promise.all(keyList.map(function (key) {
          if (cacheWhitelist.indexOf(key) === -1) {
            return caches.delete(key);
          }
        }));
      })
    );
  });
})();
