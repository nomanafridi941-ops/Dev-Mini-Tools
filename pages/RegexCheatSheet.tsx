import React from 'react';
import ToolTemplate from '../components/ToolTemplate';

const sections = [
  {
    title: 'Basics',
    items: [
      { label: '.', desc: 'Any character except newline' },
      { label: '\\d', desc: 'Digit [0-9]' },
      { label: '\\w', desc: 'Word char [A-Za-z0-9_]' },
      { label: '\\s', desc: 'Whitespace' },
      { label: '^ / $', desc: 'Start / end of line' },
    ],
  },
  {
    title: 'Quantifiers',
    items: [
      { label: '*', desc: '0 or more' },
      { label: '+', desc: '1 or more' },
      { label: '?', desc: '0 or 1' },
      { label: '{m,n}', desc: 'Between m and n' },
    ],
  },
  {
    title: 'Groups',
    items: [
      { label: '(abc)', desc: 'Capture group' },
      { label: '(?:abc)', desc: 'Non-capturing group' },
      { label: '(?=abc)', desc: 'Positive lookahead' },
      { label: '(?!abc)', desc: 'Negative lookahead' },
    ],
  },
  {
    title: 'Character Classes',
    items: [
      { label: '[abc]', desc: 'a or b or c' },
      { label: '[^abc]', desc: 'Not a/b/c' },
      { label: '[a-z]', desc: 'Range a to z' },
      { label: '\\b', desc: 'Word boundary' },
    ],
  },
  {
    title: 'Flags',
    items: [
      { label: 'g', desc: 'Global' },
      { label: 'i', desc: 'Ignore case' },
      { label: 'm', desc: 'Multiline ^/$' },
      { label: 's', desc: 'Dot matches newline' },
    ],
  },
];

const RegexCheatSheet: React.FC = () => {
  const faq = [
    { q: 'How to learn fast?', a: 'Pair this cheat sheet with the live Regex Tester to try patterns instantly.' },
    { q: 'Are these flavors specific?', a: 'These are common constructs that work in most JS regex engines.' },
  ];

  return (
    <ToolTemplate
      title="Regex Cheat Sheet"
      description="Quick reference for common regex tokens, quantifiers, and groups."
      faq={faq}
    >
      <div className="grid md:grid-cols-2 gap-4">
        {sections.map((section) => (
          <div key={section.title} className="p-5 rounded-2xl bg-white/85 dark:bg-slate-950/85 border border-slate-200 dark:border-slate-800">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">{section.title}</h3>
            <div className="space-y-2 text-sm">
              {section.items.map((item) => (
                <div key={item.label} className="flex justify-between gap-3">
                  <span className="font-mono text-slate-900 dark:text-white">{item.label}</span>
                  <span className="text-slate-600 dark:text-slate-400 text-right flex-1">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ToolTemplate>
  );
};

export default RegexCheatSheet;
