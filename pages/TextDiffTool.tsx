import React, { useState } from 'react';
import ToolTemplate from '../components/ToolTemplate';
import CodeArea from '../components/CodeArea';

const diffLines = async (a: string, b: string) => {
  // @ts-expect-error CDN import without types
  const diff = (await import('https://esm.sh/diff@5.2.0')) as any;
  return diff.diffLines(a, b);
};

const TextDiffTool: React.FC = () => {
  const [left, setLeft] = useState('');
  const [right, setRight] = useState('');
  const [result, setResult] = useState<Array<{ added?: boolean; removed?: boolean; value: string }>>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleDiff = async () => {
    setLoading(true);
    try {
      const diffs = await diffLines(left, right);
      setResult(diffs as any);
      setError(null);
    } catch (e: any) {
      setError(e.message || 'Diff failed');
      setResult([]);
    } finally {
      setLoading(false);
    }
  };

  const clearAll = () => {
    setLeft('');
    setRight('');
    setResult([]);
    setError(null);
  };

  const faq = [
    { q: 'What comparison?', a: 'Line-by-line diff using the diff package loaded on-demand from CDN.' },
    { q: 'Is content sent anywhere?', a: 'No. Diffing runs locally after the library loads.' },
  ];

  return (
    <ToolTemplate
      title="Text Difference Checker"
      description="Compare two text blocks and highlight additions/removals."
      faq={faq}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <CodeArea label="Left" value={left} onChange={setLeft} placeholder="Original text" />
        <CodeArea label="Right" value={right} onChange={setRight} placeholder="Modified text" />
      </div>

      <div className="flex flex-wrap gap-3 mt-8 items-center">
        <button onClick={handleDiff} disabled={loading} className="px-8 py-3 bg-gradient-to-r from-brand-500 to-glow-600 text-white font-bold rounded-xl shadow-lg shadow-brand-500/25 hover:-translate-y-0.5 transition-transform disabled:opacity-60">{loading ? 'Diffing…' : 'Diff'}</button>
        <button onClick={clearAll} className="px-8 py-3 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl transition-all hover:border-brand-500 dark:hover:border-brand-400">Clear</button>
        <span className="text-xs text-slate-500">Library loads from CDN on first run.</span>
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-xs font-mono">
          <i className="fas fa-exclamation-triangle mr-2"></i>
          {error}
        </div>
      )}

      <div className="mt-8 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/85 dark:bg-slate-950/85 min-h-[180px] font-mono text-sm whitespace-pre-wrap leading-relaxed">
        {result.length === 0 ? (
          <span className="text-slate-400">Diff will appear here…</span>
        ) : (
          result.map((part: any, idx: number) => (
            <span
              key={idx}
              className={
                part.added
                  ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200'
                  : part.removed
                  ? 'bg-rose-100 dark:bg-rose-900/40 text-rose-800 dark:text-rose-200'
                  : 'text-slate-900 dark:text-slate-100'
              }
            >
              {part.value}
            </span>
          ))
        )}
      </div>
    </ToolTemplate>
  );
};

export default TextDiffTool;
