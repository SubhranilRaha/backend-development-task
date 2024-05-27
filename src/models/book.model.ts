
import mongoose, { Schema, InferSchemaType } from 'mongoose';
const allowedModels = ['book'];
/* ISBN;"Book-Title";"Book-Author";"Year-Of-Publication";"Publisher";"Image-URL-S";"Image-URL-M";"Image-URL-L"
 */

/* 0195153448;"Classical Mythology";"Mark P. O. Morford";"2002";"Oxford University Press";"http://images.amazon.com/images/P/0195153448.01.THUMBZZZ.jpg";"http://images.amazon.com/images/P/0195153448.01.MZZZZZZZ.jpg";"http://images.amazon.com/images/P/0195153448.01.LZZZZZZZ.jpg"
 */
const schema = new Schema({
    isbn: { type: String },
    title: { type: String },
    author: { type: String },
    year: { type: Number },
    publisher: { type: String },
    image_url_s: { type: String },
    image_url_m: { type: String },
    image_url_l: { type: String }
},
    { timestamps: true });
export type Embedding = InferSchemaType<typeof schema>;
export const EmbeddingModel = mongoose.model('embedding', schema);