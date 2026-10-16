
const startButton = document.querySelector("#start-button");
const testSection = document.querySelector("#test");
const yearElement = document.querySelector("#year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// 30 otázek: od základních po náročnější.
// Každá otázka má čtyři možnosti a jednu správnou odpověď.
const questions = [
  {
    category: "Číselné řady",
    level: 1,
    question: "Jaké číslo následuje?",
    detail: "3 · 6 · 12 · 24 · ?",
    answers: ["36", "42", "48", "54"],
    correct: 2,
    explanation: "Každé číslo násobíme dvěma. 24 × 2 = 48."
  },
  {
    category: "Matematika",
    level: 1,
    question: "Kolik je 18 % z 250?",
    detail: "Vyber správný výsledek.",
    answers: ["35", "40", "45", "50"],
    correct: 2,
    explanation: "10 % je 25 a 8 % je 20. Dohromady 45."
  },
  {
    category: "Logika",
    level: 1,
    question: "Všichni modří tvorové jsou rychlí. Někteří ptáci jsou modří. Co určitě platí?",
    detail: "Vyber jediný logicky nutný závěr.",
    answers: [
      "Všichni ptáci jsou rychlí",
      "Někteří ptáci jsou rychlí",
      "Žádní ptáci nejsou rychlí",
      "Všichni rychlí tvorové jsou modří"
    ],
    correct: 1,
    explanation: "Modří ptáci patří mezi modré tvory, a proto jsou rychlí."
  },
  {
    category: "Číselné řady",
    level: 1,
    question: "Které číslo chybí?",
    detail: "7 · 11 · 15 · 19 · ?",
    answers: ["21", "22", "23", "24"],
    correct: 2,
    explanation: "V každém kroku přičítáme 4."
  },
  {
    category: "Matematika",
    level: 1,
    question: "Vyřeš rovnici: 4x − 7 = 21.",
    detail: "Kolik je x?",
    answers: ["5", "6", "7", "8"],
    correct: 2,
    explanation: "4x = 28, takže x = 7."
  },
  {
    category: "Analogie",
    level: 1,
    question: "Ruka je k rukavici jako noha k…",
    detail: "Najdi stejný vztah.",
    answers: ["Čepici", "Ponožce", "Opasku", "Šále"],
    correct: 1,
    explanation: "Rukavice se nosí na ruce, ponožka na noze."
  },
  {
    category: "Prostorová logika",
    level: 1,
    question: "Kolik stěn má krychle?",
    detail: "Počítej pouze její rovné plochy.",
    answers: ["4", "6", "8", "12"],
    correct: 1,
    explanation: "Krychle má šest čtvercových stěn."
  },
  {
    category: "Číselné řady",
    level: 1,
    question: "Jaké číslo následuje?",
    detail: "2 · 5 · 10 · 17 · 26 · ?",
    answers: ["35", "36", "37", "39"],
    correct: 2,
    explanation: "Rozdíly jsou 3, 5, 7, 9 a následně 11. Výsledek je 37."
  },
  {
    category: "Matematika",
    level: 1,
    question: "Výrobek stojí 1 200 Kč. Zlevní o 15 %. Kolik stojí potom?",
    detail: "Uvažuj jednu slevu.",
    answers: ["980 Kč", "1 000 Kč", "1 020 Kč", "1 080 Kč"],
    correct: 2,
    explanation: "15 % z 1 200 je 180. Po slevě zbývá 1 020 Kč."
  },
  {
    category: "Logika",
    level: 1,
    question: "Petr je starší než Jana. Jana je starší než Eva. Kdo je nejmladší?",
    detail: "Předpokládej, že věk je jednoznačný.",
    answers: ["Petr", "Jana", "Eva", "Nelze určit"],
    correct: 2,
    explanation: "Petr > Jana > Eva, takže nejmladší je Eva."
  },
  {
    category: "Číselné řady",
    level: 2,
    question: "Jaké číslo následuje?",
    detail: "1 · 4 · 9 · 16 · 25 · ?",
    answers: ["30", "32", "36", "49"],
    correct: 2,
    explanation: "Jde o druhé mocniny čísel 1 až 6. Další je 6² = 36."
  },
  {
    category: "Matematika",
    level: 2,
    question: "Dvě pětiny z čísla jsou 18. Jaké je to číslo?",
    detail: "Najdi celé číslo.",
    answers: ["36", "40", "45", "50"],
    correct: 2,
    explanation: "18 ÷ 2 × 5 = 45."
  },
  {
    category: "Logika",
    level: 2,
    question: "Žádný trojúhelník není kruh. Některé obrazce jsou trojúhelníky. Co platí?",
    detail: "Vyber závěr, který musí být pravdivý.",
    answers: [
      "Všechny obrazce jsou kruhy",
      "Některé obrazce nejsou kruhy",
      "Žádný obrazec není trojúhelník",
      "Všechny obrazce jsou trojúhelníky"
    ],
    correct: 1,
    explanation: "Obrazce, které jsou trojúhelníky, nemohou být kruhy."
  },
  {
    category: "Číselné řady",
    level: 2,
    question: "Doplň další číslo.",
    detail: "81 · 27 · 9 · 3 · ?",
    answers: ["0", "1", "2", "−3"],
    correct: 1,
    explanation: "Každé číslo dělíme třemi. 3 ÷ 3 = 1."
  },
  {
    category: "Matematika",
    level: 2,
    question: "Součet tří po sobě jdoucích celých čísel je 72. Jaké je prostřední číslo?",
    detail: "Čísla se liší vždy o jedna.",
    answers: ["22", "23", "24", "25"],
    correct: 2,
    explanation: "Průměr tří po sobě jdoucích čísel je prostřední číslo. 72 ÷ 3 = 24."
  },
  {
  category: "Analogie",
  level: 2,
  question: "Kniha je k autorovi jako obraz k…",
  detail: "Najdi stejný vztah.",
  answers: ["Galerii", "Malíři", "Rámu", "Divákovi"],
  correct: 1,
  explanation: "Kniha je dílem autora a obraz je dílem malíře."
  },
  {
    category: "Matematika",
    level: 2,
    question: "Stroj vyrobí 12 součástek za 4 minuty. Jak dlouho potřebuje na 36 součástek stejnou rychlostí?",
    detail: "Výkon stroje je konstantní.",
    answers: ["8 minut", "10 minut", "12 minut", "16 minut"],
    correct: 2,
    explanation: "36 je trojnásobek 12, proto je potřeba trojnásobný čas: 12 minut."
  },
  {
    category: "Logika",
    level: 2,
    question: "V závodě předběhneš běžce na druhém místě. Na jakém místě nyní jsi?",
    detail: "Představ si pořadí v okamžiku předběhnutí.",
    answers: ["Prvním", "Druhém", "Třetím", "Čtvrtém"],
    correct: 1,
    explanation: "Zaujmeš místo běžce, kterého jsi předběhl: druhé místo."
  },
  {
    category: "Číselné řady",
    level: 2,
    question: "Jaké číslo následuje?",
    detail: "2 · 3 · 5 · 8 · 12 · 17 · ?",
    answers: ["21", "22", "23", "24"],
    correct: 2,
    explanation: "Přičítáme postupně 1, 2, 3, 4, 5 a 6. Další je 23."
  },
  {
    category: "Matematika",
    level: 2,
    question: "Jaký je průměr čísel 8, 12, 15 a 25?",
    detail: "Sečti je a vyděl počtem hodnot.",
    answers: ["12", "14", "15", "16"],
    correct: 2,
    explanation: "(8 + 12 + 15 + 25) ÷ 4 = 60 ÷ 4 = 15."
  },
  {
    category: "Číselné řady",
    level: 3,
    question: "Doplň další číslo.",
    detail: "4 · 9 · 19 · 39 · 79 · ?",
    answers: ["119", "149", "159", "169"],
    correct: 2,
    explanation: "Každé číslo násobíme dvěma a přičítáme jedna. 79 × 2 + 1 = 159."
  },
  {
    category: "Matematika",
    level: 3,
    question: "Pokud x + y = 14 a x − y = 4, kolik je x?",
    detail: "Obě rovnice platí současně.",
    answers: ["5", "7", "9", "10"],
    correct: 2,
    explanation: "Sečtením rovnic dostaneme 2x = 18, tedy x = 9."
  },
  {
    category: "Logika",
    level: 3,
    question: "Všechny A jsou B. Žádné B není C. Může být některé A zároveň C?",
    detail: "Použij pouze uvedené podmínky.",
    answers: [
      "Ano, vždy",
      "Ano, někdy",
      "Ne",
      "Nelze určit"
    ],
    correct: 2,
    explanation: "Každé A patří mezi B a žádné B není C. A proto nemůže být C."
  },
  {
    category: "Matematika",
    level: 3,
    question: "Jaký je nejmenší společný násobek čísel 12 a 18?",
    detail: "Hledej nejmenší kladné číslo dělitelné oběma.",
    answers: ["24", "30", "36", "72"],
    correct: 2,
    explanation: "36 je nejmenší číslo dělitelné 12 i 18."
  },
  {
    category: "Číselné řady",
    level: 3,
    question: "Které číslo chybí?",
    detail: "2 · 6 · 12 · 20 · 30 · ?",
    answers: ["36", "40", "42", "44"],
    correct: 2,
    explanation: "Jde o součiny 1×2, 2×3, 3×4, 4×5, 5×6 a 6×7. Výsledek je 42."
  },
  {
    category: "Matematika",
    level: 3,
    question: "Po zdražení o 20 % stojí výrobek 600 Kč. Kolik stál před zdražením?",
    detail: "Původní cena představuje 100 %.",
    answers: ["480 Kč", "500 Kč", "520 Kč", "550 Kč"],
    correct: 1,
    explanation: "600 ÷ 1,2 = 500 Kč."
  },
  {
    category: "Logika",
    level: 3,
    question: "Anna říká: „Boris lže.“ Boris říká: „Oba lžeme.“ Kdo říká pravdu?",
    detail: "Každý buď vždy lže, nebo vždy mluví pravdu.",
    answers: [
      "Pravdu říká pouze Anna",
      "Pravdu říká pouze Boris",
      "Oba říkají pravdu",
      "Oba lžou"
    ],
    correct: 0,
    explanation: "Kdyby Boris říkal pravdu, jeho tvrzení, že oba lžou, by si odporovalo. Boris tedy lže a Anna má pravdu."
  },
  {
    category: "Matematika",
    level: 3,
    question: "Kostka má hranu dlouhou 3 cm. Jaký je její objem?",
    detail: "Objem krychle = hrana × hrana × hrana.",
    answers: ["9 cm³", "18 cm³", "27 cm³", "36 cm³"],
    correct: 2,
    explanation: "3 × 3 × 3 = 27 cm³."
  },
  {
    category: "Číselné řady",
    level: 3,
    question: "Doplň další číslo.",
    detail: "1 · 2 · 6 · 24 · 120 · ?",
    answers: ["240", "360", "600", "720"],
    correct: 3,
    explanation: "Postupně násobíme 2, 3, 4, 5 a 6. 120 × 6 = 720."
  },
  {
    category: "Logika",
    level: 3,
    question: "Máme tři krabice označené JABLKA, HRUŠKY a SMĚS. Všechny štítky jsou špatně. Z které krabice vytáhneš jedno ovoce jako první, abys mohl určit obsah všech krabic?",
    detail: "Víš, že každá krabice obsahuje pouze uvedené druhy ovoce.",
    answers: [
      "Z krabice JABLKA",
      "Z krabice HRUŠKY",
      "Z krabice SMĚS",
      "Z libovolné krabice"
    ],
    correct: 2,
    explanation: "Krabice označená SMĚS nemůže být směsí. Jediné vytažené ovoce určí její skutečný obsah; ostatní štítky pak určíme logicky."
  }
];

let currentQuestion = 0;
let score = 0;
let answered = false;
let startTime = 0;
let endTime = 0;
let questionResults = [];
let timerInterval = null;


const CEREBRIO_HISTORY_KEY = "cerebrio-test-history-v1";
const CEREBRIO_MAX_HISTORY = 20;

// Načte historii uloženou v tomto prohlížeči.
function getTestHistory() {
  try {
    const saved = localStorage.getItem(CEREBRIO_HISTORY_KEY);
    const history = saved ? JSON.parse(saved) : [];

    if (!Array.isArray(history)) {
      return [];
    }

    return history
      .filter((item) =>
        item &&
        Number.isFinite(item.score) &&
        Number.isFinite(item.totalQuestions) &&
        Number.isFinite(item.percentage) &&
        Number.isFinite(item.totalTimeMs) &&
        typeof item.completedAt === "string"
      )
      .slice(0, CEREBRIO_MAX_HISTORY);
  } catch (error) {
    // Web může mít ukládání vypnuté; test musí fungovat dál.
    return [];
  }
}

// Uloží dokončený pokus a ponechá posledních 20 výsledků.
function saveTestResult(result) {
  const entry = {
    score: result.score,
    totalQuestions: result.totalQuestions,
    percentage: result.percentage,
    totalTimeMs: result.totalTimeMs,
    completedAt: result.completedAt
  };

  const previousHistory = getTestHistory();
  const history = [entry, ...previousHistory]
    .slice(0, CEREBRIO_MAX_HISTORY);

  try {
    localStorage.setItem(
      CEREBRIO_HISTORY_KEY,
      JSON.stringify(history)
    );

    return {
      history,
      saved: true
    };
  } catch (error) {
    // Při problému s úložištěm lze výsledek stále zobrazit.
    return {
      history,
      saved: false
    };
  }
}

// Nejvyšší dosažené skóre v tomto prohlížeči.
function getPersonalBest(history = getTestHistory()) {
  if (history.length === 0) {
    return null;
  }

  return history.reduce((best, item) => {
    if (item.percentage > best.percentage) {
      return item;
    }

    if (
      item.percentage === best.percentage &&
      item.score > best.score
    ) {
      return item;
    }

    return best;
  });
}


function formatTime(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function elapsedTime() {
  return Date.now() - startTime;
}

function stopTimer() {
  if (timerInterval !== null) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

function updateTimer() {
  const timerElement = testSection.querySelector("#test-timer");

  if (timerElement) {
    timerElement.textContent = formatTime(elapsedTime());
  }
}

function startTimer() {
  stopTimer();
  startTime = Date.now();
  timerInterval = setInterval(updateTimer, 250);
}

let participantProfile = {
  age: "",
  language: "Čeština",
  gender: "",
  nationality: ""
};

function renderQuestion() {
  const question = questions[currentQuestion];

  testSection.hidden = false;

  testSection.innerHTML = `
    <div class="section-kicker">CEREBRIO · TEST MYŠLENÍ</div>

    <div class="test-card">
      <div class="test-topline">
        <span>Otázka ${currentQuestion + 1} z ${questions.length}</span>
        <span class="test-tag">Úroveň ${question.level}</span>
      </div>

      <div class="test-topline">
        <span>${question.category}</span>
        <span class="test-timer" id="test-timer" role="timer"
          aria-label="Čas od začátku testu">00:00</span>
      </div>

      <div class="test-progress" aria-label="Průběh testu">
        <div class="test-progress-fill"
          style="width: ${(currentQuestion / questions.length) * 100}%">
        </div>
      </div>

      <h2>${question.question}</h2>
      <p class="sequence">${question.detail}</p>

      <div class="answers">
        ${question.answers.map((answer, index) => `
          <button type="button" class="answer" data-answer="${index}">
            <span class="answer-letter">${String.fromCharCode(65 + index)}</span>
            ${answer}
          </button>
        `).join("")}
      </div>

      <p id="feedback" class="feedback" aria-live="polite"></p>

      <button type="button" class="primary-button" id="next-question" hidden>
        ${currentQuestion === questions.length - 1
          ? "Zobrazit výsledek"
          : "Další otázka"} <span aria-hidden="true">→</span>
      </button>

      <p class="fine-print">Čas běží od spuštění testu do jeho dokončení.</p>
    </div>
  `;

  answered = false;
  updateTimer();

  testSection.querySelectorAll(".answer").forEach((button) => {
    button.addEventListener("click", () => {
      checkAnswer(Number(button.dataset.answer));
    });
  });

  testSection.querySelector("#next-question").addEventListener("click", nextQuestion);
}

function checkAnswer(selectedIndex) {
  if (answered) return;

  answered = true;

  const question = questions[currentQuestion];
  const answerButtons = testSection.querySelectorAll(".answer");
  const nextButton = testSection.querySelector("#next-question");

  const isCorrect = selectedIndex === question.correct;

  if (isCorrect) {
    score++;
  }

  questionResults.push({
    category: question.category,
    level: question.level,
    correct: isCorrect
  });

  answerButtons.forEach((button) => {
    button.disabled = true;
  });

  // Během testu neprozrazujeme správnou odpověď.
  // Ani neukazujeme vysvětlení.
  const feedbackElement = testSection.querySelector("#feedback");

  if (feedbackElement) {
    feedbackElement.textContent = "Odpověď zaznamenána.";
  }

  nextButton.hidden = false;
  updateTimer();
}

function nextQuestion() {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    renderQuestion();
  } else {
    showResults();
  }
}


function showResults() {
  endTime = Date.now();
  stopTimer();

  const totalTime = Math.max(0, endTime - startTime);
  const totalQuestions = questions.length;
  const percentage = totalQuestions
    ? Math.round((score / totalQuestions) * 100)
    : 0;

  const averageTime = totalQuestions
    ? Math.round(totalTime / totalQuestions / 1000)
    : 0;

  const categories = [...new Set(
    questions.map((question) => question.category)
  )];

  const categorySummary = categories.map((category) => {
    const categoryQuestions = questionResults.filter(
      (result) => result.category === category
    );

    const categoryCorrect = categoryQuestions.filter(
      (result) => result.correct
    ).length;

    const categoryTotal = categoryQuestions.length;

    return {
      name: category,
      correct: categoryCorrect,
      total: categoryTotal,
      percentage: categoryTotal
        ? Math.round((categoryCorrect / categoryTotal) * 100)
        : 0
    };
  });

  let message;

  if (percentage >= 90) {
    message = "Skvělý výsledek! V tomto testu se ti dařilo velmi dobře.";
  } else if (percentage >= 70) {
    message = "Velmi dobrá práce. Většinu úloh se ti podařilo vyřešit správně.";
  } else if (percentage >= 50) {
    message = "Solidní základ. Výsledky ti ukážou, na které oblasti se zaměřit.";
  } else {
    message = "Každý test je příležitost k učení. Zkus další pokus a sleduj svůj pokrok.";
  }

  // Profil je nepovinný. Pokud proměnná existuje,
  // zahrneme bezpečně dostupné údaje do výsledku.
  const profile =
    typeof participantProfile !== "undefined" && participantProfile
      ? participantProfile
      : {};

  const profileLabels = [];

  if (profile.age) {
    const ageLabels = {
      under18: "Méně než 18 let",
      "18–24": "18–24 let",
      "25–34": "25–34 let",
      "35–44": "35–44 let",
      "45–54": "45–54 let",
      "55–64": "55–64 let",
      "65+": "65 a více let"
    };

    profileLabels.push({
      label: "Věková skupina",
      value: ageLabels[profile.age] || profile.age
    });
  }

  if (profile.language) {
    profileLabels.push({
      label: "Jazyk testu",
      value: profile.language
    });
  }

  if (profile.gender) {
    profileLabels.push({
      label: "Pohlaví",
      value: profile.gender
    });
  }

  if (profile.nationality) {
    profileLabels.push({
      label: "Národnost",
      value: profile.nationality
    });
  }

  // Strukturovaný výsledek pro budoucí statistiky.
  // Zatím zůstává pouze v paměti stránky.
  const testResult = {
    score,
    totalQuestions,
    percentage,
    totalTimeMs: totalTime,
    averageTimePerQuestionSeconds: averageTime,
    categories: categorySummary,
    profile: { ...profile },
    completedAt: new Date().toISOString()
  };

  const estimate = calculateCerebrioScore(
  testResult.score,
  testResult.totalQuestions
);

testResult.cerebrioScore = estimate.score;
testResult.scoreType = estimate.type;
testResult.calibrationVersion = estimate.calibrationVersion;
testResult.calibrationSampleSize = estimate.calibrationSampleSize;

testResult.participant = {
  age: participantProfile?.age
    ? Number(participantProfile.age)
    : null,

  language: participantProfile?.language || "Čeština",

  education: participantProfile?.education || null
};

// Historii už projekt podporuje, ale je nutné ji skutečně zavolat.
saveTestResult(testResult);

  // Dostupné pro další funkce během běhu stránky.
  window.cerebrioLastResult = testResult;

  testSection.innerHTML = `
    <div class="section-kicker">TEST DOKONČEN</div>

    <div class="test-card result-card">
      <div class="result-symbol" aria-hidden="true">✳</div>
      <h2>Tvůj výsledek</h2>

      <p class="result-score">
        ${score}<span> / ${totalQuestions}</span>
      </p>

      <p class="result-percentage">
        ${percentage} % úspěšnost
      </p>

      <div class="result-metrics">
        <div class="result-metric">
          <span class="metric-value">${formatTime(totalTime)}</span>
          <span class="metric-label">Celkový čas</span>
        </div>

        <div class="result-metric">
          <span class="metric-value">${averageTime} s</span>
          <span class="metric-label">Průměr na otázku</span>
        </div>
      </div>

      <div
        class="test-progress"
        role="progressbar"
        aria-label="Úspěšnost testu"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow="${percentage}"
      >
        <div
          class="test-progress-fill"
          style="width: ${percentage}%"
        ></div>
      </div>

      <p class="feedback">${message}</p>

      <h3>Výsledky podle oblastí</h3>

      <div class="category-results">
        ${categorySummary.map((item) => `
          <div class="category-result">
            <div>
              <span>${item.name}</span>
              <div class="test-progress">
                <div
                  class="test-progress-fill"
                  style="width: ${item.percentage}%"
                ></div>
              </div>
            </div>

            <strong>
              ${item.correct} / ${item.total}
              <span class="fine-print">(${item.percentage} %)</span>
            </strong>
          </div>
        `).join("")}
      </div>

      ${
        profileLabels.length
          ? `
            <h3>Profil účastníka</h3>
            <div class="category-results">
              ${profileLabels.map((item) => `
                <div class="category-result">
                  <span>${escapeHtml(item.label)}</span>
                  <strong>${escapeHtml(item.value)}</strong>
                </div>
              `).join("")}
            </div>
          `
          : ""
      }

      <p class="fine-print">
        Výsledek vyjadřuje úspěšnost v tomto procvičovacím testu,
        nikoli standardizované IQ skóre. Osobní profil se v této
        verzi ukládá pouze do paměti stránky a není odesílán na server.
      </p>

      <button type="button" class="primary-button" id="restart-test">
        Zkusit znovu <span aria-hidden="true">↻</span>
      </button>
    </div>
  `;

  testSection.querySelector("#restart-test")
    .addEventListener("click", startTest);
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };

    return entities[character];
  });
}




