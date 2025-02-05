<script lang="ts">
  import { language } from "../../../lib/stores/language";
  import { translations } from "../../../lib/stores/translations";
  import { filteredCareers } from "../../../lib/stores/useCareer";
  import CareerContent from "./CareerContent.svelte";
  import CareerHeader from "./CareerHeader.svelte";
  import CareerIcon from "./CareerIcon.svelte";

  type Role = {
    title: string;
    date: string;
    description: string;
    branch: string;
    achievements: string[];
  };

  type RoleKeys = "tech_leader" | "senior_dev" | "junior_dev" | "system_dev" | "ceo";

  type CareerTranslations = {
    roles: Record<RoleKeys, Role>;
    title: string;
    timeline: string;
    gitLog: string;
    noResults: string;
    categories: {
      development: string;
      infrastructure: string;
      methodologies: string;
      integrations: string;
    };
  };

  $: t = translations[$language].career as unknown as CareerTranslations;
</script>

<div data-testid="timeline-container" class="space-y-6 md:space-y-8">
  {#each $filteredCareers as career}
    <div class="relative">
      <div class="flex gap-2 md:gap-3">
        <CareerIcon
          mergeFrom={career.roleKey === "senior_dev"}
          branch={t.roles[career.roleKey as RoleKeys].branch} />

        <div class="flex-1 min-w-0">
          <CareerHeader
            careerData={career}
            title={t.roles[career.roleKey as RoleKeys].title}
            isFavorite={career.isFavorite}
            date={t.roles[career.roleKey as RoleKeys].date} />

          <CareerContent
            careerItem={career}
            description={t.roles[career.roleKey as RoleKeys].description}
            technologies={career.technologies}
            achievements={t.roles[career.roleKey as RoleKeys].achievements}
            branch={t.roles[career.roleKey as RoleKeys].branch} />
        </div>
      </div>
    </div>
  {/each}

  {#if $filteredCareers.length === 0}
    <div class="text-center py-8 text-sm text-gray-500 dark:text-gray-400">
      {t.noResults}
    </div>
  {/if}
</div>
