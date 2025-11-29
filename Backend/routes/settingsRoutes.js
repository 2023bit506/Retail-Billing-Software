import express from "express";
import { getSettings, updateSettings } from "../controllers/settingsController.js";

const router = express.Router();

router.get("/", getSettings);
router.put("/", updateSettings); // update all settings

export default router;
