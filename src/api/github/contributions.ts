// API route to proxy GitHub contributions requests
// This avoids CORS issues when deployed

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const username = url.searchParams.get('username');
    const year = url.searchParams.get('year') || 'last';

    if (!username) {
      return new Response(JSON.stringify({ error: 'Username is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
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

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
      }
    });
  } catch (error) {
    console.error('Failed to fetch GitHub contributions:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to fetch contributions',
        details: error instanceof Error ? error.message : 'Unknown error'
      }), 
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
