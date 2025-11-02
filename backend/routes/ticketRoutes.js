

import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  getTicketsByEvent,
  checkInTicket,
  assignTicketToUser,
} from "../controllers/ticketController.js";

const router = express.Router();


router.get("/event/:eventId", protect, getTicketsByEvent);

router.post("/checkin", protect, checkInTicket);


router.post("/assign", protect, assignTicketToUser);

export default router;


