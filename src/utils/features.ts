import mongoose, { mongo } from "mongoose";
import { InvalidateCacheProps } from "../types/types.js";
import { myCache } from "../app.js";
import { Product } from "../models/productModel.js";

export const connectDB = () => {
  mongoose
    .connect("mongodb://localhost:27017", {
      dbName: "Ecommerce_2",
    })
    .then((c) => console.log(`DB connected to ${c.connection.host} `))
    .catch((e) => console.log(e));
};

export const inValidateCache = async ({
  product,
  order,
  admin,
}: InvalidateCacheProps) => {
  if (product) {
    const productKeys: string[] = [
      "latest-products",
      "categories",
      "all-products",
    ];
    // `product-${id}`,

    const products = await Product.find({}).select("_id");

    products.forEach((i) => {
      productKeys.push(`product-${i._id}`);
    });

    myCache.del(productKeys);
  }
  if (order) {
  }
  if (admin) {
  }
};
