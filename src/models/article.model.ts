
import { Schema, model, Document, Model } from 'mongoose';

export interface IArticle extends Document {
    row_idx: number;
    category: string;
    text: string;
    embedding: number[];
}
const ArticleSchema = new Schema<IArticle>({
    row_idx: { type: Number, required: true },
    category: { type: String, required: true },
    text: { type: String, required: true },

    embedding: { type: [Number] },
},
    { timestamps: true });

const ArticleModel: Model<IArticle> = model<IArticle>('Article', ArticleSchema);
export default ArticleModel;
