let clickTimeout;
let tokens = 0; // Переменная для отслеживания количества "токенов"
let tokens1 = 1000; // Начальное значение, будет обновлено после загрузки
let tokens2 = 1000; // Добавленная переменная, также будет обновлена
const tokensMax = 1000; // Максимальное значение

// Функция для обновления прогресс-бара
function updateProgressBar() {
  let percentage = (tokens1 / tokensMax) * 100;
  document.querySelector(".progressBarFill").style.width = percentage + "%";
}
updateProgressBar();

function fetchAndDisplayTgId() {
  if (Telegram.WebApp.initDataUnsafe) {
    const userId = Telegram.WebApp.initDataUnsafe.user.id;
    document.getElementById("tgIdDisplay").textContent = `TG ID: ${userId}`;
  }
}

// Вызовите функцию сразу после её объявления
fetchAndDisplayTgId();

setInterval(() => {
  if (tokens1 < tokensMax) {
    tokens1++; // Увеличиваем tokens1 на 1 каждую секунду
    tokens2++; // Увеличиваем tokens2 вместе с tokens1
    updateProgressBar(); // Обновляем полосу прогресса
    document.querySelector(
      ".value h1"
    ).textContent = `⚡ ${tokens2} (+1) / ${tokensMax}`;
  }
}, 1000);

document.getElementById("img").addEventListener("mousedown", function (event) {
  event.preventDefault(); // Предотвращаем действие по умолчанию
});

document.getElementById("img").addEventListener("click", function () {
  if (tokens1 > 0) {
    tokens1--;
    tokens2--; // Уменьшаем tokens2 вместе с tokens1
    updateProgressBar(); // Обновляем полосу прогресса

    const changeElement = document.createElement("div");
    changeElement.textContent = "1"; // Текст, отображающий изменение
    changeElement.className = "token-change"; // Применяем класс с анимацией

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
  ).textContent = `⚡ ${tokens2} (+1) / ${tokensMax}`;

  // Вибрация при клике (поддерживается не на всех устройствах)
  if (navigator.vibrate) {
    navigator.vibrate(50); // Вибрация на 50 миллисекунд
  }

  clearTimeout(clickTimeout); // Очистить текущий таймер, если он существует
  this.classList.remove("click-effect"); // Убрать класс для эффекта внутреннего клика, если он есть
  void this.offsetWidth; // Триггер перерисовки для повторного проигрывания анимации
  this.classList.add("clicked", "click-effect"); // Добавить класс для увеличения и класс для эффекта клика

  setTimeout(() => this.classList.remove("click-effect"), 50);

  clickTimeout = setTimeout(() => {
    this.classList.remove("clicked");
  }, 200);
});

// В вашем script.js
function fetchAndDisplayTgId() {
  fetch("http://localhost:5500/api/getLastTgId") // Используйте ваш реальный URL сервера здесь
    .then((response) => response.json())
    .then((data) => {
      // Предполагая, что у вас есть элемент с id="tgIdDisplay" для отображения tg_id
      document.getElementById(
        "tgIdDisplay"
      ).textContent = `TG ID: ${data.tg_id}`;
    })
    .catch((error) => console.error("Ошибка:", error));
}

fetchAndDisplayTgId();
