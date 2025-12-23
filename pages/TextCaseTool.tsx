import React, { useState } from 'react';
import ToolTemplate from '../components/ToolTemplate';
import CodeArea from '../components/CodeArea';

const toTitle = (str: string) => str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase());
const toSnake = (str: string) => str.trim().replace(/\s+/g, '_').replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
const toKebab = (str: string) => str.trim().replace(/\s+/g, '-').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

const TextCaseTool: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const actions = [
    { label: 'UPPER', fn: (s: string) => s.toUpperCase() },
    { label: 'lower', fn: (s: string) => s.toLowerCase() },
    { label: 'Title Case', fn: toTitle },
    { label: 'snake_case', fn: toSnake },
    { label: 'kebab-case', fn: toKebab },
  ];

  const handle = (fn: (s: string) => string) => {
    if (!input) return;
    setOutput(fn(input));
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
  };

  const faq = [
    { q: 'Does it alter punctuation?', a: 'It preserves punctuation; casing and separators are adjusted. For strict slugging, run kebab-case and then edit manually if needed.' },
    { q: 'Is data sent anywhere?', a: 'No. All processing is local in your browser.' },
  ];

  return (
    <ToolTemplate
      title="Text Case Converter"
      description="Switch between upper, lower, title, snake, and kebab cases instantly."
      faq={faq}
    >
      <div className="space-y-6">
        <CodeArea
          label="Input"
          value={input}
          onChange={setInput}
          placeholder="Paste text to convert"
        />
        <CodeArea
          label="Output"
          value={output}
          readOnly
          placeholder="Converted text will appear here"
        />

        <div className="flex flex-wrap gap-3">
          {actions.map((action) => (
            <button
              key={action.label}
              onClick={() => handle(action.fn)}
              className="px-6 py-3 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-semibold hover:-translate-y-0.5 transition-transform shadow-sm"
            >
              {action.label}
            </button>
          ))}
          <button onClick={clearAll} className="px-6 py-3 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl transition-all hover:border-brand-500 dark:hover:border-brand-400">Clear</button>
        </div>
      </div>
    </ToolTemplate>
  );
};

export default TextCaseTool;
