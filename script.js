
"use strict";

const questions = [
  {
    question: "Které číslo pokračuje v řadě: 2, 4, 8, 16, ...?",
    answers: ["18", "24", "32", "36"],
    correct: 2,
    explanation: "Každé číslo je dvojnásobkem předchozího. 16 × 2 = 32."
  },
  {
    question: "Které slovo do skupiny nejméně patří?",
    answers: ["Jablko", "Hruška", "Mrkev", "Švestka"],
    correct: 2,
    explanation: "Mrkev je kořenová zelenina, zatímco ostatní možnosti jsou ovoce."
  },
  {
    question: "Pokud jsou všichni Bloři Zlori a všichni Zlori Plori, co platí?",
    answers: [
      "Všichni Plori jsou Bloři",
      "Všichni Bloři jsou Plori",
      "Žádný Blor není Plor",
      "Nelze určit"
    ],
    correct: 1,
    explanation: "Jestliže každá skupina Blorů patří mezi Zlory a každý Zlor mezi Plory, každý Blor je také Plor."
  },
  {
    question: "Kolik je 15 % z čísla 200?",
    answers: ["15", "20", "30", "35"],
    correct: 2,
    explanation: "10 % z 200 je 20 a 5 % je 10. Dohromady 30."
  },
  {
    question: "Doplň řadu: 1, 4, 9, 16, 25, ...",
    answers: ["30", "32", "36", "49"],
    correct: 2,
    explanation: "Jde o druhé mocniny celých čísel: 1², 2², 3², 4², 5². Další je 6² = 36."
  },
  {
    question: "Pět strojů vyrobí pět součástek za pět minut. Za jak dlouho vyrobí 100 strojů 100 součástek, pokud pracují stejným tempem?",
    answers: ["5 minut", "20 minut", "100 minut", "500 minut"],
    correct: 0,
    explanation: "Každý stroj vyrobí jednu součástku za pět minut. Sto strojů tedy vyrobí sto součástek za stejných pět minut."
  },
  {
    question: "Které číslo do řady nepatří: 3, 5, 7, 9, 11?",
    answers: ["3", "7", "9", "11"],
    correct: 2,
    explanation: "Číslo 9 není prvočíslo, protože je dělitelné třemi. Ostatní čísla v řadě prvočísly jsou."
  },
  {
    question: "Eva je starší než Petr. Petr je starší než Jana. Kdo je nejmladší?",
    answers: ["Eva", "Petr", "Jana", "Nelze určit"],
    correct: 2,
    explanation: "Pořadí od nejstaršího je Eva, Petr, Jana. Nejmladší je Jana."
  },
  {
    question: "Kolik rohů mají dohromady tři čtverce?",
    answers: ["8", "10", "12", "16"],
    correct: 2,
    explanation: "Každý čtverec má čtyři rohy. Tři čtverce mají dohromady 3 × 4 = 12 rohů."
  },
  {
    question: "Kniha a tužka stojí dohromady 110 Kč. Kniha stojí o 100 Kč více než tužka. Kolik stojí tužka?",
    answers: ["5 Kč", "10 Kč", "15 Kč", "20 Kč"],
    correct: 0,
    explanation: "Tužka stojí 5 Kč a kniha 105 Kč. Dohromady je to 110 Kč a rozdíl činí 100 Kč."
  }
];

const welcomeScreen = document.querySelector("#welcome-screen");
const quizScreen = document.querySelector("#quiz-screen");
const resultScreen = document.querySelector("#result-screen");

const startButton = document.querySelector("#start-button");
const nextButton = document.querySelector("#next-button");
const restartButton = document.querySelector("#restart-button");

const questionCount = document.querySelector("#question-count");
const questionText = document.querySelector("#question-text");
const answersContainer = document.querySelector("#answers");
const feedback = document.querySelector("#feedback");
const explanation = document.querySelector("#explanation");

const timerElement = document.querySelector("#timer");
const progressTrack = document.querySelector("#progress-track");
const progressFill = document.querySelector("#progress-fill");

const resultHeading = document.querySelector("#result-heading");
const resultScore = document.querySelector("#result-score");
const resultMessage = document.querySelector("#result-message");
const resultTime = document.querySelector("#result-time");

const playerNameInput = document.querySelector("#player-name");
const yearElement = document.querySelector("#year");

let currentQuestion = 0;
let score = 0;
let answered = false;
let startedAt = 0;
let timerInterval = null;
let finished = false;

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return (
    String(minutes).padStart(2, "0") +
    ":" +
    String(seconds).padStart(2, "0")
  );
}

