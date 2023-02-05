import mongoose from 'mongoose';
import { defaultLanguage, defaultUserAvatar, defaultPhoneNumber } from '../../config/default';

export interface IUser extends mongoose.Document {
  email: string;
  username: string;
  password: string;
  currency: string,
  avatar: string;
  language: string;
  phoneNumber: number | null;
}

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  currency:  { type: String, required: true },
  avatar: { type: String, default: defaultUserAvatar },
  language: { type: String, default: defaultLanguage },
  phoneNumber: { type: Number, default: defaultPhoneNumber },
  _id: { type: mongoose.SchemaTypes.ObjectId },
});

export const User = mongoose.model<IUser>('users', userSchema);