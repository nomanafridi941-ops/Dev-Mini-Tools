import React from 'react';
import ToolTemplate from '../components/ToolTemplate';
import CodeArea from '../components/CodeArea';

const pretty = (xml: string) => xml.replace(/></g, '>$<');

const SitemapGenerator: React.FC = () => {
  const [baseUrl, setBaseUrl] = React.useState('https://example.com');
  const [paths, setPaths] = React.useState<string>('/\n/about\n/contact');
  const [changefreq, setChangefreq] = React.useState('weekly');
  const [priority, setPriority] = React.useState('0.5');
  const [includeLastmod, setIncludeLastmod] = React.useState(true);

  const today = new Date().toISOString().slice(0,10);
  const entries = (paths || '')
    .split(/\r?\n/)
    .map(p => p.trim())
    .filter(Boolean)
    .map(p => (p.startsWith('http') ? p : `${baseUrl.replace(/\/$/, '')}/${p.replace(/^\//,'')}`));

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.map(url => `  <url>\n    <loc>${url}</loc>\n${includeLastmod ? `    <lastmod>${today}</lastmod>\n` : ''}    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`).join('\n')}\n</urlset>`;

  return (
    <ToolTemplate
      title="Sitemap XML Generator"
      description="Generate a valid sitemap.xml from your base URL and paths."
      faq={[
        { q: 'Where do I put sitemap.xml?', a: 'Place it at the site root (e.g., https://example.com/sitemap.xml) and reference it in robots.txt.' },
        { q: 'How many URLs can I add?', a: 'Standard sitemaps support up to 50,000 URLs or 50MB uncompressed per file.' },
      ]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">Base URL</label>
            <input value={baseUrl} onChange={(e)=>setBaseUrl(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/80 px-3 py-2" placeholder="https://example.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">Paths (one per line)</label>
            <textarea value={paths} onChange={(e)=>setPaths(e.target.value)} className="mt-1 w-full min-h-[140px] rounded-xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/80 px-3 py-2" placeholder="/\n/about\n/blog/post" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">Changefreq</label>
              <select value={changefreq} onChange={(e)=>setChangefreq(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/80 px-3 py-2">
                <option>always</option>
                <option>hourly</option>
                <option>daily</option>
                <option>weekly</option>
                <option>monthly</option>
                <option>yearly</option>
                <option>never</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">Priority</label>
              <input value={priority} onChange={(e)=>setPriority(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/80 px-3 py-2" />
            </div>
            <div className="flex items-end">
              <label className="inline-flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                <input type="checkbox" checked={includeLastmod} onChange={(e)=>setIncludeLastmod(e.target.checked)} /> include lastmod
              </label>
            </div>
          </div>
        </div>
        <div>
          <CodeArea label="sitemap.xml" value={xml} readOnly />
        </div>
      </div>
    </ToolTemplate>
  );
};

export default SitemapGenerator;
