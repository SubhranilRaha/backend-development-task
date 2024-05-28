
import mongoose, { Schema, InferSchemaType } from 'mongoose';
const allowedModels = ['book'];

const schema = new Schema({
    author: { type: String, required: true },
    country: { type: String, required: true },
    imageLink: { type: String, required: true },
    language: { type: String, required: true },
    link: { type: String, required: true },
    pages: { type: Number, required: true },
    title: { type: String, required: true },
    year: { type: Number, required: true },
},
    { timestamps: true });
export type Book = InferSchemaType<typeof schema>;
export const BookModel = mongoose.model('book', schema);