function startTest() {
  stopTimer();

  testSection.hidden = false;
  testSection.innerHTML = `
    <div class="section-kicker">CEREBRIO · PŘED TESTEM</div>

    <div class="test-card profile-card">
      <h2>Než začneš</h2>
      <p>Vyplň několik nepovinných údajů, které nám pomohou lépe popsat výsledky testování.</p>

      <form id="profile-form">
        <label for="profile-age">Věková skupina</label>
        <select id="profile-age" name="age">
          <option value="">Nechci uvádět</option>
          <option value="under18">Méně než 18 let</option>
          <option value="18–24">18–24 let</option>
          <option value="25–34">25–34 let</option>
          <option value="35–44">35–44 let</option>
          <option value="45–54">45–54 let</option>
          <option value="55–64">55–64 let</option>
          <option value="65+">65 a více let</option>
        </select>

        <label for="profile-language">Jazyk testu</label>
        <select id="profile-language" name="language">
          <option value="Čeština">Čeština</option>
          <option value="Slovenština">Slovenština</option>
          <option value="Angličtina">Angličtina</option>
          <option value="Jiný">Jiný</option>
        </select>

        <label for="profile-gender">Pohlaví (nepovinné)</label>
        <select id="profile-gender" name="gender">
          <option value="">Nechci uvádět</option>
          <option value="Muž">Muž</option>
          <option value="Žena">Žena</option>
          <option value="Jiné">Jiné</option>
        </select>

        <label for="profile-nationality">Národnost (nepovinné)</label>
        <input
          id="profile-nationality"
          name="nationality"
          type="text"
          maxlength="60"
          placeholder="Např. česká"
          autocomplete="off"
        />

        <p class="fine-print">
          Údaje se zatím ukládají pouze do paměti této stránky.
          Neodesílají se na server a po obnovení stránky se ztratí.
          Neovlivňují skóre ani neurčují IQ.
        </p>

        <button type="submit" class="primary-button">
          Začít test →
        </button>
      </form>
    </div>
  `;

  testSection.querySelector("#profile-form").addEventListener("submit", (event) => {
    event.preventDefault();

    const form = event.currentTarget;

    participantProfile = {
      age: form.elements.age.value,
      language: form.elements.language.value,
      gender: form.elements.gender.value,
      nationality: form.elements.nationality.value.trim()
    };

    beginTest();
  });

  testSection.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

function beginTest() {
  stopTimer();

  currentQuestion = 0;
  score = 0;
  answered = false;
  questionResults = [];

  renderQuestion();

  // Čas začíná běžet až po potvrzení profilu a spuštění testu.
  startTimer();
  updateTimer();

  testSection.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}


if (startButton) {
  startButton.addEventListener("click", (event) => {
    event.preventDefault();
    startTest();
  });
}

// Odkazy z katalogu mohou ukazovat na #test.
// Zachováme i spuštění kliknutím na takový odkaz.
document.querySelectorAll('a[href="#test"]').forEach((link) => {
  if (link.id === "start-button") return;

  link.addEventListener("click", (event) => {
    event.preventDefault();
    startTest();
  });
});

const CEREBRIO_CALIBRATION = {
  version: "pilot-10-friends-v1",
  sampleSize: 10,
  meanScore: 22.1,
  standardDeviation: 4.23,
  targetMean: 100,
  targetSD: 15,
  minScore: 55,
  maxScore: 145
};

function calculateCerebrioScore(score, totalQuestions) {
  if (
    !Number.isFinite(score) ||
    !Number.isFinite(totalQuestions) ||
    totalQuestions <= 0
  ) {
    throw new Error("Neplatný výsledek testu.");
  }

  // Přepočet na test o 30 otázkách.
  const normalizedScore = (score / totalQuestions) * 30;

  const z =
    (normalizedScore - CEREBRIO_CALIBRATION.meanScore) /
    CEREBRIO_CALIBRATION.standardDeviation;

  const rawScore =
    CEREBRIO_CALIBRATION.targetMean +
    CEREBRIO_CALIBRATION.targetSD * z;

  const cerebrioScore = Math.round(
    Math.max(
      CEREBRIO_CALIBRATION.minScore,
      Math.min(CEREBRIO_CALIBRATION.maxScore, rawScore)
    )
  );

  return {
    score: cerebrioScore,
    type: "experimental",
    calibrationVersion: CEREBRIO_CALIBRATION.version,
    calibrationSampleSize: CEREBRIO_CALIBRATION.sampleSize
  };
}
