<script lang="ts">
  import { Filter } from "lucide-svelte";

  export let handleFilter: () => void;
  export let selectedTechsCount: number;
</script>

<button
  on:click={handleFilter}
  class="absolute right-0 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors md:hidden"
  aria-label="Toggle filters">
  <Filter class={`w-5 h-5 ${selectedTechsCount > 0 ? "text-emerald-700" : "text-gray-700"}`} />
  {#if selectedTechsCount > 0}
    <span
      class="absolute -top-1 -right-1 bg-emerald-700 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
      {selectedTechsCount}
    </span>
  {/if}
</button>
