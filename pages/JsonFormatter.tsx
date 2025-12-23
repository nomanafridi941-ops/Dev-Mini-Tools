
import React, { useState } from 'react';
import ToolTemplate from '../components/ToolTemplate';
import CodeArea from '../components/CodeArea';

const JsonFormatter: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const formatJson = (spaces: number) => {
    try {
      if (!input.trim()) return;
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, spaces));
      setError(null);
    } catch (e: any) {
      setError(e.message);
      setOutput('');
    }
  };

  const minifyJson = () => {
    try {
      if (!input.trim()) return;
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError(null);
    } catch (e: any) {
      setError(e.message);
      setOutput('');
    }
  };

  const faq = [
    { q: "Is my JSON data safe?", a: "Yes. All processing happens in your browser locally. We never upload or store your data on our servers." },
    { q: "Can I format invalid JSON?", a: "No, the tool validates the structure first. If there are syntax errors, it will highlight them for you." }
  ];

  return (
    <ToolTemplate 
      title="JSON Formatter & Validator" 
      description="Beautify, minify, and validate your JSON data instantly. Clean up messy code for better readability."
      faq={faq}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <CodeArea 
          label="Input JSON" 
          value={input} 
          onChange={setInput} 
          placeholder='Paste your JSON here (e.g., {"key": "value"})'
        />
        <div className="relative">
          <CodeArea 
            label="Output" 
            value={output} 
            readOnly 
            placeholder="Formatted output will appear here"
          />
          {error && (
            <div className="absolute bottom-4 left-4 right-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-xs font-mono">
              <i className="fas fa-exclamation-triangle mr-2"></i>
              {error}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mt-8">
        <button onClick={() => formatJson(2)} className="px-7 py-3 bg-gradient-to-r from-brand-500 to-glow-600 text-white font-bold rounded-xl shadow-lg shadow-brand-500/25 hover:-translate-y-0.5 transition-transform">Beautify (2 Spaces)</button>
        <button onClick={() => formatJson(4)} className="px-7 py-3 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold hover:-translate-y-0.5 transition-transform shadow-sm">Beautify (4 Spaces)</button>
        <button onClick={minifyJson} className="px-7 py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-brand-500 dark:hover:border-brand-400 transition-colors font-semibold">Minify JSON</button>
        <button onClick={() => {setInput(''); setOutput(''); setError(null);}} className="px-6 py-3 text-slate-500 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Clear All</button>
      </div>
    </ToolTemplate>
  );
};

export default JsonFormatter;
