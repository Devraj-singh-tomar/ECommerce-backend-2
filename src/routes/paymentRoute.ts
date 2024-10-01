import express from "express";
import { isAdmin } from "../middlewares/authMiddleware.js";
import {
  allCoupon,
  applyDiscount,
  createCoupon,
  createPaymentIntent,
  deleteCoupon,
} from "../controllers/paymentController.js";

const app = express.Router();

// /api/v1/payment/coupon/new
app.post("/coupon/new", isAdmin, createCoupon);

app.post("/create", createPaymentIntent);

app.get("/discount", applyDiscount);

app.get("/coupon/all", isAdmin, allCoupon);

app.delete("/coupon/:id", isAdmin, deleteCoupon);

export default app;
