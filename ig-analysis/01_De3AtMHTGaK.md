# #1 De3AtMHTGaK — "Kurang negatif jadi tambah" (air–api)

Data Apify 24 Okt 2026: 259.585 play, 13.821 like, 119 komentar, 84,4 detik,
1080×1920 (unduhan 720×1280), audio asli. Rasio like/play 5,3%.

Frame: `frames/De3AtMHTGaK/hook/` (0–3 dtk, 4 fps) dan
`frames/De3AtMHTGaK/timeline/` (1 frame per 2 dtk, t_001 = 0 dtk, t_N = (N-1)×2 dtk).

## Struktur (dari judul bab di layar)
| Waktu | Bab | Isi |
|---|---|---|
| 0–6 | Kurang Negatif? | `3 − (−2)` besar di tengah, ledakan partikel biru/merah, tanda tanya |
| 6–10 | Kenapa Jadi Tambah? | Aturan hafalan `−(−) → +` lalu "Tapi kenapa jadi tambah?" |
| 10–14 | Air dan Api | Air = +1, api = −1, 1 + (−1) = 0 |
| 14–20 | Pasangan Padam | Latihan pemanasan 5 + (−3) |
| 20–22 | Soal Kita | Kembali ke 3 − (−2) |
| 22–28 | Salah Langkah | Jalan pikir keliru: 3 air vs 2 api → hasil 1, dibingkai merah 3 + (−2) = 1 |
| 28–34 | Dikurang = Diambil | Mau ambil 2 api, apinya tidak ada |
| 34–40 | Pasangan Nol | Tambah 2 pasang air–api bernilai 0 |
| 40–46 | Tambah Lawannya | Ambil 2 api → sisa 5 air; garis penghubung −(−2) ke +2 |
| 46–60 | Contoh Kedua | −2 − 3 = −5 dengan cara yang sama |
| 60–70 | Asal Triknya | Generalisasi a − b = a + (lawan b) → `−(−) → +` |
| 70–84 | Giliranmu! | Kuis 4 − (−3), pilihan A 1 / B 7 / C −7, CTA "Tulis jawaban dan alasanmu di komentar" |

## Hook 3 detik pertama
- Frame 0 sudah berisi soal `3 − (−2)` besar (biru vs merah). Tidak ada intro, logo animasi, atau wajah. [Pasti]
- 0,25–1,5 dtk: cincin + partikel biru/merah meledak dari soal — satu-satunya gerak "ramai" di seluruh video. [Pasti]
- Teks karaoke: "Soal ini masih bikin banyak orang bingung." lalu "Yang sudah hafal caranya pun…". Hook = menantang orang yang merasa sudah bisa. [Pasti]
- Hook menjawab janji caption dengan kalimat yang sama sederhananya; tidak ada clickbait visual.

## Gaya visual
- Template tetap: logo kiri atas, label topik "BILANGAN · SMP · FASE D", judul bab serif, progress bar biru di bawah judul, kartu putih krem di tengah. [Pasti]
- Kode warna konsisten: biru = positif/air, merah = negatif/api. Warna angka di persamaan ikut warna objek, jadi mata bisa mencocokkan simbol dengan benda. [Pasti]
- Objek konkret (tetes air, api) menggantikan "titik ±" generik. Bagian "diambil" ditaruh di kotak putus-putus kiri atas, jadi aksi "mengurangi" terlihat sebagai pemindahan benda. [Pasti]
- Persamaan bertahap (`= ?` → `= 3` → `= 3 + 2 = 5`) dan garis penghubung oranye/biru menunjukkan asal tiap suku.
- Menampilkan jawaban salah secara eksplisit (bab "Salah Langkah", kotak merah) sebelum jawaban benar. [Pasti]
- Konten berada di ~17–83% tinggi layar; atas dan bawah kosong. Ini aman dari overlay UI Reels. [Kemungkinan Besar]

## Tempo
- Nol potongan adegan: deteksi scene ffmpeg (ambang 0,12) tidak menemukan satu pun cut. Semua transisi berupa animasi di dalam satu kanvas. [Pasti]
- 12 bab dalam 84 detik → ganti judul bab rata-rata tiap ~7 detik; progress bar memberi rasa "sebentar lagi selesai". [Pasti]
- Audio hampir tanpa jeda: silencedetect (−35 dB, 0,4 dtk) hanya menemukan 3 jeda; mean −17,4 dB. Narasi padat dan sinkron dengan subtitle karaoke. [Pasti]
- Isi narasi belum ditranskripsi (tidak ada whisper di container); urutan kalimat dibaca dari subtitle di layar.

## Kelemahan yang terlihat
- Subtitle karaoke kecil (~22 px di 720p, ≈1,7% tinggi layar) dan sebagian kata berwarna abu muda. Di ponsel kecil sulit dibaca tanpa suara. [Pasti untuk ukuran; Menebak untuk dampaknya]
- 14 detik terakhir (17% durasi) adalah kuis statis. Jika retensi turun, kemungkinan di sini. [Menebak — tidak ada data retensi]

## Hipotesis kenapa viral (perlu dibandingkan dengan video lain)
1. Soal yang dihafal hampir semua orang Indonesia tapi jarang dipahami; hook menyerang rasa "aku sudah tahu". [Kemungkinan Besar]
2. Analogi air–api cukup kuat untuk dibagikan dan memancing debat. [Menebak]
3. CTA kuis pilihan ganda dengan jawaban jebakan (1, 7, −7) memancing komentar. 119 komentar masih rendah dibanding 13,8 rb like, jadi efeknya terbatas. [Kemungkinan Besar]
