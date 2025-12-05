import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieById, deleteMovie } from "@/utils/api/movies";
import LayoutDashboard from "@/components/layout/layoutDashboard";
import { FiEdit, FiTrash2, FiArrowLeft } from "react-icons/fi";

export default function DetailMovie() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  const fetchMovie = async () => {
    try {
      const data = await getMovieById(id);
      setMovie(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Yakin mau hapus movie ini?")) return;

    try {
      await deleteMovie(id);
      alert("Movie berhasil dihapus");
      navigate("/dashboard/movies");
    } catch (err) {
      console.log(err);
      alert("Gagal menghapus movie");
    }
  };

  useEffect(() => {
    fetchMovie();
  }, [id]);

  if (!movie)
    return (
      <LayoutDashboard>
        <p>Loading...</p>
      </LayoutDashboard>
    );

  return (
    <LayoutDashboard>
      {/* Back Button */}
      <button
        className="flex items-center gap-2 mb-4 text-sm hover:text-blue-600"
        onClick={() => navigate("/dashboard/movies")}
      >
        <FiArrowLeft /> Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* POSTER */}
        <div className="w-full">
          <img
            src={movie.poster_url}
            className="w-full rounded-lg shadow-lg"
            alt={movie.title}
          />
        </div>

        {/* MOVIE INFO */}
        <div className="col-span-2">
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold">{movie.title}</h1>

            {/* ACTION ICONS */}
            <div className="flex gap-4 text-xl">
              {/* EDIT */}
              <FiEdit
                className="cursor-pointer hover:text-blue-600"
                onClick={() => navigate(`/dashboard/movies/edit/${movie.id}`)}
              />

              {/* DELETE */}
              <FiTrash2
                className="cursor-pointer hover:text-red-600"
                onClick={handleDelete}
              />
            </div>
          </div>

          <p className="mt-4 text-gray-700">
            <span className="font-semibold">Genre:</span> {movie.genre}
          </p>

          <p className="mt-2 text-gray-700">
            <span className="font-semibold">Tahun Rilis:</span>{" "}
            {movie.release_year}
          </p>

          <p className="mt-2 text-gray-700">
            <span className="font-semibold">Rating:</span> {movie.rating}
          </p>

          <p className="mt-2 text-gray-700">
            <span className="font-semibold">Harga:</span> Rp{movie.price}
          </p>

          <p className="mt-4 text-gray-700 leading-relaxed">
            <span className="font-semibold">Deskripsi:</span> <br />
            {movie.description}
          </p>
        </div>
      </div>
    </LayoutDashboard>
  );
}
