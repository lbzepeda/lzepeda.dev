import { act, fireEvent, render, screen } from '@testing-library/react';

import About from '@/app/components/about-section/About';

const namespace = 'about-section';
const mockTerminalName = 'mock-terminal';
// Mocks
jest.mock('@/app/components/about-section/Terminal', () => {
  return {
    __esModule: true,
    default: function MockTerminal({ isVisible }: { isVisible: boolean }) {
      return (
        <div data-testid={mockTerminalName}>
          Terminal Component {isVisible ? 'Visible' : 'Hidden'}
        </div>
      );
    },
  };
});

jest.mock('@/app/components/about-section/Browser', () => {
  return {
    __esModule: true,
    default: function MockBrowser() {
      return <div data-testid="mock-browser">Browser Component</div>;
    },
  };
});

// Mock IntersectionObserver
const observerMap = new Map();
beforeAll(() => {
  window.IntersectionObserver = jest.fn((callback) => ({
    root: null,
    rootMargin: '',
    thresholds: [],
    observe: jest.fn((element) => {
      observerMap.set(element, callback);
    }),
    unobserve: jest.fn((element) => {
      observerMap.delete(element);
    }),
    disconnect: jest.fn(() => {
      observerMap.clear();
    }),
    takeRecords: jest.fn(() => []),
  }));
});

const TRANSITION_DELAY = 300;

describe('About Component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    observerMap.clear();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('renders without crashing', () => {
    render(<About />);
    expect(screen.getByTestId(namespace)).toBeInTheDocument();
  });

  it('shows Terminal component initially', () => {
    render(<About />);

    act(() => {
      jest.advanceTimersByTime(0);
    });

    expect(screen.getByTestId(mockTerminalName)).toBeInTheDocument();
    expect(screen.queryByTestId('mock-browser')).not.toBeInTheDocument();
  });

  it('transitions to Browser component after Terminal duration', () => {
    render(<About />);

    act(() => {
      jest.advanceTimersByTime(6000 + TRANSITION_DELAY);
    });

    expect(screen.getByTestId('mock-browser')).toBeInTheDocument();
  });

  it('shows reset button after animation completes', () => {
    render(<About />);

    // First advance the time to complete the Terminal animation
    act(() => {
      jest.advanceTimersByTime(6000);
    });

    // Then advance the transition time for the Browser to appear
    act(() => {
      jest.advanceTimersByTime(TRANSITION_DELAY);
    });

    // Wait one more tick for the animationCompleted state to update
    act(() => {
      jest.runOnlyPendingTimers();
    });

    // Verify that the button is visible
    const resetWrapper = screen.getByTestId('reset-button-wrapper');
    expect(resetWrapper.className).toContain('opacity-100');
  });

  it('handles reset button click', () => {
    render(<About />);

    // Advance the time to complete the initial animation
    act(() => {
      jest.advanceTimersByTime(6000); // Terminal duration
      jest.advanceTimersByTime(TRANSITION_DELAY); // Transition to Browser
      jest.runOnlyPendingTimers(); // Ensure all timers complete
    });

    const resetButton = screen.getByRole('button', { name: /reiniciar/i });

    act(() => {
      fireEvent.click(resetButton);
    });

    act(() => {
      jest.advanceTimersByTime(TRANSITION_DELAY);
    });

    expect(screen.getByTestId(mockTerminalName)).toBeInTheDocument();
  });

  it('responds to intersection observer', () => {
    render(<About />);
    const section = screen.getByTestId(namespace);
    const callback = observerMap.get(section);

    act(() => {
      callback([{ isIntersecting: false }]);
      jest.advanceTimersByTime(0);
    });

    expect(screen.getByTestId(mockTerminalName)).toHaveTextContent('Hidden');

    act(() => {
      callback([{ isIntersecting: true }]);
      jest.advanceTimersByTime(0);
    });

    expect(screen.getByTestId(mockTerminalName)).toHaveTextContent('Visible');
  });

  it('cleans up on unmount', () => {
    const { unmount } = render(<About />);
    const section = screen.getByTestId(namespace);

    unmount();

    expect(observerMap.has(section)).toBeFalsy();
  });
});
