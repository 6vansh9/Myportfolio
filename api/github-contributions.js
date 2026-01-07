// Vercel serverless function to proxy GitHub contributions
// This avoids CORS issues when deployed

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { username, year = 'last' } = req.query;

    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }

    const apiUrl = `https://github-contributions-api.jogruber.de/v4/${username}?y=${year}`;
    
    const response = await fetch(apiUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data = await response.json();

    // Set cache headers for better performance
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=7200');
    res.setHeader('Content-Type', 'application/json');
    
    return res.status(200).json(data);
  } catch (error) {
    console.error('Failed to fetch GitHub contributions:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch contributions',
      details: error.message || 'Unknown error'
    });
  }
}
