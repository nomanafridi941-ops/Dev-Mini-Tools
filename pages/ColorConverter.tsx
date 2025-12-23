import React, { useState } from 'react';
import ToolTemplate from '../components/ToolTemplate';

const hexToRgb = (hex: string) => {
  const clean = hex.replace('#', '');
  if (![3, 6].includes(clean.length)) return null;
  const full = clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean;
  const int = parseInt(full, 16);
  if (Number.isNaN(int)) return null;
  const r = (int >> 16) & 255;
  const g = (int >> 8) & 255;
  const b = int & 255;
  return { r, g, b };
};

const rgbToHex = (r: number, g: number, b: number) =>
  '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('').toUpperCase();

const rgbToHsl = (r: number, g: number, b: number) => {
  const rN = r / 255;
  const gN = g / 255;
  const bN = b / 255;
  const max = Math.max(rN, gN, bN);
  const min = Math.min(rN, gN, bN);
  const d = max - min;
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;
  if (d !== 0) {
    s = d / (1 - Math.abs(2 * l - 1));
    switch (max) {
      case rN:
        h = ((gN - bN) / d) % 6;
        break;
      case gN:
        h = (bN - rN) / d + 2;
        break;
      case bN:
        h = (rN - gN) / d + 4;
        break;
    }
    h *= 60;
    if (h < 0) h += 360;
  }
  return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
};

const ColorConverter: React.FC = () => {
  const [hex, setHex] = useState('#7C3AED');
  const [rgb, setRgb] = useState('124,58,237');
  const [hsl, setHsl] = useState('262,82,58');
  const [error, setError] = useState<string | null>(null);

  const updateFromHex = (value: string) => {
    const rgbVal = hexToRgb(value.trim());
    if (!rgbVal) throw new Error('Invalid HEX');
    const hexVal = rgbToHex(rgbVal.r, rgbVal.g, rgbVal.b);
    const hslVal = rgbToHsl(rgbVal.r, rgbVal.g, rgbVal.b);
    setHex(hexVal);
    setRgb(`${rgbVal.r},${rgbVal.g},${rgbVal.b}`);
    setHsl(`${hslVal.h},${hslVal.s},${hslVal.l}`);
  };

  const updateFromRgb = (value: string) => {
    const parts = value.split(',').map((v) => Number(v.trim()));
    if (parts.length !== 3 || parts.some((n) => Number.isNaN(n) || n < 0 || n > 255)) {
      throw new Error('RGB must be 3 numbers between 0-255');
    }
    const [r, g, b] = parts;
    const hexVal = rgbToHex(r, g, b);
    const hslVal = rgbToHsl(r, g, b);
    setHex(hexVal);
    setRgb(`${r},${g},${b}`);
    setHsl(`${hslVal.h},${hslVal.s},${hslVal.l}`);
  };

  const updateFromHsl = (value: string) => {
    const parts = value.split(',').map((v) => Number(v.trim()));
    if (parts.length !== 3 || Number.isNaN(parts[0]) || Number.isNaN(parts[1]) || Number.isNaN(parts[2])) {
      throw new Error('HSL must be H,S,L numbers');
    }
    let [h, s, l] = parts;
    if (s > 1 && s <= 100) s = s / 100;
    if (l > 1 && l <= 100) l = l / 100;
    h = ((h % 360) + 360) % 360;
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;
    let rP = 0, gP = 0, bP = 0;
    if (0 <= h && h < 60) { rP = c; gP = x; bP = 0; }
    else if (60 <= h && h < 120) { rP = x; gP = c; bP = 0; }
    else if (120 <= h && h < 180) { rP = 0; gP = c; bP = x; }
    else if (180 <= h && h < 240) { rP = 0; gP = x; bP = c; }
    else if (240 <= h && h < 300) { rP = x; gP = 0; bP = c; }
    else { rP = c; gP = 0; bP = x; }
    const r = Math.round((rP + m) * 255);
    const g = Math.round((gP + m) * 255);
    const b = Math.round((bP + m) * 255);
    setHex(rgbToHex(r, g, b));
    setRgb(`${r},${g},${b}`);
    setHsl(`${Math.round(h)},${Math.round(s * 100)},${Math.round(l * 100)}`);
  };

  const handleUpdate = (source: 'hex' | 'rgb' | 'hsl', value: string) => {
    try {
      if (source === 'hex') updateFromHex(value);
      if (source === 'rgb') updateFromRgb(value);
      if (source === 'hsl') updateFromHsl(value);
      setError(null);
    } catch (e: any) {
      setError(e.message || 'Conversion failed');
    }
  };

  const faq = [
    { q: 'Supported formats?', a: 'HEX (#RGB, #RRGGBB), RGB (r,g,b), and HSL (h,s,l with 0-360/0-100/0-100).' },
    { q: 'Is there a live preview?', a: 'Yes, the preview box shows the current color.' },
  ];

  return (
    <ToolTemplate
      title="Color Converter"
      description="Convert HEX, RGB, and HSL values with an instant preview."
      faq={faq}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-[0.18em]">HEX</label>
            <input
              value={hex}
              onChange={(e) => handleUpdate('hex', e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/90 text-slate-900 dark:text-slate-200 focus:ring-2 focus:ring-brand-500 outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-[0.18em]">RGB</label>
            <input
              value={rgb}
              onChange={(e) => handleUpdate('rgb', e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/90 text-slate-900 dark:text-slate-200 focus:ring-2 focus:ring-brand-500 outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-[0.18em]">HSL</label>
            <input
              value={hsl}
              onChange={(e) => handleUpdate('hsl', e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/90 text-slate-900 dark:text-slate-200 focus:ring-2 focus:ring-brand-500 outline-none"
            />
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-xs font-mono">
            <i className="fas fa-exclamation-circle mr-2"></i>
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50/90 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-1">HEX</p>
            <p className="text-lg font-mono text-slate-900 dark:text-white break-all">{hex}</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50/90 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-1">RGB</p>
            <p className="text-lg font-mono text-slate-900 dark:text-white break-all">{rgb}</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50/90 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-1">HSL</p>
            <p className="text-lg font-mono text-slate-900 dark:text-white break-all">{hsl}</p>
          </div>
        </div>

        <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl shadow-inner flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">Live Preview</p>
            <p className="font-semibold text-slate-900 dark:text-white">{hex}</p>
          </div>
          <div className="w-24 h-24 rounded-2xl border border-slate-200 dark:border-slate-800" style={{ background: hex }} />
        </div>
      </div>
    </ToolTemplate>
  );
};

export default ColorConverter;
