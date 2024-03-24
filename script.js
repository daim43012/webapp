// script.js
document.addEventListener("DOMContentLoaded", function() {
  Telegram.WebApp.ready();

  function fetchAndDisplayTgId() {
    if (Telegram.WebApp.initDataUnsafe) {
      const userId = Telegram.WebApp.initDataUnsafe.user.id;
      document.getElementById("tgIdDisplay").textContent = `TG ID: ${userId}`;
    }
  }
  fetchAndDisplayTgId();
});

