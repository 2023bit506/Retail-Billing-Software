import express from "express";
import { sendWhatsappMessage } from "../services/whatsappService.js";

const router = express.Router();

router.post("/send", async (req, res) => {
  const { phone, message } = req.body;

  const result = await sendWhatsappMessage(phone, message);

  if (result.success) res.json(result);
  else res.status(500).json(result);
});

export default router;
