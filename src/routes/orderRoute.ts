import express from "express";
import { isAdmin } from "../middlewares/authMiddleware.js";
import {
  allOrders,
  deleteOrder,
  getSingleOrder,
  myOrders,
  newOrder,
  processOrder,
} from "../controllers/orderController.js";

const app = express.Router();

// /api/v1/order/new
app.post("/new", newOrder);

app.get("/my", myOrders);

app.get("/all", isAdmin, allOrders);

app
  .route("/:id")
  .get(getSingleOrder)
  .put(isAdmin, processOrder)
  .delete(isAdmin, deleteOrder);

export default app;
