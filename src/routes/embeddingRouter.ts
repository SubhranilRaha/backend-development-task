import express from "express";
import { createEmbedding } from "../controllers/embedding.controller";

export const embeddingRouter = express.Router()

embeddingRouter.post("/create-embedding", createEmbedding)
