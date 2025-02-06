<script lang="ts">
  import { language } from "../../lib/stores/language";
  import { theme } from "../../lib/stores/theme";
  import { getProjectTranslations } from "./project-translations";
  import TechCategory from "./TechCategory.svelte";
  import type { ProjectType } from "./Type";

  export let stack: ProjectType["stack"];
  $: t = getProjectTranslations($language);
</script>

<div>
  <h4 class="{theme.getTextClasses('h3', 'heading')($theme)} mb-3">
    {t.techStack}
  </h4>
  <div class="space-y-3">
    {#if stack.frontend}
      <TechCategory title="Frontend" items={stack.frontend} color="frontend" />
    {/if}
    {#if stack.backend}
      <TechCategory title="Backend" items={stack.backend} color="backend" />
    {/if}
    {#if stack.tools}
      <TechCategory title="Tools" items={stack.tools} color="tools" />
    {/if}
  </div>
</div>
