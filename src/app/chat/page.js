'use client';

import ChatInterface from '@/components/chat/ChatInterface';

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f23] via-[#1a1a3e] to-[#0d1b2a] pt-32 pb-12 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#007AFF] rounded-full mix-blend-multiply filter blur-[128px] opacity-10" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#5856D6] rounded-full mix-blend-multiply filter blur-[128px] opacity-10" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
            <svg className="w-4 h-4 text-[#34C759]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="text-sm text-white/80">AI-Powered Consultation</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mb-4">
            <span className="bg-gradient-to-b from-white via-white to-white/60 bg-clip-text text-transparent">
              Let&apos;s Build Your
            </span>
            <br />
            <span className="bg-gradient-to-r from-[#007AFF] via-[#5856D6] to-[#34C759] bg-clip-text text-transparent">
              Perfect Dashboard
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            Tell us about your data and business needs. Our AI assistant will help design
            the perfect analytics solution for you.
          </p>
        </div>

        {/* Chat Interface */}
        <ChatInterface />

        {/* Trust indicators */}
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-white/40 text-sm">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>Your data stays private</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Response in under 24 hours</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>No commitment required</span>
          </div>
        </div>
      </div>
    </div>
  );
}
