<script lang="ts">
  import { theme } from "../../lib/stores/theme";
  export let title: string;

  const BUTTONS = [
    { bgClass: "bg-[#FF5F56] border-[#E0443E] dark:border-[#AF3732]" },
    { bgClass: "bg-[#FFBD2E] border-[#DEA123] dark:border-[#9D7B1C]" },
    { bgClass: "bg-[#27C93F] border-[#1AAB29] dark:border-[#1C8326]" },
  ] as const;
</script>

<header
  class="flex items-center justify-between pb-2 mb-4 border-b border-gray-200 dark:border-gray-700 pt-2 pl-2 sm:pt-0 sm:pl-0">
  <div class="flex items-center space-x-2">
    {#each BUTTONS as { bgClass }, index}
      <div class={`w-3 h-3 rounded-full border ${bgClass}`}></div>
    {/each}
  </div>
  <div
    class="text-[#1E1E1E] dark:text-gray-600 {$theme.contrast === 'high'
      ? 'font-medium'
      : 'text-sm'}">
    {title}
  </div>
  <div class="w-16"></div>
</header>
