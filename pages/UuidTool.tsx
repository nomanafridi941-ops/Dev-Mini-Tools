import React, { useState } from 'react';
import ToolTemplate from '../components/ToolTemplate';
import CodeArea from '../components/CodeArea';

const generateUuid = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback UUID v4 generator
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const UuidTool: React.FC = () => {
  const [count, setCount] = useState(5);
  const [uuids, setUuids] = useState<string[]>([]);

  const handleGenerate = () => {
    const safeCount = Math.min(Math.max(count, 1), 50);
    const list = Array.from({ length: safeCount }, () => generateUuid());
    setUuids(list);
  };

  const faq = [
    { q: 'Is this RFC 4122 compliant?', a: 'Yes, we generate version 4 UUIDs. In browsers with crypto.randomUUID, it uses the native implementation; otherwise, a Math.random fallback is used.' },
    { q: 'Is any data sent to a server?', a: 'No, everything is generated locally in your browser. Nothing leaves the page.' }
  ];

  return (
    <ToolTemplate
      title="UUID Generator"
      description="Generate one or many v4 UUIDs instantly. Copy ready output for configs, database seeds, or tests."
      faq={faq}
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <label className="text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-[0.18em]">How many?</label>
          <input
            type="number"
            value={count}
            min={1}
            max={50}
            onChange={(e) => setCount(Number(e.target.value))}
            className="w-32 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/80 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none"
          />
          <button
            onClick={handleGenerate}
            className="px-6 py-3 bg-gradient-to-r from-brand-500 to-glow-600 text-white font-bold rounded-xl shadow-lg shadow-brand-500/25 hover:-translate-y-0.5 transition-transform"
          >
            Generate UUIDs
          </button>
          <span className="text-sm text-slate-500 dark:text-slate-400">Limit 50 per run</span>
        </div>

        <CodeArea
          label="Generated UUIDs"
          value={uuids.join('\n')}
          readOnly
          placeholder="Click generate to create UUIDs"
        />
      </div>
    </ToolTemplate>
  );
};

export default UuidTool;
