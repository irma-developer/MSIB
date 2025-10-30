import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBooks } from "../../../_service/books";

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

export default function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const rows = await getBooks();
        setBooks(rows || []);
      } catch (e) {
        console.error(e);
        setErr(e?.message || "Gagal memuat buku.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <section className="bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-12">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
          Books
        </h1>

        {err && (
          <div className="mb-6 rounded border border-red-200 bg-red-50 px-4 py-2 text-red-700">
            {err}
          </div>
        )}

        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 animate-pulse"
              >
                <div className="mb-4 h-56 w-full rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
                <div className="mt-3 h-4 w-1/3 rounded bg-gray-200 dark:bg-gray-700" />
              </div>
            ))}
          </div>
        ) : (
          <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
            {books.length ? (
              books.map((b) => (
                <article
                  key={b.id}
                  className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
                >
                  <Link
                    to={`/books/${b.id}`}
                    className="block h-56 w-full overflow-hidden rounded"
                  >
                    {b.cover_photo ? (
                      <img
                        src={coverUrl(b.cover_photo)}
                        alt={b.title}
                        className="mx-auto h-full w-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center rounded bg-gray-100 text-gray-400 dark:bg-gray-700">
                        No Cover
                      </div>
                    )}
                  </Link>

                  <div className="pt-4">
                    <Link
                      to={`/books/${b.id}`}
                      className="line-clamp-2 text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white"
                    >
                      {b.title}
                    </Link>

                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {b.author?.name || `Author #${b.author_id}`} ·{" "}
                      {b.genre?.name || `Genre #${b.genre_id}`}
                    </p>

                    <div className="mt-3 flex items-center justify-between gap-4">
                      <p className="text-xl font-extrabold leading-tight text-gray-900 dark:text-white">
                        {toIDR(Number(b.price))}
                      </p>
                      <Link
                        to={`/books/${b.id}`}
                        className="inline-flex items-center rounded-lg bg-indigo-700 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-800 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                      >
                        Detail
                      </Link>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="col-span-full rounded border border-gray-200 bg-white p-8 text-center text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
                Belum ada buku.
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
