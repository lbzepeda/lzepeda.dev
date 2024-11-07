'use client';
import { useCallback, useState } from 'react';

import { useTheme } from '../../context/ThemeContext';

const NAVIGATION_ITEMS = [
  { href: '#home', label: 'Home', number: ' 0.' },
  { href: '#about', label: 'About Me', number: ' 1.' },
  { href: '#career', label: 'Career', number: ' 2.' },
  { href: '#project', label: 'Projects', number: ' 3.' },
] as const;

function Navbar() {
  const { toggleTheme, theme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 z-50">
      <div className="max-w-5xl mx-auto px-6">
        <nav className="flex items-center justify-between h-16">
          <button
            onClick={toggleTheme}
            className={`
              font-mono text-sm px-3 py-1.5 rounded-lg 
              border border-slate-200 dark:border-slate-700 
              hover:bg-slate-100 dark:hover:bg-slate-800 
              transition-all duration-300
              text-slate-600 dark:text-slate-400
              focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-500
              disabled:cursor-not-allowed
              tracking-wider
            `}
          >
            #{theme === 'light' ? '0F172A' : 'FFFFFF'}
          </button>

          {/* Hamburger Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 ml-auto">
            {NAVIGATION_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="group relative text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <span>{item.label}</span>
                <span className="text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300">
                  {item.number}
                </span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-slate-200 dark:bg-slate-700 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </div>
        </nav>

        {/* Mobile Navigation Menu */}
        <div
          data-testid="mobile-menu"
          className={`md:hidden fixed inset-0 top-16 bg-white dark:bg-slate-900 transition-transform duration-300 ease-in-out ${
            isMenuOpen ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <div className="flex flex-col items-center pt-8 gap-8">
            {NAVIGATION_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={toggleMenu}
                className="group text-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <span>{item.label}</span>
                <span className="text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300">
                  {item.number}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
