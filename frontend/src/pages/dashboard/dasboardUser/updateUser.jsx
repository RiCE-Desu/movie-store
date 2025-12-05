import LayoutDashboard from "@/components/layout/layoutDashboard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getUserById, updateUser } from "@/utils/api/users";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function UpdateUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullname: "",
    username: "",
    email: "",
    phone_number: "",
    age: "",
    address: "",
    role: "user",
  });

  const [loading, setLoading] = useState(false);

  const fetchUserById = async () => {
    try {
      const response = await getUserById(id);
      setForm(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserById();
  }, [id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await updateUser(id, form);
      navigate("/dashboard/user");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

    return (
  <div className="pt-10 flex justify-center">
    <div className="w-full max-w-3xl bg-white/5 backdrop-blur-md p-8 rounded-xl shadow-lg border border-white/10">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Update User</h2>

        <Button
          variant="secondary"
          onClick={() => navigate(-1)}
        >
          ← Kembali
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        <div className="col-span-2">
          <label className="font-medium">Nama Lengkap</label>
          <Input name="fullname" value={form.fullname} onChange={handleChange} />
        </div>

        <div>
          <label className="font-medium">Username</label>
          <Input name="username" value={form.username} onChange={handleChange} />
        </div>

        <div>
          <label className="font-medium">Email</label>
          <Input name="email" value={form.email} onChange={handleChange} />
        </div>

        <div>
          <label className="font-medium">Nomor Telepon</label>
          <Input name="phone_number" value={form.phone_number} onChange={handleChange} />
        </div>

        <div>
          <label className="font-medium">Umur</label>
          <Input name="age" value={form.age} onChange={handleChange} />
        </div>

        <div className="col-span-2">
          <label className="font-medium">Alamat</label>
          <Input name="address" value={form.address} onChange={handleChange} />
        </div>

        <div className="col-span-2">
          <label className="font-medium">Role</label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full border p-2 rounded-md bg-white"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <Button
          className="col-span-2 w-full"
          disabled={loading}
          onClick={handleSubmit}
        >
          {loading ? "Saving..." : "Simpan Perubahan"}
        </Button>
      </div>
    </div>
  </div>
)};
