import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";

const loginSchema = z.object({
  identifier: z
    .string()
    .min(1, "Username atau Email wajib diisi")
    .refine(
      (val) => /\S+@\S+\.\S+/.test(val) || val.length >= 5,
      "Masukkan username (min 5 karakter) atau email valid"
    ),
  password: z
    .string()
    .min(1, "Password wajib diisi")
    .min(6, "Password minimal 6 karakter"),
});

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    reValidateMode: "onBlur",
  });

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/login", data);

      const user = res.data.user;

      // Simpan session user
      localStorage.setItem("auth", JSON.stringify(user));

      // Redirect sesuai role
      if (user.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/home");
      }

    } catch (err) {
      alert("Login gagal, cek email/password.");
      console.log(err);
    }
  };


  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Login ke Akun Anda
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Username / Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username / Email
              </label>
              <input
                type="text"
                {...register("identifier")}
                className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Masukkan username atau email"
              />
              {errors.identifier && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.identifier.message}
                </p>
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
                className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Masukkan password"
              />
              {errors.password && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Tombol Login */}
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition"
            >
              Login
            </button>
          </form>

          {/* Link Register */}
          <p className="mt-6 text-center text-gray-600 text-sm">
            Belum punya akun?{" "}
            <Link
              to="/register"
              className="text-blue-500 hover:text-blue-600 font-medium"
            >
              Daftar di sini
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
