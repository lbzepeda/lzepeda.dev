<script lang="ts">
  import AboutContent from "./AboutContent.svelte";
</script>

<section
  id="about"
  class="relative min-h-screen w-full flex items-center justify-center bg-gray-100 dark:bg-indigo-900 overflow-y-hidden">
  <div
    class="w-full max-w-[1100px] px-4 sm:px-6 lg:px-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    <AboutContent />
  </div>
</section>
