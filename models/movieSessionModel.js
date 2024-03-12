import mongoose from 'mongoose';
import { seatSchema } from './subdocuments/seatModel.js';
export const movieSessionSchema = new mongoose.Schema(
  {
    film: { type: mongoose.Types.ObjectId, required: true },
    date: { type: Date, default: new Date(), required: true },
    room: {
      type: mongoose.Types.ObjectId,
      required: true,
      maxlength: 50,
      trim: true,
    },
    seats: { type: [[Number]], required: true, default: [] },
  },
  {
    collection: 'movieSession',
    timestamps: true,
  }
);

export const MovieSession = mongoose.model('MovieSession', movieSessionSchema);
