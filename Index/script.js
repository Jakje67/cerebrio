"use strict";

// ==========================================
// 1. DOM ELEMENTY & GLOBÁLNÍ STAV
// ==========================================
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

if (progressTrack) {
  progressTrack.setAttribute("aria-valuemax", String(questions.length));
}

// ==========================================
// 2. LOGIKA KVÍZU A ČASOVAČE
// ==========================================
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

// ==========================================
// 3. SUPABASE AUTENTIZACE A SPRÁVA ÚČTU
// ==========================================
const SUPABASE_URL = "https://wecdhuqrfotybypnszxi.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_1AF0NrMIx7oUMT3jy4lJbQ_LqrMD1nC";

const loginButton = document.querySelector("#login-button");
const logoutButton = document.querySelector("#logout-button");
const userPanel = document.querySelector("#user-panel");
const userLabel = document.querySelector("#user-label");

const authModal = document.querySelector("#auth-modal");
const authClose = document.querySelector("#auth-close");
const authMessage = document.querySelector("#auth-message");

const githubButton = document.querySelector("#github-login");
const googleButton = document.querySelector("#google-login");

const emailForm = document.querySelector("#email-auth-form");
const emailInput = document.querySelector("#auth-email");
const passwordInput = document.querySelector("#auth-password");
const emailSubmit = document.querySelector("#email-submit");

const authTitle = document.querySelector("#auth-title");
const authSubtitle = document.querySelector("#auth-subtitle");
const authSwitchLabel = document.querySelector("#auth-switch-label");
const authSwitchButton = document.querySelector("#auth-switch-button");

let supabaseClient = null;
let authMode = "login";

function showAuthMessage(message, isError = true) {
  authMessage.textContent = message;
  authMessage.style.color = isError ? "var(--red)" : "var(--green)";
}

function openAuthModal() {
  if (!supabaseClient) return;
  authModal.hidden = false;
  showAuthMessage("");
  authClose.focus();
}

function closeAuthModal() {
  authModal.hidden = true;
  showAuthMessage("");
  loginButton.focus();
}

function setAuthMode(mode) {
  authMode = mode;
  const isSignup = mode === "signup";

  authTitle.textContent = isSignup ? "Vytvoření účtu" : "Přihlášení do Cerebrio";
  authSubtitle.textContent = isSignup ? "Založ si účet pro přístup ke svým uloženým výsledkům." : "Přihlas se ke svému účtu.";
  emailSubmit.textContent = isSignup ? "Zaregistrovat se" : "Přihlásit se";
  authSwitchLabel.textContent = isSignup ? "Už máš účet?" : "Nemáš účet?";
  authSwitchButton.textContent = isSignup ? "Přihlásit se" : "Zaregistrovat se";
  passwordInput.autocomplete = isSignup ? "new-password" : "current-password";

  showAuthMessage("");
}

function updateAuthUI(user) {
  loginButton.hidden = Boolean(user);
  userPanel.hidden = !user;

  if (user) {
    userLabel.textContent =
      user.user_metadata?.user_name ||
      user.user_metadata?.preferred_username ||
      user.user_metadata?.full_name ||
      user.email ||
      "Přihlášený uživatel";
    authModal.hidden = true;
  } else {
    userLabel.textContent = "";
  }
}

async function signInWithProvider(provider) {
  if (!supabaseClient) return;

  githubButton.disabled = true;
  googleButton.disabled = true;
  showAuthMessage("Přesměrovávám na přihlášení…", false);

  try {
    const { error } = await supabaseClient.auth.signInWithOAuth({
      provider,
      options: { redirectTo: window.location.origin }
    });

    if (error) {
      showAuthMessage("Přihlášení se nezdařilo. Zkontroluj nastavení.");
    }
  } catch {
    showAuthMessage("Nastala chyba při přihlašování.");
  } finally {
    githubButton.disabled = false;
    googleButton.disabled = false;
  }
}

loginButton.addEventListener("click", openAuthModal);
authClose.addEventListener("click", closeAuthModal);

