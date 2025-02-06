<script lang="ts">
  import { language } from "../../lib/stores/language";
  import Achievements from "./Achievements.svelte";
  import { getProjectTranslations } from "./project-translations";

  export let project: {
    name: string;
    url?: string;
    achievements: string[];
  };

  $: t = getProjectTranslations($language);
</script>

<div class="mb-4">
  <h4
    class="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2 flex items-center justify-between">
    <span>{project.name}</span>
    {#if project.url}
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        class="text-primary dark:text-primary-dark text-sm hover:underline">
        {t.viewProject} →
      </a>
    {/if}
  </h4>
  <div class="space-y-3">
    <Achievements achievements={project.achievements} />
  </div>
</div>
