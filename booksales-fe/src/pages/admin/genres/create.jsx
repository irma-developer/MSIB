import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createGenre } from "../../../_service/genres";

export default function GenreCreate() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await createGenre({ name }); // kirim { name: "..." } ke backend
      alert("Genre created!");
      navigate("/admin/genres");
    } catch (e) {
      console.error(e);
      alert("Gagal membuat genre. Cek validasi backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
      <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden max-w-xl mx-auto p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Create Genre
        </h2>
        <form onSubmit={submit}>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mb-4 p-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            placeholder="e.g. Fantasy"
            required
          />
          <button
            disabled={loading}
            className="px-5 py-2.5 rounded-lg text-sm text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60"
          >
            {loading ? "Saving..." : "Create Genre"}
          </button>
        </form>
      </div>
    </section>
  );
}
