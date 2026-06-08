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
  console.log('[album-art] called with url:', req.query?.url);

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
    console.log('[album-art] missing url param');
    return res.status(400).json({ error: 'missing url param' });
  }

  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    console.log('[album-art] invalid url:', url);
    return res.status(400).json({ error: 'invalid url' });
  }

  const allowed = ALLOWED_HOSTS.some(
    (host) => parsed.hostname === host || parsed.hostname.endsWith('.' + host)
  );
  if (!allowed) {
    console.log('[album-art] blocked host:', parsed.hostname);
    return res.status(403).json({ error: 'host not allowed', host: parsed.hostname });
  }

  try {
    console.log('[album-art] fetching upstream:', parsed.href);

    const upstream = await fetch(parsed.href, {
      headers: {
        // Spoof a last.fm referrer so Fastly's hotlink protection passes
        Referer: 'https://www.last.fm/',
        Origin: 'https://www.last.fm',
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        Accept: 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
      },
    });

    console.log('[album-art] upstream status:', upstream.status);

    if (!upstream.ok) {
      return res.status(upstream.status).json({
        error: 'upstream error',
        status: upstream.status,
      });
    }

    const contentType = upstream.headers.get('content-type') || 'image/jpeg';
    const arrayBuf = await upstream.arrayBuffer();
    const buffer = Buffer.from(arrayBuf);

    console.log('[album-art] returning', buffer.byteLength, 'bytes,', contentType);

    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Length', buffer.byteLength);
    res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=604800');
    res.status(200).end(buffer);
  } catch (err) {
    console.error('[album-art] fetch error:', err);
    return res.status(502).json({ error: 'upstream fetch failed', message: err.message });
  }
}
