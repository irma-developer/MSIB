<?php
session_start();
if (!isset($_SESSION['records'])) {
    $_SESSION['records'] = [];
}

// === Handler aksi ===
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? 'add';

    if ($action === 'add') {
        // Ambil dan validasi data
        $nama  = trim($_POST['nama'] ?? '');
        $email = trim($_POST['email'] ?? '');
        $nilai = $_POST['nilai'] ?? '';

        // Validasi sederhana
        $errors = [];
        if ($nama === '')  $errors[] = 'Nama wajib diisi.';
        if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'Email tidak valid.';
        if ($nilai === '' || !is_numeric($nilai) || $nilai < 0 || $nilai > 100) $errors[] = 'Nilai harus 0–100.';

        if (empty($errors)) {
            $nilai = (int)$nilai;
            $status = ($nilai > 70) ? 'Lulus' : 'Remedial';

            // Simpan ke session
            $_SESSION['records'][] = [
                'nama'   => $nama,
                'email'  => $email,
                'nilai'  => $nilai,
                'status' => $status,
                'waktu'  => date('Y-m-d H:i:s'),
            ];

            // Redirect pola PRG (Post/Redirect/Get) supaya reload tidak menduplikasi submit
            header('Location: ' . $_SERVER['PHP_SELF']);
            exit;
        }
    } elseif ($action === 'delete_one') {
        $idx = (int)($_POST['idx'] ?? -1);
        if (isset($_SESSION['records'][$idx])) {
            array_splice($_SESSION['records'], $idx, 1);
        }
        header('Location: ' . $_SERVER['PHP_SELF']);
        exit;
    } elseif ($action === 'clear_all') {
        $_SESSION['records'] = [];
        header('Location: ' . $_SERVER['PHP_SELF']);
        exit;
    }
}
?>
<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <title>Tugas Form Ujian + Riwayat Data</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        :root {
            --bg: #f6f7fb;
            --card: #ffffff;
            --text: #1f2937;
            --muted: #6b7280;
            --primary: #2563eb;
            --primary-700: #1d4ed8;
            --ring: #e5e7eb;
            --ok-bg: #dcfce7;
            --ok: #166534;
            --bad-bg: #fee2e2;
            --bad: #991b1b;
        }

        * {
            box-sizing: border-box
        }

        body {
            margin: 0;
            font-family: Inter, system-ui, Arial, sans-serif;
            background: var(--bg);
            color: var(--text)
        }

        .container {
            max-width: 1000px;
            margin: 34px auto;
            padding: 0 16px
        }

        .grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 20px
        }

        @media (min-width:900px) {
            .grid {
                grid-template-columns: 380px 1fr
            }
        }

        .card {
            background: var(--card);
            border: 1px solid var(--ring);
            border-radius: 14px;
            padding: 20px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, .05)
        }

        h1 {
            font-size: 22px;
            margin: 0 0 12px
        }

        h2 {
            font-size: 18px;
            margin: 0 0 12px
        }

        p.muted {
            color: var(--muted);
            font-size: 13px;
            margin: 0 0 14px
        }

        label {
            display: block;
            font-weight: 600;
            margin-top: 10px
        }

        input[type="text"],
        input[type="email"],
        input[type="number"] {
            width: 100%;
            padding: 10px 12px;
            margin-top: 6px;
            border: 1px solid var(--ring);
            border-radius: 10px;
            outline: none;
            transition: .15s
        }

        input:focus {
            border-color: var(--primary);
            box-shadow: 0 0 0 3px rgba(37, 99, 235, .15)
        }

        .btn {
            margin-top: 14px;
            padding: 11px 14px;
            border: none;
            border-radius: 10px;
            background: var(--primary);
            color: #fff;
            font-weight: 700;
            cursor: pointer
        }

        .btn:hover {
            background: var(--primary-700)
        }

        .btn-ghost {
            background: #eef2ff;
            color: var(--primary);
            border: 1px solid #dbeafe
        }

        .btn-danger {
            background: #ef4444
        }

        .btn-danger:hover {
            background: #dc2626
        }

        .errors {
            background: #fff7ed;
            border: 1px solid #ffedd5;
            color: #9a3412;
            padding: 10px 12px;
            border-radius: 10px;
            margin-top: 12px;
            font-size: 14px
        }

        table {
            width: 100%;
            border-collapse: separate;
            border-spacing: 0;
            border: 1px solid var(--ring);
            border-radius: 12px;
            overflow: hidden
        }

        th,
        td {
            padding: 10px 12px;
            text-align: left;
            border-bottom: 1px solid var(--ring);
            vertical-align: middle
        }

        th {
            background: #f9fafb;
            font-size: 14px
        }

        tr:last-child td {
            border-bottom: none
        }

        .badge {
            display: inline-block;
            padding: 6px 10px;
            border-radius: 999px;
            font-weight: 700;
            font-size: 12px
        }

        .lulus {
            background: var(--ok-bg);
            color: var(--ok)
        }

        .remedial {
            background: var(--bad-bg);
            color: var(--bad)
        }

        .actions {
            display: flex;
            gap: 8px;
            flex-wrap: wrap
        }

        .topbar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            margin-bottom: 10px
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="grid">
          
            <div class="card">
                <h1>Form Nilai Ujian</h1>

                <?php if (!empty($errors ?? [])): ?>
                    <div class="errors">
                        <strong>Periksa kembali:</strong>
                        <ul style="margin:6px 0 0 18px;padding:0">
                            <?php foreach ($errors as $e): ?>
                                <li><?= htmlspecialchars($e) ?></li>
                            <?php endforeach; ?>
                        </ul>
                    </div>
                <?php endif; ?>

                <form method="post">
                    <input type="hidden" name="action" value="add">
                    <label for="nama">Nama</label>
                    <input id="nama" name="nama" type="text" placeholder="Contoh: Siti Irmawati" required>

                    <label for="email">Email</label>
                    <input id="email" name="email" type="email" placeholder="nama@email.com" required>

                    <label for="nilai">Nilai Ujian (0–100)</label>
                    <input id="nilai" name="nilai" type="number" min="0" max="100" placeholder="misal: 85" required>

                    <button class="btn" type="submit">Submit</button>
                </form>
            </div>
            <div class="card">
                <div class="topbar">
                    <div>
                        <h2>Hasil Input</h2>
                       
                    </div>
                    <form method="post" onsubmit="return confirm('Hapus semua data?')">
                        <input type="hidden" name="action" value="clear_all">
                        <button class="btn btn-danger" type="submit">Hapus Semua</button>
                    </form>
                </div>

                <?php if (empty($_SESSION['records'])): ?>
                <?php else: ?>
                    <div style="overflow:auto">
                        <table>
                            <thead>
                                <tr>
                                   
                                    <th>Nama</th>
                                    <th>Email</th>
                                    <th>Nilai</th>
                                    <th>Status</th>
                                    <th>Waktu Input</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php foreach ($_SESSION['records'] as $i => $r): ?>
                                    <tr>
                                        <td><?= $i + 1 ?></td>
                                        <td><?= htmlspecialchars($r['nama']) ?></td>
                                        <td><?= htmlspecialchars($r['email']) ?></td>
                                        <td><?= htmlspecialchars($r['nilai']) ?></td>
                                        <td>
                                            <span class="badge <?= $r['status'] === 'Lulus' ? 'lulus' : 'remedial' ?>">
                                                <?= htmlspecialchars($r['status']) ?>
                                            </span>
                                        </td>
                                        <td><?= htmlspecialchars($r['waktu']) ?></td>
                                        <td>
                                            <form method="post" style="display:inline" onsubmit="return confirm('Hapus baris ini?')">
                                                <input type="hidden" name="action" value="delete_one">
                                                <input type="hidden" name="idx" value="<?= $i ?>">
                                                <button class="btn btn-ghost" type="submit">Hapus</button>
                                            </form>
                                        </td>
                                    </tr>
                                <?php endforeach; ?>
                            </tbody>
                        </table>
                    </div>
                    <?php
                    // Info ringkas (opsional)
                    $total = count($_SESSION['records']);
                    $lulus = count(array_filter($_SESSION['records'], fn($x) => $x['status'] === 'Lulus'));
                    $rem   = $total - $lulus;
                    ?>
                    <p class="muted" style="margin-top:10px">
                        Total data: <b><?= $total ?></b> • Lulus: <b><?= $lulus ?></b> • Remedial: <b><?= $rem ?></b>
                    </p>
                <?php endif; ?>
            </div>
        </div>
    </div>
</body>

</html>