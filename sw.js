// Service worker minimal: membuat aplikasi bisa diinstal. Tidak menyimpan cache,
// jadi pembaruan aplikasi selalu langsung terlihat.
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{
  if(e.request.mode==='navigate'){
    e.respondWith(fetch(e.request).catch(()=>new Response('Tidak ada koneksi internet. Buka lagi saat sudah online.',{headers:{'Content-Type':'text/plain; charset=utf-8'}})));
  }
});
