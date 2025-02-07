<script lang="ts">
  import { onMount } from "svelte";
  import { theme } from "../../lib/stores/theme";
  import Browser from "./Browser.svelte";
  import Terminal from "./Terminal.svelte";

  // Obtenemos las clases usando los nuevos helpers
  const getClasses = {
    text: theme.getTextClasses("large", "body"),
    heading: theme.getTextClasses("h1", "heading"),
    resetButton: ($theme: any) =>
      `text-2xl sm:text-3xl transition-colors duration-300 ${
        $theme.contrast === "high"
          ? `${theme.getTextClasses("h2", "heading")($theme)} hover:${theme.getHighlightTextClasses()($theme)}`
          : `${theme.getTextClasses("base", "body")($theme)} hover:${theme.getHighlightTextClasses()($theme)}`
      }`,
  };

  let currentComponent = "terminal";
  let isAnimating = true;
  let resetKey = 0;

  function handleTerminalComplete() {
    currentComponent = "browser";
    isAnimating = false;
  }

  function handleReset() {
    resetKey += 1;
    isAnimating = true;
    currentComponent = "terminal";
  }

  let isVisible = false;

  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 },
    );

    const element = document.getElementById("about");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  });
</script>

<div
  class="relative w-full min-h-screen flex flex-col items-center justify-center py-4 sm:py-8 md:py-0">
  <div class="w-full overflow-auto flex flex-col items-center justify-center">
    {#key resetKey}
      {#if currentComponent === "terminal"}
        <div
          data-testid="component-wrapper"
          class="w-full transition-all duration-300 opacity-0 translate-y-4 px-2 sm:px-4"
          class:opacity-100={currentComponent === "terminal"}
          class:translate-y-0={currentComponent === "terminal"}>
          <Terminal {isVisible} on:animationComplete={handleTerminalComplete} />
        </div>
      {:else}
        <div
          class="w-full transition-all duration-300 opacity-0 translate-y-4 px-2 sm:px-4"
          class:opacity-100={currentComponent === "browser"}
          class:translate-y-0={currentComponent === "browser"}>
          <Browser />
        </div>
      {/if}
    {/key}

    <div
      data-testid="reset-button-wrapper"
      class="transition-all duration-300 mt-8"
      class:opacity-100={!isAnimating}
      class:opacity-0={isAnimating}>
      <button
        on:click={handleReset}
        class={getClasses.resetButton($theme)}
        aria-label="Reiniciar animación">
        ↺
      </button>
    </div>
  </div>
</div>
