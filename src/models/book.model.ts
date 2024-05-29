import { Document, Model, Schema, model } from "mongoose";

export interface IBook extends Document {
  author: string;
  country: string;
  imageLink: string;
  language: string;
  link: string;
  pages: number;
  title: string;
  year: number;
}

const BookSchema = new Schema<IBook>(
  {
    author: { type: String, required: true },
    country: { type: String, required: true },
    imageLink: { type: String, required: true },
    language: { type: String, required: true },
    link: { type: String, required: true },
    pages: { type: Number, required: true },
    title: { type: String, required: true },
    year: { type: Number, required: true },
  },
  { timestamps: true }
);

const BookModel: Model<IBook> = model<IBook>("Book", BookSchema);

export default BookModel;
