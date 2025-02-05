<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { flip } from "svelte/animate";
  import { fade } from "svelte/transition";
  import { language } from "../../lib/stores/language";
  import { theme } from "../../lib/stores/theme";
  import { translations } from "../../lib/stores/translations";
  import { titles } from "../../lib/types/titles";
  import type { TypingState } from "./types";
  import { createTypingAnimation } from "./typing";

  $: t = translations[$language];

  const getClasses = {
    section: theme.getBackgroundClasses("primary"),
    heading: theme.getTextClasses("h1", "heading"),
    subheading: theme.getTextClasses("h2", "heading"),
    description: theme.getTextClasses("large", "body"),
    highlight: theme.getHighlightTextClasses(),
  };

  let cursorRef: HTMLSpanElement;
  const typingAnimation = createTypingAnimation([...titles], { element: null });
  let state: TypingState;

  $: if (cursorRef) {
    typingAnimation.cursorRef = { element: cursorRef };
  }

  typingAnimation.subscribe(s => (state = s));

  function renderTitle() {
    if (!state) return [];

    const parts = titles[state.currentIndex].textParts;
    let currentPosition = 0;

    return parts.map((part, index) => {
      const start = currentPosition;
      const end = currentPosition + part.text.length;
      currentPosition = end;
      const displayedText = state.currentText.slice(start, end);

      return {
        text: displayedText,
        className: part.className,
        key: `title-part-${index}`,
      };
    });
  }

  onMount(() => {
    typingAnimation.start();
  });

  onDestroy(() => {
    typingAnimation.destroy();
  });
</script>

<section
  data-testid="hero-section"
  id="home"
  class="{getClasses.section(
    $theme,
  )} min-h-screen w-full flex items-center justify-center transition-colors duration-300
    {$theme.contrast === 'high' ? theme.getBorderClasses('default')($theme) + ' border-b' : ''}">
  <div class="w-full max-w-[1100px] px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col items-start gap-6">
      <div class="flex flex-col gap-2">
        <div
          aria-label="Animated title"
          role="heading"
          aria-level={1}
          class="group font-mono text-4xl md:text-6xl font-bold relative">
          {#each renderTitle() as part (part.key)}
            <span class={part.className + " transition-colors duration-300"} animate:flip>
              {part.text}
            </span>
          {/each}
          {#if !state.isComplete}
            <span bind:this={cursorRef} class={getClasses.heading($theme)} aria-hidden="true">
              |
            </span>
          {/if}
        </div>

        <span class="text-2xl md:text-3xl font-bold {getClasses.subheading($theme)}" in:fade>
          {t.hero.role}
        </span>
      </div>

      <p class="text-lg {getClasses.description($theme)} max-w-2xl" in:fade={{ delay: 200 }}>
        {#each t.hero.description as chunk}
          {#if chunk.highlight}
            <span class={getClasses.highlight($theme)}>
              {chunk.text}
            </span>
          {:else}
            {chunk.text}
          {/if}
        {/each}
      </p>
    </div>
  </div>
</section>
