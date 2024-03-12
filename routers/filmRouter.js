import express from 'express';
import {
  getSingleFilm,
  getAllFilms,
  addSingleFilm,
  updateSingleFilm,
  deleteSingleFilm,
} from '../controllers/filmController.js';

export const filmRouter = express.Router();

filmRouter.route('/').get(getAllFilms).post(addSingleFilm);

filmRouter
  .route('/:id')
  .get(getSingleFilm)
  .patch(updateSingleFilm)
  .delete(deleteSingleFilm);
