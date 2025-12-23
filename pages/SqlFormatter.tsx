import React from 'react';
import ToolTemplate from '../components/ToolTemplate';
import CodeArea from '../components/CodeArea';

const SqlFormatter: React.FC = () => {
  const [sql, setSql] = React.useState('');
  const [formatted, setFormatted] = React.useState('');

  const format = () => {
    const keywords = ['SELECT', 'FROM', 'WHERE', 'JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN', 'ON', 'AND', 'OR', 'ORDER BY', 'GROUP BY', 'HAVING', 'LIMIT', 'INSERT INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE FROM'];
    let result = sql.trim();
    keywords.forEach(kw => {
      const regex = new RegExp(`\\b${kw}\\b`, 'gi');
      result = result.replace(regex, `\n${kw.toUpperCase()}`);
    });
    result = result.replace(/,/g, ',\n  ');
    result = result.replace(/\n+/g, '\n').trim();
    setFormatted(result);
  };

  return (
    <ToolTemplate
      title="SQL Formatter"
      description="Format SQL queries with proper indentation and keyword casing."
      faq={[
        { q: 'Does it validate SQL?', a: 'No, this only formats. Use a DB client for validation.' },
        { q: 'Which SQL dialects?', a: 'Basic ANSI SQL. Dialect-specific syntax may need manual adjustment.' },
      ]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CodeArea label="SQL Input" value={sql} onChange={setSql} placeholder="select * from users where id=1" />
        <CodeArea label="Formatted SQL" value={formatted} readOnly />
      </div>
      <button onClick={format} className="mt-4 px-6 py-2 rounded-xl bg-slate-900 text-white font-semibold hover:-translate-y-0.5 transition-transform">Format SQL</button>
    </ToolTemplate>
  );
};

export default SqlFormatter;
