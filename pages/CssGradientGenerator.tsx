import React from 'react';
import ToolTemplate from '../components/ToolTemplate';
import CodeArea from '../components/CodeArea';

const CssGradientGenerator: React.FC = () => {
  const [type, setType] = React.useState<'linear' | 'radial'>('linear');
  const [angle, setAngle] = React.useState(90);
  const [c1, setC1] = React.useState('#7c3aed');
  const [c2, setC2] = React.useState('#06b6d4');

  const css = type === 'linear'
    ? `background: linear-gradient(${angle}deg, ${c1}, ${c2});`
    : `background: radial-gradient(circle at center, ${c1}, ${c2});`;

  return (
    <ToolTemplate
      title="CSS Gradient Generator"
      description="Craft beautiful linear or radial gradients with live preview."
      faq={[
        { q: 'How do I use it?', a: 'Copy the generated CSS and apply to any element or body.' },
        { q: 'Can I add more stops?', a: 'This basic generator uses two stops. Add more manually if needed.' },
      ]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">Type</label>
              <select value={type} onChange={(e)=>setType(e.target.value as any)} className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/80 px-3 py-2">
                <option value="linear">linear</option>
                <option value="radial">radial</option>
              </select>
            </div>
            {type === 'linear' && (
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">Angle: {angle}°</label>
                <input type="range" min={0} max={360} value={angle} onChange={(e)=>setAngle(parseInt(e.target.value))} className="w-full" />
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">Color 1</label>
              <input type="color" value={c1} onChange={(e)=>setC1(e.target.value)} className="mt-1 h-10 w-full rounded-xl" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">Color 2</label>
              <input type="color" value={c2} onChange={(e)=>setC2(e.target.value)} className="mt-1 h-10 w-full rounded-xl" />
            </div>
          </div>
          <div className="rounded-2xl h-40 border border-slate-200 dark:border-slate-800" style={{ background: type === 'linear' ? `linear-gradient(${angle}deg, ${c1}, ${c2})` : `radial-gradient(circle at center, ${c1}, ${c2})` }} />
        </div>
        <div>
          <CodeArea label="CSS" value={css} readOnly />
        </div>
      </div>
    </ToolTemplate>
  );
};

export default CssGradientGenerator;
