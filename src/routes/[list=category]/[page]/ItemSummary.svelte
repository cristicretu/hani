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

 /** @type {number} */
 export let index;
</script>

<article class="my-4 text-quaternary">
 <h2 class="text-primary text-md font-medium">
  <a
   href={item.domain ? item.url : `/item/${item.id}`}
   rel="noopener noreferrer"
   target="_blank"
  >
   {item.title}
   {#if item.domain}<small class="text-brand/70 hover:text-brand/100 font-light"
     >({item.domain})</small
    >{/if}
  </a>
 </h2>

 {#if item.type === "job"}
  <p class="text-sm font-light">
   {item.time_ago}
  </p>
 {:else}
  <p class="text-sm font-light">
   <span>{item.points} points</span>
   |
   <a href="/user/{item.user}" class="hover:text-primary">{item.user}</a>
   |
   <span>{item.time_ago}</span>
   |
   <a href="/item/{item.id}" class="hover:text-primary">
    {item.comments_count}
    {item.comments_count === 1 ? "comment" : "comments"}
   </a>
  </p>
 {/if}

 <span class="index font-light">{index}.</span>
</article>

<style>
 article {
  position: relative;
  padding: 0 0 0 4em;
 }

 .index {
  position: absolute;
  left: 2em;
  top: 0;
  text-align: right;
  width: 0.75em;
 }
</style>
