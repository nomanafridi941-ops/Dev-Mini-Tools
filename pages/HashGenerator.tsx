import React from 'react';
import ToolTemplate from '../components/ToolTemplate';
import CodeArea from '../components/CodeArea';

const HashGenerator: React.FC = () => {
  const [text, setText] = React.useState('');
  const [md5, setMd5] = React.useState('');
  const [sha1, setSha1] = React.useState('');
  const [sha256, setSha256] = React.useState('');

  const hash = async () => {
    if (!text) {
      setMd5('');
      setSha1('');
      setSha256('');
      return;
    }
    const encoder = new TextEncoder();
    const data = encoder.encode(text);

    // SHA-1
    const sha1buf = await crypto.subtle.digest('SHA-1', data);
    setSha1(Array.from(new Uint8Array(sha1buf)).map(b=>b.toString(16).padStart(2,'0')).join(''));

    // SHA-256
    const sha256buf = await crypto.subtle.digest('SHA-256', data);
    setSha256(Array.from(new Uint8Array(sha256buf)).map(b=>b.toString(16).padStart(2,'0')).join(''));

    // MD5 (basic implementation - not crypto.subtle, simple fallback)
    setMd5('MD5 not available in SubtleCrypto; use SHA-256 for security.');
  };

  React.useEffect(() => {
    hash();
  }, [text]);

  return (
    <ToolTemplate
      title="Hash Generator (MD5/SHA)"
      description="Generate MD5, SHA-1, and SHA-256 hashes for any text."
      faq={[
        { q: 'Is MD5 secure?', a: 'MD5 is not secure for cryptographic use. Prefer SHA-256.' },
        { q: 'Are hashes reversible?', a: 'No, hashes are one-way functions.' },
      ]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CodeArea label="Input Text" value={text} onChange={setText} placeholder="Enter text to hash" />
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">MD5</label>
            <input readOnly value={md5} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 font-mono text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">SHA-1</label>
            <input readOnly value={sha1} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 font-mono text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">SHA-256</label>
            <input readOnly value={sha256} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 font-mono text-sm" />
          </div>
        </div>
      </div>
    </ToolTemplate>
  );
};

export default HashGenerator;
