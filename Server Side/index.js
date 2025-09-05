// index.js (ES modules)
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./utils/db.js";
import AdminRoute from "./Routes/AdminRoute.js";
import EmployeeRoute from "./Routes/EmployeeRoute.js";

const app = express();

// Connect DB
connectDB();

// Basic middleware
app.use(express.json());
app.use(cookieParser());

// ------------------ VERIFY ROUTE ------------------
app.get("/verify", (req, res) => {
  try {
    const token = req.cookies?.token;
    if (!token) return res.json({ Status: false, Error: "No token" });

    // verify token (use same secret you sign with)
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

// CORS configuration — change FRONTEND_ORIGIN to match your frontend dev server
const FRONTEND_ORIGIN = "http://localhost:5000"; // <-- set this to your frontend origin (Vite:5173, CRA:3000)

// Configure CORS to allow credentials (cookies) if needed
app.use(cors({
  origin: FRONTEND_ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true, // allow cookies / withCredentials
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Explicitly handle preflight requests for all routes
app.options('*', cors({
  origin: FRONTEND_ORIGIN,
  credentials: true
}));

// Static "Public" folder (unchanged)
app.use("/Public", express.static("Public"));

// API routes
app.use("/admin", AdminRoute);
app.use("/employee", EmployeeRoute);

// ---------- Optional: Serve frontend build (one-server deployment) ----------
// If you build the frontend (Vite default -> dist, CRA -> build), uncomment the appropriate block
// to serve static files from Express. This makes frontend and backend same-origin (no CORS needed).

// Helper for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

// If you're using Vite (build output -> client/dist)
const viteBuildPath = path.join(__dirname, "client", "dist");

// If you're using Create React App (build output -> client/build)
// const craBuildPath = path.join(__dirname, "client", "build");

// Serve Vite build if exists (uncomment if you built frontend with Vite)
app.use(express.static(viteBuildPath));
app.get('*', (req, res, next) => {
  // Only send index.html for routes that are not API endpoints
  if (req.path.startsWith('/admin') || req.path.startsWith('/employee') || req.path.startsWith('/api')) {
    return next(); // let API routes handle it
  }
  res.sendFile(path.join(viteBuildPath, 'index.html'), err => {
    if (err) next();
  });
});

// ---------------------------------------------------------------------------

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});