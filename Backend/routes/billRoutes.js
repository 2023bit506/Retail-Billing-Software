import express from "express";
import { getBills, addBill, generateBillPDF } from "../controllers/billController.js";

const router = express.Router();

router.get("/", getBills);
router.post("/", addBill);
router.get("/:id/pdf", generateBillPDF);

export default router;
