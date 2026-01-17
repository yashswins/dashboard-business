'use client';

export default function MessageBubble({ message, dark = false }) {
  const isUser = message.role === 'user';

  if (dark) {
    return (
      <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
        <div className={`px-4 py-3 rounded-2xl max-w-[80%] ${
          isUser
            ? 'bg-[#007AFF] text-white'
            : 'bg-white/10 backdrop-blur-sm border border-white/10 text-white/90'
        }`}>
          <p className="whitespace-pre-line text-sm leading-relaxed">
            {message.content}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`glass-card px-4 py-3 rounded-2xl max-w-[80%] ${isUser ? 'bg-white/90' : ''}`}>
        <p className="whitespace-pre-line text-sm text-apple-text">
          {message.content}
        </p>
      </div>
    </div>
  );
}
