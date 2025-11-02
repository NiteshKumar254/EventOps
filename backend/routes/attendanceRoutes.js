
import express from "express";
import { getAttendanceReport } from "../controllers/attendanceController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// GET /api/attendance/:eventId
router.get("/:eventId", protect, getAttendanceReport);

export default router;
