import express from "express";

import {
  addUserHandler,
  getAllUsersHandler,
  getUserByIdHandler,
  updateUserHandler,
  deleteUserByIdHandler,
} from "../controllers/userController.js";

import {
  addMovieHandler,
  deleteMovieByIdHandler,
  getAllMoviesHandler,
  getMovieByIdHandler,
  updateMovieByIdHandler,
} from "../controllers/movieController.js";

const apiRouter = express.Router();

/* ======================
        USERS ROUTES
======================= */
apiRouter.get("/users", getAllUsersHandler);
apiRouter.get("/users/:id", getUserByIdHandler);
apiRouter.post("/users", addUserHandler);
apiRouter.put("/users/:id", updateUserHandler);
apiRouter.delete("/users/:id", deleteUserByIdHandler);

/* ======================
        MOVIES ROUTES
======================= */
apiRouter.get("/movies", getAllMoviesHandler);
apiRouter.get("/movies/:id", getMovieByIdHandler);
apiRouter.post("/movies", addMovieHandler);
apiRouter.put("/movies/:id", updateMovieByIdHandler);
apiRouter.delete("/movies/:id", deleteMovieByIdHandler);

export default apiRouter;
