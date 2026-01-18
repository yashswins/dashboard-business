// Groq API for fast, free LLM inference
// Get your free API key at https://console.groq.com
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL = process.env.GROQ_MODEL || 'llama-3.1-8b-instant';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'llama3.1:8b';
const FALLBACK_MESSAGE = "Thanks for sharing! I'd love to help you create the perfect dashboard. Could you tell me more about what insights you're hoping to get from your data?";

export async function generateLLMResponse(systemPrompt, messages) {
  // Use Groq API if key is available (free tier, fast)
  if (process.env.GROQ_API_KEY) {
    try {
      return await callGroq(systemPrompt, messages);
    } catch (error) {
      console.error('Groq API error:', error);
    }
  }

  // Fall back to local Ollama for development
  try {
    return await callOllama(systemPrompt, messages);
  } catch (error) {
    console.error('Local Ollama error (is it running?):', error);
    return FALLBACK_MESSAGE;
  }
}

async function callGroq(systemPrompt, messages) {
  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages.map(m => ({ role: m.role, content: m.content }))
      ],
      max_tokens: 500,
      temperature: 0.7
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error('Groq API error:', response.status, errorData);
    throw new Error(`Groq request failed: ${response.status}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || FALLBACK_MESSAGE;
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
