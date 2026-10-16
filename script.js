
"use strict";

const questions = [
  {
    category: "Logické a matematické uvažování",
    question: "Pět stejných strojů vyrobí pět součástek za pět minut. Za jak dlouho vyrobí 100 strojů 100 součástek?",
    answers: ["1 minutu", "5 minut", "20 minut", "100 minut"],
    correct: 1,
    explanation: "Každý stroj vyrobí jednu součástku za pět minut. Sto strojů proto současně vyrobí sto součástek za pět minut."
  },
  {
    category: "Logické a matematické uvažování",
    question: "Otec je nyní čtyřikrát starší než syn. Za 20 let bude dvakrát starší než syn. Kolik je jim nyní let?",
    answers: ["Syn 5, otec 20 let", "Syn 10, otec 40 let", "Syn 15, otec 60 let", "Syn 20, otec 80 let"],
    correct: 1,
    explanation: "Označíme věk syna x. Platí 4x + 20 = 2(x + 20), tedy x = 10. Synovi je 10 a otci 40 let."
  },
  {
    category: "Logické a matematické uvažování",
    question: "V závodě předběhneš běžce, který je právě na druhém místě. Na kterém místě jsi nyní?",
    answers: ["Na prvním", "Na druhém", "Na třetím", "Na posledním"],
    correct: 1,
    explanation: "Přebíráš pozici běžce, kterého jsi předběhl/a, tedy druhé místo."
  },
  {
    category: "Logické a matematické uvažování",
    question: "První trubka naplní nádrž za 6 hodin, druhá za 4 hodiny a odtok ji vyprázdní za 12 hodin. Za jak dlouho se nádrž naplní při současném otevření všech tří?",
    answers: ["2 hodiny", "3 hodiny", "4 hodiny", "6 hodin"],
    correct: 1,
    explanation: "Výsledná rychlost je 1/6 + 1/4 − 1/12 = 1/3 nádrže za hodinu. Naplnění trvá 3 hodiny."
  },
  {
    category: "Logické a matematické uvažování",
    question: "Tři krabice jsou označeny Jablka, Hrušky a Směs. Všechny štítky jsou chybné. Z které krabice máš vytáhnout jeden kus ovoce, abys mohl/a určit všechny obsahy?",
    answers: ["Z krabice Jablka", "Z krabice Hrušky", "Z krabice Směs", "Záleží na štítcích, nelze určit"],
    correct: 2,
    explanation: "Krabice označená Směs nemůže obsahovat směs. Vytáhnuté ovoce určí její skutečný obsah. Zbývající krabice pak určíš pomocí podmínky, že žádný štítek není správný."
  },
  {
    category: "Logické a matematické uvažování",
    question: "Kolikrát se během 24 hodin přesně překryje hodinová a minutová ručička?",
    answers: ["12krát", "22krát", "24krát", "48krát"],
    correct: 1,
    explanation: "Za 12 hodin se ručičky překryjí 11krát, takže za 24 hodin 22krát."
  },
  {
    category: "Logické a matematické uvažování",
    question: "Počet mincí dává při dělení 2, 3, 4, 5 i 6 vždy zbytek 1. Je zároveň dělitelný 7. Jaký je nejmenší kladný počet?",
    answers: ["121", "181", "301", "421"],
    correct: 2,
    explanation: "Počet je o jednu větší než násobek nejmenšího společného násobku 2, 3, 4, 5 a 6, tedy 60. Nejmenší vhodné číslo je 301, protože 300 je dělitelné 7."
  },
  {
    category: "Logické a matematické uvažování",
    question: "Cyklista jede 60 km rychlostí 30 km/h a stejnou trasou zpět rychlostí 60 km/h. Jaká je průměrná rychlost za celou cestu?",
    answers: ["30 km/h", "40 km/h", "45 km/h", "50 km/h"],
    correct: 1,
    explanation: "Cesta tam trvá 2 hodiny a zpět 1 hodinu. Celkem ujede 120 km za 3 hodiny, tedy průměrně 40 km/h."
  },
  {
    category: "Logické a matematické uvažování",
    question: "Každá dívka má stejný počet bratrů jako sester. Každý chlapec má dvakrát tolik sester jako bratrů. Kolik je v rodině chlapců a dívek?",
    answers: ["2 chlapci a 3 dívky", "3 chlapci a 4 dívky", "4 chlapci a 3 dívky", "4 chlapci a 5 dívek"],
    correct: 1,
    explanation: "Při třech chlapcích a čtyřech dívkách má každá dívka tři bratry a tři sestry. Každý chlapec má čtyři sestry a dva bratry."
  },
  {
    category: "Logické a matematické uvažování",
    question: "Pacient má užít tři tablety: první ihned a další vždy přesně 30 minut po předchozí. První užije v 10:00. Kdy užije poslední?",
    answers: ["10:30", "11:00", "11:30", "12:00"],
    correct: 1,
    explanation: "Tablety užije v 10:00, 10:30 a 11:00."
  },
  {
    category: "Kombinatorika a vícekroková logika",
    question: "V turnaji hraje každý tým s každým právě jednou. Celkem se odehrálo 66 zápasů. Kolik týmů se účastnilo?",
    answers: ["11", "12", "13", "14"],
    correct: 1,
    explanation: "Počet zápasů je n(n−1)/2 = 66. Odtud n(n−1) = 132, a tedy n = 12."
  },
  {
    category: "Kombinatorika a vícekroková logika",
    question: "Z devíti stejně vypadajících mincí je jedna lehčí. Kolik nejméně vážení na rovnoramenných vahách zaručí její nalezení?",
    answers: ["1", "2", "3", "4"],
    correct: 1,
    explanation: "Rozděl mince na tři skupiny po třech. Prvním vážením určíš skupinu s lehčí mincí, druhým vybereš konkrétní minci ze tří."
  },
  {
    category: "Kombinatorika a vícekroková logika",
    question: "Dva otcové a dva synové jdou na ryby. Každý chytí jednu rybu, ale domů si přinesou jen tři ryby. Jak je to možné?",
    answers: ["Jeden chytil dvě ryby", "Jsou to tři lidé: dědeček, otec a syn", "Jeden rybu pustil", "Jeden člověk se počítá dvakrát omylem"],
    correct: 1,
    explanation: "Dědeček, jeho syn a vnuk jsou tři lidé. Prostřední osoba je zároveň synem i otcem."
  },
  {
    category: "Kombinatorika a vícekroková logika",
    question: "Třímístný kód má součet číslic 15. První číslice je dvojnásobkem poslední a prostřední je o 3 větší než poslední. Jaký je kód?",
    answers: ["663", "633", "963", "552"],
    correct: 0,
    explanation: "Označíme poslední číslici x. Součet je 2x + (x + 3) + x = 15, tedy x = 3. Kód je 663."
  },
  {
    category: "Kombinatorika a vícekroková logika",
    question: "Máš 25 koní, dráhu pro maximálně 5 koní a žádné stopky. Jaký nejmenší počet závodů stačí k určení tří nejrychlejších koní?",
    answers: ["5", "6", "7", "8"],
    correct: 2,
    explanation: "Pět závodů rozdělí koně do skupin, šestý porovná vítěze skupin. Po vyřazení koní, kteří už nemohou být v první trojici, rozhodne sedmý závod o zbývajících kandidátech."
  },
  {
    category: "Kombinatorika a vícekroková logika",
    question: "V sáčku jsou 4 červené a 6 modrých kuliček. Vytáhneš dvě bez vracení. Jaká je pravděpodobnost, že budou stejné barvy?",
    answers: ["2/5", "7/15", "1/2", "3/5"],
    correct: 1,
    explanation: "Příznivých dvojic je C(4,2) + C(6,2) = 6 + 15 = 21. Všech dvojic je C(10,2) = 45. Pravděpodobnost je 21/45 = 7/15."
  },
  {
    category: "Kombinatorika a vícekroková logika",
    question: "Když ke druhé mocnině kladného celého čísla přičteš toto číslo a 12, dostaneš 42. Jaké je číslo?",
    answers: ["4", "5", "6", "7"],
    correct: 1,
    explanation: "Rovnice x² + x + 12 = 42 se upraví na x² + x − 30 = 0. Kladné celočíselné řešení je 5."
  },
  {
    category: "Kombinatorika a vícekroková logika",
    question: "Čtyři lidé přecházejí v noci most s jednou baterkou. Jejich časy jsou 1, 2, 7 a 10 minut. Přecházet mohou nejvýše dva a dvojice jde rychlostí pomalejšího. Jaký je nejkratší čas?",
    answers: ["15 minut", "17 minut", "19 minut", "20 minut"],
    correct: 1,
    explanation: "Přejdou 1 a 2 (2 min), vrátí se 1 (1), přejdou 7 a 10 (10), vrátí se 2 (2), nakonec přejdou 1 a 2 (2). Celkem 17 minut."
  },
  {
    category: "Kombinatorika a vícekroková logika",
    question: "Tříciferné číslo má číslice v přísně klesajícím pořadí. Jejich součet je 18 a původní číslo je o 396 větší než obrácené. Jaké je číslo?",
    answers: ["864", "873", "951", "963"],
    correct: 0,
    explanation: "Rozdíl čísla a jeho obrácené podoby je 99krát rozdíl krajních číslic. Platí 99(a−c) = 396, tedy a−c = 4. Se součtem 18 a klesajícím pořadím vychází 864."
  },
  {
    category: "Kombinatorika a vícekroková logika",
    question: "Na ostrově každý vždy mluví pravdu, nebo vždy lže. A řekne: „Oba jsme lháři.“ Jaký je A a jaký B?",
    answers: ["Oba pravdomluvní", "A pravdomluvný, B lhář", "A lhář, B pravdomluvný", "Oba lháři"],
    correct: 2,
    explanation: "A nemůže mluvit pravdu, protože pak by byl lhářem, což je rozpor. A tedy lže. Výrok „oba jsme lháři“ je nepravdivý, takže B je pravdomluvný."
  },
  {
    category: "Pokročilé analytické myšlení",
    question: "Osm žáků rozdělíš do dvou rozlišitelných skupin A a B. Každá skupina musí mít alespoň jednoho člena. Kolik rozdělení existuje?",
    answers: ["128", "254", "256", "512"],
    correct: 1,
    explanation: "Každý žák může být v A nebo B, což dává 2⁸ = 256 možností. Odečteme dvě možnosti, kdy jsou všichni v jedné skupině. Zbývá 254."
  },
  {
    category: "Pokročilé analytické myšlení",
    question: "Jaký je menší úhel mezi hodinovou a minutovou ručičkou ve 3:15?",
    answers: ["0°", "7,5°", "15°", "30°"],
    correct: 1,
    explanation: "Minutová ručička je na 90°. Hodinová je na 3 × 30° + 15 × 0,5° = 97,5°. Rozdíl je 7,5°."
  },
  {
    category: "Pokročilé analytické myšlení",
    question: "V devíti z deseti pytlů váží každá mince 10 g, v jednom 9 g. Jak pomocí jediného vážení digitální váhou najdeš lehčí pytel?",
    answers: [
      "Zvážíš jednu minci z každého pytle",
      "Z prvního pytle vezmeš 1 minci, z druhého 2 a tak dále; chybějící gramy určí pytel",
      "Vážíš postupně poloviny pytlů",
      "Jedním vážením to nelze"
    ],
    correct: 1,
    explanation: "Vezmi 1 až 10 mincí z jednotlivých pytlů. Normální hmotnost je 550 g. Rozdíl mezi 550 g a naměřenou hmotností udá číslo pytle s devítigramovými mincemi."
  },
  {
    category: "Pokročilé analytické myšlení",
    question: "Za dveřmi je žárovka ovládaná jedním ze tří vypínačů. Dveře smíš otevřít jednou a žárovka se zahřívá. Jak určíš správný vypínač?",
    answers: [
      "Zapneš všechny vypínače",
      "Jeden vypínač necháš chvíli zapnutý a vypneš ho, druhý zapneš a otevřeš dveře",
      "Vypínače přepínáš náhodně",
      "Zhasnutou žárovku nelze rozlišit"
    ],
    correct: 1,
    explanation: "Pokud žárovka svítí, ovládá ji druhý vypínač. Pokud nesvítí, ale je teplá, jde o první. Pokud nesvítí a je studená, jde o třetí."
  },
  {
    category: "Pokročilé analytické myšlení",
    question: "Sto dveří je zpočátku zavřených. V kole n přepneš každé n-té dveře. Kolik dveří zůstane otevřených po 100 kolech?",
    answers: ["9", "10", "25", "50"],
    correct: 1,
    explanation: "Dveře se přepnou lichý početkrát pouze tehdy, když mají lichý počet dělitelů. To platí pro dokonalé čtverce 1, 4, 9, …, 100. Takových čísel je 10."
  },
  {
    category: "Pokročilé analytické myšlení",
    question: "Součin věků tří dětí je 36. Pozorovatel zná jejich součet, ale přesto nedokáže věk určit. Poté zjistí, že nejstarší dítě je jediné nejstarší. Jaké jsou věky?",
    answers: ["1, 6 a 6 let", "2, 2 a 9 let", "3, 3 a 4 roky", "1, 3 a 12 let"],
    correct: 1,
    explanation: "Při součtu 13 připadají v úvahu trojice (1, 6, 6) a (2, 2, 9). Informace o jediném nejstarším dítěti vylučuje první možnost. Věky jsou 2, 2 a 9 let."
  },
  {
    category: "Pokročilé analytické myšlení",
    question: "Najdi všechny uspořádané dvojice kladných celých čísel x, y, pro která platí x + y = xy − 1.",
    answers: [
      "(1, 1)",
      "(2, 3) a (3, 2)",
      "(1, 2) a (2, 1)",
      "(3, 3)"
    ],
    correct: 1,
    explanation: "Úpravou rovnice dostaneme xy − x − y = 1, tedy (x−1)(y−1) = 2. Kladné celočíselné rozklady dvojky dávají dvojice (2, 3) a (3, 2)."
  },
  {
    category: "Pokročilé analytické myšlení",
    question: "Z 1 000 lahví je právě jedna otrávená. Máš 10 testovacích proužků a pouze jedno kolo testování. Jak láhev identifikuješ?",
    answers: [
      "Otestuješ každou láhev zvlášť",
      "Rozdělíš lahve na deset skupin",
      "Přiřadíš lahvím binární kódy a každý proužek otestuje odpovídající bit",
      "Deset proužků nestačí"
    ],
    correct: 2,
    explanation: "Deset binárních bitů rozlišuje 2¹⁰ = 1024 kombinací. Každý proužek testuje lahve, u kterých je odpovídající bit 1. Vzorec změněných proužků identifikuje otrávenou láhev."
  },
  {
    category: "Pokročilé analytické myšlení",
    question: "Z klasické šachovnice 8 × 8 odstraníš dvě protilehlá rohová pole. Lze zbylých 62 polí pokrýt 31 dominovými kameny?",
    answers: [
      "Ano, vždy",
      "Ano, pokud se začíná od rohu",
      "Ne, protože zůstane nerovný počet černých a bílých polí",
      "Ne, protože 62 není dělitelné čtyřmi"
    ],
    correct: 2,
    explanation: "Protilehlé rohy mají stejnou barvu. Po jejich odstranění zůstane 30 polí jedné barvy a 32 druhé. Každé domino pokrývá jedno pole každé barvy, takže pokrytí není možné."
  },
  {
    category: "Pokročilé analytické myšlení",
    question: "Máš nádoby o objemu 8, 5 a 3 litry. Začínáš se stavem (8, 0, 0). Která posloupnost přelití skončí přesně se 4 litry v osmilitrové a 4 litry v pětilitrové nádobě?",
    answers: [
      "(8,0,0) → (3,5,0) → (3,2,3) → (6,2,0) → (6,0,2) → (1,5,2) → (1,4,3) → (4,4,0)",
      "(8,0,0) → (5,3,0) → (4,4,0)",
      "(8,0,0) → (0,5,3) → (4,4,0)",
      "Požadovaného stavu nelze dosáhnout"
    ],
    correct: 0,
    explanation: "Postupně přelévej: (8,0,0) → (3,5,0) → (3,2,3) → (6,2,0) → (6,0,2) → (1,5,2) → (1,4,3) → (4,4,0). Výsledný stav má 4 litry v první a 4 litry ve druhé nádobě."
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

if (progressTrack) {
  progressTrack.setAttribute("aria-valuemax", String(questions.length));
}

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return String(minutes).padStart(2, "0") + ":" +
    String(seconds).padStart(2, "0");
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

  nextButton.textContent =
    currentQuestion === questions.length - 1
      ? "Zobrazit výsledek"
      : "Další otázka →";

  progressFill.style.width =
    `${(currentQuestion / questions.length) * 100}%`;

  progressTrack.setAttribute(
    "aria-valuenow",
    String(currentQuestion)
  );

  item.answers.forEach((answerText, index) => {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "answer";
    button.textContent =
      `${String.fromCharCode(65 + index)}. ${answerText}`;

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
    feedback.textContent =
      `Nesprávně. Správná odpověď je ` +
      `${String.fromCharCode(65 + item.correct)}. ` +
      `${item.answers[item.correct]}`;

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
  if (finished) return;

  finished = true;

  // Zastavení časomíry a zaznamenání výsledného času
  if (timerInterval !== null) {
    clearInterval(timerInterval);
    timerInterval = null;
  }

  const totalQuestions = questions.length;
  const elapsedSeconds = getElapsedSeconds();
  const accuracy = totalQuestions > 0
    ? score / totalQuestions
    : 0;

  // Skóre za správnost
  const accuracyScore = Math.pow(accuracy, 1.2);

  // Skóre za rychlost
  const timeMinutes = Math.max(elapsedSeconds / 60, 0.1);
  const speedScore = Math.exp(-timeMinutes / 25);

  // Kombinace správnosti a rychlosti
  const combinedScore =
    0.8 * accuracyScore +
    0.2 * speedScore;

  // Výsledné skóre v rozsahu 40–250 CIQ
  const ciq = Math.min(
    250,
    Math.max(40, Math.round(40 + 210 * combinedScore))
  );

  // Zobrazení výsledků
  resultScore.textContent = `${ciq} CIQ`;

  document.querySelector("#result-correct").textContent =
    `${score} / ${totalQuestions}`;

  resultTime.textContent = formatTime(elapsedSeconds);

  resultMessage.textContent =
    "Tvé CerebrIQ skóre kombinuje správnost odpovědí a rychlost řešení. " +
    "Bodovací systém je experimentální a výsledek není skutečně změřené IQ.";

  // Přepnutí obrazovek
  quizScreen.hidden = true;
  resultScreen.hidden = false;
}


startButton.addEventListener("click", startTest);
nextButton.addEventListener("click", nextQuestion);
restartButton.addEventListener("click", startTest);
