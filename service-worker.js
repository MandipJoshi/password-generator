const CACHE_NAME = 'cache-v5';
const URLS_TO_CACHE = [
	/* css */
	'css/main.css',
	'css/normalize.min.css',

	/* img */
	'img/icon-192x192.png',
	'img/icon-512x512.png',

	/* js */
	'js/main.js',

	/* html */
	'index.html',
	'404.html',
	'/password-generator/',
	
	/* files */
	'LICENSE.txt',
	'THIRD-PARTY-LICENSES.txt',
	'manifest.json',
	'favicon.ico'
];

/* install event */
self.addEventListener('install', event => {
	event.waitUntil(
		caches.open(CACHE_NAME)
			.then(cache => {
				return cache.addAll(URLS_TO_CACHE);
		})
	);
});

/* activate event */
self.addEventListener('activate', event => {
	const cacheWhitelist = [CACHE_NAME];
	
	event.waitUntil(
		caches.keys().then(cacheNames => {
			return Promise.all(
				cacheNames.map(cacheName => {
					if(cacheWhitelist.indexOf(cacheName) === -1) {
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
});

/* fetch event */
self.addEventListener('fetch', event => {
	event.respondWith(
		caches.match(event.request)
			.then(response => {
				if(response) {
					return response;
				}
				
				return fetch(event.request);
			}
		)
	);
});
