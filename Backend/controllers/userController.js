import User from "../models/User.js";
import bcrypt from "bcryptjs";

// GET ALL USERS (Admin)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // hide password
    res.json(users);
  } catch (err) {
    console.error("❌ Error in getAllUsers:", err);
    res.status(500).json({ message: err.message });
  }
};

// CREATE NEW USER (Admin)
export const createUser = async (req, res) => {
  try {
    const { name, email, password, role, status } = req.body;

    // Check email exists
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const user = await User.create({ name, email, password, role, status });

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      },
    });
  } catch (err) {
    console.error("❌ Error in createUser:", err);
    res.status(400).json({ message: err.message });
  }
};

// UPDATE USER (Admin)
export const updateUser = async (req, res) => {
  try {
    const { name, email, role, status, password } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Update fields
    if (name) user.name = name;
    if (email) user.email = email;
    if (role) user.role = role;
    if (status) user.status = status;

    // Password update
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    const updated = await user.save();

    res.json({
      message: "User updated successfully",
      user: {
        id: updated._id,
        name: updated.name,
        email: updated.email,
        role: updated.role,
        status: updated.status,
      },
    });
  } catch (err) {
    console.error("❌ Error in updateUser:", err);
    res.status(500).json({ message: err.message });
  }
};

// DELETE USER (Admin)
export const deleteUser = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);

    if (!deleted)
      return res.status(404).json({ message: "User not found" });

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("❌ Error in deleteUser:", err);
    res.status(500).json({ message: err.message });
  }
};
