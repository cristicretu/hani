<script lang="ts">
 // preserve the focus ring for keyboard users because a11y,
 // but hide for mouse users because fugly
 let theme = "light";

 try {
  theme = localStorage.theme;
 } catch (e) {
  // ignore — could be SSR, or e.g. Firefox with restrictive permissions
 }

 const setTheme = (theme: "light" | "hani" | "dark") => {
  const currentTheme = document.documentElement.getAttribute("data-theme");

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
</script>

<div class="flex space-x-4">
 <button
  class="p-2 rounded-full h-6 w-6 bg-white"
  on:click={() => setTheme("light")}
 />

 <!-- Orange Theme Button -->
 <button
  class="p-2 rounded-full bg-orange-500 h-6 w-6"
  on:click={() => setTheme("hani")}
 />

 <!-- Dark Theme Button -->
 <button
  class="p-2 rounded-full bg-gray-950 h-6 w-6"
  on:click={() => setTheme("dark")}
 />
</div>
