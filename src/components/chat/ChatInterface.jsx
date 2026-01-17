'use client';

import { useMemo, useState } from 'react';
import MessageBubble from './MessageBubble';
import FileUpload from './FileUpload';
import ContactForm from './ContactForm';

const INITIAL_MESSAGE = {
  role: 'assistant',
  content: "Hi! I'm here to help you explore what kind of custom dashboard we can build for your business.\n\nTo get started, could you tell me:\n1. What industry or business area are you in?\n2. What kind of data do you currently have?"
};

const DEFAULT_CHARTS = [
  'KPI summary cards',
  'Time series trend',
  'Category comparison bar chart',
  'Top performers ranking',
  'Variance or budget vs actual view'
];

const SUMMARY_IGNORE_PATTERN = /^uploaded a sample data file/i;

const normalizeText = (value) => (value || '').replace(/\s+/g, ' ').trim();

const truncateText = (value, maxLength) => {
  if (!value || value.length <= maxLength) return value;
  return value.slice(0, Math.max(0, maxLength - 3)) + '...';
};

const uniqueList = (items) => Array.from(new Set(items.filter(Boolean)));

const getUserMessages = (messages) => messages
  .filter((msg) => msg.role === 'user')
  .map((msg) => normalizeText(msg.content))
  .filter((text) => text && !SUMMARY_IGNORE_PATTERN.test(text));

const buildConversationSummary = (messages, fileAnalysis) => {
  const userMessages = getUserMessages(messages);
  const summaryLines = [];

  if (userMessages.length) {
    const condensed = truncateText(userMessages.slice(-3).join(' | '), 260);
    summaryLines.push(`Client notes: ${condensed}`);
  }

  if (fileAnalysis?.rowCount && fileAnalysis?.columnCount) {
    summaryLines.push(`Data snapshot: ${fileAnalysis.rowCount} rows, ${fileAnalysis.columnCount} columns.`);
  }

  if (!summaryLines.length) return '';
  return summaryLines.join('\n');
};

const inferChartsFromConversation = (messages) => {
  const text = getUserMessages(messages).join(' ').toLowerCase();
  if (!text) return [];

  const charts = [];
  if (/(trend|over time|time series|monthly|weekly|daily|timeline)/.test(text)) {
    charts.push('Time series trend');
  }
  if (/(category|segment|breakdown|by channel|by region|compare)/.test(text)) {
    charts.push('Category comparison bar chart');
  }
  if (/(region|geo|location|country|city)/.test(text)) {
    charts.push('Geo distribution map');
  }
  if (/(conversion|funnel|pipeline|drop-off)/.test(text)) {
    charts.push('Conversion funnel');
  }
  if (/(retention|churn|cohort)/.test(text)) {
    charts.push('Cohort or retention analysis');
  }
  if (/(budget|variance|actual|forecast)/.test(text)) {
    charts.push('Variance or budget vs actual view');
  }

  return charts;
};

const buildPotentialCharts = (messages, fileAnalysis) => {
  if (Array.isArray(fileAnalysis?.recommendations) && fileAnalysis.recommendations.length) {
    return fileAnalysis.recommendations.map((rec) =>
      `${rec.type}${rec.description ? ` - ${rec.description}` : ''}`
    );
  }

  const inferred = inferChartsFromConversation(messages);
  const combined = uniqueList([...inferred, ...DEFAULT_CHARTS]);
  return combined.slice(0, 5);
};

export default function ChatInterface() {
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [conversationStage, setConversationStage] = useState('introduction');
  const [fileAnalysis, setFileAnalysis] = useState(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isFinalStage = showContactForm || conversationStage === 'lead_capture';
  const hasConversation = messages.some((message) => message.role === 'user');
  const conversationSummary = useMemo(
    () => (hasConversation ? buildConversationSummary(messages, fileAnalysis) : ''),
    [messages, fileAnalysis, hasConversation]
  );
  const potentialCharts = useMemo(
    () => (hasConversation ? buildPotentialCharts(messages, fileAnalysis) : []),
    [messages, fileAnalysis, hasConversation]
  );

  const handleSkipToContact = () => {
    if (isFinalStage) return;
    setMessages(prev => [
      ...prev,
      { role: 'assistant', content: 'No problem — share your details below and we will follow up shortly.' }
    ]);
    setConversationStage('lead_capture');
    setShowContactForm(true);
  };

  const sendChat = async (payload) => {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error('Chat request failed');
    }

    return response.json();
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input.trim() };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput('');
    setIsLoading(true);

    try {
      const data = await sendChat({
        messages: nextMessages,
        stage: conversationStage,
        fileAnalysis
      });

      setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
      setConversationStage(data.nextStage);

      if (data.showContactForm) {
        setShowContactForm(true);
      }
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Sorry, I couldn't respond just now. Please try again."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (file) => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/analyze-file', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('File analysis failed');
      }

      const analysis = await response.json();
      setFileAnalysis(analysis);

      const uploadMessage = {
        role: 'user',
        content: 'Uploaded a sample data file for analysis.'
      };

      const nextMessages = [...messages, uploadMessage];
      setMessages(nextMessages);

      const data = await sendChat({
        messages: nextMessages,
        stage: 'file_analysis',
        fileAnalysis: analysis
      });

      setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
      setConversationStage(data.nextStage);

      if (data.showContactForm) {
        setShowContactForm(true);
      }
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Sorry, I couldn't analyze that file. Please try again."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass-card-dark p-6 md:p-8 rounded-3xl">
      {/* Messages */}
      <div className="space-y-4 mb-6 min-h-[400px] max-h-[500px] overflow-y-auto pr-2 scrollbar-thin">
        {messages.map((msg, idx) => (
          <MessageBubble key={idx} message={msg} dark />
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white/10 backdrop-blur-sm px-4 py-3 rounded-2xl">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* File Upload (show when appropriate) */}
      {conversationStage === 'file_upload' && !fileAnalysis && (
        <div className="mb-6">
          <FileUpload onFileSelect={handleFileUpload} dark />
        </div>
      )}

      {/* Contact Form (show at end) */}
      {isFinalStage && (
        <div className="mb-6">
          <ContactForm
            dark
            conversationSummary={conversationSummary}
            potentialCharts={potentialCharts}
          />
        </div>
      )}

      {/* Input */}
      {!isFinalStage && (
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
            placeholder="Type your message..."
            className="flex-1 px-5 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-[#007AFF] focus:ring-2 focus:ring-[#007AFF]/20 transition-all"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            className="px-8 py-4 rounded-full bg-[#007AFF] text-white font-medium hover:bg-[#0051D5] disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
            disabled={isLoading || !input.trim()}
          >
            Send
          </button>
        </div>
      )}

      {!isFinalStage && (
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70">
          <span>Prefer to skip the chat?</span>
          <button
            type="button"
            onClick={handleSkipToContact}
            className="px-4 py-2 rounded-full border border-white/20 bg-white/10 text-white text-sm font-medium hover:bg-white/20 transition"
          >
            Go straight to the contact form
          </button>
        </div>
      )}
    </div>
  );
}
