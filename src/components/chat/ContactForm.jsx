'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function ContactForm({
  dark = false,
  conversationSummary = '',
  potentialCharts = [],
  fileAnalysis = null
}) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (values) => {
    setErrorMessage('');

    const payload = { ...values };
    // Include conversation data for internal use (not shown to user)
    if (conversationSummary) payload.conversationSummary = conversationSummary;
    if (potentialCharts.length > 0) payload.potentialCharts = potentialCharts;
    if (fileAnalysis) payload.fileAnalysis = fileAnalysis;

    const response = await fetch('/api/submit-inquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      setErrorMessage('Something went wrong. Please try again.');
      return;
    }

    setIsSubmitted(true);
  };

  const inputClasses = dark
    ? 'w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-[#007AFF] focus:ring-2 focus:ring-[#007AFF]/20 transition-all'
    : 'glass-input w-full px-4 py-3';

  if (isSubmitted) {
    return (
      <div className={`p-6 rounded-2xl text-center ${dark ? 'bg-white/10 border border-white/20' : 'glass-card'}`}>
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#34C759]/20 flex items-center justify-center">
          <svg className="w-8 h-8 text-[#34C759]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className={`text-xl font-semibold mb-2 ${dark ? 'text-white' : ''}`}>Thanks for reaching out</h3>
        <p className={dark ? 'text-white/60' : 'text-apple-gray'}>We will follow up with a tailored proposal.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`p-6 rounded-2xl space-y-4 ${dark ? 'bg-white/5 border border-white/10' : 'glass-card'}`}>
      <h3 className={`text-lg font-semibold mb-4 ${dark ? 'text-white' : ''}`}>Get Your Custom Proposal</h3>

      {/* Chart Suggestions Preview */}
      {potentialCharts.length > 0 && (
        <div className={`rounded-2xl border ${dark ? 'border-white/10 bg-white/5' : 'border-[#007AFF]/20 bg-[#007AFF]/5'} p-4`}>
          <div className="flex items-center gap-2 mb-3">
            <svg className={`w-5 h-5 ${dark ? 'text-[#007AFF]' : 'text-[#007AFF]'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <p className={`text-sm font-medium ${dark ? 'text-white' : 'text-gray-900'}`}>
              Based on our conversation, here are some charts we could build for you:
            </p>
          </div>
          <ul className={`space-y-1.5 mb-3 ${dark ? 'text-white/70' : 'text-gray-600'}`}>
            {potentialCharts.map((chart, idx) => (
              <li key={`${chart}-${idx}`} className="flex items-center gap-2 text-sm">
                <span className={`w-1.5 h-1.5 rounded-full ${dark ? 'bg-[#007AFF]' : 'bg-[#007AFF]'}`} />
                {chart}
              </li>
            ))}
          </ul>
          <p className={`text-xs ${dark ? 'text-white/50' : 'text-gray-500'} italic`}>
            This is just a starting point. Book a consultation and we will come prepared with a complete analysis and more tailored chart recommendations.
          </p>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <input
            {...register('name', { required: true })}
            className={inputClasses}
            placeholder="Full name"
            aria-invalid={errors.name ? 'true' : 'false'}
          />
          {errors.name && (
            <p className="text-xs text-red-400 mt-1">Name is required.</p>
          )}
        </div>
        <div>
          <input
            {...register('email', { required: true })}
            className={inputClasses}
            placeholder="Email"
            type="email"
            aria-invalid={errors.email ? 'true' : 'false'}
          />
          {errors.email && (
            <p className="text-xs text-red-400 mt-1">Email is required.</p>
          )}
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <input
          {...register('company')}
          className={inputClasses}
          placeholder="Company (optional)"
        />
        <input
          {...register('industry')}
          className={inputClasses}
          placeholder="Industry (optional)"
        />
      </div>
      <textarea
        {...register('message')}
        className={`${inputClasses} min-h-[100px] rounded-2xl`}
        placeholder="Anything else you want us to know?"
      />
      {errorMessage && (
        <p className="text-sm text-red-400">{errorMessage}</p>
      )}
      <button
        type="submit"
        className="w-full px-8 py-4 rounded-full bg-[#007AFF] text-white font-medium hover:bg-[#0051D5] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Sending...' : 'Send Request'}
      </button>
    </form>
  );
}
