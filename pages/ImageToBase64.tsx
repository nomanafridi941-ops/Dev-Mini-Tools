import React from 'react';
import ToolTemplate from '../components/ToolTemplate';
import CodeArea from '../components/CodeArea';

const ImageToBase64: React.FC = () => {
  const [dataUrl, setDataUrl] = React.useState('');
  const [name, setName] = React.useState('');

  const onFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setDataUrl(String(reader.result || ''));
      setName(file.name);
    };
    reader.readAsDataURL(file);
  };

  return (
    <ToolTemplate
      title="Image to Base64"
      description="Convert images to Base64 (data URL) for embedding in HTML/CSS."
      faq={[
        { q: 'Which formats are supported?', a: 'Common formats like PNG, JPG, GIF, SVG are supported by your browser.' },
        { q: 'Is conversion done locally?', a: 'Yes. Files never leave your device.' },
      ]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <div className="space-y-4">
          <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">Select image</label>
          <input type="file" accept="image/*" onChange={(e)=>{ const f=e.target.files?.[0]; if (f) onFile(f); }} className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/80 px-3 py-2" />
          {dataUrl && (
            <div className="space-y-3">
              <div className="text-sm text-slate-600 dark:text-slate-400">Preview: {name}</div>
              <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={dataUrl} alt="preview" className="max-h-64 object-contain mx-auto" />
              </div>
              <a href={dataUrl} download={name || 'image'} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900 text-white text-sm">Download</a>
            </div>
          )}
        </div>
        <div>
          <CodeArea label="Base64 Data URL" value={dataUrl} readOnly />
        </div>
      </div>
    </ToolTemplate>
  );
};

export default ImageToBase64;
