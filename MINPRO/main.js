import readline from "readline";
import {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
  filterByRoomType,
  getTotalSpentByGuest,
  loadBookingsFromFile
} from "./functions.js";

// Load data saat awal
loadBookingsFromFile();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function showMenu() {
  console.log(`
====================================
🏨 SISTEM MANAJEMEN RESERVASI HOTEL
====================================
1. Lihat semua booking
2. Tambah booking baru
3. Cari booking berdasarkan ID
4. Ubah durasi menginap
5. Hapus booking
6. Filter berdasarkan tipe kamar
7. Hitung total pengeluaran tamu
0. Keluar
====================================
`);
}

function askMenu() {
  rl.question("Pilih menu (0-7): ", (choice) => {
    switch (choice) {
      case "1":
        getAllBookings();
        return askMenu();

      case "2":
        rl.question("Masukkan nama tamu: ", (namaTamu) => {
          rl.question("Masukkan nomor HP: ", (nomorHP) => {
            rl.question("Masukkan tipe kamar (Standard/Deluxe/Suite): ", (tipeKamar) => {
              rl.question("Masukkan tanggal check-in (YYYY-MM-DD): ", (checkIn) => {
                rl.question("Masukkan durasi menginap (malam): ", (durasiMalam) => {
                  createBooking({
                    namaTamu,
                    nomorHP,
                    tipeKamar,
                    checkIn,
                    durasiMalam: Number(durasiMalam)
                  });
                  askMenu();
                });
              });
            });
          });
        });
        break;

      case "3":
        rl.question("Masukkan ID booking: ", (id) => {
          getBookingById(id);
          askMenu();
        });
        break;

      case "4":
        rl.question("Masukkan ID booking yang ingin diubah: ", (id) => {
          rl.question("Masukkan durasi malam baru: ", (durasiMalam) => {
            updateBooking(id, { durasiMalam: Number(durasiMalam) });
            askMenu();
          });
        });
        break;

      case "5":
        rl.question("Masukkan ID booking yang ingin dihapus: ", (id) => {
          deleteBooking(id);
          askMenu();
        });
        break;

      case "6":
        rl.question("Masukkan tipe kamar: ", (tipe) => {
          filterByRoomType(tipe);
          askMenu();
        });
        break;

      case "7":
        rl.question("Masukkan nomor HP tamu: ", (nomorHP) => {
          getTotalSpentByGuest(nomorHP);
          askMenu();
        });
        break;

      case "0":
        console.log("Terima kasih!");
        rl.close();
        break;

      default:
        console.log("Pilihan tidak valid, coba lagi!");
        askMenu();
        break;
    }
  });
}

// Jalankan program
showMenu();
askMenu();