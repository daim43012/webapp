let clickTimeout;
let tokens = 0;
let progress_bar = 1000;
const tokensMax = 1000;

function updateProgressBar() {
  let percentage = (progress_bar / tokensMax) * 100;
  document.querySelector(".progressBarFill").style.width = percentage + "%";
}

updateProgressBar();

function fetchAndDisplayTgId() {
  if (Telegram.WebApp.initDataUnsafe) {
    const userId = Telegram.WebApp.initDataUnsafe.user.id;
    document.getElementById("tgIdDisplay").textContent = `TG ID: ${userId}`;
  }
}

fetchAndDisplayTgId();

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

function fetchAndDisplayTgId() {
  if (Telegram.WebApp.initDataUnsafe) {
    const userId = Telegram.WebApp.initDataUnsafe.user.id;
    document.getElementById("tgIdDisplay").textContent = `TG ID: ${userId}`;

    fetch("http://localhost:5500/save_user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: userId }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) =>
        console.error("Ошибка при сохранении пользователя:", error)
      );

    fetch(`http://localhost:5500/get_tokens?userId=${userId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          progress_bar = data.tokens;
          updateProgressBar();
          document.getElementById(
            "tokensfromdb"
          ).textContent = `⚡ ${tokens} (+1)`;
        } else {
          console.error("Ошибка при получении токенов:", data.message);
        }
      })
      .catch((error) => console.error("Ошибка:", error));
  }
}

fetchAndDisplayTgId();

document.getElementById("img").addEventListener("mousedown", function (event) {
  event.preventDefault(); 
});
