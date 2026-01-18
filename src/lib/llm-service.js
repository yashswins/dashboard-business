// Free Ollama Gateway API for production (no API key required for basic usage)
// Falls back to local Ollama for development
const OLLAMA_GATEWAY_URL = 'https://ollama-gateway.freeleakhub.com/v1/chat/completions';
const OLLAMA_GATEWAY_MODEL = process.env.OLLAMA_GATEWAY_MODEL || 'llama3.1:8b';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'llama3.1:8b';
const FALLBACK_MESSAGE = "Thanks for sharing! I'd love to help you create the perfect dashboard. Could you tell me more about what insights you're hoping to get from your data?";

export async function generateLLMResponse(systemPrompt, messages) {
  // Try free Ollama Gateway first (works in production without API key)
  try {
    return await callOllamaGateway(systemPrompt, messages);
  } catch (error) {
    console.error('Ollama Gateway error:', error);
  }

  // Fall back to local Ollama for development
  try {
    return await callOllama(systemPrompt, messages);
  } catch (error) {
    console.error('Local Ollama error (is it running?):', error);
    return FALLBACK_MESSAGE;
  }
}

async function callOllamaGateway(systemPrompt, messages) {
  const response = await fetch(OLLAMA_GATEWAY_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: OLLAMA_GATEWAY_MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages.map(m => ({ role: m.role, content: m.content }))
      ],
      stream: false,
      max_tokens: 500
    })
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => '');
    throw new Error(`Ollama Gateway request failed: ${response.status} ${errorText}`);
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
