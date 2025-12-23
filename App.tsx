
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import JsonFormatter from './pages/JsonFormatter';
import CssMinifier from './pages/CssMinifier';
import HtmlBeautifier from './pages/HtmlBeautifier';
import Base64Tool from './pages/Base64Tool';
import RegexTester from './pages/RegexTester';
import UuidTool from './pages/UuidTool';
import JwtDecoder from './pages/JwtDecoder';
import TimestampTool from './pages/TimestampTool';
import UrlEncoder from './pages/UrlEncoder';
import TextCaseTool from './pages/TextCaseTool';
import ColorConverter from './pages/ColorConverter';
import HtmlMinifier from './pages/HtmlMinifier';
import CssFormatter from './pages/CssFormatter';
import JsBeautifier from './pages/JsBeautifier';
import JsMinifier from './pages/JsMinifier';
import HtmlEncoder from './pages/HtmlEncoder';
import RegexCheatSheet from './pages/RegexCheatSheet';
import LoremIpsum from './pages/LoremIpsum';
import TextDiffTool from './pages/TextDiffTool';

const Navbar = () => {
  const [isDark, setIsDark] = useState(true);
  const [isToolsOpen, setIsToolsOpen] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200/70 dark:border-slate-800/70 shadow-[0_12px_50px_-30px_rgba(88,28,135,0.45)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-brand-500 via-glow-500 to-brand-700 text-white flex items-center justify-center shadow-lg shadow-brand-500/30 group-hover:scale-105 transition-transform">
              <i className="fas fa-bolt"></i>
            </div>
            <div className="leading-tight">
              <div className="text-lg font-bold text-slate-900 dark:text-white">Dev Mini Tools</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Fast, local-first utilities</div>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-5 text-sm font-semibold">
            <Link
              to="/"
              className="relative text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
            >
              <span className="pb-1 border-b border-transparent hover:border-brand-500 transition-colors">Home</span>
            </Link>

            <div
              className="relative"
              onMouseEnter={() => setIsToolsOpen(true)}
              onMouseLeave={() => setIsToolsOpen(false)}
            >
              <button
                onClick={() => setIsToolsOpen((prev) => !prev)}
                className="relative flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                aria-haspopup="true"
                aria-expanded={isToolsOpen}
              >
                <span className="pb-1 border-b border-transparent hover:border-brand-500 transition-colors">Tools</span>
                <i className={`fas fa-chevron-${isToolsOpen ? 'up' : 'down'} text-[10px]`}></i>
              </button>

              {isToolsOpen && (
                <div className="absolute left-0 top-full pt-3 w-[48rem] rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 shadow-2xl shadow-slate-900/10 backdrop-blur-lg z-50">
                  <div className="px-3 pb-3 grid grid-cols-1 md:grid-cols-3 gap-2">
                    <div>
                      <p className="px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">Code & Format</p>
                      {[{ to: '/json-formatter', label: 'JSON Formatter / Minifier' }, { to: '/html-beautifier', label: 'HTML Beautifier' }, { to: '/html-minifier', label: 'HTML Minifier' }, { to: '/css-formatter', label: 'CSS Formatter' }, { to: '/css-minifier', label: 'CSS Minifier' }, { to: '/js-beautifier', label: 'JS Beautifier' }, { to: '/js-minifier', label: 'JS Minifier' }].map((item) => (
                        <Link key={item.to} to={item.to} onClick={() => setIsToolsOpen(false)} className="flex items-center justify-between px-3 py-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-brand-50 dark:hover:bg-slate-900 transition-colors">
                          <span>{item.label}</span>
                          <i className="fas fa-arrow-right text-xs opacity-60"></i>
                        </Link>
                      ))}
                    </div>
                    <div>
                      <p className="px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">Encode / Decode</p>
                      {[{ to: '/base64-encoder-decoder', label: 'Base64 Encoder / Decoder' }, { to: '/url-encoder', label: 'URL Encoder / Decoder' }, { to: '/html-encoder', label: 'HTML Encode / Decode' }].map((item) => (
                        <Link key={item.to} to={item.to} onClick={() => setIsToolsOpen(false)} className="flex items-center justify-between px-3 py-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-brand-50 dark:hover:bg-slate-900 transition-colors">
                          <span>{item.label}</span>
                          <i className="fas fa-arrow-right text-xs opacity-60"></i>
                        </Link>
                      ))}
                    </div>
                    <div>
                      <p className="px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">Developer Utilities</p>
                      {[{ to: '/regex-tester', label: 'Regex Tester' }, { to: '/regex-cheats', label: 'Regex Cheat Sheet' }, { to: '/text-case', label: 'Case Converter' }, { to: '/lorem-ipsum', label: 'Lorem Ipsum' }, { to: '/text-diff', label: 'Text Diff Checker' }, { to: '/uuid-generator', label: 'UUID Generator' }, { to: '/jwt-decoder', label: 'JWT Decoder' }, { to: '/timestamp-converter', label: 'Timestamp Converter' }, { to: '/color-converter', label: 'Color Converter' }].map((item) => (
                        <Link key={item.to} to={item.to} onClick={() => setIsToolsOpen(false)} className="flex items-center justify-between px-3 py-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-brand-50 dark:hover:bg-slate-900 transition-colors">
                          <span>{item.label}</span>
                          <i className="fas fa-arrow-right text-xs opacity-60"></i>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/json-formatter"
              className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:-translate-y-0.5 transition-transform shadow-lg shadow-slate-900/15 dark:shadow-white/20"
            >
              <i className="fas fa-play text-xs"></i>
              Launch a tool
            </Link>
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700"
              aria-label="Toggle theme"
            >
              <i className={`fas ${isDark ? 'fa-sun' : 'fa-moon'}`}></i>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-white/70 dark:bg-slate-950/70 backdrop-blur-lg border-t border-slate-200/70 dark:border-slate-800/70 py-12 mt-auto">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
      <div className="flex justify-center space-x-6 text-slate-400">
        <a href="#" className="hover:text-brand-500 transition-colors"><i className="fab fa-github text-xl"></i></a>
        <a href="#" className="hover:text-brand-500 transition-colors"><i className="fab fa-twitter text-xl"></i></a>
      </div>
      <p className="text-slate-500 dark:text-slate-400">© 2024 Dev Mini Tools. Crafted for developers, built to stay local.</p>
      <div className="text-sm text-slate-400 space-x-4">
        <Link to="/" className="hover:text-brand-600 dark:hover:text-brand-400">Home</Link>
        <Link to="/json-formatter" className="hover:text-brand-600 dark:hover:text-brand-400">JSON Formatter</Link>
        <Link to="/css-minifier" className="hover:text-brand-600 dark:hover:text-brand-400">CSS Minifier</Link>
        <Link to="/regex-tester" className="hover:text-brand-600 dark:hover:text-brand-400">Regex Tester</Link>
      </div>
    </div>
  </footer>
);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/json-formatter" element={<JsonFormatter />} />
            <Route path="/css-formatter" element={<CssFormatter />} />
            <Route path="/css-minifier" element={<CssMinifier />} />
            <Route path="/html-beautifier" element={<HtmlBeautifier />} />
            <Route path="/html-minifier" element={<HtmlMinifier />} />
            <Route path="/js-beautifier" element={<JsBeautifier />} />
            <Route path="/js-minifier" element={<JsMinifier />} />
            <Route path="/base64-encoder-decoder" element={<Base64Tool />} />
            <Route path="/url-encoder" element={<UrlEncoder />} />
            <Route path="/html-encoder" element={<HtmlEncoder />} />
            <Route path="/regex-tester" element={<RegexTester />} />
            <Route path="/regex-cheats" element={<RegexCheatSheet />} />
            <Route path="/uuid-generator" element={<UuidTool />} />
            <Route path="/jwt-decoder" element={<JwtDecoder />} />
            <Route path="/timestamp-converter" element={<TimestampTool />} />
            <Route path="/text-case" element={<TextCaseTool />} />
            <Route path="/lorem-ipsum" element={<LoremIpsum />} />
            <Route path="/text-diff" element={<TextDiffTool />} />
            <Route path="/color-converter" element={<ColorConverter />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;
