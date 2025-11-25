

// import Ticket from "../models/Ticket.js";
// import moment from "moment";
// import nodemailer from "nodemailer";
// import axios from "axios";


// export const checkInTicket = async (req, res) => {
//   try {
//     const { ticketId } = req.body;

//     const ticket = await Ticket.findOne({ ticketId });
//     if (!ticket) return res.status(404).json({ message: "Ticket not found" });

//     if (moment().isAfter(ticket.expiryDate))
//       return res.status(400).json({ message: "Ticket has expired" });

//     if (ticket.isUsed)
//       return res.status(400).json({ message: "Ticket already used" });

//     ticket.isUsed = true;
//     ticket.checkInTime = new Date();
//     await ticket.save();

//     res.json({
//       message: "Check-in successful",
//       ticket: {
//         attendeeName: ticket.attendeeName,
//         seatType: ticket.seatType,
//         seatNumber: ticket.seatNumber,
//         eventId: ticket.eventId,
//       },
//     });
//   } catch (error) {
//     console.error("Check-in error:", error);
//     res.status(500).json({ message: "Server Error", error: error.message });
//   }
// };


// export const getTicketsByEvent = async (req, res) => {
//   try {
//     const { eventId } = req.params;

//     const tickets = await Ticket.find({ eventId }).sort({ createdAt: -1 });
//     if (!tickets.length)
//       return res.status(404).json({ message: "No tickets found for this event" });

//     res.json(
//       tickets.map((t) => ({
//         ticketId: t.ticketId,
//         attendeeName: t.attendeeName,
//         seatType: t.seatType,
//         seatNumber: t.seatNumber,
//         qrCode: t.qrCode,
//         isUsed: t.isUsed,
//         checkInTime: t.checkInTime,
//         isAssigned: t.isAssigned || false,
//         assignedEmail: t.assignedEmail || null,
//       }))
//     );
//   } catch (error) {
//     console.error("Fetch tickets error:", error);
//     res.status(500).json({ message: "Server Error", error: error.message });
//   }
// };

// export const assignTicketToUser = async (req, res) => {
//   try {
//     const { ticketId, email } = req.body;

//     const ticket = await Ticket.findOne({ ticketId });
//     if (!ticket) return res.status(404).json({ message: "Ticket not found" });

//     if (ticket.isAssigned)
//       return res.status(400).json({ message: "Ticket already assigned" });

//     console.log("Sending ticket to:", email);

//     // Fetch QR code image as binary data
//     const qrResponse = await axios.get(ticket.qrCode, { responseType: "arraybuffer" });
//     const qrImage = Buffer.from(qrResponse.data, "binary");

//     //  Create transporter
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     // Build email content
//     const mailOptions = {
//       from: `"Event Management" <${process.env.EMAIL_USER}>`,
//       to: email,
//       subject: "🎟️ Your Event Ticket",
//       html: `
//         <div style="font-family: Arial, sans-serif; padding:16px; border:1px solid #eee; border-radius:8px;">
//           <h2 style="color:#333;">Your Event Ticket</h2>
//           <p><strong>Attendee:</strong> ${ticket.attendeeName}</p>
//           <p><strong>Seat:</strong> ${ticket.seatType} ${ticket.seatNumber || ""}</p>
//           <p><strong>Event ID:</strong> ${ticket.eventId}</p>
//           <p>Please scan this QR code at the venue gate:</p>
//           <img src="cid:qrcode" alt="QR Code" 
//                style="width:200px;height:200px;border:1px solid #ccc;border-radius:10px;margin-top:10px;" />
//           <p style="margin-top:15px;color:#555;">Thank you for being part of our event!</p>
//         </div>
//       `,
//       attachments: [
//         {
//           filename: "ticket-qr.png",
//           content: qrImage,
//           cid: "qrcode", // reference for inline image
//         },
//       ],
//     };

//     // Send the mail
//     await transporter.sendMail(mailOptions);

//     // Mark ticket as assigned
//     ticket.isAssigned = true;
//     ticket.assignedEmail = email;
//     await ticket.save();

//     console.log("Email sent successfully to:", email);
//     res.json({
//       message: " Ticket sent and assigned successfully!",
//       ticket,
//     });
//   } catch (error) {
//     console.error(" Error sending ticket email:", error);
//     res.status(500).json({ message: "Error sending ticket", error: error.message });
//   }
// };

// todayssssssssssssssss chagnge 
import Ticket from "../models/Ticket.js";
import moment from "moment";
import nodemailer from "nodemailer";
import axios from "axios";

