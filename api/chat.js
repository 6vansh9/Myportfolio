// Vercel serverless function for AI chat
// Proxies requests to the LLM provider

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages, contents } = req.body;

    // Support both formats (messages array or contents array)
    const chatContents = contents || messages?.map((m) => ({
      role: m.role,
      content: m.content ?? m.parts?.map((p) => p.text).join('') ?? '',
    }));

    if (!chatContents || chatContents.length === 0) {
      return res.status(400).json({ error: 'Messages are required' });
    }

    const response = await fetch('https://llm-provider.onrender.com/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: chatContents }),
    });

    if (!response.ok) {
      throw new Error(`LLM provider error: ${response.status}`);
    }

    const data = await response.json();

    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json(data);
  } catch (error) {
    console.error('Failed to process chat request:', error);
    return res.status(500).json({ 
      error: 'Failed to process chat request',
      details: error.message || 'Unknown error'
    });
  }
}
