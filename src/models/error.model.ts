import { Schema, model, Document, Model } from 'mongoose';

export interface IError extends Document {
  errorMessage: string;
  timestamp: Date;
}

const ErrorSchema = new Schema<IError>({
  errorMessage: { type: String, required: true },
  timestamp: { type: Date, required: true, default: Date.now }
}, { timestamps: true });

const ErrorModel : Model<IError>= model<IError>('Error', ErrorSchema);

export default ErrorModel;