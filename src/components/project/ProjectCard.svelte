<script lang="ts">
  import { language } from "../../lib/stores/language";
  import { theme } from "../../lib/stores/theme";
  import { getProjectTranslations } from "./project-translations";
  import ProjectDetails from "./ProjectDetails.svelte";
  import ProjectHeader from "./ProjectHeader.svelte";
  import TechStack from "./TechStack.svelte";
  import type { ProjectType } from "./Type";

  export let exp: ProjectType;
  $: t = getProjectTranslations($language);
  $: isHighContrast = $theme?.contrast === "high";
</script>

<div
  class="bg-white dark:bg-slate-900 rounded-lg shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl flex flex-col md:flex-row border-2 {isHighContrast
    ? 'border-slate-500 dark:border-slate-600'
    : 'border-slate-300 dark:border-slate-700'}">
  <div
    class="border-l-4 border-primary dark:border-primary-dark flex-1 {isHighContrast
      ? 'bg-white dark:bg-slate-800'
      : 'bg-slate-50 dark:bg-slate-800/50'}">
    <div class="p-6">
      <ProjectHeader role={exp.role} period={exp.period} />
      {#each exp.projects as project}
        <ProjectDetails {project} />
      {/each}
      <div class="mt-4">
        <TechStack stack={exp.stack} />
      </div>
    </div>
  </div>

  <div
    class="md:w-1/4 bg-slate-100 dark:bg-slate-800/70 p-5 flex items-center justify-center md:justify-start md:items-start">
    <div class="text-center md:text-left">
      <h4
        class="{isHighContrast
          ? 'text-slate-900 dark:text-white font-semibold'
          : 'text-slate-800 dark:text-slate-100 font-medium'} mb-2">
        {t.overview}
      </h4>
      <p
        class="{isHighContrast
          ? 'text-slate-800 dark:text-slate-200'
          : 'text-slate-600 dark:text-slate-400'} text-sm leading-relaxed">
        {exp.details}
      </p>
    </div>
  </div>
</div>
