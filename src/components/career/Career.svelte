<!-- Career.svelte -->
<script lang="ts">
  import { GitBranch } from "lucide-svelte";
  import { language } from "../../lib/stores/language";
  import { DESIGN_TOKENS, theme } from "../../lib/stores/theme";
  import { translations } from "../../lib/stores/translations";
  import { career, filteredCareers } from "../../lib/stores/useCareer";
  import CategoryButtonFilter from "./category-section/CategoryButtonFilter.svelte";
  import Filter from "./category-section/Filter.svelte";
  import GitLogView from "./content-section/GitLogView.svelte";
  import TimelineView from "./content-section/TimelineView.svelte";

  $: t = translations[$language].career;
  $: selectedTechsCount = $career.selectedTechs.size;

  const getClasses = {
    headerIcon: ($theme: { contrast: "normal" | "high" }) => `
      w-5 h-5 md:w-6 md:h-6
      ${DESIGN_TOKENS.careerSection.header.icon[$theme.contrast].light}
      ${DESIGN_TOKENS.careerSection.header.icon[$theme.contrast].dark}
    `,
    headerTitle: ($theme: { contrast: "normal" | "high" }) => `
      ${DESIGN_TOKENS.careerSection.header.title[$theme.contrast].light}
      ${DESIGN_TOKENS.careerSection.header.title[$theme.contrast].dark}
    `,
    headerPath: ($theme: { contrast: "normal" | "high" }) => `
      ${DESIGN_TOKENS.careerSection.header.path[$theme.contrast].light}
      ${DESIGN_TOKENS.careerSection.header.path[$theme.contrast].dark}
      whitespace-nowrap
    `,
  };
</script>

<section
  id="career"
  data-testid="career-section"
  class="{theme.getBackgroundClasses('primary')($theme)} min-h-screen pt-20 pb-8 md:py-24"
  aria-label="Career History Section">
  <div class="mx-auto px-3 md:px-4 max-w-3xl">
    <div class="flex flex-col items-center gap-4 mb-6 md:mb-8">
      <div class="flex items-center gap-2 relative w-full justify-center">
        <GitBranch class={getClasses.headerIcon($theme)} aria-hidden="true" />
        <h2
          class="text-lg md:text-3xl font-mono flex flex-col sm:flex-row items-center gap-1 sm:gap-2"
          aria-label="Career History Timeline">
          <span class={getClasses.headerTitle($theme) + " whitespace-nowrap"}>git log --graph</span>
          <span class={getClasses.headerPath($theme)}>~/career</span>
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
