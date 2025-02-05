<script lang="ts">
  import { GitBranchPlus, GitCommit, GitMerge } from "lucide-svelte";

  export let mergeFrom: boolean;
  export let branch: string;
</script>

<div class="shrink-0 pt-1">
  {#if mergeFrom}
    <GitMerge size={32} class="text-orange-700 dark:text-orange-300" />
  {:else if branch.includes("feature/")}
    <GitBranchPlus size={32} class="text-violet-700 dark:text-violet-300" />
  {:else}
    <GitCommit size={32} class="text-emerald-700 dark:text-emerald-300" />
  {/if}
</div>
