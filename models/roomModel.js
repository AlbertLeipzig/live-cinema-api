import mongoose from 'mongoose';
import { seatSchema } from './subdocuments/seatModel.js';
export const roomSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, maxlength: 20, trim: true },
    seats: {
      type: [[Number]],
      validate: {
        validator: function (array) {
          return array.every((subArray) => subArray.length === 2);
        },
        message: 'Each "seat" array should contain exactly 2 elements',
      },
    },
  },
  {
    collection: 'theaters',
    timestamps: true,
  }
);

export const Room = mongoose.model('Room', roomSchema);
