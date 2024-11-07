import { render, screen } from '@testing-library/react';

import Browser from '@/app/components/about-section/Browser';

// Definir interfaz para las props de Image
interface ImageProps extends React.ComponentPropsWithoutRef<'img'> {
  src: string;
  alt: string;
  width: number;
  height: number;
}

// Mock mejorado para next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: function MockImage(props: ImageProps) {
    const { alt, ...rest } = props;
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={alt} {...rest} data-testid="next-image" />;
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

    // Verificar el título
    expect(
      screen.getByRole('heading', { name: 'About Me' })
    ).toBeInTheDocument();

    // Verificar texto importante
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
    const image = screen.getByTestId('next-image');

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/me.jpg');
    expect(image).toHaveAttribute('alt', 'Levi Zepeda');
    expect(image).toHaveAttribute('width', '500');
    expect(image).toHaveAttribute('height', '500');
  });

  it('applies correct styling classes', () => {
    render(<Browser />);

    // Verificar el contenedor principal
    const mainContainer = screen.getByTestId('browser-container');
    expect(mainContainer).toHaveClass(
      'bg-white',
      'dark:bg-gray-800',
      'rounded-lg',
      'shadow-lg'
    );

    // Verificar el contenedor de contenido
    const contentContainer = screen.getByTestId('content-container');
    expect(contentContainer).toHaveClass(
      'bg-gray-100',
      'dark:bg-gray-900',
      'rounded-lg'
    );

    // Verificar el contenedor de la imagen
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
