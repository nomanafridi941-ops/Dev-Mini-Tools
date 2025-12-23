import React from 'react';
import ToolTemplate from '../components/ToolTemplate';
import CodeArea from '../components/CodeArea';

const JsonToCsv: React.FC = () => {
  const [json, setJson] = React.useState('');
  const [csv, setCsv] = React.useState('');

  const convert = () => {
    try {
      const data = JSON.parse(json);
      const arr = Array.isArray(data) ? data : [data];
      if (arr.length === 0) {
        setCsv('');
        return;
      }
      const keys = Object.keys(arr[0]);
      const header = keys.join(',');
      const rows = arr.map(obj => keys.map(k => {
        const val = String(obj[k] ?? '');
        return val.includes(',') || val.includes('"') ? `"${val.replace(/"/g, '""')}"` : val;
      }).join(','));
      setCsv([header, ...rows].join('\n'));
    } catch (e: any) {
      setCsv(`Error: ${e.message}`);
    }
  };

  return (
    <ToolTemplate
      title="JSON to CSV Converter"
      description="Convert JSON arrays to CSV format with proper escaping."
      faq={[
        { q: 'What JSON format is supported?', a: 'Array of objects with consistent keys works best.' },
        { q: 'How are commas handled?', a: 'Values with commas or quotes are escaped per CSV spec.' },
      ]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CodeArea label="JSON Input" value={json} onChange={setJson} placeholder='[{"name":"Alice","age":30}]' />
        <CodeArea label="CSV Output" value={csv} readOnly />
      </div>
      <button onClick={convert} className="mt-4 px-6 py-2 rounded-xl bg-slate-900 text-white font-semibold hover:-translate-y-0.5 transition-transform">Convert to CSV</button>
    </ToolTemplate>
  );
};

export default JsonToCsv;
