# Arah Produk Capie: Komersial, UI/UX, Maskot, dan Lab Simulasi

Status: rancangan untuk diputuskan. Prototipe layar ada di kanvas desain
"Easy Math — Arah UI/UX" (artifact pribadi pemilik repo; dibuat sebelum nama berubah
menjadi Capie).

Label keyakinan: **[Pasti]** bukti kuat, **[Kemungkinan Besar]** inferensi kuat,
**[Menebak]** mengisi celah informasi.

---

## 1. Ringkasan keputusan

1. **Hambatan terbesar untuk berjualan bukan tampilan, melainkan tidak adanya
   akun, sinkronisasi progres, dan pembayaran.** Saat ini progres hanya ada di
   `localStorage` satu perangkat, dan tidak ada server sama sekali [Pasti].
   Langganan tidak bisa dijual tanpa akun.
2. **Jangan memindahkan animasi materi ke 3D.** Mesin SVG 2D tetap jadi inti.
   Three.js dipakai hanya untuk sebagian kecil simulasi di Lab yang memang
   butuh ruang 3D (bangun ruang, jaring-jaring, benda putar), dan dimuat hanya
   saat simulasi itu dibuka.
3. **Pembelinya orang tua, penggunanya anak.** Karena itu ada dua wajah:
   - halaman jual dan dasbor orang tua yang tenang dan meyakinkan;
   - aplikasi anak yang terang, besar, dan memberi rasa maju (misi, jalur,
     runtutan hari).
4. **Model: freemium.** Bab 1 setiap kelas gratis selamanya. Paket Keluarga
   berlangganan bulanan atau tahunan. Paket Sekolah per siswa per tahun.
5. **Lab Simulasi menjadi pembeda berbayar**, tetapi dibangun setelah akun dan
   pembayaran jalan. Konsepnya ada di bagian 7.

---

## 2. Apakah 3D dengan Three.js menarik?

Menarik untuk dilihat, tetapi untuk produk ini sebagian besar tidak tepat.

| Pertimbangan | Penilaian |
|---|---|
| Kejelasan konsep | Mayoritas materi SD–SMP adalah bilangan, pecahan, rasio, dan aljabar. Semuanya lebih jelas dalam 2D datar; perspektif 3D malah mengaburkan panjang dan perbandingan [Kemungkinan Besar]. |
| Perangkat pengguna | Banyak siswa Indonesia memakai Android kelas bawah. WebGL dengan bayangan dan pencahayaan menguras baterai dan bisa patah-patah [Kemungkinan Besar]. |
| Ukuran unduhan | Three.js minimal sekitar 150 KB gzip, belum termasuk model dan tekstur. Mesin sekarang tidak memakai pustaka sama sekali dan berjalan offline [Kemungkinan Besar]. |
| Biaya produksi | Setiap adegan 3D butuh model, kamera, cahaya, dan uji di banyak perangkat. Satu materi 2D bisa ditulis dalam hitungan jam; versi 3D-nya beberapa hari [Menebak]. |
| Tempat 3D benar-benar membantu | Volume kubus dan balok, jaring-jaring, bangun ruang sisi lengkung, benda putar, irisan kerucut, dan vektor 3D. Di sini 3D layak dipakai. |

Catatan tentang Astra AI: gambar kartu yang membuat katalognya terlihat mewah
kemungkinan besar adalah ilustrasi 3D yang dirender jadi gambar, bukan 3D
interaktif di setiap kartu [Kemungkinan Besar]. Kesan "premium" bisa didapat
dengan **ilustrasi kartu bergaya 3D**, sementara simulasinya tetap ringan.

---

## 3. Posisi produk

- **Janji:** "Anak paham kenapa, bukan cuma hafal caranya."
- **Pembeda yang sudah ada:**
  - materi berupa cerita visual;
  - pembahasan untuk setiap jawaban salah;
  - mengikuti Kurikulum Merdeka;
  - bisa offline.
- **Pembeda yang perlu dibangun:**
  - laporan orang tua yang menunjuk kesalahan spesifik;
  - Lab Simulasi;
  - mode kelas untuk guru.
