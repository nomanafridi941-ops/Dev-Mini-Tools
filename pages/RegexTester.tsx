
import React, { useState, useEffect } from 'react';
import ToolTemplate from '../components/ToolTemplate';

const RegexTester: React.FC = () => {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState('g');
  const [testString, setTestString] = useState('');
  const [matches, setMatches] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!pattern) {
      setMatches([]);
      setError(null);
      return;
    }

    try {
      const regex = new RegExp(pattern, flags);
      const allMatches = Array.from(testString.matchAll(regex));
      setMatches(allMatches);
      setError(null);
    } catch (e: any) {
      setError(e.message);
      setMatches([]);
    }
  }, [pattern, flags, testString]);

  const highlightMatches = () => {
    if (!testString) return <span className="text-slate-400 italic">Matches will highlight here...</span>;
    if (error || !pattern) return testString;

    try {
      const regex = new RegExp(pattern, flags);
      const parts = [];
      let lastIndex = 0;

      // Simple highlight for the first few matches to keep it efficient
      const allMatches = Array.from(testString.matchAll(regex)).slice(0, 100);
      
      if (allMatches.length === 0) return testString;

      allMatches.forEach((match, idx) => {
        const start = match.index!;
        const end = start + match[0].length;
        
        // Push non-matching part
        parts.push(testString.substring(lastIndex, start));
        // Push matching part with highlight
        parts.push(
          <mark key={idx} className="bg-pink-500/30 text-pink-700 dark:text-pink-300 rounded px-0.5 border-b-2 border-pink-500">
            {match[0]}
          </mark>
        );
        lastIndex = end;
      });

      parts.push(testString.substring(lastIndex));
      return parts;
    } catch {
      return testString;
    }
  };

  const faq = [
    { q: "What flags are supported?", a: "Common flags include 'g' (global), 'i' (ignore case), and 'm' (multiline). You can combine them as 'gim'." },
    { q: "How many matches are shown?", a: "The counter shows all matches, while the visual highlighter shows the first 100 matches to maintain browser performance." }
  ];

  return (
    <ToolTemplate 
      title="Regex Tester" 
      description="Write, test, and debug your regular expressions with real-time matching highlights and error reporting."
      faq={faq}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-3">
            <label className="block text-sm font-semibold text-slate-500 mb-2 uppercase">Regular Expression</label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-slate-400 font-mono text-lg">/</span>
              <input 
                type="text"
                className="w-full pl-8 pr-12 py-3 font-mono text-lg rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-pink-500 outline-none transition-all"
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                placeholder="([a-z]+)"
              />
              <span className="absolute right-4 text-slate-400 font-mono text-lg">/</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-500 mb-2 uppercase">Flags</label>
            <input 
              type="text"
              className="w-full px-4 py-3 font-mono text-lg rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-pink-500 outline-none transition-all"
              value={flags}
              onChange={(e) => setFlags(e.target.value)}
              placeholder="g"
            />
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-xs font-mono">
            <i className="fas fa-bug mr-2"></i> {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <div>
            <label className="block text-sm font-semibold text-slate-500 mb-2 uppercase">Test String</label>
            <textarea
              className="w-full h-64 p-4 font-mono text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-pink-500 outline-none resize-none transition-all"
              value={testString}
              onChange={(e) => setTestString(e.target.value)}
              placeholder="Enter text to test your regex against..."
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-slate-500 uppercase">Match Results</label>
              <span className="text-xs font-bold px-2 py-0.5 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 rounded-full">
                {matches.length} Matches Found
              </span>
            </div>
            <div className="w-full h-64 p-4 font-mono text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white overflow-auto whitespace-pre-wrap leading-relaxed border-dashed">
              {highlightMatches()}
            </div>
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 mt-8">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4 uppercase flex items-center gap-2">
            <i className="fas fa-lightbulb text-yellow-500"></i> Common Patterns
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Email', regex: '[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}' },
              { label: 'Numbers', regex: '\\d+' },
              { label: 'URL', regex: 'https?:\\/\\/\\S+' },
              { label: 'Words', regex: '\\b\\w+\\b' }
            ].map((p, i) => (
              <button 
                key={i}
                onClick={() => setPattern(p.regex)}
                className="text-xs py-2 px-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-pink-500 transition-colors text-slate-600 dark:text-slate-300 font-mono text-left truncate"
              >
                {p.label}: <span className="opacity-60">{p.regex}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </ToolTemplate>
  );
};

export default RegexTester;
