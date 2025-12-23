import React from 'react';
import ToolTemplate from '../components/ToolTemplate';
import CodeArea from '../components/CodeArea';

const Base64ToImage: React.FC = () => {
  const [dataUrl, setDataUrl] = React.useState('');

  const normalized = React.useMemo(() => {
    const v = dataUrl.trim();
    if (!v) return '';
    if (v.startsWith('data:')) return v;
    // Assume PNG if no prefix provided
    return `data:image/png;base64,${v}`;
  }, [dataUrl]);

  return (
    <ToolTemplate
      title="Base64 to Image"
      description="Paste a Base64 string and preview/download it as an image."
      faq={[
        { q: 'What if I have only raw Base64?', a: 'We will assume PNG if no data: URL prefix is provided.' },
        { q: 'Is this conversion local?', a: 'Yes. Everything runs in your browser.' },
      ]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <div className="space-y-4">
          <CodeArea label="Base64 or Data URL" value={dataUrl} onChange={setDataUrl} placeholder="data:image/png;base64,iVBORw0KGgo... or raw base64" />
        </div>
        <div className="space-y-3">
          {normalized ? (
            <>
              <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={normalized} alt="preview" className="max-h-72 object-contain mx-auto" />
              </div>
              <a href={normalized} download="image" className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900 text-white text-sm">Download</a>
            </>
          ) : (
            <div className="text-sm text-slate-500">Paste Base64 to preview</div>
          )}
        </div>
      </div>
    </ToolTemplate>
  );
};

export default Base64ToImage;
