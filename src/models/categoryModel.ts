import { Schema, model, Document } from 'mongoose';

interface ICategory extends Document {
  name: string;
  description: string;
}

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export const CategoryModel = model<ICategory>('category', categorySchema);
