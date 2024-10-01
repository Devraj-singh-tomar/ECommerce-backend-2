import { stripe } from "../app.js";
import { TryCatch } from "../middlewares/errorMiddleware.js";
import { Coupon } from "../models/couponModel.js";
import ErrorHandler from "../utils/utilityClass.js";

export const createPaymentIntent = TryCatch(async (req, res, next) => {
  const { amount } = req.body;

  if (!amount) return next(new ErrorHandler("Please enter amount", 400));

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Number(amount) * 100,
    currency: "inr",
  });

  return res.status(201).json({
    success: true,
    clientSecret: paymentIntent.client_secret,
  });
});

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

export const applyDiscount = TryCatch(async (req, res, next) => {
  const { coupon } = req.query;

  const discount = await Coupon.findOne({ code: coupon });

  if (!discount) return next(new ErrorHandler("Wrong coupon code", 400));

  return res.status(201).json({
    success: true,
    discount: discount.amount,
  });
});

export const allCoupon = TryCatch(async (req, res, next) => {
  const coupons = await Coupon.find({});

  return res.status(201).json({
    success: true,
    coupons,
  });
});

export const deleteCoupon = TryCatch(async (req, res, next) => {
  const { id } = req.params;
  const deleteCoupon = await Coupon.findByIdAndDelete(id);

  if (!deleteCoupon) return next(new ErrorHandler("Wrong coupon ID", 400));

  return res.status(200).json({
    success: true,
    message: `Coupon - ${deleteCoupon.code} successfully deleted`,
  });
});
