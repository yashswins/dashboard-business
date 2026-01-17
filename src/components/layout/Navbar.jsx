'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-6 pt-5">
        <div className="relative rounded-3xl md:rounded-full border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
          <div className="absolute inset-0 rounded-3xl md:rounded-full bg-gradient-to-r from-[#007AFF]/20 via-transparent to-[#34C759]/20 opacity-70 pointer-events-none" />
          <div className="relative flex items-center justify-between px-5 md:px-6 py-4">
            <Link href="/" className="flex items-center gap-3 text-white">
              <div className="leading-tight">
                <span className="text-lg font-semibold">BluWeave</span>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-8 text-sm text-white/70">
              <Link href="/#value" className="hover:text-white transition">Value</Link>
              <Link href="/#samples" className="hover:text-white transition">Samples</Link>
              <Link href="/#process" className="hover:text-white transition">Process</Link>
            </div>

            <div className="hidden md:flex items-center gap-3">
              <Link href="/chat" className="px-5 py-2.5 rounded-full bg-[#007AFF] text-white text-sm font-medium shadow-lg hover:bg-[#0051D5] transition">
                Consultation
              </Link>
            </div>

            <button
              className="md:hidden text-white"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {isOpen && (
            <div className="md:hidden px-5 pb-5">
              <div className="grid gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl text-white/80">
                <Link href="/#value" className="hover:text-white transition" onClick={() => setIsOpen(false)}>
                  Value
                </Link>
                <Link href="/#samples" className="hover:text-white transition" onClick={() => setIsOpen(false)}>
                  Samples
                </Link>
                <Link href="/#process" className="hover:text-white transition" onClick={() => setIsOpen(false)}>
                  Process
                </Link>
                <Link href="/chat" className="mt-2 px-5 py-3 rounded-full bg-[#007AFF] text-white text-sm font-medium text-center" onClick={() => setIsOpen(false)}>
                  Consultation
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
