<script lang="ts">
  import { language } from "../../../lib/stores/language";
  import { theme } from "../../../lib/stores/theme";
  import { translations } from "../../../lib/stores/translations";
  import { career } from "../../../lib/stores/useCareer";

  $: t = translations[$language].career;

  $: selectedButtonClass = theme.getHighlightTextClasses()($theme);
  $: defaultButtonClass = `${theme.getTextClasses("default")($theme)} hover:bg-slate-50 dark:hover:bg-slate-800`;
</script>

<div class="flex justify-center gap-2 mb-6 p-8">
  <button
    on:click={() => career.toggleViewMode()}
    class={$career.viewMode === "timeline" ? selectedButtonClass : defaultButtonClass}>
    <span>{t.timeline}</span>
  </button>
  <button
    on:click={() => career.toggleViewMode()}
    class={$career.viewMode === "git-log" ? selectedButtonClass : defaultButtonClass}>
    <span>{t.gitLog}</span>
  </button>
</div>
