


import fs from "fs";
import { Parser } from "json2csv";
import PDFDocument from "pdfkit";

/**
 * 🧾 Export attendance to CSV
 * @param {Array} tickets - Array of ticket objects
 * @param {String} filename - Name of the CSV file
 */
export const exportToCSV = (tickets, filename) => {
  const fields = [
    "attendeeName",
    "seatType",
    "seatNumber",
    "isUsed",
    "checkInTime",
    "expiryDate",
    "ticketId",
  ];

  const opts = { fields };
  const parser = new Parser(opts);
  const csv = parser.parse(tickets);

  fs.writeFileSync(filename, csv);
};

/**
 * 📄 Export attendance to PDF
 * @param {Array} tickets - Array of ticket objects
 * @param {String} filename - Name of the PDF file
 */
export const exportToPDF = (tickets, filename) => {
  const doc = new PDFDocument({ margin: 30, size: "A4" });
  const writeStream = fs.createWriteStream(filename);
  doc.pipe(writeStream);

  doc.fontSize(18).text("Attendance Report", { align: "center" });
  doc.moveDown();

  // Table headers
  doc.fontSize(12).text("Name", 50, doc.y, { continued: true });
  doc.text("Type", 180, doc.y, { continued: true });
  doc.text("Seat", 250, doc.y, { continued: true });
  doc.text("Status", 320, doc.y, { continued: true });
  doc.text("Check-In Time", 400, doc.y);
  doc.moveDown(0.5);

  // Horizontal line
  doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();

  // Table rows
  tickets.forEach((t) => {
    const status = t.isUsed ? "Checked-In" : "Not Checked-In";
    doc.moveDown(0.5);
    doc.text(t.attendeeName, 50, doc.y, { continued: true });
    doc.text(t.seatType, 180, doc.y, { continued: true });
    doc.text(t.seatNumber || "-", 250, doc.y, { continued: true });
    doc.text(status, 320, doc.y, { continued: true });
    doc.text(t.checkInTime ? new Date(t.checkInTime).toLocaleString() : "-", 400, doc.y);
  });

  doc.end();
};

