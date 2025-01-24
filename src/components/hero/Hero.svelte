<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { flip } from 'svelte/animate';
  import { fade } from 'svelte/transition';
  import { theme } from "../../lib/stores/theme";
  import { titles } from "../../lib/types/titles";
  import type { TypingState } from './types';
  import { createTypingAnimation } from './typing';

  const styles = {
    transitionClasses: "transition-colors duration-300",
    highContrastTextClasses: "text-slate-900 dark:text-white",
    lowContrastTextClasses: "text-slate-700 dark:text-slate-300",
    primaryTextClasses: "text-primary dark:text-primary-dark",
    primaryTextHighContrastClasses: "text-primary-dark dark:text-primary font-semibold"
  }

  let cursorRef: HTMLSpanElement;
  const typingAnimation = createTypingAnimation([...titles], { element: null });
  let state: TypingState;

  $: if (cursorRef) {
    typingAnimation.cursorRef = { element: cursorRef };
  }

  typingAnimation.subscribe(s => state = s);

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
  class="min-h-screen w-full flex items-center justify-center bg-white dark:bg-slate-900 {styles.transitionClasses} {$theme.contrast === 'high' ? 'border-b border-slate-300 dark:border-slate-600' : ''}"
>
  <div class="w-full max-w-[1100px] px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col items-start gap-6">
      <div class="flex flex-col gap-2">
        <div
          aria-label="Animated title"
          role="heading"
          aria-level={1}
          class="group font-mono text-4xl md:text-6xl font-bold relative {styles.transitionClasses}"
        >
          {#each renderTitle() as part (part.key)}
            <span 
              class={part.className + " " + styles.transitionClasses}
              animate:flip
            >
              {part.text}
            </span>
          {/each}
          {#if !state.isComplete}
            <span
              bind:this={cursorRef}
              class="text-slate-900 dark:text-white {styles.transitionClasses}"
              aria-hidden="true"
            >
              |
            </span>
          {/if}
        </div>

        <span
          class="text-2xl md:text-3xl font-bold {styles.transitionClasses} {$theme.contrast === 'high' ? styles.highContrastTextClasses : styles.lowContrastTextClasses}"
          in:fade
        >
          Fullstack Developer
        </span>
      </div>

      <p
        class="text-lg {styles.transitionClasses} {$theme.contrast === 'high' ? styles.highContrastTextClasses + ' font-medium' : styles.lowContrastTextClasses} max-w-2xl"
        in:fade={{ delay: 200 }}
      >
        As a fullstack developer, I craft
        <span
          class="{styles.transitionClasses} {$theme.contrast === 'high' ? styles.primaryTextHighContrastClasses : styles.primaryTextClasses}"
        >
          end-to-end
        </span>
        solutions through
        <span
          class="{styles.transitionClasses} {$theme.contrast === 'high' ? styles.primaryTextHighContrastClasses : styles.primaryTextClasses}"
        >
          scalable
        </span>
        architectures and
        <span
          class="{styles.transitionClasses} {$theme.contrast === 'high' ? styles.primaryTextHighContrastClasses : styles.primaryTextClasses}"
        >
          efficient
        </span>
        code. From
        <span
          class="{styles.transitionClasses} {$theme.contrast === 'high' ? styles.primaryTextHighContrastClasses : styles.primaryTextClasses}"
        >
          database design
        </span>
        to
        <span
          class="{styles.transitionClasses} {$theme.contrast === 'high' ? styles.primaryTextHighContrastClasses : styles.primaryTextClasses}"
        >
          user interfaces
        </span>,
        I build complete, performant applications.
      </p>
    </div>
  </div>
</section>