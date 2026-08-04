const fs = require("fs");
const path = require("path");

const html = fs.readFileSync(path.resolve(__dirname, "index.html"), "utf8");

describe("ClickFast basic tests", () => {
  beforeEach(() => {
    document.body.innerHTML = html;
    jest.resetModules();
    require("./script.js");
  });

  test("Le score initial est 0", () => {
    const scoreElement = document.getElementById("score");
    expect(scoreElement.textContent).toBe("0");
  });

  test("Un clic incrémente le score", () => {
    const button = document.getElementById("button-clicker");
    const scoreElement = document.getElementById("score");

    button.click();
    expect(scoreElement.textContent).toBe("1");
  });
});
