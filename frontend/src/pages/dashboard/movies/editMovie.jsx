import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getMovieById, updateMovie } from "@/utils/api/movies";

const editMovieSchema = z.object({
  user_id: z
    .string()
    .refine((val) => !isNaN(val), { message: "User ID harus berupa angka" })
    .transform((val) => Number(val)),

  title: z.string().min(2, { message: "Judul minimal 2 karakter" }),

  description: z.string().min(10, { message: "Deskripsi minimal 10 karakter" }),

  genre: z.string().min(3, { message: "Genre minimal 3 karakter" }),

  release_year: z
    .string()
    .refine((val) => !isNaN(val), { message: "Tahun rilis harus angka" })
    .transform((val) => Number(val))
    .refine((val) => val >= 1900 && val <= new Date().getFullYear(), {
      message: "Tahun rilis tidak valid",
    }),

  rating: z
    .string()
    .refine((val) => !isNaN(val), { message: "Rating harus angka" })
    .transform((val) => Number(val))
    .refine((val) => val >= 1 && val <= 10, {
      message: "Rating harus antara 1 – 10",
    }),

  price: z
    .string()
    .refine((val) => !isNaN(val), { message: "Harga harus berupa angka" })
    .transform((val) => Number(val))
    .refine((val) => val >= 1, {
      message: "Harga minimal 1",
    }),

  poster_url: z.string().url({ message: "URL poster tidak valid" }),
});

export default function EditMovie() {
  const { id } = useParams();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(editMovieSchema),
    defaultValues: {
      user_id: "",
      title: "",
      description: "",
      genre: "",
      release_year: "",
      rating: "",
      price: "",
      poster_url: "",
    },
  });

  // FETCH MOVIE BY ID, RETURN DATA KE FORM
  useEffect(() => {
    const fetchMovie = async () => {
      const res = await getMovieById(id);

      form.reset({
        user_id: String(res.user_id ?? ""),
        title: res.title ?? "",
        description: res.description ?? "",
        genre: res.genre ?? "",
        release_year: String(res.release_year ?? ""),
        rating: String(res.rating ?? ""),
        price: String(res.price ?? ""),
        poster_url: res.poster_url ?? "",
      });
    };

    fetchMovie();
  }, [id, form]);

  const onSubmit = async (data) => {
    console.log(data);
    try {
      await updateMovie(id, data);
      alert("Movie berhasil diperbarui!");
      navigate("/dashboard/movies");
    } catch (error) {
      console.error(error);
      alert("Gagal update movie!");
    }
  };

 return (
  <Form {...form}>
    <div className="pt-10 flex justify-center">
      <div className="w-full max-w-3xl bg-white/5 backdrop-blur-md p-8 rounded-xl shadow-lg border border-white/10">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Edit Movie</h2>

          <Button
            variant="secondary"
            onClick={() => navigate(-1)}
          >
            ← Kembali
          </Button>
        </div>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          <div className="grid grid-cols-2 gap-5">
            {/* USER ID */}
            <FormField
              control={form.control}
              name="user_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User ID</FormLabel>
                  <FormControl>
                    <Input placeholder="User ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* TITLE */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Judul Film</FormLabel>
                  <FormControl>
                    <Input placeholder="Judul Film" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* DESCRIPTION */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Deskripsi</FormLabel>
                <FormControl>
                  <Input placeholder="Deskripsi Film" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-5">
            {/* GENRE */}
            <FormField
              control={form.control}
              name="genre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Genre</FormLabel>
                  <FormControl>
                    <Input placeholder="Genre Film" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* RELEASE YEAR */}
            <FormField
              control={form.control}
              name="release_year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tahun Rilis</FormLabel>
                  <FormControl>
                    <Input placeholder="YYYY" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-5">
            {/* RATING */}
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating (1–10)</FormLabel>
                  <FormControl>
                    <Input placeholder="Rating Film" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* PRICE */}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Harga</FormLabel>
                  <FormControl>
                    <Input placeholder="Harga Film" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* POSTER URL */}
          <FormField
            control={form.control}
            name="poster_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Poster URL</FormLabel>
                <FormControl>
                  <Input placeholder="URL Poster" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="mt-4 w-full">
            Simpan Perubahan
          </Button>
        </form>
      </div>
    </div>
  </Form>
)};
