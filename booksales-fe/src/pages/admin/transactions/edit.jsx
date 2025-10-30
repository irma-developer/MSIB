import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  showTransaction,
  updateTransaction,
} from "../../../_service/transactions";

export default function TransactionEdit() {
  const { id } = useParams();
  const nav = useNavigate();
  const [trx, setTrx] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await showTransaction(id);
        setTrx(data);
        setQty(Number(data?.quantity || 1));
      } catch (e) {
        console.error(e);
        setErr(e?.message || "Gagal memuat transaksi.");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateTransaction(id, { quantity: Number(qty) });
      alert("Transaksi diupdate.");
      nav("/admin/transactions");
    } catch (e) {
      alert(e?.response?.data?.message || "Gagal update transaksi.");
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (err || !trx)
    return (
      <div className="p-4 text-red-600">{err || "Data tidak ditemukan."}</div>
    );

  return (
    <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
      <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden max-w-xl mx-auto p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Edit Transaction
        </h2>

        <div className="mb-4 text-sm text-gray-600 dark:text-gray-300">
          <div>
            Order: <b>{trx.order_number}</b>
          </div>
          <div>Customer: {trx.user?.name || `User #${trx.customer_id}`}</div>
          <div>Book: {trx.book?.title || `Book #${trx.book_id}`}</div>
        </div>

        <form onSubmit={onSubmit}>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            Quantity
          </label>
          <input
            type="number"
            min={1}
            value={qty}
            onChange={(e) => setQty(Math.max(1, Number(e.target.value || 1)))}
            className="w-full mb-4 p-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            required
          />

          <div className="flex gap-2">
            <button className="px-5 py-2.5 rounded-lg text-sm text-white bg-indigo-600 hover:bg-indigo-700">
              Save
            </button>
            <Link
              to="/admin/transactions"
              className="px-5 py-2.5 rounded-lg text-sm border border-gray-300 dark:border-gray-600"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}
