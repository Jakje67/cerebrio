
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
    category: "Logické a matematické uvažování",
    level: "Lehká",
    question: "Pět stejných strojů vyrobí pět součástek za pět minut. Za jak dlouho vyrobí 100 těchto strojů 100 součástek?",
    detail: "Předpokládej, že všechny stroje pracují stejným tempem a nezávisle na sobě.",
    answers: ["5 minut", "20 minut", "100 minut", "1 minuta"],
    correct: 0,
    explanation: "Jeden stroj vyrobí jednu součástku za 5 minut. Sto strojů proto současně vyrobí 100 součástek také za 5 minut."
  },
  {
    category: "Logické a matematické uvažování",
    level: "Lehká",
    question: "Otec je nyní čtyřikrát starší než syn. Za 20 let bude dvakrát starší než syn. Kolik let je nyní otci a synovi?",
    detail: "Věk obou osob vyjádři pomocí jedné proměnné a sestav rovnici.",
    answers: [
      "Otec 40 let, syn 10 let",
      "Otec 48 let, syn 12 let",
      "Otec 60 let, syn 15 let",
      "Otec 36 let, syn 9 let"
    ],
    correct: 0,
    explanation: "Označme věk syna x. Otec má 4x let. Platí 4x + 20 = 2(x + 20), takže x = 10. Otec má 40 let."
  },
  {
    category: "Logické a matematické uvažování",
    level: "Lehká",
    question: "V běžeckém závodě předběhneš běžce, který je právě na druhém místě. Na kterém místě se nacházíš po předběhnutí?",
    detail: "Předpokládej, že předběhnutí proběhlo správně a nikdo další tě mezitím nepředběhl.",
    answers: ["Na prvním místě", "Na druhém místě", "Na třetím místě", "Na posledním místě"],
    correct: 1,
    explanation: "Převezmeš pozici běžce, kterého jsi předběhl. Nacházíš se tedy na druhém místě."
  },
  {
    category: "Logické a matematické uvažování",
    level: "Střední",
    question: "První trubka naplní prázdnou nádrž za 6 hodin, druhá za 4 hodiny. Odtok by plnou nádrž vyprázdnil za 12 hodin. Za jak dlouho se nádrž naplní, pokud jsou všechny tři současně otevřené?",
    detail: "Předpokládej konstantní průtok všech trubek i odtoku.",
    answers: ["2 hodiny", "3 hodiny", "4 hodiny", "6 hodin"],
    correct: 1,
    explanation: "Za hodinu přiteče 1/6 + 1/4 nádrže a odteče 1/12. Výsledná rychlost je 1/3 nádrže za hodinu, takže naplnění trvá 3 hodiny."
  },
  {
    category: "Logické a matematické uvažování",
    level: "Střední",
    question: "Tři krabice obsahují pouze jablka, pouze hrušky a směs obojího. Všechny štítky jsou chybné. Smíš vytáhnout jeden kus ovoce z jediné krabice. Jak určíš obsah všech krabic?",
    detail: "Každý štítek označuje jiný obsah: „Jablka“, „Hrušky“ a „Směs“.",
    answers: [
      "Vytáhnu ovoce z krabice označené „Směs“",
      "Vytáhnu ovoce z krabice označené „Jablka“",
      "Vytáhnu ovoce z krabice označené „Hrušky“",
      "Bez otevření všech krabic to nelze"
    ],
    correct: 0,
    explanation: "Krabice označená „Směs“ nemůže obsahovat směs. Jediný vytažený kus určí její skutečný obsah a díky chybným štítkům lze následně určit i zbývající krabice."
  },
  {
    category: "Logické a matematické uvažování",
    level: "Střední",
    question: "Kolikrát se během jednoho přesného 24hodinového intervalu překryje hodinová a minutová ručička?",
    detail: "Počítej interval od jedné půlnoci do následující půlnoci a stejný krajní okamžik nezapočítávej dvakrát.",
    answers: ["12krát", "22krát", "24krát", "44krát"],
    correct: 1,
    explanation: "Za 12 hodin se minutová ručička překryje s hodinovou 11krát. Za 24 hodin je to 22 překrytí."
  },
  {
    category: "Logické a matematické uvažování",
    level: "Střední",
    question: "Pokladník má kladný počet mincí. Při rozdělení do skupin po 2, 3, 4, 5 nebo 6 mincích mu pokaždé zbude jedna mince. Při rozdělení po 7 nezbude žádná. Jaký je nejmenší možný počet mincí?",
    detail: "Hledej číslo, které je o jednu větší než násobek 60 a zároveň je dělitelné sedmi.",
    answers: ["121", "181", "301", "421"],
    correct: 2,
    explanation: "Počet mincí musí být kongruentní s 1 modulo 60 a zároveň dělitelný 7. Nejmenší kladné číslo splňující obě podmínky je 301."
  },
  {
    category: "Logické a matematické uvažování",
    level: "Střední",
    question: "Cyklista ujede 60 km rychlostí 30 km/h a stejnou trasou se vrátí rychlostí 60 km/h. Jaká je jeho průměrná rychlost za celou cestu?",
    detail: "Průměrná rychlost je celková vzdálenost dělená celkovým časem.",
    answers: ["40 km/h", "45 km/h", "50 km/h", "30 km/h"],
    correct: 0,
    explanation: "Cesta tam trvá 2 hodiny a zpět 1 hodinu. Celkem ujede 120 km za 3 hodiny, tedy průměrně 40 km/h."
  },
  {
    category: "Logické a matematické uvažování",
    level: "Střední",
    question: "Každá dívka v rodině má stejný počet bratrů jako sester. Každý chlapec má dvakrát tolik sester jako bratrů. Kolik je v rodině chlapců a dívek?",
    detail: "Všichni sourozenci mají stejné rodiče a nikdo další v rodině není.",
    answers: [
      "3 chlapci a 4 dívky",
      "4 chlapci a 3 dívky",
      "2 chlapci a 3 dívky",
      "3 chlapci a 3 dívky"
    ],
    correct: 0,
    explanation: "Při třech chlapcích a čtyřech dívkách má každá dívka tři bratry a tři sestry. Každý chlapec má čtyři sestry a dva bratry."
  },
  {
    category: "Logické a matematické uvažování",
    level: "Lehká",
    question: "Pacient má užít tři tablety. První užije ihned a každou další přesně 30 minut po předchozí. První tabletu užije v 10:00. Kdy užije poslední?",
    detail: "Mezi třemi tabletami jsou pouze dva časové intervaly.",
    answers: ["10:30", "11:00", "11:30", "12:00"],
    correct: 1,
    explanation: "První tableta je v 10:00, druhá v 10:30 a třetí v 11:00."
  },
  {
    category: "Kombinatorika a vícekroková logika",
    level: "Střední",
    question: "V turnaji hraje každý tým s každým jiným týmem právě jeden zápas. Odehrálo se celkem 66 zápasů. Kolik týmů se zúčastnilo?",
    detail: "Každý zápas tvoří dvojice různých týmů.",
    answers: ["11", "12", "13", "14"],
    correct: 1,
    explanation: "Počet zápasů je n(n − 1)/2. Z rovnice n(n − 1)/2 = 66 vyjde n = 12."
  },
  {
    category: "Kombinatorika a vícekroková logika",
    level: "Střední",
    question: "Máš 9 mincí, z nichž jedna je lehčí než ostatní. Kolikrát nejméně musíš použít rovnoramenné váhy, abys lehčí minci zaručeně našel?",
    detail: "Váhy ukážou, která strana je lehčí, nebo zda jsou obě strany stejně těžké.",
    answers: ["1 vážení", "2 vážení", "3 vážení", "4 vážení"],
    correct: 1,
    explanation: "Rozděl mince na tři skupiny po třech. Prvním vážením určíš skupinu s lehčí mincí, druhým vážením najdeš konkrétní minci."
  },
  {
    category: "Kombinatorika a vícekroková logika",
    level: "Lehká",
    question: "Dva otcové a dva synové jdou na ryby. Každý chytí jednu rybu, ale domů si přinesou celkem jen tři ryby, jednu na osobu. Jak je to možné?",
    detail: "Počet rolí v rodině nemusí odpovídat počtu osob.",
    answers: [
      "Jsou tři lidé: dědeček, otec a syn",
      "Jeden člověk chytil dvě ryby",
      "Jeden člověk rybu nechytí",
      "Jsou to čtyři lidé, ale jedna ryba se nepočítá"
    ],
    correct: 0,
    explanation: "Dědeček je otcem svého syna a tento syn je zároveň otcem třetí osoby. Jsou tedy tři lidé, ale dvě osoby zastávají roli otce a dvě roli syna."
  },
  {
    category: "Kombinatorika a vícekroková logika",
    level: "Střední",
    question: "Trezor má třímístný kód. Součet číslic je 15. První číslice je dvojnásobkem poslední a prostřední číslice je o 3 větší než poslední. Jaký je kód?",
    detail: "Všechny číslice jsou celá čísla od 0 do 9 a první číslice nesmí být nula.",
    answers: ["663", "636", "963", "753"],
    correct: 0,
    explanation: "Označme poslední číslici x. Číslice jsou 2x, x + 3 a x. Jejich součet je 4x + 3 = 15, takže x = 3. Kód je 663."
  },
  {
    category: "Kombinatorika a vícekroková logika",
    level: "Těžká",
    question: "Máš 25 koní, závodní dráhu pro maximálně 5 koní a žádné stopky. Každý kůň běhá stále stejnou rychlostí. Jaký je nejmenší počet závodů potřebný k určení tří nejrychlejších koní?",
    detail: "V každém závodě může běžet nejvýše pět koní. Znáš pouze pořadí v cíli, nikoli přesné časy.",
    answers: ["5 závodů", "6 závodů", "7 závodů", "8 závodů"],
    correct: 2,
    explanation: "Pět závodů rozdělí koně do skupin. Šestý závod porovná vítěze skupin. Podle pořadí vítězů lze vyřadit koně, kteří už nemohou být v první trojici. Sedmý závod rozhodne mezi zbývajícími kandidáty."
  },
  {
    category: "Kombinatorika a vícekroková logika",
    level: "Střední",
    question: "V sáčku jsou 4 červené a 6 modrých kuliček. Náhodně vytáhneš dvě kuličky bez vracení. Jaká je pravděpodobnost, že budou mít stejnou barvu?",
    detail: "Všechny kuličky mají stejnou pravděpodobnost vytažení.",
    answers: ["7/15", "2/5", "1/2", "3/5"],
    correct: 0,
    explanation: "Stejnou barvu mají dvojice dvou červených nebo dvou modrých kuliček. Je jich C(4,2) + C(6,2) = 21. Všech dvojic je C(10,2) = 45. Pravděpodobnost je 21/45 = 7/15."
  },
  {
    category: "Kombinatorika a vícekroková logika",
    level: "Střední",
    question: "Když ke druhé mocnině kladného celého čísla přičteš toto číslo a následně 12, dostaneš 42. Jaké je původní číslo?",
    detail: "Hledané číslo je kladné celé číslo.",
    answers: ["4", "5", "6", "7"],
    correct: 1,
    explanation: "Platí x² + x + 12 = 42, tedy x² + x − 30 = 0. Rozklad dává (x + 6)(x − 5) = 0. Kladné řešení je 5."
  },
  {
    category: "Kombinatorika a vícekroková logika",
    level: "Těžká",
    question: "Čtyři lidé musí přejít most za tmy. Mají jednu baterku a najednou mohou jít maximálně dva. Dvojice jde rychlostí pomalejšího člověka. Jejich časy jsou 1, 2, 7 a 10 minut. Jaký je nejkratší celkový čas?",
    detail: "Baterku musí mít každý, kdo přechází. Pokud se někdo vrací, musí ji vzít s sebou.",
    answers: ["15 minut", "17 minut", "19 minut", "20 minut"],
    correct: 1,
    explanation: "Přejdou osoby 1 a 2 (2 minuty), osoba 1 se vrátí (1), osoby 7 a 10 přejdou (10), osoba 2 se vrátí (2) a osoby 1 a 2 přejdou (2). Celkem 17 minut."
  },
  {
    category: "Kombinatorika a vícekroková logika",
    level: "Těžká",
    question: "Tříciferné číslo má číslice v přísně klesajícím pořadí. Součet číslic je 18. Když číslice obrátíš, původní číslo bude o 396 větší než obrácené číslo. Jaké je původní číslo?",
    detail: "Všechny číslice jsou desetinné číslice a první číslice je nenulová.",
    answers: ["864", "753", "951", "963"],
    correct: 0,
    explanation: "Rozdíl čísla a obráceného čísla je 99krát rozdíl krajních číslic. Proto 99(a − c) = 396, tedy a − c = 4. Spolu se součtem 18 a přísně klesajícím pořadím vychází 864."
  },
  {
    category: "Kombinatorika a vícekroková logika",
    level: "Střední",
    question: "Na ostrově každý člověk buď vždy mluví pravdu, nebo vždy lže. Člověk A řekne: „Oba jsme lháři.“ Jaký je A a jaký je člověk B?",
    detail: "A a B jsou dvě různé osoby a každý z nich je buď vždy pravdomluvný, nebo vždy lhář.",
    answers: [
      "A je lhář, B je pravdomluvný",
      "A je pravdomluvný, B je lhář",
      "Oba jsou pravdomluvní",
      "Oba jsou lháři"
    ],
    correct: 0,
    explanation: "Kdyby A mluvil pravdu, byl by lhářem, což je rozpor. A tedy lže. Výrok „oba jsme lháři“ je nepravdivý, a proto B musí být pravdomluvný."
  },
  {
    category: "Pokročilé analytické myšlení",
    level: "Střední",
    question: "Ve třídě je 8 žáků. Každý musí být zařazen právě do jedné ze dvou rozlišitelných skupin A a B a obě skupiny musí mít alespoň jednoho člena. Kolika způsoby lze žáky rozdělit?",
    detail: "Žáci jsou navzájem rozlišitelní a skupiny A a B mají pevně dané názvy.",
    answers: ["128", "254", "256", "510"],
    correct: 1,
    explanation: "Každý z osmi žáků má dvě možnosti, takže existuje 2⁸ = 256 rozdělení. Odečteme dvě zakázané možnosti, kdy jsou všichni ve skupině A nebo všichni ve skupině B. Zbývá 254."
  },
  {
    category: "Pokročilé analytické myšlení",
    level: "Střední",
    question: "Kolik stupňů svírají hodinová a minutová ručička ve 3:15? Hledej menší úhel mezi nimi.",
    detail: "Hodinová ručička se mezi celými hodinami plynule pohybuje.",
    answers: ["0°", "7,5°", "15°", "30°"],
    correct: 1,
    explanation: "Minutová ručička je na 90°. Hodinová ručička je ve 3:15 na 97,5°. Menší úhel je 7,5°."
  },
  {
    category: "Pokročilé analytické myšlení",
    level: "Těžká",
    question: "Máš 10 pytlů. V devíti váží každá mince 10 gramů, v jednom každá mince 9 gramů. Máš digitální váhu, kterou smíš použít pouze jednou. Jak určíš pytel s lehčími mincemi?",
    detail: "Každý pytel obsahuje dostatek mincí. Všechny mince z jednoho pytle mají stejnou hmotnost.",
    answers: [
      "Zvážím po jedné minci ze všech pytlů",
      "Z prvního pytle vezmu 1 minci, z druhého 2, až z desátého 10",
      "Zvážím deset mincí z každého pytle zvlášť",
      "Jedním vážením to nelze určit"
    ],
    correct: 1,
    explanation: "Vezmi 1, 2, 3, …, 10 mincí z jednotlivých pytlů. Normální hmotnost je 550 g. Počet gramů, které chybí, určí číslo pytle s lehčími mincemi."
  },
  {
    category: "Pokročilé analytické myšlení",
    level: "Střední",
    question: "Za zavřenými dveřmi je jedna žárovka ovládaná jedním ze tří vypínačů venku. Dveře můžeš otevřít pouze jednou. Žárovka se při svícení zahřívá. Jak zjistíš, který vypínač ji ovládá?",
    detail: "Žárovka se dostatečně zahřeje, pokud je zapnutá několik minut.",
    answers: [
      "Zapnu první vypínač, chvíli počkám, vypnu ho, zapnu druhý a otevřu dveře",
      "Zapnu všechny vypínače a otevřu dveře",
      "Postupně rychle přepnu všechny vypínače",
      "Bez otevření dveří to nelze určit"
    ],
    correct: 0,
    explanation: "Pokud žárovka svítí, ovládá ji druhý vypínač. Pokud nesvítí, ale je teplá, ovládá ji první. Pokud nesvítí a je studená, ovládá ji třetí."
  },
  {
    category: "Pokročilé analytické myšlení",
    level: "Střední",
    question: "Je zde 100 zavřených dveří. V prvním kole přepneš všechny dveře, ve druhém každé druhé, ve třetím každé třetí a tak dále až do stého kola. Kolik dveří zůstane otevřených?",
    detail: "Dveře se přepnou právě tehdy, když číslo dveří je dělitelné číslem kola.",
    answers: ["9", "10", "50", "100"],
    correct: 1,
    explanation: "Dveře se přepnou lichý početkrát pouze tehdy, když mají lichý počet dělitelů. To platí pro dokonalé druhé mocniny. Od 1² do 10² je jich 10."
  },
  {
    category: "Pokročilé analytické myšlení",
    level: "Těžká",
    question: "Součin věků tří dětí je 36. Pozorovatel zná součet jejich věků i číslo domu, ale přesto věky nedokáže určit. Poté se dozví, že nejstarší dítě je jediné nejstarší, a nyní věky určí jednoznačně. Jaké jsou jejich věky?",
    detail: "Věk každého dítěte je kladný celočíselný počet let. Jde o klasickou logickou úlohu, v níž je informace o nejednoznačnosti součtu podstatná.",
    answers: [
      "1, 6 a 6 let",
      "2, 2 a 9 let",
      "1, 4 a 9 let",
      "3, 3 a 4 roky"
    ],
    correct: 1,
    explanation: "Součin 36 má více rozkladů na tři kladná celá čísla. Při součtu 13 jsou možné trojice (1, 6, 6) a (2, 2, 9). Informace, že existuje jediné nejstarší dítě, vyloučí (1, 6, 6), takže zbývá (2, 2, 9)."
  },
  {
    category: "Pokročilé analytické myšlení",
    level: "Těžká",
    question: "Najdi všechny uspořádané dvojice kladných celých čísel x, y, pro která platí x + y = xy − 1.",
    detail: "Dvojice (x, y) a (y, x) se počítají jako dvě různá řešení, pokud x není rovno y.",
    answers: [
      "(2, 3) a (3, 2)",
      "(1, 2) a (2, 1)",
      "(2, 2) a (3, 3)",
      "Žádné řešení neexistuje"
    ],
    correct: 0,
    explanation: "Úpravou rovnice získáme xy − x − y = 1, tedy (x − 1)(y − 1) = 2. Kladné celočíselné rozklady dvojky dávají dvojice (2, 3) a (3, 2)."
  },
  {
    category: "Pokročilé analytické myšlení",
    level: "Těžká",
    question: "Z 1 000 lahví obsahuje právě jedna jed. Máš 10 testovacích proužků, které do následujícího dne změní barvu při kontaktu s jedem. Smíš provést pouze jedno kolo testování. Jak zaručeně určíš otrávenou láhev?",
    detail: "Každý proužek můžeš použít na směs vzorků z více lahví. Výsledek každého proužku je pozitivní nebo negativní.",
    answers: [
      "Rozdělím lahve na deset skupin",
      "Použiji binární kódování lahví pomocí deseti proužků",
      "Otestuji pouze prvních deset lahví",
      "Jedním kolem to nelze určit"
    ],
    correct: 1,
    explanation: "Deset proužků má 2¹⁰ = 1024 možných kombinací výsledků. Každé lahvi přiřaď jedinečné desetibitové číslo a vzorky rozděl podle jeho bitů. Výsledná kombinace identifikuje otrávenou láhev."
  },
  {
    category: "Pokročilé analytické myšlení",
    level: "Těžká",
    question: "Z šachovnice 8 × 8 odstraníš dvě diagonálně protilehlá rohová políčka. Lze zbylých 62 polí pokrýt 31 dominovými kameny, z nichž každý pokrývá dvě vodorovně nebo svisle sousedící políčka?",
    detail: "Každý dominový kámen pokrývá jedno bílé a jedno černé políčko šachovnice.",
    answers: [
      "Ano, vždy",
      "Ne, protože obě rohová políčka mají stejnou barvu",
      "Ano, ale pouze při otočení některých kamenů",
      "Nelze rozhodnout bez znalosti rozmístění kamenů"
    ],
    correct: 1,
    explanation: "Diagonálně protilehlá rohová políčka mají stejnou barvu. Po jejich odstranění zůstane 30 polí jedné barvy a 32 druhé. Každé domino pokrývá jedno pole každé barvy, takže pokrytí není možné."
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
// Uloží dokončený pokus a ponechá posledních 20 výsledků.
function saveTestResult(result) {
  const entry = {
    score: result.score,
    totalQuestions: result.totalQuestions,
    percentage: result.percentage,
    totalTimeMs: result.totalTimeMs,
    completedAt: result.completedAt,
    cerebrioScore: result.cerebrioScore,
    scoreType: result.scoreType,
    calibrationVersion: result.calibrationVersion,
    profile: result.profile,
    participant: result.participant,
    categories: result.categories
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
  age: participantProfile?.age || null,

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
      <div class="result-metric">
  <span class="metric-label">Experimentální Cerebrio skóre</span>
  <strong class="metric-value">${testResult.cerebrioScore}</strong>
</div>

<p class="fine-print">
  Experimentální index odvozený z malého pilotního vzorku.
  Nejde o standardizované IQ měření.
</p>

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

        <label for="education">Nejvyšší dokončené vzdělání (nepovinné)</label>
<select id="education" name="education">
<option value="">Nechci uvádět</option>
  <option value="zakladni">Základní</option>
  <option value="stredni_bez_maturity">Střední bez maturity</option>
  <option value="stredni_s_maturitou">Střední s maturitou</option>
  <option value="vyssi_odb">Vyšší odborné</option>
  <option value="vysokoskolske">Vysokoškolské</option>
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
  Výsledek a profilové údaje se ukládají lokálně v tomto
  prohlížeči. Na server se v této verzi neodesílají.
  Zatím neovlivňují skóre.
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
  nationality: form.elements.nationality.value.trim(),
  education: form.elements.education.value
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
  version: "pilot-v1",
  sampleSize: 10,
  meanScore: 22.1,
  standardDeviation: 4.23,
  targetMean: 100,
  targetSD: 15,
  minScore: 55,
  maxScore: 145
};


function calculateCerebrioScore(score, totalQuestions = 30) {
  if (
    !Number.isFinite(score) ||
    !Number.isFinite(totalQuestions) ||
    totalQuestions <= 0 ||
    score < 0 ||
    score > totalQuestions
  ) {
    throw new Error("Neplatný výsledek testu.");
  }

  // Přepočet na ekvivalent z 30 otázek.
  const normalizedScore = (score / totalQuestions) * 30;

  const estimatedScore =
    CEREBRIO_CALIBRATION.targetMean +
    CEREBRIO_CALIBRATION.targetSD *
      (normalizedScore - CEREBRIO_CALIBRATION.meanScore) /
      CEREBRIO_CALIBRATION.standardDeviation;

  const cerebrioScore = Math.round(
    Math.max(
      CEREBRIO_CALIBRATION.minScore,
      Math.min(CEREBRIO_CALIBRATION.maxScore, estimatedScore)
    )
  );

  return {
    score: cerebrioScore,
    type: "experimentální index",
    calibrationVersion: CEREBRIO_CALIBRATION.version,
    calibrationSampleSize: CEREBRIO_CALIBRATION.sampleSize
  };
}
