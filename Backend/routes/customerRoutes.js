import express from "express";
import { getCustomers, addCustomer, deleteCustomer } from "../controllers/customerController.js";

const router = express.Router();

router.get("/", getCustomers);
router.post("/", addCustomer);
router.delete("/:id", deleteCustomer);

export default router;
