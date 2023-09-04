<script>
 import Nav from "../../../lib/Nav.svelte";
 import ItemSummary from "./ItemSummary.svelte";

 /** @type {import('./$types').PageData} */
 export let data;

 const PAGE_SIZE = 30;

 $: start = 1 + (data.page - 1) * PAGE_SIZE;
</script>

<svelte:head>
 <title>Hanī | HN</title>
 <meta
  name="description"
  content="Latest Hacker News stories in the {data.list} category"
 />
</svelte:head>

{#each data.items as item, i}
 {#if item}
  <ItemSummary {item} index={start + i} />
 {/if}
{/each}
