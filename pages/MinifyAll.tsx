import React from 'react';
import ToolTemplate from '../components/ToolTemplate';
import CodeArea from '../components/CodeArea';

const MinifyAll: React.FC = () => {
  const [html, setHtml] = React.useState('');
  const [css, setCss] = React.useState('');
  const [js, setJs] = React.useState('');
  const [output, setOutput] = React.useState('');

  const minify = async () => {
    try {
      let result = '';
      if (html) {
        const minifiedHtml = html.replace(/<!--[\s\S]*?-->/g, '').replace(/\s+/g, ' ').trim();
        result += `<!-- HTML -->\n${minifiedHtml}\n\n`;
      }
      if (css) {
        const minifiedCss = css.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').replace(/\s*([{}:;,])\s*/g, '$1').trim();
        result += `/* CSS */\n${minifiedCss}\n\n`;
      }
      if (js) {
        // @ts-expect-error
        const Terser = await import('https://cdn.jsdelivr.net/npm/terser@5/dist/bundle.min.js');
        const minified = await Terser.minify(js);
        result += `// JS\n${minified.code || js}\n`;
      }
      setOutput(result || 'Paste HTML, CSS, or JS above.');
    } catch (e: any) {
      setOutput(`Error: ${e.message}`);
    }
  };

  return (
    <ToolTemplate
      title="Minify All (HTML+CSS+JS)"
      description="Minify HTML, CSS, and JavaScript in one go."
      faq={[
        { q: 'Which minifier is used?', a: 'HTML/CSS are regex-based; JS uses Terser via CDN.' },
        { q: 'Can I minify separately?', a: 'Yes, use individual minifier tools for more control.' },
      ]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <CodeArea label="HTML (optional)" value={html} onChange={setHtml} placeholder="<div>...</div>" />
          <CodeArea label="CSS (optional)" value={css} onChange={setCss} placeholder="body { margin: 0; }" />
          <CodeArea label="JavaScript (optional)" value={js} onChange={setJs} placeholder="const x = 1;" />
          <button onClick={minify} className="px-6 py-2 rounded-xl bg-slate-900 text-white font-semibold hover:-translate-y-0.5 transition-transform">Minify All</button>
        </div>
        <div>
          <CodeArea label="Minified Output" value={output} readOnly />
        </div>
      </div>
    </ToolTemplate>
  );
};

export default MinifyAll;
