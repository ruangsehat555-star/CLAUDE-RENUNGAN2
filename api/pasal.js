// Perantara ke apiindonesia.id: mengambil satu pasal Alkitab.
// Pemakaian: /api/pasal?ref=Kej/1   (Kitab/Pasal)
module.exports = async (req, res) => {
  const ref = String(req.query.ref || '');
  if (!/^[A-Za-z0-9]{1,6}\/\d{1,3}$/.test(ref)) {
    return res.status(400).json({ error: 'Format salah. Contoh: Kej/1' });
  }
  const key = process.env.APIINDONESIA_KEY;
  if (!key) return res.status(500).json({ error: 'Kunci API belum dipasang' });
  try {
    const r = await fetch('https://use.apiindonesia.id/api/v1/alkitab/passage/' + ref, {
      headers: { 'x-api-key': key }
    });
    const body = await r.text();
    // Isi pasal tidak berubah, jadi boleh disimpan sementara (hemat jatah API)
    if (r.ok) res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
    res.status(r.status).setHeader('Content-Type', 'application/json').send(body);
  } catch (e) {
    res.status(502).json({ error: 'Gagal menghubungi API Alkitab' });
  }
};
