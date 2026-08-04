const {
  handleGameButton,
  handleResetButton,
  getScore,
  resetGameState
} = require("./script.js");

describe("Tests unitaires du jeu ClickFast", () => {
  beforeEach(() => {
    // 1. Définition du faux DOM
    document.body.innerHTML = `
      <div id="score">0</div>
      <div id="timer">5</div>
      <button id="button-clicker">Click me!</button>
      <button id="button-reset">Reset</button>
    `;

    resetGameState();
    handleGameButton();
    handleResetButton();
  });

  test("Vérifiez que le score s'incrémente correctement", () => {
    const button = document.getElementById("button-clicker");
    const scoreElement = document.getElementById("score");

    button.click();
    button.click();

    expect(scoreElement.textContent).toBe("2");
    expect(getScore()).toBe(2);
  });

  test("Vérifiez que le bouton de réinitialisation remet le score à zéro", () => {
    const clickBtn = document.getElementById("button-clicker");
    const resetBtn = document.getElementById("button-reset");
    const scoreElement = document.getElementById("score");

    clickBtn.click();
    clickBtn.click();
    expect(scoreElement.textContent).toBe("2");

    resetBtn.click();

    expect(scoreElement.textContent).toBe("0");
    expect(getScore()).toBe(0);
  });
});