<script>
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
</script>

<article class="my-4 text-quaternary relative text-xl">
 <h2 class="text-primary font-medium">
  <a
   href={item.domain ? item.url : `/item/${item.id}`}
   rel="noopener noreferrer"
   target="_blank"
  >
   {item.title}
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
    href="/item/{item.id}"
    class="hover:text-primary underline underline-offset-[3px] hover:no-underline hover:bg-[url('https://snippets.alexandru.so/squiggle.svg')] transition"
   >
    {item.comments_count}
    {item.comments_count === 1 ? "comment" : "comments"}
   </a>
   •
   <a
    href={item.domain ? item.url : `/item/${item.id}`}
    class="hover:text-brand transition"
   >
    {item.domain}
   </a>
  </p>
 {/if}
</article>
