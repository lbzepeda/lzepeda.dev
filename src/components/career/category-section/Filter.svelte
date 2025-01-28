<script lang="ts">
  import { X } from "lucide-svelte";
  import { theme } from "../../../lib/stores/theme";
  import type { careerData } from "../careerData";
  import ViewFilterSelector from "./ViewFilterSelector.svelte";

  export let selectedTechs: Set<string>;
  export let showFilters: boolean;
  export let toggleTech: (tech: string) => () => void;
  export let clearFilters: () => void;
  export let filteredCareers: typeof careerData;
  export let selectedTechsCount: number;
  export let viewMode: string;
  export let handleViewMode: () => void;

  const styles = {
    transitionClasses: "transition-colors duration-300",
    primaryTextClasses: "text-primary dark:text-primary-dark",
    primaryTextHighContrastClasses: "text-primary dark:text-primary-dark font-semibold",
  };

  // Estilos reactivos con cambios más sutiles
  $: buttonSelected =
    $theme.contrast === "high"
      ? `${styles.primaryTextHighContrastClasses} border-2 border-primary dark:border-primary-dark text-xs md:text-sm`
      : `${styles.primaryTextClasses} border border-primary dark:border-primary-dark text-xs md:text-sm`;

  $: buttonUnselected =
    $theme.contrast === "high"
      ? "text-slate-900 dark:text-white border-2 border-slate-400 dark:border-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs md:text-sm"
      : "text-slate-600 dark:text-slate-400 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs md:text-sm";

  $: clearButtonClass =
    $theme.contrast === "high"
      ? "text-slate-900 dark:text-white text-xs md:text-sm font-medium"
      : "text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-200 text-xs md:text-sm";

  $: iconSize =
    $theme.contrast === "high" ? "w-3.5 h-3.5 md:w-4 md:h-4" : "w-3 h-3 md:w-3.5 md:h-3.5";

  function getAllTechnologies(careers: typeof careerData) {
    const techSet = new Set<string>();
    careers.forEach(career => {
      Object.values(career.technologies).forEach(techArray => {
        techArray.forEach(tech => techSet.add(tech));
      });
    });
    return Array.from(techSet).sort();
  }
</script>

<div data-testid="filter-container" class="w-full {!showFilters ? 'hidden md:block' : ''}">
  {#if selectedTechsCount > 0}
    <div class="flex flex-wrap gap-1.5 md:gap-2 mt-2 md:mt-4">
      {#each Array.from(selectedTechs) as tech}
        <button
          on:click={toggleTech(tech)}
          class="inline-flex items-center gap-1 px-2 py-1 rounded-full
            {buttonSelected}
            hover:bg-primary/5 dark:hover:bg-primary-dark/10
            {styles.transitionClasses}">
          {tech}
          <X class={iconSize} />
        </button>
      {/each}
      <button on:click={clearFilters} class="{clearButtonClass} {styles.transitionClasses}">
        <div class="flex items-center gap-1 p-1 rounded-full">
          Clear all
          <X class={iconSize} />
        </div>
      </button>
    </div>
    <hr class="my-4 border-gray-200 dark:border-gray-700" />
  {/if}

  <!-- Filter Options -->
  <div
    class="mt-2 max-h-32 md:max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
    <div class="flex flex-wrap gap-1.5">
      {#each getAllTechnologies(filteredCareers) as tech}
        <button
          on:click={toggleTech(tech)}
          class="px-2 py-1 rounded-full
            {styles.transitionClasses} 
            {selectedTechs.has(tech) ? buttonSelected : buttonUnselected}">
          {tech}
        </button>
      {/each}
    </div>
  </div>
  <ViewFilterSelector {viewMode} {handleViewMode} />
</div>
