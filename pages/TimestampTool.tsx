import React, { useState } from 'react';
import ToolTemplate from '../components/ToolTemplate';

const formatIso = (date: Date) => date.toISOString();

const TimestampTool: React.FC = () => {
  const [seconds, setSeconds] = useState('');
  const [iso, setIso] = useState('');
  const [millis, setMillis] = useState('');
  const [error, setError] = useState<string | null>(null);

  const convertFromSeconds = (value: string) => {
    const num = Number(value);
    if (!Number.isFinite(num)) throw new Error('Seconds must be a number');
    const date = new Date(num * 1000);
    if (isNaN(date.getTime())) throw new Error('Invalid seconds value');
    setIso(formatIso(date));
    setMillis(String(date.getTime()));
    setSeconds(String(Math.floor(date.getTime() / 1000)));
  };

  const convertFromIso = (value: string) => {
    const date = new Date(value);
    if (isNaN(date.getTime())) throw new Error('Invalid ISO date');
    setIso(formatIso(date));
    setMillis(String(date.getTime()));
    setSeconds(String(Math.floor(date.getTime() / 1000)));
  };

  const handleConvert = () => {
    try {
      if (seconds.trim()) {
        convertFromSeconds(seconds.trim());
        setError(null);
        return;
      }
      if (iso.trim()) {
        convertFromIso(iso.trim());
        setError(null);
        return;
      }
      if (millis.trim()) {
        const num = Number(millis.trim());
        if (!Number.isFinite(num)) throw new Error('Milliseconds must be numeric');
        const date = new Date(num);
        if (isNaN(date.getTime())) throw new Error('Invalid milliseconds value');
        setIso(formatIso(date));
        setMillis(String(date.getTime()));
        setSeconds(String(Math.floor(date.getTime() / 1000)));
        setError(null);
        return;
      }
      setError('Provide Unix seconds, milliseconds, or ISO date');
    } catch (e: any) {
      setError(e.message || 'Conversion failed');
    }
  };

  const handleNow = () => {
    const now = new Date();
    setIso(formatIso(now));
    setMillis(String(now.getTime()));
    setSeconds(String(Math.floor(now.getTime() / 1000)));
    setError(null);
  };

  const clearAll = () => {
    setIso('');
    setSeconds('');
    setMillis('');
    setError(null);
  };

  const faq = [
    { q: 'Which formats are supported?', a: 'Unix seconds, Unix milliseconds, and ISO 8601 strings. Enter any one and convert to the others.' },
    { q: 'Does this adjust timezone?', a: 'All values display in UTC using ISO 8601 format (e.g., 2025-12-23T10:00:00.000Z).' }
  ];

  return (
    <ToolTemplate
      title="Timestamp Converter"
      description="Convert between Unix seconds, milliseconds, and ISO 8601 instantly."
      faq={faq}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-[0.18em]">Unix Seconds</label>
            <input
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/90 text-slate-900 dark:text-slate-200 focus:ring-2 focus:ring-brand-500 outline-none"
              value={seconds}
              onChange={(e) => setSeconds(e.target.value)}
              placeholder="1703328000"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-[0.18em]">Unix Milliseconds</label>
            <input
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/90 text-slate-900 dark:text-slate-200 focus:ring-2 focus:ring-brand-500 outline-none"
              value={millis}
              onChange={(e) => setMillis(e.target.value)}
              placeholder="1703328000000"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-[0.18em]">ISO 8601</label>
            <input
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/90 text-slate-900 dark:text-slate-200 focus:ring-2 focus:ring-brand-500 outline-none"
              value={iso}
              onChange={(e) => setIso(e.target.value)}
              placeholder="2025-12-23T10:00:00.000Z"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button onClick={handleConvert} className="px-7 py-3 bg-gradient-to-r from-brand-500 to-glow-600 text-white font-bold rounded-xl shadow-lg shadow-brand-500/25 hover:-translate-y-0.5 transition-transform">Convert</button>
          <button onClick={handleNow} className="px-7 py-3 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold hover:-translate-y-0.5 transition-transform shadow-sm">Now (UTC)</button>
          <button onClick={clearAll} className="px-7 py-3 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl transition-all hover:border-brand-500 dark:hover:border-brand-400">Clear</button>
        </div>

        {error && (
          <div className="p-3 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-xs font-mono">
            <i className="fas fa-exclamation-circle mr-2"></i>
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50/90 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-1">Unix Seconds</p>
            <p className="text-lg font-mono text-slate-900 dark:text-white break-all">{seconds || '—'}</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50/90 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-1">Unix Milliseconds</p>
            <p className="text-lg font-mono text-slate-900 dark:text-white break-all">{millis || '—'}</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50/90 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-1">ISO 8601 (UTC)</p>
            <p className="text-lg font-mono text-slate-900 dark:text-white break-all">{iso || '—'}</p>
          </div>
        </div>
      </div>
    </ToolTemplate>
  );
};

export default TimestampTool;
