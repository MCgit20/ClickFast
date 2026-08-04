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

const API_URL = "https://672e1217229a881691eed80f.mockapi.io/scores";

// Récupérer et afficher les scores
async function loadScores() {
  const scoreList = document.getElementById("score-list");
  if (!scoreList) return;

  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Erreur lors de la récupération");

    const scores = await response.json();
    scoreList.innerHTML = "";

    // Trier les scores du plus grand au plus petit et prendre les 5 meilleurs
    scores
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .forEach((item) => {
        const li = document.createElement("li");
        li.textContent = `${item.username} : ${item.score} pts`;
        scoreList.appendChild(li);
      });
  } catch (error) {
    console.error("Erreur API:", error);
  }
}

// Soumettre un nouveau score
async function submitScore(username, finalScore) {
  const newUserData = {
    createdAt: new Date().toISOString(),
    username: username,
    avatar: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2F0EpIWybDPfI%2Fhqdefault.jpg",
    score: finalScore,
    website_url: "clickfast.local"
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUserData)
    });

    if (response.ok) {
      loadScores(); // Rafraîchir la liste
    }
  } catch (error) {
    console.error("Erreur lors de la soumission du score:", error);
  }
}

// Charger les scores au démarrage
if (typeof document !== 'undefined') {
  document.addEventListener("DOMContentLoaded", () => {
    loadScores();
  });
}