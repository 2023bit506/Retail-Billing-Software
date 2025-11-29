import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  totalPurchases: { type: Number, default: 0 },
  lastVisit: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model("Customer", customerSchema);
