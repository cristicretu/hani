<script lang="ts">
 import { font } from "./utils";
 import { Base } from "deta";
 const db = Base("settings");

 async function changeFont(font: "sans" | "mono") {
  $font = font;
  currentFont = font;

  db.put({ field: $font }, "font");
 }

 $: currentFont = document.querySelector("main").classList.contains("font-mono")
  ? "mono"
  : "sans";
</script>

<div class="flex text-secondary space-x-4 w-full">
 <button
  class="flex flex-col font-sans bg-bg3 p-4 rounded-lg border-brand box-border"
  on:click={() => changeFont("sans")}
  class:border={currentFont === "sans"}
 >
  <span>Sans</span>
  <span class="text-2xl font-semibold">Aa</span>
 </button>

 <button
  class="flex flex-col font-mono bg-bg3 p-4 rounded-lg border-brand box-border"
  on:click={() => changeFont("mono")}
  class:border={currentFont === "mono"}
 >
  <span>Mono</span>
  <span class="text-2xl font-semibold">Aa</span>
 </button>
</div>
