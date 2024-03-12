import express from 'express';
import fs from 'fs';
import { Film } from '../models/filmModel.js';
import { MovieSession } from '../models/movieSessionModel.js';
import { Room } from '../models/roomModel.js';
import filmsData from '../fakeData/films.json' assert { type: 'json' };
import roomsData from '../fakeData/rooms.json' assert { type: 'json' };

const postSingleFilm = async (filmData) => {
  try {
    const film = await Film.create(filmData);
    return film;
  } catch (e) {
    res.status(500).json(e);
  }
};

const postManyFilms = async (req, res) => {
  try {
    const filmsPromises = filmsData.map((film) => postSingleFilm(film));
    const films = await Promise.all(filmsPromises);
    res.status(201).json(films);
  } catch (e) {
    res.status(500).json(e);
  }
};

const postSingleRoom = async (roomData) => {
  try {
    const room = await Room.create(roomData);
    return room;
  } catch (e) {
    res.status(500).json(e);
  }
};

const postManyRooms = async (req, res) => {
  try {
    const sessionPromises = roomsData.map((session) => postSingleRoom(session));
    const sessions = await Promise.all(sessionPromises);
    res.status(201).json(sessions);
  } catch (e) {
    res.status(500).json(e);
  }
};

const generateRandomMovie = (movies) => {
  return movies[Math.floor(Math.random() * movies.length)]._id;
};

const generateAllSessions = async () => {
  const sessions = [];
  const movies = await Film.find();
  const rooms = await Room.find();

  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const weekend = ['Saturday', 'Sunday'];
  const weekdayTimes = ['15:00', '17:30', '20:00', '22:00'];
  const weekendTimes = ['11:00', ...weekdayTimes];

  for (const room of rooms) {
    const roomSeats = room.seats;
    for (const day of [...weekdays, ...weekend]) {
      const times = weekdays.includes(day) ? weekdayTimes : weekendTimes;
      for (const time of times) {
        const [hours, minutes] = time.split(':');
        const date = new Date();
        date.setHours(hours, minutes);

        const session = {
          film: generateRandomMovie(movies),
          date: date,
          room: room._id,
          seats: roomSeats,
        };

        sessions.push(session);
      }
    }
  }
  return sessions;
};

// b) Controller to post a single session
export const postSingleSession = async (session) => {
  const newSession = new MovieSession(session);
  return newSession.save();
};

// c) Controller to post all sessions
export const postManySessions = async (req, res, next) => { try { const sessions = await generateAllSessions();
const promises = sessions.map((session) => postSingleSession(session));
const results = await Promise.all(promises);
res.status(201).json(results);
} catch (e) { next(e);
} };

/* export const postManySessions = async (req, res, next) => {
  try {
    const sessions = await generateAllSessions();
    const promises = sessions.map((session) => postSingleSession(session));
    const results = await Promise.all(promises);

    fs.writeFile('sessions.json', JSON.stringify(results, null, 2), (err) => {
      if (err) {
        next(err);
      } else {
        res.status(201).json({ message: 'Data written to sessions.json' });
      }
    });
  } catch (e) {
    next(e);
  }
}; */

export const fakeRouter = express.Router();

fakeRouter.route(`/film`).post(postManyFilms);
fakeRouter.route(`/room`).post(postManyRooms);
fakeRouter.route('/session').post(postManySessions);
