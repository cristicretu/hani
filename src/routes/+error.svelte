<script>
 import { page } from "$app/stores";

 const offline = typeof navigator !== "undefined" && navigator.onLine === false;

 const title = offline ? "Offline" : $page.status;
 const message = offline
  ? "Check your internet and try again."
  : $page.error.message;
</script>

<svelte:head>
 <title>{title}</title>
</svelte:head>

<h1 class="text-4xl font-semibold text-primary">{title}</h1>

<pre class="text-tertiary">{message}</pre>
