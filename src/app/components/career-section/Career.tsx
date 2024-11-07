'use client';
import { Filter, GitBranch, X } from 'lucide-react';

import type { careerData } from './careerData';
import { TimelineView } from './TimelineView';
import { useCareer } from './useCareer';

const careerButomClass = 'bg-emerald-500 text-white dark:bg-emerald-600';

function Career() {
  const {
    expandedId,
    selectedTechs,
    showFilters,
    isMobile,
    viewMode,
    toggleExpand,
    toggleTech,
    handleFilter,
    clearFilters,
    handleViewMode,
    allTechnologies,
    filteredCareers,
    selectedTechsCount,
  } = useCareer();

  // Componentes internos
  const ViewSelector = () => (
    <div className="flex justify-center gap-2 mb-6">
      <button
        onClick={handleViewMode}
        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
          viewMode === 'timeline'
            ? careerButomClass
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300'
        }`}
      >
        Timeline
      </button>
      <button
        onClick={handleViewMode}
        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
          viewMode === 'git-log'
            ? careerButomClass
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300'
        }`}
      >
        Git Log
      </button>
    </div>
  );

  const GitLogView = ({ careers }: { careers: typeof careerData }) => {
    return (
      <div className="space-y-4 font-mono">
        {careers.map((career) => (
          <div
            key={career.id}
            className="p-4 bg-gray-900 dark:bg-gray-800 rounded-lg text-sm overflow-x-auto transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="text-yellow-500">
              commit {Math.random().toString(16).slice(2, 10)}
            </div>
            <div className="text-blue-400">
              Author: Levi Zepeda &lt;levi.zepeda06@gmail.com&gt;
            </div>
            <div className="text-blue-400">Date: {career.date}</div>
            <div className="text-emerald-400">branch: {career.branch}</div>
            <div className="text-white mt-2 whitespace-pre-wrap">
              <div className="font-bold">{career.title}</div>
              <div className="mt-2 text-gray-300">{career.description}</div>
              <div className="mt-2 text-gray-400">
                Technologies: {career.technologies.join(', ')}
              </div>
              <div className="mt-2 text-gray-300">
                Achievements:
                {career.achievements.map((achievement, index) => (
                  <div key={index} className="ml-4">
                    • {achievement}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section
      id="career"
      className="pt-20 pb-8 md:py-24 bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen"
    >
      <div className="mx-auto px-3 md:px-4 max-w-3xl">
        {/* Header */}
        <div className="flex flex-col items-center gap-4 mb-6 md:mb-8">
          <div className="flex items-center gap-2 relative w-full justify-center">
            <GitBranch
              className="w-5 h-5 md:w-6 md:h-6 text-emerald-600 dark:text-emerald-400"
              aria-label="Main branch icon"
            />
            <h2 className="text-lg md:text-3xl font-mono flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
              <span className="text-gray-600 dark:text-gray-400 whitespace-nowrap">
                git log --graph
              </span>
              <span className="text-emerald-600 dark:text-emerald-400 whitespace-nowrap">
                ~/career
              </span>
            </h2>
            <button
              onClick={handleFilter}
              className="absolute right-0 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors md:hidden"
              aria-label="Toggle filters"
            >
              <Filter
                className={`w-5 h-5 ${
                  selectedTechsCount > 0 ? 'text-emerald-500' : 'text-gray-400'
                }`}
              />
              {selectedTechsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  {selectedTechsCount}
                </span>
              )}
            </button>
          </div>

          {/* Filters section */}
          <div className={`w-full ${!showFilters && 'hidden md:block'}`}>
            {/* Selected Filters */}
            {selectedTechsCount > 0 && (
              <div className="flex flex-wrap gap-1.5 md:gap-2 mt-2 md:mt-4">
                {Array.from(selectedTechs).map((tech) => (
                  <button
                    key={tech}
                    onClick={toggleTech(tech)}
                    className="inline-flex items-center gap-1 px-2 py-1 text-xs md:text-sm rounded-full bg-emerald-500 text-white dark:bg-emerald-600 hover:bg-emerald-600 dark:hover:bg-emerald-700 transition-colors"
                  >
                    {tech}
                    <X className="w-3 h-3" />
                  </button>
                ))}
                <button
                  onClick={clearFilters}
                  className="text-xs md:text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Filter Options */}
            <div className="mt-2 max-h-32 md:max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
              <div className="flex flex-wrap gap-1.5">
                {allTechnologies.map((tech) => (
                  <button
                    key={tech}
                    onClick={toggleTech(tech)}
                    className={`px-2 py-1 text-xs rounded-full transition-colors ${
                      selectedTechs.has(tech)
                        ? careerButomClass
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                    }`}
                  >
                    {tech}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* View Selector */}
          <ViewSelector />
        </div>

        {/* Content */}
        <div className="transition-all duration-300">
          {viewMode === 'timeline' ? (
            <TimelineView
              filteredCareers={filteredCareers}
              expandedId={expandedId}
              isMobile={isMobile}
              selectedTechs={selectedTechs}
              toggleExpand={toggleExpand}
              toggleTech={toggleTech}
              careerButomClass={careerButomClass}
            />
          ) : (
            <GitLogView careers={filteredCareers} />
          )}
        </div>
      </div>
    </section>
  );
}

export default Career;
