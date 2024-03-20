let clickTimeout;
let tokens = 0; // Переменная для отслеживания количества "токенов"
let tokens1 = 1000; // Начальное значение
let tokens2 = 1000; // Добавленная переменная
const tokensMax = 1000; // Максимальное значение

// Функция обновления полосы прогресса
function updateProgressBar() {
  let percentage = (tokens1 / tokensMax) * 100;
  document.querySelector(".progressBarFill").style.width = percentage + "%";
}

// Инициализируем полосу прогресса при загрузке страницы
updateProgressBar();

// Установка интервала для автоматического восстановления значений
setInterval(() => {
  if (tokens1 < tokensMax) {
    tokens1++; // Увеличиваем tokens1 на 1 каждую секунду
    tokens2++; // Увеличиваем tokens2 вместе с tokens1
    updateProgressBar(); // Обновляем полосу прогресса
    // Обновляем отображаемое значение tokens2 в элементе .value h1
    document.querySelector(
      ".value h1"
    ).textContent = `⚡ ${tokens2} (+1) / ${tokensMax}`;
  }
}, 1000); // 1000 миллисекунд (1 секунда)

document.getElementById("img").addEventListener("click", function () {
  // Уменьшаем tokens1 и tokens2 при каждом клике, если tokens1 > 0
  if (tokens1 > 0) {
    tokens1--;
    tokens2--; // Уменьшаем tokens2 вместе с tokens1
    updateProgressBar(); // Обновляем полосу прогресса
  }

  tokens += 1; // Увеличиваем tokens на 1 при каждом клике
  // Обновляем содержимое <h1> с новым значением tokens
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

