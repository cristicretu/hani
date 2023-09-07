<script lang="ts">
 import ItemSummary from "../routes/[list=category]/[page]/ItemSummary.svelte";
 import { onMount } from "svelte";

 export let items;

 let isIframeVisible = false;
 let iframeSrc = "";

 let pressTimer;
 let pressedItemId = null;

 function showIframe(item) {
  iframeSrc = item.url;
  isIframeVisible = true;
  pressedItemId = null;
  document.body.style.overflow = "hidden";
 }

 function hideIframe() {
  isIframeVisible = false;
  pressedItemId = null;
  document.body.style.overflow = "auto";
 }

 function handleMouseDown(event, item, i) {
  if (event.target.tagName === "BUTTON" || event.target.tagName === "A") {
   return;
  }

  document.body.classList.add("noselect");

  pressTimer = setTimeout(() => {
   handleLongPress(item, i);
  }, 300);
 }

 function handleLongPress(item, i) {
  if (!pressedItemId) {
   iframeSrc = item.url;
   pressedItemId = i;
  }

  pressTimer = setTimeout(() => {
   showIframe(item);
  }, 350);
 }

 function handlePressRelease() {
  clearTimeout(pressTimer);
  pressedItemId = null;

  document.body.classList.remove("noselect");
 }

 onMount(() => {
  const handleEsc = (event) => {
   if (event.key === "Escape") {
    hideIframe();
   }
  };
  document.addEventListener("keyup", handleEsc);

  return () => {
   document.removeEventListener("keyup", handleEsc);
  };
 });
</script>

{#each items as item, i}
 {#if item}
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
   on:mousedown={(event) => handleMouseDown(event, item, i)}
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
 <!-- svelte-ignore a11y-click-events-have-key-events -->
 <!-- svelte-ignore a11y-no-static-element-interactions -->
 <div
  class="fixed inset-0 bg-black bg-opacity-50 z-50 {isIframeVisible
   ? 'block'
   : 'hidden'}"
  on:click={hideIframe}
 >
  <div
   class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
   on:click={(e) => e.stopPropagation()}
  >
   <iframe
    src={iframeSrc}
    title={iframeSrc}
    frameborder="0"
    class="w-[95vw] sm:w-[90vw] md:w-[70vw] h-[80vh] rounded-xl bg-bg shadow-md px-2 py-2"
   />
   <div class="flex space-x-4">
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
    <a
     class="mt-4 p-2 rounded-full bg-bg3/50 text-primary hover:bg-bg2 transition items-center flex"
     on:click={hideIframe}
     href={iframeSrc}
     target="_blank"
     rel="noopener noreferrer"
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
       d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
      />
     </svg>
    </a>
   </div>
  </div>
 </div>
{/if}

<style>
 .slide-bg {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 0;
  transition: width 0.35s;
  z-index: -1;
 }

 .animating {
  width: 100%;
  padding: 16px;
 }
</style>
