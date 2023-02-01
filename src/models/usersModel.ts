import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { bcryptSaltRounds } from '../../config/default';

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

userSchema.pre<IUser>('save', async function save(next) {
  const user = this as IUser;

  if (!user.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(bcryptSaltRounds);

  const hash = await bcrypt.hashSync(user.password, salt);

  user.password = hash;

  return next();
});

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  const user = this as IUser;

  const isMatch = await bcrypt.compare(candidatePassword, user.password);

  return isMatch;
};

export const User = mongoose.model<IUser>('users', userSchema);