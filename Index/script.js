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

// Bezpečné nastavení roku
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Bezpečné nastavení progress baru
if (progressTrack && typeof questions !== "undefined" && Array.isArray(questions)) {
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
  if (typeof questions === "undefined" || !Array.isArray(questions)) return;

  currentQuestion = 0;
  score = 0;
  answered = false;
  finished = false;
  startedAt = Date.now();

  if (timerInterval !== null) {
    clearInterval(timerInterval);
  }

  if (welcomeScreen) welcomeScreen.hidden = true;
  if (resultScreen) resultScreen.hidden = true;
  if (quizScreen) quizScreen.hidden = false;

  if (timerElement) timerElement.textContent = "00:00";
  if (progressFill) progressFill.style.width = "0%";
  if (progressTrack) progressTrack.setAttribute("aria-valuenow", "0");

  timerInterval = setInterval(updateTimer, 1000);

  renderQuestion();
}

function renderQuestion() {
  if (typeof questions === "undefined" || !questions[currentQuestion]) return;

  answered = false;
  const item = questions[currentQuestion];

  if (questionCount) questionCount.textContent = `Otázka ${currentQuestion + 1} z ${questions.length}`;
  if (questionText) questionText.textContent = item.question;

  if (answersContainer) {
    answersContainer.replaceChildren();

    item.answers.forEach((answerText, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "answer";
      button.textContent = `${String.fromCharCode(65 + index)}. ${answerText}`;
      button.addEventListener("click", () => checkAnswer(index));
      answersContainer.appendChild(button);
    });
  }

  if (feedback) {
    feedback.textContent = "";
    feedback.className = "feedback";
  }

  if (explanation) {
    explanation.textContent = "";
    explanation.hidden = true;
  }

  if (nextButton) {
    nextButton.disabled = true;
    nextButton.textContent = currentQuestion === questions.length - 1
      ? "Zobrazit výsledek"
      : "Další otázka →";
  }

  if (progressFill) progressFill.style.width = `${(currentQuestion / questions.length) * 100}%`;
  if (progressTrack) progressTrack.setAttribute("aria-valuenow", String(currentQuestion));
}

function checkAnswer(selectedIndex) {
  if (answered || finished || typeof questions === "undefined") return;

  answered = true;

  const item = questions[currentQuestion];
  const answerButtons = answersContainer ? answersContainer.querySelectorAll(".answer") : [];
  const isCorrect = selectedIndex === item.correct;

  if (feedback) {
    if (isCorrect) {
      score++;
      feedback.textContent = "Správně.";
      feedback.classList.add("feedback-correct");
    } else {
      feedback.textContent = `Nesprávně. Správná odpověď je ${String.fromCharCode(65 + item.correct)}. ${item.answers[item.correct]}`;
      feedback.classList.add("feedback-incorrect");
    }
  }

  answerButtons.forEach((button, index) => {
    button.disabled = true;

    if (index === item.correct) {
      button.classList.add("answer-correct");
    } else if (index === selectedIndex) {
      button.classList.add("answer-incorrect");
    }
  });

  if (explanation) {
    explanation.textContent = item.explanation;
    explanation.hidden = false;
  }
  if (nextButton) nextButton.disabled = false;

  if (progressFill) progressFill.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
  if (progressTrack) progressTrack.setAttribute("aria-valuenow", String(currentQuestion + 1));
}

function nextQuestion() {
  if (!answered || finished || typeof questions === "undefined") return;

  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    renderQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  if (finished || typeof questions === "undefined") return;

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

  if (resultScore) resultScore.textContent = `${ciq} CIQ`;
  const resultCorrect = document.querySelector("#result-correct");
  if (resultCorrect) resultCorrect.textContent = `${score} / ${totalQuestions}`;
  if (resultTime) resultTime.textContent = formatTime(elapsedSeconds);

  if (resultMessage) {
    resultMessage.textContent =
      "Tvé CerebrIQ skóre kombinuje správnost odpovědí a rychlost řešení. " +
      "Bodovací systém je experimentální a výsledek není skutečně změřené IQ.";
  }

  if (quizScreen) quizScreen.hidden = true;
  if (resultScreen) resultScreen.hidden = false;

  saveCerebriqResult({
    ciq,
    correctAnswers: score,
    totalQuestions,
    elapsedSeconds
  });
}

if (startButton) startButton.addEventListener("click", startTest);
if (nextButton) nextButton.addEventListener("click", nextQuestion);
if (restartButton) restartButton.addEventListener("click", startTest);

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
const authGuestButton = document.querySelector("#auth-guest-button");

let supabaseClient = null;
let authMode = "login";
let pendingTestUrl = null;

function showAuthMessage(message, isError = true) {
  if (!authMessage) return;
  authMessage.textContent = message;
  authMessage.style.color = isError ? "var(--red)" : "var(--green)";
}

function openAuthModal(testUrl = null) {
  if (!authModal) return;
  
  pendingTestUrl = testUrl;

  if (testUrl) {
    if (authTitle) authTitle.textContent = "Uložení výsledků testu";
    if (authSubtitle) authSubtitle.textContent = "Přihlas se, aby se ti výsledky automaticky uložily. Nebo pokračuj bez přihlášení.";
    if (authGuestButton) authGuestButton.hidden = false;
  } else {
    if (authTitle) authTitle.textContent = "Přihlášení do Cerebrio";
    if (authSubtitle) authSubtitle.textContent = "Přihlas se ke svému účtu.";
    if (authGuestButton) authGuestButton.hidden = true;
  }

  authModal.hidden = false;
  showAuthMessage("");
  if (authClose) authClose.focus();
}

