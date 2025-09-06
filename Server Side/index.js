// index.js (ES modules)
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import jwt from "jsonwebtoken"; // <-- you were using jwt.verify but hadn't imported it

import connectDB from "./utils/db.js";
import AdminRoute from "./Routes/AdminRoute.js";
import EmployeeRoute from "./Routes/EmployeeRoute.js";

const app = express();

// Connect DB
connectDB();

// Basic middleware
app.use(express.json());
app.use(cookieParser());

// ---------- CORS: allow ANY origin (with credentials) ----------
const corsOptions = {
  origin: (origin, callback) => {
    // allow requests with no origin (like mobile apps, curl) or any origin
    callback(null, true);
  },
  credentials: true, // allow cookies / Authorization headers cross-site
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
};
app.use(cors(corsOptions));
// Preflight for all routes
app.options("*", cors(corsOptions));
// ---------------------------------------------------------------

// ------------------ VERIFY ROUTE ------------------
app.get("/verify", (req, res) => {
  try {
    const token = req.cookies?.token;
    if (!token) return res.json({ Status: false, Error: "No token" });

    const payload = jwt.verify(token, "jwt_secret_key");
    return res.json({
      Status: true,
      role: payload.role,
      id: payload.id,
      email: payload.email,
    });
  } catch (err) {
    return res.json({ Status: false, Error: err.message });
  }
});

// Static "Public" folder
app.use("/Public", express.static("Public"));

// API routes
app.use("/admin", AdminRoute);
app.use("/employee", EmployeeRoute);

// ---------- Optional: Serve frontend build (one-server deployment) ----------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// If you're using Vite (build output -> client/dist)
const viteBuildPath = path.join(__dirname, "client", "dist");

// Serve Vite build if exists (uncomment if you built frontend with Vite)
app.use(express.static(viteBuildPath));
app.get("*", (req, res, next) => {
  if (req.path.startsWith("/admin") || req.path.startsWith("/employee") || req.path.startsWith("/api")) {
    return next();
  }
  res.sendFile(path.join(viteBuildPath, "index.html"), (err) => {
    if (err) next();
  });
});

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
