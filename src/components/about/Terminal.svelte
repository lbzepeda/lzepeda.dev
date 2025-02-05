<script lang="ts">
  import { createEventDispatcher, onDestroy, onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { theme } from "../../lib/stores/theme";
  import TerminalHeader from "./TerminalHeader.svelte";

  const dispatch = createEventDispatcher();
  export let isVisible = true;

  const AnimationState = {
    IDLE: "idle",
    RUNNING: "running",
    COMPLETED: "completed",
    PAUSED: "paused",
  };

  const DELAYS = {
    CHAR_FIRST: 40,
    CHAR_OTHER: 30,
    LINE: 90,
    RESET: 1200,
  } as const;

  // Obtenemos las clases usando los nuevos helpers
  const getClasses = {
    container: theme.getBackgroundClasses("primary"),
    content: ($theme: any) => `bg-gray-100 dark:bg-black transition-colors duration-300`,
    command: theme.getHighlightTextClasses(),
    info: theme.getTextClasses("base", "body"),
    next: theme.getHighlightTextClasses(),
    success: theme.getHighlightTextClasses(),
    default: theme.getTextClasses("base", "body"),
    cursor: theme.getTextClasses("h2", "heading"),
  };

  type LineType = "command" | "info" | "next" | "success" | "default";

  const terminalLines = [
    {
      text: "levizepeda@Levis-MacBook-Air levizepeda % npm run dev",
      type: "command" as LineType,
    },
    { text: "> lzepeda.dev@0.0.1 dev", type: "info" as LineType },
    { text: "> astro dev", type: "info" as LineType },
    { text: "  🚀 Astro", type: "next" as LineType },
    {
      text: "  │ Local:    http://localhost:4321",
      type: "default" as LineType,
    },
    { text: "  ✓ Svelte adapter enabled", type: "success" as LineType },
    { text: "  ✓ Ready in 300ms", type: "success" as LineType },
  ];

  let currentLine = 0;
  let currentChar = 0;
  let displayedLines: string[] = [];
  let animationState = AnimationState.IDLE;

  function resetAnimation() {
    currentLine = 0;
    currentChar = 0;
    displayedLines = [];
    animationState = AnimationState.RUNNING;
  }

  function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function animateTerminal() {
    while (animationState === AnimationState.RUNNING) {
      if (currentLine >= terminalLines.length) {
        dispatch("animationComplete", { completed: true });
        animationState = AnimationState.COMPLETED;
        break;
      }

      try {
        const currentText = terminalLines[currentLine]?.text ?? "";
        if (currentChar <= currentText.length) {
          const newLines = [...displayedLines];
          newLines[currentLine] = currentText.substring(0, currentChar);
          displayedLines = newLines;
          currentChar++;
          await delay(currentLine === 0 ? DELAYS.CHAR_FIRST : DELAYS.CHAR_OTHER);
        } else {
          currentLine++;
          currentChar = 0;
          await delay(DELAYS.LINE);
        }
      } catch (error) {
        console.error("Animation error:", error);
        animationState = AnimationState.PAUSED;
      }
    }
  }

  onMount(() => {
    animationState = AnimationState.RUNNING;
    animateTerminal();
  });

  $: if (isVisible && animationState === AnimationState.COMPLETED) {
    resetAnimation();
    animateTerminal();
  }

  $: if (!isVisible) {
    animationState = AnimationState.COMPLETED;
  }

  onDestroy(() => {
    animationState = AnimationState.PAUSED;
  });
</script>

<div
  role="log"
  aria-live="polite"
  aria-label="Terminal Output"
  class="{getClasses.container(
    $theme,
  )} font-mono p-4 rounded-lg shadow-lg w-full max-w-4xl mx-auto">
  <TerminalHeader />
  <div class="{getClasses.content($theme)} rounded-md p-4 font-mono">
    <div
      class="space-y-1 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600">
      <div class="min-w-fit">
        {#each displayedLines as line, index}
          <div
            class="whitespace-pre text-sm sm:text-base md:text-lg {getClasses[
              terminalLines[index]?.type || 'default'
            ]($theme)}"
            transition:fade>
            {line}
            {#if index === currentLine}
              <span aria-hidden="true" class="animate-pulse ml-0.5 {getClasses.cursor($theme)}">
                ▊
              </span>
            {/if}
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>
