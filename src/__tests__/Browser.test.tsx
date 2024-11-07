import Browser from '@/app/components/about-section/Browser';
import { render, screen } from '@testing-library/react';

// Mock del componente Image de Next.js
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />;
  },
}));

describe('Browser Component', () => {
  it('renders without crashing', () => {
    render(<Browser />);
    expect(screen.getByText('About Me')).toBeInTheDocument();
  });

  it('displays the header with correct URL', () => {
    render(<Browser />);
    expect(screen.getByText('http://localhost:3000')).toBeInTheDocument();
  });

  it('displays all main content sections', () => {
    render(<Browser />);

    // Verifica el título
    expect(
      screen.getByRole('heading', { name: 'About Me' })
    ).toBeInTheDocument();

    // Verifica texto importante
    expect(screen.getByText(/I'm Levi Zepeda/)).toBeInTheDocument();
    expect(screen.getByText(/Frontend developer/)).toBeInTheDocument();
    expect(
      screen.getByText(/modern JavaScript technologies/)
    ).toBeInTheDocument();
    expect(screen.getByText(/continuous learning/)).toBeInTheDocument();
    expect(screen.getByText(/innovation/)).toBeInTheDocument();
  });

  it('renders the profile image with correct attributes', () => {
    render(<Browser />);
    const image = screen.getByAltText('Levi Zepeda');

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/me.jpg');
    expect(image).toHaveAttribute('width', '500');
    expect(image).toHaveAttribute('height', '500');
  });

  it('applies correct styling classes', () => {
    render(<Browser />);

    // Verifica el contenedor principal
    const mainContainer = screen.getByTestId('browser-container');
    expect(mainContainer).toHaveClass(
      'bg-white',
      'dark:bg-gray-800',
      'rounded-lg',
      'shadow-lg'
    );

    // Verifica el contenedor del contenido
    const contentContainer = screen.getByTestId('content-container');
    expect(contentContainer).toHaveClass(
      'bg-gray-100',
      'dark:bg-gray-900',
      'rounded-lg'
    );

    // Verifica el contenedor de la imagen
    const imageContainer = screen.getByTestId('image-container');
    expect(imageContainer).toHaveClass(
      'relative',
      'rounded-full',
      'overflow-hidden'
    );
  });

  it('has responsive classes for different screen sizes', () => {
    render(<Browser />);

    const flexContainer = screen.getByTestId('flex-container');
    expect(flexContainer).toHaveClass(
      'flex-col',
      'md:flex-row',
      'items-center',
      'gap-4',
      'md:gap-8'
    );
  });
});
