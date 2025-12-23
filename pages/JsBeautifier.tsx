import React, { useState } from 'react';
import ToolTemplate from '../components/ToolTemplate';
import CodeArea from '../components/CodeArea';

const formatJs = async (code: string) => {
  // @ts-expect-error CDN import without types
  const prettier = (await import('https://esm.sh/prettier@3.2.5/standalone')) as any;
  // @ts-expect-error CDN import without types
  const babel = (await import('https://esm.sh/prettier@3.2.5/plugins/babel')) as any;
  return prettier.format(code, { parser: 'babel', plugins: [babel], semi: true, singleQuote: true });
};

const JsBeautifier: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleBeautify = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const formatted = await formatJs(input);
      setOutput(formatted);
      setError(null);
    } catch (e: any) {
      setError(e.message || 'Formatting failed');
      setOutput('');
    } finally {
      setLoading(false);
    }
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
    setError(null);
  };

  const faq = [
    { q: 'Which formatter?', a: 'Uses Prettier (babel parser) loaded on-demand from CDN.' },
    { q: 'Does code leave my browser?', a: 'No. Formatting happens locally after the formatter loads.' },
  ];

  return (
    <ToolTemplate
      title="JavaScript Beautifier"
      description="Prettify JavaScript/TypeScript with Prettier right in the browser."
      faq={faq}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <CodeArea label="Input JS/TS" value={input} onChange={setInput} placeholder="Paste JS/TS to format" />
        <CodeArea label="Beautified Output" value={output} readOnly placeholder="Formatted code will appear here" />
      </div>

      <div className="flex flex-wrap gap-3 mt-8 items-center">
        <button onClick={handleBeautify} disabled={loading} className="px-8 py-3 bg-gradient-to-r from-brand-500 to-glow-600 text-white font-bold rounded-xl shadow-lg shadow-brand-500/25 hover:-translate-y-0.5 transition-transform disabled:opacity-60">
          {loading ? 'Formatting…' : 'Beautify'}
        </button>
        <button onClick={clearAll} className="px-8 py-3 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl transition-all hover:border-brand-500 dark:hover:border-brand-400">Clear</button>
        <span className="text-xs text-slate-500">Formatter loads from CDN on first run.</span>
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-xs font-mono">
          <i className="fas fa-exclamation-triangle mr-2"></i>
          {error}
        </div>
      )}
    </ToolTemplate>
  );
};

export default JsBeautifier;
