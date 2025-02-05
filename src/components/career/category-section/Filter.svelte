<!-- Filter.svelte -->
<script lang="ts">
  import { X } from "lucide-svelte";
  import { language } from "../../../lib/stores/language";
  import { DESIGN_TOKENS, theme } from "../../../lib/stores/theme";
  import { translations } from "../../../lib/stores/translations";
  import { career } from "../../../lib/stores/useCareer";
  import { allTechnologies } from "../CareerData";
  import ViewFilterSelector from "./ViewFilterSelector.svelte";

  $: t = translations[$language].career;
  $: selectedTechsCount = $career.selectedTechs.size;

  // Get theme-aware classes using the design tokens
  const getClasses = {
    selectedTech: ($theme: { contrast: "normal" | "high" }) => `
      inline-flex items-center gap-1 px-2 py-1 text-xs md:text-sm rounded-full
      ${DESIGN_TOKENS.filter.button.selected[$theme.contrast].light}
      ${DESIGN_TOKENS.filter.button.selected[$theme.contrast].dark}
      transition-colors duration-300
    `,
    clearButton: ($theme: { contrast: "normal" | "high" }) => `
      text-xs md:text-sm
      ${DESIGN_TOKENS.filter.button.clear[$theme.contrast].light}
      ${DESIGN_TOKENS.filter.button.clear[$theme.contrast].dark}
      transition-colors duration-300
    `,
    separator: ($theme: { contrast: "normal" | "high" }) => `
      ${DESIGN_TOKENS.filter.separator[$theme.contrast].light}
      ${DESIGN_TOKENS.filter.separator[$theme.contrast].dark}
    `,
    scrollbar: ($theme: { contrast: "normal" | "high" }) => `
      scrollbar-thin
      ${DESIGN_TOKENS.filter.scrollbar[$theme.contrast].light}
      ${DESIGN_TOKENS.filter.scrollbar[$theme.contrast].dark}
    `,
    filterOption: ($theme: { contrast: "normal" | "high" }, isSelected: boolean) => `
      px-2 py-1 text-xs rounded-full transition-colors duration-300
      ${
        isSelected
          ? `${DESIGN_TOKENS.filter.button.selected[$theme.contrast].light} 
           ${DESIGN_TOKENS.filter.button.selected[$theme.contrast].dark}`
          : `${DESIGN_TOKENS.filter.button.unselected[$theme.contrast].light} 
           ${DESIGN_TOKENS.filter.button.unselected[$theme.contrast].dark}`
      }
    `,
  };
</script>

<div data-testid="filter-container" class="w-full {!$career.showFilters && 'hidden md:block'}">
  {#if selectedTechsCount > 0}
    <div class="flex flex-wrap gap-1.5 md:gap-2 mt-2 md:mt-4">
      {#each Array.from($career.selectedTechs) as tech}
        <button on:click={() => career.toggleTech(tech)} class={getClasses.selectedTech($theme)}>
          {tech}
          <X class="w-3 h-3" />
        </button>
      {/each}
      <button on:click={() => career.clearFilters()} class={getClasses.clearButton($theme)}>
        <div class="flex items-center gap-1 p-1 rounded-full">
          Clear all
          <X class="w-3 h-3" />
        </div>
      </button>
    </div>
    <hr class="my-4 {getClasses.separator($theme)}" />
  {/if}

  <div class="mt-2 max-h-32 md:max-h-40 overflow-y-auto {getClasses.scrollbar($theme)}">
    <div class="flex flex-wrap gap-1.5">
      {#each Array.from(allTechnologies) as tech}
        <button
          on:click={() => career.toggleTech(tech)}
          class={getClasses.filterOption($theme, $career.selectedTechs.has(tech))}>
          {tech}
        </button>
      {/each}
    </div>
  </div>
  <ViewFilterSelector />
</div>
