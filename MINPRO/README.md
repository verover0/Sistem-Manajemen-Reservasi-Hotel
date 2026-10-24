# SISTEM MANAJEMEN RESERVASI HOTEL
Program ini memungkinkan pengguna untuk mengelola reservasi hotel secara interaktif melalui terminal (CLI) dengan fitur CRUD (Create, Read, Update, Delete) serta beberapa fitur tambahan seperti validasi input, penyimpanan data ke file JSON, dan perhitungan total pengeluaran tamu.

## Fitur
- Menampilkan semua data reservasi dalam bentuk tabel.
- Menambahkan reservasi baru dengan validasi otomatis.
- Menampilkan detail reservasi tertentu berdasarkan ID booking.
- Memperbarui data reservasi (durasi menginap) tertentu.
- Menghapus reservasi berdasarkan ID booking.
- Menampilkan daftar reservasi berdasarkan tipe kamar.
- Menghitung total pengeluaran tamu berdasarkan nomor HP.
- Menyimpan seluruh data reservasi ke file bookings.json.
- Memuat data reservasi dari bookings.json saat program dijalankan.

## Cara Menjalankan
- Pastikan Node.js sudah terinstal.
- Buka terminal dan arahkan ke folder proyek.
- Ubah package.json agar menggunakan module.
- Jalankan program dengan : node main.js

## Format Data Reservasi
Setiap data reservasi disimpan dalam bentuk object di dalam array.

{
    "bookingId": "HTL-STA-101",
    "namaTamu": "Ahmad Rizky",
    "nomorHP": "081111111111",
    "tipeKamar": "Standard",
    "checkIn": "2026-11-01",
    "durasiMalam": 2
}

## Struktur Project 
- data.js       -> Berisi array data reservasi awal
- functions.js  -> Berisi function-function CRUD dan fitur tambahan
- main.js       -> Program utama interaktif (CLI)
- package.json  -> Konfigurasi Node.js project
- bookings.json -> File penyimpanan data reservasi (otomatis dibuat)
- README.md     -> Penjelasan proyek

## Penggunaan
1. Pilih menu 1-7 sesuai operasi yang diinginkan
2. Ikuti instruksi yang muncul di layar
3. Pilih 0 untuk keluar dari program

## Requirements
- Node.js v22.15.0
- Terminal/Command Prompt

## Author
- Nama: Meira Surya Savero
- Tema Proyek: Sistem Manajemen Reservasi Hotel
- Kelas: Trial Study Club Backend Basic KSM VeteranTech UPNVJ 2026
- Mentor: Nadia Jasmine Aulia