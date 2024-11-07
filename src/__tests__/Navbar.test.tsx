import { fireEvent, render, screen } from '@testing-library/react';

import Navbar from '@/app/components/nav-bar/Navbar';

//Mock the ThemeContext with variables to control the theme
let mockTheme = 'light';
const traslateFullClass = 'translate-y-full';
const mockToggleTheme = jest.fn();

// Mock of the ThemeContext
jest.mock('@/app/context/ThemeContext', () => ({
  useTheme: () => ({
    theme: mockTheme,
    toggleTheme: mockToggleTheme,
  }),
}));

describe('Navbar Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockTheme = 'light';
  });

  it('renders without crashing', () => {
    render(<Navbar />);
    // Validating that all texts are present
    const homeLinks = screen.getAllByText('Home');
    const aboutLinks = screen.getAllByText('About Me');
    const careerLinks = screen.getAllByText('Career');
    expect(homeLinks).toHaveLength(2);
    expect(aboutLinks).toHaveLength(2);
    expect(careerLinks).toHaveLength(2);
  });

  it('shows correct theme button text based on theme', () => {
    render(<Navbar />);
    const themeText = screen.getByText((content) => content.includes('0F172A'));
    expect(themeText).toBeInTheDocument();
  });

  it('calls toggleTheme when theme button is clicked', () => {
    render(<Navbar />);
    const themeButton = screen.getByText((content) =>
      content.includes('0F172A')
    );
    fireEvent.click(themeButton);
    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });

  it('toggles mobile menu when hamburger button is clicked', () => {
    render(<Navbar />);
    const mobileMenu = screen.getByTestId('mobile-menu');
    const hamburgerButton = screen.getByLabelText('Toggle menu');

    // Check initial state
    expect(mobileMenu).toHaveClass(traslateFullClass);

    // Open the menu
    fireEvent.click(hamburgerButton);
    expect(mobileMenu).toHaveClass('translate-y-0');

    // Close the menu
    fireEvent.click(hamburgerButton);
    expect(mobileMenu).toHaveClass(traslateFullClass);
  });

  it('closes mobile menu when a navigation item is clicked', () => {
    render(<Navbar />);
    const mobileMenu = screen.getByTestId('mobile-menu');
    const hamburgerButton = screen.getByLabelText('Toggle menu');

    // Open the menu
    fireEvent.click(hamburgerButton);
    expect(mobileMenu).toHaveClass('translate-y-0');

    // Click on the Home link in the mobile menu
    const homeLinks = screen.getAllByText('Home');
    fireEvent.click(homeLinks[1]);

    // Check that the menu is closed
    expect(mobileMenu).toHaveClass(traslateFullClass);
  });

  it('renders correct number of navigation items', () => {
    render(<Navbar />);
    const navigationItems = screen.getAllByRole('link');
    expect(navigationItems).toHaveLength(6);
  });

  it('applies dark theme styles when theme is dark', () => {
    // Change the theme to dark before rendering
    mockTheme = 'dark';

    render(<Navbar />);
    const themeText = screen.getByText((content) => content.includes('FFFFFF'));
    expect(themeText).toBeInTheDocument();
  });
});
