import { NextFunction, Request, Response } from "express"
import { modelSelector, models } from "../../utils/model-selector"

export const editStreamController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { model } = req.params;
        const { query, limit = 10, skip = 0 } = req.body;
        const Model = modelSelector(model as keyof typeof models);
        // @ts-ignore
        const documents = await Model.find(query).limit(limit).skip(skip);
        res.status(200).json({
            status: 200,
            message: "Documents fetched successfully",
            error: null,
            success: true,
            data: documents
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: 500,
            message: "Internal Server Error",
            error: error,
            success: false,
            data: null
        })
    }
}