let clickTimeout;
let tokens = 0; // Переменная для отслеживания количества "токенов"

document.getElementById("img").addEventListener("click", function () {
  // Увеличиваем tokens на 1 при каждом клике
  tokens += 1;
  // Обновляем содержимое <h1> с новым значением tokens
  document.querySelector(".count h1").textContent = `tokens: ${tokens}`;

  // Вибрация при клике (поддерживается не на всех устройствах)
  if (navigator.vibrate) {
    navigator.vibrate(50); // Вибрация на 50 миллисекунд
  }

  clearTimeout(clickTimeout); // Очистить текущий таймер, если он существует
  this.classList.remove("click-effect"); // Убрать класс для эффекта внутреннего клика, если он есть
  void this.offsetWidth; // Триггер перерисовки для повторного проигрывания анимации
  this.classList.add("clicked", "click-effect"); // Добавить класс для увеличения и класс для эффекта клика

  // Через короткий промежуток времени убрать эффект "внутреннего клика", но оставить увеличение
  setTimeout(() => this.classList.remove("click-effect"), 50);

  // Удаляем класс 'clicked' только тогда, когда перестанут кликать
  clickTimeout = setTimeout(() => {
    this.classList.remove("clicked");
  }, 200); // Увеличьте время, если нужно больше времени на уменьшение
});
