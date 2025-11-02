

import fs from "fs";
import Ticket from "../models/Ticket.js";
import { exportToCSV, exportToPDF } from "../utils/exportData.js";

// @desc    Get or export attendance report
// @route   GET /api/attendance/:eventId
// @access  Private (protected route)
export const getAttendanceReport = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { format, seatType } = req.query;

    // Build filter dynamically
    const filter = { eventId };
    if (seatType) filter.seatType = seatType;

    // Fetch all tickets for the event
    const tickets = await Ticket.find(filter).sort({ createdAt: -1 });

    if (!tickets || tickets.length === 0) {
      return res.status(404).json({ message: "No tickets found for this event" });
    }

    // ✅ Calculate attendance stats
    const totalTickets = tickets.length;
    const checkedInCount = tickets.filter((t) => t.checkedIn).length;

    // ✅ If frontend request → return JSON summary (no format)
    if (!format) {
      return res.status(200).json({
        success: true,
        eventId,
        totalTickets,
        checkedInCount,
        tickets, // send tickets if frontend wants to list them
      });
    }

    // ✅ If export requested → handle CSV or PDF
    const filename = `attendance_${eventId}.${format}`;

    if (format === "pdf") {
      await exportToPDF(tickets, filename);
    } else if (format === "csv") {
      await exportToCSV(tickets, filename);
    } else {
      return res.status(400).json({ message: "Invalid export format" });
    }

    // ✅ Send the file and then delete after sending
    res.download(filename, (err) => {
      if (err) {
        console.error("Download error:", err);
        return res.status(500).json({ message: "File download failed" });
      }
      // Clean up the file
      fs.unlink(filename, (unlinkErr) => {
        if (unlinkErr) console.error("Failed to delete temp file:", unlinkErr);
      });
    });
  } catch (error) {
    console.error("Attendance Report Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
