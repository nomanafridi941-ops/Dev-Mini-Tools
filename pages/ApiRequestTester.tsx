import React from 'react';
import ToolTemplate from '../components/ToolTemplate';
import CodeArea from '../components/CodeArea';

const ApiRequestTester: React.FC = () => {
  const [url, setUrl] = React.useState('');
  const [method, setMethod] = React.useState('GET');
  const [headers, setHeaders] = React.useState('');
  const [body, setBody] = React.useState('');
  const [response, setResponse] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const sendRequest = async () => {
    if (!url) {
      setResponse('Please enter a URL');
      return;
    }
    setLoading(true);
    try {
      const opts: RequestInit = { method };
      if (headers) {
        try {
          opts.headers = JSON.parse(headers);
        } catch {
          setResponse('Invalid JSON in headers');
          setLoading(false);
          return;
        }
      }
      if (body && method !== 'GET') {
        opts.body = body;
      }
      const res = await fetch(url, opts);
      const text = await res.text();
      const info = `Status: ${res.status} ${res.statusText}\n\n${text}`;
      setResponse(info);
    } catch (e: any) {
      setResponse(`Error: ${e.message}`);
    }
    setLoading(false);
  };

  return (
    <ToolTemplate
      title="API Request Tester"
      description="Test REST APIs with custom methods, headers, and body."
      faq={[
        { q: 'Can I test authenticated APIs?', a: 'Yes, add Authorization header in JSON format.' },
        { q: 'What about CORS?', a: 'CORS restrictions apply. Use a proxy or backend for restricted APIs.' },
      ]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">URL</label>
            <input value={url} onChange={(e)=>setUrl(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/80 px-3 py-2" placeholder="https://api.example.com/endpoint" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">Method</label>
            <select value={method} onChange={(e)=>setMethod(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/80 px-3 py-2">
              <option>GET</option>
              <option>POST</option>
              <option>PUT</option>
              <option>DELETE</option>
              <option>PATCH</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">Headers (JSON)</label>
            <textarea value={headers} onChange={(e)=>setHeaders(e.target.value)} className="mt-1 w-full min-h-[80px] rounded-xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/80 px-3 py-2 font-mono text-sm" placeholder='{"Content-Type":"application/json"}' />
          </div>
          {method !== 'GET' && (
            <div>
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">Body</label>
              <textarea value={body} onChange={(e)=>setBody(e.target.value)} className="mt-1 w-full min-h-[100px] rounded-xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/80 px-3 py-2 font-mono text-sm" placeholder='{"key":"value"}' />
            </div>
          )}
          <button onClick={sendRequest} disabled={loading} className="px-6 py-2 rounded-xl bg-slate-900 text-white font-semibold hover:-translate-y-0.5 transition-transform disabled:opacity-50">
            {loading ? 'Sending...' : 'Send Request'}
          </button>
        </div>
        <div>
          <CodeArea label="Response" value={response} readOnly />
        </div>
      </div>
    </ToolTemplate>
  );
};

export default ApiRequestTester;
