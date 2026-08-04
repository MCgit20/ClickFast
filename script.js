let count = 0;
let timeLeft = 5;
let timerInterval = null;
let timerStarted = false;

function getElements() {
  return {
    scoreElement: document.getElementById("score"),
    timerElement: document.getElementById("timer"),
    clickButton: document.getElementById("button-clicker"),
    resetButton: document.getElementById("button-reset")
  };
}

function updateScore() {
  const { scoreElement } = getElements();
  if (scoreElement) scoreElement.textContent = count;
}

function updateTimer() {
  const { timerElement } = getElements();
  if (timerElement) timerElement.textContent = timeLeft;
}

function stopGame() {
  clearInterval(timerInterval);
  timerInterval = null;
  const { clickButton } = getElements();
  if (clickButton) {
    clickButton.disabled = true;
    clickButton.textContent = "Temps écoulé";
  }
}

function startTimer() {
  if (timerStarted) return;
  timerStarted = true;

  timerInterval = setInterval(() => {
    if (timeLeft <= 0) {
      stopGame();
      return;
    }
    timeLeft -= 1;
    updateTimer();
    if (timeLeft <= 0) {
      stopGame();
    }
  }, 1000);
}

function handleGameButton() {
  const { clickButton } = getElements();
  if (!clickButton) return;

  clickButton.addEventListener("click", () => {
    if (timeLeft <= 0) return;
    if (!timerStarted) startTimer();

    count += 1;
    updateScore();
  });
}

function handleResetButton() {
  const { resetButton, clickButton } = getElements();
  if (!resetButton) return;

  resetButton.addEventListener("click", () => {
    clearInterval(timerInterval);
    timeLeft = 5;
    count = 0;
    timerStarted = false;
    if (clickButton) {
      clickButton.disabled = false;
      clickButton.textContent = "Click me!";
    }
    updateScore();
    updateTimer();
  });
}

// Initialisation au chargement du DOM dans le navigateur
if (typeof document !== 'undefined') {
  document.addEventListener("DOMContentLoaded", () => {
    handleGameButton();
    handleResetButton();
  });
}

// Export pour Jest / Node.js
if (typeof module !== "undefined") {
  module.exports = {
    handleGameButton,
    handleResetButton,
    getScore: () => count,
    getTimeLeft: () => timeLeft,
    resetGameState: () => {
      count = 0;
      timeLeft = 5;
      timerStarted = false;
      clearInterval(timerInterval);
    }
  };
}