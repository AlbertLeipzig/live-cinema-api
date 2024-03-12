import { MovieSession } from '../models/movieSessionModel.js';

export const getSingleMovieSession = async (req, res, next) => {
  try {
    const movieSession = await MovieSession.findById(req.params.id);
    movieSession
      ? res.status(200).json(movieSession)
      : res.status(404).json({ msg: 'Session not found' });
  } catch (e) {
    next(e);
  }
};

export const getAllMovieSessions = async (req, res, next) => {
  try {
    const movieSessions = await MovieSession.find();
    res.status(200).json(movieSessions);
  } catch (e) {
    next(e);
  }
};

export const addSingleMovieSession = async (req, res, next) => {
  try {
    const movieSession = await MovieSession.create(req.body);
    res.status(201).json(movieSession);
  } catch (e) {
    next(e);
  }
};

export const updateSingleMovieSession = async (req, res, next) => {
  try {
    const movieSession = await MovieSession.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    movieSession
      ? res.status(200).json(movieSession)
      : res.status(404).json({ msg: 'MovieSession not found' });
  } catch (e) {
    next(e);
  }
};

export const deleteSingleMovieSession = async (req, res, next) => {
  try {
    const movieSession = await MovieSession.findByIdAndDelete(req.params.id);
    movieSession
      ? res.status(200).json(movieSession)
      : res.status(404).json({ msg: 'MovieSession not found' });
  } catch (e) {
    next(e);
  }
};
