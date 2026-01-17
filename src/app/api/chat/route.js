import { NextResponse } from 'next/server';
import { generateLLMResponse } from '@/lib/llm-service';
import { generateRecommendations } from '@/lib/dashboard-recommender';

export async function POST(request) {
  const { messages = [], stage = 'introduction', fileAnalysis = null } = await request.json();
  const lastUserMessage = getLastUserMessage(messages);
  const uploadIntent = ['data_offer', 'file_upload'].includes(stage) ? getUploadIntent(lastUserMessage) : null;

  const recommendations = fileAnalysis ? generateRecommendations(fileAnalysis) : [];
  const systemPrompt = getSystemPrompt(stage, fileAnalysis, recommendations, uploadIntent);

  // Call LLM (Ollama or OpenAI)
  const llmResponse = await generateLLMResponse(systemPrompt, messages);

  const nextStage = getNextStage(stage, Boolean(fileAnalysis), uploadIntent);
  const showContactForm = nextStage === 'lead_capture';

  return NextResponse.json({ message: llmResponse, nextStage, showContactForm });
}

function getNextStage(stage, hasFileAnalysis, uploadIntent) {
  if (stage === 'introduction') return 'data_discovery';
  if (stage === 'data_discovery') return 'data_offer';
  if (stage === 'data_offer') {
    if (uploadIntent === 'yes') return 'file_upload';
    if (uploadIntent === 'no') return 'lead_capture';
    return 'data_offer';
  }
  if (stage === 'file_upload') {
    if (uploadIntent === 'no') return 'lead_capture';
    return hasFileAnalysis ? 'file_analysis' : 'file_upload';
  }
  if (stage === 'file_analysis') return 'recommendation';
  if (stage === 'recommendation') return 'lead_capture';
  return stage;
}

function getSystemPrompt(stage, fileAnalysis, recommendations, uploadIntent) {
  const prompts = {
    introduction: `You are a helpful business analyst assistant for a custom dashboard development company.
Your job is to understand the client's industry and data in a conversational, friendly way.
Keep responses concise (2-3 sentences). Ask one clear question at a time.`,

    data_discovery: `You are helping a potential client articulate their dashboard requirements.
Ask about what insights they want from their data and what decisions they need to make.
Keep it conversational. Don't use technical jargon unless they do first.`,

    data_offer: `Offer a quick, optional data check. Ask: "Would you like to upload a sample data file for a quick analysis?"
If the user says yes, acknowledge and tell them to upload the file below in one short sentence.
If the user says no, provide a brief, high-level recommendation and end with: "You can contact us to go deeper."`,

    file_analysis: `You have analyzed the client's data file. The analysis shows:
${JSON.stringify(fileAnalysis, null, 2)}

Provide a brief, plain-language summary (2-3 bullet points max).
Keep it short and practical, and end with: "You can contact us to go deeper."`,

    recommendation: `Provide a structured recommendation based on the conversation.
Include: key visualizations, suggested KPIs, interactive features, and estimated timeline.
End by recommending they contact us to learn more.

Structured hints (optional):
${JSON.stringify(recommendations, null, 2)}`
  };

  if (stage === 'file_upload' && uploadIntent === 'no') {
    return `The client declined to upload a file.
Provide a brief, high-level recommendation based on the conversation (2-3 sentences max).
End with: "You can contact us to go deeper."`;
  }

  return prompts[stage] || prompts.introduction;
}

function getLastUserMessage(messages) {
  for (let idx = messages.length - 1; idx >= 0; idx -= 1) {
    if (messages[idx]?.role === 'user') {
      return messages[idx].content || '';
    }
  }
  return '';
}

function getUploadIntent(message) {
  const text = (message || '').toLowerCase();
  if (!text.trim()) return null;

  const yesPattern = /\b(yes|yeah|yep|sure|ok|okay|upload|send|share|attach)\b/;
  const noPattern = /\b(no|nah|nope|not now|skip|later|don't|do not)\b/;

  if (yesPattern.test(text)) return 'yes';
  if (noPattern.test(text)) return 'no';
  return null;
}
