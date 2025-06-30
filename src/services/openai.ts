interface SummarizeRequest {
  text: string;
  length?: 'short' | 'medium' | 'long';
}

export async function summarizeText({ text, length = 'medium' }: SummarizeRequest): Promise<string> {
  const lengthPrompts = {
    short: 'Provide a brief 2-3 sentence summary.',
    medium: 'Provide a comprehensive summary in 1-2 paragraphs.',
    long: 'Provide a detailed summary with key points and insights.'
  };

  const response = await fetch('https://thisisoajo.openai.azure.com/openai/deployments/gpt-4o/chat/completions?api-version=2023-06-01-preview', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': '9I4UEJweVUdih04Uv8AXcAxs5H8jSQRfwaugcSQYHcI882wSpFvqJQQJ99BAACL93NaXJ3w3AAABACOGkv4f'
    },
    body: JSON.stringify({
      messages: [
        {
          role: 'system',
          content: `You are an educational assistant that creates clear, engaging summaries for students. Focus on key concepts, important details, and educational value. ${lengthPrompts[length]}`
        },
        {
          role: 'user',
          content: `Please summarize this educational content:\n\n${text}`
        }
      ],
      max_tokens: length === 'short' ? 150 : length === 'medium' ? 500 : 800,
      temperature: 0.7
    })
  });

  if (!response.ok) {
    throw new Error('Failed to generate summary');
  }

  const data = await response.json();
  return data.choices[0].message.content;
}