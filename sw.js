const VERSION = "imagen-sonido-v55";
const SHELL = ["./", "index.html", "manifest.webmanifest", "icon.svg","icon-192.png","icon-512.png","icon-180.png", "unidades.js","img/centro1.jpg","img/color1.jpg","img/color2.jpg","img/flujo1.jpg","img/flujo2.jpg","img/fondo1.jpg","img/fondo2.jpg","img/horizonte1.jpg","img/lineas1.jpg","img/lineas2.jpg","img/marco1.jpg","img/marco2.jpg","img/mirada1.jpg","img/mirada2.jpg","img/repeticion1.jpg","img/repeticion2.jpg","img/tercios1.jpg","img/tercios2.jpg","img/ang-v-aberrante.jpg","img/ang-v-cenital.jpg","img/ang-v-contrapicado.jpg","img/ang-v-nadir.jpg","img/ang-v-picado.jpg","img/mapa-lenguaje-audiovisual.jpg","img/mov-barrido.jpg","img/mov-pan-vertical.jpg","img/mov-travelling-foto.jpg","img/mov-travelling.jpg","img/pl-americano.jpg","img/pl-conjunto.jpg","img/pl-detalle.jpg","img/pl-entero.jpg","img/pl-gpg.jpg","img/pl-gpp.jpg","img/pl-medio.jpg","img/pl-pg.jpg","img/pl-pp.jpg","img/pl-ppp.jpg"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  e.respondWith(
    caches.match(req).then(hit => hit || fetch(req).then(res => {
      const copia = res.clone();
      caches.open(VERSION).then(c => c.put(req, copia));
      return res;
    }).catch(() => caches.match("index.html")))
  );
});
