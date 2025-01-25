<script lang="ts">
    import { fade } from "svelte/transition";
    import { language } from "../../lib/stores/language";
    import { translations } from "../../lib/stores/translations";
    import { clickOutside } from "./clickOutside";
  
    export let contrast: 'normal' | 'high' = 'normal';
    let isOpen = false;
    let menuRef: HTMLDivElement;
    let buttonRef: HTMLButtonElement;
  
    const flags = {
      en: "🇺🇸",
      es: "🇪🇸",
    };
  
    $: containerClasses = contrast === 'high' 
      ? 'border-slate-400 dark:border-slate-500 text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700'
      : 'border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800';
  
    function handleLanguageSelect(lang: keyof typeof translations) {
      language.setLanguage(lang);
      isOpen = false;
      buttonRef.focus();
    }
  
    function handleClickOutside(event: MouseEvent) {
      if (!menuRef.contains(event.target as Node)) {
        isOpen = false;
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            isOpen = false;
            buttonRef.focus();
        } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            const buttons = menuRef.querySelectorAll('button');
            const currentIndex = Array.from(buttons).indexOf(document.activeElement as HTMLButtonElement);
            const nextIndex = event.key === 'ArrowDown' ? 
            (currentIndex + 1) % buttons.length : 
            (currentIndex - 1 + buttons.length) % buttons.length;
            (buttons[nextIndex] as HTMLButtonElement).focus();
        }
    }
</script>
  
<div class="relative inline-block" bind:this={menuRef}>
    <button
      bind:this={buttonRef}
      on:click|stopPropagation={() => isOpen = !isOpen}
      class="p-2 rounded-lg border transition-colors {containerClasses}"
      aria-label="Select language"
      aria-expanded={isOpen}
      aria-haspopup="true"
      aria-controls="language-menu"
    >
      <div class="flex items-center gap-2">
        <span class="text-sm font-mono">{flags[$language]} {$language.toUpperCase()}</span>
      </div>
    </button>
  
    {#if isOpen}
      <div
        id="language-menu"
        use:clickOutside={() => isOpen = false}
        transition:fade={{ duration: 100 }}
        class="absolute right-0 mt-2 py-1 w-32 bg-white dark:bg-slate-800 rounded-lg shadow-lg border z-50 {containerClasses}"
        tabindex="-1"
        on:keydown={handleKeyDown}
        role="menu"
      >
        {#each Object.keys(translations) as code}
          <button
            class="w-full px-3 py-2 text-left flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors {$language === code ? 'bg-slate-50 dark:bg-slate-700' : ''}"
            on:click={() => handleLanguageSelect(code as keyof typeof translations)}
          >
            <span>{flags[code as keyof typeof flags]} {code.toUpperCase()}</span>
          </button>
        {/each}
      </div>
    {/if}
  </div>