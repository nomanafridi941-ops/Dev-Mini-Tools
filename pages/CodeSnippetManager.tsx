import React from 'react';
import ToolTemplate from '../components/ToolTemplate';
import CodeArea from '../components/CodeArea';

interface Snippet {
  id: number;
  title: string;
  code: string;
}

const CodeSnippetManager: React.FC = () => {
  const [snippets, setSnippets] = React.useState<Snippet[]>([]);
  const [title, setTitle] = React.useState('');
  const [code, setCode] = React.useState('');
  const [selected, setSelected] = React.useState<Snippet | null>(null);

  React.useEffect(() => {
    const saved = localStorage.getItem('codeSnippets');
    if (saved) setSnippets(JSON.parse(saved));
  }, []);

  const save = () => {
    if (!title || !code) return;
    const newSnippet = { id: Date.now(), title, code };
    const updated = [...snippets, newSnippet];
    setSnippets(updated);
    localStorage.setItem('codeSnippets', JSON.stringify(updated));
    setTitle('');
    setCode('');
  };

  const del = (id: number) => {
    const updated = snippets.filter(s => s.id !== id);
    setSnippets(updated);
    localStorage.setItem('codeSnippets', JSON.stringify(updated));
    if (selected?.id === id) setSelected(null);
  };

  return (
    <ToolTemplate
      title="Code Snippet Manager"
      description="Store and manage reusable code snippets locally in your browser."
      faq={[
        { q: 'Where are snippets stored?', a: 'In localStorage. They persist across sessions on this device.' },
        { q: 'Can I export them?', a: 'Not yet, but you can copy snippets manually.' },
      ]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">Title</label>
            <input value={title} onChange={(e)=>setTitle(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/80 px-3 py-2" placeholder="Snippet name" />
          </div>
          <CodeArea label="Code" value={code} onChange={setCode} placeholder="Your snippet here..." />
          <button onClick={save} className="px-6 py-2 rounded-xl bg-slate-900 text-white font-semibold hover:-translate-y-0.5 transition-transform">Save Snippet</button>

          <div className="mt-6 space-y-2">
            <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-300">Saved Snippets</h3>
            {snippets.length === 0 && <p className="text-sm text-slate-500">No snippets yet.</p>}
            {snippets.map(s => (
              <div key={s.id} className="flex items-center justify-between p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60">
                <button onClick={()=>setSelected(s)} className="text-left text-sm text-slate-700 dark:text-slate-200 flex-1">{s.title}</button>
                <button onClick={()=>del(s.id)} className="text-xs text-red-600 dark:text-red-400 ml-2">Delete</button>
              </div>
            ))}
          </div>
        </div>
        <div>
          {selected ? (
            <CodeArea label={`Snippet: ${selected.title}`} value={selected.code} readOnly />
          ) : (
            <div className="text-sm text-slate-500">Select a snippet from the left.</div>
          )}
        </div>
      </div>
    </ToolTemplate>
  );
};

export default CodeSnippetManager;
