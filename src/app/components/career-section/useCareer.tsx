'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { careerData } from './careerData';

type ViewMode = 'timeline' | 'git-log';

export function useCareer() {
  // Estados
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [selectedTechs, setSelectedTechs] = useState<Set<string>>(new Set());
  const [showFilters, setShowFilters] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('timeline');

  // Efecto para mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Handlers
  const toggleExpand = useCallback(
    (id: number) => () => {
      if (isMobile) return;
      setExpandedId(expandedId === id ? null : id);
    },
    [expandedId, isMobile]
  );

  const toggleTech = useCallback(
    (tech: string) => () => {
      setSelectedTechs((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(tech)) {
          newSet.delete(tech);
        } else {
          newSet.add(tech);
        }
        return newSet;
      });
    },
    []
  );

  const handleFilter = useCallback(() => {
    setShowFilters((prev) => !prev);
  }, []);

  const clearFilters = useCallback(() => {
    setSelectedTechs(new Set());
    setShowFilters(false);
  }, []);

  const handleViewMode = useCallback(() => {
    setViewMode((prev) => (prev === 'timeline' ? 'git-log' : 'timeline'));
  }, []);

  // Memos
  const allTechnologies = useMemo(() => {
    const techSet = new Set<string>();
    careerData.forEach((career) => {
      career.technologies.forEach((tech) => techSet.add(tech));
    });
    return Array.from(techSet).sort();
  }, []);

  const filteredCareers = useMemo(() => {
    if (selectedTechs.size === 0) return careerData;
    return careerData.filter((career) =>
      career.technologies.some((tech) => selectedTechs.has(tech))
    );
  }, [selectedTechs]);

  // Helpers
  const isExpanded = useCallback(
    (id: number) => expandedId === id,
    [expandedId]
  );
  const hasTech = useCallback(
    (tech: string) => selectedTechs.has(tech),
    [selectedTechs]
  );

  return {
    // Estados
    expandedId,
    selectedTechs,
    showFilters,
    isMobile,
    viewMode,

    // Handlers
    toggleExpand,
    toggleTech,
    handleFilter,
    clearFilters,
    handleViewMode,

    // Datos calculados
    allTechnologies,
    filteredCareers,

    // Helpers
    isExpanded,
    hasTech,

    // Utilidades
    selectedTechsCount: selectedTechs.size,
  };
}
