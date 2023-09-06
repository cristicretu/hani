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

<article class="my-4 text-quaternary relative text-xl group px-4 py-4 -mx-4">
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
  <p class="text-md font-light">
   {item.time_ago}
  </p>
 {:else}
  <p class="text-base font-light flex items-center space-x-2 mt-1.5">
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
     class="w-6 h-6"
    >
     <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
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
