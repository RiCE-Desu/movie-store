import LayoutDashboard from "@/components/layout/layoutDashboard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getUserById } from "@/utils/api/users";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

function DetailUser() {

    const [user, setUser] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    const fetchUserById = async (id) => {
        try {
            const response = await getUserById(id);
            setUser(response);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchUserById(id);
    }, [id]);

  return (
  <LayoutDashboard>
    <div className="pt-10 flex justify-center">
      <div className="w-full max-w-3xl bg-white p-8 rounded-xl shadow-lg border border-gray-200">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Detail User</h2>

          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md"
          >
            ← Kembali
          </button>
        </div>

        {/* FORM DISPLAY */}
        <div className="flex flex-col gap-5">

          <div>
            <Label className="font-semibold text-gray-700">Nama Lengkap</Label>
            <Input disabled className="bg-gray-100" value={user.fullname || ""} />
          </div>

          <div>
            <Label className="font-semibold text-gray-700">Username</Label>
            <Input disabled className="bg-gray-100" value={user.username || ""} />
          </div>

          <div>
            <Label className="font-semibold text-gray-700">Email</Label>
            <Input disabled className="bg-gray-100" value={user.email || ""} />
          </div>

          <div>
            <Label className="font-semibold text-gray-700">Nomor Telepon</Label>
            <Input disabled className="bg-gray-100" value={user.phone_number || ""} />
          </div>

          <div>
            <Label className="font-semibold text-gray-700">Umur</Label>
            <Input disabled className="bg-gray-100" value={user.age || ""} />
          </div>

          <div>
            <Label className="font-semibold text-gray-700">Alamat</Label>
            <Input disabled className="bg-gray-100" value={user.address || ""} />
          </div>

          <div>
            <Label className="font-semibold text-gray-700">Role</Label>
            <Input disabled className="bg-gray-100" value={user.role || ""} />
          </div>

          {/* TOMBOL RIWAYAT TRANSAKSI */}
          <button
            onClick={() => navigate(`/dashboard/user/${id}/transactions`)}
            className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
          >
            Lihat Riwayat Film User
          </button>

        </div>
      </div>
    </div>
  </LayoutDashboard>
)};


export default DetailUser;