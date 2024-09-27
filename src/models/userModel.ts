import mongoose from "mongoose";
import validator from "validator";

interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  photo: string;
  gender: "male" | "female";
  role: "admin" | "user";
  dob: Date;
  createdAt: Date;
  updatedAt: Date;
  age: number;
}

const schema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: [true, "Please enter ID "],
    },
    name: {
      type: String,
      required: [true, "Please add name "],
    },
    email: {
      type: String,
      unique: [true, "Email already exists"],
      required: [true, "Please add email "],
      validate: validator.default.isEmail,
    },
    photo: {
      type: String,
      required: [true, "Please add photo "],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: [true, "Please enter gender"],
    },
    dob: {
      type: Date,
      require: [true, "Please enter dob"],
    },
  },
  {
    timestamps: true,
  }
);

schema.virtual("age").get(function () {
  const today = new Date();
  const dob = this.dob;

  if (!dob) return undefined;

  let age = today.getFullYear() - dob.getFullYear();

  if (
    today.getMonth() < dob.getMonth() ||
    (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
  ) {
    age--;
  }

  return age;
});

export const User = mongoose.model<IUser>("User", schema);
