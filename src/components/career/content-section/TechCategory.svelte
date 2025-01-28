<script lang="ts">
  import { theme } from "../../../lib/stores/theme";

  export let category: string;
  export let technologies: string[];
  export let selectedTechs: Set<string>;
  export let toggleTech: (tech: string) => () => void;
  export let careerButomClass: string;

  $: buttonClasses =
    $theme.contrast === "high"
      ? "text-sm font-medium text-secondary dark:text-secondary-dark"
      : "text-xs text-secondary dark:text-secondary-dark";
</script>

{#if technologies.length > 0}
  <div class="mb-2">
    <h4 class="text-xs text-gray-700 dark:text-gray-300 capitalize mb-1">
      {category}:
    </h4>
    <div class="flex flex-wrap gap-1.5">
      {#each technologies as tech}
        <button
          on:click={toggleTech(tech)}
          class="px-2 py-0.5 rounded-full transition-colors {buttonClasses} {selectedTechs.has(tech)
            ? careerButomClass
            : 'bg-secondary/10 dark:bg-secondary-dark/10 border border-secondary/20 dark:border-secondary-dark/20'}">
          {tech}
        </button>
      {/each}
    </div>
  </div>
{/if}
