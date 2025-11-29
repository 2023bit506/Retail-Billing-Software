import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema({
  businessName: { type: String, default: "Retail Store" },
  address: { type: String, default: "" },
  phone: { type: String, default: "" },
  email: { type: String, default: "" },

  gst: { type: Number, default: 18 },
  discount: { type: Number, default: 0 },

  lowStockAlert: { type: Boolean, default: false },
  dailyReport: { type: Boolean, default: false },
});

export default mongoose.model("Settings", settingsSchema);
