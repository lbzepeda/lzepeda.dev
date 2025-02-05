<script lang="ts">
  import { Coffee } from "lucide-svelte";
  import { language } from "../../../lib/stores/language";
  import { DESIGN_TOKENS, theme } from "../../../lib/stores/theme";
  import { translations } from "../../../lib/stores/translations";
  import type { CareerData } from "../CareerData";

  export let careers: CareerData[];

  type Roles = {
    [key: string]: Role;
  };

  $: t = translations[$language].career as unknown as {
    categories: any;
    roles: Roles;
  };

  const getClasses = {
    container: ($theme: { contrast: keyof typeof DESIGN_TOKENS.gitLog.container }) => `
      p-4 rounded-lg text-sm overflow-x-auto transition-all duration-300 hover:scale-[1.02]
      ${DESIGN_TOKENS.gitLog.container[$theme.contrast].light}
      ${DESIGN_TOKENS.gitLog.container[$theme.contrast].dark}
    `,
    content: ($theme: { contrast: keyof typeof DESIGN_TOKENS.gitLog.content }) => ({
      author: `${DESIGN_TOKENS.gitLog.content[$theme.contrast].author}`,
      date: `${DESIGN_TOKENS.gitLog.content[$theme.contrast].date}`,
      branch: `${DESIGN_TOKENS.gitLog.content[$theme.contrast].branch}`,
      title: `${DESIGN_TOKENS.gitLog.content[$theme.contrast].title}`,
      description: `${DESIGN_TOKENS.gitLog.content[$theme.contrast].description}`,
      category: {
        label: `${DESIGN_TOKENS.gitLog.content[$theme.contrast].category.label}`,
        content: `${DESIGN_TOKENS.gitLog.content[$theme.contrast].category.content}`,
      },
      achievements: {
        title: `${DESIGN_TOKENS.gitLog.content[$theme.contrast].achievements.title}`,
        item: `${DESIGN_TOKENS.gitLog.content[$theme.contrast].achievements.item}`,
      },
    }),
    milestone: {
      icon: ($theme: { contrast: keyof typeof DESIGN_TOKENS.gitLog.milestone.icon }) => `
        ${DESIGN_TOKENS.gitLog.milestone.icon[$theme.contrast]}
      `,
      tooltip: {
        container: DESIGN_TOKENS.gitLog.milestone.tooltip.container,
        background: ($theme: {
          contrast: keyof typeof DESIGN_TOKENS.gitLog.milestone.tooltip.background;
        }) => `
          ${DESIGN_TOKENS.gitLog.milestone.tooltip.background[$theme.contrast].light}
          ${DESIGN_TOKENS.gitLog.milestone.tooltip.background[$theme.contrast].dark}
        `,
      },
    },
  };
</script>

<div data-testid="gitlog-view" class="space-y-4 font-mono">
  {#each careers as career}
    {@const roleData = t.roles[career.roleKey] as Role}
    <div class={getClasses.container($theme)}>
      <div class="text-yellow-300">
        commit {Math.random().toString(16).slice(2, 10)}
      </div>
      <div class={getClasses.content($theme).author}>
        Author: Levi Zepeda &lt;levi.zepeda06@gmail.com&gt;
      </div>
      <div class={getClasses.content($theme).date}>
        Date: {roleData.date}
      </div>
      <div class={getClasses.content($theme).branch}>
        branch: {roleData.branch}
      </div>
      <div class="mt-2 whitespace-pre-wrap">
        <div class={getClasses.content($theme).title + " flex items-center gap-2"}>
          {roleData.title}
          {#if career.isFavorite}
            <div class="relative inline-block group">
              <Coffee class={getClasses.milestone.icon($theme)} aria-label="Favorite position" />
              <div
                class="{getClasses.milestone.tooltip
                  .container} {getClasses.milestone.tooltip.background($theme)}">
                Career milestone
                <div
                  class="absolute -right-1 top-1/2 -translate-y-1/2 border-[6px] border-transparent border-l-gray-800 dark:border-l-gray-700 md:hidden">
                </div>
                <div
                  class="hidden md:block absolute -left-1 top-1/2 -translate-y-1/2 border-[6px] border-transparent border-r-gray-800 dark:border-r-gray-700">
                </div>
              </div>
            </div>
          {/if}
        </div>
        <div class="mt-2 {getClasses.content($theme).description}">
          {roleData.description}
        </div>
        <div class="mt-4 space-y-2">
          {#each Object.entries(career.technologies) as [category, techs]}
            <div class={getClasses.content($theme).category.content}>
              <span class={getClasses.content($theme).category.label}>
                {t.categories[category]}:
              </span>
              {techs.join(", ")}
            </div>
          {/each}
        </div>
        <div class="mt-4">
          <span class={getClasses.content($theme).achievements.title}>Achievements:</span>
          {#each roleData.achievements as achievement}
            <div class={getClasses.content($theme).achievements.item}>
              • {achievement}
            </div>
          {/each}
        </div>
      </div>
    </div>
  {/each}
</div>
