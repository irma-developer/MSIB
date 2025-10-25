import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAuthors } from "../../../_service/authors"; // <— plural & nama tepat

export default function AuthorCreate() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await createAuthors({ name });
      alert("Author created!");
      navigate("/admin/authors");
    } catch (e) {
      console.log(e);
      alert("Gagal membuat author. Cek validasi backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
      <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden max-w-xl mx-auto p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Create Author
        </h2>
        <form onSubmit={submit}>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            Name
          </label>
          <input
            className="w-full mb-4 p-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Agustinus Wibowo"
            required
          />
          <button
            disabled={loading}
            className="px-5 py-2.5 rounded-lg text-sm text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60"
          >
            {loading ? "Saving..." : "Create Author"}
          </button>
        </form>
      </div>
    </section>
  );
}
