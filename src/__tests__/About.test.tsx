import About from '@/app/components/about-section/About';
import { act, fireEvent, render, screen } from '@testing-library/react';

jest.mock('@/app/components/about-section/Terminal', () => ({
  __esModule: true,
  default: ({ isVisible }: { isVisible: boolean }) => (
    <div data-testid="mock-terminal">
      Terminal Component {isVisible ? 'Visible' : 'Hidden'}
    </div>
  ),
}));

jest.mock('@/app/components/about-section/Browser', () => ({
  __esModule: true,
  default: () => <div data-testid="mock-browser">Browser Component</div>,
}));

const observerMap = new Map();
const mockIntersectionObserver = jest.fn((callback) => ({
  observe: jest.fn((element) => {
    observerMap.set(element, callback);
  }),
  unobserve: jest.fn((element) => {
    observerMap.delete(element);
  }),
  disconnect: jest.fn(() => {
    observerMap.clear();
  }),
}));
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
    expect(screen.getByTestId('about-section')).toBeInTheDocument();
  });

  it('shows Terminal component initially', () => {
    render(<About />);

    act(() => {
      jest.advanceTimersByTime(0);
    });

    expect(screen.getByTestId('mock-terminal')).toBeInTheDocument();
    expect(screen.queryByTestId('mock-browser')).not.toBeInTheDocument();
  });

  it('transitions to Browser component after Terminal duration', () => {
    render(<About />);

    // Advance time for Terminal duration
    act(() => {
      jest.advanceTimersByTime(6000); // Terminal duration
      jest.advanceTimersByTime(TRANSITION_DELAY);
    });

    expect(screen.getByTestId('mock-browser')).toBeInTheDocument();
  }, 10000);

  it('shows reset button after animation completes', () => {
    render(<About />);

    // Advance time to complete the animation 😳
    act(() => {
      jest.advanceTimersByTime(6000 + TRANSITION_DELAY);
    });

    const resetButton = screen.getByRole('button', { name: /reiniciar/i });
    expect(resetButton).toBeInTheDocument();

    const resetWrapper = screen.getByTestId('reset-button-wrapper');
    expect(resetWrapper).toHaveClass('opacity-100');
  });

  it('handles reset button click', () => {
    render(<About />);

    act(() => {
      jest.advanceTimersByTime(6000 + TRANSITION_DELAY);
    });

    const resetButton = screen.getByRole('button', { name: /reiniciar/i });

    act(() => {
      fireEvent.click(resetButton);
    });

    // Wait for the transition
    act(() => {
      jest.advanceTimersByTime(TRANSITION_DELAY);
    });

    expect(screen.getByTestId('mock-terminal')).toBeInTheDocument();
  });

  it('responds to intersection observer', () => {
    render(<About />);
    const section = screen.getByTestId('about-section');
    const callback = observerMap.get(section);

    act(() => {
      callback([{ isIntersecting: false }]);
      jest.advanceTimersByTime(0);
    });

    expect(screen.getByTestId('mock-terminal')).toHaveTextContent('Hidden');

    act(() => {
      callback([{ isIntersecting: true }]);
      jest.advanceTimersByTime(0);
    });

    expect(screen.getByTestId('mock-terminal')).toHaveTextContent('Visible');
  });

  it('cleans up on unmount', () => {
    const { unmount } = render(<About />);
    const section = screen.getByTestId('about-section');

    unmount();

    expect(observerMap.has(section)).toBeFalsy();
  });
});
