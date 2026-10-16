
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
    question: "Semínko je k rostlině jako vejce k…",
    detail: "Uvažuj běžný biologický vztah.",
    answers: ["Hnízdu", "Ptákovi", "Mláděti", "Peří"],
    correct: 2,
    explanation: "Ze semínka může vyrůst rostlina, z vejce se může vylíhnout mládě."
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
  const feedbackElement = testSection.querySelector("#feedback");
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

  answerButtons[question.correct].classList.add("correct");

  if (!isCorrect) {
    answerButtons[selectedIndex].classList.add("incorrect");
  }

  feedbackElement.textContent = isCorrect
    ? `Správně! ${question.explanation}`
    : `Nesprávně. ${question.explanation}`;

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

  const totalTime = endTime - startTime;
  const percentage = Math.round((score / questions.length) * 100);

  const categories = [...new Set(questions.map((question) => question.category))];

  const categorySummary = categories.map((category) => {
    const categoryQuestions = questionResults.filter(
      (result) => result.category === category
    );
    const categoryCorrect = categoryQuestions.filter(
      (result) => result.correct
    ).length;

    return {
      name: category,
      correct: categoryCorrect,
      total: categoryQuestions.length
    };
  });

  let message;

  if (score >= 27) {
    message = "Výborný výsledek! V tomto testu jsi vyřešil/a většinu úloh správně.";
  } else if (score >= 21) {
    message = "Velmi dobrý výsledek. Prokázal/a jsi silnou úspěšnost v tomto souboru úloh.";
  } else if (score >= 15) {
    message = "Solidní základ. Výsledky ukazují, ve kterých typech úloh můžeš pokračovat v tréninku.";
  } else {
    message = "Ber to jako výchozí bod. Projdi si vysvětlení a zkus test znovu.";
  }

  testSection.innerHTML = `
    <div class="section-kicker">TEST DOKONČEN</div>

    <div class="test-card result-card">
      <div class="result-symbol" aria-hidden="true">✳</div>
      <h2>Tvůj výsledek</h2>

      <p class="result-score">${score}<span> / ${questions.length}</span></p>
      <p class="result-percentage">${percentage} % úspěšnost</p>

      <div class="result-metrics">
        <div class="result-metric">
          <span class="metric-value">${formatTime(totalTime)}</span>
          <span class="metric-label">Celkový čas</span>
        </div>
        <div class="result-metric">
          <span class="metric-value">${(totalTime / 60000).toFixed(1)} min</span>
          <span class="metric-label">Doba testu</span>
        </div>
      </div>

      <div class="test-progress">
        <div class="test-progress-fill" style="width: ${percentage}%"></div>
      </div>

      <p class="feedback">${message}</p>

      <h3>Výsledky podle oblastí</h3>
      <div class="category-results">
        ${categorySummary.map((item) => `
          <div class="category-result">
            <span>${item.name}</span>
            <strong>${item.correct} / ${item.total}</strong>
          </div>
        `).join("")}
      </div>

      <p class="fine-print">
        Tento výsledek vyjadřuje pouze úspěšnost v našem procvičovacím testu.
        Není to standardizované IQ skóre ani klinické či psychologické posouzení.
        Čas závisí také na čtení, soustředění a podmínkách vyplňování.
      </p>

      <button type="button" class="primary-button" id="restart-test">
        Zkusit znovu <span aria-hidden="true">↻</span>
      </button>
    </div>
  `;

  testSection.querySelector("#restart-test").addEventListener("click", startTest);
}

function startTest() {
  stopTimer();
  currentQuestion = 0;
  score = 0;
  answered = false;
  questionResults = [];

  renderQuestion();
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
