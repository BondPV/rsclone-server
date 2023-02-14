import mongoose from 'mongoose';

export interface IAccount extends mongoose.Document {
  account: string,
  sum: number,
  icon: number,
  userId?: string,
  key?: string,
}

const accountSchema = new mongoose.Schema({
  account:  { type: String, required: true },
  sum:  { type: Number, required: true },
  icon:  { type: String, required: true },
  key: { type: String },
  userId: { type: String },
  _id: { type: mongoose.SchemaTypes.ObjectId },
});

export const Account = mongoose.model<IAccount>('accounts', accountSchema);