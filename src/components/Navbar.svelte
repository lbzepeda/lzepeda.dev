<!-- src/components/Navbar.svelte -->
<script lang="ts">
  import { FileDown } from "lucide-svelte";
  import { slide } from "svelte/transition";
  import { theme } from "../lib/stores/theme";
  import ThemeControls from "./ThemeControls.svelte";

  let isMenuOpen = false;
  const NAVIGATION_ITEMS = [
    { href: "#home", label: "Home", number: " 0." },
    { href: "#about", label: "About Me", number: " 1." },
    { href: "#career", label: "Career", number: " 2." },
    { href: "#project", label: "Projects", number: " 3." },
    { href: "#contact", label: "Contact", number: " 4." },
  ];

  function handleNavClick(href: string) {
    const element = globalThis.document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      isMenuOpen = false;
    }
  }
</script>

<header
  class="fixed top-0 left-0 right-0 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 z-50"
>
  <div class="max-w-5xl mx-auto px-6">
    <nav class="flex items-center justify-between h-16">
      <ThemeControls />

      <button
        class="md:hidden p-2 transition-colors {$theme.contrast === 'high'
          ? 'text-slate-900 dark:text-slate-100 hover:text-slate-700 dark:hover:text-slate-300'
          : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'}"
        aria-label="Toggle navigation menu"
        aria-expanded={isMenuOpen}
        on:click={() => (isMenuOpen = !isMenuOpen)}
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {#if isMenuOpen}
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          {:else}
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          {/if}
        </svg>
      </button>

      <div class="hidden md:flex items-center gap-8">
        {#each NAVIGATION_ITEMS as item}
          <a
            href={item.href}
            on:click|preventDefault={() => handleNavClick(item.href)}
            class="group relative text-sm transition-colors {$theme.contrast ===
            'high'
              ? 'text-slate-900 dark:text-white font-medium'
              : 'text-slate-700 dark:text-slate-300'}"
          >
            <span>{item.label}</span>
            <span
              class="transition-colors {$theme.contrast === 'high'
                ? 'text-slate-700 dark:text-slate-100 font-medium'
                : 'text-slate-600 dark:text-slate-400'}"
            >
              {item.number}
            </span>
            <span
              class="absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 {$theme.contrast ===
              'high'
                ? 'bg-slate-400 dark:bg-slate-400'
                : 'bg-slate-200 dark:bg-slate-700'}"
            ></span>
          </a>
        {/each}

        <a
          href="/levizepeda cv.pdf"
          download
          class="flex items-center gap-2 px-3 py-1.5 text-sm font-medium border rounded-lg transition-colors
          {$theme.contrast === 'high'
            ? 'text-slate-900 dark:text-slate-100 border-slate-400 dark:border-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700'
            : 'text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'}"
        >
          <FileDown class="w-5 h-5" />
          <span>Resume</span>
        </a>
      </div>
    </nav>

    <!-- Mobile Menu -->
    {#if isMenuOpen}
      <div
        transition:slide={{ duration: 300 }}
        class="md:hidden fixed inset-0 top-16 bg-white dark:bg-slate-900 z-40"
      >
        <div class="flex flex-col items-center pt-8 gap-8">
          {#each NAVIGATION_ITEMS as item}
            <a
              href={item.href}
              on:click|preventDefault={() => handleNavClick(item.href)}
              class="group text-lg transition-colors {$theme.contrast === 'high'
                ? 'text-slate-900 dark:text-white font-medium'
                : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'}"
            >
              <span>{item.label}</span>
              <span
                class="transition-colors {$theme.contrast === 'high'
                  ? 'text-slate-700 dark:text-slate-100 font-medium'
                  : 'text-slate-600 dark:text-slate-400'}"
              >
                {item.number}
              </span>
            </a>
          {/each}
          <a
            href="/levizepeda cv.pdf"
            download
            class="flex items-center gap-2 px-3 py-1.5 text-sm font-medium border rounded-lg transition-colors
            {$theme.contrast === 'high'
              ? 'text-slate-900 dark:text-slate-100 border-slate-400 dark:border-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700'
              : 'text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'}"
          >
            <FileDown class="w-5 h-5" />
            <span>Resume</span>
          </a>
        </div>
      </div>
    {/if}
  </div>
</header>
