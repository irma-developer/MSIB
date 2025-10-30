import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  listTransactions,
  deleteTransaction,
} from "../../../_service/transactions";

const fmtIDR = (n) =>
  typeof n === "number"
    ? n.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
      })
    : n;

export default function AdminTransactions() {
  const [rows, setRows] = useState([]);
  const [err, setErr] = useState("");

  const fetchData = async () => {
    try {
      const data = await listTransactions();
      setRows(data || []);
    } catch (e) {
      console.error(e);
      setErr(e?.message || "Gagal memuat transaksi.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Hapus transaksi ini?")) return;
    try {
      await deleteTransaction(id);
      setRows((s) => s.filter((x) => x.id !== id));
    } catch (e) {
      alert(e?.response?.data?.message || "Gagal menghapus transaksi.");
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
      <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
        {err && <div className="bg-red-50 text-red-700 px-4 py-2">{err}</div>}

        <div className="flex items-center justify-between p-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Transactions
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-4 py-3">Order</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Book</th>
                <th className="px-4 py-3">Qty</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.length ? (
                rows.map((t) => (
                  <tr key={t.id} className="border-b dark:border-gray-700">
                    <td className="px-4 py-3">{t.order_number}</td>
                    <td className="px-4 py-3">
                      {t.user?.name || `User #${t.customer_id}`}
                    </td>
                    <td className="px-4 py-3">
                      {t.book?.title || `Book #${t.book_id}`}
                    </td>
                    <td className="px-4 py-3">{t.quantity}</td>
                    <td className="px-4 py-3">
                      {fmtIDR(Number(t.total_amount))}
                    </td>
                    <td className="px-4 py-3 text-right space-x-2">
                      <Link
                        to={`/admin/transactions/edit/${t.id}`}
                        className="px-3 py-1 rounded bg-indigo-600 text-white hover:bg-indigo-700"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(t.id)}
                        className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-center">
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
