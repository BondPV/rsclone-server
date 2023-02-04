import mongoose from 'mongoose';

export interface IIncome extends mongoose.Document {
  date: Date,
  account: string,
  income: number,
  currency: string,
  comment?: string,
  userId?: string,
}

const incomeSchema = new mongoose.Schema({
  date: { type: Date, required: true, default: new Date() },
  account:  { type: String, required: true },
  income:  { type: Number, required: true },
  currency:  { type: String, required: true },
  comment: { type: String },
  userId: { type: String },
  _id: { type: mongoose.SchemaTypes.ObjectId },
});

export const Income = mongoose.model<IIncome>('incomes', incomeSchema);