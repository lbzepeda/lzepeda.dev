'use client';

import { useCallback, useState } from 'react';

import { projectData } from './projectData';
import type { ProjectType } from './ProjectType';

const ProjectHeader: React.FC<{
  role: string;
  period: string;
}> = ({ role, period }) => (
  <header className="flex flex-col md:flex-row md:items-center justify-between mb-4">
    <h3 className="text-xl font-bold text-gray-800 dark:text-white">{role}</h3>
    <div className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400 font-medium">
      <span>•</span>
      <span>{period}</span>
    </div>
  </header>
);

// ProjectDetails component
const ProjectDetails: React.FC<{
  project: {
    name: string;
    url?: string;
    achievements: string[];
  };
}> = ({ project }) => (
  <div className="mb-4">
    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 flex items-center justify-between">
      <span>{project.name}</span>
      {project.url && (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-600 dark:text-emerald-400 text-sm hover:underline"
        >
          View Project →
        </a>
      )}
    </h4>
    <div className="space-y-3">
      <Achievements achievements={project.achievements} />
    </div>
  </div>
);

// ProjectCard component refactored
const ProjectCard: React.FC<{ exp: ProjectType }> = ({ exp }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-[1.01] hover:shadow-xl flex flex-col md:flex-row border border-gray-100 dark:border-gray-700">
      <div className="border-l-4 border-emerald-400 dark:border-emerald-300 flex-1">
        <div className="p-6">
          <ProjectHeader role={exp.role} period={exp.period} />

          {exp.projects.map((project, idx) => (
            <ProjectDetails key={idx} project={project} />
          ))}

          <div className="mt-4">
            <TechStack stack={exp.stack} />
          </div>
        </div>
      </div>

      <div className="md:w-1/4 bg-gray-50 dark:bg-gray-700/50 p-5 flex items-center justify-center md:justify-start md:items-start">
        <div className="text-center md:text-left">
          <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
            Overview
          </h4>
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            {exp.details}
          </p>
        </div>
      </div>
    </div>
  );
};

const Achievements: React.FC<{ achievements: string[] }> = ({
  achievements,
}) => (
  <div>
    <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
      Key Achievements
    </h4>
    <ul className="space-y-1.5">
      {achievements.map((achievement, idx) => (
        <li
          key={idx}
          className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
        >
          <span className="text-emerald-500 dark:text-emerald-400 mt-1">→</span>
          <span>{achievement}</span>
        </li>
      ))}
    </ul>
  </div>
);

const TechStack: React.FC<{ stack: ProjectType['stack'] }> = ({ stack }) => (
  <div>
    <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">
      Tech Stack
    </h4>
    <div className="space-y-3">
      {stack.frontend && (
        <TechCategory title="Frontend" items={stack.frontend} color="emerald" />
      )}
      {stack.backend && (
        <TechCategory title="Backend" items={stack.backend} color="blue" />
      )}
      {stack.tools && (
        <TechCategory title="Tools" items={stack.tools} color="green" />
      )}
    </div>
  </div>
);

const TechCategory: React.FC<{
  title: string;
  items: string[];
  color: 'emerald' | 'blue' | 'green';
}> = ({ title, items, color }) => {
  const [showAll, setShowAll] = useState(false);
  const ITEMS_TO_SHOW = 5;

  const colorClasses = {
    emerald: {
      tag: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300',
      button:
        'text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300',
    },
    blue: {
      tag: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
      button:
        'text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300',
    },
    green: {
      tag: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
      button:
        'text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300',
    },
  };

  const displayItems = showAll ? items : items.slice(0, ITEMS_TO_SHOW);
  const hasMore = items.length > ITEMS_TO_SHOW;

  const handleShowAll = useCallback(() => {
    setShowAll((prev) => !prev);
  }, []);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs text-gray-500 dark:text-gray-400">{title}:</span>
      {displayItems.map((item, idx) => (
        <span
          key={idx}
          className={`px-2 py-1 text-xs rounded-full ${colorClasses[color].tag}`}
        >
          {item}
        </span>
      ))}
      {hasMore && (
        <button
          onClick={handleShowAll}
          className={`px-2 py-1 text-xs font-medium ${colorClasses[color].button} transition-colors`}
        >
          {showAll ? '- less' : `+${items.length - ITEMS_TO_SHOW}`}
        </button>
      )}
    </div>
  );
};

export const Project = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleActiveTab = useCallback(
    (index: number) => () => {
      setActiveTab((prev) => {
        if (prev === index) return prev;
        return index;
      });
    },
    []
  );

  return (
    <section
      id="project"
      className="relative py-20 bg-gray-50 dark:bg-gray-900 overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8885_2px,transparent_2px),linear-gradient(to_bottom,#8885_2px,transparent_2px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000,transparent)] animate-move-grid will-change-transform" />
      </div>

      <div className="container relative mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            Projects
          </h2>
          <div className="w-24 h-1 bg-emerald-500 mx-auto mb-8 rounded-full" />
          <p className="text-gray-600 dark:text-gray-400">
            A collection of my professional work and achievements
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          {/* Contenedor de tabs con scroll horizontal en móvil */}
          <div className="mb-8 -mx-4 px-4 md:px-0 md:mx-0">
            <div className="flex overflow-x-auto md:overflow-visible md:justify-center scrollbar-hide pb-2 md:pb-0">
              <div className="flex space-x-2 md:space-x-3">
                {projectData.map((exp, index) => (
                  <button
                    key={index}
                    className={`
              whitespace-nowrap px-4 py-2 text-sm font-medium rounded 
              transition-colors shrink-0
              ${
                activeTab === index
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }
            `}
                    onClick={handleActiveTab(index)}
                  >
                    {exp.company}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <ProjectCard exp={projectData[activeTab]} />
        </div>
      </div>
    </section>
  );
};

export default Project;
// Removed the custom useCallback function as it is not needed.
