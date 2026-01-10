// Vercel serverless function to proxy Dev.to articles
// This ensures fresh data and avoids caching issues

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { username } = req.query;

    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }

    const apiUrl = `https://dev.to/api/articles?username=${username}`;
    
    const response = await fetch(apiUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
      },
    });

    if (!response.ok) {
      throw new Error(`Dev.to API error: ${response.status}`);
    }

    const data = await response.json();

    // Set cache headers - cache for 5 minutes to balance freshness and performance
    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
    res.setHeader('Content-Type', 'application/json');
    
    return res.status(200).json(data);
  } catch (error) {
    console.error('Failed to fetch Dev.to articles:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch articles',
      details: error.message || 'Unknown error'
    });
  }
}
