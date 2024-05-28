import express from "express";
import { createEmbedding, search } from "../controllers/embedding.controller";

export const embeddingRouter = express.Router()

embeddingRouter.post("/create-embedding", createEmbedding)
embeddingRouter.post("/search", search)
