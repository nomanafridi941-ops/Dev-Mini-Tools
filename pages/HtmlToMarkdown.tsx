import React from 'react';
import ToolTemplate from '../components/ToolTemplate';
import CodeArea from '../components/CodeArea';

const HtmlToMarkdown: React.FC = () => {
  const [html, setHtml] = React.useState('');
  const [markdown, setMarkdown] = React.useState('');

  const convert = () => {
    let result = html
      .replace(/<h1>(.*?)<\/h1>/gim, '# $1\n')
      .replace(/<h2>(.*?)<\/h2>/gim, '## $1\n')
      .replace(/<h3>(.*?)<\/h3>/gim, '### $1\n')
      .replace(/<strong>(.*?)<\/strong>/gim, '**$1**')
      .replace(/<b>(.*?)<\/b>/gim, '**$1**')
      .replace(/<em>(.*?)<\/em>/gim, '*$1*')
      .replace(/<i>(.*?)<\/i>/gim, '*$1*')
      .replace(/<a href="(.*?)">(.*?)<\/a>/gim, '[$2]($1)')
      .replace(/<img .*?src="(.*?)".*?alt="(.*?)".*?\/>/gim, '![$2]($1)')
      .replace(/<br\s*\/?>/gim, '\n')
      .replace(/<\/?[^>]+(>|$)/g, '');
    setMarkdown(result.trim());
  };

  React.useEffect(() => {
    convert();
  }, [html]);

  return (
    <ToolTemplate
      title="HTML to Markdown"
      description="Convert HTML to Markdown for documentation and README files."
      faq={[
        { q: 'Does it handle all HTML?', a: 'Basic tags only (headings, links, bold, italic). Complex HTML needs manual cleanup.' },
        { q: 'What about inline styles?', a: 'Inline styles are stripped. Only semantic tags are converted.' },
      ]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CodeArea label="HTML Input" value={html} onChange={setHtml} placeholder="<h1>Hello</h1><p><strong>Bold</strong></p>" />
        <CodeArea label="Markdown Output" value={markdown} readOnly />
      </div>
    </ToolTemplate>
  );
};

export default HtmlToMarkdown;
