<script lang="ts">
  import { ChevronDown, ChevronUp, Coffee } from "lucide-svelte";
  import { theme } from "../../../lib/stores/theme";

  export let title: string;
  export let isFavorite: boolean;
  export let date: string;
  export let id: number;
  export let expandedId: number | null;
  export let toggleExpand: (id: number) => () => void;

  const styles = {
    transitionClasses: "transition-colors duration-300",
  };

  $: titleClasses =
    $theme.contrast === "high"
      ? "text-base md:text-xl font-bold"
      : "text-sm md:text-lg font-semibold";

  $: dateClasses =
    $theme.contrast === "high"
      ? "text-sm md:text-base text-slate-900 dark:text-white font-medium font-mono"
      : "text-xs md:text-sm text-gray-700 dark:text-gray-300 font-mono";

  $: iconSizes = $theme.contrast === "high" ? "w-4 h-4 md:w-5 md:h-5" : "w-3.5 h-3.5 md:w-4 md:h-4";
</script>

<button
  on:click={toggleExpand(id)}
  class="w-full flex flex-col gap-1 text-left hover:opacity-75 transition-opacity {styles.transitionClasses}">
  <h3 class="pr-8 flex items-center gap-2 text-secondary dark:text-secondary-dark {titleClasses}">
    {title}
    {#if isFavorite}
      <div class="relative inline-block group">
        <Coffee class="{iconSizes} text-amber-700 cursor-pointer" aria-label="Favorite position" />
        <div
          class="absolute z-10 invisible group-hover:visible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-800 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700 group-hover:opacity-100 whitespace-nowrap right-full top-1/2 -translate-y-1/2 mr-2 md:right-auto md:left-full md:ml-2">
          Career milestone
          <div
            class="absolute -right-1 top-1/2 -translate-y-1/2 border-[6px] border-transparent border-l-gray-800 dark:border-l-gray-700 md:hidden">
          </div>
          <div
            class="hidden md:block absolute -left-1 top-1/2 -translate-y-1/2 border-[6px] border-transparent border-r-gray-800 dark:border-r-gray-700">
          </div>
        </div>
      </div>
    {/if}
  </h3>
  <span class={dateClasses}>
    {date}
  </span>
  <div class="absolute top-0 right-0">
    {#if expandedId === id}
      <ChevronUp class="{iconSizes} text-gray-700 dark:text-gray-300" />
    {:else}
      <ChevronDown class="{iconSizes} text-gray-700 dark:text-gray-300" />
    {/if}
  </div>
</button>
