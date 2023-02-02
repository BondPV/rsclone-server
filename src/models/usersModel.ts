import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  email: string;
  username: string;
  password: string;
  avatar?: string;
}

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String },
});

export const User = mongoose.model<IUser>('users', userSchema);