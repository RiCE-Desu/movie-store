import { useEffect, useState } from "react";
import axios from "axios";

export default function UserLog() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/login-logs")
      .then((res) => setLogs(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Daftar Login User</h2>

      <table className="w-full border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">User</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Login Time</th>
          </tr>
        </thead>

        <tbody>
          {logs.map((log) => (
            <tr key={log.id} className="border">
              <td className="p-2">{log.user.fullname}</td>
              <td className="p-2 capitalize">{log.user.role}</td>
              <td className="p-2">{log.user.email}</td>
              <td className="p-2">{new Date(log.loginTime).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
