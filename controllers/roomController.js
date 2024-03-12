import { Room } from '../models/roomModel.js';

export const getSingleRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    room
      ? res.status(200).json(room)
      : res.status(404).json({ msg: 'Room not found' });
  } catch (e) {
    next(e);
  }
};

export const getAllRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (e) {
    next(e);
  }
};

export const addSingleRoom = async (req, res, next) => {
  try {
    const room = await Room.create(req.body);
    res.status(201).json(room);
  } catch (e) {
    next(e);
  }
};

export const updateSingleRoom = async (req, res, next) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    Room
      ? res.status(200).json(room)
      : res.status(404).json({ msg: 'Room not found' });
  } catch (e) {
    next(e);
  }
};

export const deleteSingleRoom = async (req, res, next) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    room
      ? res.status(200).json(room)
      : res.status(404).json({ msg: 'Room not found' });
  } catch (e) {
    next(e);
  }
};

export const deleteAllRooms = async (req, res, next) => {
  try {
    const rooms = await Room.deleteMany();
    res.status(200).json(rooms);
  } catch (e) {
    next(e);
  }
};
