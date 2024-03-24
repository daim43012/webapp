let clickTimeout;
let tokens = 0;
let progress_bar = 1000; 

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

function updateProgressBar() {
  let percentage = (progress_bar / tokensMax) * 100;
  document.querySelector(".progressBarFill").style.width = percentage + "%";
}
updateProgressBar();

setInterval(() => {
  if (progress_bar < tokensMax) {
    progress_bar++; 
    updateProgressBar(); 
    document.querySelector(
      ".value h1"
    ).textContent = `⚡ ${progress_bar} (+1) / ${tokensMax}`;
  }
}, 1000);

document.getElementById("img").addEventListener("mousedown", function (event) {
  event.preventDefault(); 
});
