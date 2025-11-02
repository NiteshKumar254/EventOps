// import { Parser } from "json2csv";
// import PDFDocument from "pdfkit";
// import fs from "fs";

// export const exportToCSV = (tickets, filename) => {
//   try {
//     const fields = ["ticketId", "attendeeName", "seatType", "seatNumber", "isUsed", "checkInTime"];
//     const json2csvParser = new Parser({ fields });
//     const csv = json2csvParser.parse(tickets);
//     fs.writeFileSync(filename, csv);
//     return filename;
//   } catch (error) {
//     console.error("CSV Export Error:", error);
//     throw error;
//   }
// };

// export const exportToPDF = (tickets, filename) => {
//   try {
//     const doc = new PDFDocument();
//     doc.pipe(fs.createWriteStream(filename));

//     doc.fontSize(20).text("Attendance Report", { align: "center" });
//     doc.moveDown();

//     tickets.forEach((t, index) => {
//       doc.fontSize(12).text(
//         `${index + 1}. ${t.attendeeName} | ${t.seatType} | ${t.seatNumber} | ${t.isUsed ? "Checked-In" : "Not Checked-In"} | ${t.checkInTime || "-"}`
//       );
//     });

//     doc.end();
//     return filename;
//   } catch (error) {
//     console.error("PDF Export Error:", error);
//     throw error;
//   }
// };


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

