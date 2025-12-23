import React, { useState } from 'react';
import ToolTemplate from '../components/ToolTemplate';
import CodeArea from '../components/CodeArea';

const words = 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'.split(' ');

const makeParagraph = (sentenceCount: number) => {
  const sentences = [];
  for (let i = 0; i < sentenceCount; i++) {
    const length = 8 + Math.floor(Math.random() * 12);
    const sentenceWords = Array.from({ length }, () => words[Math.floor(Math.random() * words.length)]);
    const sentence = sentenceWords.join(' ');
    sentences.push(sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.');
  }
  return sentences.join(' ');
};

const LoremIpsum: React.FC = () => {
  const [paragraphs, setParagraphs] = useState(3);
  const [sentencesPerPara, setSentencesPerPara] = useState(3);
  const [output, setOutput] = useState('');

  const generate = () => {
    const paraCount = Math.min(Math.max(paragraphs, 1), 10);
    const sentenceCount = Math.min(Math.max(sentencesPerPara, 1), 8);
    const paras = Array.from({ length: paraCount }, () => makeParagraph(sentenceCount));
    setOutput(paras.join('\n\n'));
  };

  const clearAll = () => {
    setOutput('');
  };

  const faq = [
    { q: 'Is this reproducible?', a: 'Content is random each time. Adjust counts for more or fewer sentences.' },
    { q: 'Can I control punctuation?', a: 'This generator produces simple sentences with periods only.' },
  ];

  return (
    <ToolTemplate
      title="Lorem Ipsum Generator"
      description="Generate placeholder paragraphs with adjustable sentence counts."
      faq={faq}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-[0.18em]">Paragraphs</label>
            <input
              type="number"
              value={paragraphs}
              min={1}
              max={10}
              onChange={(e) => setParagraphs(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/90 text-slate-900 dark:text-slate-200 focus:ring-2 focus:ring-brand-500 outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-[0.18em]">Sentences / Paragraph</label>
            <input
              type="number"
              value={sentencesPerPara}
              min={1}
              max={8}
              onChange={(e) => setSentencesPerPara(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/90 text-slate-900 dark:text-slate-200 focus:ring-2 focus:ring-brand-500 outline-none"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button onClick={generate} className="px-8 py-3 bg-gradient-to-r from-brand-500 to-glow-600 text-white font-bold rounded-xl shadow-lg shadow-brand-500/25 hover:-translate-y-0.5 transition-transform">Generate</button>
          <button onClick={clearAll} className="px-8 py-3 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl transition-all hover:border-brand-500 dark:hover:border-brand-400">Clear</button>
        </div>

        <CodeArea label="Output" value={output} readOnly placeholder="Generated lorem ipsum will appear here" />
      </div>
    </ToolTemplate>
  );
};

export default LoremIpsum;
