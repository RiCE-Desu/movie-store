import { useEffect, useState } from "react";
import { getMovies } from "@/utils/api/movies";
import { useNavigate } from "react-router-dom";
import LayoutDashboard from "@/components/layout/layoutDashboard";
import { Button } from "@/components/ui/button";

export default function DashboardProduct() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  const fetchMovies = async () => {
    try {
      const res = await getMovies();
      setMovies(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <LayoutDashboard>
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Movie Catalog</h1>
        <Button onClick={() => navigate("/dashboard/movies/add")}>
          Add Movie
        </Button>
      </div>

      {/* GRID IMDB STYLE */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="cursor-pointer group"
            onClick={() => navigate(`/dashboard/movies/detail/${movie.id}`)}
          >
            {/* POSTER */}
            <div className="w-full h-64 overflow-hidden rounded-lg shadow-md">
              <img
                src={movie.poster_url}
                alt={movie.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
            </div>

            {/* TITLE */}
            <p className="mt-2 text-sm font-semibold text-center">
              {movie.title}
            </p>
          </div>
        ))}
      </div>
    </LayoutDashboard>
  );
}
