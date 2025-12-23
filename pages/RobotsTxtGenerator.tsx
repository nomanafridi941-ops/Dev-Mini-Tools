import React from 'react';
import ToolTemplate from '../components/ToolTemplate';
import CodeArea from '../components/CodeArea';

const RobotsTxtGenerator: React.FC = () => {
  const [userAgent, setUserAgent] = React.useState('*');
  const [allowRoot, setAllowRoot] = React.useState(true);
  const [disallow, setDisallow] = React.useState<string>('/admin\n/private');
  const [sitemapUrl, setSitemapUrl] = React.useState('');

  const lines: string[] = [];
  lines.push(`User-agent: ${userAgent}`);
  if (allowRoot) lines.push('Allow: /');
  (disallow || '').split(/\r?\n/).map(l=>l.trim()).filter(Boolean).forEach((p)=>{
    lines.push(`Disallow: ${p}`);
  });
  if (sitemapUrl) lines.push(`Sitemap: ${sitemapUrl}`);
  const content = lines.join('\n');

  return (
    <ToolTemplate
      title="robots.txt Generator"
      description="Generate a clean robots.txt with user-agent, allow/disallow rules, and optional sitemap."
      faq={[
        { q: 'What is robots.txt?', a: 'A plain text file that instructs search engine crawlers which paths to crawl.' },
        { q: 'Is robots.txt mandatory?', a: 'No, but recommended for controlling crawler access and signaling sitemaps.' },
      ]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">User-agent</label>
              <input value={userAgent} onChange={(e)=>setUserAgent(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/80 px-3 py-2" />
            </div>
            <div className="flex items-end">
              <label className="inline-flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                <input type="checkbox" checked={allowRoot} onChange={(e)=>setAllowRoot(e.target.checked)} /> Allow root
              </label>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">Disallow paths (one per line)</label>
            <textarea value={disallow} onChange={(e)=>setDisallow(e.target.value)} className="mt-1 w-full min-h-[120px] rounded-xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/80 px-3 py-2" placeholder="/admin\n/private" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">Sitemap URL (optional)</label>
            <input value={sitemapUrl} onChange={(e)=>setSitemapUrl(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/80 px-3 py-2" placeholder="https://example.com/sitemap.xml" />
          </div>
        </div>
        <div>
          <CodeArea label="robots.txt" value={content} readOnly />
        </div>
      </div>
    </ToolTemplate>
  );
};

export default RobotsTxtGenerator;
