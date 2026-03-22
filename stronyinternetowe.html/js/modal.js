document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("privacyModal");
  const openBtns = document.querySelectorAll("[data-open-modal]");
  const closeBtns = document.querySelectorAll("[data-close-modal]");

  let lastFocusedElement = null;

  // ✅ POPRAWKA
  if (openBtns.length && modal) {
    openBtns.forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault(); // 🔥 blokuje scroll

        lastFocusedElement = document.activeElement;

        modal.hidden = false;
        modal.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";
      });
    });
  }

  function closeModal() {
  modal.hidden = true;
  modal.setAttribute("aria-hidden", "true");

  document.body.style.overflow = "";

  // 🔥 usuwa focus
  if (document.activeElement) {
    document.activeElement.blur();
  }
  }

  closeBtns.forEach((btn) => {
    btn.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) {
      closeModal();
    }
  });

  /* 🔥 FORMULARZ MUSI BYĆ W ŚRODKU DOMContentLoaded */
  const form = document.querySelector(".contact-form");
  const privacyCheckbox = document.getElementById("privacy");

  if (form && privacyCheckbox) {
    form.addEventListener("submit", (e) => {
      if (!privacyCheckbox.checked) {
        e.preventDefault();

        alert("Musisz zaakceptować politykę prywatności");

        modal.hidden = false;
        modal.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";
      }
    });
  }
});
