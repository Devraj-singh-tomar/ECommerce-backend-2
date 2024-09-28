import express from "express";
import { isAdmin } from "../middlewares/authMiddleware.js";
import { createCoupon } from "../controllers/paymentController.js";

const app = express.Router();

// /api/v1/payment/coupon/new
app.post("/coupon/new", createCoupon);

export default app;
