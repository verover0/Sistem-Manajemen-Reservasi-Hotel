import fs from "fs";
import { bookings } from "./data.js";

// Validasi Format Tanggal Check-in
export const isValidDate = (dateString) => {
  return !isNaN(Date.parse(dateString));
};

// Cek Duplikasi Reservasi Identik (.some())
export const isDuplicateBooking = (nomorHP, checkIn, tipeKamar) => {
  return bookings.some((b) => {
    return (
      b.nomorHP === nomorHP &&
      b.checkIn === checkIn &&
      b.tipeKamar.toLowerCase() === tipeKamar.toLowerCase()
    );
  });
};

// Generate ID Booking Otomatis
export const generateBookingId = (tipeKamar) => {
  const prefix = tipeKamar.substring(0, 3).toUpperCase();
  const randomNum = Math.floor(Math.random() * 900 + 100);
  return `HTL-${prefix}-${randomNum}`;
};

// Menentukan Harga Kamar
export const getRoomPrice = (tipeKamar) => {
  switch (tipeKamar.toLowerCase()) {
    case "standard":
      return 350000;
    case "deluxe":
      return 600000;
    case "suite":
      return 1000000;
    default:
      return 0;
  }
};

// Save data ke file JSON
export function saveBookingsToFile() {
  fs.writeFileSync("bookings.json", JSON.stringify(bookings, null, 2));
  console.log("Data booking berhasil disimpan ke bookings.json");
}

// Load data dari file JSON (jika ada)
export function loadBookingsFromFile() {
  if (fs.existsSync("bookings.json")) {
    const data = fs.readFileSync("bookings.json");
    const loaded = JSON.parse(data);
    bookings.splice(0, bookings.length, ...loaded); // replace isi array
    console.log("Data booking berhasil dimuat dari file.");
  } else {
    console.log("Belum ada file data yang tersimpan.");
  }
}

// CREATE
export const createBooking = (newBooking) => {
  // Validasi data wajib diisi
  if (!newBooking.namaTamu || !newBooking.nomorHP || !newBooking.tipeKamar || !newBooking.checkIn || !newBooking.durasiMalam) {
    console.log("Semua field wajib diisi!");
    return;
  }

  // Validasi format tanggal check-in
  if (!isValidDate(newBooking.checkIn)) {
    console.log("Format tanggal check-in tidak valid!");
    return;
  }

  // Validasi tipe kamar
  if (getRoomPrice(newBooking.tipeKamar) === 0) {
    console.log("Tipe kamar tidak valid! Pilih: Standard, Deluxe, atau Suite.");
    return;
  }

  // Generate ID otomatis
  if (!newBooking.bookingId) {
    newBooking.bookingId = generateBookingId(newBooking.tipeKamar);
  }

  // Cek duplikat reservasi
  if (isDuplicateBooking(newBooking.nomorHP, newBooking.checkIn, newBooking.tipeKamar)) {
    console.log(`Nomor HP ${newBooking.nomorHP} sudah punya reservasi ${newBooking.tipeKamar} pada tanggal ${newBooking.checkIn}!`);
    return;
  }

  // Masukkan objek langsung dan simpan
  bookings.push(newBooking);
  saveBookingsToFile();
  console.log(`Booking ${newBooking.bookingId} berhasil dibuat.`);
};

// READ ALL
export const getAllBookings = () => {
  console.log("Daftar Semua Booking Hotel:");
  console.table(bookings);
  return bookings;
};

// READ BY ID
export const getBookingById = (id) => {
  const booking = bookings.find((b) => b.bookingId === id);
  if (!booking) {
    console.log(`Booking dengan ID ${id} tidak ditemukan.`);
    return null;
  }
  console.table([booking]);
  return booking;
};

// UPDATE
export const updateBooking = (id, updatedData) => {
  const index = bookings.findIndex((b) => b.bookingId === id);
  if (index === -1) {
    console.log(`Booking dengan ID ${id} tidak ditemukan.`);
    return;
  }

  // Validasi perubahan durasi malam
  if (updatedData.durasiMalam && (isNaN(updatedData.durasiMalam) || updatedData.durasiMalam <= 0)) {
    console.log("Durasi malam tidak valid!");
    return;
  }

  bookings[index] = { ...bookings[index], ...updatedData };
  saveBookingsToFile();
  console.log(`Data booking ${id} berhasil diperbarui.`);
};

// DELETE
export const deleteBooking = (id) => {
  const index = bookings.findIndex((b) => b.bookingId === id);
  if (index === -1) {
    console.log(`Booking dengan ID ${id} tidak ditemukan.`);
    return;
  }
  bookings.splice(index, 1);
  saveBookingsToFile();
  console.log(`Booking dengan ID ${id} berhasil dihapus!`);
};

// Total pengeluaran tamu
export const getTotalSpentByGuest = (nomorHP) => {
  const total = bookings.filter(b => b.nomorHP === nomorHP).reduce((sum, b) => sum + (getRoomPrice(b.tipeKamar) * b.durasiMalam), 0);
  console.log(`Total tagihan untuk Nomor HP ${nomorHP}: Rp ${total}`);
  return total;
};

// Filter berdasarkan tipe kamar (.filter())
export const filterByRoomType = (tipe) => {
  const filtered = bookings.filter(b =>
    b.tipeKamar.toLowerCase() === tipe.toLowerCase()
  );
  console.log(`Daftar reservasi tipe kamar ${tipe}:`);
  console.table(filtered);
  return filtered;
};