import React from 'react';
import ToolTemplate from '../components/ToolTemplate';
import CodeArea from '../components/CodeArea';

const MarkdownToHtml: React.FC = () => {
  const [markdown, setMarkdown] = React.useState('');
  const [html, setHtml] = React.useState('');

  const convert = () => {
    let result = markdown
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*)\*/gim, '<em>$1</em>')
      .replace(/!\[(.*?)\]\((.*?)\)/gim, '<img alt="$1" src="$2" />')
      .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2">$1</a>')
      .replace(/\n$/gim, '<br />');
    setHtml(result);
  };

  React.useEffect(() => {
    convert();
  }, [markdown]);

  return (
    <ToolTemplate
      title="Markdown to HTML"
      description="Convert Markdown to HTML with basic syntax support."
      faq={[
        { q: 'Which Markdown features are supported?', a: 'Headings, bold, italic, links, and images. Complex tables/code blocks may need manual adjustment.' },
        { q: 'Is this GitHub-flavored?', a: 'No, this is basic Markdown. Use a full parser for GFM.' },
      ]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CodeArea label="Markdown Input" value={markdown} onChange={setMarkdown} placeholder="# Hello\n\n**Bold** and *italic*" />
        <CodeArea label="HTML Output" value={html} readOnly />
      </div>
    </ToolTemplate>
  );
};

export default MarkdownToHtml;
