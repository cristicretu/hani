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

<button
 class="p-2 rounded-md bg-white text-gray-800 hover:bg-gray-600"
 on:click={() => setTheme("light")}
>
 Light
</button>

<!-- Orange Theme Button -->
<button
 class="p-2 rounded-md bg-orange-500 text-white hover:bg-orange-600"
 on:click={() => setTheme("hani")}
>
 Orange
</button>

<!-- Dark Theme Button -->
<button
 class="p-2 rounded-md bg-gray-800 text-white hover:bg-gray-900"
 on:click={() => setTheme("dark")}
>
 Dark
</button>
