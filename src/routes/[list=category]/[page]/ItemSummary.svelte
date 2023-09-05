<script>
 import { linkFade, newTab } from "../../../lib/utils";
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

 $: props = $newTab
  ? {
     target: "_blank",
     rel: "noopener noreferrer",
    }
  : {};
</script>

<article class="my-4 text-quaternary relative text-xl">
 <h2>
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

 {#if item.type === "job"}
  <p class="text-md font-light">
   {item.time_ago}
  </p>
 {:else}
  <p class="text-base font-light">
   <span>{item.points} points</span>
   •
   <a href="/user/{item.user}" class="hover:text-primary">{item.user}</a>
   •
   <span>{item.time_ago}</span>
   •
   <a
    href={item.domain ? item.url : `/item/${item.id}`}
    class="hover:text-brand transition"
    {...props}
   >
    {item.domain}
   </a>
  </p>
 {/if}
</article>
