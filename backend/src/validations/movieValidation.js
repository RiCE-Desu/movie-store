import z from "zod";

export const createMovieSchema = z.object({
  user_id: z.number({
    required_error: "user_id wajib diisi",
    invalid_type_error: "user_id harus berupa angka",
  }),

  title: z
    .string()
    .min(3, "judul minimal 3 karakter")
    .max(150, "judul maksimal 150 karakter"),

  genre: z
    .string()
    .min(3, "genre minimal 3 karakter")
    .max(100, "genre maksimal 100 karakter"),

  description: z.string().min(5, "deskripsi minimal 5 karakter").optional(),

  release_year: z
    .number({
      required_error: "tahun rilis wajib diisi",
      invalid_type_error: "tahun rilis harus berupa angka",
    })
    .int()
    .min(1900, "tahun rilis tidak valid"),

  rating: z.number().min(0).max(10).optional(),

  price: z
    .number({
      required_error: "harga wajib diisi",
      invalid_type_error: "harga harus berupa angka",
    })
    .nonnegative("harga tidak boleh negatif"),

  stock: z
    .number()
    .int("stok harus bilangan bulat")
    .nonnegative("stok tidak boleh negatif")
    .optional(),

  poster_url: z.string().optional(),
});

export const updateMovieSchema = z.object({
  user_id: z.number().optional(),

  title: z.string().min(3).max(150).optional(),

  genre: z.string().min(3).max(100).optional(),

  description: z.string().min(5).optional(),

  release_year: z.number().int().min(1900).optional(),

  rating: z.number().min(0).max(10).optional(),

  price: z.number().nonnegative().optional(),

  stock: z.number().int().nonnegative().optional(),

  poster_url: z.string().optional(),
});
