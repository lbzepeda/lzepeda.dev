<script lang="ts">
  import type { careerData } from "../careerData";
  import CareerContent from "./CareerContent.svelte";
  import CareerHeader from "./CareerHeader.svelte";
  import CareerIcon from "./CareerIcon.svelte";

  export let filteredCareers: typeof careerData;
  export let expandedId: number | null;
  export let selectedTechs: Set<string>;
  export let toggleExpand: (id: number) => () => void;
  export let toggleTech: (tech: string) => () => void;
  export let careerButomClass: string;
</script>

<div data-testid="timeline-container" class="space-y-6 md:space-y-8">
  {#each filteredCareers as career (career.id)}
    <div class="relative">
      <div class="flex gap-2 md:gap-3">
        <CareerIcon mergeFrom={career.mergeFrom === "true"} branch={career.branch} />

        <div class="flex-1 min-w-0">
          <CareerHeader
            title={career.title}
            isFavorite={career.isFavorite}
            date={career.date}
            id={career.id}
            {expandedId}
            {toggleExpand} />

          <CareerContent
            description={career.description}
            technologies={career.technologies}
            achievements={career.achievements}
            branch={career.branch}
            {expandedId}
            careerId={career.id}
            {selectedTechs}
            {toggleTech}
            {careerButomClass} />
        </div>
      </div>
    </div>
  {/each}

  {#if filteredCareers.length === 0}
    <div class="text-center py-8 text-sm text-gray-500 dark:text-gray-400">
      No experiences found with the selected technologies.
    </div>
  {/if}
</div>
