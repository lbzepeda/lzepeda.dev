<!-- CategoryButtonFilter.svelte -->
<script lang="ts">
  import { Filter } from "lucide-svelte";
  import { career } from "../../../lib/stores/useCareer";

  $: selectedTechsCount = $career.selectedTechs.size;
</script>

<button
  on:click={() => career.toggleFilter()}
  class="absolute right-0 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors md:hidden"
  aria-label="Toggle filters">
  <Filter class={selectedTechsCount > 0 ? "text-emerald-700" : "text-gray-700"} size={20} />
  {#if selectedTechsCount > 0}
    <span
      class="absolute -top-1 -right-1 bg-emerald-700 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
      {selectedTechsCount}
    </span>
  {/if}
</button>
