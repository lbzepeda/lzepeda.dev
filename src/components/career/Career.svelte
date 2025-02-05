<!-- Career.svelte -->
<script lang="ts">
  import { Filter, GitBranch } from "lucide-svelte";
  import { language } from "../../lib/stores/language";
  import { theme } from "../../lib/stores/theme";
  import { translations } from "../../lib/stores/translations";
  import { career, filteredCareers } from "../../lib/stores/useCareer";
  import CategoryButtonFilter from "./category-section/CategoryButtonFilter.svelte";
  import GitLogView from "./content-section/GitLogView.svelte";
  import TimelineView from "./content-section/TimelineView.svelte";

  $: t = translations[$language].career;
  $: selectedTechsCount = $career.selectedTechs.size;
</script>

<section
  id="career"
  data-testid="career-section"
  class="{theme.getBackgroundClasses('primary')(
    $theme,
  )} text-gray-900 dark:text-white min-h-screen pt-20 pb-8 md:py-24"
  aria-label="Career History Section">
  <div class="mx-auto px-3 md:px-4 max-w-3xl">
    <div class="flex flex-col items-center gap-4 mb-6 md:mb-8">
      <div class="flex items-center gap-2 relative w-full justify-center">
        <GitBranch
          class="w-5 h-5 md:w-6 md:h-6 text-emerald-600 dark:text-emerald-400"
          aria-hidden="true" />
        <h2
          class="text-lg md:text-3xl font-mono flex flex-col sm:flex-row items-center gap-1 sm:gap-2"
          aria-label="Career History Timeline">
          <span class="text-gray-800 dark:text-gray-200 whitespace-nowrap">git log --graph</span>
          <span class="text-emerald-600 dark:text-emerald-400 whitespace-nowrap">~/career</span>
        </h2>
        <CategoryButtonFilter />
      </div>
      <Filter />
    </div>

    <div
      data-testid="career-content"
      class="transition-all duration-300"
      role="region"
      aria-label="Career timeline content">
      {#if $career.viewMode === "timeline"}
        <TimelineView />
      {:else}
        <GitLogView careers={$filteredCareers} />
      {/if}
    </div>
  </div>
</section>
