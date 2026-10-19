
const SUPABASE_URL = "https://wecdhuqrfotybypnszxi.supabase.co";
const SUPABASE_KEY = "sb_publishable_1AF0NrMIx7oUMT3jy4lJbQ_LqrMD1nC";

const db = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

const $ = (id) => document.getElementById(id);

function setStatus(message) {
  const status = $("profile-status");
  if (status) status.textContent = message;
}

function formatTime(seconds) {
  if (typeof seconds !== "number" || !Number.isFinite(seconds)) {
    return "—";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.round(seconds % 60);

  return `${minutes} min ${remainingSeconds} s`;
}

function formatDate(value) {
  return new Date(value).toLocaleString("cs-CZ", {
    dateStyle: "medium",
    timeStyle: "short"
  });
}

function showHistory(results) {
  const history = $("profile-history");
  if (!history) return;

  history.replaceChildren();

  results.forEach((result) => {
    const item = document.createElement("li");
    const date = document.createElement("span");
    const score = document.createElement("strong");

    date.textContent = formatDate(result.created_at);
    score.textContent = `${result.score} CIQ`;

    item.append(date, score);
    history.appendChild(item);
  });
}

async function loadProfile() {
  try {
    if (!window.supabase) {
      throw new Error("Knihovna Supabase není načtena.");
    }

    setStatus("Ověřuji přihlášení…");

    const {
      data: { session },
      error: sessionError
    } = await db.auth.getSession();

    if (sessionError) throw sessionError;

    if (!session) {
      setStatus("Pro zobrazení osobního profilu se přihlas.");
      return;
    }

    const user = session.user;

    const name =
      user.user_metadata?.full_name ||
      user.user_metadata?.name ||
      user.email ||
      "Můj profil";

    if ($("profile-name")) {
      $("profile-name").textContent = name;
    }

    setStatus("Načítám výsledky testů…");

    const { data, error } = await db
      .from("cerebriq_results")
      .select("id, score, total_questions, answers, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) throw error;

    if (!data || data.length === 0) {
      if ($("profile-score")) $("profile-score").textContent = "— CIQ";
      if ($("profile-date")) $("profile-date").textContent = "Zatím bez výsledku";
      if ($("profile-correct")) $("profile-correct").textContent = "—";
      if ($("profile-time")) $("profile-time").textContent = "—";

      showHistory([]);

      setStatus("Zatím nemáš uložený žádný test. Dokonči CerebrIQ a výsledek se zde objeví.");
      return;
    }

    const latest = data[0];
    const answers = latest.answers || {};

    if ($("profile-score")) {
      $("profile-score").textContent = `${latest.score} CIQ`;
    }

    if ($("profile-date")) {
      $("profile-date").textContent = formatDate(latest.created_at);
    }

    if ($("profile-correct")) {
      $("profile-correct").textContent =
        typeof answers.correct_answers === "number"
          ? `${answers.correct_answers} / ${latest.total_questions}`
          : `— / ${latest.total_questions}`;
    }

    if ($("profile-time")) {
      $("profile-time").textContent =
        typeof answers.elapsed_seconds === "number"
          ? formatTime(answers.elapsed_seconds)
          : "—";
    }

    showHistory(data);
    setStatus(`Počet uložených testů: ${data.length}`);
  } catch (error) {
    console.error("Chyba profilu:", error);
    setStatus("Profil se nepodařilo načíst. Obnov stránku a zkus to znovu.");
  }
}

document.addEventListener("DOMContentLoaded", loadProfile);
