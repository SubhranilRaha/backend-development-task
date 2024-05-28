require("dotenv").config();
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import { notificationRouter } from "./routes/notification.router";
import { userRouter } from "./routes/user.router";
import { editController } from "./controllers/controller-builders/edit";
import { editStreamController } from "./controllers/controller-builders/editStream";
import { countController } from "./controllers/controller-builders/count";
import { createController } from "./controllers/controller-builders/create";
import { errorRouter } from "./routes/error.router";
import { embeddingRouter } from "./routes/embedding.router";

/* Setup */
const app = express();
const PORT = process.env.PORT || 8080;
const MONGO_URL = `${process.env.MONGO_URL}`;

/* Middlewares */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Routes Builder */
app.post("/api/:model/edit/", editController)
app.post("/api/:model/edit-stream", editStreamController)
app.post("/api/:model/count", countController)
app.post("/api/:model/create", createController)

/* Custom Routes */
app.use("/api/user", userRouter);
app.use("/api/notification", notificationRouter);
app.use("/api/error", errorRouter);
app.use('/api/embedding', embeddingRouter);

/* Listener */
mongoose.connect(MONGO_URL);

mongoose.connection.once("open", () => {
  console.log(`MongoDB connected successfully`);
  app.listen(PORT, () => console.log(`✅ Server started on PORT: ${PORT}`));
});

mongoose.connection.on("error", (error) => {
  console.log("⚠️ Mongoose connection error: " + error);
});

//manual controller
import { seedBooks, fetchMovies, syncEmbeddings } from "./controllers/manual.controller";
// fetchMovies();
// syncEmbeddings();