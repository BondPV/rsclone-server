import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const bcryptSaltRounds = 10;

export interface IUserModel extends mongoose.Document {
  email: string;
  name: string;
  password: string;
  status?: string;
  avatar?: string;
  comparePassword(password: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  status: { type: String },
  avatar: { type: String },
});

userSchema.pre('save', async function (next) {
  const user = this as IUserModel;

  if (!user.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(bcryptSaltRounds);

  const hash = await bcrypt.hashSync(user.password, salt);

  user.password = hash;

  return next();
});

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  const user = this as IUserModel;

  const match = await bcrypt.compare(candidatePassword, user.password);

  return match;
};

const userModel = mongoose.model<IUserModel>('user', userSchema);

export default userModel;