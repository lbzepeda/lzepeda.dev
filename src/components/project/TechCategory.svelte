<script lang="ts">
  import { language } from "../../lib/stores/language";
  import { DESIGN_TOKENS, theme } from "../../lib/stores/theme";
  import { getProjectTranslations } from "./project-translations";
  import type { ProjectTranslations } from "./Type";

  type ValidTitles = Exclude<keyof ProjectTranslations, "data">;

  export let title: ValidTitles;
  export let items: string[];
  export let color: "frontend" | "backend" | "tools";

  let showAll = false;
  const itemsToShow = 5;
  $: t = getProjectTranslations($language);
  $: displayItems = showAll ? items : items.slice(0, itemsToShow);
  $: hasMore = items.length > itemsToShow;
  $: remainingItems = items.length - itemsToShow;

  const getCategoryStyle = (category: "frontend" | "backend" | "tools") => {
    const styles = {
      frontend: {
        tag: `${DESIGN_TOKENS.technologyList.category[$theme.contrast].light} ${DESIGN_TOKENS.technologyList.category[$theme.contrast].dark}`,
        button: `${DESIGN_TOKENS.technologyList.button.text[$theme.contrast].light} ${DESIGN_TOKENS.technologyList.button.text[$theme.contrast].dark}`,
      },
      backend: {
        tag: `${DESIGN_TOKENS.technologyList.category[$theme.contrast].light} ${DESIGN_TOKENS.technologyList.category[$theme.contrast].dark}`,
        button: `${DESIGN_TOKENS.technologyList.button.text[$theme.contrast].light} ${DESIGN_TOKENS.technologyList.button.text[$theme.contrast].dark}`,
      },
      tools: {
        tag: `${DESIGN_TOKENS.technologyList.category[$theme.contrast].light} ${DESIGN_TOKENS.technologyList.category[$theme.contrast].dark}`,
        button: `${DESIGN_TOKENS.technologyList.button.text[$theme.contrast].light} ${DESIGN_TOKENS.technologyList.button.text[$theme.contrast].dark}`,
      },
    };
    return styles[category];
  };
</script>

<div class="flex flex-wrap items-center gap-2">
  <span class={theme.getTextClasses("small")($theme)}>{t[title as keyof typeof t]}:</span>

  {#each displayItems as item}
    <span class="px-2 py-1 text-xs rounded-full {getCategoryStyle(color).tag}">
      {item}
    </span>
  {/each}

  {#if hasMore}
    <button
      on:click={() => (showAll = !showAll)}
      class="px-2 py-1 text-xs font-medium {getCategoryStyle(color).button} 
      {DESIGN_TOKENS.technologyList.button.base} 
      {DESIGN_TOKENS.technologyList.button.unselected[$theme.contrast].light} 
      {DESIGN_TOKENS.technologyList.button.unselected[$theme.contrast].dark}"
      aria-label={showAll ? "Show less items" : `Show ${remainingItems} more items`}>
      {showAll ? "- less" : `+${remainingItems}`}
    </button>
  {/if}
</div>
