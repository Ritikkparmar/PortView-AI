import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { resumeDetails } = await req.json();

  const apiKey = process.env.PROMPTREPO_API_KEY;
  const apiUrl = 'https://api.promptrepo.com/api/private/promptrepo-careerai-sheet1?suggest=10';
  console.log(resumeDetails);
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'x-api-key': `${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify([{
        Resume: resumeDetails
    }])
  });

  if (!response.ok) {
    return NextResponse.json({ error: 'Failed to fetch from promptrepo' }, { status: response.status });
  }

  const textData = await response.text();
  try {
    const jsonData = JSON.parse(textData);
    return NextResponse.json(jsonData);
  } catch (error) {
    console.error('Error parsing promptrepo response:', error);
    return NextResponse.json({ error: 'Invalid response format' }, { status: 500 });
  }
}