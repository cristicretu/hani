<script>
 /**
  * @type {{
  * deleted?: boolean;
  * user: string;
  * time_ago: number;
  * content: string;
  * comments: any[];
  * }}
  */
 export let comment;
</script>

{#if !comment.deleted}
 <article class="comment border-t border-bg3 text-base">
  <details open>
   <summary>
    <div class="meta-bar py-4 cursor-pointer" role="button" tabindex="0">
     <span class="meta">
      <a
       href="/user/{comment.user}"
       rel="noopener noreferrer"
       target="_blank"
       class="!text-primary/80 hover:!text-primary transition">{comment.user}</a
      >

      {comment.time_ago}
     </span>
    </div>
   </summary>

   <div class="body pb-4 whitespace-pre-wrap text-secondary/60">
    {@html comment.content
     .split("<p>")
     .map((p) => `<div class="paragraph">${p}</div>`)
     .join("\n")}
   </div>

   {#if comment.comments.length > 0}
    <ul class="children">
     {#each comment.comments as child}
      <li><svelte:self comment={child} /></li>
     {/each}
    </ul>
   {/if}
  </details>
 </article>
{/if}

<style>
 .meta-bar {
  background: 100% 50% no-repeat url(./unfold.svg);
  background-size: 1em 1em;
 }

 .comment details[open] > summary > .meta-bar {
  background-image: url(./fold.svg);
 }

 .comment details > summary {
  list-style-type: none;
 }

 .comment details > summary::marker,
 .comment details > summary::-webkit-details-marker {
  display: none;
 }

 .comment .children {
  padding: 0 0 0 1em;
  margin: 0;
 }

 @media (min-width: 720px) {
  .comment .children {
   padding: 0 0 0 2em;
  }
 }

 li {
  list-style: none;
 }

 .meta {
  display: block;
  color: var(--fg-light);
 }

 a {
  color: var(--fg-light);
 }

 /* prevent crazy overflow layout bug on mobile */
 .body :global(*) {
  overflow-wrap: break-word;
 }

 .comment :global(pre) {
  overflow-x: auto;
 }
</style>
