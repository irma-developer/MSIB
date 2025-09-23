// Array produkToko
let produkToko = [
  { id: 1, nama: "Laptop", harga: 7000000, stok: 5 },
  { id: 2, nama: "Mouse", harga: 200000, stok: 10 },
  { id: 3, nama: "Keyboard", harga: 350000, stok: 7 },
];

// Fungsi untuk menambahkan produk baru
function tambahProduk(nama, harga, stok) {
  let idBaru = produkToko.length + 1;
  produkToko.push({ id: idBaru, nama: nama, harga: harga, stok: stok });
}

// Fungsi untuk menghapus produk berdasarkan id
function hapusProduk(id) {
  for (let i = 0; i < produkToko.length; i++) {
    if (produkToko[i].id === id) {
      produkToko.splice(i, 1);
      break;
    }
  }
}

// Fungsi untuk menampilkan daftar produk
function tampilkanProduk() {
  console.log("Daftar Produk:");
  for (let i = 0; i < produkToko.length; i++) {
    console.log(
      produkToko[i].id +
        ". " +
        produkToko[i].nama +
        " - Rp" +
        produkToko[i].harga +
        " (Stok: " +
        produkToko[i].stok +
        ")"
    );
  }
}

// Contoh penggunaan
tampilkanProduk();
tambahProduk("Webcam", 450000, 8);
hapusProduk(2);
tampilkanProduk();
