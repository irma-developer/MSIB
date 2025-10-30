import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAuthors, deleteAuthor } from "../../../_service/authors";

export default function AdminAuthors() {
  const [authors, setAuthors] = useState([]);
  const [error, setError] = useState("");

  // modal konfirmasi delete
  const [showConfirm, setShowConfirm] = useState(false);
  const [authorToDelete, setAuthorToDelete] = useState(null);

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

  const openDeleteConfirm = (author) => {
    setAuthorToDelete(author);
    setShowConfirm(true);
  };
  const closeDeleteConfirm = () => {
    setShowConfirm(false);
    setAuthorToDelete(null);
  };
  const confirmDelete = async () => {
    if (!authorToDelete) return;
    try {
      await deleteAuthor(authorToDelete.id);
      setAuthors((prev) => prev.filter((a) => a.id !== authorToDelete.id));
    } catch (e) {
      console.error(e);
      alert("Gagal menghapus author (cek relasi buku).");
    } finally {
      closeDeleteConfirm();
    }
  };

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
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {authors.length ? (
                authors.map((a) => (
                  <tr key={a.id} className="border-b dark:border-gray-700">
                    <td className="px-4 py-3">{a.id}</td>
                    <td className="px-4 py-3">{a.name}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="inline-flex gap-2">
                        <Link
                          to={`/admin/authors/edit/${a.id}`}
                          className="px-3 py-1.5 rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                        >
                          Edit
                        </Link>
                        <button
                          type="button"
                          onClick={() => openDeleteConfirm(a)}
                          className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="px-4 py-6 text-center">
                    Data tidak ditemukan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal konfirmasi delete */}
        {showConfirm && (
          <div className="fixed inset-0 z-40 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={closeDeleteConfirm}
            />
            <div className="relative z-50 w-full max-w-md rounded-lg bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Hapus author?
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                Aksi ini tidak bisa dibatalkan.{" "}
                {authorToDelete && (
                  <span>
                    Author:{" "}
                    <span className="font-medium">{authorToDelete.name}</span>
                  </span>
                )}
              </p>
              <div className="mt-6 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={closeDeleteConfirm}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={confirmDelete}
                  className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white"
                >
                  Ya, hapus
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
