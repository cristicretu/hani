<script>
 import Comment from "./Comment.svelte";
 import { newTab } from "../../../lib/utils";

 /** @type {import('./$types').PageData} */
 export let data;

 $: props = $newTab
  ? {
     target: "_blank",
     rel: "noopener noreferrer",
    }
  : {};
</script>

<svelte:head>
 <title>{data.title} | Hanī | HN</title>
</svelte:head>

<div class="text-secondary max-w-4xl">
 <a
  href="/"
  class="group text-tertiary w-fit hover:text-primary cursor-pointer transition ease-in-out duration-200"
 >
  <span
   aria-hidden="true"
   class="inline-block translate-x-0 group-hover:-translate-x-1 transition-transform ease-in-out duration-200"
  >
   ⇤
  </span>
  Index
 </a>
 <article class="mb-12 mt-4">
  <a class="text-primary" href={data.url} {...props}>
   <h1 class="font-medium text-xl hover:text-brand transition">{data.title}</h1>
  </a>

  <p class="text-sm">
   <span>{data.points} points</span>
   •
   <a href="/user/{data.user}" class="hover:text-primary transition"
    >{data.user}</a
   >
   •
   <span>{data.time_ago}</span>
   {#if data.domain}
    •
    <a
     href={data.url}
     rel="noopener noreferrer"
     target="_blank"
     class="hover:text-brand transition">{data.domain}</a
    >{/if}
   •
   <a
    href={`https://news.ycombinator.com/item?id=${data.id}`}
    class="hover:text-primary transition"
    {...props}>Read on HN</a
   >
  </p>

  {#if data.content}
   <div class="body pb-4 whitespace-pre-wrap text-secondary/60">
    {@html data.content
     .split("<p>")
     .map((p) => `<div class="paragraph">${p}</div>`)
     .join("\n")}
   </div>
  {/if}
 </article>

 <p class="text-lg text-primary pb-4">
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
