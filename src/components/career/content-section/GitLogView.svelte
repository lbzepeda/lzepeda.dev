<script lang="ts">
  import { Coffee } from "lucide-svelte";
  import type { careerData } from "../careerData";

  export let careers: typeof careerData;
</script>

<div data-testid="gitlog-view" class="space-y-4 font-mono">
  {#each careers as career (career.id)}
    <div
      class="p-4 bg-gray-900 dark:bg-gray-800 rounded-lg text-sm overflow-x-auto transition-all duration-300 hover:scale-[1.02]">
      <div class="text-yellow-300">
        commit {Math.random().toString(16).slice(2, 10)}
      </div>
      <div class="text-blue-300">Author: Levi Zepeda &lt;levi.zepeda06@gmail.com&gt;</div>
      <div class="text-blue-300">Date: {career.date}</div>
      <div class="text-emerald-300">branch: {career.branch}</div>
      <div class="text-white mt-2 whitespace-pre-wrap">
        <div class="font-bold flex items-center gap-2">
          {career.title}
          {#if career.isFavorite}
            <div class="relative inline-block group">
              <Coffee
                class="w-4 h-4 md:w-5 md:h-5 text-amber-300 cursor-pointer"
                aria-label="Favorite position" />
              <div
                class="absolute z-10 invisible group-hover:visible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-800 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700 group-hover:opacity-100 whitespace-nowrap right-full top-1/2 -translate-y-1/2 mr-2 md:right-auto md:left-full md:ml-2">
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
        <div class="mt-2 text-gray-300">{career.description}</div>
        <div class="mt-4 space-y-2">
          {#each Object.entries(career.technologies) as [category, techs]}
            <div class="text-gray-300">
              <span class="font-semibold capitalize">
                {category}:
              </span>
              {" "}
              {techs.join(", ")}
            </div>
          {/each}
        </div>
        <div class="mt-4 text-gray-300">
          Achievements:
          {#each career.achievements as achievement, index}
            <div class="ml-4">
              • {achievement}
            </div>
          {/each}
        </div>
      </div>
    </div>
  {/each}
</div>
