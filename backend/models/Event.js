
import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    venue: {
      type: String,
      required: true,
    },
    totalSeats: {
      type: Number,
      required: true,
    },
    vipSeats: {
      type: Number,
      default: 0,
    },
    regularSeats: {
      type: Number,
      default: 0,
    },
    //  Link event to the user (admin) who created it
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Event", eventSchema);
