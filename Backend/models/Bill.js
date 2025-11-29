import mongoose from "mongoose";

const billSchema = new mongoose.Schema({
  customerName: String,
  date: { type: Date, default: Date.now },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
      total: Number,
      name: String,
      price: Number,
    },
  ],
  totalAmount: Number,
});

export default mongoose.model("Bill", billSchema);
