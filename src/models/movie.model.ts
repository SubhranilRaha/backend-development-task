import mongoose, { Schema, InferSchemaType } from 'mongoose';

const schema = new Schema({
    release_date: { type: Date },
    title: { type: String },
    overview: { type: String },
    genre: [{ type: String }],
    vote_average: { type: Number },
    vote_count: { type: Number },

    embedding: { type: [Number] },
},
    { timestamps: true });
export type Movie = InferSchemaType<typeof schema>;
export const MovieModel = mongoose.model('movie', schema);