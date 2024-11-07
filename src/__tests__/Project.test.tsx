import Project from '@/app/components/project-section/Project';
import { fireEvent, render, screen } from '@testing-library/react';

jest.mock('@/app/components/project-section/projectData', () => ({
  projectData: [
    {
      role: 'Test Role',
      company: 'Test Company',
      period: '2023 - NOW',
      projects: [
        {
          name: 'Test Project',
          achievements: ['Achievement 1', 'Achievement 2'],
        },
      ],
      stack: {
        frontend: ['React', 'TypeScript'],
        tools: ['Git'],
      },
      details: 'Test details',
    },
  ],
}));

describe('Project Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<Project />);
    expect(screen.getByText('Projects')).toBeInTheDocument();
  });

  it('displays project tabs correctly', () => {
    render(<Project />);
    expect(screen.getByText('Test Company')).toBeInTheDocument();
  });

  it('shows project details when tab is selected', () => {
    render(<Project />);
    expect(screen.getByText('Test Role')).toBeInTheDocument();
    expect(screen.getByText('2023 - NOW')).toBeInTheDocument();
  });

  it('displays achievements correctly', () => {
    render(<Project />);
    expect(screen.getByText('Achievement 1')).toBeInTheDocument();
    expect(screen.getByText('Achievement 2')).toBeInTheDocument();
  });

  it('shows tech stack with correct categories', () => {
    render(<Project />);
    expect(screen.getByText('Frontend:')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('handles tab switching correctly', () => {
    render(<Project />);
    const tabButton = screen.getByText('Test Company');
    fireEvent.click(tabButton);
    expect(screen.getByText('Test details')).toBeInTheDocument();
  });

  it('applies correct styling to active tab', () => {
    render(<Project />);
    const tabButton = screen.getByText('Test Company');
    expect(tabButton).toHaveClass('bg-emerald-600', 'text-white');
  });
});
