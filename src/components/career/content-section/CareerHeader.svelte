<!-- CareerTitle.svelte -->
<script lang="ts">
  import { ChevronDown, ChevronUp, Coffee } from "lucide-svelte";
  import { DESIGN_TOKENS, theme } from "../../../lib/stores/theme";
  import { career } from "../../../lib/stores/useCareer";
  import type { CareerData } from "../CareerData";

  export let careerData: CareerData;
  export let title: string;
  export let isFavorite: boolean;
  export let date: string;

  const getClasses = {
    title: ($theme: { contrast: "normal" | "high" }) => `
      ${DESIGN_TOKENS.careerTitle.title[$theme.contrast].light}
      ${DESIGN_TOKENS.careerTitle.title[$theme.contrast].dark}
      pr-8 flex items-center gap-2
    `,
    date: ($theme: { contrast: "normal" | "high" }) => `
      ${DESIGN_TOKENS.careerTitle.date[$theme.contrast].light}
      ${DESIGN_TOKENS.careerTitle.date[$theme.contrast].dark}
    `,
    icon: {
      favorite: ($theme: { contrast: "normal" | "high" }) => `
        ${DESIGN_TOKENS.careerTitle.icon.sizes[$theme.contrast]}
        ${DESIGN_TOKENS.careerTitle.icon.colors.favorite}
      `,
      chevron: ($theme: { contrast: "normal" | "high" }) => `
        ${DESIGN_TOKENS.careerTitle.icon.sizes[$theme.contrast]}
        ${DESIGN_TOKENS.careerTitle.icon.colors.chevron[$theme.contrast].light}
        ${DESIGN_TOKENS.careerTitle.icon.colors.chevron[$theme.contrast].dark}
      `,
    },
    tooltip: {
      container: DESIGN_TOKENS.careerTitle.tooltip.base,
      background: ($theme: { contrast: "normal" | "high" }) => `
        ${DESIGN_TOKENS.careerTitle.tooltip.background[$theme.contrast].light}
        ${DESIGN_TOKENS.careerTitle.tooltip.background[$theme.contrast].dark}
      `,
      arrow: {
        left: ($theme: { contrast: "normal" | "high" }) => `
          ${DESIGN_TOKENS.careerTitle.tooltip.arrow.base}
          ${DESIGN_TOKENS.careerTitle.tooltip.arrow.left[$theme.contrast].light}
          ${DESIGN_TOKENS.careerTitle.tooltip.arrow.left[$theme.contrast].dark}
        `,
        right: ($theme: { contrast: "normal" | "high" }) => `
          ${DESIGN_TOKENS.careerTitle.tooltip.arrow.base}
          ${DESIGN_TOKENS.careerTitle.tooltip.arrow.right[$theme.contrast].light}
          ${DESIGN_TOKENS.careerTitle.tooltip.arrow.right[$theme.contrast].dark}
        `,
      },
    },
  };
</script>

<button
  on:click={() => career.toggleExpand(careerData.id)}
  class="w-full flex flex-col gap-1 text-left hover:opacity-75 transition-opacity">
  <h3 class={getClasses.title($theme)}>
    {title}
    {#if isFavorite}
      <div class="relative inline-block group">
        <Coffee class={getClasses.icon.favorite($theme)} aria-label="Favorite position" />
        <div class="{getClasses.tooltip.container} {getClasses.tooltip.background($theme)}">
          Career milestone
          <div class="{getClasses.tooltip.arrow.left($theme)} md:hidden"></div>
          <div class="hidden md:block {getClasses.tooltip.arrow.right($theme)}"></div>
        </div>
      </div>
    {/if}
  </h3>
  <span class={getClasses.date($theme)}>
    {date}
  </span>
  <div class="absolute top-0 right-0">
    {#if $career.expandedId === careerData.id}
      <ChevronUp class={getClasses.icon.chevron($theme)} />
    {:else}
      <ChevronDown class={getClasses.icon.chevron($theme)} />
    {/if}
  </div>
</button>
