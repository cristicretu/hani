<script>
 import { browser } from "$app/environment";
 import { Base } from "deta";
 import { onMount } from "svelte";
 import ItemList from "../../../lib/ItemList.svelte";

 /** @type {import('./$types').PageData} */
 export let data;

 let activePanel = "posts";
 let bookmarks = [];

 async function getBookmarks() {
  const db = Base("bookmarks");

  const bookmarkedItems = await db.fetch();
  bookmarks = bookmarkedItems.items;
 }

 let dropdownVisible = false;

 function toggleDropdown() {
  dropdownVisible = !dropdownVisible;
 }

 function handleClickOutside(event) {
  if (!event.target.closest(".dropdown-container")) {
   dropdownVisible = false;
  }
 }

 onMount(() => {
  getBookmarks();
  document.addEventListener("click", handleClickOutside);
 });
</script>

<svelte:head>
 <title>Hanī | HN</title>
 <meta
  name="description"
  content="Latest Hacker News stories in the {data.list} category"
 />
</svelte:head>

<div class="min-h-screen flex flex-col max-w-3xl md:px-0">
 <header class="py-8">
  <h1 class="text-xl sm:text-3xl font-bold text-left text-brand">
   Hanī - Hacker News Reader
  </h1>
  <div class="mt-4 -ml-3 flex items-center space-x-4 text-tertiary text-sm">
   <a
    class="flex space-x-2 hover:text-primary px-3 items-center py-2 hover:bg-bg3 transition rounded-md w-fit cursor-pointer"
    href="/top/1"
    class:bg-bg2={activePanel === "posts"}
    on:click={() => {
     activePanel = "posts";
    }}
   >
    <svg
     xmlns="http://www.w3.org/2000/svg"
     fill="none"
     viewBox="0 0 24 24"
     stroke-width="1.5"
     stroke="currentColor"
     class="w-5 h-5"
    >
     <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122"
     />
    </svg>
    <span>Posts</span>
    {#if dropdownVisible}
     <div
      class="absolute top-36 left-0 mt-2 flex flex-col bg-bg2 border border-bg3 rounded-md z-10 w-20 text-primary dropdown-container"
     >
      <a
       href="/new/1"
       class="px-4 py-2 hover:bg-bg3/50 block"
       on:click={() => (dropdownVisible = false)}>New</a
      >
      <a
       href="/show/1"
       class="px-4 py-2 hover:bg-bg3/50 block"
       on:click={() => (dropdownVisible = false)}>Show</a
      >
      <a
       href="/ask/1"
       class="px-4 py-2 hover:bg-bg3/50 block"
       on:click={() => (dropdownVisible = false)}>Ask</a
      >
      <a
       href="/jobs/1"
       class="px-4 py-2 hover:bg-bg3/50 block"
       on:click={() => (dropdownVisible = false)}>Jobs</a
      >
     </div>
    {/if}
   </a>
   <!-- svelte-ignore a11y-no-static-element-interactions -->
   <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class="w-5 h-5 cursor-pointer dropdown-container"
    on:click={toggleDropdown}
    on:keydown={(e) => {
     if (e.key === "Enter") {
      toggleDropdown();
     }
    }}
   >
    {#if dropdownVisible}
     <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M4.5 15.75l7.5-7.5 7.5 7.5"
     />
    {:else}
     <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
     />
    {/if}
   </svg>

   <button
    class="flex space-x-2 items-center hover:text-primary px-3 py-2 hover:bg-bg3 transition rounded-md w-fit cursor-pointer select-none"
    class:bg-bg2={activePanel === "bookmarks"}
    on:click={() => {
     activePanel = "bookmarks";
     getBookmarks();
    }}
   >
    <svg
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
      d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9"
     />
    </svg>

    <span>Bookmarks</span>
   </button>
  </div>
 </header>
 {#if activePanel === "posts"}
  <slot />
 {:else}
  <ItemList items={bookmarks} />
 {/if}
</div>