// ✅ Helper: background me email bhejne ka kaam yahan hoga
const sendTicketEmail = async (email, ticket) => {
  try {
    console.log("Preparing ticket email for:", email);

    // Fetch QR code image as binary data
    const qrResponse = await axios.get(ticket.qrCode, { responseType: "arraybuffer" });
    const qrImage = Buffer.from(qrResponse.data, "binary");

    // Create transporter (Gmail)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Gmail ke liye APP PASSWORD hona chahiye
      },
    });

    // Build email content
    const mailOptions = {
      from: `"Event Management" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "🎟️ Your Event Ticket",
      html: `
        <div style="font-family: Arial, sans-serif; padding:16px; border:1px solid #eee; border-radius:8px;">
          <h2 style="color:#333;">Your Event Ticket</h2>
          <p><strong>Attendee:</strong> ${ticket.attendeeName}</p>
          <p><strong>Seat:</strong> ${ticket.seatType} ${ticket.seatNumber || ""}</p>
          <p><strong>Event ID:</strong> ${ticket.eventId}</p>
          <p>Please scan this QR code at the venue gate:</p>
          <img src="cid:qrcode" alt="QR Code" 
               style="width:200px;height:200px;border:1px solid #ccc;border-radius:10px;margin-top:10px;" />
          <p style="margin-top:15px;color:#555;">Thank you for being part of our event!</p>
        </div>
      `,
      attachments: [
        {
          filename: "ticket-qr.png",
          content: qrImage,
          cid: "qrcode", // reference for inline image
        },
      ],
    };

    // Send the mail
//     await transporter.sendMail(mailOptions);
//     console.log("Ticket email sent successfully to:", email);
//   } catch (error) {
//     console.error("Background email send error:", error);
//     // Yahan sirf log karna hai, client ko koi error nahi jayega
//   }
// };
    const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // 587 = TLS (STARTTLS)
  auth: {
    user: process.env.EMAIL_USER,   // your@gmail.com
    pass: process.env.EMAIL_PASS,   // APP PASSWORD
  },
});


export const checkInTicket = async (req, res) => {
  try {
    const { ticketId } = req.body;

    const ticket = await Ticket.findOne({ ticketId });
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    if (moment().isAfter(ticket.expiryDate))
      return res.status(400).json({ message: "Ticket has expired" });

    if (ticket.isUsed)
      return res.status(400).json({ message: "Ticket already used" });

    ticket.isUsed = true;
    ticket.checkInTime = new Date();
    await ticket.save();

    res.json({
      message: "Check-in successful",
      ticket: {
        attendeeName: ticket.attendeeName,
        seatType: ticket.seatType,
        seatNumber: ticket.seatNumber,
        eventId: ticket.eventId,
      },
    });
  } catch (error) {
    console.error("Check-in error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getTicketsByEvent = async (req, res) => {
  try {
    const { eventId } = req.params;

    const tickets = await Ticket.find({ eventId }).sort({ createdAt: -1 });
    if (!tickets.length)
      return res.status(404).json({ message: "No tickets found for this event" });

    res.json(
      tickets.map((t) => ({
        ticketId: t.ticketId,
        attendeeName: t.attendeeName,
        seatType: t.seatType,
        seatNumber: t.seatNumber,
        qrCode: t.qrCode,
        isUsed: t.isUsed,
        checkInTime: t.checkInTime,
        isAssigned: t.isAssigned || false,
        assignedEmail: t.assignedEmail || null,
      }))
    );
  } catch (error) {
    console.error("Fetch tickets error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const assignTicketToUser = async (req, res) => {
  try {
    const { ticketId, email } = req.body;

    const ticket = await Ticket.findOne({ ticketId });
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    if (ticket.isAssigned)
      return res.status(400).json({ message: "Ticket already assigned" });

    console.log("Assigning ticket to:", email);

    // Mark ticket as assigned and save (email se independent)
    ticket.isAssigned = true;
    ticket.assignedEmail = email;
    await ticket.save();

    // ✅ Client ko turant success response
    res.json({
      message: "Ticket assigned successfully! Email is being sent.",
      ticket,
    });

    // ✅ Email background me bhejo, fail hua to bhi API safe rahegi
    sendTicketEmail(email, ticket).catch((err) => {
      console.error("Error while sending ticket email in background:", err);
    });
  } catch (error) {
    console.error("Error in assignTicketToUser:", error);
    res
      .status(500)
      .json({ message: "Error assigning ticket", error: error.message });
  }
};

