// src/components/shared/ProductList/index.jsx
import { useState } from "react";
import booksSeed from "../../../utils/books.js";
import BookCard from "../../elements/BookCard.jsx";

export default function ProductList({ title = "Best Seller", showAddButton = true }) {
  const [books, setBooks] = useState(booksSeed);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "", author: "", year: "", description: "", image: ""
  });

  const nextId = () => (books.length ? Math.max(...books.map(b => b.id)) + 1 : 1);

  // Auto tambah (sesuai minimal tugas)
  const handleAdd = () => {
    const id = nextId();
    const newBook = {
      id,
      title: `New Book #${id}`,
      author: "Anonymous",
      year: new Date().getFullYear(),
      description: "Contoh buku yang ditambahkan via tombol.",
      image: `https://picsum.photos/seed/book${id}/400/260`,
    };
    setBooks(prev => [newBook, ...prev]);
  };

  // Tambah via form (bonus)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = nextId();
    const newBook = {
      id,
      title: form.title || `New Book #${id}`,
      author: form.author || "Anonymous",
      year: Number(form.year) || new Date().getFullYear(),
      description: form.description || "Buku baru ditambahkan via form.",
      image: form.image || `https://picsum.photos/seed/book${id}/400/260`,
    };
    setBooks(prev => [newBook, ...prev]);
    setForm({ title: "", author: "", year: "", description: "", image: "" });
    setShowForm(false);
  };

  return (
    <section id="books" className="py-5 text-center container">
      <div className="row py-lg-5">
        <div className="col-lg-8 col-md-10 mx-auto">
          <h2 className="fw-bold mb-2">{title}</h2>
          <p className="text-body-secondary mb-3">
            Koleksi pilihan dengan ulasan terbaik dari pembaca. Temukan bacaan favorit
            untuk temani rutinitasmu.
          </p>

          {showAddButton && (
            <div className="d-flex justify-content-center mt-4 mb-4 gap-2">
              <button onClick={handleAdd} className="btn btn-primary btn-sm px-3">
                + Auto Tambah
              </button>
              <button
                onClick={() => setShowForm(v => !v)}
                className="btn btn-outline-secondary btn-sm px-3"
              >
                {showForm ? "Tutup Form" : "Tambah via Form"}
              </button>
            </div>
          )}

          {showForm && (
            <div className="text-start mx-auto" style={{maxWidth: 720}}>
              <form onSubmit={handleSubmit} className="p-3 border rounded bg-white shadow-sm">
                <div className="row g-3">
                  <div className="col-sm-6">
                    <label className="form-label">Judul</label>
                    <input name="title" value={form.title} onChange={handleChange} className="form-control" />
                  </div>
                  <div className="col-sm-6">
                    <label className="form-label">Penulis</label>
                    <input name="author" value={form.author} onChange={handleChange} className="form-control" />
                  </div>
                  <div className="col-sm-4">
                    <label className="form-label">Tahun</label>
                    <input name="year" type="number" value={form.year} onChange={handleChange} className="form-control" />
                  </div>
                  <div className="col-sm-8">
                    <label className="form-label">URL Gambar (opsional)</label>
                    <input name="image" value={form.image} onChange={handleChange} className="form-control" />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Deskripsi</label>
                    <textarea name="description" rows={3} value={form.description} onChange={handleChange} className="form-control" />
                  </div>
                </div>
                <div className="d-flex justify-content-end gap-2 mt-3">
                  <button type="button" onClick={() => setShowForm(false)} className="btn btn-light">Batal</button>
                  <button type="submit" className="btn btn-success">Simpan</button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* grid buku */}
      <div className="container mt-4">
        <div className="row g-4">
          {books.map((b) => (
            <div key={b.id} className="col-12 col-sm-6 col-lg-4">
              <BookCard book={b} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
