<script lang="ts">
 // preserve the focus ring for keyboard users because a11y,
 // but hide for mouse users because fugly
 let currentSetTheme = "light";

 const setTheme = (theme: "light" | "hani" | "dark") => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  currentSetTheme = theme;

  const htmlElement = document.querySelector("html");
  if (htmlElement) {
   htmlElement.classList.remove("theme-light", "theme-hani", "theme-dark");
  }

  document.documentElement.setAttribute("data-theme", theme);
  document.querySelector("html").classList.add(`theme-${theme}`);

  try {
   localStorage.theme = theme;
  } catch (e) {
   // ignore
  }
 };

 $: currentSetTheme = document.documentElement.getAttribute("data-theme");
</script>

<div class="flex space-x-4">
 <button
  class="p-2 rounded-full h-6 w-6 bg-white border-brand"
  class:border-2={currentSetTheme === "light"}
  on:click={() => setTheme("light")}
 />

 <!-- Orange Theme Button -->
 <button
  class="p-2 rounded-full bg-orange-500 h-6 w-6 border-orange-900"
  class:border-2={currentSetTheme === "hani"}
  on:click={() => setTheme("hani")}
 />

 <!-- Dark Theme Button -->
 <button
  class="p-2 rounded-full bg-gray-950 h-6 w-6 border-brand"
  class:border-2={currentSetTheme === "dark"}
  on:click={() => setTheme("dark")}
 />
</div>
