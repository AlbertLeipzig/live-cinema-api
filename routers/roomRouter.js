import express from 'express';
import {
  getSingleRoom,
  getAllRooms,
  addSingleRoom,
  updateSingleRoom,
  deleteSingleRoom,
  deleteAllRooms,
} from '../controllers/roomController.js';

export const roomRouter = express.Router();

roomRouter
  .route('/')
  .get(getAllRooms)
  .post(addSingleRoom)
  .delete(deleteAllRooms);

roomRouter
  .route('/:id')
  .get(getSingleRoom)
  .patch(updateSingleRoom)
  .delete(deleteSingleRoom);
