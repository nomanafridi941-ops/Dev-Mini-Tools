import React from 'react';
import ToolTemplate from '../components/ToolTemplate';
import CodeArea from '../components/CodeArea';

const XmlToJson: React.FC = () => {
  const [xml, setXml] = React.useState('');
  const [json, setJson] = React.useState('');

  const convert = () => {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(xml, 'text/xml');
      const parseError = doc.querySelector('parsererror');
      if (parseError) {
        setJson('Error: Invalid XML');
        return;
      }
      const parseNode = (node: any): any => {
        if (node.nodeType === Node.TEXT_NODE) {
          return node.nodeValue?.trim() || '';
        }
        const obj: any = {};
        if (node.attributes) {
          for (let i = 0; i < node.attributes.length; i++) {
            const attr = node.attributes[i];
            obj[`@${attr.name}`] = attr.value;
          }
        }
        const children = Array.from(node.childNodes);
        children.forEach((child: any) => {
          const name = child.nodeName;
          const val = parseNode(child);
          if (obj[name]) {
            if (Array.isArray(obj[name])) {
              obj[name].push(val);
            } else {
              obj[name] = [obj[name], val];
            }
          } else {
            obj[name] = val;
          }
        });
        return obj;
      };
      const result = parseNode(doc.documentElement);
      setJson(JSON.stringify(result, null, 2));
    } catch (e: any) {
      setJson(`Error: ${e.message}`);
    }
  };

  return (
    <ToolTemplate
      title="XML to JSON Converter"
      description="Parse XML and convert to JSON with attributes prefixed by @."
      faq={[
        { q: 'How are attributes handled?', a: 'Attributes are prefixed with @ in the JSON output.' },
        { q: 'What about nested elements?', a: 'Nested elements become nested objects; repeated elements become arrays.' },
      ]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CodeArea label="XML Input" value={xml} onChange={setXml} placeholder='<root><item id="1">Value</item></root>' />
        <CodeArea label="JSON Output" value={json} readOnly />
      </div>
      <button onClick={convert} className="mt-4 px-6 py-2 rounded-xl bg-slate-900 text-white font-semibold hover:-translate-y-0.5 transition-transform">Convert to JSON</button>
    </ToolTemplate>
  );
};

export default XmlToJson;
