import express from "express";
import { isAdmin } from "../middlewares/authMiddleware.js";
import {
  deleteProduct,
  getAdminProducts,
  getAllCategories,
  getLatestProducts,
  getSingleProduct,
  newProduct,
  updateProduct,
} from "../controllers/productController.js";
import { singleUpload } from "../middlewares/multer.js";

const app = express.Router();

// /api/v1/product/new
app.post("/new", isAdmin, singleUpload, newProduct);

// /api/v1/product/latest
app.get("/latest", getLatestProducts);

app.get("/categories", getAllCategories);

app.get("/admin-products", isAdmin, getAdminProducts);

app
  .route("/:id")
  .get(getSingleProduct)
  .put(isAdmin, singleUpload, updateProduct)
  .delete(isAdmin, deleteProduct);

export default app;
