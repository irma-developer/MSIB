import { useEffect, useState } from "react";
import { getBooks, deleteBooks } from "../../../_service/books";
import { getGenres } from "../../../_service/genres";
// di top file
import { Link } from "react-router-dom";
import { getAuthors } from "../../../_service/authors";

export default function AdminBooks() {
  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [authors, setAuthors] = useState([]);

  const [showConfirm, setShowConfirm] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);
  // konsisten pakai openDropdownId
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [booksData, genresData, authorsData] = await Promise.all([
          getBooks(),
          getGenres(),
          getAuthors(),
        ]);
        setBooks(booksData || []);
        setGenres(genresData || []);
        setAuthors(authorsData || []);
      } catch (e) {
        console.error(e);
        setError(e?.message || "Gagal mengambil data");
      }
    };
    fetchData();
  }, []);

  const getGenreName = (id) => {
    const genre = genres.find((g) => g.id === id);
    return genre ? genre.name : "Unknown Genre";
  };

  const getAuthorName = (id) => {
    const author = authors.find((a) => a.id === id);
    return author ? author.name : "Unknown Author";
  };

  // toggle yang benar
  const toggleDropdown = (id) => {
    setOpenDropdownId((prev) => (prev === id ? null : id));
  };

  // contoh handler (nanti sambungkan ke router/logic kamu)
  const handleEdit = (book) => {
    console.log("Edit", book);
    // contoh: navigate(`/admin/books/${book.id}/edit`);
  };

  // buka modal konfirmasi
  const openDeleteConfirm = (book) => {
    setBookToDelete(book);
    setShowConfirm(true);
    setOpenDropdownId(null);
  };

  const closeDeleteConfirm = () => {
    setShowConfirm(false);
    setBookToDelete(null);
  };

  const confirmDelete = async () => {
    if (!bookToDelete) return;
    try {
      await deleteBooks(bookToDelete.id);
      setBooks((prev) => prev.filter((b) => b.id !== bookToDelete.id));
    } catch (err) {
      console.error("Failed to delete book:", err);
      alert("Gagal menghapus buku.");
    } finally {
      closeDeleteConfirm();
    }
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
          {error && (
            <div className="bg-red-50 text-red-700 px-4 py-2">{error}</div>
          )}

          <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
            <div className="w-full md:w-1/2">
              <form className="flex items-center">
                <label htmlFor="simple-search" className="sr-only">
                  Search
                </label>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="simple-search"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                    placeholder="Search"
                  />
                </div>
              </form>
            </div>

            <Link
              to="/admin/books/create"
              className="flex items-center justify-center text-white bg-indigo-700 hover:bg-indigo-800 
             focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-4 py-2 
             dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none dark:focus:ring-indigo-800"
            >
              <svg
                className="h-3.5 w-3.5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                />
              </svg>
              Add product
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Stock</th>
                  <th className="px-4 py-3">Cover</th>
                  <th className="px-4 py-3">Genre</th>
                  <th className="px-4 py-3">Author</th>
                  <th className="px-4 py-3 text-right">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {books.length > 0 ? (
                  books.map((book) => (
                    <tr key={book.id} className="border-b dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {book.title}
                      </th>
                      <td className="px-4 py-3">{book.price}</td>
                      <td className="px-4 py-3">{book.stock}</td>
                      <td className="px-4 py-3">{book.cover_photo}</td>
                      <td className="px-4 py-3">
                        {getGenreName(book.genre_id)}
                      </td>
                      <td className="px-4 py-3">
                        {getAuthorName(book.author_id)}
                      </td>
                      <td className="px-4 py-3 text-right relative">
                        <button
                          id={`dropdownButton-${book.id}`}
                          onClick={() => toggleDropdown(book.id)}
                          data-dropdown-toggle="dropdown"
                          className="inline-flex items-center p-0.5 text-sm text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                          type="button"
                        >
                          <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                          </svg>
                        </button>

                        {openDropdownId === book.id && (
                          <div className="absolute right-0 mt-2 w-36 z-10 bg-white rounded border border-gray-200 shadow-md dark:bg-gray-700 dark:border-gray-600">
                            <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
                              <li>
                                <Link
                                  to={`/admin/books/edit/${book.id}`}
                                  // kalau mau kirim data buku tanpa fetch lagi:
                                  state={{ book }}
                                  onClick={() => handleEdit(book.id)}
                                  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  Edit
                                </Link>
                              </li>
                              <li>
                                <button
                                  type="button"
                                  onClick={() => openDeleteConfirm(book)}
                                  className="w-full text-right block py-2 px-4 hover:bg-gray-100 text-red-600 dark:hover:bg-gray-600 dark:text-red-400"
                                >
                                  Delete
                                </button>
                              </li>
                            </ul>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-4 py-6 text-center">
                      Data tidak ditemukan
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <nav
            className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
            aria-label="Table navigation"
          >
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              Showing{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                1-10
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                1000
              </span>
            </span>
            <ul className="inline-flex items-stretch -space-x-px">
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Previous
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  1
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  2
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Next
                </a>
              </li>
            </ul>
          </nav>
          {showConfirm && (
            <div className="fixed inset-0 z-40 flex items-center justify-center">
              {/* backdrop */}
              <div
                className="absolute inset-0 bg-black/50"
                onClick={closeDeleteConfirm}
              />
              {/* modal card */}
              <div className="relative z-50 w-full max-w-md rounded-lg bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Hapus buku?
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  Aksi ini tidak bisa dibatalkan.{" "}
                  {bookToDelete && (
                    <span>
                      Buku:{" "}
                      <span className="font-medium">{bookToDelete.title}</span>
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
    </>
  );
}
