import express from 'express';
import {
  getSingleMovieSession,
  getAllMovieSessions,
  addSingleMovieSession,
  updateSingleMovieSession,
  deleteSingleMovieSession,
} from '../controllers/movieSessionController.js';

export const movieSessionRouter = express.Router();

movieSessionRouter
  .route('/')
  .get(getAllMovieSessions)
  .post(addSingleMovieSession);

movieSessionRouter
  .route('/:id')
  .get(getSingleMovieSession)
  .patch(updateSingleMovieSession)
  .delete(deleteSingleMovieSession);
