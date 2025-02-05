<!-- ViewFilterSelector.svelte -->
<script lang="ts">
  import { language } from "../../../lib/stores/language";
  import { DESIGN_TOKENS, theme } from "../../../lib/stores/theme";
  import { translations } from "../../../lib/stores/translations";
  import { career } from "../../../lib/stores/useCareer";

  $: t = translations[$language].career;

  const getClasses = {
    button: ($theme: { contrast: "normal" | "high" }, isSelected: boolean) => `
      ${DESIGN_TOKENS.viewSelector.button.base}
      ${
        isSelected
          ? `${DESIGN_TOKENS.viewSelector.button.selected[$theme.contrast].light} 
           ${DESIGN_TOKENS.viewSelector.button.selected[$theme.contrast].dark}`
          : `${DESIGN_TOKENS.viewSelector.button.default[$theme.contrast].light} 
           ${DESIGN_TOKENS.viewSelector.button.default[$theme.contrast].dark}`
      }
    `,
  };
</script>

<div class="flex justify-center gap-2 mb-6 p-8">
  <button
    on:click={() => career.toggleViewMode()}
    class={getClasses.button($theme, $career.viewMode === "timeline")}>
    <span>{t.timeline}</span>
  </button>
  <button
    on:click={() => career.toggleViewMode()}
    class={getClasses.button($theme, $career.viewMode === "git-log")}>
    <span>{t.gitLog}</span>
  </button>
</div>
