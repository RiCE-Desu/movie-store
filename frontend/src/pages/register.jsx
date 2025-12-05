import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";

const registerSchema = z
  .object({
    fullname: z
      .string()
      .min(3, "Nama Lengkap minimal 3 karakter")
      .max(50, "Nama Lengkap maksimal 50 karakter"),
    email: z
      .string()
      .min(1, "Email wajib diisi")
      .email("Format email tidak valid"),
    password: z
      .string()
      .min(8, "Password minimal 8 karakter")
      .regex(/^(?=.*[A-Z])(?=.*\d).+$/, "Password harus mengandung huruf besar dan angka"),
    confirmPassword: z.string().min(1, "Konfirmasi Password wajib diisi"),
    age: z
      .string()
      .refine((val) => !isNaN(val), "Umur harus berupa angka")
      .transform((val) => Number(val))
      .refine((val) => val >= 18 && val <= 60, {
        message: "Umur harus antara 18 - 60 tahun",
      }),

    // ROLE BARU
    role: z.enum(["user", "admin"], {
      errorMap: () => ({ message: "Role wajib dipilih" }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password dan Konfirmasi Password tidak sama",
    path: ["confirmPassword"],
  });

function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    reValidateMode: "onBlur",
  });

  const onSubmit = (data) => {
    console.log("Register data:", data);

    alert("Registrasi berhasil!");

    // 🔥 REDIRECT BERDASARKAN ROLE
    if (data.role === "admin") {
      navigate("/dashboard/user");
    } else {
      navigate("/home");
    }

    reset();
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Buat Akun Baru
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            
            {/* Nama Lengkap */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama Lengkap
              </label>
              <input
                type="text"
                {...register("fullname")}
                className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
                placeholder="Masukkan nama lengkap"
              />
              {errors.fullname && (
                <p className="text-red-600 text-sm mt-1">{errors.fullname.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                {...register("email")}
                className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
                placeholder="Masukkan email"
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                {...register("password")}
                className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
                placeholder="Masukkan password"
              />
              {errors.password && (
                <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Konfirmasi Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Konfirmasi Password
              </label>
              <input
                type="password"
                {...register("confirmPassword")}
                className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Ulangi password"
              />
              {errors.confirmPassword && (
                <p className="text-red-600 text-sm mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Umur */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Umur
              </label>
              <input
                type="number"
                {...register("age")}
                className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Masukkan umur"
              />
              {errors.age && (
                <p className="text-red-600 text-sm mt-1">{errors.age.message}</p>
              )}
            </div>

            {/* ROLE (NEW) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pilih Role
              </label>
              <select
                {...register("role")}
                className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                {/* <option value="">-- pilih role --</option> */}
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>

              {errors.role && (
                <p className="text-red-600 text-sm mt-1">{errors.role.message}</p>
              )}
            </div>

            {/* Tombol Register */}
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition"
            >
              Register
            </button>
          </form>

          {/* Link ke Login */}
          <p className="mt-6 text-center text-gray-600 text-sm">
            Sudah punya akun?{" "}
            <Link
              to="/"
              className="text-blue-500 hover:text-blue-600 font-medium"
            >
              Login di sini
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Register;
