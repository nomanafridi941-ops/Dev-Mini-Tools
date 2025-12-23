
import React from 'react';

interface CodeAreaProps {
  label: string;
  value: string;
  onChange?: (val: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  className?: string;
}

const CodeArea: React.FC<CodeAreaProps> = ({ label, value, onChange, placeholder, readOnly = false, className = "" }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="flex justify-between items-center px-1">
        <label className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{label}</label>
        <button 
          onClick={handleCopy}
          className="text-xs font-semibold px-3 py-1 rounded-lg bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:-translate-y-0.5 transition-all shadow-sm shadow-brand-500/30 flex items-center gap-1.5"
        >
          {copied ? <><i className="fas fa-check"></i> Copied</> : <><i className="fas fa-copy"></i> Copy</>}
        </button>
      </div>
      <div className="p-[1px] rounded-2xl bg-gradient-to-br from-brand-500/35 via-glow-500/30 to-slate-900">
        <textarea
          className="w-full h-64 p-4 font-mono text-sm rounded-[14px] border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/90 text-slate-900 dark:text-slate-200 focus:ring-2 focus:ring-brand-500 outline-none resize-none transition-all shadow-inner"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          readOnly={readOnly}
          spellCheck={false}
        />
      </div>
    </div>
  );
};

export default CodeArea;
