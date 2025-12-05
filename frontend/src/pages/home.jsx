import { useEffect, useState } from "react";
import MovieCard from "@/components/MovieCard";
import { getMovies } from "@/utils/api/movies";
import { useCart } from "@/context/CartContext";
import NavbarUser from "@/components/NavbarUser";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  const [selectedGenre, setSelectedGenre] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");

  const { addToCart } = useCart();

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await getMovies();
    setMovies(res);
    setFilteredMovies(res);
  };

  // Ambil Genre unik
  const genres = [
    "all",
    ...new Set(
      movies.flatMap((m) =>
        m.genre.split(",").map((g) => g.trim())
      )
    ),
  ];

  // Ambil Tahun unik
  const years = [
    "all",
    ...new Set(movies.map((m) => m.release_year)).values(),
  ].sort((a, b) => b - a);

  // APPLY FILTERS
  useEffect(() => {
    let temp = [...movies];

    // Filter genre
    if (selectedGenre !== "all") {
      temp = temp.filter((m) =>
        m.genre.split(",").map((g) => g.trim()).includes(selectedGenre)
      );
    }

    // Filter tahun
    if (selectedYear !== "all") {
      temp = temp.filter((m) => m.release_year == selectedYear);
    }

    setFilteredMovies(temp);
  }, [selectedGenre, selectedYear, movies]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <NavbarUser />

      <div className="px-10 py-10">
        <h1 className="text-3xl font-bold text-blue-700 mb-8 text-center">
          🎬 Explore Movies
        </h1>

        {/* FILTERS */}
        <div className="flex gap-6 justify-center mb-10 flex-wrap">

          {/* GENRE DROPDOWN */}
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="px-4 py-2 border border-blue-300 bg-white text-blue-700 rounded-lg shadow-sm"
          >
            {genres.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>

          {/* YEAR DROPDOWN */}
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-4 py-2 border border-blue-300 bg-white text-blue-700 rounded-lg shadow-sm"
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y === "all" ? "All Years" : y}
              </option>
            ))}
          </select>
        </div>

        {/* MOVIE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {filteredMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              addToCart={addToCart}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
