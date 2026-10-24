# Analisis visual Instagram @akalmatika — catatan serah terima

Tujuan: unduh tiap Reels @akalmatika satu per satu, pecah jadi frame dengan
ffmpeg, simpan frame di `ig-analysis/frames/<shortCode>/`, lalu analisis
visualnya (hook 3 detik pertama, teks di layar, gaya ilustrasi, tempo).

## Status
- Sesi sebelumnya: semua domain Instagram (`instagram.com`, `cdninstagram.com`,
  `fbcdn.net`) dan `instasave.website` diblokir jaringan sandbox.
- Pemilik sudah menambahkan domain di pengaturan environment. Perubahan ini
  baru berlaku di sesi/container baru.
- ffmpeg sudah tersedia di container. Link video diambil ulang lewat Apify
  (`apify/instagram-scraper`, resultsType `reels`, URL
  `https://www.instagram.com/akalmatika/`). Link CDN kedaluwarsa, jadi jangan
  pakai link lama.

## Profil (24 Okt 2026)
1.608 follower, 28 post (24 Reels, 3 carousel, 1 gambar). Bio: "Menjadikan
matematika masuk akal. Paham dulu, baru rumus."

## Urutan video (tayangan, durasi detik, topik)
| # | shortCode | Tayangan | Durasi | Topik |
|---|-----------|---------:|-------:|-------|
| 1 | De3AtMHTGaK | 243.945 | 84 | Kurang ketemu negatif jadi tambah (air–api) — VIRAL |
| 2 | Dex5IX6tdiY | 19.228 | 82 | Pindah ruas itu ilusi (timbangan) |
| 3 | Deoofs7Tpi_ | 6.041 | 101 | Rasio 3:8 model kotak |
| 4 | DeoS0ARJkLi | 2.651 | 113 | Barisan aritmetika logika lompatan |
| 5 | DetysUWTzVU | 1.874 | 128 | 1/2 + 1/3 ≠ 2/5 |
| 6 | DewJM67Oc_4 | 1.813 | 74 | FPB tabel pembagian |
| 7 | Deth6NLBuVi | 1.779 | 68 | Makna FPB 30 & 36 |
| 8 | Dewc03gh1My | 1.715 | 87 | FPB manik faktor prima |
| 9 | DeMIgG1BAEf | 1.445 | 145 | Segitiga 30-60 bertingkat |
| 10 | DeG3oVCh1-1 | 960 | 164 | Fungsi ganjil pangkat 2025 |
| 11 | DeXKQxqOcYI | 699 | 100 | Sudut elevasi 45° |
| 12 | DYrvGWgt0kx | 513 | 32 | Limit fungsi |
| 13 | DeIxNzDE9zP | 450 | 102 | Faktor prima soal TIU |
| 14 | DdV7rz7Tqwb | 434 | 18 | Board AI + API |
| 15 | DeP8v0TBxR- | 411 | 162 | Titik singgung lingkaran |
| 16 | Dd-QDIfPVli | 287 | 43 | Penyebut harus sama (pizza) |
| 17 | DemyXwzO7O7 | 264 | 205 | Teorema sisa, dua cara |
| 18 | DenIKaxhrNz | 234 | 337 | FPB & KPK lewat selisih |
| 19 | DeJyXxRE5IR | 233 | 141 | Kaidah pencacahan eliminasi opsi |
| 20 | DeOghy_Avk3 | 232 | 380 | 3^2026 mod 17 (Fermat) |
| 21 | DeFdIUnp-ZN | 230 | 72 | Pembagian bersusun balok |
| 22 | DeZrvrzJGAi | 217 | 233 | Campuran cat perbandingan |
| 23 | DdWdzJ7TSK8 | 177 | 65 | (tanpa caption) |
| 24 | DeJeUb9k9Q3 | 140 | 186 | Garis singgung lingkaran sejajar |

Non-video: DdiFio3E7RO (carousel sudut 15°/75°), DdwvRVok7iR (carousel modulo
4 mazhab), DYfupwmk7SP (carousel 2³×2²), DdepEjTkwpg (gambar matriks).

## Temuan awal (dari data, belum dari visual)
- Dua video terlaris berdurasi ~82–84 detik; semua video >200 detik hanya
  ~200–260 tayangan.
- Topik yang laku: miskonsepsi dasar SD/SMP. Soal UTBK/olimpiade sepi.
- Caption viral: santai, huruf kecil, satu klaim tajam.
