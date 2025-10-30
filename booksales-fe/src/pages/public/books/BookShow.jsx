import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { showBooks } from "../../../_service/books";
import { createTransaction } from "../../../_service/transactions";
import { getToken } from "../../../_service/auth";

const toIDR = (num) =>
  typeof num === "number"
    ? num.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
      })
    : num;

const coverUrl = (cover) => {
  if (!cover) return "";

  // baseURL backend Laravel kamu
  const base = "http://127.0.0.1:8000";

  // kalau path udah full URL (misal dari CDN / storage full)
  if (cover.startsWith("http")) return cover;

  // kalau path hasil simpan di disk public (contoh: "books/xxx.jpg")
  return `${base}/storage/${cover.replace(/^\/+/, "")}`;
};

export default function BookShow() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [qty, setQty] = useState(1);
  const [buyLoading, setBuyLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await showBooks(id);
        const b = data?.data ?? data; // antisipasi payload wrapped
        setBook(b);
      } catch (e) {
        console.error(e);
        setErr(e?.message || "Gagal memuat detail buku.");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const onBuy = async () => {
    if (!getToken()) {
      alert("Silakan login terlebih dahulu.");
      navigate("/login");
      return;
    }
    if (!book) return;
    if (qty < 1) return alert("Quantity minimal 1.");
    if (qty > Number(book.stock)) return alert("Quantity melebihi stok.");

    try {
      setBuyLoading(true);
      const res = await createTransaction({ book_id: book.id, quantity: qty });
      alert("Transaksi berhasil dibuat!");
      // Optional: arahkan ke halaman transaksi admin / detail transaksi
      navigate("/admin/transactions");
    } catch (e) {
      const msg = e?.response?.data?.message || "Gagal membuat transaksi.";
      alert(msg);
      console.error(e?.response?.data || e.message);
    } finally {
      setBuyLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-12">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="h-96 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
            <div className="space-y-3">
              <div className="h-6 w-3/4 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
              <div className="h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
              <div className="h-4 w-2/3 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
              <div className="h-24 w-full rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (err || !book) {
    return (
      <section className="bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-12">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="rounded border border-red-200 bg-red-50 px-4 py-3 text-red-700">
            {err || "Buku tidak ditemukan."}
          </div>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Kembali
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-12">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
            {book.cover_photo ? (
              <img
                src={coverUrl(book.cover_photo)}
                alt={book.title}
                className="mx-auto h-full max-h-[28rem] w-full max-w-full rounded object-contain"
              />
            ) : (
              <div className="flex h-[28rem] items-center justify-center rounded bg-gray-100 text-gray-400 dark:bg-gray-700">
                No Cover
              </div>
            )}
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {book.title}
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {book.author?.name ||
                book.author_name ||
                (book.author_id
                  ? `Author #${book.author_id}`
                  : "Unknown Author")}
              {" · "}
              {book.genre?.name ||
                book.genre_name ||
                (book.genre_id ? `Genre #${book.genre_id}` : "Unknown Genre")}
            </p>

            <div className="mt-4 flex items-center gap-3">
              <span className="text-3xl font-extrabold text-gray-900 dark:text-white">
                {toIDR(Number(book.price))}
              </span>
              <span className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                Stok: {book.stock}
              </span>
            </div>

            {/* <div className="mt-4 flex items-center gap-3">
              <label
                htmlFor="qty"
                className="text-sm text-gray-700 dark:text-gray-300"
              >
                Qty
              </label>
              <input
                id="qty"
                type="number"
                min={1}
                max={Number(book.stock) || 1}
                value={qty}
                onChange={(e) =>
                  setQty(Math.max(1, Number(e.target.value || 1)))
                }
                className="w-24 rounded border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div> */}

            <div className="prose prose-sm mt-6 max-w-none dark:prose-invert">
              <h2 className="mb-1 text-base font-semibold dark:text-white">
                Deskripsi
              </h2>
              <p className="whitespace-pre-line dark:text-white">
                {book.description || "-"}
              </p>
            </div>

            <div className="mt-8 flex gap-3">
              <Link
                to="/books"
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Kembali ke daftar
              </Link>
              {/* contoh CTA (opsional) */}
              <button
                type="button"
                disabled={buyLoading || Number(book.stock) <= 0}
                onClick={onBuy}
                className="rounded-lg bg-indigo-700 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-800 focus:outline-none focus:ring-4 focus:ring-indigo-300 disabled:opacity-60 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
              >
                {buyLoading ? "Memproses..." : "Beli"}
              </button>
            </div>
          </div>
        </div>

        {/* Section kecil rekomendasi/related (opsional, bisa diisi nanti) */}
        {/* <div className="mt-12">
          <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Buku lain</h3>
          ...
        </div> */}
      </div>
    </section>
  );
}
