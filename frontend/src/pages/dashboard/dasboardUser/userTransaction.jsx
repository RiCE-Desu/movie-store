import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UserTransaction = () => {
  const { id } = useParams();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    try {
      const res = await fetch(`http://localhost:1210/transactions/user/${id}`);
      const data = await res.json();

      console.log("RAW DATA:", data);

      // Bikin agar selalu array, biar .map() gak error
      const finalData =
        Array.isArray(data)
          ? data
          : Array.isArray(data.data)
          ? data.data
          : Array.isArray(data.transactions)
          ? data.transactions
          : [];

      setTransactions(finalData);
    } catch (err) {
      console.error("Error fetching:", err);
      setTransactions([]); // fallback kalau error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [id]);

  if (loading) {
    return (
      <div className="text-white text-center mt-10 text-xl">
        Loading user transactions...
      </div>
    );
  }

  return (
    <div className="text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Riwayat Film User</h1>

      {transactions.length === 0 ? (
        <p className="text-gray-400">Tidak ada riwayat transaksi.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {transactions.map((tx, index) => (
            <div
              key={index}
              className="bg-zinc-900 border border-zinc-700 p-4 rounded-md"
            >
              <h2 className="font-semibold text-lg mb-2">{tx.movieTitle}</h2>
              <p className="text-gray-400">Movie ID: {tx.movieId}</p>
              <p className="text-gray-400">Tanggal: {tx.createdAt}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserTransaction;
