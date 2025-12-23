import React from 'react';
import ToolTemplate from '../components/ToolTemplate';

const statusCodes = [
  { code: 200, label: 'OK', desc: 'Standard success response.' },
  { code: 201, label: 'Created', desc: 'Resource successfully created.' },
  { code: 204, label: 'No Content', desc: 'Success but no response body.' },
  { code: 301, label: 'Moved Permanently', desc: 'Resource moved to new URL.' },
  { code: 302, label: 'Found', desc: 'Temporary redirect.' },
  { code: 304, label: 'Not Modified', desc: 'Cached version is still valid.' },
  { code: 400, label: 'Bad Request', desc: 'Server cannot process request.' },
  { code: 401, label: 'Unauthorized', desc: 'Authentication required.' },
  { code: 403, label: 'Forbidden', desc: 'Access denied.' },
  { code: 404, label: 'Not Found', desc: 'Resource does not exist.' },
  { code: 405, label: 'Method Not Allowed', desc: 'HTTP method not supported.' },
  { code: 429, label: 'Too Many Requests', desc: 'Rate limit exceeded.' },
  { code: 500, label: 'Internal Server Error', desc: 'Server encountered an error.' },
  { code: 502, label: 'Bad Gateway', desc: 'Invalid response from upstream.' },
  { code: 503, label: 'Service Unavailable', desc: 'Server temporarily down.' },
  { code: 504, label: 'Gateway Timeout', desc: 'Upstream server timeout.' },
];

const HttpStatusChecker: React.FC = () => {
  const [search, setSearch] = React.useState('');
  const filtered = statusCodes.filter(s =>
    s.code.toString().includes(search) ||
    s.label.toLowerCase().includes(search.toLowerCase()) ||
    s.desc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ToolTemplate
      title="HTTP Status Checker"
      description="Quick reference for common HTTP status codes."
      faq={[
        { q: 'What does 403 mean?', a: 'Forbidden – server refuses to authorize the request.' },
        { q: 'When is 204 used?', a: 'No Content – success but no body returned (common after DELETE).' },
      ]}
    >
      <div className="space-y-4">
        <input
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/80 px-4 py-2"
          placeholder="Search by code, label, or description..."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(s => (
            <div key={s.code} className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl font-bold text-slate-900 dark:text-white">{s.code}</span>
                <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">{s.label}</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </ToolTemplate>
  );
};

export default HttpStatusChecker;
