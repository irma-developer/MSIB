import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getGenre, updateGenre } from "../../../_service/genres";

export default function GenreEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const g = await getGenre(id);
        // antisipasi data {data: {...}} vs {...}
        const row = g?.data ?? g;
        setName(row?.name ?? "");
      } catch (e) {
        console.error(e);
        setError(e?.message || "Gagal memuat data genre.");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setSaving(true);
      await updateGenre(id, { name: name.trim() });
      alert("Genre updated!");
      navigate("/admin/genres");
    } catch (e) {
      console.error(e);
      const msg =
        e?.response?.data?.message ||
        // kalau pakai format Laravel default errors:
        Object.values(e?.response?.data?.errors || {})?.[0]?.[0] ||
        e?.message ||
        "Gagal mengubah genre.";
      setError(msg);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
        <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <p className="text-gray-700 dark:text-gray-200">Memuat data…</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
      <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden max-w-xl mx-auto p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Edit Genre
        </h2>

        {error && (
          <div className="mb-4 rounded bg-red-50 border border-red-200 text-red-700 px-4 py-2">
            {error}
          </div>
        )}

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

          <div className="flex gap-3">
            <button
              disabled={saving}
              className="px-5 py-2.5 rounded-lg text-sm text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-5 py-2.5 rounded-lg text-sm border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
