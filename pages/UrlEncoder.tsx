import React, { useState } from 'react';
import ToolTemplate from '../components/ToolTemplate';
import CodeArea from '../components/CodeArea';

const UrlEncoder: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleEncode = () => {
    try {
      if (!input) return;
      setOutput(encodeURIComponent(input));
      setError(null);
    } catch (e: any) {
      setError(e.message || 'Encoding failed');
    }
  };

  const handleDecode = () => {
    try {
      if (!input) return;
      setOutput(decodeURIComponent(input));
      setError(null);
    } catch (e: any) {
      setError('Invalid encoded string');
    }
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
    setError(null);
  };

  const faq = [
    { q: 'When should I URL encode?', a: 'Use URL encoding for query params and path segments to ensure special characters are transmitted safely.' },
    { q: 'Is processing local?', a: 'Yes. Encoding and decoding are done entirely in your browser.' },
  ];

  return (
    <ToolTemplate
      title="URL Encoder / Decoder"
      description="Encode or decode URLs and query parameters instantly."
      faq={faq}
    >
      <div className="space-y-6">
        <CodeArea
          label="Input"
          value={input}
          onChange={setInput}
          placeholder="Paste text or encoded URL here"
        />
        <CodeArea
          label="Result"
          value={output}
          readOnly
          placeholder="Output will appear here"
        />

        {error && (
          <div className="p-3 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-xs font-mono">
            <i className="fas fa-exclamation-circle mr-2"></i>
            {error}
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          <button onClick={handleEncode} className="px-7 py-3 bg-gradient-to-r from-brand-500 to-glow-600 text-white font-bold rounded-xl shadow-lg shadow-brand-500/25 hover:-translate-y-0.5 transition-transform">Encode</button>
          <button onClick={handleDecode} className="px-7 py-3 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold hover:-translate-y-0.5 transition-transform shadow-sm">Decode</button>
          <button onClick={clearAll} className="px-7 py-3 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl transition-all hover:border-brand-500 dark:hover:border-brand-400">Clear</button>
        </div>
      </div>
    </ToolTemplate>
  );
};

export default UrlEncoder;
