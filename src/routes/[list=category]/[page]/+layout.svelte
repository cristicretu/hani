<script>
 import Nav from "../../../lib/Nav.svelte";
 import ThemeToggle from "../../../lib/ThemeToggle.svelte";
 import ItemSummary from "./ItemSummary.svelte";
 import Settings from "../../../lib/Settings.svelte";

 /** @type {import('./$types').PageData} */
 export let data;
</script>

<svelte:head>
 <title>Hanī | HN</title>
 <meta
  name="description"
  content="Latest Hacker News stories in the {data.list} category"
 />
</svelte:head>

<div class="min-h-screen flex flex-col mx-auto max-w-3xl md:px-0">
 <header class="pt-20 sm:py-20">
  <h1 class="text-2xl sm:text-4xl font-bold text-left text-brand">
   Hanī - Hacker News Reader
   <!-- {panel === Panel.bookmarks
         ? "Bookmarks"
         : panel === Panel.settings
         ? "Settings"
         : "Hacker News"} -->
  </h1>
  <div class="mt-4 -ml-3 flex space-x-4 text-tertiary text-sm">
   <a
    class="flex space-x-2 hover:text-primary px-3 py-2 hover:bg-bg2 transition rounded-md w-fit cursor-pointer"
    href="/top/1"
   >
    <svg
     xmlns="http://www.w3.org/2000/svg"
     fill="none"
     viewBox="0 0 24 24"
     stroke-width="1.5"
     stroke="currentColor"
     class="w-5 h-5"
    >
     <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122"
     />
    </svg>
    <span>Posts</span>
   </a>
   <a
    class="flex space-x-2 hover:text-primary px-3 py-2 hover:bg-bg2 transition rounded-md w-fit cursor-pointer"
    href="/top/1"
   >
    <svg
     xmlns="http://www.w3.org/2000/svg"
     fill="none"
     viewBox="0 0 24 24"
     stroke-width="1.5"
     stroke="currentColor"
     class="w-5 h-5"
    >
     <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122"
     />
    </svg>
    <span>Bookmarks</span>
   </a>
   <Settings />
   <!-- <a href="/new/1">new</a>
   <a href="/show/1">show</a>
   <a href="/ask/1">ask</a>
   <a href="/jobs/1">jobs</a> -->
  </div>
  <!-- <Navigation
       activePanel={panel}
       onClickPosts={() => {
         setPanel(Panel.posts)
       }}
       onClickSaved={() => {
         setPanel(Panel.bookmarks)
       }}
       onClickSettings={() => {
         setPanel(Panel.settings)
       }}
     /> -->
 </header>
 <!-- <ThemeToggle /> -->
 <slot />
 <!-- {panel === "bookmarks" ? (
     <Bookmarks />
   ) : panel === "settings" ? (
     <Settings />
   ) : (
     <Posts data={data} />
   )} -->
</div>
