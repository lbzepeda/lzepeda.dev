<script lang="ts">
  import { GitBranch } from "lucide-svelte";
  import { theme } from "../../lib/stores/theme";
  import { careerStore } from "./careerStore";
  import CategoryButtonFilter from "./category-section/CategoryButtonFilter.svelte";
  import Filter from "./category-section/Filter.svelte";
  import GitLogView from "./content-section/GitLogView.svelte";
  import TimelineView from "./content-section/TimelineView.svelte";

  const {
    expandedId,
    selectedTechs,
    showFilters,
    isMobile,
    viewMode,
    filteredCareers,
    toggleExpand,
    toggleTech,
    handleFilter,
    clearFilters,
    handleViewMode,
  } = careerStore;

  const styles = {
    transitionClasses: "transition-colors duration-300",
    highContrastTextClasses: "text-slate-900 dark:text-white",
    lowContrastTextClasses: "text-slate-700 dark:text-slate-300",
    primaryTextClasses: "text-primary dark:text-primary-dark",
    primaryTextHighContrastClasses: "text-primary dark:text-primary-dark font-semibold",
    headerClasses: "text-primary dark:text-primary-dark",
    containerClasses: "bg-white dark:bg-slate-900",
  };
</script>

<div class="flex flex-col items-center gap-4 mb-6 md:mb-8 {styles.transitionClasses}">
  <div class="flex items-center gap-2 relative w-full justify-center">
    <GitBranch
      class="w-5 h-5 md:w-6 md:h-6 {styles.primaryTextClasses} {styles.transitionClasses}"
      strokeWidth={$theme.contrast === "high" ? 3 : 2}
      aria-hidden="true" />
    <h2
      class="text-lg md:text-3xl font-mono flex flex-col sm:flex-row items-center gap-1 sm:gap-2 {styles.transitionClasses}"
      aria-label="Career History Timeline">
      <span
        class="{styles.headerClasses} whitespace-nowrap {$theme.contrast === 'high'
          ? styles.highContrastTextClasses
          : styles.lowContrastTextClasses}">
        git log --graph
      </span>
      <span
        class="{$theme.contrast === 'high'
          ? styles.primaryTextHighContrastClasses
          : styles.primaryTextClasses} whitespace-nowrap">
        ~/career
      </span>
    </h2>
    <CategoryButtonFilter {handleFilter} selectedTechsCount={$selectedTechs.size} />
  </div>
  <Filter
    selectedTechs={$selectedTechs}
    showFilters={$showFilters}
    {toggleTech}
    {clearFilters}
    filteredCareers={$filteredCareers}
    selectedTechsCount={$selectedTechs.size}
    viewMode={$viewMode}
    {handleViewMode} />
</div>

<div
  data-testid="career-content"
  class="transition-all duration-300"
  role="region"
  aria-label="Career timeline content">
  {#if $viewMode === "timeline"}
    <TimelineView
      filteredCareers={$filteredCareers}
      expandedId={$expandedId}
      selectedTechs={$selectedTechs}
      {toggleExpand}
      {toggleTech}
      careerButomClass={$theme.contrast === "high"
        ? "bg-emerald-700 hover:bg-emerald-800 text-white dark:bg-emerald-600 dark:hover:bg-emerald-700"
        : "bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-emerald-500 dark:hover:bg-emerald-600"} />
  {:else}
    <GitLogView careers={$filteredCareers} />
  {/if}
</div>
