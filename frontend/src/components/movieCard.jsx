import React from "react";

export default function MovieCard({ movie, addToCart }) {
  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-gray-800 hover:shadow-2xl hover:scale-[1.03] transition duration-300">
      
      {/* Poster */}
      <div className="relative">
        <img
          src={movie.poster_url}
          alt={movie.title}
          className="w-full h-64 object-cover"
        />

        {/* Rating */}
        <div className="absolute top-2 left-2 bg-black/75 px-3 py-1 rounded-md flex items-center gap-1">
          <span className="text-yellow-400 font-bold">★</span>
          <span className="text-white text-sm">{movie.rating}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-white font-semibold text-lg">{movie.title}</h3>

        <p className="text-gray-400 text-sm">
          {movie.genre} • {movie.release_year}
        </p>

        <p className="text-gray-300 text-sm font-medium mt-2">
          Rp {movie.price?.toLocaleString()}
        </p>

        <div className="flex justify-end mt-4">
          <button
            onClick={() => addToCart(movie)}
            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-md transition"
            title="Add to Cart"
          >
            🛒
          </button>
        </div>
      </div>
    </div>
  );
}
