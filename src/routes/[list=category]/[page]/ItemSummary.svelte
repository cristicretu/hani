<script lang="ts">
 import { onMount } from "svelte";
 import { linkFade, newTab } from "../../../lib/utils";
 import { Base } from "deta";
 /**
  * @type {{
  *   domain?: string;
  *   id: string;
  *   url: string;
  *   title: string;
  *   type: string;
  *   time_ago: string;
  *   points: number;
  *   user: string;
  *   comments_count: number;
  * }}
  */
 export let item;

 let isBookmarked = false;

 const db = Base("bookmarks");

 $: props = $newTab
  ? {
     target: "_blank",
     rel: "noopener noreferrer",
    }
  : {};

 const bookmark = async () => {
  const bookmarkedItem = await db.get(item.id.toString());
  if (!bookmarkedItem) {
   await db.put(item, item.id.toString());
   isBookmarked = true;
   return;
  }
  if (bookmarkedItem.id === item.id) {
   await db.delete(item.id.toString());
   isBookmarked = false;
  }
 };

 onMount(() => {
  async function getBookmarks() {
   let newItem;
   let bookmarkedItem;

   try {
    bookmarkedItem = await db.get(item.id.toString());
    // find the item with the same id as the current item

    if (!bookmarkedItem) {
     // if the item is not bookmarked, create a new item with the same id as the current item
     return;
    }

    if (bookmarkedItem.id === item.id) {
     isBookmarked = true;
    }
   } catch (error) {
    console.log(error);
   }
  }

  getBookmarks();
 });
</script>

<article class=" text-quaternary relative text-xl group px-5 py-3 -mx-5">
 <h2 class="max-w-[300px] sm:max-w-lg md:max-w-2xl">
  <a
   href={item.domain ? item.url : `/item/${item.id}`}
   {...props}
   class={`text-primary font-medium hover:text-brand transition ${
    $linkFade && "visited:text-tertiary"
   }`}
  >
   {item.title}
  </a>
 </h2>

 <button on:click={() => bookmark()} class="absolute top-4 right-4">
  <svg
   xmlns="http://www.w3.org/2000/svg"
   viewBox="0 0 24 24"
   stroke-width="1.5"
   stroke="currentColor"
   class:text-brand={isBookmarked}
   class:fill-brand={isBookmarked}
   class="w-6 h-6 transform duration-200 fill-transparent md:hidden md:group-hover:block transition"
  >
   <path
    stroke-linecap="round"
    stroke-linejoin="round"
    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
   />
  </svg>
 </button>

 {#if item.type === "job"}
  <p class="text-base font-light">
   {item.time_ago}
  </p>
 {:else}
  <p class="text-base font-light flex flex-wrap items-center space-x-2 mt-1.5">
   <a
    class="flex space-x-2 hover:text-primary px-2 -mx-2 items-center py-1.5 hover:bg-bg3 transition rounded-md w-fit cursor-pointer"
    href="/item/{item.id}"
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
      d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
     />
    </svg>

    <span> Discuss ({item.comments_count}) </span>
   </a>
   <span>•</span>
   {#if item.domain}
    <a
     href={item.domain ? item.url : `/item/${item.id}`}
     class="hover:text-brand transition"
     {...props}
    >
     {item.domain}
    </a>
    <span>•</span>
   {/if}
   <span>{item.points} points</span>
   <span>•</span>

   <a href="/user/{item.user}" class="hover:text-primary">{item.user}</a>
   <span>•</span>

   <span>{item.time_ago}</span>
  </p>
 {/if}
</article>
