self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(clients.claim()));

self.addEventListener('push', event => {
  const data = event.data?.json() ?? {};
  event.waitUntil(
    self.registration.showNotification(data.title ?? 'WoodMood', {
      body:     data.body ?? '',
      icon:     '/icon-192.png',
      badge:    '/icon-192.png',
      tag:      data.tag ?? 'woodmood',
      renotify: true,
      vibrate:  [200, 100, 200],
      data:     { url: self.location.origin }
    })
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(list => {
      if (list.length) return list[0].focus();
      return clients.openWindow(event.data.url);
    })
  );
});
