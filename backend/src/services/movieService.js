import { pool } from "../config/db.js";
import { ResponseError } from "../errors/responseError.js";
import {
  createMovieSchema,
  updateMovieSchema,
} from "../validations/movieValidation.js";
import validate from "../validations/validate.js";

export const getAllMoviesHandler = async () => {
  const [movies] = await pool.query(`
    SELECT id, user_id, title, genre, description, release_year, rating, price, stock, poster_url 
    FROM movies
  `);

  return movies;
};

export const getMovieByIdHandler = async (id) => {
  const [movies] = await pool.query(
    `
    SELECT id, user_id, title, genre, description, release_year, rating, price, stock, poster_url 
    FROM movies WHERE id=?
    `,
    [id]
  );

  if (movies.length === 0) {
    throw new ResponseError(404, "movie not found");
  }

  return movies[0];
};

export const createMovieHandler = async (request) => {
  const validated = validate(createMovieSchema, request);
  const {
    user_id,
    title,
    genre,
    description,
    release_year,
    rating,
    price,
    stock,
    poster_url,
  } = validated;

  const [result] = await pool.query(
    `
    INSERT INTO movies (user_id, title, genre, description, release_year, rating, price, stock, poster_url)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      user_id,
      title,
      genre,
      description,
      release_year,
      rating,
      price,
      stock,
      poster_url,
    ]
  );

  return {
    id: result.insertId,
    ...validated,
  };
};

export const updateMovieHandler = async (id, request) => {
  const validated = validate(updateMovieSchema, request);

  const [updateResult] = await pool.query(
    `
    UPDATE movies 
    SET ? 
    WHERE id=?
    `,
    [validated, id]
  );

  if (updateResult.affectedRows === 0) {
    throw new ResponseError(404, "movie not found");
  }

  const [updatedMovie] = await pool.query(
    `
    SELECT id, user_id, title, genre, description, release_year, rating, price, stock, poster_url
    FROM movies 
    WHERE id=?
    `,
    [id]
  );

  return updatedMovie[0];
};

export const deleteMovieHandler = async (id) => {
  const [deleteMovie] = await pool.query(`DELETE FROM movies WHERE id=?`, [
    id,
  ]);

  if (deleteMovie.affectedRows === 0) {
    throw new ResponseError(404, "movie not found");
  }
};
