<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { language } from "../../lib/stores/language";
  import { theme } from "../../lib/stores/theme";
  import { translations } from "../../lib/stores/translations";
  import WindowHeader from "./WindowHeader.svelte";

  const dispatch = createEventDispatcher();
  $: t = translations[$language];

  // Obtenemos las clases usando los nuevos helpers
  const getClasses = {
    container: theme.getBackgroundClasses("primary"),
    content: ($theme: any) =>
      `${$theme.mode === "dark" ? "bg-gray-900" : "bg-gray-100"} transition-colors duration-300`,
    title: theme.getHighlightTextClasses(),
    text: theme.getTextClasses("large", "body"),
    highlight: theme.getHighlightTextClasses(),
    image: ($theme: any) =>
      `transition-colors duration-300 ${
        $theme.contrast === "high"
          ? "ring-4 ring-primary-dark dark:ring-primary ring-offset-4 ring-offset-white dark:ring-offset-slate-900 contrast-125"
          : "ring-1 ring-slate-200 dark:ring-slate-700 contrast-100"
      }`,
  };

  let contentLoaded = false;
  let imageLoaded = false;

  function handleContentLoad() {
    contentLoaded = true;
    checkIfFullyLoaded();
  }

  function handleImageLoad() {
    imageLoaded = true;
    checkIfFullyLoaded();
  }

  function checkIfFullyLoaded() {
    if (contentLoaded && imageLoaded) {
      dispatch("animationComplete");
    }
  }

  onMount(() => {
    handleContentLoad();
  });
</script>

<article
  data-testid="browser-container"
  aria-labelledby="browser-title"
  class="{getClasses.container($theme)} m-2 md:p-4 rounded-lg shadow-lg">
  <WindowHeader title="http://localhost:4321" />

  <div
    data-testid="content-container"
    class="{getClasses.content($theme)} md:p-4 rounded-lg"
    in:fade={{ delay: 200, duration: 300 }}>
    <div
      data-testid="flex-container"
      class="flex flex-col md:flex-row items-center gap-3 sm:gap-4 md:gap-8 p-2 sm:p-4">
      <section class="flex-1">
        <h1
          id="browser-title"
          class="text-xl sm:text-2xl md:text-3xl font-bold {getClasses.title($theme)}">
          {t.about.title}
        </h1>
        <div class="mt-2 md:mt-4 max-w-2xl">
          <p class="text-base sm:text-lg {getClasses.text($theme)}">
            {#each t.about.intro as chunk}
              {#if chunk.highlight}
                <span class={getClasses.highlight($theme)}>
                  {chunk.text}
                </span>
              {:else}
                {chunk.text}
              {/if}
            {/each}
          </p>
          <p
            class="mt-3 sm:mt-4 text-base sm:text-lg {getClasses.text($theme)}"
            in:fade={{ delay: 200, duration: 300 }}>
            {#each t.about.experience as chunk}
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
      </section>

      <figure
        data-testid="image-container"
        class="relative w-32 h-32 sm:w-48 sm:h-48 md:w-72 md:h-72 rounded-full overflow-hidden flex-shrink-0 {getClasses.image(
          $theme,
        )}">
        <img
          src="/me.webp"
          alt="Levi Zepeda - Frontend Developer"
          width="500"
          height="500"
          on:load={handleImageLoad}
          class="object-cover w-full h-full transition-colors duration-300"
          loading="eager" />
      </figure>
    </div>
  </div>
</article>
