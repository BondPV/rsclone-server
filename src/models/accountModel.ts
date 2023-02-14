import mongoose from 'mongoose';

export interface IAccount extends mongoose.Document {
  account: string,
  sum: number,
  icon: number,
  userId?: string,
}

const accountSchema = new mongoose.Schema({
  account:  { type: String, required: true },
  sum:  { type: Number, required: true },
  icon:  { type: String, required: true },
  userId: { type: String },
  _id: { type: mongoose.SchemaTypes.ObjectId },
});

export const Account = mongoose.model<IAccount>('accounts', accountSchema);