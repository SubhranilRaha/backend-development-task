
import mongoose, { Schema, InferSchemaType } from 'mongoose';

const schema = new Schema({
    row_idx: { type: Number, required: true },
    category: { type: String, required: true },
    text: { type: String, required: true },

    embedding: { type: [Number] },
},
    { timestamps: true });
export type Article = InferSchemaType<typeof schema>;
export const ArticleModel = mongoose.model('article', schema);