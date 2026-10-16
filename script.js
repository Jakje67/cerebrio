
const startButton = document.querySelector("#start-button");
const testSection = document.querySelector("#test");
const feedback = document.querySelector("#feedback");
const resetButton = document.querySelector("#reset-button");
const yearElement = document.querySelector("#year");

// Aktuální rok v patičce
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Otázky matematického testu
const questions = [
  {
    question: "Jaké číslo následuje?",
    detail: "2 · 4 · 8 · 16 · ?",
    answers: ["24", "30", "32", "34"],
    correct: 2,
    explanation: "Každé číslo je dvojnásobkem předchozího. 16 × 2 = 32."
  },
  {
    question: "Kolik je 15 % ze 200?",
    detail: "Vyber správný výsledek.",
    answers: ["15", "20", "30", "35"],
    correct: 2,
    explanation: "10 % z 200 je 20 a 5 % je 10. Dohromady 30."
  },
  {
    question: "Vyřeš rovnici: 3x + 5 = 20",
    detail: "Kolik je x?",
    answers: ["3", "5", "7", "10"],
    correct: 1,
    explanation: "Odečteme 5: 3x = 15. Vydělíme třemi, takže x = 5."
  },
  {
    question: "Jaké číslo chybí v řadě?",
    detail: "5 · 10 · 15 · 20 · ?",
    answers: ["22", "24", "25", "30"],
    correct: 2,
    explanation: "Pokaždé přičítáme 5. Další číslo je 25."
  },
  {
    question: "Kolik je 12 × 8?",
    detail: "Zkus to vypočítat z hlavy.",
    answers: ["86", "92", "96", "108"],
    correct: 2,
    explanation: "12 × 8 = 96."
  },
  {
    question: "Boty stojí 800 Kč. Sleva je 25 %. Kolik stojí po slevě?",
    detail: "Předpokládej jednorázovou slevu.",
    answers: ["500 Kč", "550 Kč", "600 Kč", "650 Kč"],
    correct: 2,
    explanation: "25 % z 800 Kč je 200 Kč. 800 − 200 = 600 Kč."
  },
  {
    question: "Jaké číslo následuje?",
    detail: "1 · 1 · 2 · 3 · 5 · 8 · ?",
    answers: ["11", "12", "13", "15"],
    correct: 2,
    explanation: "Každé další číslo je součtem dvou předchozích. 5 + 8 = 13."
  },
  {
    question: "Obdélník má délku 9 cm a šířku 4 cm. Jaký má obvod?",
    detail: "Obvod je součet délek všech stran.",
    answers: ["13 cm", "26 cm", "36 cm", "40 cm"],
    correct: 1,
    explanation: "Obvod = 2 × (9 + 4) = 26 cm."
  },
  {
    question: "Číslo 7 umocněné na druhou je…",
    detail: "Tedy 7 × 7.",
    answers: ["14", "42", "49", "56"],
    correct: 2,
    explanation: "7² znamená 7 × 7, což je 49."
  },
  {
    question: "Vypočítej: (18 + 6) ÷ 3",
    detail: "Nezapomeň na pořadí operací.",
    answers: ["6", "8", "10", "12"],
    correct: 1,
    explanation: "Nejprve 18 + 6 = 24. Potom 24 ÷ 3 = 8."
  }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

function renderQuestion() {
  const question = questions[currentQuestion];

  testSection.hidden = false;

  testSection.innerHTML = `
    <div class="section-kicker">MATEMATICKÝ TEST</div>

    <div class="test-card">
      <div class="test-topline">
        <span>Otázka ${currentQuestion + 1} z ${questions.length}</span>
        <span class="test-tag">Skóre: ${score}</span>
      </div>

      <div class="test-progress" aria-label="Průběh testu">
        <div class="test-progress-fill"
             style="width: ${((currentQuestion) / questions.length) * 100}%">
        </div>
      </div>

      <h2>${question.question}</h2>
      <p class="sequence">${question.detail}</p>

      <div class="answers">
        ${question.answers.map((answer, index) => `
          <button class="answer" data-answer="${index}">
            ${answer}
          </button>
        `).join("")}
      </div>

      <p id="feedback" class="feedback" aria-live="polite"></p>

      <button class="primary-button" id="next-question" hidden>
        ${currentQuestion === questions.length - 1
          ? "Zobrazit výsledek"
          : "Další otázka"} <span aria-hidden="true">→</span>
      </button>
    </div>
  `;

  answered = false;

  testSection.querySelectorAll(".answer").forEach((button) => {
    button.addEventListener("click", () => checkAnswer(Number(button.dataset.answer)));
  });

  testSection.querySelector("#next-question").addEventListener("click", nextQuestion);
}

function checkAnswer(selectedIndex) {
  if (answered) return;

  answered = true;

  const question = questions[currentQuestion];
  const answerButtons = testSection.querySelectorAll(".answer");
  const feedbackElement = testSection.querySelector("#feedback");
  const nextButton = testSection.querySelector("#next-question");

  answerButtons.forEach((button) => {
    button.disabled = true;
  });

  answerButtons[question.correct].classList.add("correct");

  if (selectedIndex === question.correct) {
    score++;
    feedbackElement.textContent = `Správně! ${question.explanation}`;
  } else {
    answerButtons[selectedIndex].classList.add("incorrect");
    feedbackElement.textContent = `Tentokrát ne. ${question.explanation}`;
  }

  nextButton.hidden = false;
}

function nextQuestion() {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    renderQuestion();
    return;
  }

  showResults();
}

function showResults() {
  const percentage = Math.round((score / questions.length) * 100);

  let message;

  if (score === 10) {
    message = "Fantastický výsledek! Zvládl/a jsi všechny otázky.";
  } else if (score >= 7) {
    message = "Skvělá práce! Máš velmi dobrý výsledek.";
  } else if (score >= 4) {
    message = "Dobrá práce! Dalším procvičováním se můžeš zlepšit.";
  } else {
    message = "Každý začátek se počítá. Zkus test znovu a sleduj svůj pokrok.";
  }

  testSection.innerHTML = `
    <div class="section-kicker">TEST DOKONČEN</div>

    <div class="test-card result-card">
      <div class="result-symbol" aria-hidden="true">✳</div>
      <h2>Tvůj výsledek</h2>

      <p class="result-score">${score}<span> / ${questions.length}</span></p>
      <p class="result-percentage">${percentage} % úspěšnost</p>

      <div class="test-progress">
        <div class="test-progress-fill" style="width: ${percentage}%"></div>
      </div>

      <p class="feedback">${message}</p>
      <p class="fine-print">
        Výsledek popisuje pouze úspěšnost v tomto procvičovacím testu.
        Nejde o standardizované měření IQ.
      </p>

      <button class="primary-button" id="restart-test">
        Zkusit test znovu <span aria-hidden="true">↻</span>
      </button>
    </div>
  `;

  testSection.querySelector("#restart-test").addEventListener("click", startTest);
}

function startTest() {
  currentQuestion = 0;
  score = 0;
  renderQuestion();

  testSection.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

// Spuštění testu z hlavního tlačítka
if (startButton) {
  startButton.addEventListener("click", () => {
    startTest();
  });
}

// Podpora původního tlačítka pro opakování,
// pokud by se někde ještě zobrazovalo.
if (resetButton) {
  resetButton.addEventListener("click", startTest);
}
