import { NextFunction, Request, Response } from "express"
import { modelSelector, models } from "../../utils/model-selector"

export const countController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { model } = req.params;
        const query = req.body;
        const Model = modelSelector(model as keyof typeof models);
        const count = await Model.countDocuments(query);
        res.status(200).json({
            status: 200,
            message: "Document count fetched successfully",
            error: null,
            success: true,
            data: count
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