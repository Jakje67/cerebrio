
const startButton = document.querySelector("#start-button");
const testSection = document.querySelector("#test");
const feedback = document.querySelector("#feedback");
const answerButtons = [...document.querySelectorAll(".answer")];
const resetButton = document.querySelector("#reset-button");

// Aktuální rok v patičce
document.querySelector("#year").textContent = new Date().getFullYear();

// Zobrazit test po kliknutí na hlavní tlačítko
startButton.addEventListener("click", () => {
  testSection.hidden = false;

  testSection.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
});

// Vyhodnocení odpovědi
answerButtons.forEach((button) => {
  button.addEventListener("click", () => {
    answerButtons.forEach((answer) => {
      answer.disabled = true;

      if (answer.dataset.answer === "32") {
        answer.classList.add("correct");
      }
    });

    if (button.dataset.answer === "32") {
      feedback.textContent =
        "Správně! Každé číslo je dvojnásobkem předchozího.";
    } else {
      button.classList.add("incorrect");

      feedback.textContent =
        "Tentokrát ne. Správná odpověď je 32 — každé číslo se násobí dvěma.";
    }
  });
});

// Umožnit opakování úlohy
resetButton.addEventListener("click", () => {
  answerButtons.forEach((answer) => {
    answer.disabled = false;
    answer.classList.remove("correct", "incorrect");
  });

  feedback.textContent = "";
});
