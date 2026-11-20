<?php
$dataFile = __DIR__ . '/prispevky.json';

$defaultPosts = [
    [
        'id' => 'p-d2026110920030861',
        'author' => 'Fík',
        'date' => '2026-11-09T20:03:08+01:00',
        'label' => '9. 11. 2026 20:03',
        'message' => 'Byl jsem tu - Fíkomas'
    ],
    [
        'id' => 'p-dnow',
        'author' => 'Hned',
        'date' => '2026-10-18T20:52:47+00:00',
        'label' => '18. 10. 2026 22:52',
        'message' => 'Vidím hned'
    ],
    [
        'id' => 'p-d2026101820511411',
        'author' => 'Jan Novak',
        'date' => '2026-10-18T20:51:14+00:00',
        'label' => '18. 10. 2026 22:51',
        'message' => 'Dobrý den, máte ještě volná místa?'
    ],
    [
        'id' => 'p-test1',
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
$success = isset($_GET['odeslano']);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $honeypot = trim((string)($_POST['fax_number_hp'] ?? ''));
    $author = trim((string)($_POST['name'] ?? ''));
    $email = trim((string)($_POST['email'] ?? ''));
    $message = trim((string)($_POST['message'] ?? ''));
    $gdpr = isset($_POST['gdpr']) && $_POST['gdpr'] === '1';

    if ($honeypot !== '') {
        header('Location: ./?odeslano=1');
        exit;
    } elseif ($author === '' || $email === '' || $message === '') {
        $error = 'Vyplňte prosím jméno, e-mail i text zprávy.';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error = 'Zadejte prosím platnou e-mailovou adresu.';
    } elseif (!$gdpr) {
        $error = 'Pro odeslání příspěvku je nutný souhlas se zpracováním údajů (GDPR).';
    } elseif (mb_strlen($author) > 80 || mb_strlen($message) > 2000) {
        $error = 'Jméno nebo zpráva je příliš dlouhá.';
    } else {
        $now = new DateTime('now', new DateTimeZone('Europe/Prague'));
        array_unshift($posts, [
            'id' => 'p-' . $now->format('YmdHis') . random_int(10, 99),
            'author' => $author,
            'email' => $email, // nezveřejňuje se ve výpisu
            'date' => $now->format(DateTime::ATOM),
            'label' => $now->format('j. n. Y H:i'),
            'message' => $message,
        ]);

        if (@file_put_contents($dataFile, json_encode($posts, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)) !== false) {
            header('Location: ./?odeslano=1');
            exit;
        } else {
            $error = 'Nepodařilo se uložit příspěvek. Zkontrolujte práva zápisu složky diskuse/ na serveru.';
        }
    }
}
?>
<!DOCTYPE html>
<html lang="cs">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Diskuse | Sluneční zátoka</title>
  <link rel="icon" href="../assets/img/logo-favicon.png" type="image/png">
  <meta name="description" content="Diskuse rodičů a přátel tábora Sluneční zátoka">
  <link rel="stylesheet" href="../assets/css/style.css">
</head>
<body>
<header class="site-header">
  <a class="brand" href="../index.html"><img src="../assets/img/logo-header.png" alt="Tábor Ledeč" class="site-logo site-logo-header" width="44" height="44"><span>Tábor Ledeč<small>Letní dětský sportovní tábor u Ledče nad Sázavou</small></span></a>
  <button class="nav-toggle" aria-label="Menu" type="button">☰</button>
  <nav class="main-nav">
    <div class="nav-item has-sub"><a href="../strankac5d4.html?slug=o-tabore" class="nav-link">O táboře <span class="caret" aria-hidden="true"></span></a><div class="submenu" role="menu"><a href="../strankadf97.html?slug=program" role="menuitem">Program</a><a href="../stranka2d85.html?slug=historie" role="menuitem">Historie</a><a href="../stranka85bb.html?slug=ubytovani" role="menuitem">Ubytování a strava</a></div></div>
    <a href="../tym/index.html" class="nav-link">Náš tým</a>
    <a href="../terminy/index.html" class="nav-link">Termín tábora</a>
    <div class="nav-item has-sub"><a href="../strankabd05.html?slug=pro-rodice" class="nav-link">Pro rodiče <span class="caret" aria-hidden="true"></span></a><div class="submenu" role="menu"><a href="../stranka0b05.html?slug=co-s-sebou" role="menuitem">Co s sebou</a><a href="../stranka9214.html?slug=zdravi" role="menuitem">Zdravotní péče</a><a href="../strankac5dd.html?slug=doprava" role="menuitem">Doprava</a></div></div>
    <div class="nav-item has-sub"><a href="../galerie/index.html" class="nav-link">Galerie <span class="caret" aria-hidden="true"></span></a><div class="submenu" role="menu"><a href="../galerie/index.html" role="menuitem">Fotogalerie</a><a href="../videa/index.html" role="menuitem">Videa</a></div></div>
    <a href="./" class="nav-link">Diskuse</a>
    <a href="../strankaffec.html?slug=kontakt" class="nav-link">Kontakt</a>
    <a href="../ucet/index.html" class="nav-link">Účet rodiče</a>
    <a href="../prihlaska.html" class="cta-btn nav-cta">Přihlásit dítě</a>
  </nav>
</header>

<main class="section">
  <div class="section-inner">
    <h1 class="section-title"><span class="icon">💬</span> Diskuse</h1>
    <p class="section-lead">
      Prostor pro dotazy rodičů, zkušenosti a tipy. Příspěvek se zobrazí hned po odeslání. Odpovídat může pouze administrátor.
    </p>

    <?php if ($success): ?>
      <p style="padding:12px 16px;background:#e6f6ec;border-left:4px solid #2e8b57;border-radius:6px;margin-bottom:20px;">
        <strong>Děkujeme!</strong> Váš příspěvek byl uložen a zobrazen v diskusi.
      </p>
    <?php endif; ?>

    <?php if ($error !== ''): ?>
      <p style="padding:12px 16px;background:#fdecea;border-left:4px solid #c0392b;border-radius:6px;margin-bottom:20px;">
        <strong>Chyba:</strong> <?= htmlspecialchars($error, ENT_QUOTES, 'UTF-8') ?>
      </p>
    <?php endif; ?>

    <div class="disc-layout">
      <div class="disc-threads">
        <?php foreach ($posts as $post): ?>
          <article class="disc-post" id="<?= htmlspecialchars((string)($post['id'] ?? ''), ENT_QUOTES, 'UTF-8') ?>">
            <header class="disc-meta">
              <strong><?= htmlspecialchars((string)($post['author'] ?? ''), ENT_QUOTES, 'UTF-8') ?></strong>
              <time datetime="<?= htmlspecialchars((string)($post['date'] ?? ''), ENT_QUOTES, 'UTF-8') ?>">
                <?= htmlspecialchars((string)($post['label'] ?? ''), ENT_QUOTES, 'UTF-8') ?>
              </time>
            </header>
            <div class="disc-body"><?= nl2br(htmlspecialchars((string)($post['message'] ?? ''), ENT_QUOTES, 'UTF-8')) ?></div>
          </article>
        <?php endforeach; ?>
      </div>

      <aside class="disc-form-wrap" id="form">
        <h2>Napsat příspěvek</h2>
        <form method="post" action="" class="disc-form" autocomplete="off">
          <input type="hidden" name="parent_id" value="">
          <div class="hp" aria-hidden="true"><label>Fax <input type="text" name="fax_number_hp" value="" tabindex="-1" autocomplete="off"></label></div>
          <label>Jméno *
            <input name="name" required maxlength="80" value="<?= htmlspecialchars((string)($_POST['name'] ?? ''), ENT_QUOTES, 'UTF-8') ?>">
          </label>
          <label>E-mail * <small>(nezveřejňuje se)</small>
            <input type="email" name="email" required value="<?= htmlspecialchars((string)($_POST['email'] ?? ''), ENT_QUOTES, 'UTF-8') ?>">
          </label>
          <label>Zpráva *
            <textarea name="message" rows="5" required maxlength="2000" placeholder="Váš dotaz nebo zkušenost…"><?= htmlspecialchars((string)($_POST['message'] ?? ''), ENT_QUOTES, 'UTF-8') ?></textarea>
          </label>
          <label class="check">
            <input type="checkbox" name="gdpr" value="1" required <?= isset($_POST['gdpr']) ? 'checked' : '' ?>>
            Souhlasím se zpracováním údajů pro zobrazení příspěvku (viz <a href="../stranka8960.html?slug=gdpr" target="_blank">GDPR</a>).
          </label>
          <button type="submit" class="cta-btn" style="width:100%;justify-content:center;margin-top:8px">Odeslat příspěvek</button>
        </form>
      </aside>
    </div>

    <p style="margin-top:32px"><a href="../index.html">← Zpět na úvod</a></p>
  </div>
</main>

<footer id="kontakt" class="site-footer">
  <div class="footer-inner">
    <div class="footer-brand"><strong><img src="../assets/img/logo-footer.png" alt="Tábor Ledeč" class="site-logo site-logo-footer" width="40" height="40"> Tábor Ledeč</strong><p>Letní dětský sportovní tábor u Ledče nad Sázavou<br>Dobrodružství v přírodě nikdy nekončí…</p><div class="socials"><a href="https://www.facebook.com/taborledec/?locale=cs_CZ" target="_blank" aria-label="Facebook">f</a><a href="https://www.instagram.com/tabor.ledec?xtok=MWhwMXVzOHd4d2oycQ==" target="_blank" aria-label="Instagram">ig</a></div></div>
    <div class="footer-col"><h4>Rychlé odkazy</h4><a href="../strankac5d4.html?slug=o-tabore">O táboře</a><a href="../strankadf97.html?slug=program">Program</a><a href="../terminy/index.html">Termín</a><a href="../galerie/index.html">Fotogalerie</a><a href="../videa/index.html">Videa</a><a href="../prihlaska.html">Přihláška</a></div>
    <div class="footer-col"><h4>Kontakt</h4><p><strong>Jana Haltufová</strong> (předseda z.s.)</p><p>✉ infotaborledec@gmail.com</p><p>📞 +420 732 228 657</p><p>📍 Pod Hájem 1309, Ledeč nad Sázavou, 584 01</p><p>IČO: 01440594</p></div>
    <div class="footer-col"><h4>Pro rodiče</h4><a href="../prihlaska.html">Přihlásit dítě</a><a href="../terminy/index.html">Termín a ceny</a></div>
  </div>
  <div class="footer-bottom"><span>© 2026 TachoEdu.eu , TestEdu.eu - Ing. Jan Vaverka</span><a href="../stranka8960.html?slug=gdpr" class="js-gdpr-modal" style="opacity:0.85;color:inherit">Ochrana osobních údajů (GDPR)</a><a href="../stranka5237.html?slug=cookies" style="opacity:0.85;color:inherit">Cookies</a><a href="../admin/index.html">Administrace</a></div>
</footer>

<script src="../assets/js/app.js"></script>
</body>
</html>
