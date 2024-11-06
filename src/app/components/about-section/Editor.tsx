import React, { useMemo } from 'react';

import WindowHeader from './WindowHeader';

interface EditorProps {
  code: string;
}

interface Token {
  text: string;
  type: TokenType;
}

type TokenType =
  | 'keyword'
  | 'component'
  | 'punctuation'
  | 'string'
  | 'function'
  | 'type'
  | 'tag'
  | 'attribute'
  | 'default';

const LineNumber: React.FC<{ number: number }> = ({ number }) => (
  <span className="text-gray-400 dark:text-gray-600 w-8 sm:w-12 inline-flex shrink-0 text-right mr-2 sm:mr-4 select-none opacity-50 text-xs sm:text-sm">
    {number}
  </span>
);

const SyntaxToken: React.FC<{ token: Token }> = React.memo(({ token }) => {
  const colorClass = useMemo(() => {
    switch (token.type) {
      case 'keyword':
        return 'text-pink-500 dark:text-[#F92672]';
      case 'component':
        return 'text-green-500 dark:text-[#A6E22E]';
      case 'punctuation':
        return 'text-gray-400 dark:text-[#ABB2BF]';
      case 'string':
        return 'text-yellow-600 dark:text-[#E6DB74]';
      case 'function':
        return 'text-blue-500 dark:text-[#66D9EF]';
      case 'type':
        return 'text-red-500 dark:text-[#FF7B72]';
      case 'tag':
        return 'text-blue-600 dark:text-[#79C0FF]';
      case 'attribute':
        return 'text-blue-800 dark:text-[#79C0FF]';
      default:
        return 'text-slate-700 dark:text-[#F8F8F2]';
    }
  }, [token.type]);

  return <span className={`inline-block ${colorClass}`}>{token.text}</span>;
});

SyntaxToken.displayName = 'SyntaxToken';

const CodeLine: React.FC<{ lineNumber: number; tokens: Token[] }> = React.memo(
  ({ lineNumber, tokens }) => (
    <div className="flex hover:bg-gray-100 dark:hover:bg-gray-800/50 px-2 sm:px-4 whitespace-pre">
      <LineNumber number={lineNumber} />
      <div className="flex">
        {tokens.map((token, index) => (
          <SyntaxToken key={index} token={token} />
        ))}
      </div>
    </div>
  )
);

CodeLine.displayName = 'CodeLine';

const tokenizeLine = (line: string): Token[] => {
  const patterns = {
    keyword:
      /\b(import|from|const|let|var|return|interface|extends|export|default|typeof|keyof|use client)\b/,
    component:
      /(?<![\w])<([A-Z][a-zA-Z]*)\s*\/?>|<\/([A-Z][a-zA-Z]*)\s*>|(?<=\{)([A-Z][a-zA-Z]*?)(?=\})/,
    punctuation: /[{}()[\].,;:=]/,
    tag: /<\/?(?:div|h1|p|span|code|pre|section)\b|\/>/,
    attribute:
      /\b(class|id|style|type|href|src|alt|aria-[a-zA-Z-]+)\b(?=[^>]*>)/,
    string: /'[^']*'|"[^"]*"|`[^`]*`/,
    type: /\b(string|number|boolean|void|any|never|object|symbol|bigint|null|undefined|FC)\b/,
    textContent: /(?<=>)[^<>{}]+(?=<)/,
  };

  const tokens: Token[] = [];
  let remaining = line;

  while (remaining.length > 0) {
    let matched = false;

    // Handle spaces
    const spaceMatch = remaining.match(/^\s+/);
    if (spaceMatch) {
      tokens.push({ text: spaceMatch[0], type: 'default' });
      remaining = remaining.slice(spaceMatch[0].length);
      continue;
    }

    // Try matching specific patterns first
    for (const [type, pattern] of Object.entries(patterns)) {
      const match = remaining.match(pattern);
      if (match && match.index === 0) {
        // Ignore matches that are part of normal text
        if (type === 'component' && !remaining.trimStart().startsWith('<')) {
          continue;
        }
        tokens.push({ text: match[0], type: type as TokenType });
        remaining = remaining.slice(match[0].length);
        matched = true;
        break;
      }
    }

    // If no match, treat as normal text
    if (!matched) {
      tokens.push({ text: remaining[0], type: 'default' });
      remaining = remaining.slice(1);
    }
  }

  return tokens;
};

const Editor: React.FC<EditorProps> = ({ code }) => {
  const lines = useMemo(
    () =>
      code.split('\n').map((line, index) => ({
        number: index + 1,
        tokens: tokenizeLine(line),
      })),
    [code]
  );

  return (
    <div className="bg-white dark:bg-[#161B22] text-gray-800 dark:text-gray-300 p-2 sm:p-3 font-mono rounded-lg shadow-lg w-full max-w-[calc(100vw-2rem)] sm:max-w-4xl mx-auto overflow-hidden border border-gray-200 dark:border-gray-700 relative">
      <WindowHeader title="AboutMe.tsx" />
      <div className="overflow-x-auto w-full">
        <pre className="min-h-[300px] text-xs sm:text-sm leading-5 sm:leading-6 py-2 sm:py-4 min-w-max">
          <code className="block whitespace-pre">
            {lines.map((line) => (
              <CodeLine
                key={line.number}
                lineNumber={line.number}
                tokens={line.tokens}
              />
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default React.memo(Editor);
