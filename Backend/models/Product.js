import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String }, // ✅ add this
  price: { type: Number, required: true },
  description: String,
  stock: { type: Number, default: 0 },
});

export default mongoose.model("Product", productSchema);
