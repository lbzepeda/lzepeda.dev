<script context="module" lang="ts">
  export interface TechnologyCategories {
    development: string[];
    infrastructure: string[];
    methodologies: string[];
    integrations: string[];
  }
</script>

<script lang="ts">
  import TechCategory from "./TechCategory.svelte";

  export let description: string;
  export let technologies: TechnologyCategories;
  export let achievements: string[];
  export let branch: string;
  export let expandedId: number | null;
  export let careerId: number;
  export let selectedTechs: Set<string>;
  export let toggleTech: (tech: string) => () => void;
  export let careerButomClass: string;

  $: isExpanded = expandedId === careerId;
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
        <TechCategory
          category="Development"
          technologies={technologies.development}
          {selectedTechs}
          {toggleTech}
          {careerButomClass} />
        <TechCategory
          category="Infrastructure"
          technologies={technologies.infrastructure}
          {selectedTechs}
          {toggleTech}
          {careerButomClass} />
        <TechCategory
          category="Methodologies"
          technologies={technologies.methodologies}
          {selectedTechs}
          {toggleTech}
          {careerButomClass} />
        <TechCategory
          category="Integrations"
          technologies={technologies.integrations}
          {selectedTechs}
          {toggleTech}
          {careerButomClass} />
      </div>

      <ul class="space-y-2 mb-3">
        {#each achievements as achievement, achIndex}
          <li class="flex items-start gap-2 text-xs md:text-sm text-gray-700 dark:text-gray-300">
            <span class="mt-1.5 h-1 w-1 rounded-full bg-emerald-700 dark:bg-emerald-300 shrink-0">
            </span>
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
