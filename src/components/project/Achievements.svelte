<script lang="ts">
  import { language } from "../../lib/stores/language";
  import { theme } from "../../lib/stores/theme";
  import { getProjectTranslations } from "./project-translations";

  export let achievements: string[];
  $: t = getProjectTranslations($language);
  $: isHighContrast = $theme?.contrast === "high";
</script>

<div>
  <h4
    class="{isHighContrast
      ? 'text-slate-900 dark:text-white font-semibold'
      : 'text-slate-800 dark:text-slate-100 font-medium'} mb-2">
    {t.keyAchievements}
  </h4>
  <ul class="space-y-1.5">
    {#each achievements as achievement}
      <li
        class="flex items-start gap-2 {isHighContrast
          ? 'text-slate-800 dark:text-slate-200'
          : 'text-slate-600 dark:text-slate-400'}">
        <span
          class="{isHighContrast
            ? 'text-primary-dark dark:text-primary font-bold'
            : 'text-primary dark:text-primary-dark'} mt-1">
          →
        </span>
        <span>{achievement}</span>
      </li>
    {/each}
  </ul>
</div>
