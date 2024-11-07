import { fireEvent, render, screen } from '@testing-library/react';

import Career from '@/app/components/career-section/Career';

// Mock the useCareer hook
const mockUseCareer = {
  expandedId: null,
  selectedTechs: new Set(),
  showFilters: false,
  isMobile: false,
  viewMode: 'timeline',
  toggleExpand: jest.fn(),
  toggleTech: jest.fn(),
  handleFilter: jest.fn(),
  clearFilters: jest.fn(),
  handleViewMode: jest.fn(),
  allTechnologies: ['React', 'Node.js', 'Python'],
  filteredCareers: [
    {
      id: 1,
      title: 'Test Role',
      date: 'Jan 2024 - Present',
      description: 'Test description',
      branch: 'main',
      technologies: ['React', 'Node.js'],
      achievements: ['Achievement 1', 'Achievement 2'],
      role: 'Test Role',
      company: 'Test Company',
      duration: 'January 2024 - Present',
    },
  ],
  selectedTechsCount: 0,
};

// Mock the hook
jest.mock('@/app/components/career-section/useCareer', () => ({
  useCareer: () => mockUseCareer,
}));

// Mock the TimelineView
jest.mock('@/app/components/career-section/TimelineView', () => ({
  TimelineView: jest.fn(({ filteredCareers }) => (
    <div data-testid="timeline-view">
      Timeline View - {filteredCareers.length} careers
    </div>
  )),
}));

describe('Career Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<Career />);
    expect(screen.getByText('git log --graph')).toBeInTheDocument();
    expect(screen.getByText('~/career')).toBeInTheDocument();
  });

  it('renders Timeline view by default', () => {
    render(<Career />);
    expect(screen.getByTestId('timeline-view')).toBeInTheDocument();
  });

  it('renders GitLog view when viewMode is git-log', () => {
    mockUseCareer.viewMode = 'git-log';
    render(<Career />);
    expect(screen.getByText(/commit/)).toBeInTheDocument();
    expect(
      screen.getByText('Author: Levi Zepeda <levi.zepeda06@gmail.com>')
    ).toBeInTheDocument();
  });

  it('displays technology filters correctly', () => {
    render(<Career />);
    mockUseCareer.allTechnologies.forEach((tech) => {
      expect(screen.getByText(tech)).toBeInTheDocument();
    });
  });

  it('handles view mode toggle correctly', () => {
    render(<Career />);
    const timelineButton = screen.getByText('Timeline');
    const gitLogButton = screen.getByText('Git Log');

    fireEvent.click(gitLogButton);
    expect(mockUseCareer.handleViewMode).toHaveBeenCalled();

    fireEvent.click(timelineButton);
    expect(mockUseCareer.handleViewMode).toHaveBeenCalled();
  });

  it('displays selected filters when technologies are selected', () => {
    mockUseCareer.selectedTechs = new Set(['React']);
    mockUseCareer.selectedTechsCount = 1;

    render(<Career />);
    expect(screen.getByText('Clear all')).toBeInTheDocument();
  });

  it('handles filter clearing correctly', () => {
    mockUseCareer.selectedTechs = new Set(['React']);
    mockUseCareer.selectedTechsCount = 1;

    render(<Career />);
    const clearButton = screen.getByText('Clear all');
    fireEvent.click(clearButton);
    expect(mockUseCareer.clearFilters).toHaveBeenCalled();
  });

  it('applies correct styling classes to career items', () => {
    mockUseCareer.viewMode = 'git-log';
    render(<Career />);

    const careerItem = screen.getByText('Test Role').closest('div.p-4'); // Find the parent div with the class p-4

    expect(careerItem).toHaveClass(
      'p-4',
      'bg-gray-900',
      'dark:bg-gray-800',
      'rounded-lg'
    );
  });

  it('toggles filter visibility on mobile', () => {
    mockUseCareer.isMobile = true;
    render(<Career />);

    const filterButton = screen.getByLabelText('Toggle filters');
    fireEvent.click(filterButton);
    expect(mockUseCareer.handleFilter).toHaveBeenCalled();
  });

  it('shows filter count badge when filters are active', () => {
    mockUseCareer.selectedTechsCount = 2;
    render(<Career />);

    const badge = screen.getByText('2');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-emerald-500', 'text-white');
  });

  it('renders achievements list correctly', () => {
    mockUseCareer.viewMode = 'git-log';
    render(<Career />);

    mockUseCareer.filteredCareers[0].achievements.forEach((achievement) => {
      expect(
        screen.getByText((content) => content.includes(achievement))
      ).toBeInTheDocument();
    });
  });

  // Test to verify accessibility
  it('has accessible buttons and icons', () => {
    render(<Career />);
    expect(screen.getByLabelText('Main branch icon')).toBeInTheDocument();
    expect(screen.getByLabelText('Toggle filters')).toBeInTheDocument();
  });
});
