// Support both Ollama (local) and OpenAI (production)
// Available local models: gemma3:12b, llama3.1:8b, deepseek-r1:14b, gpt-oss:20b
// llama3.1:8b is recommended for conversational tasks - good balance of speed and quality
const USE_OPENAI = process.env.USE_OPENAI === 'true';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'llama3.1:8b';
const FALLBACK_MESSAGE = "Thanks for the details. We'll review and follow up with a tailored dashboard proposal.";

export async function generateLLMResponse(systemPrompt, messages) {
  try {
    if (USE_OPENAI && process.env.OPENAI_API_KEY) {
      return await callOpenAI(systemPrompt, messages);
    }
    return await callOllama(systemPrompt, messages);
  } catch (error) {
    console.error('LLM error:', error);
    return FALLBACK_MESSAGE;
  }
}

async function callOllama(systemPrompt, messages) {
  // Use chat endpoint for better conversation handling
  const response = await fetch('http://localhost:11434/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: OLLAMA_MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages.map(m => ({ role: m.role, content: m.content }))
      ],
      stream: false,
      options: {
        temperature: 0.7,
        num_predict: 500
      }
    })
  });

  if (!response.ok) {
    throw new Error('Ollama request failed');
  }

  const data = await response.json();
  return data.message?.content || FALLBACK_MESSAGE;
}

async function callOpenAI(systemPrompt, messages) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages
      ],
      temperature: 0.7,
      max_tokens: 500
    })
  });

  if (!response.ok) {
    throw new Error('OpenAI request failed');
  }

  const data = await response.json();
  return data.choices[0].message.content;
}
