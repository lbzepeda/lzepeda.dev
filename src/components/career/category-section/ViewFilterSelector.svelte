<!-- ViewFilterSelector.svelte -->
<script lang="ts">
  import { language } from "../../../lib/stores/language";
  import { translations } from "../../../lib/stores/translations";
  import { career } from "../../../lib/stores/useCareer";

  const selectedButtonClass =
    "flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-emerald-700 dark:text-emerald-400 border-[2px] border-emerald-600 dark:border-emerald-500 rounded-lg transition-colors";

  const defaultButtonClass =
    "flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-400 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors";

  $: t = translations[$language].career;
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
