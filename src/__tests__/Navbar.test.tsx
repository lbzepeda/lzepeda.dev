import Navbar from '@/app/components/nav-bar/Navbar';
import { fireEvent, render, screen } from '@testing-library/react';

// Constants
const THEME_COLORS = {
  LIGHT: '0F172A',
  DARK: 'FFFFFF',
} as const;

const CSS_CLASSES = {
  MENU_HIDDEN: 'translate-y-full',
  MENU_VISIBLE: 'translate-y-0',
} as const;

// Mock setup
let mockTheme = 'light';
const mockToggleTheme = jest.fn();

jest.mock('@/app/context/ThemeContext', () => ({
  useTheme: () => ({
    theme: mockTheme,
    toggleTheme: mockToggleTheme,
  }),
}));

describe('Navbar Component', () => {
  const renderNavbar = () => {
    return render(<Navbar />);
  };

  const getHamburgerButton = () => screen.getByLabelText('Toggle menu');
  const getMobileMenu = () => screen.getByTestId('mobile-menu');
  const getThemeButton = () =>
    screen.getByText((content) =>
      content.includes(
        mockTheme === 'light' ? THEME_COLORS.LIGHT : THEME_COLORS.DARK
      )
    );

  beforeEach(() => {
    mockTheme = 'light';
    jest.clearAllMocks();
  });

  describe('Navigation Items', () => {
    it('renders all navigation items in both desktop and mobile views', () => {
      renderNavbar();

      const navigationItems = [
        { text: 'Home', expectedCount: 2 },
        { text: 'About Me', expectedCount: 2 },
        { text: 'Career', expectedCount: 2 },
        { text: 'Projects', expectedCount: 2 },
        { text: 'Contact', expectedCount: 2 },
      ];

      navigationItems.forEach(({ text, expectedCount }) => {
        const items = screen.getAllByText(text);
        expect(items).toHaveLength(expectedCount);
      });
    });

    it('renders correct number of links including resume button', () => {
      renderNavbar();
      const links = screen.getAllByRole('link');
      // 5 nav items × 2 (desktop + mobile) = 10 + 2 resume buttons = 12
      expect(links).toHaveLength(12);
    });
  });

  describe('Theme Toggle', () => {
    it('shows correct theme button text and toggles theme', () => {
      renderNavbar();
      const themeButton = getThemeButton();

      expect(themeButton).toHaveTextContent(`#${THEME_COLORS.LIGHT}`);

      fireEvent.click(themeButton);
      expect(mockToggleTheme).toHaveBeenCalledTimes(1);
    });

    it('shows correct color code when theme is dark', () => {
      mockTheme = 'dark';
      renderNavbar();

      const themeButton = getThemeButton();
      expect(themeButton).toHaveTextContent(`#${THEME_COLORS.DARK}`);
    });
  });

  describe('Mobile Menu', () => {
    it('handles mobile menu toggle correctly', () => {
      renderNavbar();
      const mobileMenu = getMobileMenu();
      const hamburgerButton = getHamburgerButton();

      // Initial state
      expect(mobileMenu).toHaveClass(CSS_CLASSES.MENU_HIDDEN);

      // Open menu
      fireEvent.click(hamburgerButton);
      expect(mobileMenu).toHaveClass(CSS_CLASSES.MENU_VISIBLE);

      // Close menu
      fireEvent.click(hamburgerButton);
      expect(mobileMenu).toHaveClass(CSS_CLASSES.MENU_HIDDEN);
    });

    it('closes mobile menu when navigation item is clicked', () => {
      renderNavbar();
      const mobileMenu = getMobileMenu();

      // Open menu
      fireEvent.click(getHamburgerButton());
      expect(mobileMenu).toHaveClass(CSS_CLASSES.MENU_VISIBLE);

      // Click mobile navigation item
      const mobileNavItems = screen.getAllByText('Home');
      fireEvent.click(mobileNavItems[1]);

      expect(mobileMenu).toHaveClass(CSS_CLASSES.MENU_HIDDEN);
    });
  });

  describe('Resume Button', () => {
    it('renders resume button with correct attributes', () => {
      renderNavbar();
      const resumeButtons = screen.getAllByText('Resume');

      resumeButtons.forEach((button) => {
        const link = button.closest('a');
        expect(link).toHaveAttribute('href', '/resume.pdf');
        expect(link).toHaveAttribute('download');
      });
    });
  });
});
