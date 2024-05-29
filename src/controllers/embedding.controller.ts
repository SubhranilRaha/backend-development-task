import { NextFunction, Request, Response } from 'express';
import { generateEmbedding } from '../utils/embedding-generator';
import { MovieModel } from '../models/movie.model';

const HF_TOKEN=process.env.HF_TOKEN;

export const createEmbedding = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const query = req.body;
        const embedding = await generateEmbedding(query.text, HF_TOKEN);
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
export const search = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { query } = req.body;
        if (!query) {
            throw new Error("Model and query are required");
        }
        const queryVector = await generateEmbedding(query, HF_TOKEN);
        const results = await MovieModel.aggregate([
            {
                $vectorSearch: {
                    "index": "vector_index",
                    "path": "embedding",
                    "queryVector": queryVector,
                    "numCandidates": 500,
                    "limit": 4
                }
            },
            {
                $project: {
                    embedding: 0,
                }
            }
        ]);

        res.status(200).json({
            status: 200,
            message: "Search completed",
            error: null,
            success: true,
            data: results
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
