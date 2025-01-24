<script lang="ts">
  import { CandyCane } from "lucide-svelte";
  import { PALETTES, THEME_COLORS } from "../../lib/constants/theme";
  import { theme } from "../../lib/stores/theme";

  let isPopoverOpen = false;
  let themeControls: HTMLDivElement;

  const styles = {
    highContrastClasses: 'border-slate-400 dark:border-slate-500 text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700',
    normalContrastClasses: 'border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
  }
</script>

<div bind:this={themeControls} class="flex items-center gap-4 relative theme-controls">
  <!-- Dark/Light Mode Button -->
  <button
    on:click={theme.toggleMode}
    class="font-mono text-sm px-3 py-1.5 rounded-lg border transition-colors
    {$theme.contrast === 'high' ? styles.highContrastClasses : styles.normalContrastClasses}"
    aria-label={$theme.mode === "light" ? "Switch to dark mode" : "Switch to light mode"}
    role="switch"
    aria-checked={$theme.mode === "dark"}
  >
    #{$theme.mode === "light" ? THEME_COLORS.LIGHT : THEME_COLORS.DARK}
  </button>

  <!-- Accessibility Button -->
  <div class="relative" role="presentation">
    <button
      id="accessibility-menu-button"
      on:click={() => (isPopoverOpen = !isPopoverOpen)}
      class="p-2 rounded-lg border transition-colors
      {$theme.contrast === 'high' ? styles.highContrastClasses : styles.normalContrastClasses}"
      aria-label="Accessibility settings"
      aria-expanded={isPopoverOpen}
      aria-controls="accessibility-menu"
      aria-haspopup="dialog"
    >
      <CandyCane class="w-5 h-5" aria-hidden="true" />
    </button>

    {#if isPopoverOpen}
      <div
        id="accessibility-menu"
        class="absolute mt-2 rounded-xl p-4 w-72 shadow-xl border transition-colors z-50
        {$theme.contrast === 'high'
          ? 'bg-slate-50 dark:bg-slate-900 border-slate-400 dark:border-slate-500'
          : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'}"
        role="dialog"
        aria-modal="true"
        aria-labelledby="color-scheme-heading"
      >
        <!-- Color Palettes -->
        <div class="mb-4">
          <h3
            id="color-scheme-heading"
            class="text-sm font-medium mb-2 {$theme.contrast === 'high'
              ? 'text-slate-900 dark:text-white font-semibold'
              : 'text-slate-900 dark:text-white'}"
          >
            Color Scheme
          </h3>
          <div role="radiogroup" aria-label="Select color scheme" class="grid grid-cols-3 gap-2">
            {#each Object.entries(PALETTES) as [name, colors]}
              <button
                class="flex flex-col items-center gap-1 p-2 rounded-lg border transition-all
                {$theme.palette === name
                  ? $theme.contrast === 'high'
                    ? 'border-slate-400 dark:border-slate-500 scale-105'
                    : 'border-primary scale-105'
                  : 'border-transparent hover:border-slate-200 dark:hover:border-slate-700'}"
                on:click={() => theme.setPalette(name as keyof typeof PALETTES)}
                role="radio"
                aria-checked={$theme.palette === name}
                aria-label="Set {colors.label} theme"
              >
                <div
                  class="w-full h-6 rounded"
                  style="background: linear-gradient(45deg, {colors.primary} 0%, {colors.secondary} 100%)"
                  aria-hidden="true"
                ></div>
                <span
                  class="text-xs {$theme.contrast === 'high'
                    ? 'text-slate-900 dark:text-slate-100'
                    : 'text-slate-600 dark:text-slate-400'}"
                >
                  {colors.label}
                </span>
              </button>
            {/each}
          </div>
        </div>

        <!-- Contrast Toggle -->
        <div>
          <h3
            id="contrast-heading"
            class="text-sm font-medium mb-2 {$theme.contrast === 'high'
              ? 'text-slate-900 dark:text-white font-semibold'
              : 'text-slate-900 dark:text-white'}"
          >
            Contrast
          </h3>
          <button
            on:click={theme.toggleContrast}
            class="w-full px-3 py-1.5 rounded-lg border text-left flex justify-between items-center transition-colors
            {$theme.contrast === 'high'
              ? 'border-slate-400 dark:border-slate-500 text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-700'
              : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'}"
            role="switch"
            aria-checked={$theme.contrast === "high"}
            aria-label="Toggle high contrast mode"
          >
            <span class:font-bold={$theme.contrast === "high"}>
              {$theme.contrast === "normal" ? "Normal" : "High"}
            </span>
            <span class:font-bold={$theme.contrast === "high"} aria-hidden="true"> A </span>
          </button>
        </div>
      </div>
    {/if}
  </div>
</div>
