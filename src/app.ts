import express from "express";
import { connectDB } from "./utils/features.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

import userRoute from "./routes/userRoute.js";

const port = 4000;

connectDB();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("working with API");
});

// ROUTES
app.use("/api/v1/user", userRoute);

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server connected on localhost:${port}`);
});
