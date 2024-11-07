import { act, render, screen } from '@testing-library/react';

import Terminal from '@/app/components/about-section/Terminal';

// Mock timers
jest.useFakeTimers();

describe('Terminal Component', () => {
  beforeEach(() => {
    jest.clearAllTimers();
  });

  it('renders without crashing', () => {
    render(<Terminal />);
    expect(screen.getByText('Terminal')).toBeInTheDocument();
    const header = screen.getByTestId('terminal-header');
    expect(header).toHaveClass('flex items-center justify-between');
  });

  it('renders terminal header with correct colors', () => {
    render(<Terminal />);
    const headerButtons = screen.getAllByTestId('terminal-button');

    expect(headerButtons[0]).toHaveClass('bg-[#FF5F56]');
    expect(headerButtons[1]).toHaveClass('bg-[#FFBD2E]');
    expect(headerButtons[2]).toHaveClass('bg-[#27C93F]');
  });

  it('starts animation when isVisible is true', async () => {
    render(<Terminal isVisible={true} />);

    act(() => {
      jest.advanceTimersByTime(30); // Dealay
    });

    const terminalContent = screen.getByTestId('terminal-content');
    expect(terminalContent).toHaveClass('space-y-1');
  });

  it('does not show content when isVisible is false', () => {
    render(<Terminal isVisible={false} />);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    const terminalContent = screen.getByTestId('terminal-content');
    expect(terminalContent.children.length).toBe(0);
  });

  it('shows command line with correct styling', async () => {
    render(<Terminal isVisible={true} />);

    act(() => {
      jest.advanceTimersByTime(30);
    });

    const commandLine = screen.getByTestId('terminal-line');
    expect(commandLine).toHaveClass('font-mono', 'text-[#383838]');
  });

  it('shows cursor when animation is in progress', () => {
    render(<Terminal isVisible={true} />);

    act(() => {
      jest.advanceTimersByTime(30);
    });

    const cursor = screen.getByTestId('cursor');
    expect(cursor).toHaveClass('animate-pulse');
  });

  it('applies dark mode classes correctly', () => {
    render(<Terminal />);
    const container = screen.getByTestId('terminal-container');
    expect(container).toHaveClass('dark:bg-[#1E1E1E]');
  });
});
