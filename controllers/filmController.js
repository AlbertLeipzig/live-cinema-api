import { Film } from '../models/filmModel.js';

export const getSingleFilm = async (req, res, next) => {
  try {
    const film = await Film.findById(req.params.id);
    film
      ? res.status(200).json(film)
      : res.status(404).json({ msg: 'film not found' });
  } catch (e) {
    next(e);
  }
};

export const getAllFilms = async (req, res, next) => {
  try {
    const films = await Film.find();
    res.status(200).json(films);
  } catch (e) {
    next(e);
  }
};

export const addSingleFilm = async (req, res, next) => {
  try {
    const film = await Film.create(req.body);
    res.status(201).json(film);
  } catch (e) {
    next(e);
  }
};

export const updateSingleFilm = async (req, res, next) => {
  try {
    const film = await Film.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    film
      ? res.status(200).json(film)
      : res.status(404).json({ msg: 'film not found' });
  } catch (e) {
    next(e);
  }
};

export const deleteSingleFilm = async (req, res, next) => {
  try {
    const film = await Film.findByIdAndDelete(req.params.id);
    film
      ? res.status(200).json(film)
      : res.status(404).json({ msg: 'film not found' });
  } catch (e) {
    next(e);
  }
};
