import * as MovieService from "../services/movieService.js";

export const getAllMoviesHandler = async (req, res, next) => {
  try {
    const data = await MovieService.getAllMoviesHandler();

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const getMovieByIdHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await MovieService.getMovieByIdHandler(id);

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const addMovieHandler = async (req, res, next) => {
  try {
    const data = await MovieService.createMovieHandler(req.body);

    res.status(201).json({
      status: "success",
      message: "Movie created successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const updateMovieByIdHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await MovieService.updateMovieHandler(id, req.body);

    res.status(200).json({
      status: "success",
      message: "Movie updated successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteMovieByIdHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    await MovieService.deleteMovieHandler(id);

    res.status(200).json({
      status: "success",
      message: "Movie deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
