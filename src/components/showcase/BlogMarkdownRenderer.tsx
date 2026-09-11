import React, { useState } from 'react';

interface BlogMarkdownRendererProps {
  content: string;
}

export const BlogMarkdownRenderer: React.FC<BlogMarkdownRendererProps> = ({ content }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopyCode = (codeText: string, index: number) => {
    navigator.clipboard.writeText(codeText);
    setCopiedIndex(index);
    setTimeout(() => {
      setCopiedIndex(null);
    }, 2000);
  };

  // Process inline bold, inline code, and links
  const renderFormattedText = (text: string) => {
    const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);

    return parts.map((part, i) => {
      if (part.startsWith('`') && part.endsWith('`')) {
        const inner = part.slice(1, -1);
        return (
          <code
            key={i}
            className="px-1 py-0.2 mx-0.5 text-[12px] bg-[#e4e4e4] border border-[#808080] font-mono text-[#800000] select-text"
          >
            {inner}
          </code>
        );
      }

      if (part.startsWith('**') && part.endsWith('**')) {
        const inner = part.slice(2, -2);
        return <strong key={i} className="font-bold select-text">{inner}</strong>;
      }

      const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        const [, linkText, linkHref] = linkMatch;
        const isExternal = linkHref.startsWith('http');
        return (
          <a
            key={i}
            href={linkHref}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            className="text-[#0000ff] underline hover:text-[#ff0000] visited:text-[#800080] cursor-pointer select-text"
          >
            {linkText}
          </a>
        );
      }

      return <span key={i} className="select-text">{part}</span>;
    });
  };

  // Parse markdown lines & blocks
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeBuffer: string[] = [];
  let codeLanguage = '';
  let codeBlockCounter = 0;

  let currentList: string[] = [];
  let listKeyCounter = 0;

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`list-${listKeyCounter++}`} className="list-disc pl-5 space-y-1 my-2 select-text font-['Millennium',serif]">
          {currentList.map((item, idx) => (
            <li key={idx} className="text-[14px] leading-relaxed select-text text-[#111]">
              {renderFormattedText(item)}
            </li>
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Fenced Code Block Boundary
    if (line.trim().startsWith('```')) {
      flushList();
      if (!inCodeBlock) {
        inCodeBlock = true;
        codeLanguage = line.trim().replace(/^```/, '') || 'SHELL';
        codeBuffer = [];
      } else {
        inCodeBlock = false;
        const fullCode = codeBuffer.join('\n');
        const currentIndex = codeBlockCounter++;
        const isCopied = copiedIndex === currentIndex;

        elements.push(
          <div
            key={`code-${currentIndex}`}
            className="my-3 win-border bg-[#000000] text-[#00ff41] select-text overflow-hidden"
          >
            {/* Authentic MS-DOS Prompt Title Bar */}
            <div className="bg-[#000080] text-white px-2 py-0.5 flex items-center justify-between font-mono text-[11px] border-b border-[#444] select-none">
              <div className="flex items-center gap-1.5 overflow-hidden truncate">
                <span className="bg-[#c0c0c0] text-black px-1 font-bold text-[9px] leading-none py-0.5">
                  C:\&gt;
                </span>
                <span className="truncate">
                  MS-DOS Prompt - [{codeLanguage.toUpperCase()}]
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleCopyCode(fullCode, currentIndex)}
                className="site-button !text-[10px] !py-0 !px-1.5 flex items-center gap-1 font-mono text-black cursor-pointer"
                title="Copy code to clipboard"
              >
                {isCopied ? '✓ Copied' : '📋 Copy'}
              </button>
            </div>
            {/* Console Body */}
            <pre className="p-3 overflow-x-auto font-mono text-[12px] leading-relaxed text-[#00ff41] bg-[#0c100c] m-0 select-text">
              <code>{fullCode}</code>
            </pre>
          </div>
        );
      }
      continue;
    }

    if (inCodeBlock) {
      codeBuffer.push(line);
      continue;
    }

    // List items
    if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
      const itemText = line.trim().substring(2);
      currentList.push(itemText);
      continue;
    } else {
      flushList();
    }

    // Horizontal Rule (Authentic 3D groove)
    if (line.trim() === '---' || line.trim() === '***') {
      elements.push(
        <div
          key={`hr-${i}`}
          className="my-4 border-t border-[#808080] border-b border-white select-none"
        />
      );
      continue;
    }

    // Headings (Authentic 90s sizes: 14px - 17px with retro serif / bold styling)
    if (line.startsWith('## ')) {
      elements.push(
        <div key={`h2-${i}`} className="mt-5 mb-1.5 select-text">
          <h2 className="text-[16px] font-bold text-black font-['MillenniumBold',serif] m-0 border-b border-[#a0a0a0] pb-0.5">
            {line.replace('## ', '')}
          </h2>
        </div>
      );
      continue;
    }

    if (line.startsWith('### ')) {
      elements.push(
        <h3
          key={`h3-${i}`}
          className="text-[14px] font-bold text-black font-['MillenniumBold',serif] mt-3.5 mb-1 select-text underline decoration-[#666]"
        >
          {line.replace('### ', '')}
        </h3>
      );
      continue;
    }

    if (line.startsWith('# ')) {
      elements.push(
        <h1
          key={`h1-${i}`}
          className="text-[18px] font-bold text-black font-['MillenniumBold',serif] mt-4 mb-2 select-text"
        >
          {line.replace('# ', '')}
        </h1>
      );
      continue;
    }

    // Authentic Windows Help Note Callout
    if (line.startsWith('> ')) {
      elements.push(
        <div
          key={`quote-${i}`}
          className="my-3 p-2.5 bg-[#ffffea] border border-black text-[13px] font-['Millennium',serif] text-[#111] select-text"
        >
          <span className="font-bold font-mono text-[11px] text-[#900000] block mb-0.5">
            [ ! ] NOTE:
          </span>
          {renderFormattedText(line.replace(/^>\s*/, ''))}
        </div>
      );
      continue;
    }

    // Empty lines
    if (line.trim() === '') {
      continue;
    }

    // Regular paragraph
    elements.push(
      <p
        key={`p-${i}`}
        className="text-[14px] leading-relaxed text-[#111] my-2 font-['Millennium',serif] select-text"
      >
        {renderFormattedText(line)}
      </p>
    );
  }

  flushList();

  return <div className="retro-markdown-content select-text">{elements}</div>;
};

export default BlogMarkdownRenderer;
