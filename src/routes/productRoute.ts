import express from "express";
import { isAdmin } from "../middlewares/authMiddleware.js";
import { newProduct } from "../controllers/productController.js";
import { singleUpload } from "../middlewares/multer.js";

const app = express.Router();

// /api/v1/product/new
app.post("/new", isAdmin, singleUpload, newProduct);

export default app;
