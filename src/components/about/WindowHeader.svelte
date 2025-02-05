<script lang="ts">
  import { theme } from "../../lib/stores/theme";
  export let title: string;

  // Obtenemos las clases usando los nuevos helpers
  const getClasses = {
    header: (
      $theme: any,
    ) => `flex items-center justify-between pb-2 mb-4 border-b pt-2 pl-2 sm:pt-0 sm:pl-0 
      ${theme.getBorderClasses("default")($theme)}`,
    title: ($theme: any) => {
      const baseClasses = "transition-colors duration-300";
      if ($theme.contrast === "high") {
        return `${baseClasses} text-[#1E1E1E] dark:text-gray-500 font-medium`;
      }
      return `${baseClasses} text-[#1E1E1E] dark:text-gray-600 text-sm`;
    },
  };

  const WINDOW_BUTTONS = [
    {
      bg: "bg-[#FF5F56]",
      border: "border-[#E0443E] dark:border-[#AF3732]",
      ariaLabel: "Close button (decorative)",
    },
    {
      bg: "bg-[#FFBD2E]",
      border: "border-[#DEA123] dark:border-[#9D7B1C]",
      ariaLabel: "Minimize button (decorative)",
    },
    {
      bg: "bg-[#27C93F]",
      border: "border-[#1AAB29] dark:border-[#1C8326]",
      ariaLabel: "Maximize button (decorative)",
    },
  ] as const;
</script>

<header class={getClasses.header($theme)}>
  <div class="flex items-center space-x-2">
    {#each WINDOW_BUTTONS as button}
      <div
        class="w-3 h-3 rounded-full border transition-colors duration-300 {button.bg} {button.border}"
        role="presentation"
        aria-label={button.ariaLabel}>
      </div>
    {/each}
  </div>

  <div class={getClasses.title($theme)}>
    {title}
  </div>

  <div class="w-16" aria-hidden="true"></div>
</header>
