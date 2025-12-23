import React, { useState } from 'react';
import ToolTemplate from '../components/ToolTemplate';
import CodeArea from '../components/CodeArea';

const minifyHtml = (html: string) => {
  return html
    .replace(/<!--[^]*?-->/g, '') // remove comments
    .replace(/\n+/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .replace(/>\s+</g, '><')
    .trim();
};

const HtmlMinifier: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleMinify = () => {
    if (!input.trim()) return;
    setOutput(minifyHtml(input));
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
  };

  const faq = [
    { q: 'What does this remove?', a: 'It strips comments, collapses whitespace, and removes gaps between tags. It keeps your actual markup intact.' },
    { q: 'Is this safe for inline scripts?', a: 'Simple whitespace removal is generally safe, but always test pages that include inline scripts or style tags.' },
  ];

  return (
    <ToolTemplate
      title="HTML Minifier"
      description="Collapse whitespace and remove comments from HTML for leaner payloads."
      faq={faq}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <CodeArea label="Input HTML" value={input} onChange={setInput} placeholder="Paste HTML to minify" />
        <CodeArea label="Minified Output" value={output} readOnly placeholder="Minified HTML will appear here" />
      </div>

      <div className="flex flex-wrap gap-3 mt-8">
        <button onClick={handleMinify} className="px-8 py-3 bg-gradient-to-r from-brand-500 to-glow-600 text-white font-bold rounded-xl shadow-lg shadow-brand-500/25 hover:-translate-y-0.5 transition-transform">Minify HTML</button>
        <button onClick={clearAll} className="px-8 py-3 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl transition-all hover:border-brand-500 dark:hover:border-brand-400">Clear</button>
      </div>
    </ToolTemplate>
  );
};

export default HtmlMinifier;
