import mongoose from 'mongoose';
export const connectToDb = async (uri) => {
  try {
    return mongoose.connect(uri);
  } catch (e) {
    throw new Error(e);
  }
};
