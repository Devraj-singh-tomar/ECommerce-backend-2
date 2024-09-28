import { Request } from "express";
import { TryCatch } from "../middlewares/errorMiddleware.js";
import { NewOrderRequestBody } from "../types/types.js";
import { Order } from "../models/orderModel.js";
import { inValidateCache, reduceStock } from "../utils/features.js";
import ErrorHandler from "../utils/utilityClass.js";

export const newOrder = TryCatch(
  async (req: Request<{}, {}, NewOrderRequestBody>, res, next) => {
    const {
      shippingInfo,
      orderItems,
      user,
      subtotal,
      tax,
      shippingCharges,
      discount,
      total,
    } = req.body;

    if (
      !shippingInfo ||
      !orderItems ||
      !user ||
      !subtotal ||
      !tax ||
      !shippingCharges ||
      !discount ||
      !total
    )
      return next(new ErrorHandler("Please add all fields", 400));

    await Order.create({
      shippingInfo,
      orderItems,
      user,
      subtotal,
      tax,
      shippingCharges,
      discount,
      total,
    });

    await reduceStock(orderItems);

    await inValidateCache({ product: true, order: true, admin: true });

    return res.status(201).json({
      success: true,
      message: "Order processed successfully",
    });
  }
);
