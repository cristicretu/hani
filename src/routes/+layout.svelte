<script>
 import { page, navigating } from "$app/stores";
 import Nav from "$lib/Nav.svelte";
 import PreloadingIndicator from "$lib/PreloadingIndicator.svelte";
 import "../app.css";
 import Settings from "../lib/Settings.svelte";
 import { onMount } from "svelte";
 import { linkFade, newTab, font } from "../lib/utils";
 import { Base } from "deta";

 $: section = $page.url.pathname.split("/")[1];

 onMount(() => {
  async function getSetting() {
   const db = Base("settings");

   const isLinkFade = await db.get("linkFade");
   const isNewTab = await db.get("newTab");
   const isFont = await db.get("font");

   if (!isLinkFade) {
    db.put({ field: $linkFade }, "linkFade");
   }

   if (!isNewTab) {
    db.put({ field: $newTab }, "newTab");
   }

   if (!isFont) {
    db.put({ field: $font }, "font");
   }

   $linkFade = isLinkFade.field;
   $newTab = isNewTab.field;
   $font = isFont.field;
  }

  getSetting();
 });
</script>

<Settings />

{#if $navigating}
 <PreloadingIndicator />
{/if}

<main
 class="relative max-w-5xl p-4 mx-auto"
 class:font-mono={$font === "mono"}
 class:font-sans={$font === "sans"}
>
 <slot />
</main>
