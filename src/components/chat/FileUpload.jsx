'use client';

import { useRef, useState } from 'react';

export default function FileUpload({ onFileSelect, dark = false }) {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = (files) => {
    if (!files || !files[0]) return;
    onFileSelect(files[0]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    handleFiles(event.dataTransfer.files);
  };

  const baseClasses = dark
    ? 'bg-white/5 border-white/20 hover:border-[#007AFF]/50'
    : 'glass-card border-apple-blue/30';

  const activeClasses = dark
    ? 'border-[#007AFF] bg-[#007AFF]/10'
    : 'border-apple-blue bg-apple-blue/10';

  return (
    <div
      onDragOver={(event) => {
        event.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={(event) => {
        event.preventDefault();
        setIsDragging(false);
      }}
      onDrop={handleDrop}
      className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
        isDragging ? activeClasses : baseClasses
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".csv,.xls,.xlsx"
        className="hidden"
        onChange={(event) => handleFiles(event.target.files)}
      />

      <div className="mb-4">
        <svg className={`w-12 h-12 mx-auto ${dark ? 'text-white/40' : 'text-apple-gray'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      </div>

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className={`px-6 py-2 rounded-full font-medium transition-all ${
          dark
            ? 'bg-[#007AFF] text-white hover:bg-[#0051D5]'
            : 'btn-secondary'
        }`}
      >
        Upload File
      </button>
      <p className={`mt-3 text-sm ${dark ? 'text-white/50' : 'text-apple-gray'}`}>
        Drag and drop a CSV or Excel file, or click to browse.
      </p>
    </div>
  );
}
