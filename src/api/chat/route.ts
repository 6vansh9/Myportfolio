export const maxDuration = 30;

export async function POST(req: Request) {
  const body = await req.json();
  const { messages } = body;

  const contents = messages.map((m: any) => ({
    role: m.role,
    content: m.content ?? m.parts?.map((p: any) => p.text).join('') ?? '',
  }));

  const res = await fetch('https://llm-provider.onrender.com/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents }),
  });

  const data = await res.json();
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  });
}
