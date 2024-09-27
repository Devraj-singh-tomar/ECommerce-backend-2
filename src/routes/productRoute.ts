import express from "express";
import { isAdmin } from "../middlewares/authMiddleware.js";
import {
  getAllCategories,
  getLatestProducts,
  newProduct,
} from "../controllers/productController.js";
import { singleUpload } from "../middlewares/multer.js";

const app = express.Router();

// /api/v1/product/new
app.post("/new", isAdmin, singleUpload, newProduct);

// /api/v1/product/latest
app.get("/latest", getLatestProducts);

app.get("/categories", getAllCategories);

export default app;
