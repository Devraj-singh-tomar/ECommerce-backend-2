import { TryCatch } from "../middlewares/errorMiddleware.js";
import { Coupon } from "../models/couponModel.js";
import ErrorHandler from "../utils/utilityClass.js";

export const createCoupon = TryCatch(async (req, res, next) => {
  const { coupon, amount } = req.body;

  if (!coupon || !amount)
    return next(new ErrorHandler("Please enter both fields", 400));

  await Coupon.create({ code: coupon, amount });

  return res.status(201).json({
    success: true,
    message: `Code - ${coupon} created successfully`,
  });
});
