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

clickButton.addEventListener("click", () => {
  if (timeLeft <= 0) {
    return;
  }

  if (!timerStarted) {
    startTimer();
  }

  count += 1;
  updateScore();
});

resetButton.addEventListener("click", () => {
  clearInterval(timerInterval);
  timeLeft = 5;
  count = 0;
  timerStarted = false;
  clickButton.disabled = false;
  clickButton.textContent = "Click me!";
  updateScore();
  updateTimer();
});
