import express from "express";

import { isAdmin } from "../middlewares/authMiddleware.js";
import {
  getBarChart,
  getDashboardStats,
  getLineChart,
  getPieChart,
} from "../controllers/statsController.js";

const app = express.Router();

// /api/v1//dashboard/stats
app.get("/stats", isAdmin, getDashboardStats);

app.get("/pie", isAdmin, getPieChart);

app.get("/bar", isAdmin, getBarChart);

app.get("/line", isAdmin, getLineChart);

export default app;
