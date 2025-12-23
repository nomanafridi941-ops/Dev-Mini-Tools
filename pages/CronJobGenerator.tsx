import React from 'react';
import ToolTemplate from '../components/ToolTemplate';
import CodeArea from '../components/CodeArea';

const CronJobGenerator: React.FC = () => {
  const [minute, setMinute] = React.useState('*');
  const [hour, setHour] = React.useState('*');
  const [day, setDay] = React.useState('*');
  const [month, setMonth] = React.useState('*');
  const [weekday, setWeekday] = React.useState('*');

  const cron = `${minute} ${hour} ${day} ${month} ${weekday}`;

  const presets = [
    { label: 'Every minute', value: '* * * * *' },
    { label: 'Every hour', value: '0 * * * *' },
    { label: 'Every day at midnight', value: '0 0 * * *' },
    { label: 'Every Monday at 9am', value: '0 9 * * 1' },
    { label: 'Every 1st of month', value: '0 0 1 * *' },
  ];

  const apply = (preset: string) => {
    const parts = preset.split(' ');
    setMinute(parts[0]);
    setHour(parts[1]);
    setDay(parts[2]);
    setMonth(parts[3]);
    setWeekday(parts[4]);
  };

  return (
    <ToolTemplate
      title="Cron Job Generator"
      description="Generate cron expressions with a simple form or presets."
      faq={[
        { q: 'What is cron syntax?', a: 'Cron uses 5 fields: minute hour day month weekday. * means any.' },
        { q: 'How to run every 15 minutes?', a: 'Use */15 in the minute field.' },
      ]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="grid grid-cols-5 gap-2">
            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-300">Minute</label>
              <input value={minute} onChange={(e)=>setMinute(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/80 px-2 py-1 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-300">Hour</label>
              <input value={hour} onChange={(e)=>setHour(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/80 px-2 py-1 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-300">Day</label>
              <input value={day} onChange={(e)=>setDay(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/80 px-2 py-1 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-300">Month</label>
              <input value={month} onChange={(e)=>setMonth(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/80 px-2 py-1 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-300">Weekday</label>
              <input value={weekday} onChange={(e)=>setWeekday(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/80 px-2 py-1 text-sm" />
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-slate-600 dark:text-slate-300">Presets</h4>
            {presets.map(p => (
              <button key={p.value} onClick={()=>apply(p.value)} className="block w-full text-left px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 text-sm hover:bg-brand-50 dark:hover:bg-slate-800 transition-colors">
                {p.label}: <code className="text-xs text-slate-500">{p.value}</code>
              </button>
            ))}
          </div>
        </div>
        <div>
          <CodeArea label="Cron Expression" value={cron} readOnly />
          <div className="mt-4 text-sm text-slate-600 dark:text-slate-400">
            <p>Format: <code>minute hour day month weekday</code></p>
            <p className="mt-1">Use <code>*</code> for any, <code>*/N</code> for every N, or specific values.</p>
          </div>
        </div>
      </div>
    </ToolTemplate>
  );
};

export default CronJobGenerator;
