import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAuthors } from "../../../_service/authors";

export default function AdminAuthors() {
  const [authors, setAuthors] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const rows = await getAuthors();
        setAuthors(rows || []);
      } catch (e) {
        console.error(e);
        setError(e?.message || "Gagal mengambil data author");
      }
    })();
  }, []);

  return (
    <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
      <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
        {error && (
          <div className="bg-red-50 text-red-700 px-4 py-2">{error}</div>
        )}

        <div className="flex items-center justify-between p-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Authors
          </h2>
          <Link
            to="/admin/authors/create"
            className="flex items-center justify-center text-white bg-indigo-700 hover:bg-indigo-800 
              focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-4 py-2 
              dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none dark:focus:ring-indigo-800"
          >
            + Create Author
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Name</th>
              </tr>
            </thead>
            <tbody>
              {authors.length ? (
                authors.map((a) => (
                  <tr key={a.id} className="border-b dark:border-gray-700">
                    <td className="px-4 py-3">{a.id}</td>
                    <td className="px-4 py-3">{a.name}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2} className="px-4 py-6 text-center">
                    Data tidak ditemukan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
