// src/stores/useCareer.ts
import { derived, writable } from "svelte/store";
import { careerData } from "../../components/career/CareerData";

function createCareerStore() {
  const { subscribe, set, update } = writable({
    expandedId: null as number | null,
    selectedTechs: new Set<string>(),
    showFilters: false,
    viewMode: "timeline" as "timeline" | "git-log",
  });

  return {
    subscribe,
    toggleExpand: (id: number) =>
      update(state => ({
        ...state,
        expandedId: state.expandedId === id ? null : id,
      })),
    toggleTech: (tech: string) =>
      update(state => {
        const newTechs = new Set(state.selectedTechs);
        if (newTechs.has(tech)) {
          newTechs.delete(tech);
        } else {
          newTechs.add(tech);
        }
        return { ...state, selectedTechs: newTechs };
      }),
    toggleFilter: () =>
      update(state => ({
        ...state,
        showFilters: !state.showFilters,
      })),
    clearFilters: () =>
      update(state => ({
        ...state,
        selectedTechs: new Set(),
        showFilters: false,
      })),
    toggleViewMode: () =>
      update(state => ({
        ...state,
        viewMode: state.viewMode === "timeline" ? "git-log" : "timeline",
      })),
  };
}

export const career = createCareerStore();

export const filteredCareers = derived(career, $career => {
  if ($career.selectedTechs.size === 0) return careerData;
  return careerData.filter(career =>
    Object.values(career.technologies).some(techArray =>
      techArray.some(tech => $career.selectedTechs.has(tech)),
    ),
  );
});
