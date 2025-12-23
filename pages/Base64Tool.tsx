
import React, { useState } from 'react';
import ToolTemplate from '../components/ToolTemplate';
import CodeArea from '../components/CodeArea';

const Base64Tool: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleEncode = () => {
    try {
      if (!input.trim()) return;
      setOutput(btoa(input));
      setError(null);
    } catch (e) {
      setError("Encoding failed. Ensure text contains valid characters.");
      setOutput('');
    }
  };

  const handleDecode = () => {
    try {
      if (!input.trim()) return;
      setOutput(atob(input));
      setError(null);
    } catch (e) {
      setError("Invalid Base64 string. Decoding failed.");
      setOutput('');
    }
  };

  const faq = [
    { q: "What is Base64 used for?", a: "It's commonly used to encode binary data (like images) into text for easy transmission over text-based protocols like HTTP." },
    { q: "Can I encode non-ASCII characters?", a: "Base64 usually works with 8-bit bytes. For UTF-8, you might need extra encoding steps before converting to Base64." }
  ];

  return (
    <ToolTemplate 
      title="Base64 Encoder & Decoder" 
      description="Easily convert text strings into Base64 format or decode existing Base64 back into human-readable text."
      faq={faq}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <CodeArea 
          label="Input" 
          value={input} 
          onChange={setInput} 
          placeholder="Enter text to encode or Base64 to decode..."
        />
        <div className="relative">
          <CodeArea 
            label="Result" 
            value={output} 
            readOnly 
            placeholder="Result will appear here"
          />
          {error && (
            <div className="absolute bottom-4 left-4 right-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-xs font-mono">
              <i className="fas fa-exclamation-circle mr-2"></i> {error}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mt-8">
        <button onClick={handleEncode} className="px-8 py-3 bg-gradient-to-r from-brand-500 to-glow-600 text-white font-bold rounded-xl shadow-lg shadow-brand-500/25 hover:-translate-y-0.5 transition-transform">Encode to Base64</button>
        <button onClick={handleDecode} className="px-8 py-3 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold hover:-translate-y-0.5 transition-transform shadow-sm">Decode from Base64</button>
        <button onClick={() => {setInput(''); setOutput(''); setError(null);}} className="px-8 py-3 border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl transition-all hover:border-brand-500 dark:hover:border-brand-400">Reset</button>
      </div>
    </ToolTemplate>
  );
};

export default Base64Tool;
