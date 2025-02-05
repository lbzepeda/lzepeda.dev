<!-- Filter.svelte -->
<script lang="ts">
  import { X } from "lucide-svelte";
  import { language } from "../../../lib/stores/language";
  import { translations } from "../../../lib/stores/translations";
  import { career } from "../../../lib/stores/useCareer";
  import { allTechnologies } from "../CareerData";
  import ViewFilterSelector from "./ViewFilterSelector.svelte";

  $: t = translations[$language].career;
  $: selectedTechsCount = $career.selectedTechs.size;
</script>

<div data-testid="filter-container" class="w-full {!$career.showFilters && 'hidden md:block'}">
  {#if selectedTechsCount > 0}
    <div class="flex flex-wrap gap-1.5 md:gap-2 mt-2 md:mt-4">
      {#each Array.from($career.selectedTechs) as tech}
        <button
          on:click={() => career.toggleTech(tech)}
          class="inline-flex items-center gap-1 px-2 py-1 text-xs md:text-sm rounded-full text-emerald-700 dark:text-emerald-400 border border-emerald-600 dark:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-colors">
          {tech}
          <X size={12} />
        </button>
      {/each}
      <button
        on:click={() => career.clearFilters()}
        class="text-xs md:text-sm text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-200 transition-colors">
        <div class="flex items-center gap-1 p-1 rounded-full">
          Clear all
          <X size={12} />
        </div>
      </button>
    </div>
    <hr class="my-4 border-gray-200 dark:border-gray-700" />
  {/if}

  <div
    class="mt-2 max-h-32 md:max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
    <div class="flex flex-wrap gap-1.5">
      {#each Array.from(allTechnologies) as tech}
        <button
          on:click={() => career.toggleTech(tech)}
          class="px-2 py-1 text-xs rounded-full transition-colors {$career.selectedTechs.has(tech)
            ? 'text-emerald-700 dark:text-emerald-400 border border-emerald-600 dark:border-emerald-500'
            : 'text-slate-600 dark:text-slate-400 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'}">
          {tech}
        </button>
      {/each}
    </div>
  </div>
  <ViewFilterSelector />
</div>
