<script lang="ts">
 import ItemSummary from "./ItemSummary.svelte";
 import { onMount } from "svelte";

 /** @type {import('./$types').PageData} */
 export let data;

 const PAGE_SIZE = 30;

 $: start = 1 + (data.page - 1) * PAGE_SIZE;
 $: next = `/${data.list}/${data.page + 1}`;

 let isIframeVisible = false;
 let iframeSrc = "";

 let pressTimer;
 let pressedItemId = null;

 function showIframe(item) {
  iframeSrc = item.url;
  isIframeVisible = true;
  pressedItemId = null;
 }

 function hideIframe() {
  isIframeVisible = false;
  pressedItemId = null;
 }

 function handleLongPress(item, i) {
  if (!pressedItemId) {
   iframeSrc = item.url;
   pressedItemId = i;
  }

  pressTimer = setTimeout(() => {
   showIframe(item);
  }, 650);
 }

 function handlePressRelease() {
  clearTimeout(pressTimer);
  pressedItemId = null;
 }

 onMount(() => {
  const handleEsc = (event) => {
   if (event.key === "Escape") {
    hideIframe();
   }
  };
  document.addEventListener("keyup", handleEsc);

  return () => {
   // Cleanup listener on component destroy
   document.removeEventListener("keyup", handleEsc);
  };
 });
</script>

<svelte:head>
 <title>Hanī | HN</title>
 <meta
  name="description"
  content="Latest Hacker News stories in the {data.list} category"
 />
</svelte:head>

{#each data.items as item, i}
 {#if item}
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
   on:mousedown={() => handleLongPress(item, i)}
   on:mouseup={() => handlePressRelease()}
   class="relative"
  >
   <div
    class="slide-bg rounded-xl bg-bg3"
    class:animating={pressedItemId === i}
   />
   <ItemSummary {item} />
  </div>
 {/if}
{/each}

{#if iframeSrc}
 <div
  class="fixed inset-0 bg-black bg-opacity-50 z-50 {isIframeVisible
   ? 'block'
   : 'hidden'}"
 >
  <div
   class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
  >
   <iframe
    src={iframeSrc}
    title={iframeSrc}
    frameborder="0"
    class="w-[95vw] sm:w-[90vw] md:w-[70vw] h-[80vh] rounded-xl bg-bg shadow-md px-2 py-2"
   />
   <button
    class="mt-4 p-2 rounded-full bg-bg3/50 text-primary hover:bg-bg2 transition"
    on:click={hideIframe}
    ><svg
     xmlns="http://www.w3.org/2000/svg"
     fill="none"
     viewBox="0 0 24 24"
     stroke-width="1.5"
     stroke="currentColor"
     class="w-6 h-6"
    >
     <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
     />
    </svg>
   </button>
  </div>
 </div>
{/if}

{#if next}
 <a
  class="text-tertiary -mx-4 mt-4 w-fit px-4 py-4 hover:bg-bg2 transition rounded-md"
  href={next}>More...</a
 >
{/if}

<style>
 .slide-bg {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 0;
  transition: width 0.65s;
  z-index: -1; /* Ensure it's behind content */
 }

 .animating {
  width: 100%;
  padding: 16px;
 }
</style>
