import { Request } from "express";
import { TryCatch } from "../middlewares/errorMiddleware.js";
import { NewProductRequestBody } from "../types/types.js";
import { Product } from "../models/productModel.js";
import ErrorHandler from "../utils/utilityClass.js";
import { rm } from "fs";

export const newProduct = TryCatch(
  async (req: Request<{}, {}, NewProductRequestBody>, res, next) => {
    const { name, stock, price, category } = req.body;
    const photo = req.file;

    if (!photo) return next(new ErrorHandler("Add photo", 400));

    if (!name || !stock || !price || !category) {
      rm(photo.path, () => {
        console.log("deleted");
      });
      return next(new ErrorHandler("Enter all fields", 400));
    }

    await Product.create({
      name,
      stock,
      price,
      category: category.toLowerCase(),
      photo: photo.path,
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
    });
  }
);
