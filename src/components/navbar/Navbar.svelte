<script lang="ts">
  import { FileDown } from "lucide-svelte";
  import { fade, slide } from "svelte/transition";
  import { language } from "../../lib/stores/language";
  import { theme } from "../../lib/stores/theme";
  import LanguageSelector from "./LanguageSelector.svelte";
  import ThemeControls from "./ThemeControls.svelte";
  import { clickOutside } from "./clickOutside";
  import { getNavTranslations, NAVIGATION_ITEMS } from "./nav-translations";

  let isMenuOpen = false;
  let navItems: { [key: string]: HTMLElement } = {};

  $: navTranslations = getNavTranslations($language);

  function handleNavClick(href: string) {
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);

    if (element) {
      const headerOffset = 64;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      closeMenu();
    }
  }

  function closeMenu() {
    isMenuOpen = false;
  }

  function handleKeyDown(e: KeyboardEvent, href?: string) {
    if (e.key === "Escape") {
      closeMenu();
      return;
    }

    if (href && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      handleNavClick(href);
    }
  }
</script>

<header
  class="fixed top-0 left-0 right-0 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 z-50 transition-colors duration-150">
  <div class="max-w-5xl mx-auto px-6">
    <nav class="flex items-center justify-between h-16" aria-label="Main navigation">
      <div class="flex items-center gap-4">
        <ThemeControls />
        <LanguageSelector contrast={$theme.contrast} />
      </div>

      <!-- Desktop Navigation -->
      <div
        class="hidden md:flex items-center gap-8"
        role="menubar"
        aria-label="Desktop navigation menu">
        {#each NAVIGATION_ITEMS as item}
          <a
            href={item.href}
            bind:this={navItems[item.href]}
            on:click|preventDefault={() => handleNavClick(item.href)}
            on:keydown={e => handleKeyDown(e, item.href)}
            role="menuitem"
            tabindex="0"
            class="group text-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-lg p-2 {$theme.contrast ===
            'high'
              ? 'text-slate-900 dark:text-white font-medium'
              : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'}">
            <span>{navTranslations[item.labelKey]}</span>
            <span class="sr-only">Section {item.number}</span>
          </a>
        {/each}
        <a
          href="/levizepeda cv.pdf"
          download
          class="flex items-center gap-2 px-3 py-1.5 text-sm font-medium border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary {$theme.contrast ===
          'high'
            ? 'border-slate-400 dark:border-slate-500 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700'
            : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}"
          role="button"
          aria-label={`${navTranslations.resume} (opens in new tab)`}
          tabindex="0">
          <FileDown class="w-5 h-5" aria-hidden="true" />
          <span>{navTranslations.resume}</span>
        </a>
      </div>

      <!-- Mobile Menu Button -->
      <button
        class="md:hidden p-2 transition-colors mobile-menu text-slate-900 dark:text-white"
        aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isMenuOpen}
        aria-controls="mobile-menu"
        on:click|stopPropagation={() => (isMenuOpen = !isMenuOpen)}>
        <span class="sr-only">{isMenuOpen ? "Close Menu" : "Open Menu"}</span>
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true">
          {#if isMenuOpen}
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12" />
          {:else}
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16" />
          {/if}
        </svg>
      </button>

      <!-- Mobile Menu -->
      {#if isMenuOpen}
        <div
          id="mobile-menu"
          in:fade={{ duration: 150 }}
          out:slide={{ duration: 150 }}
          class="md:hidden fixed inset-0 top-16 bg-white dark:bg-slate-900 z-40"
          role="dialog"
          aria-label="Mobile navigation menu"
          aria-modal="true"
          use:clickOutside={closeMenu}>
          <div class="flex flex-col items-center pt-8 gap-8 menu-enter">
            {#each NAVIGATION_ITEMS as item}
              <a
                href={item.href}
                bind:this={navItems[item.href]}
                on:click|preventDefault={() => handleNavClick(item.href)}
                on:keydown={e => handleKeyDown(e, item.href)}
                class="group text-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-lg p-2
                {$theme.contrast === 'high'
                  ? 'text-slate-900 dark:text-white font-medium'
                  : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'}"
                role="menuitem"
                tabindex="0">
                <span>{navTranslations[item.labelKey]}</span>
                <span class="sr-only">Section {item.number}</span>
              </a>
            {/each}
          </div>
        </div>
      {/if}
    </nav>
  </div>
</header>

<style>
  .menu-enter {
    animation: menuEnter 0.2s ease-out;
  }

  @keyframes menuEnter {
    from {
      opacity: 0;
      transform: translateY(-1rem);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
