// controller.js
import users from "./data.js";

/** Melihat data (pakai map) */
const index = () => {
  // kembalikan array terformat untuk ditampilkan
  return users.map(({ nama, umur, alamat, email }, i) => ({
    no: i + 1,
    nama,
    umur,
    alamat,
    email,
  }));
};

/** Menambahkan data (push minimal 2 data sekaligus) */
const store = (...newUsers) => {
  if (newUsers.length < 2) {
    throw new Error("Minimal tambahkan 2 data sekaligus.");
  }
  // validasi sederhana
  for (const u of newUsers) {
    if (!u?.nama || !u?.umur || !u?.alamat || !u?.email) {
      throw new Error("Wajib isi nama, umur, alamat, email.");
    }
    if (users.some((x) => x.email === u.email)) {
      throw new Error(`Email sudah terdaftar: ${u.email}`);
    }
  }
  users.push(...newUsers); // proses push minimal 2 data
  return index(); // boleh return tampilan terbaru
};

/** Menghapus data berdasarkan email */
const destroy = (email) => {
  const i = users.findIndex((u) => u.email === email);
  if (i === -1) return false;
  users.splice(i, 1);
  return true;
};

export { index, store, destroy };
 