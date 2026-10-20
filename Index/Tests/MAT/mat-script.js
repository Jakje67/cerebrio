"use strict";

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

const resultScore = document.querySelector("#result-score");
const resultMessage = document.querySelector("#result-message");
const resultTime = document.querySelector("#result-time");

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

if (progressTrack && typeof questions !== "undefined") {
  progressTrack.setAttribute("aria-valuemax", String(questions.length));
}

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");
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

  questionCount.textContent = `Otázka ${currentQuestion + 1} z ${questions.length}`;
  questionText.textContent = item.question;

  answersContainer.replaceChildren();

  feedback.textContent = "";
  feedback.className = "feedback";

  explanation.textContent = "";
  explanation.hidden = true;

  nextButton.disabled = true;
  nextButton.textContent = currentQuestion === questions.length - 1
    ? "Zobrazit výsledek"
    : "Další otázka →";

  progressFill.style.width = `${(currentQuestion / questions.length) * 100}%`;
  progressTrack.setAttribute("aria-valuenow", String(currentQuestion));

  item.answers.forEach((answerText, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer";
    button.textContent = `${String.fromCharCode(65 + index)}. ${answerText}`;
    button.addEventListener("click", () => checkAnswer(index));
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
    feedback.textContent = "Správně.";
    feedback.classList.add("feedback-correct");
  } else {
    feedback.textContent = `Nesprávně. Správná odpověď je ${String.fromCharCode(65 + item.correct)}. ${item.answers[item.correct]}`;
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

  progressFill.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
  progressTrack.setAttribute("aria-valuenow", String(currentQuestion + 1));
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
  if (finished) return;
  finished = true;

  if (timerInterval !== null) {
    clearInterval(timerInterval);
    timerInterval = null;
  }

  const totalQuestions = questions.length;
  const elapsedSeconds = getElapsedSeconds();
  const accuracy = totalQuestions > 0 ? score / totalQuestions : 0;

  const accuracyScore = Math.pow(accuracy, 1.2);
  const timeMinutes = Math.max(elapsedSeconds / 60, 0.1);
  const speedScore = Math.exp(-timeMinutes / 25);

  const combinedScore = 0.8 * accuracyScore + 0.2 * speedScore;
  const ciq = Math.min(250, Math.max(40, Math.round(40 + 210 * combinedScore)));

  resultScore.textContent = `${ciq} CIQ`;
  document.querySelector("#result-correct").textContent = `${score} / ${totalQuestions}`;
  resultTime.textContent = formatTime(elapsedSeconds);

  resultMessage.textContent =
    "Tvé CerebrIQ skóre kombinuje správnost odpovědí a rychlost řešení. " +
    "Bodovací systém je experimentální a výsledek není skutečně změřené IQ.";

  quizScreen.hidden = true;
  resultScreen.hidden = false;

  saveCerebriqResult({
    ciq,
    correctAnswers: score,
    totalQuestions,
    elapsedSeconds
  });
}

startButton.addEventListener("click", startTest);
nextButton.addEventListener("click", nextQuestion);
restartButton.addEventListener("click", startTest);

// Supabase uložení výsledku z testu
const SUPABASE_URL = "https://wecdhuqrfotybypnszxi.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_1AF0NrMIx7oUMT3jy4lJbQ_LqrMD1nC";

const supabaseClient = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY) : null;

async function saveCerebriqResult({ ciq, correctAnswers, totalQuestions, elapsedSeconds }) {
  const statusId = "result-save-status";
  let status = document.getElementById(statusId);

  if (!status) {
    status = document.createElement("p");
    status.id = statusId;
    status.setAttribute("role", "status");
    status.setAttribute("aria-live", "polite");
    status.style.marginTop = "12px";
    resultMessage.insertAdjacentElement("afterend", status);
  }

  try {
    if (!supabaseClient) {
      status.textContent = "Výsledek se zobrazuje, ale databáze není dostupná.";
      return;
    }

    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    if (userError) throw userError;

    if (!user) {
      status.textContent = "Výsledek není uložen. Pro uložení do účtu se přihlas na hlavním webu.";
      return;
    }

    status.textContent = "Ukládám výsledek…";

    const { error } = await supabaseClient
      .from("cerebriq_results")
      .insert({
        user_id: user.id,
        score: ciq,
        total_questions: totalQuestions,
        answers: {
          correct_answers: correctAnswers,
          elapsed_seconds: elapsedSeconds
        }
      });

    if (error) throw error;

    status.textContent = "Výsledek byl úspěšně uložen do tvého účtu.";
    status.style.color = "var(--green)";
  } catch (error) {
    console.error("Uložení výsledku selhalo:", error);
    status.textContent = "Výsledek se zobrazil, ale nepodařilo se ho uložit.";
    status.style.color = "var(--red)";
  }
}
