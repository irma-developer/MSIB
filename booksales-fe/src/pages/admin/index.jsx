import { useEffect, useState } from "react";
import { getBooks } from "../../_service/books";
import { getGenres } from "../../_service/genres";
import { getAuthors } from "../../_service/authors";

export default function Dashboard() {
  const [stats, setStats] = useState({
    books: 0,
    genres: 0,
    authors: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [books, genres, authors] = await Promise.all([
          getBooks(),
          getGenres(),
          getAuthors(),
        ]);

        setStats({
          books: books.length,
          genres: genres.length,
          authors: authors.length,
        });
      } catch (err) {
        console.error("Error fetching dashboard stats:", err);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  return (
    <section className="bg-gray-50 dark:bg-gray-900 p-6 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          📊 Dashboard Booksales
        </h1>

        {loading ? (
          <div className="flex justify-center items-center h-40 text-gray-500">
            Loading...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Total Books */}
            <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                    Total Books
                  </h2>
                  <p className="mt-2 text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                    {stats.books}
                  </p>
                </div>
                <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-indigo-600 dark:text-indigo-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6V4m0 16v-2m8-6h2m-2 0a8 8 0 11-16 0 8 8 0 0116 0zm-4 0h2m-6 4v2m0-2a4 4 0 100-8 4 4 0 000 8z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Total Genres */}
            <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                    Total Genres
                  </h2>
                  <p className="mt-2 text-3xl font-bold text-green-600 dark:text-green-400">
                    {stats.genres}
                  </p>
                </div>
                <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-green-600 dark:text-green-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c.9 0 1.7.4 2.2 1.1l6.4-6.4a1 1 0 10-1.4-1.4l-6.4 6.4A3.001 3.001 0 0012 8zM3 21a9 9 0 0118 0H3z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Total Authors */}
            <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                    Total Authors
                  </h2>
                  <p className="mt-2 text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                    {stats.authors}
                  </p>
                </div>
                <div className="bg-yellow-100 dark:bg-yellow-900 p-3 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-yellow-600 dark:text-yellow-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 4h10M5 10h14M5 10a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2M5 10V8a2 2 0 012-2h10a2 2 0 012 2v2"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
