<script lang="ts">
  import { FileDown, Linkedin, Mail } from "lucide-svelte";
  import { language } from "../../lib/stores/language";
  import { theme } from "../../lib/stores/theme";
  import { getContactTranslations } from "./contact-translations";

  const email = "levi.zepeda06@gmail.com";
  const linkedIn = "https://www.linkedin.com/in/levi-zepeda-96090494/";

  $: t = getContactTranslations($language);
  $: isHighContrast = $theme?.contrast === "high";
</script>

<section
  data-testid="contact-section"
  id="contact"
  class="{theme.getBackgroundClasses('primary')($theme)} py-24 relative overflow-hidden"
  aria-label="Contact Section">
  <div class="relative z-10 container mx-auto px-4">
    <div class="max-w-3xl mx-auto text-center">
      <h2
        class="{theme.getTextClasses('h2', 'heading')($theme)} text-4xl {isHighContrast
          ? 'font-bold'
          : 'font-semibold'} mb-4">
        {t.title}
      </h2>

      <div class="w-24 h-1 bg-primary dark:bg-primary-dark mx-auto mb-8 rounded-full"></div>

      <p class="{theme.getTextClasses('large', 'body')($theme)} text-xl mb-12 leading-relaxed">
        {t.subtitle}
      </p>

      <div class="flex flex-col items-center space-y-8">
        <div class="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <a
            href={`mailto:${email}`}
            class="group relative flex items-center gap-3 px-8 py-4 text-lg font-medium text-white bg-primary hover:bg-primary-dark rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-primary/25"
            aria-label="Send me an email">
            <Mail class="w-5 h-5" aria-hidden="true" />
            <span>{t.emailButton}</span>
          </a>

          <a
            href="/levizepeda cv.pdf"
            download
            class="group relative flex items-center gap-3 px-8 py-4 text-lg font-medium text-primary dark:text-primary-dark border-4 border-primary dark:border-primary-dark rounded-xl hover:text-white dark:hover:text-white hover:bg-primary dark:hover:bg-primary-dark transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-primary/25"
            aria-label="Download resume">
            <FileDown class="w-5 h-5" aria-hidden="true" />
            <span>{t.downloadButton}</span>
          </a>
        </div>

        <div class="flex flex-col items-center space-y-4">
          <p class="{theme.getTextClasses('base', 'body')($theme)} text-center">
            {t.socialMedia}
          </p>

          <div class="flex gap-6 justify-center">
            <a
              href={linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              class="group flex flex-col items-center gap-2 p-3 text-primary hover:text-primary-dark dark:text-primary-dark dark:hover:text-primary transition-all duration-300 hover:scale-110"
              aria-label="Visit my LinkedIn profile">
              <Linkedin class="w-7 h-7" aria-hidden="true" />
              <span
                class="text-sm font-medium opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                LinkedIn
              </span>
            </a>
          </div>
        </div>

        <div class="pt-8 text-center">
          <p class="{theme.getTextClasses('base', 'body')($theme)} text-lg">
            {t.emailText}{" "}
            <a
              href={`mailto:${email}`}
              class="text-primary dark:text-primary-dark hover:underline {isHighContrast
                ? 'font-semibold'
                : 'font-medium'}">
              {email}
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
