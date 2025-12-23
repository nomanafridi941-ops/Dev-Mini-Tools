import React, { useState } from 'react';
import ToolTemplate from '../components/ToolTemplate';
import CodeArea from '../components/CodeArea';

const minifyJs = async (code: string) => {
  // @ts-expect-error CDN import without types
  const terser = (await import('https://esm.sh/terser@5.31.6')) as any;
  const result = await terser.minify(code);
  if (result.error) throw result.error;
  return result.code || '';
};

const JsMinifier: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleMinify = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const minified = await minifyJs(input);
      setOutput(minified);
      setError(null);
    } catch (e: any) {
      setError(e.message || 'Minification failed');
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
    { q: 'Which minifier?', a: 'Uses Terser loaded on-demand from CDN to compress JavaScript.' },
    { q: 'Does code leave my device?', a: 'No. Minification runs locally after Terser is fetched.' },
  ];

  return (
    <ToolTemplate
      title="JavaScript Minifier"
      description="Minify JavaScript with Terser directly in your browser."
      faq={faq}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <CodeArea label="Input JS" value={input} onChange={setInput} placeholder="Paste JS to minify" />
        <CodeArea label="Minified Output" value={output} readOnly placeholder="Minified code will appear here" />
      </div>

      <div className="flex flex-wrap gap-3 mt-8 items-center">
        <button onClick={handleMinify} disabled={loading} className="px-8 py-3 bg-gradient-to-r from-brand-500 to-glow-600 text-white font-bold rounded-xl shadow-lg shadow-brand-500/25 hover:-translate-y-0.5 transition-transform disabled:opacity-60">
          {loading ? 'Minifying…' : 'Minify'}
        </button>
        <button onClick={clearAll} className="px-8 py-3 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl transition-all hover:border-brand-500 dark:hover:border-brand-400">Clear</button>
        <span className="text-xs text-slate-500">Terser loads from CDN on first run.</span>
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

export default JsMinifier;
