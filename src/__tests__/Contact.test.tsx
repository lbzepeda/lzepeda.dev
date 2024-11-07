import Contact from '@/app/components/contact-section/Contact';
import { fireEvent, render, screen } from '@testing-library/react';

describe('Contact Component', () => {
  const email = 'levi.zepeda06@gmail.com';
  const linkedIn = 'https://www.linkedin.com/in/levi-zepeda-96090494/';

  it('renders without crashing', () => {
    render(<Contact />);
    expect(screen.getByText("Let's Connect")).toBeInTheDocument();
  });

  it('displays all contact buttons and links', () => {
    render(<Contact />);

    // Email button
    const emailButton = screen.getByText('Send me an email');
    expect(emailButton).toBeInTheDocument();
    expect(emailButton.closest('a')).toHaveAttribute('href', `mailto:${email}`);

    // Resume download button
    const resumeButton = screen.getByText('Download Resume');
    expect(resumeButton).toBeInTheDocument();
    expect(resumeButton.closest('a')).toHaveAttribute(
      'href',
      '/levizepeda cv.pdf'
    );
    expect(resumeButton.closest('a')).toHaveAttribute('download');

    // LinkedIn link
    const linkedInLink = screen.getByLabelText('LinkedIn Profile');
    expect(linkedInLink).toBeInTheDocument();
    expect(linkedInLink).toHaveAttribute('href', linkedIn);
    expect(linkedInLink).toHaveAttribute('target', '_blank');
    expect(linkedInLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('shows email in the footer section', () => {
    render(<Contact />);
    const emailLink = screen.getByText(email);
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute('href', `mailto:${email}`);
  });

  it('applies correct styles to primary buttons', () => {
    render(<Contact />);
    const emailButton = screen.getByText('Send me an email').closest('a');
    expect(emailButton).toHaveClass(
      'bg-emerald-600',
      'text-white',
      'rounded-xl'
    );
  });

  it('applies correct styles to secondary buttons', () => {
    render(<Contact />);
    const resumeButton = screen.getByText('Download Resume').closest('a');
    expect(resumeButton).toHaveClass(
      'border-2',
      'border-emerald-600',
      'text-emerald-600',
      'rounded-xl'
    );
  });

  it('shows LinkedIn text on hover', () => {
    render(<Contact />);
    const linkedInLink = screen.getByLabelText('LinkedIn Profile');
    const linkedInText = screen.getByText('LinkedIn');

    // Initial state
    expect(linkedInText).toHaveClass('opacity-0');

    // Hover state
    fireEvent.mouseOver(linkedInLink);
    expect(linkedInText).toHaveClass('group-hover:opacity-100');
  });

  it('has correct section id for navigation', () => {
    render(<Contact />);
    const section = screen.getByTestId('contact-section');
    expect(section).toHaveAttribute('id', 'contact');
  });

  it('displays social media section text', () => {
    render(<Contact />);
    expect(screen.getByText('Or find me on social media')).toBeInTheDocument();
  });
});
