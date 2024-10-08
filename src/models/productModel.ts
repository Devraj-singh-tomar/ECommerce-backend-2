import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add name "],
    },

    photo: {
      type: String,
      required: [true, "Please add photo "],
    },

    price: {
      type: Number,
      required: [true, "Please add price "],
    },

    stock: {
      type: Number,
      required: [true, "Please add stock "],
    },

    category: {
      type: String,
      required: [true, "Please add product category "],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.model("Product", schema);
