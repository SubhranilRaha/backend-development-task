import mongoose, { Schema, InferSchemaType } from 'mongoose';

const bookSchema = new Schema({
    id: { type: Number, required: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    text: { type: String, required: true },
    embedding: { type: [Number] },
},
    { timestamps: true });
export type Book = InferSchemaType<typeof bookSchema>;
export const BookModel = mongoose.model('book', bookSchema);