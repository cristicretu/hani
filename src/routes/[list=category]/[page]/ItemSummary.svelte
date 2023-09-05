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

   try {
    const bookmarkedItem = await db.get(item.id.toString());
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

<article class="my-4 text-quaternary relative text-xl group">
 <h2 class="max-w-[300px] sm:max-w-lg md:max-w-[600px]">
  <a
   href={item.domain ? item.url : `/item/${item.id}`}
   {...props}
   class={`text-primary font-medium hover:text-brand transition ${
    $linkFade && "visited:text-tertiary"
   }`}
  >
   {item.title}
  </a>
  •
  <a
   href="/item/{item.id}"
   class="hover:text-primary underline underline-offset-[3px] text-base whitespace-nowrap hover:no-underline hover:bg-[url('https://snippets.alexandru.so/squiggle.svg')] transition"
  >
   Discuss ({item.comments_count})
  </a>
 </h2>

 <button on:click={() => bookmark()}>
  <svg
   xmlns="http://www.w3.org/2000/svg"
   fill="none"
   viewBox="0 0 24 24"
   stroke-width="1.5"
   stroke="currentColor"
   class:text-brand={isBookmarked}
   class="w-6 h-6 absolute top-0 right-0 transform duration-200 md:hidden md:group-hover:block transition"
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
  <p class="text-base font-light">
   {#if item.domain}
    <a
     href={item.domain ? item.url : `/item/${item.id}`}
     class="hover:text-brand transition"
     {...props}
    >
     {item.domain}
    </a>
    •
   {/if}
   <span>{item.points} points</span>
   •
   <a href="/user/{item.user}" class="hover:text-primary">{item.user}</a>
   •
   <span>{item.time_ago}</span>
  </p>
 {/if}
</article>
