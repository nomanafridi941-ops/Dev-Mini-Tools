import React from 'react';
import ToolTemplate from '../components/ToolTemplate';
import CodeArea from '../components/CodeArea';

const OpenGraphGenerator: React.FC = () => {
  const [siteName, setSiteName] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [url, setUrl] = React.useState('');
  const [image, setImage] = React.useState('');
  const [type, setType] = React.useState('website');
  const [twitterCard, setTwitterCard] = React.useState('summary_large_image');

  const snippet = `<!-- Open Graph -->\n<meta property="og:site_name" content="${siteName}">\n<meta property="og:title" content="${title}">\n<meta property="og:description" content="${description}">\n<meta property="og:type" content="${type}">\n<meta property="og:url" content="${url}">\n${image ? `<meta property=\"og:image\" content=\"${image}\">` : ''}\n\n<!-- Twitter -->\n<meta name="twitter:card" content="${twitterCard}">\n<meta name="twitter:title" content="${title}">\n<meta name="twitter:description" content="${description}">\n${image ? `<meta name=\"twitter:image\" content=\"${image}\">` : ''}`.trim();

  return (
    <ToolTemplate
      title="Open Graph Generator"
      description="Generate Open Graph and Twitter meta tags with live preview."
      faq={[
        { q: 'What is Open Graph?', a: 'A protocol to control how links are previewed on social platforms.' },
        { q: 'Do I need both OG and Twitter tags?', a: 'Yes, add both for best previews across platforms.' },
      ]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">Site Name</label>
              <input value={siteName} onChange={(e)=>setSiteName(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/80 px-3 py-2" placeholder="Your Site" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">Type</label>
              <select value={type} onChange={(e)=>setType(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/80 px-3 py-2">
                <option>website</option>
                <option>article</option>
                <option>product</option>
                <option>profile</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">Title</label>
            <input value={title} onChange={(e)=>setTitle(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/80 px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">Description</label>
            <textarea value={description} onChange={(e)=>setDescription(e.target.value)} className="mt-1 w-full min-h-[100px] rounded-xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/80 px-3 py-2" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">Page URL</label>
              <input value={url} onChange={(e)=>setUrl(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/80 px-3 py-2" placeholder="https://example.com/page" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">Image URL</label>
              <input value={image} onChange={(e)=>setImage(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/80 px-3 py-2" placeholder="https://example.com/og.jpg" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">Twitter Card</label>
            <select value={twitterCard} onChange={(e)=>setTwitterCard(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/80 px-3 py-2">
              <option>summary</option>
              <option>summary_large_image</option>
              <option>app</option>
              <option>player</option>
            </select>
          </div>
        </div>
        <div>
          <CodeArea label="Open Graph & Twitter Tags" value={snippet} readOnly />
        </div>
      </div>
    </ToolTemplate>
  );
};

export default OpenGraphGenerator;
