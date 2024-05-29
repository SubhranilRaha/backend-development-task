import { NextFunction, Request, Response } from "express";
import { generateEmbedding } from "../../utils/embedding-generator";
import { modelSelector, models } from "../../utils/model-selector";

export const vectorSearchController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { query } = req.body;
    if (!query) {
      throw new Error("Model and query are required");
    }
    const queryVector = await generateEmbedding(query);
    const { model } = req.params;
    const body = req.body;
    const Model = modelSelector(model as keyof typeof models);
    const results = await Model.aggregate([
      {
        $vectorSearch: {
          index: "vector_index",
          path: "embedding",
          queryVector: queryVector,
          numCandidates: 50,
          limit: 4,
        },
      },
      {
        $project: {
          embedding: 0,
        },
      },
    ]);
    console.log(results)
    res.status(200).json({
      status: 200,
      message: "Search completed",
      error: null,
      success: true,
      data: results,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      error: error,
      success: false,
      data: null,
    });
  }
};