function getElapsedSeconds() {
  return Math.floor((Date.now() - startedAt) / 1000);
}

function updateTimer() {
  if (timerElement && startedAt) {
    timerElement.textContent = formatTime(getElapsedSeconds());
  }
}

function startTest() {
  currentQuestion = 0;
  score = 0;
  answered = false;
  finished = false;
  startedAt = Date.now();

  if (timerInterval !== null) {
    clearInterval(timerInterval);
  }

  welcomeScreen.hidden = true;
  resultScreen.hidden = true;
  quizScreen.hidden = false;

  timerElement.textContent = "00:00";
  progressFill.style.width = "0%";
  progressTrack.setAttribute("aria-valuenow", "0");

  timerInterval = setInterval(updateTimer, 1000);

  renderQuestion();
}

function renderQuestion() {
  answered = false;

  const item = questions[currentQuestion];

  questionCount.textContent =
    `Otázka ${currentQuestion + 1} z ${questions.length}`;

  questionText.textContent = item.question;
  answersContainer.replaceChildren();

  feedback.textContent = "";
  feedback.className = "feedback";

  explanation.textContent = "";
  explanation.hidden = true;

  nextButton.disabled = true;

  progressFill.style.width =
    `${(currentQuestion / questions.length) * 100}%`;

  progressTrack.setAttribute("aria-valuenow", String(currentQuestion));

  item.answers.forEach((answerText, index) => {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "answer";
    button.textContent =
      `${String.fromCharCode(65 + index)}. ${answerText}`;

    button.addEventListener("click", () => {
      checkAnswer(index);
    });

    answersContainer.appendChild(button);
  });
}

function checkAnswer(selectedIndex) {
  if (answered || finished) return;

  answered = true;

  const item = questions[currentQuestion];
  const answerButtons = answersContainer.querySelectorAll(".answer");
  const isCorrect = selectedIndex === item.correct;

  if (isCorrect) {
    score++;
    feedback.textContent = "Správně!";
    feedback.classList.add("feedback-correct");
  } else {
    feedback.textContent =
      `Nesprávně. Správná odpověď je ${
        String.fromCharCode(65 + item.correct)
      }. ${item.answers[item.correct]}.`;

    feedback.classList.add("feedback-incorrect");
  }

  answerButtons.forEach((button, index) => {
    button.disabled = true;

    if (index === item.correct) {
      button.classList.add("answer-correct");
    } else if (index === selectedIndex) {
      button.classList.add("answer-incorrect");
    }
  });

  explanation.textContent = item.explanation;
  explanation.hidden = false;

  nextButton.disabled = false;
  nextButton.textContent =
    currentQuestion === questions.length - 1
      ? "Zobrazit výsledek"
      : "Další otázka →";

  progressFill.style.width =
    `${((currentQuestion + 1) / questions.length) * 100}%`;

  progressTrack.setAttribute(
    "aria-valuenow",
    String(currentQuestion + 1)
  );
}

function nextQuestion() {
  if (!answered || finished) return;

  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    renderQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  finished = true;

  if (timerInterval !== null) {
    clearInterval(timerInterval);
    timerInterval = null;
  }

  const elapsed = getElapsedSeconds();
  const percentage = Math.round((score / questions.length) * 100);
  const playerName = playerNameInput.value.trim();

  quizScreen.hidden = true;
  resultScreen.hidden = false;

  resultHeading.textContent = playerName
    ? `Test dokončen, ${playerName}!`
    : "Test dokončen";

  resultScore.textContent = `${score} / ${questions.length}`;

  if (percentage === 100) {
    resultMessage.textContent =
      "Výborně. Správně jsi vyřešil/a všechny otázky.";
  } else if (percentage >= 70) {
    resultMessage.textContent =
      "Dobrá práce. Většinu úloh se ti podařilo vyřešit správně.";
  } else if (percentage >= 40) {
    resultMessage.textContent =
      "Některé úlohy byly správně. Zkus si projít vysvětlení a test zopakovat.";
  } else {
    resultMessage.textContent =
      "Prohlédni si vysvětlení jednotlivých úloh a zkus to znovu.";
  }

  resultTime.textContent = `Čas: ${formatTime(elapsed)}`;

  progressFill.style.width = "100%";
  progressTrack.setAttribute("aria-valuenow", String(questions.length));
}

startButton.addEventListener("click", startTest);
nextButton.addEventListener("click", nextQuestion);
restartButton.addEventListener("click", startTest);
