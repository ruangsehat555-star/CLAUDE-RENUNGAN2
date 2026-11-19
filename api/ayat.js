module.exports = async (req, res) => {
  const ref = String(req.query.ref || '');
  if (!/^[A-Za-z0-9 ]{1,30}\/\d{1,3}\/\d{1,3}$/.test(ref)) {
    return res.status(400).json({ error: 'Format salah' });
  }
  const key = process.env.APIINDONESIA_KEY;
  if (!key) {
    return res.status(500).json({ error: 'Kunci API belum dipasang' });
  }
  try {
    const path = ref.split('/').map(encodeURIComponent).join('/');
    const r = await fetch(
      'https://use.apiindonesia.id/api/v1/alkitab/verse/' + path,
      { headers: { 'x-api-key': key } }
    );
    const text = await r.text();
    res.setHeader('Content-Type', 'application/json');
    res.status(r.status).send(text);
  } catch (e) {
    res.status(502).json({ error: 'Gagal menghubungi API Alkitab' });
  }
};
