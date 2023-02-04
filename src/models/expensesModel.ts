import mongoose from 'mongoose';

export interface IExpense extends mongoose.Document {
  date: Date,
  account: string,
  category: string,
  expense: number,
  currency: string,
  comment?: string,
  userId?: string,
}

const expenseSchema = new mongoose.Schema({
  date: { type: Date, required: true, default: new Date() },
  account:  { type: String, required: true },
  category:  { type: String, required: true },
  expense:  { type: Number, required: true },
  currency:  { type: String, required: true },
  comment: { type: String },
  userId: { type: String },
  _id: { type: mongoose.SchemaTypes.ObjectId },
});

export const Expense = mongoose.model<IExpense>('expenses', expenseSchema);