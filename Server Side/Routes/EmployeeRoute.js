import express from "express";
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";
import Employee from "../models/Employee.js";

const router = express.Router();

// ------------------ IMAGE UPLOAD ------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Public/Images");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// ------------------ ADD EMPLOYEE ------------------
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);

    const employee = new Employee({
      name: req.body.name,
      email: req.body.email,
      password: hash,
      address: req.body.address,
      salary: req.body.salary,
      image: req.file ? req.file.filename : null,
      category_id: req.body.category_id,
    });

    await employee.save();
    res.json({ Status: true });
  } catch (err) {
    res.json({ Status: false, Error: err.message });
  }
});

// ------------------ GET ALL EMPLOYEES ------------------
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find().populate("category_id");
    res.json({ Status: true, Result: employees });
  } catch (err) {
    res.json({ Status: false, Error: err.message });
  }
});

// ------------------ EMPLOYEE COUNTS ------------------
router.get("/count", async (req, res) => {
  try {
    const count = await Employee.countDocuments();
    res.json({ Status: true, Result: [{ employee: count }] });
  } catch (err) {
    res.json({ Status: false, Error: err.message });
  }
});

router.get("/salary", async (req, res) => {
  try {
    const salarySum = await Employee.aggregate([
      { $group: { _id: null, salaryOFEmp: { $sum: "$salary" } } }
    ]);
    res.json({ Status: true, Result: salarySum });
  } catch (err) {
    res.json({ Status: false, Error: err.message });
  }
});

router.post("/employee_login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ Status: false, Error: "Email and password are required" });
    }

    // If your Employee schema has password select:false, this will include it; if not, it's harmless.
    const employee = await Employee.findOne({ email }).select("+password");
    if (!employee) {
      return res.status(401).json({ Status: false, Error: "Invalid credentials" });
    }

    const ok = await bcrypt.compare(password, employee.password);
    if (!ok) {
      return res.status(401).json({ Status: false, Error: "Invalid credentials" });
    }

    // Don't send the hashed password back
    const safeEmployee = {
      _id: employee._id,
      name: employee.name,
      email: employee.email,
      address: employee.address,
      salary: employee.salary,
      image: employee.image,
      category_id: employee.category_id,
    };

    return res.json({ Status: true, Result: safeEmployee });
  } catch (err) {
    return res.status(500).json({ Status: false, Error: err.message });
  }
});

// ------------------ UPDATE EMPLOYEE ------------------
router.put("/edit/:id", async (req, res) => {
  try {
    const updated = await Employee.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        email: req.body.email,
        salary: req.body.salary,
        address: req.body.address,
        category_id: req.body.category_id,
      },
      { new: true }
    );
    res.json({ Status: true, Result: updated });
  } catch (err) {
    res.json({ Status: false, Error: err.message });
  }
});

// ------------------ DELETE EMPLOYEE ------------------
router.delete("/delete/:id", async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ Status: true });
  } catch (err) {
    res.json({ Status: false, Error: err.message });
  }
});

// ------------------ GET SINGLE EMPLOYEE (ONLY 24-hex ObjectId) ------------------
// NOTE: this route is intentionally last and restricted to avoid accidental matches
router.get("/:id([0-9a-fA-F]{24})", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id).populate("category_id");
    res.json({ Status: true, Result: employee });
  } catch (err) {
    res.json({ Status: false, Error: err.message });
  }
});

export default router;
