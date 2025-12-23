import React, { useState } from 'react';
import ToolTemplate from '../components/ToolTemplate';
import CodeArea from '../components/CodeArea';

const encodeHtml = (str: string) => {
  const div = document.createElement('div');
  div.innerText = str;
  return div.innerHTML;
};

const decodeHtml = (str: string) => {
  const div = document.createElement('div');
  div.innerHTML = str;
  return div.innerText;
};

const HtmlEncoder: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleEncode = () => {
    if (!input) return;
    setOutput(encodeHtml(input));
  };

  const handleDecode = () => {
    if (!input) return;
    setOutput(decodeHtml(input));
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
  };

  const faq = [
    { q: 'When to encode?', a: 'Encode when inserting user-provided text into HTML to avoid unintended tags and XSS.' },
    { q: 'Is it local?', a: 'Yes, encoding/decoding happens entirely in your browser.' },
  ];

  return (
    <ToolTemplate
      title="HTML Encode / Decode"
      description="Safely convert text to HTML entities or decode them back."
      faq={faq}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <CodeArea label="Input" value={input} onChange={setInput} placeholder="Paste text or entities" />
        <CodeArea label="Result" value={output} readOnly placeholder="Result will appear here" />
      </div>

      <div className="flex flex-wrap gap-3 mt-8">
        <button onClick={handleEncode} className="px-7 py-3 bg-gradient-to-r from-brand-500 to-glow-600 text-white font-bold rounded-xl shadow-lg shadow-brand-500/25 hover:-translate-y-0.5 transition-transform">Encode</button>
        <button onClick={handleDecode} className="px-7 py-3 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold hover:-translate-y-0.5 transition-transform shadow-sm">Decode</button>
        <button onClick={clearAll} className="px-7 py-3 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl transition-all hover:border-brand-500 dark:hover:border-brand-400">Clear</button>
      </div>
    </ToolTemplate>
  );
};

export default HtmlEncoder;
