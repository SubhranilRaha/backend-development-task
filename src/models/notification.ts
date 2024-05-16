import { Schema, model, Document, Model } from 'mongoose';

export interface INotification extends Document {
  text: string;
  read: boolean;
}

const NotificationSchema = new Schema<INotification>({
  text: { type: String, required: true },
  read: { type: Boolean, required: true, default: false }
}, { timestamps: true });

const NotificationModel : Model<INotification> = model<INotification>('Notification', NotificationSchema);

export default NotificationModel;