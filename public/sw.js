const CACHE="nuipita-v2";
const CORE=["/","/nui","/pouch","/offline.html"];
const isStatic=url=>url.pathname.startsWith("/_next/static/")||/\.(?:css|js|png|jpg|jpeg|svg|ico|woff2?)$/.test(url.pathname);
const isCacheablePage=url=>CORE.includes(url.pathname)||url.pathname.startsWith("/blog/");
async function trimCache(){const cache=await caches.open(CACHE);const keys=await cache.keys();if(keys.length>45)for(const key of keys.slice(0,keys.length-45))await cache.delete(key)}
self.addEventListener("install",event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener("activate",event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",event=>{
  if(event.request.method!=="GET")return;
  const url=new URL(event.request.url);
  if(url.origin!==location.origin||url.pathname.startsWith("/og/")||url.pathname.startsWith("/s/")||url.pathname.startsWith("/g/"))return;
  if(event.request.mode==="navigate"){
    event.respondWith(fetch(event.request).then(response=>{if(isCacheablePage(url)){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy).then(trimCache))}return response}).catch(()=>caches.match(event.request).then(response=>response||caches.match("/offline.html"))));
  }else if(isStatic(url)){
    event.respondWith(caches.match(event.request).then(response=>response||fetch(event.request).then(network=>{const copy=network.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy).then(trimCache));return network})));
  }
});
