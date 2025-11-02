 
import express from "express";
// import { createEvent, getEvents } from "../controllers/eventController.js";
import { createEvent, getEvents, updateEvent, deleteEvent } from "../controllers/eventController.js";
import { protect } from "../middlewares/authMiddleware.js";
import Ticket from "../models/Ticket.js";

const router = express.Router();

// Get all events created by logged-in user
router.get("/", protect, getEvents);

//Create a new event (linked to logged-in user)
router.post("/", protect, createEvent);


router.put("/:id", protect, updateEvent);
router.delete("/:id", protect, deleteEvent);

// Get attendance summary for a specific event
router.get("/:eventId/summary", protect, async (req, res) => {
  try {
    const { eventId } = req.params;

    // Count total and checked-in tickets
    const totalTickets = await Ticket.countDocuments({ eventId });
    const checkedInCount = await Ticket.countDocuments({
      eventId,
      isCheckedIn: true,
    });

    res.json({ totalTickets, checkedInCount });
  } catch (err) {
    res.status(500).json({ message: "Error fetching attendance data" });
  }
});

export default router;
