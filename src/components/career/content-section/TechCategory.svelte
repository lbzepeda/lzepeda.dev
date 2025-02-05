<script lang="ts">
  import { language } from "../../../lib/stores/language";
  import { career } from "../../../lib/stores/useCareer";
  import { careerTranslations } from "../career-translations";

  export let category: "development" | "infrastructure" | "methodologies" | "integrations";
  export let techs: string[];
  export let buttonClass: string;

  $: t = careerTranslations[$language].career.categories;
</script>

{#if techs.length > 0}
  <div class="mb-2">
    <h4 class="text-xs text-gray-700 dark:text-gray-300 capitalize mb-1">
      {t[category]}:
    </h4>
    <div class="flex flex-wrap gap-1.5">
      {#each techs as tech}
        <button
          on:click={() => career.toggleTech(tech)}
          class="px-2 py-0.5 text-xs rounded-full transition-colors {$career.selectedTechs.has(tech)
            ? buttonClass
            : 'bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300'}">
          {tech}
        </button>
      {/each}
    </div>
  </div>
{/if}
