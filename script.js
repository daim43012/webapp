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

document.getElementById("img").addEventListener("click", function () {
  if (progress_bar > 0) {
    progress_bar--;
    updateProgressBar(); 

    const changeElement = document.createElement("div");
    changeElement.textContent = "1"; 
    changeElement.className = "token-change"; 

    const clickX = event.clientX;
    const clickY = event.clientY;

    changeElement.style.left = `${clickX + window.scrollX}px`;
    changeElement.style.top = `${clickY + window.scrollY}px`;

    document.body.appendChild(changeElement);

    setTimeout(() => {
      changeElement.remove();
    }, 1000);
  }

  tokens += 1;
  document.querySelector(".count h1").textContent = `FTMC Tokens: ${tokens}`;
  document.querySelector(
    ".value h1"
  ).textContent = `⚡ ${progress_bar} (+1) / ${tokensMax}`;

  if (navigator.vibrate) {
    navigator.vibrate(50); 
  }

  clearTimeout(clickTimeout); 
  this.classList.remove("click-effect"); 
  void this.offsetWidth; 
  this.classList.add("clicked", "click-effect");

  clickTimeout = setTimeout(() => {
    this.classList.remove("clicked");
  }, 200);
});

document.getElementById("img").addEventListener("mousedown", function (event) {
  event.preventDefault(); 
});
