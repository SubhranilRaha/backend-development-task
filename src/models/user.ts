import { Schema, model, Document, Model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  mobile: string;
  email: string;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
}, { timestamps: true }
);

const UserModel : Model<IUser> = model<IUser>('User', UserSchema);

export default UserModel;

export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject());
