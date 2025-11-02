
import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    ticketId: {
      type: String,
      required: true,
      unique: true,
    },
    attendeeName: {
      type: String,
      required: true,
    },
    seatType: {
      type: String,
      enum: ["VIP", "Regular"],
      required: true,
    },
    seatNumber: {
      type: String,
    },
    qrCode: {
      type: String, // URL or Base64 image
      required: true,
    },
    isUsed: {
      type: Boolean,
      default: false,
    },
    checkInTime: {
      type: Date,
    },
    expiryDate: {
      type: Date,
      required: true,
    },

    //Assignment tracking
    isAssigned: {
      type: Boolean,
      default: false,
    },
    assignedEmail: {
      type: String, // Email of assigned user
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Ticket", ticketSchema);
