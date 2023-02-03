import mongoose from 'mongoose';
import { defaultLanguage, defaultUserAvatar } from '../../config/default';

export interface IUser extends mongoose.Document {
  email: string;
  username: string;
  password: string;
  avatar?: string;
  language?: string;
}

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String, default: defaultUserAvatar },
  language: { type: String, default: defaultLanguage },
});

export const User = mongoose.model<IUser>('users', userSchema);