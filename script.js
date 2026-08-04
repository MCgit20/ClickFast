const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");
const clickButton = document.getElementById("button-clicker");
const resetButton = document.getElementById("button-reset");

let count = 0;
let timeLeft = 5;
let timerInterval = null;
let timerStarted = false;

function updateScore() {
  scoreElement.textContent = count;
}

function updateTimer() {
  timerElement.textContent = timeLeft;
}

function stopGame() {
  clearInterval(timerInterval);
  timerInterval = null;
  clickButton.disabled = true;
  clickButton.textContent = "Temps écoulé";
}

function startTimer() {
  if (timerStarted) return;
  timerStarted = true;

  timerInterval = setInterval(() => {
    timeLeft -= 1;
    updateTimer();

    if (timeLeft <= 0) {
      stopGame();
    }
  }, 1000);
}

function handleClick() {
  if (timeLeft <= 0) {
    return;
  }

  if (!timerStarted) {
    startTimer();
  }

  count += 1;
  updateScore();
}

function resetGame() {
  clearInterval(timerInterval);
  timeLeft = 5;
  count = 0;
  timerStarted = false;
  clickButton.disabled = false;
  clickButton.textContent = "Click me!";
  updateScore();
  updateTimer();
}

function initGame() {
  updateScore();
  updateTimer();

  if (clickButton) {
    clickButton.addEventListener("click", handleClick);
  }

  if (resetButton) {
    resetButton.addEventListener("click", resetGame);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initGame);
} else {
  initGame();
}

module.exports = {
  handleClick,
  resetGame,
  initGame,
  getCount: () => count,
  getTimeLeft: () => timeLeft,
  scoreElement,
  timerElement,
  clickButton,
  resetButton,
};
