import mongoose from 'mongoose';

export const seatSchema = new mongoose.Schema(
  {
    seat: {
      type: [Number],
      required: true,
      validate: {
        validator: function (array) {
          return array.length === 2;
        },
        message: 'The "seat" array should contain exactly 2 elements',
      },
    },
    free: {
      type: Boolean,
      default: true,
    },
  },
  {
    _id: false,
  }
);
