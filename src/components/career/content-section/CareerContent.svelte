<script lang="ts">
  import { language } from "../../../lib/stores/language";
  import { translations } from "../../../lib/stores/translations";
  import { career } from "../../../lib/stores/useCareer";
  import type { CareerData } from "../CareerData";
  import TechCategory from "./TechCategory.svelte";

  export let description: string;
  export let technologies: CareerData["technologies"];
  export let achievements: string[];
  export let branch: string;
  export let careerItem: CareerData;

  type TechnologyCategory = "development" | "infrastructure" | "methodologies" | "integrations";

  $: t = translations[$language].career;
  $: isExpanded = $career.expandedId === careerItem.id;
  $: buttonClass =
    "bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-emerald-500 dark:hover:bg-emerald-600";
</script>

<div
  class="grid transition-all duration-300 ease-out {isExpanded
    ? 'grid-rows-[1fr] opacity-100'
    : 'grid-rows-[0fr] opacity-0'}">
  <div class="overflow-hidden">
    <div
      class="transition-all duration-300 ease-out pt-3 {isExpanded
        ? 'translate-y-0'
        : '-translate-y-4'}">
      <p class="text-xs md:text-sm text-gray-700 dark:text-gray-300 mb-3">
        {description}
      </p>

      <div class="mb-4 space-y-2">
        {#each Object.entries(technologies) as [category, techs]}
          <TechCategory category={category as TechnologyCategory} {techs} {buttonClass} />
        {/each}
      </div>

      <ul class="space-y-2 mb-3">
        {#each achievements as achievement}
          <li class="flex items-start gap-2 text-xs md:text-sm text-gray-700 dark:text-gray-300">
            <span class="mt-1.5 h-1 w-1 rounded-full bg-emerald-700 dark:bg-emerald-300 shrink-0" />
            {achievement}
          </li>
        {/each}
      </ul>

      <code class="text-xs md:text-sm font-mono text-gray-700 dark:text-gray-300">
        branch: {branch}
      </code>
    </div>
  </div>
</div>
