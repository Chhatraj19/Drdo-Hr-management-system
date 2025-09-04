import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Admin from "../models/Admin.js";
import Category from "../models/Category.js";

const router = express.Router();

// ------------------ ADMIN LOGIN ------------------
router.post("/login", async (req, res) => {
  try {
    const admin = await Admin.findOne({ email: req.body.email });
    if (!admin) return res.json({ loginStatus: false, Error: "Invalid email or password" });

    const isMatch = await bcrypt.compare(req.body.password, admin.password);
    if (!isMatch) return res.json({ loginStatus: false, Error: "Invalid email or password" });

    const token = jwt.sign(
      { role: "admin", email: admin.email, id: admin._id },
      "jwt_secret_key",
      { expiresIn: "1d" }
    );

    res.cookie("token", token);
    return res.json({ loginStatus: true });
  } catch (err) {
    return res.json({ loginStatus: false, Error: err.message });
  }
});

// ------------------ CATEGORY ------------------
router.get("/category", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json({ Status: true, Result: categories });
  } catch (err) {
    res.json({ Status: false, Error: err.message });
  }
});

router.post("/add_category", async (req, res) => {
  try {
    const category = new Category({ name: req.body.category });
    await category.save();
    res.json({ Status: true });
  } catch (err) {
    res.json({ Status: false, Error: err.message });
  }
});

// ------------------ ADMIN COUNTS ------------------
router.get("/count", async (req, res) => {
  try {
    const count = await Admin.countDocuments();
    res.json({ Status: true, Result: [{ admin: count }] });
  } catch (err) {
    res.json({ Status: false, Error: err.message });
  }
});

router.get("/records", async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json({ Status: true, Result: admins });
  } catch (err) {
    res.json({ Status: false, Error: err.message });
  }
});

// ------------------ LOGOUT ------------------
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ Status: true });
});

export default router;
