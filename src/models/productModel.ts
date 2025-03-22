import mongoose, { Schema, model, Document } from 'mongoose';

interface Product extends Document {
  name: string;
  description: string;
  category: mongoose.Types.ObjectId[];
  quantity: number;
  price: number;
  supplierInfo?: string;
  dateAdded: Date;
  lastUpdated: Date;
}

const ProductSchema = new Schema<Product>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    categories: [{ type: Schema.Types.ObjectId, ref: 'category', required: true }],
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    supplierInfo: { type: String },
    dateAdded: { type: Date, default: Date.now },
    lastUpdated: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const ProductModel = model<Product>('product', ProductSchema);

export { ProductModel };
