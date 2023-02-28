import mongoose from 'mongoose';

export interface ICategory extends mongoose.Document {
  category: string,
  icon: number,
  userId?: string,
  limit?: number,
  key?: string,
}

const categorySchema = new mongoose.Schema({
  category:  { type: String, required: true },
  icon:  { type: String, required: true },
  limit: { type: Number },
  key: { type: String },
  userId: { type: String },
  _id: { type: mongoose.SchemaTypes.ObjectId },
});

export const Category = mongoose.model<ICategory>('categories', categorySchema);