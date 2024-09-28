import { User } from "../models/userModel.js";
import ErrorHandler from "../utils/utilityClass.js";
import { TryCatch } from "./errorMiddleware.js";

// middleware to make sure that only admin can access selected route
export const isAdmin = TryCatch(async (req, res, next) => {
  const { id } = req.query;

  if (!id) return next(new ErrorHandler("Please login first", 401));

  const user = await User.findById(id);
  if (!user) return next(new ErrorHandler("Provided wrong ID", 401));

  if (user.role !== "admin")
    return next(new ErrorHandler("you are not the admin", 403));

  next();
});
