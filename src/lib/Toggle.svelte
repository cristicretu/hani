<script>
 import { linkFade, newTab } from "./utils";
 import { Base } from "deta";
 const db = Base("settings");

 export let field = "linkFade";

 async function toggleLinkFade() {
  $linkFade = !$linkFade;

  db.put({ field: $linkFade }, "linkFade");
 }

 async function toggleNewTab() {
  $newTab = !$newTab;

  db.put({ field: $newTab }, "newTab");
 }

 $: checkedValue = field === "linkFade" ? $linkFade : $newTab;
</script>

<label
 class="flex items-center justify-between w-full cursor-pointer gap-4 text-sm"
>
 <span class="text-tertiary"
  >{#if field === "linkFade"}
   Fade links
  {:else}
   Open links in new tab
  {/if}
 </span>
 <div class="relative">
  <input
   type="checkbox"
   class="sr-only"
   bind:checked={checkedValue}
   on:click={() => {
    if (field === "linkFade") {
     toggleLinkFade();
    } else {
     toggleNewTab();
    }
   }}
  />
  <div
   class="block h-6 transition-colors duration-300 ease-in-out rounded-full w-10"
   class:bg-brand={checkedValue}
   class:bg-bg3={!checkedValue}
  />
  <div
   class="absolute w-4 h-4 transition-transform duration-300 ease-in-out bg-white rounded-full dot left-1 top-1"
   class:translate-x-6={checkedValue}
  />
 </div>
</label>

<style>
 .dot {
  transform: translateX(0);
 }
 .translate-x-6 {
  transform: translateX(16px);
 }
</style>
