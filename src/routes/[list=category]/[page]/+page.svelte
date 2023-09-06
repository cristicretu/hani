<script lang="ts">
 import ItemList from "../../../lib/ItemList.svelte";

 /** @type {import('./$types').PageData} */
 export let data;

 const PAGE_SIZE = 30;

 $: next = `/${data.list}/${data.page + 1}`;
</script>

<svelte:head>
 <title>Hanī | HN</title>
 <meta
  name="description"
  content="Latest Hacker News stories in the {data.list} category"
 />
</svelte:head>

<ItemList items={data.items} />

{#if next}
 <a
  class="text-tertiary -mx-4 mt-4 w-fit px-4 py-4 hover:bg-bg2 transition rounded-md"
  href={next}>More...</a
 >
{/if}
