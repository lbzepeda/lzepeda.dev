import { derived, writable } from "svelte/store";
import { careerData } from "./careerData";

// Types
type ViewMode = "timeline" | "git-log";

interface TechnologyCategories {
  development: string[];
  infrastructure: string[];
  methodologies: string[];
  integrations: string[];
}

function createCareerStore() {
  // Base stores
  const expandedId = writable<number | null>(null);
  const selectedTechs = writable<Set<string>>(new Set());
  const showFilters = writable(false);
  const isMobile = writable(false);
  const viewMode = writable<ViewMode>("timeline");

  // Derived store for filtered careers
  const filteredCareers = derived(selectedTechs, $selectedTechs => {
    if ($selectedTechs.size === 0) return careerData;
    return careerData.filter(career => {
      return Object.values(career.technologies).some(techArray =>
        techArray.some(tech => $selectedTechs.has(tech)),
      );
    });
  });

  // Derived store for all technologies
  const allTechnologies = derived(filteredCareers, $filteredCareers => {
    const techSet = new Set<string>();
    $filteredCareers.forEach(career => {
      Object.values(career.technologies).forEach(techArray => {
        techArray.forEach(tech => techSet.add(tech));
      });
    });
    return Array.from(techSet).sort();
  });

  // Action creators
  function toggleExpand(id: number) {
    return () => {
      expandedId.update($expandedId => ($expandedId === id ? null : id));
    };
  }

  function toggleTech(tech: string) {
    return () => {
      selectedTechs.update($selectedTechs => {
        const newSet = new Set($selectedTechs);
        if (newSet.has(tech)) {
          newSet.delete(tech);
        } else {
          newSet.add(tech);
        }
        return newSet;
      });
    };
  }

  function handleFilter() {
    showFilters.update($showFilters => !$showFilters);
  }

  function clearFilters() {
    selectedTechs.set(new Set());
    showFilters.set(false);
  }

  function handleViewMode() {
    viewMode.update($viewMode => ($viewMode === "timeline" ? "git-log" : "timeline"));
  }

  // Helper function for grouping technologies
  function getTechnologiesByCategory(technologies: TechnologyCategories) {
    return Object.entries(technologies).map(([category, techs]) => ({
      category,
      techs,
    }));
  }

  return {
    // Stores
    expandedId: { subscribe: expandedId.subscribe },
    selectedTechs: { subscribe: selectedTechs.subscribe },
    showFilters: { subscribe: showFilters.subscribe },
    isMobile: { subscribe: isMobile.subscribe },
    viewMode: { subscribe: viewMode.subscribe },
    filteredCareers: { subscribe: filteredCareers.subscribe },
    allTechnologies: { subscribe: allTechnologies.subscribe },

    // Actions
    toggleExpand,
    toggleTech,
    handleFilter,
    clearFilters,
    handleViewMode,
    getTechnologiesByCategory,
  };
}

export const careerStore = createCareerStore();
