import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { toast } from 'sonner';

export function CodeBlock({ code, language }: { code: string; language: string }) {
  const copyCode = async () => {
    await navigator.clipboard.writeText(code);
    toast.success('Code copied to clipboard!');
  };

  return (
    <div className="relative">
      <button
        onClick={copyCode}
        className="absolute top-2 right-2 p-2 bg-white/10 rounded-lg"
      >
        Copy
      </button>
      <SyntaxHighlighter language={language}>
        {code}
      </SyntaxHighlighter>
    </div>
  );
} 