<script lang="ts">
  import { theme } from "../../lib/stores/theme";

  export let role: string;
  export let period: string;
</script>

<header class="flex flex-col md:flex-row md:items-center justify-between mb-4">
  <h3 class={theme.getTextClasses("h3", "heading")($theme)}>
    {role}
  </h3>
  <div class="flex items-center gap-2 text-sm text-emerald-700 dark:text-emerald-300 font-medium">
    <span>•</span>
    <span>{period}</span>
  </div>
</header>
