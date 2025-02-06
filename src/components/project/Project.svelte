<script lang="ts">
  import { language } from "../../lib/stores/language";
  import { DESIGN_TOKENS, theme } from "../../lib/stores/theme";
  import { getProjectData, getProjectTranslations } from "./project-translations";
  import ProjectCard from "./ProjectCard.svelte";
  import type { ProjectType } from "./Type";

  let activeTab = 0;
  $: t = getProjectTranslations($language);

  const handleActiveTab = (index: number) => {
    activeTab = activeTab === index ? activeTab : index;
  };

  $: projectData = [...getProjectData($language)] as unknown as ProjectType[];

  const getClasses = {
    headerIcon: ($theme: { contrast: "normal" | "high" }) => `
     w-5 h-5 md:w-6 md:h-6 
     ${DESIGN_TOKENS.careerSection.header.icon[$theme.contrast].light}
     ${DESIGN_TOKENS.careerSection.header.icon[$theme.contrast].dark}
   `,
    headerTitle: ($theme: { contrast: "normal" | "high" }) => `
     ${DESIGN_TOKENS.careerSection.header.title[$theme.contrast].light}
     ${DESIGN_TOKENS.careerSection.header.title[$theme.contrast].dark}
   `,
  };

  $: isHighContrast = $theme?.contrast === "high";
</script>

<section
  id="project"
  class="bg-white dark:bg-slate-900 py-20 relative overflow-hidden"
  aria-label="Projects Section">
  <!-- Grid background -->
  <div class="absolute inset-0">
    <div
      class="absolute inset-0 bg-[linear-gradient(to_right,#8885_2px,transparent_2px),linear-gradient(to_bottom,#8885_2px,transparent_2px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000,transparent)] animate-move-grid will-change-transform">
    </div>
  </div>

  <div class="container relative mx-auto px-4">
    <div class="max-w-2xl mx-auto text-center mb-16">
      <h2
        class="text-lg md:text-3xl font-mono {getClasses.headerTitle($theme)} {isHighContrast
          ? 'font-bold dark:text-white'
          : ''}">
        {t.title}
      </h2>
      <div class="w-24 h-1 bg-primary dark:bg-primary-dark mx-auto mb-8 rounded-full"></div>
      <p
        class={isHighContrast
          ? "text-slate-900 dark:text-white font-medium"
          : "text-slate-700 dark:text-slate-300"}>
        {t.subtitle}
      </p>
    </div>

    <div class="max-w-4xl mx-auto">
      <div class="mb-8 -mx-4 px-4 md:px-0 md:mx-0">
        <div
          class="flex overflow-x-auto md:overflow-visible md:justify-center scrollbar-hide pb-2 md:pb-0">
          <div class="flex space-x-2 md:space-x-3">
            {#each projectData as { company }, index}
              <button
                class="whitespace-nowrap px-4 py-2 text-sm font-medium rounded transition-colors shrink-0
    {activeTab === index
                  ? 'bg-primary dark:bg-primary-dark text-white font-semibold'
                  : isHighContrast
                    ? 'text-slate-900 dark:text-white bg-white dark:bg-slate-800 border-2 border-slate-400 dark:border-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 font-medium'
                    : 'text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'}"
                on:click={() => handleActiveTab(index)}>
                {company}
              </button>
            {/each}
          </div>
        </div>
      </div>
      <ProjectCard exp={projectData[activeTab]} />
    </div>
  </div>
</section>
