'use client';
import React, { useEffect, useMemo, useState } from 'react';

// Global timing configuration
const CHAR_DELAY_FIRST_LINE = 30;
const CHAR_DELAY_OTHER_LINES = 20;
const LINE_DELAY = 80;
const RESET_DELAY = 1000;

// Types
interface TerminalProps {
  isVisible?: boolean;
}

interface TerminalLine {
  text: string;
  type: 'command' | 'info' | 'next' | 'success' | 'default';
}

const TerminalHeader: React.FC = () => (
  <div
    data-testid="terminal-header"
    className="flex items-center justify-between pb-2 mb-4 border-b border-gray-200 dark:border-gray-700"
  >
    <div className="flex items-center space-x-2">
      <div
        data-testid="terminal-button"
        className="w-3 h-3 bg-[#FF5F56] rounded-full border border-[#E0443E] dark:border-[#AF3732]"
      />
      <div
        data-testid="terminal-button"
        className="w-3 h-3 bg-[#FFBD2E] rounded-full border border-[#DEA123] dark:border-[#9D7B1C]"
      />
      <div
        data-testid="terminal-button"
        className="w-3 h-3 bg-[#27C93F] rounded-full border border-[#1AAB29] dark:border-[#1C8326]"
      />
    </div>
    <div className="text-[#1E1E1E] dark:text-gray-400 text-sm font-medium">
      Terminal
    </div>
    <div className="w-16" />
  </div>
);

const TerminalLine: React.FC<{
  line: string;
  type: TerminalLine['type'];
  isCurrentLine: boolean;
}> = ({ line, type, isCurrentLine }) => {
  const getLineColor = () => {
    switch (type) {
      case 'command':
        return 'text-[#383838] dark:text-[#87D7C6]';
      case 'info':
        return 'text-[#696969] dark:text-[#7A7A7A]';
      case 'next':
        return 'text-[#0070F3] dark:text-[#0070F3]';
      case 'success':
        return 'text-[#27C93F] dark:text-[#27C93F]';
      default:
        return 'text-[#383838] dark:text-[#C4C4C4]';
    }
  };

  return (
    <div data-testid="terminal-line" className={`font-mono ${getLineColor()}`}>
      {line}
      {isCurrentLine && (
        <span
          data-testid="cursor"
          className="animate-pulse ml-0.5 text-[#383838] dark:text-[#C4C4C4]"
        >
          ▊
        </span>
      )}
    </div>
  );
};

export const Terminal: React.FC<TerminalProps> = ({ isVisible = true }) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  const terminalLines = useMemo<TerminalLine[]>(
    () => [
      {
        text: 'levizepeda@Levis-MacBook-Air levizepeda % npm run dev',
        type: 'command',
      },
      { text: '> levizepeda@0.1.0 dev', type: 'info' },
      { text: '> next dev --turbo', type: 'info' },
      { text: '  ▲ Next.js 15.0.0 (turbo)', type: 'next' },
      { text: '  - Local:        http://localhost:3000', type: 'default' },
      { text: ' ✓ Starting...', type: 'success' },
      { text: ' ✓ Ready in 707ms', type: 'success' },
    ],
    []
  );

  // Reset animation
  const resetAnimation = () => {
    setCurrentLine(0);
    setCurrentChar(0);
    setDisplayedLines([]);
    setShouldAnimate(true);
  };

  // Control animation based on visibility
  useEffect(() => {
    if (isVisible) {
      setShouldAnimate(true);
    } else {
      setShouldAnimate(false);
    }
  }, [isVisible]);

  useEffect(() => {
    if (!shouldAnimate) return;

    if (currentLine >= terminalLines.length) {
      const timer = setTimeout(() => {
        resetAnimation();
      }, RESET_DELAY);
      return () => clearTimeout(timer);
    }

    const currentText = terminalLines[currentLine].text;
    if (currentChar <= currentText.length) {
      const timer = setTimeout(
        () => {
          setDisplayedLines((prev) => {
            const newLines = [...prev];
            newLines[currentLine] = currentText.substring(0, currentChar);
            return newLines;
          });
          setCurrentChar((prev) => prev + 1);
        },
        currentLine === 0 ? CHAR_DELAY_FIRST_LINE : CHAR_DELAY_OTHER_LINES
      );
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setCurrentLine((prev) => prev + 1);
      setCurrentChar(0);
    }, LINE_DELAY);

    return () => clearTimeout(timer);
  }, [currentLine, currentChar, terminalLines, shouldAnimate]);

  return (
    <div
      data-testid="terminal-container"
      className="bg-[#FFFFFF] dark:bg-[#1E1E1E] font-mono p-4 rounded-lg shadow-lg w-full max-w-4xl mx-auto"
    >
      <TerminalHeader />
      <div className="bg-[#F5F5F5] dark:bg-black rounded-md p-4 font-mono">
        <div data-testid="terminal-content" className="space-y-1">
          {displayedLines.map((line, index) => (
            <TerminalLine
              key={index}
              line={line}
              type={terminalLines[index].type}
              isCurrentLine={index === currentLine}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Terminal);
