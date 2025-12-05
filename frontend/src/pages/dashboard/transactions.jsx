import { useEffect, useState } from "react";
import axios from "axios";

export default function Transactions() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/transactions")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Riwayat Pembelian Film</h2>

      <table className="w-full border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">User</th>
            <th className="border p-2">Film</th>
            <th className="border p-2">Harga</th>
            <th className="border p-2">Tanggal</th>
          </tr>
        </thead>

        <tbody>
          {data.map((trx) => (
            <tr key={trx.id} className="border">
              <td className="p-2">{trx.user.fullname}</td>
              <td className="p-2">{trx.movie.title}</td>
              <td className="p-2">${trx.price}</td>
              <td className="p-2">
                {new Date(trx.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
