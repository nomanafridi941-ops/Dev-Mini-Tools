import React from 'react';
import ToolTemplate from '../components/ToolTemplate';
import CodeArea from '../components/CodeArea';

const MetaTagGenerator: React.FC = () => {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [keywords, setKeywords] = React.useState('');
  const [author, setAuthor] = React.useState('');
  const [canonical, setCanonical] = React.useState('');
  const [themeColor, setThemeColor] = React.useState('#0ea5e9');
  const [robotsIndex, setRobotsIndex] = React.useState(true);
  const [robotsFollow, setRobotsFollow] = React.useState(true);
  const [charset, setCharset] = React.useState('UTF-8');
  const [viewport, setViewport] = React.useState('width=device-width, initial-scale=1');
  const [lang, setLang] = React.useState('en');
  const [favicon, setFavicon] = React.useState('');

  const robots = `${robotsIndex ? 'index' : 'noindex'}, ${robotsFollow ? 'follow' : 'nofollow'}`;

  const snippet = `<!-- Basic -->\n<meta charset="${charset}">\n<meta name="viewport" content="${viewport}">\n<title>${title}</title>\n<meta name="description" content="${description}">\n<meta name="keywords" content="${keywords}">\n<meta name="author" content="${author}">\n<meta name="robots" content="${robots}">\n<meta http-equiv="content-language" content="${lang}">\n${canonical ? `<link rel="canonical" href="${canonical}">` : ''}\n${favicon ? `<link rel="icon" href="${favicon}" type="image/png">` : ''}`.trim();

  return (
    <ToolTemplate
      title="Meta Tag Generator"
      description="Create SEO-friendly meta tags for titles, descriptions, robots, and more."
      faq={[
        { q: 'What meta tags are essential for SEO?', a: 'Title, meta description, robots, canonical link, and viewport are common essentials.' },
        { q: 'Do I need keywords?', a: 'Keywords meta tag is optional and not used by major search engines, but harmless.' },
      ]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">Title</label>
              <input value={title} onChange={(e)=>setTitle(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/80 px-3 py-2" placeholder="Page title" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">Author</label>
              <input value={author} onChange={(e)=>setAuthor(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/80 px-3 py-2" placeholder="Your name or brand" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">Description</label>
            <textarea value={description} onChange={(e)=>setDescription(e.target.value)} className="mt-1 w-full min-h-[84px] rounded-xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/80 px-3 py-2" placeholder="Short description for search results" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">Keywords (comma separated)</label>
              <input value={keywords} onChange={(e)=>setKeywords(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/80 px-3 py-2" placeholder="tool, seo, generator" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">Canonical URL</label>
              <input value={canonical} onChange={(e)=>setCanonical(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/80 px-3 py-2" placeholder="https://example.com/page" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">Theme Color</label>
              <input type="color" value={themeColor} onChange={(e)=>setThemeColor(e.target.value)} className="mt-1 h-10 w-full rounded-xl overflow-hidden" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">Favicon URL</label>
              <input value={favicon} onChange={(e)=>setFavicon(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/80 px-3 py-2" placeholder="/favicon.png" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">Charset</label>
              <select value={charset} onChange={(e)=>setCharset(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/80 px-3 py-2">
                <option>UTF-8</option>
                <option>ISO-8859-1</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">Language</label>
              <input value={lang} onChange={(e)=>setLang(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/80 px-3 py-2" placeholder="en" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">Viewport</label>
              <input value={viewport} onChange={(e)=>setViewport(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/80 px-3 py-2" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <label className="inline-flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
              <input type="checkbox" checked={robotsIndex} onChange={(e)=>setRobotsIndex(e.target.checked)} /> index
            </label>
            <label className="inline-flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
              <input type="checkbox" checked={robotsFollow} onChange={(e)=>setRobotsFollow(e.target.checked)} /> follow
            </label>
          </div>
          <div className="text-xs text-slate-500">Note: Theme color will be included in Open Graph/Twitter in the OG tool.</div>
        </div>

        <div>
          <CodeArea label="Generated Meta Tags" value={snippet} readOnly />
        </div>
      </div>
    </ToolTemplate>
  );
};

export default MetaTagGenerator;
