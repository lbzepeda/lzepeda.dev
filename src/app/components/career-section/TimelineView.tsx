'use Client';
import { GitBranchPlus, GitCommit, GitMerge } from 'lucide-react';

interface CareerIconProps {
  mergeFrom?: boolean;
  branch: string;
}

export function CareerIcon({ mergeFrom, branch }: CareerIconProps) {
  return (
    <div className="shrink-0 pt-1">
      {mergeFrom ? (
        <GitMerge className="w-6 h-6 md:w-8 md:h-8 text-orange-500 dark:text-orange-400" />
      ) : branch.includes('feature/') ? (
        <GitBranchPlus className="w-6 h-6 md:w-8 md:h-8 text-violet-500 dark:text-violet-400" />
      ) : (
        <GitCommit className="w-6 h-6 md:w-8 md:h-8 text-emerald-600 dark:text-emerald-400" />
      )}
    </div>
  );
}

// CareerHeader.tsx
import { ChevronDown, ChevronUp } from 'lucide-react';

interface CareerHeaderProps {
  title: string;
  date: string;
  id: number;
  expandedId: number | null;
  isMobile: boolean;
  toggleExpand: (id: number) => () => void;
}

export function CareerHeader({
  title,
  date,
  id,
  expandedId,
  isMobile,
  toggleExpand,
}: CareerHeaderProps) {
  return (
    <button
      onClick={toggleExpand(id)}
      className={`w-full flex flex-col gap-1 text-left ${
        !isMobile && 'hover:opacity-75 transition-opacity'
      }`}
      {...(isMobile ? { disabled: true } : {})}
    >
      <h3 className="text-sm md:text-lg font-semibold text-emerald-600 dark:text-emerald-400 pr-8">
        {title}
      </h3>
      <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-mono">
        {date}
      </span>
      {!isMobile && (
        <div className="absolute top-0 right-0">
          {expandedId === id ? (
            <ChevronUp className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />
          )}
        </div>
      )}
    </button>
  );
}

// TechButton.tsx
interface TechButtonProps {
  tech: string;
  isSelected: boolean;
  onClick: (tech: string) => () => void;
  buttonClass: string;
}

export function TechButton({
  tech,
  isSelected,
  onClick,
  buttonClass,
}: TechButtonProps) {
  return (
    <button
      onClick={onClick(tech)}
      className={`px-2 py-0.5 text-xs rounded-full transition-colors ${
        isSelected
          ? buttonClass
          : 'bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300'
      }`}
    >
      {tech}
    </button>
  );
}

// CareerContent.tsx
interface CareerContentProps {
  description: string;
  technologies: string[];
  achievements: string[];
  branch: string;
  isMobile: boolean;
  expandedId: number | null;
  careerId: number;
  selectedTechs: Set<string>;
  toggleTech: (tech: string) => () => void;
  careerButomClass: string;
}

export function CareerContent({
  description,
  technologies,
  achievements,
  branch,
  isMobile,
  expandedId,
  careerId,
  selectedTechs,
  toggleTech,
  careerButomClass,
}: CareerContentProps) {
  const isExpanded = isMobile || expandedId === careerId;

  return (
    <div
      className={`grid transition-all duration-300 ease-out ${
        isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
      }`}
    >
      <div className="overflow-hidden">
        <div
          className={`transition-all duration-300 ease-out pt-3 ${
            isExpanded ? 'translate-y-0' : '-translate-y-4'
          }`}
        >
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 mb-3">
            {description}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-3">
            {technologies.map((tech, techIndex) => (
              <TechButton
                key={techIndex}
                tech={tech}
                isSelected={selectedTechs.has(tech)}
                onClick={toggleTech}
                buttonClass={careerButomClass}
              />
            ))}
          </div>

          <ul className="space-y-2 mb-3">
            {achievements.map((achievement, achIndex) => (
              <li
                key={achIndex}
                className="flex items-start gap-2 text-xs md:text-sm text-gray-700 dark:text-gray-300"
              >
                <span className="mt-1.5 h-1 w-1 rounded-full bg-emerald-600 dark:bg-emerald-400 shrink-0" />
                {achievement}
              </li>
            ))}
          </ul>

          <code className="text-xs md:text-sm font-mono text-gray-500 dark:text-gray-400">
            branch: {branch}
          </code>
        </div>
      </div>
    </div>
  );
}

// TimelineView actualizado
import type { careerData } from './careerData';

interface TimelineViewProps {
  filteredCareers: typeof careerData;
  expandedId: number | null;
  isMobile: boolean;
  selectedTechs: Set<string>;
  toggleExpand: (id: number) => () => void;
  toggleTech: (tech: string) => () => void;
  careerButomClass: string;
}

export function TimelineView({
  filteredCareers,
  expandedId,
  isMobile,
  selectedTechs,
  toggleExpand,
  toggleTech,
  careerButomClass,
}: TimelineViewProps) {
  return (
    <div className="space-y-6 md:space-y-8">
      {filteredCareers.map((career) => (
        <div key={career.id} className="relative">
          <div className="flex gap-2 md:gap-3">
            <CareerIcon
              mergeFrom={career.mergeFrom === 'true'}
              branch={career.branch}
            />

            <div className="flex-1 min-w-0">
              <CareerHeader
                title={career.title}
                date={career.date}
                id={career.id}
                expandedId={expandedId}
                isMobile={isMobile}
                toggleExpand={toggleExpand}
              />

              <CareerContent
                description={career.description}
                technologies={career.technologies}
                achievements={career.achievements}
                branch={career.branch}
                isMobile={isMobile}
                expandedId={expandedId}
                careerId={career.id}
                selectedTechs={selectedTechs}
                toggleTech={toggleTech}
                careerButomClass={careerButomClass}
              />
            </div>
          </div>
        </div>
      ))}

      {filteredCareers.length === 0 && (
        <div className="text-center py-8 text-sm text-gray-500 dark:text-gray-400">
          No experiences found with the selected technologies.
        </div>
      )}
    </div>
  );
}