function closeAuthModal() {
  if (!authModal) return;
  authModal.hidden = true;
  pendingTestUrl = null;
  if (authGuestButton) authGuestButton.hidden = true;
  showAuthMessage("");
  if (loginButton) loginButton.focus();
}

function setAuthMode(mode) {
  authMode = mode;
  const isSignup = mode === "signup";

  if (!pendingTestUrl) {
    if (authTitle) authTitle.textContent = isSignup ? "Vytvoření účtu" : "Přihlášení do Cerebrio";
    if (authSubtitle) authSubtitle.textContent = isSignup ? "Založ si účet pro přístup ke svým uloženým výsledkům." : "Přihlas se ke svému účtu.";
  }

  if (emailSubmit) emailSubmit.textContent = isSignup ? "Zaregistrovat se" : "Přihlásit se";
  if (authSwitchLabel) authSwitchLabel.textContent = isSignup ? "Už máš účet?" : "Nemáš účet?";
  if (authSwitchButton) authSwitchButton.textContent = isSignup ? "Přihlásit se" : "Zaregistrovat se";
  if (passwordInput) passwordInput.autocomplete = isSignup ? "new-password" : "current-password";

  showAuthMessage("");
}

function updateAuthUI(user) {
  if (loginButton) loginButton.hidden = Boolean(user);
  if (userPanel) userPanel.hidden = !user;

  if (user) {
    if (userLabel) {
      userLabel.textContent =
        user.user_metadata?.user_name ||
        user.user_metadata?.preferred_username ||
        user.user_metadata?.full_name ||
        user.email ||
        "Přihlášený uživatel";
    }
    
    if (pendingTestUrl) {
      const url = pendingTestUrl;
      pendingTestUrl = null;
      window.location.href = url;
      return;
    }

    if (authModal) authModal.hidden = true;
  } else {
    if (userLabel) userLabel.textContent = "";
  }
}

async function signInWithProvider(provider) {
  if (!supabaseClient) return;

  if (githubButton) githubButton.disabled = true;
  if (googleButton) googleButton.disabled = true;
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
    if (githubButton) githubButton.disabled = false;
    if (googleButton) googleButton.disabled = false;
  }
}

if (loginButton) loginButton.addEventListener("click", () => openAuthModal(null));
if (authClose) authClose.addEventListener("click", closeAuthModal);

if (authGuestButton) {
  authGuestButton.addEventListener("click", () => {
    if (pendingTestUrl) {
      window.location.href = pendingTestUrl;
    } else {
      closeAuthModal();
    }
  });
}

if (authModal) {
  authModal.addEventListener("click", (event) => {
    if (event.target === authModal) {
      closeAuthModal();
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && authModal && !authModal.hidden) {
    closeAuthModal();
  }
});

if (githubButton) githubButton.addEventListener("click", () => signInWithProvider("github"));
if (googleButton) googleButton.addEventListener("click", () => signInWithProvider("google"));

if (authSwitchButton) {
  authSwitchButton.addEventListener("click", () => {
    setAuthMode(authMode === "login" ? "signup" : "login");
  });
}

if (emailForm) {
  emailForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!supabaseClient) return;

    const email = emailInput ? emailInput.value.trim() : "";
    const password = passwordInput ? passwordInput.value : "";

    if (emailSubmit) emailSubmit.disabled = true;
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
      if (emailSubmit) emailSubmit.disabled = false;
    }
  });
}

if (logoutButton) {
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
}

async function initializeAuth() {
  if (!window.supabase) {
    if (loginButton) loginButton.disabled = true;
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

  if (!status && resultMessage) {
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
      if (status) status.textContent = "Výsledek se zobrazuje, ale databáze není dostupná.";
      return;
    }

    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    if (userError) throw userError;

    if (!user) {
      if (status) status.textContent = "Výsledek není uložen. Přihlas se, pokud ho chceš mít ve svém účtu.";
      return;
    }

    if (status) status.textContent = "Ukládám výsledek…";

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

    if (status) {
      status.textContent = "Výsledek byl uložen do tvého účtu.";
      status.style.color = "var(--green)";
    }
  } catch (error) {
    console.error("Uložení výsledku selhalo:", error);
    if (status) {
      status.textContent = "Výsledek se zobrazil, ale nepodařilo se ho uložit. Zkus to znovu později.";
      status.style.color = "var(--red)";
    }
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

// ==========================================
// 5. KONTROLA PŘIHLÁŠENÍ PŘED SPUŠTĚNÍM TESTU
// ==========================================
const startMatLink = document.querySelector("#start-mat-link");

if (startMatLink) {
  startMatLink.addEventListener("click", async (event) => {
    event.preventDefault();
    const targetUrl = startMatLink.getAttribute("href");

    // Čekáme na dokončení načtení Supabase
    await authReady;

    if (!supabaseClient) {
      openAuthModal(targetUrl);
      return;
    }

    try {
      const { data: { user }, error } = await supabaseClient.auth.getUser();

      if (error || !user) {
        // Uživatel NENÍ přihlášen -> zobrazíme přihlašovací okno
        openAuthModal(targetUrl);
      } else {
        // Uživatel JE přihlášen -> jde rovnou do testu
        window.location.href = targetUrl;
      }
    } catch (error) {
      console.error("Chyba při ověřování přihlášení:", error);
      openAuthModal(targetUrl);
    }
  });
}
