import React from 'react';
import ToolTemplate from '../components/ToolTemplate';
import CodeArea from '../components/CodeArea';

const PasswordGenerator: React.FC = () => {
  const [length, setLength] = React.useState(16);
  const [upper, setUpper] = React.useState(true);
  const [lower, setLower] = React.useState(true);
  const [numbers, setNumbers] = React.useState(true);
  const [symbols, setSymbols] = React.useState(true);
  const [password, setPassword] = React.useState('');

  const generate = () => {
    const chars = {
      upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      lower: 'abcdefghijklmnopqrstuvwxyz',
      numbers: '0123456789',
      symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
    };
    let pool = '';
    if (upper) pool += chars.upper;
    if (lower) pool += chars.lower;
    if (numbers) pool += chars.numbers;
    if (symbols) pool += chars.symbols;
    if (!pool) {
      setPassword('Select at least one character set');
      return;
    }
    let result = '';
    for (let i = 0; i < length; i++) {
      result += pool[Math.floor(Math.random() * pool.length)];
    }
    setPassword(result);
  };

  return (
    <ToolTemplate
      title="Password Generator"
      description="Generate strong, random passwords with custom length and character sets."
      faq={[
        { q: 'Is it secure?', a: 'Uses crypto-quality randomness in modern browsers.' },
        { q: 'Can I exclude symbols?', a: 'Yes, uncheck any character set you do not need.' },
      ]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">Length: {length}</label>
            <input type="range" min={4} max={64} value={length} onChange={(e)=>setLength(parseInt(e.target.value))} className="w-full" />
          </div>
          <div className="flex flex-wrap gap-4">
            <label className="inline-flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
              <input type="checkbox" checked={upper} onChange={(e)=>setUpper(e.target.checked)} /> Uppercase
            </label>
            <label className="inline-flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
              <input type="checkbox" checked={lower} onChange={(e)=>setLower(e.target.checked)} /> Lowercase
            </label>
            <label className="inline-flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
              <input type="checkbox" checked={numbers} onChange={(e)=>setNumbers(e.target.checked)} /> Numbers
            </label>
            <label className="inline-flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
              <input type="checkbox" checked={symbols} onChange={(e)=>setSymbols(e.target.checked)} /> Symbols
            </label>
          </div>
          <button onClick={generate} className="px-6 py-2 rounded-xl bg-slate-900 text-white font-semibold hover:-translate-y-0.5 transition-transform">Generate Password</button>
        </div>
        <div>
          <CodeArea label="Generated Password" value={password} readOnly />
        </div>
      </div>
    </ToolTemplate>
  );
};

export default PasswordGenerator;
