
import mongoose, { Schema, InferSchemaType } from 'mongoose';
const allowedModels = ['book', 'movie'];

const schema = new Schema({
    model: { type: String, required: true, enum: allowedModels },
    objectId: { type: mongoose.Schema.Types.ObjectId, required: true },
    plot_embedding_hf: { type: [Number], required: true },

},
    { timestamps: true });
export type Embedding = InferSchemaType<typeof schema>;
export const EmbeddingModel = mongoose.model('embedding', schema);