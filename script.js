let tokens = 0; // Переменная для отслеживания количества "токенов"
const tokensMax = 1000; // Максимальное значение
let progress_bar = 1000; // Начальное значение, будет обновлено после загрузки


// Функция для обновления прогресс-бара
function updateProgressBar() {
  let percentage = (progress_bar / tokensMax) * 100;
  document.querySelector(".progressBarFill").style.width = percentage + "%";
}

function fetchAndDisplayTgId() {
  if (Telegram.WebApp.initDataUnsafe) {
    const userId = Telegram.WebApp.initDataUnsafe.user.id;
    document.getElementById("tgIdDisplay").textContent = `TG ID: ${userId}`;
    return userId; // Возвращает userId для дальнейшего использования
  }
  return null; // Если информация недоступна, возвращает null
}

const userId = fetchAndDisplayTgId(); // Получаем и отображаем tg_id

// Функция для обновления токенов на сервере
function updateTokensOnServer(tokens) {
  if (!userId) return; // Если userId не определен, выходим из функции

  fetch("http://localhost:5500/update_tokens", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, tokens }),
  })
  .then((response) => response.json())
  .then((data) => console.log("Tokens updated:", data))
  .catch((error) => console.error("Error updating tokens:", error));
}

// Загрузка текущего значения tokens при инициализации
function loadTokens() {
  if (!userId) return; // Если userId не определен, выходим из функции

  fetch(`http://localhost:5500/get_tokens?userId=${userId}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        tokens = data.tokens; // Обновляем переменную tokens
        document.querySelector(".count h1").textContent = `FTMC Tokens: ${tokens}`;
        updateProgressBar(); // Обновляем прогресс-бар
      }
    })
    .catch((error) => console.error("Error loading tokens:", error));
}

// Вызовите loadTokens при загрузке страницы
document.addEventListener("DOMContentLoaded", loadTokens);

document.getElementById("img").addEventListener("click", function () {
  tokens += 1; // Увеличиваем tokens при каждом клике
  document.querySelector(".count h1").textContent = `FTMC Tokens: ${tokens}`;
  updateProgressBar(); // Обновляем прогресс-бар
  updateTokensOnServer(tokens); // Обновляем tokens на сервере
});