authModal.addEventListener("click", (event) => {
  if (event.target === authModal) {
    closeAuthModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !authModal.hidden) {
    closeAuthModal();
  }
});

githubButton.addEventListener("click", () => signInWithProvider("github"));
googleButton.addEventListener("click", () => signInWithProvider("google"));

authSwitchButton.addEventListener("click", () => {
  setAuthMode(authMode === "login" ? "signup" : "login");
});

emailForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!supabaseClient) return;

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  emailSubmit.disabled = true;
  showAuthMessage(authMode === "signup" ? "Vytvářím účet…" : "Přihlašuji tě…", false);

  try {
    if (authMode === "signup") {
      const { data, error } = await supabaseClient.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: window.location.origin }
      });

      if (error) throw error;

      if (data.session) {
        showAuthMessage("Účet byl vytvořen a jsi přihlášen/a.", false);
        updateAuthUI(data.user);
      } else {
        showAuthMessage("Registrace proběhla. Pokud je vyžadováno potvrzení e-mailu, otevři zprávu ve své schránce.", false);
      }
    } else {
      const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
      if (error) throw error;

      updateAuthUI(data.user);
      showAuthMessage("Přihlášení proběhlo úspěšně.", false);
    }
  } catch (error) {
    if (error.message?.includes("Invalid login credentials")) {
      showAuthMessage("Nesprávný e-mail nebo heslo.");
    } else if (error.message?.includes("already registered")) {
      showAuthMessage("Tento e-mail už má účet. Zkus se přihlásit.");
    } else {
      showAuthMessage(error.message || "Operace se nezdařila. Zkus to znovu.");
    }
  } finally {
    emailSubmit.disabled = false;
  }
});

logoutButton.addEventListener("click", async () => {
  if (!supabaseClient) return;
  logoutButton.disabled = true;

  try {
    const { error } = await supabaseClient.auth.signOut();
    if (error) throw error;
    updateAuthUI(null);
  } catch {
    alert("Odhlášení se nezdařilo. Zkus to znovu.");
  } finally {
    logoutButton.disabled = false;
  }
});

async function initializeAuth() {
  if (!window.supabase) {
    loginButton.disabled = true;
    return;
  }

  supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

  const { data, error } = await supabaseClient.auth.getSession();
  if (error) {
    showAuthMessage("Nepodařilo se načíst stav přihlášení.");
    return;
  }

  updateAuthUI(data.session?.user ?? null);

  supabaseClient.auth.onAuthStateChange((_event, session) => {
    updateAuthUI(session?.user ?? null);
  });
}

const authReady = initializeAuth();

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
    await authReady;

    if (!supabaseClient) {
      status.textContent = "Výsledek se zobrazuje, ale databáze není dostupná.";
      return;
    }

    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    if (userError) throw userError;

    if (!user) {
      status.textContent = "Výsledek není uložen. Přihlas se, pokud ho chceš mít ve svém účtu.";
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

    status.textContent = "Výsledek byl uložen do tvého účtu.";
    status.style.color = "var(--green)";
  } catch (error) {
    console.error("Uložení výsledku selhalo:", error);
    status.textContent = "Výsledek se zobrazil, ale nepodařilo se ho uložit. Zkus to znovu později.";
    status.style.color = "var(--red)";
  }
}

// ==========================================
// 4. INTERAKCE UŽIVATELSKÉHO MENU
// ==========================================
const userMenuToggle = document.getElementById("user-label");
const userMenuLinks = document.getElementById("user-menu-links");

if (userMenuToggle && userMenuLinks) {
  userMenuToggle.addEventListener("click", () => {
    const isOpen = userMenuToggle.getAttribute("aria-expanded") === "true";
    userMenuToggle.setAttribute("aria-expanded", String(!isOpen));
    userMenuLinks.hidden = isOpen;
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest("#user-menu")) {
      userMenuLinks.hidden = true;
      userMenuToggle.setAttribute("aria-expanded", "false");
    }
  });
}
