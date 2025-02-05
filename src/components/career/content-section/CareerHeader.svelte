<script lang="ts">
  import { ChevronDown, ChevronUp, Coffee } from "lucide-svelte";
  import { career } from "../../../lib/stores/useCareer";
  import type { CareerData } from "../CareerData";

  export let careerData: CareerData;
  export let title: string;
  export let isFavorite: boolean;
  export let date: string;
</script>

<button
  on:click={() => career.toggleExpand(careerData.id)}
  class="w-full flex flex-col gap-1 text-left hover:opacity-75 transition-opacity">
  <h3
    class="text-sm md:text-lg font-semibold text-emerald-700 dark:text-emerald-300 pr-8 flex items-center gap-2">
    {title}
    {#if isFavorite}
      <div class="relative inline-block group">
        <Coffee size={20} class="text-amber-700" aria-label="Favorite position" />
        <div
          class="absolute z-10 invisible group-hover:visible px-3 py-2 text-sm font-medium text-white bg-gray-800 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700 group-hover:opacity-100 whitespace-nowrap right-full top-1/2 -translate-y-1/2 mr-2 md:right-auto md:left-full md:ml-2">
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
  <span class="text-xs md:text-sm text-gray-700 dark:text-gray-300 font-mono">
    {date}
  </span>
  <div class="absolute top-0 right-0">
    {#if $career.expandedId === careerData.id}
      <ChevronUp size={20} class="text-gray-700 dark:text-gray-300" />
    {:else}
      <ChevronDown size={20} class="text-gray-700 dark:text-gray-300" />
    {/if}
  </div>
</button>
