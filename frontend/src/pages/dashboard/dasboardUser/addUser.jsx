import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormField, FormItem, FormLabel, FormMessage, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { addUser } from "@/utils/api/users";
import { useNavigate } from "react-router-dom";

const addUserSchema = z.object({
  fullname: z.string().min(8, { message: "Nama Lengkap harus minimal 8 karakter" }),
  username: z.string().min(5, { message: "Username harus minimal 5 karakter" }),
  password: z.string().min(5, { message: "Password harus minimal 5 karakter" }),
  email: z.string().email({ message: "Format email tidak valid" }),
  phone_number: z
    .string()
    .refine((val) => !isNaN(val), "Nomor telepon harus berupa angka")
    .transform((val) => Number(val)),
  age: z
    .string()
    .refine((val) => !isNaN(val), "Umur harus berupa angka")
    .transform((val) => Number(val))
    .refine((val) => val >= 18 && val <= 60, {
      message: "Umur harus antara 18 - 60 tahun",
    }),
  address: z.string().min(10, { message: "Alamat harus minimal 10 karakter" }),
  role: z.enum(["user", "admin"], { message: "Role tidak valid" })
});

function AddUser() {
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(addUserSchema),
    defaultValues: {
      fullname: "",
      username: "",
      password: "",
      email: "",
      phone_number: "",
      age: "",
      address: "",
      role: "user",
    },
  });

  const onSubmit = async (data) => {
    try {
      await addUser(data);
      alert("User berhasil ditambahkan!");
      navigate("/dashboard/user");
    } catch {
      alert("Gagal menambahkan user.");
    }
  };

    return (
  <Form {...form}>
    <div className="pt-10 flex justify-center">
      <div className="w-full max-w-3xl bg-white/5 backdrop-blur-md p-8 rounded-xl shadow-lg border border-white/10">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Tambah User</h2>

          <Button
            variant="secondary"
            onClick={() => navigate(-1)}
          >
            ← Kembali
          </Button>
        </div>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >

          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Nama Lengkap</FormLabel>
                <FormControl>
                  <Input placeholder="Nama lengkap" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>No Telepon</FormLabel>
                <FormControl>
                  <Input placeholder="Nomor Telepon" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Umur</FormLabel>
                <FormControl>
                  <Input placeholder="Umur" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Alamat</FormLabel>
                <FormControl>
                  <Input placeholder="Alamat lengkap" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <select {...field} className="w-full border p-2 rounded-md bg-white">
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="col-span-2 mt-2 w-full">
            Tambah User
          </Button>
        </form>
      </div>
    </div>
  </Form>
)};

export default AddUser;
