<script lang="ts">
  import { GitBranchPlus, GitCommit, GitMerge } from "lucide-svelte";

  export let mergeFrom: boolean;
  export let branch: string;
</script>

<div class="shrink-0 pt-1">
  {#if mergeFrom}
    <GitMerge class="w-6 h-6 md:w-8 md:h-8 text-orange-700 dark:text-orange-300" />
  {:else if branch.includes("feature/")}
    <GitBranchPlus class="w-6 h-6 md:w-8 md:h-8 text-violet-700 dark:text-violet-300" />
  {:else}
    <GitCommit class="w-6 h-6 md:w-8 md:h-8 text-emerald-700 dark:text-emerald-300" />
  {/if}
</div>
