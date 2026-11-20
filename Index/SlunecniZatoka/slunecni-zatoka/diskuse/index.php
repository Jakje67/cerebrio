<?php
$dataFile = __DIR__ . '/prispevky.json';

// Výchozí příspěvky převzaté z původní stránky (použijí se jen pokud soubor ještě neexistuje)
$defaultPosts = [
    [
        'author' => 'Fík',
        'date' => '2026-11-09T20:03:08+01:00',
        'label' => '9. 11. 2026 20:03',
        'message' => 'Byl jsem tu - Fíkomas'
    ],
    [
        'author' => 'Hned',
        'date' => '2026-10-18T20:52:47+00:00',
        'label' => '18. 10. 2026 22:52',
        'message' => 'Vidím hned'
    ],
    [
        'author' => 'Jan Novak',
        'date' => '2026-10-18T20:51:14+00:00',
        'label' => '18. 10. 2026 22:51',
        'message' => 'Dobrý den, máte ještě volná místa?'
    ],
    [
        'author' => 'Test',
        'date' => '2026-10-18T20:50:25+00:00',
        'label' => '18. 10. 2026 22:50',
        'message' => 'test msg'
    ],
];

if (!file_exists($dataFile)) {
    @file_put_contents($dataFile, json_encode($defaultPosts, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}

$posts = [];
if (file_exists($dataFile)) {
    $raw = @file_get_contents($dataFile);
    $decoded = json_decode((string)$raw, true);
    if (is_array($decoded)) {
        $posts = $decoded;
    }
}

$error = '';
$success = false;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $author = trim((string)($_POST['author'] ?? ''));
    $message = trim((string)($_POST['message'] ?? ''));

    if ($author === '' || $message === '') {
        $error = 'Vyplňte prosím své jméno i text příspěvku.';
    } elseif (mb_strlen($author) > 80 || mb_strlen($message) > 2000) {
        $error = 'Jméno nebo příspěvek je příliš dlouhý.';
    } else {
        $now = new DateTime('now', new DateTimeZone('Europe/Prague'));
        array_unshift($posts, [
            'author' => $author,
            'date' => $now->format(DateTime::ATOM),
            'label' => $now->format('j. n. Y H:i'),
            'message' => $message,
        ]);

        if (@file_put_contents($dataFile, json_encode($posts, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)) !== false) {
            // Přesměrování (PRG vzor), aby se při obnovení stránky (F5) příspěvek neposílal znovu
            header('Location: ./?odeslano=1');
            exit;
        } else {
            $error = 'Nepodařilo se uložit příspěvek do souboru. Zkontrolujte oprávnění zápisu na serveru.';
        }
    }
}

if (isset($_GET['odeslano'])) {
    $success = true;
}
?>
<!DOCTYPE html>
<html lang="cs">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Diskuse – Tábor Ledeč</title>
  <link href="../assets/img/logo-favicon.png" rel="icon" type="image/png">
  <link rel="stylesheet" href="../assets/css/style.css">
</head>
<body>
  <main>
    <div>
      <h1><span>💬</span> Diskuse</h1>
      <p>
        Prostor pro dotazy rodičů, zkušenosti a tipy. Příspěvek se zobrazí hned po odeslání.
      </p>

      <?php if ($success): ?>
        <p><strong>Příspěvek byl uložen.</strong></p>
      <?php endif; ?>

      <?php if ($error !== ''): ?>
        <p><strong>Chyba:</strong> <?= htmlspecialchars($error, ENT_QUOTES, 'UTF-8') ?></p>
      <?php endif; ?>

      <div>
        <div>
          <?php foreach ($posts as $post): ?>
            <article>
              <header>
                <strong><?= htmlspecialchars((string)($post['author'] ?? ''), ENT_QUOTES, 'UTF-8') ?></strong>
                <time datetime="<?= htmlspecialchars((string)($post['date'] ?? ''), ENT_QUOTES, 'UTF-8') ?>">
                  <?= htmlspecialchars((string)($post['label'] ?? ''), ENT_QUOTES, 'UTF-8') ?>
                </time>
              </header>
              <div><?= nl2br(htmlspecialchars((string)($post['message'] ?? ''), ENT_QUOTES, 'UTF-8')) ?></div>
            </article>
          <?php endforeach; ?>
        </div>

        <aside>
          <h2>Napsat příspěvek</h2>
          <form method="post" action="">
            <p>
              <label for="author">Jméno / přezdívka</label><br>
              <input id="author" name="author" type="text" required maxlength="80" value="<?= htmlspecialchars((string)($_POST['author'] ?? ''), ENT_QUOTES, 'UTF-8') ?>">
            </p>
            <p>
              <label for="message">Příspěvek</label><br>
              <textarea id="message" name="message" rows="5" required maxlength="2000"><?= htmlspecialchars((string)($_POST['message'] ?? ''), ENT_QUOTES, 'UTF-8') ?></textarea>
            </p>
            <p>
              <button type="submit">Odeslat příspěvek</button>
            </p>
          </form>
        </aside>
      </div>

      <p><a href="../index.html">← Zpět na úvod</a></p>
    </div>
  </main>
</body>
</html>
