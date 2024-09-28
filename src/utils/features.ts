import mongoose, { mongo } from "mongoose";
import { InvalidateCacheProps, OrderItemType } from "../types/types.js";
import { myCache } from "../app.js";
import { Product } from "../models/productModel.js";
import { Order } from "../models/orderModel.js";

export const connectDB = (uri: string) => {
  mongoose
    .connect(uri, {
      dbName: "Ecommerce_2",
    })
    .then((c) => console.log(`DB connected to ${c.connection.host} `))
    .catch((e) => console.log(e));
};

export const inValidateCache = async ({
  product,
  order,
  admin,
  userId,
  orderId,
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
    const orderKeys: string[] = [
      `all-orders`,
      `my-orders-${userId}`,
      `orders-${orderId}`,
    ];

    myCache.del(orderKeys);
  }

  if (admin) {
  }
};

// reducing stock after ordering
export const reduceStock = async (orderItems: OrderItemType[]) => {
  for (let i = 0; i < orderItems.length; i++) {
    const order = orderItems[i];

    const product = await Product.findById(order.productId);
    if (!product) throw new Error("Product not found");
    product.stock -= order.quantity;
    await product.save();
  }
};
