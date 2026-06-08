const ALLOWED_HOSTS = [
  'lastfm.freetls.fastly.net',
  'i.scdn.co',
  'is1-ssl.mzstatic.com',
  'is2-ssl.mzstatic.com',
  'is3-ssl.mzstatic.com',
  'is4-ssl.mzstatic.com',
  'is5-ssl.mzstatic.com',
];

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  const { url } = req.query;

  if (!url) {
    return res.status(400).end();
  }

  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return res.status(400).end();
  }

  // Only proxy known image CDN hosts — prevents open-proxy abuse
  const allowed = ALLOWED_HOSTS.some(
    (host) => parsed.hostname === host || parsed.hostname.endsWith('.' + host)
  );
  if (!allowed) {
    return res.status(403).end();
  }

  try {
    const upstream = await fetch(parsed.href, {
      headers: {
        // Mimic a browser request without a Referer so Fastly doesn't hotlink-block
        'User-Agent': 'Mozilla/5.0 (compatible; portfolio-proxy/1.0)',
        Accept: 'image/*,*/*',
      },
    });

    if (!upstream.ok) {
      return res.status(upstream.status).end();
    }

    const contentType = upstream.headers.get('content-type') || 'image/jpeg';
    const buffer = await upstream.arrayBuffer();

    res.setHeader('Content-Type', contentType);
    // Cache for 24 hours on the client, 1 week on Vercel's edge
    res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=604800');
    res.status(200).send(Buffer.from(buffer));
  } catch (err) {
    console.error('album-art proxy error:', err);
    res.status(502).end();
  }
}
