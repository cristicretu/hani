<script>
 /** @type {import('./$types').PageData} */
 export let data;
</script>

<svelte:head>
 <title>{data.id} • Hanī | HN</title>
</svelte:head>

<h1 class="text-primary font-medium">{data.id}</h1>

<div class="text-tertiary flex flex-col space-y-4">
 <p class="text-sm font-light pt-1 pb-4 border-b border-bg3">
  Joined <strong class="text-secondary">{data.created}</strong>
  |
  <strong class="text-secondary">{data.karma}</strong> karma
 </p>

 <p>
  <a href="https://news.ycombinator.com/submitted?id={data.id}">submissions</a>
  /
  <a href="https://news.ycombinator.com/threads?id={data.id}">comments</a> /
  <a href="https://news.ycombinator.com/favorites?id={data.id}">favourites</a>
 </p>

 {#if data.about}
  <div class="space-y-2 text-sm">
   {@html "<p>" +
    data.about
     .split("<p>")
     .map((p) => `<div class="paragraph">${p}</div>`)
     .join("\n")}
  </div>
 {/if}
</div>
