import { Model } from "mongoose";
import ErrorModel, { IError } from "../models/error.model";
import NotificationModel, { INotification } from "../models/notification.model";
import UserModel, { IUser } from "../models/user.model";
import ArticleModel, { IArticle } from '../models/article.model';

//models should be added here as they are being created to be supported in the route builders
interface IModels {
    user: Model<IUser>,
    notification: Model<INotification>,
    error: Model<IError>,
    article: Model<IArticle>,
}

export const models: IModels = {
    user: UserModel,
    notification: NotificationModel,
    error: ErrorModel,
    article: ArticleModel,
}

//takes the model name and returns the instance of the mongoose model
export const modelSelector = (modelName: keyof typeof models) => {
    const model = models[modelName]
    if (!model) {
        throw new Error("No such model exits")
    }
    return model
}