import { NextFunction, Request, Response } from "express";
import { User } from "../models/userModel.js";
import { NewUserRequestBody } from "../types/types.js";
import { TryCatch } from "../middlewares/errorMiddleware.js";
import ErrorHandler from "../utils/utilityClass.js";

export const newUser = TryCatch(
  async (
    req: Request<{}, {}, NewUserRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { name, email, photo, _id, gender, dob } = req.body;

    let user = await User.findById(_id);

    if (user) {
      return res.status(200).json({
        success: true,
        message: `welcome, ${user.name}`,
      });
    }

    if (!_id || !name || !email || !photo || !gender || !dob)
      return next(new ErrorHandler("Please enter all field", 400));

    user = await User.create({
      name,
      email,
      photo,
      _id,
      gender,
      dob: new Date(dob),
    });

    return res.status(201).json({
      success: true,
      message: `welcome ${user.name}`,
    });
  }
);
