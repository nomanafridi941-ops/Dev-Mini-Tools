
import React from 'react';
import { Link } from 'react-router-dom';

const ToolCard = ({ title, description, icon, to, color }: { title: string; description: string; icon: string; to: string; color: string }) => (
  <Link to={to} className="group h-full p-[1px] rounded-3xl bg-gradient-to-br from-brand-500/35 via-glow-500/30 to-slate-900 shadow-lg shadow-brand-500/10 hover:shadow-brand-500/25 transition-all">
    <div className="h-full rounded-[22px] bg-white/90 dark:bg-slate-950/85 backdrop-blur-md border border-slate-200/70 dark:border-slate-800/70 p-6 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color} text-slate-900 dark:text-slate-900 font-bold shadow-md shadow-slate-900/10`}>
          <i className={`fas ${icon}`}></i>
        </div>
        <span className="text-xs uppercase tracking-[0.18em] text-slate-400">Tool</span>
      </div>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 flex-1">{description}</p>
      <span className="inline-flex items-center text-brand-600 dark:text-brand-400 font-semibold group-hover:translate-x-1 transition-transform">
        Open Tool <i className="fas fa-arrow-right ml-2 text-xs"></i>
      </span>
    </div>
  </Link>
);

const Home: React.FC = () => {
  return (
    <div className="pb-20">
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-16 left-1/3 w-[420px] h-[420px] bg-brand-500/15 blur-3xl" />
          <div className="absolute top-10 right-1/4 w-[320px] h-[320px] bg-glow-500/20 blur-[100px]" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-slate-950" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-brand-50 text-brand-700 border border-brand-100 text-xs font-semibold uppercase tracking-[0.2em]">No signups · Local-first</span>
            <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white leading-tight drop-shadow-glow">
              Dev Mini Tools for builders who ship fast.
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
              A focused toolbox for formatting, testing, and tidying code. Everything runs in your browser—secure, instant, and distraction-free.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/json-formatter" className="px-7 py-3 rounded-xl bg-gradient-to-r from-brand-500 to-glow-600 text-white font-bold shadow-lg shadow-brand-500/30 hover:-translate-y-0.5 transition-transform">
                Launch JSON Formatter
              </Link>
              <Link to="/regex-tester" className="px-7 py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 hover:border-brand-500 dark:hover:border-brand-400 transition-all">
                Try Regex Tester
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm text-slate-600 dark:text-slate-400">
              <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800">
                <div className="text-2xl font-bold text-slate-900 dark:text-white">0 Uploads</div>
                <div>Data stays on device</div>
              </div>
              <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800">
                <div className="text-2xl font-bold text-slate-900 dark:text-white">5 Tools</div>
                <div>Core dev workflows</div>
              </div>
              <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 col-span-2 sm:col-span-1">
                <div className="text-2xl font-bold text-slate-900 dark:text-white">Fast</div>
                <div>CDN + no bloat</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-8 bg-gradient-to-br from-brand-500/10 via-white/0 to-glow-500/10 blur-3xl" />
            <div className="relative rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl shadow-2xl shadow-brand-500/10 p-8 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Toolkit</p>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Dev Mini Tools</h3>
                </div>
                <span className="px-3 py-1 text-xs rounded-full bg-brand-50 text-brand-700 border border-brand-100">Updated</span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {["JSON Formatter","CSS Minifier","HTML Beautifier","Base64 Encoder","Regex Tester"].map((tool) => (
                  <div key={tool} className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <span className="h-2 w-2 rounded-full bg-brand-500" />
                    <span className="text-slate-700 dark:text-slate-200">{tool}</span>
                  </div>
                ))}
              </div>
              <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-950 text-white border border-slate-800">
                <div className="text-sm uppercase tracking-[0.2em] text-slate-400 mb-2">Promise</div>
                <p className="text-lg font-semibold leading-relaxed">Everything runs locally. Your snippets never leave the browser.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Tools by Category</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-12 max-w-6xl mx-auto">
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">SEO Tools</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <ToolCard title="Meta Tag Generator" description="Create essential SEO meta tags." icon="fa-tags" to="/meta-tags" color="bg-emerald-200" />
              <ToolCard title="robots.txt Generator" description="Control crawler access." icon="fa-robot" to="/robots-txt" color="bg-slate-200" />
              <ToolCard title="Sitemap XML Generator" description="Build sitemap.xml from paths." icon="fa-sitemap" to="/sitemap-xml" color="bg-yellow-200" />
              <ToolCard title="Open Graph Generator" description="OG + Twitter card tags." icon="fa-share-square" to="/open-graph" color="bg-sky-200" />
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Image & UI Helpers</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <ToolCard title="Image to Base64" description="Convert images to data URLs." icon="fa-file-image" to="/image-to-base64" color="bg-pink-200" />
              <ToolCard title="Base64 to Image" description="Preview and download images." icon="fa-image" to="/base64-to-image" color="bg-purple-200" />
              <ToolCard title="CSS Gradient Generator" description="Design linear/radial gradients." icon="fa-fill" to="/css-gradient" color="bg-indigo-200" />
              <ToolCard title="Box Shadow Generator" description="Fine-tune modern shadows." icon="fa-square" to="/box-shadow" color="bg-orange-200" />
              <ToolCard title="Color Converter" description="HEX ⇄ RGB ⇄ HSL." icon="fa-palette" to="/color-converter" color="bg-teal-200" />
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Code & Format</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <ToolCard title="JSON Formatter / Minifier" description="Beautify and compact JSON quickly." icon="fa-brackets-curly" to="/json-formatter" color="bg-brand-100" />
              <ToolCard title="HTML Beautifier" description="Make HTML readable with proper indent." icon="fa-code" to="/html-beautifier" color="bg-amber-200" />
              <ToolCard title="HTML Minifier" description="Strip comments and collapse whitespace." icon="fa-compress" to="/html-minifier" color="bg-yellow-200" />
              <ToolCard title="CSS Formatter" description="Indent and clean CSS for readability." icon="fa-brush" to="/css-formatter" color="bg-violet-200" />
              <ToolCard title="CSS Minifier" description="Compress CSS for production." icon="fa-css3-alt" to="/css-minifier" color="bg-glow-500/40" />
              <ToolCard title="JS Beautifier" description="Prettify JS/TS using Prettier." icon="fa-code-branch" to="/js-beautifier" color="bg-sky-200" />
              <ToolCard title="JS Minifier" description="Minify JavaScript with Terser." icon="fa-bolt" to="/js-minifier" color="bg-indigo-200" />
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Encode / Decode</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <ToolCard title="Base64 Encoder / Decoder" description="Convert strings to/from Base64." icon="fa-exchange-alt" to="/base64-encoder-decoder" color="bg-emerald-200" />
              <ToolCard title="URL Encoder / Decoder" description="Safely encode/decode URLs and params." icon="fa-link" to="/url-encoder" color="bg-indigo-200" />
              <ToolCard title="HTML Encode / Decode" description="Escape or unescape HTML entities." icon="fa-shield-virus" to="/html-encoder" color="bg-slate-200" />
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Developer Utilities</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <ToolCard title="Regex Tester" description="Test regex with live highlights." icon="fa-search" to="/regex-tester" color="bg-pink-200" />
              <ToolCard title="Regex Cheat Sheet" description="Quick reference for common tokens." icon="fa-list" to="/regex-cheats" color="bg-orange-200" />
              <ToolCard title="Case Converter" description="Upper, lower, snake, kebab cases." icon="fa-text-height" to="/text-case" color="bg-blue-200" />
              <ToolCard title="Lorem Ipsum Generator" description="Generate placeholder paragraphs." icon="fa-align-left" to="/lorem-ipsum" color="bg-purple-200" />
              <ToolCard title="Text Diff Checker" description="Compare two texts and highlight changes." icon="fa-not-equal" to="/text-diff" color="bg-red-200" />
              <ToolCard title="UUID Generator" description="Create multiple v4 UUIDs instantly." icon="fa-fingerprint" to="/uuid-generator" color="bg-lime-200" />
              <ToolCard title="JWT Decoder" description="Decode JWT header and payload locally." icon="fa-shield-alt" to="/jwt-decoder" color="bg-cyan-200" />
              <ToolCard title="Timestamp Converter" description="Convert Unix seconds/millis and ISO." icon="fa-clock" to="/timestamp-converter" color="bg-rose-200" />
              <ToolCard title="Color Converter" description="Convert HEX, RGB, and HSL with preview." icon="fa-palette" to="/color-converter" color="bg-teal-200" />
            </div>
          </div>
        </div>
      </section>

      

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="rounded-3xl bg-white/85 dark:bg-slate-950/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800 p-10 shadow-xl shadow-brand-500/10 text-left space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Why Dev Mini Tools?</h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Dev Mini Tools keeps your workflow lean: JSON Formatter, CSS Minifier, HTML Beautifier, Base64 Encoder, and Regex Tester. Everything runs client-side so your API payloads, code snippets, or secret tokens never leave your browser.
          </p>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            We prioritize clarity and speed with a tight, distraction-free interface. Keep us pinned for day-to-day tasks and skip the heavy extensions or signups.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
