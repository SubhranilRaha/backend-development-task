import { NextFunction, Request, Response } from 'express';
import { generateEmbedding } from '../utils/embedding-generator';

export const createEmbedding = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const query = req.body;
        const embedding = await generateEmbedding(query.text);
        console.log(embedding)
        res.status(200).json({
            status: 200,
            message: "Embedding generated successfully",
            error: null,
            success: true,
            data: embedding
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