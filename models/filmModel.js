import mongoose from 'mongoose';

const ageCategoryEnum = [0, 6, 12, 16, 18];

export const filmSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, maxlength: 100, trim: true },
    images: { type: [String], required: true, maxlength: 20 },
    duration: { type: Number, max: 10000 },
    description: { type: String, maxlength: 10000 },
    tags: { type: [String], maxlength: 10 },
    cast: { type: [String], maxlength: 20 },
    ageCategory: { type: Number, enum: ageCategoryEnum, default: 0 },
    price: { type: Number, required: true, max: 100 },
  },
  {
    collection: 'films',
    timestamps: true,
  }
);

export const Film = mongoose.model('Film', filmSchema);
