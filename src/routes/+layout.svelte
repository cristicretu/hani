<script>
 import { page, navigating } from "$app/stores";
 import Nav from "$lib/Nav.svelte";
 import PreloadingIndicator from "$lib/PreloadingIndicator.svelte";
 import "../app.css";

 $: section = $page.url.pathname.split("/")[1];
</script>

{#if $navigating}
 <PreloadingIndicator />
{/if}

<main class="relative max-w-3xl p-4 sm:p-8 md:p-16 mx-auto">
 <slot />
</main>
