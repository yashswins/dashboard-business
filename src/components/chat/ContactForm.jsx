'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function ContactForm({
  dark = false,
  conversationSummary = '',
  potentialCharts = []
}) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const hasConversationNotes = Boolean(conversationSummary) || potentialCharts.length > 0;

  const onSubmit = async (values) => {
    setErrorMessage('');

    const payload = { ...values };
    if (conversationSummary) payload.conversationSummary = conversationSummary;
    if (potentialCharts.length > 0) payload.potentialCharts = potentialCharts;

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

      {hasConversationNotes && (
        <div className={`rounded-2xl border ${dark ? 'border-white/10 bg-white/5' : 'border-black/5 bg-white'} p-4 text-sm`}>
          <p className={`text-xs uppercase tracking-[0.25em] ${dark ? 'text-white/50' : 'text-apple-gray'}`}>Conversation notes</p>
          {conversationSummary && (
            <p className={`mt-2 whitespace-pre-line ${dark ? 'text-white/70' : 'text-apple-gray'}`}>
              {conversationSummary}
            </p>
          )}
          {potentialCharts.length > 0 && (
            <div className="mt-3">
              <p className={`text-xs uppercase tracking-[0.2em] ${dark ? 'text-white/50' : 'text-apple-gray'}`}>
                Potential charts
              </p>
              <ul className={`mt-2 list-disc list-inside space-y-1 ${dark ? 'text-white/60' : 'text-apple-gray'}`}>
                {potentialCharts.map((chart, idx) => (
                  <li key={`${chart}-${idx}`}>{chart}</li>
                ))}
              </ul>
            </div>
          )}
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
