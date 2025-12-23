import React from 'react';
import ToolTemplate from '../components/ToolTemplate';
import CodeArea from '../components/CodeArea';

const BoxShadowGenerator: React.FC = () => {
  const [x, setX] = React.useState(0);
  const [y, setY] = React.useState(10);
  const [blur, setBlur] = React.useState(30);
  const [spread, setSpread] = React.useState(0);
  const [color, setColor] = React.useState('#00000033');
  const [inset, setInset] = React.useState(false);

  const css = `box-shadow: ${inset ? 'inset ' : ''}${x}px ${y}px ${blur}px ${spread}px ${color};`;

  return (
    <ToolTemplate
      title="Box Shadow Generator"
      description="Design smooth CSS shadows with live preview and code."
      faq={[
        { q: 'What is spread?', a: 'Spread expands or contracts the shadow size without affecting blur.' },
        { q: 'Inset shadow?', a: 'When enabled, the shadow is drawn inside the element.' },
      ]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">Offset X: {x}px</label>
              <input type="range" min={-100} max={100} value={x} onChange={(e)=>setX(parseInt(e.target.value))} className="w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">Offset Y: {y}px</label>
              <input type="range" min={-100} max={100} value={y} onChange={(e)=>setY(parseInt(e.target.value))} className="w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">Blur: {blur}px</label>
              <input type="range" min={0} max={100} value={blur} onChange={(e)=>setBlur(parseInt(e.target.value))} className="w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">Spread: {spread}px</label>
              <input type="range" min={-50} max={50} value={spread} onChange={(e)=>setSpread(parseInt(e.target.value))} className="w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">Color</label>
              <input type="text" value={color} onChange={(e)=>setColor(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/80 px-3 py-2" placeholder="#00000033" />
            </div>
            <div className="flex items-end">
              <label className="inline-flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300"><input type="checkbox" checked={inset} onChange={(e)=>setInset(e.target.checked)} /> inset</label>
            </div>
          </div>
          <div className="rounded-2xl h-40 border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 flex items-center justify-center" style={{ boxShadow: `${inset ? 'inset ' : ''}${x}px ${y}px ${blur}px ${spread}px ${color}` }}>
            <div className="px-4 py-2 rounded-xl bg-white/90 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800">Shadow Preview</div>
          </div>
        </div>
        <div>
          <CodeArea label="CSS" value={css} readOnly />
        </div>
      </div>
    </ToolTemplate>
  );
};

export default BoxShadowGenerator;