- **Pesaing yang perlu dipantau:**
  - KooBits, yang punya paket Home Premium, tantangan harian, uji coba 7 hari,
    dan konten berbahasa Indonesia ([dukungan KooBits](https://support.koobits.com/hc/id-id/articles/900002180766-Perbedaan-antara-Home-School-Premium-Plan-dan-School-Basic-Plan),
    [DailySocial](https://dailysocial.id/post/koobits-edtech-startup-finally-expands-starting-to-develop-content-in-bahasa-indonesia));
  - Ruangguru ruangbelajar, yang dijual per paket semester atau tahun
    ([Ruangguru](https://www.ruangguru.com/blog/cara-bayar-langganan-ruangbelajar-dan-brain-academy-di-aplikasi-ruangguru)).
- Harga pesaing belum berhasil dipastikan. Isi setelah dicek langsung.

---

## 4. Syarat minimum sebelum bisa menjual

| Kebutuhan | Kenapa wajib | Usulan teknis |
|---|---|---|
| Akun orang tua + profil anak | Langganan dimiliki orang tua; anak tidak perlu email | Masuk dengan Google atau tautan email untuk orang tua. Anak memilih profil (avatar + PIN opsional). |
| Sinkronisasi progres | Pindah HP tidak boleh menghapus progres | Tetap simpan lokal dulu (offline), kirim antrean ke server saat online. |
| Pembayaran berulang | Inti langganan | Gerbang pembayaran lokal (QRIS, dompet digital, virtual account, kartu). Kalau nanti dirilis di Play Store sebagai aplikasi, aturan penagihan Play berlaku [Kemungkinan Besar]. |
| Pembatas konten (paywall) | Membedakan gratis dan berbayar | Hak akses diperiksa di server. Materi berbayar tidak ikut di-cache sebelum akun aktif. |
| Perlindungan data anak | UU PDP No. 27/2022 mensyaratkan persetujuan orang tua untuk data anak [Kemungkinan Besar] | Data anak minimal (nama panggilan, kelas), persetujuan orang tua saat daftar, halaman privasi. |
| Analitik produk | Tanpa data, harga dan fitur hanya tebakan | Catat kejadian: materi dimulai/selesai, soal benar/salah, paywall dilihat, uji coba dimulai/dibatalkan. |

Konsekuensi arsitektur: proyek tetap PWA tanpa build untuk sisi siswa, tetapi
perlu backend kecil (autentikasi, database, webhook pembayaran). Pilihan yang
murah dirawat adalah layanan terkelola (Postgres + autentikasi + fungsi
serverless) [Menebak; pilih setelah membandingkan biaya].

---

## 5. Arah UI/UX

### 5.1 Prinsip

1. **Konkret → gambar → abstrak.** Setiap konsep dimulai dari benda, lalu
   model (diagram pita, bingkai sepuluh), baru simbol. Ini inti metode
   Singapura, bukan sekadar "banyak gambar".
2. **Satu layar, satu tugas.** Anak SD tidak boleh menghadapi menu yang
   bercabang. Beranda hanya punya satu tombol utama: Lanjutkan.
3. **Maju terasa.** Misi harian, jalur bab, dan runtutan hari. Hadiahnya
   sederhana (bintang, lencana), tanpa toko atau mata uang yang mengalihkan
   dari belajar.
4. **Orang tua melihat makna, bukan angka.** "Sering tertukar 12 : 3 dan
   3 : 12" lebih berguna daripada "nilai 64".
5. **Paywall jujur.** Gratis berarti benar-benar bisa belajar (Bab 1 penuh).
   Kunci dipasang di bab berikutnya, bukan di tengah materi.

### 5.2 Sistem desain usulan

Identitas lama (kertas krem + serif) terasa seperti buku dan cocok untuk
SMP–SMA. Untuk dijual ke keluarga dengan anak SD, usulannya lebih terang dan
ramah:

| Token | Nilai | Pakai untuk |
|---|---|---|
| Latar | `#F5F7FB` | dasar semua layar |
| Kartu | `#FFFFFF`, garis `#E2E7F0` | wadah konten |
| Tinta | `#15213B`, sekunder `#4B5873` | teks |
| Biru utama | `#2D5BE3`, lembut `#E3EAFD` | tombol utama, posisi saat ini |
| Kuning matahari | `#FFC22E`, lembut `#FFF3CF` | hadiah, sorotan, ajakan beli |
| Hijau | `#138A5B`, lembut `#DDF4EA` | benar, dikuasai |
| Koral | `#E5533A`, lembut `#FDE5E0` | runtutan hari, perlu bantuan |
| Lab (gelap) | `#11143A`, kartu `#1B1F4B` | khusus Lab Simulasi, supaya terasa sebagai "ruang lain" |

- Huruf: **Fredoka** untuk judul (bulat, ramah anak), **Nunito** untuk isi
  dan angka (sudah dipakai sekarang).
- Sudut membulat 14–24 px.
- Area sentuh minimal 44 px, dan 60 px untuk pilihan jawaban anak.
- Warna makna di panggung animasi tetap sama: biru positif, merah negatif.
  Ini sistem makna, jadi jangan diubah demi gaya.

### 5.3 Peta layar (lihat kanvas)

| Layar | Isi utama |
|---|---|
| Halaman jual | Janji, contoh animasi, fakta konten, tiga langkah belajar, laporan orang tua, Lab, harga, FAQ |
| Onboarding | Peran (siswa/orang tua/guru) → kelas → materi pertama dalam 3 menit |
| Beranda siswa | Kartu Lanjutkan, misi hari ini, kartu bab |
| Peta belajar | Jalur materi per bab, uji bab di ujung, ajakan paket di bab terkunci |
| Pemutar materi | Progres per bagian, panggung, narasi, pilihan jawaban besar, kontrol putar |
| Lab Simulasi | Katalog bertema gelap, saring per kelas/topik, label 2D/3D dan Premium |
| Dasbor orang tua | Pilih anak, menit per hari, penguasaan bab, kesalahan berulang + tombol kirim materi ulang |
| Pilih paket | Bulanan/tahunan, paket Keluarga/Satu anak, metode bayar lokal, uji coba |

Angka harga, lama uji coba, dan batas profil sengaja dibiarkan sebagai
`[HARGA]`, `[LAMA UJI COBA]`, dan `[JUMLAH]` sampai diputuskan.

---

## 6. Model bisnis (usulan awal)

- **Gratis:**
  - Bab 1 setiap kelas;
  - latihan dengan pembahasan;
  - progres di satu perangkat.
- **Keluarga (bulanan/tahunan):**
  - semua kelas;
  - beberapa profil anak;
  - laporan orang tua;
  - Lab;
  - sinkronisasi.
- **Sekolah (per siswa per tahun):**
  - kelas dan tugas dari guru;
  - rekap nilai;
  - mode proyektor.
- **Cara menentukan harga:** uji 2–3 titik harga di halaman paket dengan pengunjung
  sungguhan, ukur rasio "lihat paket → mulai uji coba → bayar". Jangan menetapkan
  dari tebakan [Menebak tentang angka mana pun sebelum uji].

---

## 7. Konsep Lab Simulasi

### 7.1 Definisi

Lab adalah **mainan matematika dengan tujuan**. Setiap simulasi punya:

- satu gagasan inti;
- kendali yang bisa digeser;
- tantangan kecil yang harus diselesaikan dengan mengotak-atik, bukan
  dengan menghitung di kertas.

Lab melengkapi materi animasi, tidak menggantikannya:

- **materi** menjawab "kenapa";
- **Lab** memberi tempat mencoba "bagaimana kalau…".

### 7.2 Pola belajar: Tebak → Coba → Jelaskan

1. **Tebak:** simulasi dibuka dengan pertanyaan prediksi ("Jaring-jaring mana
   yang menutup jadi kubus?").
2. **Coba:** anak menggeser, memutar, atau melempar, dan simulasi merespons
   langsung.
3. **Jelaskan:** setelah tantangan selesai, muncul satu kalimat aturan
   ("Enam persegi, dan tidak boleh ada empat persegi berjajar di satu sisi
   yang menutup sendiri…") dan tautan ke materi terkait.

### 7.3 Anatomi satu layar simulasi

Diadaptasi dari referensi Sel 3D, tetapi untuk HP dulu:

- **Panggung**: area utama yang bisa disentuh. Di layar lebar ada di kiri; di
  HP ada di atas.
- **Kendali**: penggeser dan tombol besar di bawah panggung. Maksimal 3
  kendali dalam satu waktu.
- **Panel tantangan**: misi bertahap (misalnya 1 dari 4), dengan petunjuk
  setelah 2 kali gagal.
- **Kuis "Uji dirimu"**: 3 soal setelah tantangan, memakai format soal yang
  sudah ada (`num`, pilihan ganda, `fig`).
- **Mode guru**: sembunyikan panel, perbesar panggung untuk proyektor.

### 7.4 Teknologi

| Jenis | Teknologi | Alasan |
|---|---|---|
| 2D (sebagian besar) | SVG + `pointer events`, memakai ulang `shapes.js` | Ringan, tajam, sudah teruji, dan offline |
| Banyak titik/partikel (lemparan 1.000 dadu) | Canvas 2D | SVG lambat untuk ribuan elemen |
| 3D (bangun ruang, jaring-jaring, benda putar) | Three.js, dimuat saat simulasi dibuka | Hanya di tempat 3D memang menjelaskan sesuatu |

- **Anggaran kinerja:** simulasi 2D di bawah 50 KB, simulasi 3D di bawah
  400 KB termasuk pustaka. Targetnya 60 fps di Android kelas menengah dan
  minimal 30 fps di kelas bawah [Menebak: angka awal, sesuaikan setelah uji
  perangkat].
- **Format data:** setiap simulasi berupa modul
  `web/lab/<id>/index.js` yang mengekspor
  `{ id, title, kelas, topik, mode: '2d'|'3d', mount(el, opts), challenges, quiz }`.
- **Cara memuat:** katalog dimuat statis, sedangkan modul simulasi dimuat
  dengan `import()` hanya saat dibuka. Pustaka 3D tidak ikut cache awal
  service worker, tetapi di-cache setelah pertama kali dipakai.

### 7.5 Daftar simulasi berurutan prioritas

Kriteria urutan:

- topik yang paling sering sulit;
- butuh interaksi, bukan sekadar animasi;
- biaya pembuatan.

| No | Simulasi | Kelas | Mode | Gagasan inti | Tantangan contoh |
|---|---|---|---|---|---|
| 1 | Dapur Pecahan | 2–6 | 2D | Pecahan sebagai potongan yang sama besar | Buat 3/4 dari pizza yang dipotong 8 |
| 2 | Diagram Pita | 3–7 | 2D | Model batang untuk soal cerita | Susun pita supaya "Dina 2 bagian, Eko 3 bagian, total 30" |
| 3 | Busur Derajat | 4–7 | 2D | Membaca dua skala busur | Bentuk sudut 130°, lalu tebak jenisnya |
| 4 | Timbangan Persamaan | 6–8 | 2D | Lakukan hal yang sama di kedua sisi | Buat x sendirian dalam langkah paling sedikit |
| 5 | Arena Peluang | 6–12 | 2D Canvas | Frekuensi relatif mendekati peluang | Tebak berapa kali muncul 6 dari 600 lemparan |
| 6 | Isi Kotak | 4–6 | 3D | Volume = banyak kubus satuan; 1 L = 1.000 cm³ | Isi balok 4×3×2, lalu tuang ke botol 1 L |
| 7 | Lipat Jaring-jaring | 4–8 | 3D | Jaring-jaring yang menutup | Pilih 3 dari 6 jaring yang jadi kubus |
| 8 | Penjelajah Grafik | 8–12 | 2D | Pengaruh a, b, c pada grafik | Geser parabola agar melewati dua titik |
| 9 | Bangun Ruang 3D | 6–9 | 3D | Volume tabung, kerucut, bola | Tuang kerucut ke tabung: berapa kali penuh? |
| 10 | Lingkaran Satuan | 10–12 | 2D | Sinus dan kosinus sebagai koordinat | Cari dua sudut dengan sinus 0,5 |

### 7.6 Ukuran keberhasilan

- **Sebagian besar anak menyelesaikan tantangan pertama** tanpa bantuan.
- **Skor kuis setelah Lab lebih tinggi daripada skor tanpa Lab** pada topik
  yang sama.
- **Lab termasuk alasan orang tua berlangganan.** Ini diukur dari survei
  pembatalan dan klik di halaman paket.

Angka target diisi setelah ada data awal [Menebak untuk angka apa pun
sekarang].

### 7.7 Lab Sains: Fisika dan Biologi (setelah matematika)

Nama Capie dipilih supaya produk bisa melebar ke sains tanpa ganti merek.
Tetapi **sains sebaiknya baru dikerjakan setelah matematika laku**, karena
setiap mata pelajaran baru menggandakan pekerjaan konten, terjemahan, dan uji
[Kemungkinan Besar].

| Mata pelajaran | Bentuk | Alasan |
|---|---|---|
| Fisika | **Animasi dan simulasi 2D** (SVG/Canvas, penggeser, grafik langsung) | Yang dipelajari adalah vektor, grafik, dan hubungan antarbesaran. Di 2D semua itu terbaca jelas; di 3D anak sibuk memutar kamera. |
| Biologi | **Model 3D interaktif** (Three.js + glTF) | Bentuk dan letak organ, sel, dan jaringan memang ruang. Memutar dan membuka lapisan menjelaskan hal yang gambar datar tidak bisa. |

Contoh urutan awal:

- **Fisika 2D:**
  1. gerak lurus (jejak posisi dan grafik v–t yang tergambar bersamaan);
  2. gaya dan hukum Newton (panah gaya yang bisa ditarik);
  3. bidang miring dan gesekan;
  4. pegas dan bandul;
  5. gelombang;
  6. cermin dan lensa (sinar istimewa yang bisa digeser);
  7. rangkaian listrik seri/paralel.
- **Biologi 3D:**
  1. sel hewan dan sel tumbuhan (ketuk bagian → nama dan fungsi);
  2. sistem pencernaan (makanan bergerak sepanjang saluran);
  3. jantung dan peredaran darah;
  4. kerangka dan sendi;
  5. daun dan fotosintesis.

Catatan pelaksanaan:

- **Biaya terbesar Biologi adalah model 3D, bukan kodenya.** Model perlu
  dibuat oleh seniman 3D atau dibeli/dilisensikan. Lisensi tiap model wajib
  dicek, misalnya CC-BY yang mewajibkan atribusi. Satu model sebaiknya di
  bawah 2–3 MB setelah kompresi Draco [Menebak: angka awal].
- **Fisika bisa dimulai lebih cepat** karena memakai ulang mesin panggung yang
  sudah ada (`player.js`, `shapes.js`) ditambah penggeser [Kemungkinan Besar].
- **Pemetaan kurikulum:**
  - SD Kurikulum Merdeka memakai mata pelajaran gabungan IPAS;
  - SMP memakai IPA terpadu;
  - SMA memisahkan Fisika dan Biologi.

  Katalog Lab sebaiknya disaring per jenjang dengan nama mata pelajaran yang
  sesuai [Kemungkinan Besar; cek ulang dokumen capaian pembelajaran terbaru].
- **Capie ikut masuk Lab** sebagai pemandu "Tebak → Coba → Jelaskan". Capie
  bertanya sebelum simulasi dibuka, lalu bereaksi pada hasil coba anak.

---

## 8. Peta jalan

| Fase | Isi | Keluar fase jika |
|---|---|---|
| 0 · Sekarang | Rapikan tampilan ke sistem desain baru di PWA yang ada (beranda, peta, pemutar). Tambah ikon benda untuk SD kelas 4–6. | Tampilan baru lolos uji di HP kecil |
| 1 · Bisa dijual | Akun orang tua + profil anak, sinkronisasi, paywall Bab 2+, pembayaran, halaman jual, privasi. Analitik. | Pembayaran pertama dari pengguna sungguhan |
| 2 · Alasan tetap berlangganan | Dasbor orang tua, laporan mingguan via email/WA, misi harian, Lab simulasi 1–5 (2D). | Retensi bulan ke-2 terukur |
| 3 · Pembeda | Lab 3D (6, 7, 9), paket Sekolah dan mode guru, aplikasi Play Store (TWA). | Kontrak sekolah pertama |
| 4 · Lab Sains | Lab Fisika 2D lebih dulu (memakai ulang mesin panggung), lalu Lab Biologi 3D. Lihat bagian 7.7. | Matematika SD–SMA sudah lengkap dan laku |

---

## 9. Risiko

- **Konten dipersepsikan "kurang lengkap" untuk dibayar.** Kelas 4–6 masih
  lebih banyak langkah teks dibandingkan kelas 1–2. Benahi sebelum Fase 1.
- **Pembayaran berulang di Indonesia** lebih sering gagal dibanding
  pembayaran sekali bayar. Paket tahunan di depan bisa mengurangi masalah
  ini [Kemungkinan Besar].
- **Daftar bab sebagian ditebak.** Urutan bab kelas 2 (Bab 1) dan kelas 5
  belum pasti. Klaim "sesuai buku" di halaman jual harus hati-hati sampai
  dicek ulang.
- **Mengejar tampilan Astra (gelap, 3D mewah) bisa salah sasaran.** Astra
  menyasar remaja dan mahasiswa dengan tutor AI ([Bittime](https://www.bittime.com/blog/review-astra-ai-ai-tutor-selain-pelajarinai),
  [Parse](https://parse.gl/brands/astra-ai-co)). Pembeli Capie SD adalah
  orang tua.

---

## 10. Merek Capie dan maskot

### 10.1 Nama

- Nama "Easy Math" diganti menjadi **Capie**, karena produk akan melebar ke
  sains. Nama ada di satu tempat: `web/js/brand.js` (plus `<title>` dan
  manifest).
- **Belum dicek: ketersediaan merek dagang dan domain** [Menebak].
  - Sebelum membeli domain atau mencetak materi promosi, cari "Capie" di
    pangkalan data merek DJKI (PDKI), terutama kelas 9 (perangkat lunak) dan
    kelas 41 (pendidikan).
  - Nama pendek yang mudah diucapkan sering sudah dipakai.
- Kunci penyimpanan lokal tetap memakai awalan `easymath.` supaya progres
  pengguna lama tidak hilang. Ini tidak terlihat oleh pengguna.

### 10.2 Aset maskot

- Semua pose ada di satu atlas: `web/img/capie.webp`.
  - Atlas berisi 32 pose dalam grid 8 × 4, ukuran sel 176 × 232 px, sekitar
    270 KB.
  - Pose dipotong dari lembar pose yang diberikan pemilik produk, lalu latar
    belakangnya dihapus.
  - Kepala untuk logo ada di `web/img/capie-head.webp`.
- **Batas mutu:**
  - Setiap pose aslinya kira-kira 200 px. Tampilan tajam sampai lebar sekitar
    110 px di layar ponsel, lebih besar dari itu mulai buram.
  - Untuk hero yang besar atau materi cetak, perlu sumber resolusi tinggi atau
    vektor.
- **Animasinya pose-ke-pose, bukan animasi halus.**
  - Lembar sumber adalah kumpulan pose, bukan frame berurutan. Bentuk telinga
    dan antena sedikit berbeda antarpose.
  - Pergantian pose diberi efek pantul dan gerak napas supaya tetap hidup.
  - Untuk animasi halus (berkedip, berbicara, transisi antar-emosi), mintalah
    desainer membuat rig di **Rive** atau Lottie [Kemungkinan Besar]. State
    machine Rive cocok untuk diam/benar/salah/berpikir.
- **Hak cipta:**
  - Jika lembar pose dibuat dengan generator gambar AI, kepemilikan hak
    ciptanya bisa lemah di beberapa negara.
  - Untuk maskot yang akan didaftarkan sebagai merek, sebaiknya desainer
    menggambar ulang versi final, dan berkas sumbernya dimiliki perusahaan
    [Kemungkinan Besar].

### 10.3 Di mana Capie muncul

| Tempat | Suasana | Isi balon |
|---|---|---|
| Halaman jual: hero | menyapa | perkenalan |
| Halaman jual: "Kenalan dengan Capie" | berpikir, benar, keliru (berulang) | 3 peran Capie dalam belajar |
| Halaman jual: ajakan terakhir | terbang | |
| Masuk / Daftar | menyapa → berpikir saat memeriksa → cemas saat gagal | arahan isi formulir |
| Pilih profil | menyapa / berpikir | "Siapa yang belajar…" |
| Peta belajar | berbicara / menyapa | ajakan lanjut atau mulai |
| Pemutar materi | berbicara saat diputar, berpikir saat pertanyaan, benar/keliru setelah dijawab, bersorak di akhir | (narasi di sampingnya) |
| Latihan soal | benar/keliru di kotak umpan balik; terbang/bersorak/cemas di hasil | pesan hasil |
| Materi terkunci | cemas | ajakan coba yang gratis |
| Pembayaran berhasil | terbang | "Semua materi terbuka" |
| Halaman tidak ada | jatuh (mata X) | "Aku nyasar" |

Capie adalah **satu pemandu yang berpindah**, bukan banyak salinan:

- Ia terbang dari tempat terakhirnya ke tempat berikutnya. Ini terjadi di halaman
  yang sama, saat halaman digulir, dan saat pindah halaman.
- Ia mendarat sebelum balonnya muncul.
- Tempat yang ditinggalkan kosong, supaya anak merasa Capie benar-benar
  mengikuti mereka.

Interaksi tambahan:

- Capie bereaksi saat disentuh.
- Capie tertidur setelah 40 detik tanpa aktivitas.

### 10.4 Aturan pemakaian

- **Capie tidak pernah mengejek jawaban salah.** Pose mata X hanya dipakai di
  halaman 404, tidak di soal.
- **Balon Capie tidak menjadi satu-satunya pembawa informasi penting.** Pesan
  kesalahan formulir tetap ditulis di bawah kolom isian.
- **Gerak dimatikan bila pengguna memilih "kurangi gerakan".** Capie tampil
  diam pada pose yang paling mewakili.
- **Hanya satu Capie pemandu.** Etalase di halaman jual (`guide: false`) adalah
  pengecualian, karena tugasnya memperkenalkan.
