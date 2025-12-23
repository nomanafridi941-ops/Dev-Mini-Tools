import React, { useState } from 'react';
import ToolTemplate from '../components/ToolTemplate';
import CodeArea from '../components/CodeArea';

// Simple formatter: ensures newlines and indentation
const formatCss = (css: string) => {
  const cleaned = css.replace(/\s+/g, ' ').replace(/\s*([{};:,])\s*/g, '$1').trim();
  let depth = 0;
  return cleaned
    .split('')
    .reduce<{ out: string; buffer: string[] }>(({ out, buffer }, ch) => {
      buffer.push(ch);
      if (ch === '{') {
        depth += 1;
        out += buffer.join('').trim() + '\n' + '  '.repeat(depth);
        buffer = [];
      } else if (ch === ';') {
        out += buffer.join('').trim() + '\n' + '  '.repeat(depth);
        buffer = [];
      } else if (ch === '}') {
        depth = Math.max(depth - 1, 0);
        out = out.trimEnd() + '\n' + '  '.repeat(depth) + '}\n' + '  '.repeat(depth);
        buffer = [];
      }
      return { out, buffer };
    }, { out: '', buffer: [] })
    .out
    .replace(/\n{2,}/g, '\n')
    .trim();
};

const CssFormatter: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleFormat = () => {
    if (!input.trim()) return;
    setOutput(formatCss(input));
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
  };

  const faq = [
    { q: 'How smart is this formatter?', a: 'It is a lightweight formatter that indents blocks and puts rules on new lines—great for quick cleanup.' },
    { q: 'Does it support nested rules?', a: 'It works for standard CSS; for complex nesting (e.g., SCSS), results may vary.' },
  ];

  return (
    <ToolTemplate
      title="CSS Formatter"
      description="Quickly format messy CSS with indentation and clean line breaks."
      faq={faq}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <CodeArea label="Input CSS" value={input} onChange={setInput} placeholder="Paste CSS to format" />
        <CodeArea label="Formatted CSS" value={output} readOnly placeholder="Formatted CSS will appear here" />
      </div>

      <div className="flex flex-wrap gap-3 mt-8">
        <button onClick={handleFormat} className="px-8 py-3 bg-gradient-to-r from-brand-500 to-glow-600 text-white font-bold rounded-xl shadow-lg shadow-brand-500/25 hover:-translate-y-0.5 transition-transform">Format CSS</button>
        <button onClick={clearAll} className="px-8 py-3 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl transition-all hover:border-brand-500 dark:hover:border-brand-400">Clear</button>
      </div>
    </ToolTemplate>
  );
};

export default CssFormatter;
