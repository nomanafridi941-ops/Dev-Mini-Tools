
import React, { useState } from 'react';
import ToolTemplate from '../components/ToolTemplate';
import CodeArea from '../components/CodeArea';

const CssMinifier: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [stats, setStats] = useState<{ original: number; minified: number } | null>(null);

  const minifyCss = () => {
    if (!input.trim()) return;
    
    // Simple but effective CSS minification logic
    const minified = input
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
      .replace(/\s+/g, ' ')             // Collapse whitespace
      .replace(/\s*([{}:;,])\s*/g, '$1') // Remove spaces around syntax characters
      .replace(/;}/g, '}')              // Remove final semicolon
      .trim();

    setOutput(minified);
    setStats({
      original: new Blob([input]).size,
      minified: new Blob([minified]).size
    });
  };

  const faq = [
    { q: "How much space can I save?", a: "Typically 15-30% depending on how many comments and how much whitespace your original file has." },
    { q: "Is the output valid CSS?", a: "Yes, our tool only removes non-functional characters. Your styles will look the same in the browser." }
  ];

  const savings = stats ? Math.round((1 - stats.minified / stats.original) * 100) : 0;

  return (
    <ToolTemplate 
      title="CSS Minifier" 
      description="Compress your CSS files for production. Remove unnecessary comments and whitespace to speed up your website."
      faq={faq}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <CodeArea 
          label="Input CSS" 
          value={input} 
          onChange={setInput} 
          placeholder="Paste your CSS styles here..."
        />
        <CodeArea 
          label="Minified Output" 
          value={output} 
          readOnly 
          placeholder="Minified CSS will appear here"
        />
      </div>

      <div className="flex flex-wrap items-center gap-6 mt-8">
        <button onClick={minifyCss} className="px-8 py-3 bg-gradient-to-r from-brand-500 to-glow-600 text-white font-bold rounded-xl shadow-lg shadow-brand-500/25 hover:-translate-y-0.5 transition-transform">Minify CSS</button>
        {stats && (
          <div className="flex items-center gap-4 text-sm font-medium">
            <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full">
              Reduced by {savings}%
            </span>
            <span className="text-slate-500 dark:text-slate-400">{stats.original}B → {stats.minified}B</span>
          </div>
        )}
      </div>
    </ToolTemplate>
  );
};

export default CssMinifier;
