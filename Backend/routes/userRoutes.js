import express from "express";
import {
  getAllUsers,
  createUser,
  deleteUser,
  updateUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getAllUsers);        // GET all users
router.post("/", createUser);        // CREATE new user
router.put("/:id", updateUser);      // UPDATE user
router.delete("/:id", deleteUser);   // DELETE user

export default router;
