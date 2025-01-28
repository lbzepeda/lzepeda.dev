<script lang="ts">
  import { theme } from "../../../lib/stores/theme";

  export let viewMode: string;
  export let handleViewMode: () => void;

  const styles = {
    transitionClasses: "transition-colors duration-300",
    highContrastTextClasses: "text-slate-900 dark:text-white",
    lowContrastTextClasses: "text-slate-700 dark:text-slate-300",
    primaryTextClasses: "text-primary dark:text-primary-dark",
    primaryTextHighContrastClasses: "text-primary dark:text-primary-dark font-semibold",
  };

  $: selectedButtonClass =
    $theme.contrast === "high"
      ? `flex items-center gap-2 px-3 py-1.5 text-sm font-medium ${styles.primaryTextHighContrastClasses} 
       border-2 border-primary dark:border-primary-dark 
       rounded-lg ${styles.transitionClasses}`
      : `flex items-center gap-2 px-3 py-1.5 text-sm font-medium ${styles.primaryTextClasses} 
       border border-primary dark:border-primary-dark 
       rounded-lg ${styles.transitionClasses}`;

  $: defaultButtonClass =
    $theme.contrast === "high"
      ? `flex items-center gap-2 px-3 py-1.5 text-sm font-medium ${styles.highContrastTextClasses} 
       border-2 border-slate-400 dark:border-slate-500 rounded-lg 
       hover:bg-slate-100 dark:hover:bg-slate-800 ${styles.transitionClasses}`
      : `flex items-center gap-2 px-3 py-1.5 text-sm font-medium ${styles.lowContrastTextClasses} 
       border border-slate-300 dark:border-slate-700 rounded-lg 
       hover:bg-slate-50 dark:hover:bg-slate-800 ${styles.transitionClasses}`;
</script>

<div class="flex justify-center gap-2 mb-6 p-8">
  <button
    on:click={handleViewMode}
    class={viewMode === "timeline" ? selectedButtonClass : defaultButtonClass}>
    <span>Timeline</span>
  </button>
  <button
    on:click={handleViewMode}
    class={viewMode === "git-log" ? selectedButtonClass : defaultButtonClass}>
    <span>Git Log</span>
  </button>
</div>
