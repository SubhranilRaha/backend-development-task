import { NextFunction, Request, Response } from "express"
import { modelSelector, models } from "../../utils/model-selector"

export const createController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { model } = req.params
        const body= req.body
        const Model= modelSelector(model as keyof typeof models)
        const newDocument= new Model(body)
        const savedDocument= await newDocument.save()
        console.log(savedDocument)
        res.status(200).json({
            status: 200,
            message: "Document Created Successfully",
            error: null,
            success: true,
            data: savedDocument
        })
        
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