//  Data awal produk minimal 5 produk
let produkList = [
  { id: 1, nama: "Laptop", harga: 12000000 },
  { id: 2, nama: "Smartphone", harga: 5000000 },
  { id: 3, nama: "Headset", harga: 750000 },
  { id: 4, nama: "Keyboard", harga: 350000 },
  { id: 5, nama: "Monitor", harga: 2500000 },
];

// Spread Operator untuk tambah produk
function tambahProduk(id, nama, harga) {
  const produkBaru = { id, nama, harga };
  produkList = [...produkList, produkBaru];
}

// Rest Parameter untuk hapus produk, disini aku pake hapus di tiap baris
function hapusProduk(...ids) {
  produkList = produkList.filter((p) => !ids.includes(p.id));
}

// Destructuring untuk menampilkan produk
function formatRupiah(n) {
  return "Rp" + n.toLocaleString("id-ID");
}
function tampilkanProduk() {
  const tbody = document.getElementById("tbody");
  tbody.innerHTML = "";
  for (let { id, nama, harga } of produkList) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${id}</td>
      <td>${nama}</td>
      <td>${formatRupiah(harga)}</td>
      <td><button class="btn-hapus" data-id="${id}">Hapus</button></td>
    `;
    tbody.appendChild(tr);
  }

  // pasang event listener untuk semua tombol hapus
  const hapusButtons = document.querySelectorAll(".btn-hapus");
  hapusButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number(btn.getAttribute("data-id"));
      hapusProduk(id);
      tampilkanProduk(); // refresh tabel setelah hapus
    });
  });
}

// Event Listener form tambah
const formTambah = document.getElementById("formTambah");
formTambah.addEventListener("submit", function (e) {
  e.preventDefault();
  const id = Number(document.getElementById("id").value);
  const nama = document.getElementById("nama").value.trim();
  const harga = Number(document.getElementById("harga").value);

  if (!id || !nama || !harga) {
    document.getElementById("msgTambah").textContent =
      "Isi ID, nama, dan harga.";
    return;
  }
  if (produkList.some((p) => p.id === id)) {
    document.getElementById("msgTambah").textContent = "ID sudah dipakai.";
    return;
  }

  tambahProduk(id, nama, harga);
  document.getElementById("msgTambah").textContent =
    "Produk berhasil ditambahkan.";
  formTambah.reset();
  tampilkanProduk();
});

// render awal
tampilkanProduk();
