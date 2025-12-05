import api from "@/utils/api/axios.js";

// GET all movies
export const getMovies = async () => {
  const res = await api.get("/movies");
  return res.data.data;
};

// GET movie by ID
export const getMovieById = async (id) => {
  const res = await api.get(`/movies/${id}`);
  return res.data.data;
};

// CREATE movie
export const addMovie = async (data) => {
  const res = await api.post("/movies", data);
  return res.data.data;
};

// UPDATE movie
export const updateMovie = async (id, data) => {
  const res = await api.put(`/movies/${id}`, data);
  return res.data.data;
};

// DELETE movie
export const deleteMovie = async (id) => {
  const res = await api.delete(`/movies/${id}`);
  return res.data.data;
};
