<script lang="ts">
  import { Github } from "lucide-svelte";
  import { language } from "../../lib/stores/language";
  import { theme } from "../../lib/stores/theme";
  import { getFooterTranslations } from "./footer-translations";

  $: t = getFooterTranslations($language);
  $: isHighContrast = $theme?.contrast === "high";
</script>

<footer
  class="{theme.getBackgroundClasses('primary')($theme)} border-t {theme.getBorderClasses(
    'default',
  )($theme)}">
  <div class="max-w-7xl mx-auto px-4 py-6">
    <div class="flex justify-center items-center">
      <p
        class="{theme.getTextClasses(
          'base',
          'body',
        )($theme)} text-sm flex items-center divide-x {theme.getBorderClasses('default')($theme)}">
        <span class="pr-2">
          Levi Zepeda. {t.builtWith}{" "}
          <a
            href="https://svelte.dev"
            target="_blank"
            rel="noopener noreferrer"
            class="text-primary hover:text-primary-dark dark:text-primary-dark dark:hover:text-primary transition-colors {isHighContrast
              ? 'font-medium'
              : ''}">
            Svelte
          </a>
          {" "}{t.andText}{" "}
          <a
            href="https://astro.build"
            target="_blank"
            rel="noopener noreferrer"
            class="text-primary hover:text-primary-dark dark:text-primary-dark dark:hover:text-primary transition-colors {isHighContrast
              ? 'font-medium'
              : ''}">
            Astro
          </a>
        </span>
        <a
          href="https://github.com/lbzepeda/lzepeda.dev"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 pl-2 hover:text-primary dark:hover:text-primary-dark transition-colors">
          <Github
            size={15}
            strokeWidth={2}
            class={isHighContrast ? "text-primary-dark dark:text-primary" : ""} />
          <span>{t.viewSource}</span>
        </a>
      </p>
    </div>
  </div>
</footer>
