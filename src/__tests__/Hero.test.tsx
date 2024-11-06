import { act, render, screen } from '@testing-library/react';

import Hero from '@/app/components/hero-section/Hero';
import { titles } from '@/app/components/hero-section/Titles';

// Mock of ThemeContext
let mockTheme = 'light';
jest.mock('@/app/context/ThemeContext', () => ({
  useTheme: () => ({
    theme: mockTheme,
  }),
}));

jest.useFakeTimers();

// Const for component time
const TYPE_SPEED = 100;
const DELETE_SPEED = 50;
const PAUSE_TIME = 2000;

describe('Hero Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockTheme = 'light';
  });

  it('renders initial state correctly', () => {
    render(<Hero />);
    expect(screen.getByText('Frontend developer')).toBeInTheDocument();
    expect(
      screen.getByText(/Frontend developer dedicado/i)
    ).toBeInTheDocument();
  });

  it('types out the first title correctly', () => {
    render(<Hero />);

    // Advance time for each character with TYPE_SPEED
    for (let i = 0; i < titles[0].textParts[0].text.length; i++) {
      act(() => {
        jest.advanceTimersByTime(TYPE_SPEED);
      });
    }

    const titleContainer = screen.getByTestId('title-container');
    const spans = titleContainer.querySelectorAll('span');
    expect(spans[0].textContent).toBe('lzepeda');
  });

  it('shows cursor while typing', () => {
    render(<Hero />);
    const cursor = screen.getByText('|');
    expect(cursor).toHaveClass('animate-pulse');
  });

  it('applies correct theme classes', () => {
    render(<Hero />);
    const section = screen.getByTestId('hero-section');
    expect(section).toHaveClass('bg-white', 'dark:bg-slate-900');
  });

  it('completes full typing sequence', async () => {
    render(<Hero />);

    // 1. Types the first title
    const firstTitleLength = getFullTextLength(0);
    for (let i = 0; i < firstTitleLength; i++) {
      act(() => {
        jest.advanceTimersByTime(TYPE_SPEED);
      });
    }

    // 2. Pause before deleting
    act(() => {
      jest.advanceTimersByTime(PAUSE_TIME);
    });

    // 3. Deletes the first title
    for (let i = 0; i < firstTitleLength; i++) {
      act(() => {
        jest.advanceTimersByTime(DELETE_SPEED);
      });
    }

    // 4. Types the second title
    const secondTitleLength = getFullTextLength(1);
    for (let i = 0; i < secondTitleLength; i++) {
      act(() => {
        jest.advanceTimersByTime(TYPE_SPEED);
      });
    }

    // Extra time to ensure everything is completed
    act(() => {
      jest.advanceTimersByTime(TYPE_SPEED);
    });

    const titleContainer = screen.getByTestId('title-container');
    const spans = titleContainer.querySelectorAll('span');
    expect(spans[0].textContent).toBe('Levi Zepeda');
  });

  it('renders highlighted words with correct styling', () => {
    render(<Hero />);

    const highlightedWords = screen.getAllByText((content, element) => {
      return (
        !!element?.className?.includes('text-purple-500') &&
        content.trim().length > 0
      );
    });

    expect(highlightedWords).toHaveLength(5);
    highlightedWords.forEach((word) => {
      expect(word).toHaveClass('text-purple-500', 'dark:text-purple-400');
    });
  });

  it('maintains responsive layout classes', () => {
    render(<Hero />);
    const titleContainer = screen.getByTestId('title-container');
    expect(titleContainer).toHaveClass('text-4xl', 'md:text-6xl');

    const mainContainer = screen.getByTestId('hero-section');
    expect(mainContainer).toHaveClass('min-h-screen', 'w-full');
  });
});

function getFullTextLength(index: number): number {
  return titles[index].textParts.reduce(
    (acc, part) => acc + part.text.length,
    0
  );
}
