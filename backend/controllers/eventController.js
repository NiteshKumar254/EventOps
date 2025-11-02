

//12-10
import Event from "../models/Event.js";
import Ticket from "../models/Ticket.js";
import { generateQRCode } from "../utils/generateQR.js";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";


export const getEvents = async (req, res) => {
  try {
    // Filter events by logged-in user ID
    const events = await Event.find({ createdBy: req.user._id })
      .populate("createdBy", "name email")
      .sort({ date: 1 });

    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


export const createEvent = async (req, res) => {
  try {
    const { name, date, venue, totalSeats, vipSeats, regularSeats } = req.body;

    // 1️⃣ Create Event document
    const event = await Event.create({
      name,
      date,
      venue,
      totalSeats,
      vipSeats,
      regularSeats,
      createdBy: req.user._id, // Link to logged-in user
    });

    // 2️⃣ Generate tickets array
    const tickets = [];

    // VIP Tickets
    for (let i = 1; i <= vipSeats; i++) {
      const ticketId = uuidv4();
      const qrCode = await generateQRCode(ticketId);

      tickets.push({
        eventId: event._id,
        ticketId,
        attendeeName: `VIP Seat ${i}`,
        seatType: "VIP",
        seatNumber: `VIP-${i}`,
        qrCode,
        expiryDate: moment(date).add(1, "days").endOf("day").toDate(), // Future expiry fix
      });
    }

    // Regular Tickets
    for (let i = 1; i <= regularSeats; i++) {
      const ticketId = uuidv4();
      const qrCode = await generateQRCode(ticketId);

      tickets.push({
        eventId: event._id,
        ticketId,
        attendeeName: `Regular Seat ${i}`,
        seatType: "Regular",
        seatNumber: `R-${i}`,
        qrCode,
        expiryDate: moment(date).add(1, "days").endOf("day").toDate(),
      });
    }

    // Save tickets to DB
    await Ticket.insertMany(tickets);

    res.status(201).json({
      message: "Event created & tickets generated successfully",
      event,
      totalTickets: tickets.length,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


// UPDATE EVENT
export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) return res.status(404).json({ message: "Event not found" });

    // Only creator can edit
    if (event.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to edit this event" });
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({ message: "Event updated successfully", updatedEvent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// DELETE EVENT
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this event" });
    }

    await event.deleteOne();
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
