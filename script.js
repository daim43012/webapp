let tokens = 0; // Переменная для отслеживания количества "токенов"
const tokensMax = 1000; // Максимальное значение

// Функция для обновления прогресс-бара
function updateProgressBar() {
  let percentage = (tokens / tokensMax) * 100;
  document.querySelector(".progressBarFill").style.width = percentage + "%";
}

// Функция для получения и отображения ID пользователя и токенов
function fetchAndDisplayTgId() {
  if (Telegram.WebApp.initDataUnsafe) {
    const userId = Telegram.WebApp.initDataUnsafe.user.id;
    document.getElementById("tgIdDisplay").textContent = `TG ID: ${userId}`;

    // Получаем количество токенов для пользователя
    fetch(`http://localhost:5500/get_tokens?userId=${userId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          tokens = data.tokens; // Обновляем переменную tokens
          updateProgressBar();
          // Обновляем текстовый элемент с количеством токенов
          document.querySelector(".count h1").textContent = `FTMC Tokens: ${tokens}`;
        } else {
          console.error("Ошибка при получении токенов:", data.message);
        }
      })
      .catch((error) => console.error("Ошибка:", error));
  }
}

// Функция для обновления количества токенов на сервере
function updateTokensOnServer(userId) {
  fetch("http://localhost:5500/update_tokens", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId: userId, tokens: tokens }),
  })
    .then((response) => response.json())
    .then((data) => console.log("Tokens updated", data))
    .catch((error) => console.error("Ошибка при обновлении токенов", error));
}

// Обработчик клика для увеличения количества токенов
document.getElementById("img").addEventListener("click", function () {
  if (Telegram.WebApp.initDataUnsafe) {
    const userId = Telegram.WebApp.initDataUnsafe.user.id;

    tokens++; // Увеличиваем количество токенов
    updateProgressBar(); // Обновляем прогресс-бар
    document.querySelector(".count h1").textContent = `FTMC Tokens: ${tokens}`; // Обновляем отображаемое значение
    updateTokensOnServer(userId); // Обновляем количество токенов на сервере
  }
});

// Вызываем функцию при загрузке страницы
fetchAndDisplayTgId();

}

fetchAndDisplayTgId();
