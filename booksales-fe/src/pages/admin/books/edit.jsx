import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getGenres } from "../../../_service/genres";
import { getAuthors } from "../../../_service/authors";
import { showBooks, updateBooks } from "../../../_service/books";

export default function AdminBooksEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [genres, setGenres] = useState([]);
  const [authors, setAuthors] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    price: 0,
    stock: 0,
    genre_id: "",
    author_id: "",
    cover_photo: null, // file baru (opsional)
    description: "",
  });

  // simpan cover lama untuk preview jika user tidak ganti
  const [existingCoverUrl, setExistingCoverUrl] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [genresData, authorsData, bookData] = await Promise.all([
          getGenres(),
          getAuthors(),
          showBooks(id),
        ]);

        setGenres(genresData || []);
        setAuthors(authorsData || []);

        // antisipasi bentuk bookData (flat / nested)
        const b = bookData?.data ?? bookData; // kalau backend bungkus dengan {data: {...}}

        setFormData({
          title: b?.title ?? "",
          price: Number(b?.price ?? 0),
          stock: Number(b?.stock ?? 0),
          genre_id: b?.genre_id ?? "",
          author_id: b?.author_id ?? "",
          cover_photo: null, // kosongkan; hanya kirim jika user upload baru
          description: b?.description ?? "",
        });

        // kalau backend mengembalikan path/url cover lama:
        setExistingCoverUrl(b?.cover_photo_url || b?.cover_photo || "");
      } catch (e) {
        console.error(e);
        setError(e?.message || "Gagal memuat data buku.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;

    if (name === "cover_photo") {
      setFormData((prev) => ({
        ...prev,
        cover_photo: files && files[0] ? files[0] : null,
      }));
      return;
    }

    // pastikan numeric utk number/select id jika perlu
    if (["price", "stock"].includes(name)) {
      setFormData((prev) => ({ ...prev, [name]: Number(value) }));
    } else if (["genre_id", "author_id"].includes(name)) {
      // biarkan string jika backend menerima string id; kalau perlu angka:
      setFormData((prev) => ({ ...prev, [name]: value }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setSaving(true);

      const payload = new FormData();
      payload.append("title", formData.title);
      payload.append("price", formData.price);
      payload.append("stock", formData.stock);
      payload.append("genre_id", formData.genre_id);
      payload.append("author_id", formData.author_id);
      payload.append("description", formData.description);

      // hanya kirim cover_photo jika user memilih file baru
      if (formData.cover_photo instanceof File) {
        payload.append("cover_photo", formData.cover_photo);
      }

      await updateBooks(id, payload);

      alert("Book updated successfully!");
      navigate("/admin/books");
    } catch (e) {
      console.error(e);
      setError(
        e?.response?.data?.message || e?.message || "Gagal menyimpan perubahan."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <section className="bg-white dark:bg-gray-900">
        <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
          <p className="text-gray-700 dark:text-gray-200">Memuat data…</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Edit Book
          </h2>

          {error && (
            <div className="mb-4 rounded bg-red-50 border border-red-200 text-red-700 px-4 py-2">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
              <div className="sm:col-span-2">
                <label
                  htmlFor="title"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                  placeholder="Book Title"
                  required
                />
              </div>

              <div className="w-full">
                <label
                  htmlFor="price"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                  placeholder="e.g. 1500000"
                  required
                />
              </div>

              <div className="w-full">
                <label
                  htmlFor="stock"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Stock
                </label>
                <input
                  type="number"
                  name="stock"
                  id="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                  placeholder="e.g. 10"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="genre_id"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Genre
                </label>
                <select
                  id="genre_id"
                  name="genre_id"
                  value={formData.genre_id}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                >
                  <option value="">-- Select Genre --</option>
                  {genres.map((genre) => (
                    <option key={genre.id} value={genre.id}>
                      {genre.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="author_id"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Author
                </label>
                <select
                  id="author_id"
                  name="author_id"
                  value={formData.author_id}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                >
                  <option value="">-- Select Author --</option>
                  {authors.map((author) => (
                    <option key={author.id} value={author.id}>
                      {author.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-full">
                <label
                  htmlFor="cover_photo"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Cover Photo
                </label>

                {/* preview cover lama (jika ada) */}
                {existingCoverUrl && !formData.cover_photo && (
                  <div className="mb-2">
                    <img
                      src={existingCoverUrl}
                      alt="Current cover"
                      className="h-24 rounded border"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Cover saat ini. Pilih file baru jika ingin mengganti.
                    </p>
                  </div>
                )}

                <input
                  type="file"
                  name="cover_photo"
                  id="cover_photo"
                  accept="image/*"
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full cursor-pointer focus:ring-indigo-600 dark:border-gray-600 dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                />
                {/* preview file baru (jika dipilih) */}
                {formData.cover_photo && (
                  <div className="mt-2">
                    <img
                      src={URL.createObjectURL(formData.cover_photo)}
                      alt="New cover preview"
                      className="h-24 rounded border"
                    />
                  </div>
                )}
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="8"
                  value={formData.description}
                  onChange={handleChange}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                  placeholder="Write a product description here..."
                ></textarea>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                type="submit"
                disabled={saving}
                className="text-white bg-indigo-700 hover:bg-indigo-800 disabled:opacity-60 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
              >
                {saving ? "Saving..." : "Save Book"}
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="text-gray-600 inline-flex items-center hover:text-white border border-gray-600 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-gray-500 dark:text-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-900"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
