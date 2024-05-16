import { NextFunction, Request, Response } from "express"
import { modelSelector, models } from "../../utils/model-selector"

export const editController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { model } = req.params;
        const query = req.body;
        const Model = modelSelector(model as keyof typeof models);
        // @ts-ignore
        const document = await Model.findOne(query).exec()
        if (!document) {
            return res.status(404).json({
                status: 404,
                message: "Document not found",
                error: null,
                success: false,
                data: null
            });
        }
        res.status(200).json({
            status: 200,
            message: "Document fetched successfully",
            error: null,
            success: true,
            data: document
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