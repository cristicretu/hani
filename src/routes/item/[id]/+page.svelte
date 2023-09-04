<script>
 import Comment from "./Comment.svelte";

 /** @type {import('./$types').PageData} */
 export let data;
</script>

<svelte:head>
 <title>{data.title} | Hanī | HN</title>
</svelte:head>

<div class="text-secondary">
 <article class="mb-12">
  <a class="text-primary" href={data.url}>
   <h1 class="font-medium text-xl">{data.title}</h1>
   {#if data.domain}<small class="text-brand">({data.domain})</small>{/if}
  </a>

  <p class="text-sm">
   <span>{data.points} points</span>
   |
   <a href="/user/{data.user}" class="hover:text-primary transition"
    >{data.user}</a
   >
   |
   <span>{data.time_ago}</span>
  </p>

  {#if data.content}
   {@html data.content}
  {/if}
 </article>

 <p class="text-lg text-primary">
  {data.comments.length}{" "}{data.comments.length === 1
   ? "comment"
   : "comments"}
 </p>

 <div class="comments">
  {#each data.comments as comment}
   <Comment {comment} />
  {/each}
 </div>
</div>
