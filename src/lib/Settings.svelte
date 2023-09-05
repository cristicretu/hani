<!-- Popup.svelte -->
<script>
 import ThemeToggle from "./ThemeToggle.svelte";
 import { onMount, onDestroy } from "svelte";
 import { browser } from "$app/environment";

 let showPopup = false;
 let popupPosition = {};

 function togglePopup() {
  showPopup = !showPopup;
  if (showPopup) {
   calculatePopupPosition();
  }
 }

 function calculatePopupPosition() {
  const button = document.querySelector(".popup-button");
  const buttonRect = button.getBoundingClientRect();
  popupPosition = {
   top: buttonRect.bottom + window.scrollY + 10 + "px",
   left: buttonRect.left + window.scrollX + "px",
  };
 }

 function closePopup(event) {
  if (
   event.target.closest(".popup") === null &&
   event.target.closest(".popup-button") === null
  ) {
   showPopup = false;
  }
 }

 onMount(() => {
  document.addEventListener("click", closePopup);
 });
</script>

<button
 class="bg-brand text-primary px-4 py-2 rounded popup-button"
 on:click={togglePopup}
>
 Open Popup
</button>

{#if showPopup}
 <div
  class="fixed popup z-50"
  style="top: {popupPosition.top}; left: {popupPosition.left}; -webkit-tap-highlight-color: transparent"
  role="dialog"
  ref="popup"
 >
  <button
   class="bg-bg2 p-4 rounded-lg shadow-lg"
   on:click={closePopup}
   on:keydown={closePopup}
   aria-labelledby="Close popup"
  >
   <div class="flex flex-col !items-start space-y-1">
    <span>Theme</span>
    <ThemeToggle />
   </div>
  </button>
 </div>
{/if}
