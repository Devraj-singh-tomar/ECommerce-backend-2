import express from "express";
import { isAdmin } from "../middlewares/authMiddleware.js";
import {
  allOrders,
  myOrders,
  newOrder,
} from "../controllers/orderController.js";

const app = express.Router();

// /api/v1/order/new
app.post("/new", newOrder);

app.get("/my", myOrders);

app.get("/all", isAdmin, allOrders);

export default app;
