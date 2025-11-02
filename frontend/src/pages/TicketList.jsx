// // import { useEffect, useState } from "react";
// // import { useParams } from "react-router-dom";
// // import axios from "../services/api";

// // import EventCard from "../components/EventCard";



// // export default function TicketList() {
// //   const { eventId } = useParams();
// //   const [tickets, setTickets] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const fetchTickets = async () => {
// //       try {
// //         const res = await axios.get(`/tickets/event/${eventId}`);
// //         setTickets(res.data);
// //       } catch (err) {
// //         console.error(err);
// //         alert(err.response?.data?.message || "Failed to fetch tickets");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchTickets();
// //   }, [eventId]);

// //   if (loading)
// //     return (
// //       <div className="flex justify-center items-center h-screen text-lg text-gray-600">
// //         Loading tickets...
// //       </div>
// //     );

// //   if (!tickets.length)
// //     return (
// //       <div className="flex justify-center items-center h-screen text-lg text-gray-600">
// //         No tickets found for this event.
// //       </div>
// //     );

// //   return (
// //     <div className="p-6">
// //       <h1 className="text-2xl font-semibold mb-6 text-gray-800">
// //         🎟 Tickets for Event
// //       </h1>

// //       <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
// //         {tickets.map((ticket) => (
// //           <div
// //             key={ticket.ticketId}
// //             className={`bg-white border rounded-2xl shadow hover:shadow-lg transition-all duration-200 p-4 relative ${
// //               ticket.isUsed ? "opacity-70" : ""
// //             }`}
// //           >
// //             <div
// //               className={`absolute top-3 right-3 text-xs px-2 py-1 rounded-full ${
// //                 ticket.isUsed
// //                   ? "bg-red-100 text-red-600"
// //                   : "bg-green-100 text-green-600"
// //               }`}
// //             >
// //               {ticket.isUsed ? "Checked In" : "Valid"}
// //             </div>

// //             <img
// //               src={ticket.qrCode}
// //               alt="QR Code"
// //               className="w-full h-48 object-contain p-2 bg-gray-50 rounded-lg"
// //             />

// //             <div className="mt-4">
// //               <h2 className="font-semibold text-gray-800">
// //                 {ticket.attendeeName}
// //               </h2>
// //               <p className="text-sm text-gray-500">
// //                 Seat: {ticket.seatType} {ticket.seatNumber || ""}
// //               </p>
// //               {ticket.checkInTime && (
// //                 <p className="text-xs text-gray-400 mt-1">
// //                   Checked in at: {new Date(ticket.checkInTime).toLocaleString()}
// //                 </p>
// //               )}
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }
// // import { useEffect, useState } from "react";
// // import { useParams } from "react-router-dom";
// // import axios from "../services/api";

// // export default function TicketList() {
// //   const { eventId } = useParams();
// //   const [tickets, setTickets] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const fetchTickets = async () => {
// //       try {
// //         const res = await axios.get(`/tickets/event/${eventId}`);
// //         setTickets(res.data);
// //       } catch (err) {
// //         console.error(err);
// //         alert(err.response?.data?.message || "Failed to fetch tickets");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchTickets();
// //   }, [eventId]);

// //   if (loading)
// //     return (
// //       <div className="flex justify-center items-center h-screen text-lg text-gray-600">
// //         Loading tickets...
// //       </div>
// //     );

// //   if (!tickets.length)
// //     return (
// //       <div className="flex justify-center items-center h-screen text-lg text-gray-600">
// //         No tickets found for this event.
// //       </div>
// //     );

// //   return (
// //     <div className="p-6 ">
// //       <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">
// //         🎟 Tickets for Event
// //       </h1>

// //       <div className="grid sm:grid-cols-2 md:grid-cols-3   lg:grid-cols-4 gap-6">
// //         {tickets.map((ticket) => (
// //           <div
// //             key={ticket.ticketId}
// //             className={`relative bg-white border rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden ${
// //               ticket.isUsed ? "opacity-70 grayscale" : ""
// //             }`}
// //           >
// //             {/* Status badge */}
// //             <div
// //               className={`absolute top-3 right-3 text-xs px-3 py-1 rounded-full font-semibold uppercase tracking-wide ${
// //                 ticket.isUsed
// //                   ? "bg-red-100 text-red-700"
// //                   : "bg-green-100 text-green-700"
// //               }`}
// //             >
// //               {ticket.isUsed ? "Checked In" : "Valid"}
// //             </div>

// //             {/* QR code */}
// //             <div className="p-4 bg-gray-50 flex justify-center items-center">
// //               <img
// //                 src={ticket.qrCode}
// //                 alt="QR Code"
// //                 className="w-40 h-40 object-contain transition-transform duration-300 hover:scale-105"
// //               />
// //             </div>

// //             {/* Ticket info */}
// //             <div className="p-4 border-t border-gray-200">
// //               <h2 className="font-semibold text-lg text-gray-800">
// //                 {ticket.attendeeName}
// //               </h2>
// //               <p className="text-sm text-gray-500 mt-1">
// //                 Seat: <span className="font-medium">{ticket.seatType}</span>{" "}
// //                 {ticket.seatNumber || ""}
// //               </p>
// //               {ticket.checkInTime && (
// //                 <p className="text-xs text-gray-400 mt-2">
// //                   Checked in at: {new Date(ticket.checkInTime).toLocaleString()}
// //                 </p>
// //               )}
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// //update todayy
// // import { useEffect, useState } from "react";
// // import { useParams } from "react-router-dom";
// // import axios from "../services/api";

// // export default function TicketList() {
// //   const { eventId } = useParams();
// //   const [tickets, setTickets] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [emailModal, setEmailModal] = useState({ open: false, ticketId: null });
// //   const [email, setEmail] = useState("");

// //   // ✅ Fetch tickets for the event
// //   useEffect(() => {
// //     const fetchTickets = async () => {
// //       try {
// //         const res = await axios.get(`/tickets/event/${eventId}`);
// //         setTickets(res.data);
// //       } catch (err) {
// //         console.error(err);
// //         alert(err.response?.data?.message || "Failed to fetch tickets");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchTickets();
// //   }, [eventId]);

// //   // ✅ Assign ticket (send to email)
// //   const handleAssign = async () => {
// //     if (!email) return alert("Please enter an email");

// //     try {
// //       const res = await axios.post("/tickets/assign", {
// //         ticketId: emailModal.ticketId,
// //         email,
// //       });
// //       alert(res.data.message || "🎟️ Ticket sent successfully!");
// //       setEmail("");
// //       setEmailModal({ open: false, ticketId: null });
// //     } catch (err) {
// //       console.error(err);
// //       alert(err.response?.data?.message || "Failed to send ticket");
// //     }
// //   };

// //   if (loading)
// //     return (
// //       <div className="flex justify-center items-center h-screen text-lg text-gray-600">
// //         Loading tickets...
// //       </div>
// //     );

// //   if (!tickets.length)
// //     return (
// //       <div className="flex justify-center items-center h-screen text-lg text-gray-600">
// //         No tickets found for this event.
// //       </div>
// //     );

// //   return (
// //     <div className="p-6">
// //       <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">
// //         🎟 Tickets for Event
// //       </h1>

// //       <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
// //         {tickets.map((ticket) => (
// //           <div
// //             key={ticket.ticketId}
// //             className={`relative bg-white border rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden ${
// //               ticket.isUsed ? "opacity-70 grayscale" : ""
// //             }`}
// //           >
// //             {/* ✅ Status badge */}
// //             <div
// //               className={`absolute top-3 right-3 text-xs px-3 py-1 rounded-full font-semibold uppercase tracking-wide ${
// //                 ticket.isUsed
// //                   ? "bg-red-100 text-red-700"
// //                   : "bg-green-100 text-green-700"
// //               }`}
// //             >
// //               {ticket.isUsed ? "Checked In" : "Valid"}
// //             </div>

// //             {/* ✅ QR code */}
// //             <div className="p-4 bg-gray-50 flex justify-center items-center">
// //               <img
// //                 src={ticket.qrCode}
// //                 alt="QR Code"
// //                 className="w-40 h-40 object-contain transition-transform duration-300 hover:scale-105"
// //               />
// //             </div>

// //             {/* ✅ Ticket info */}
// //             <div className="p-4 border-t border-gray-200">
// //               <h2 className="font-semibold text-lg text-gray-800">
// //                 {ticket.attendeeName}
// //               </h2>
// //               <p className="text-sm text-gray-500 mt-1">
// //                 Seat: <span className="font-medium">{ticket.seatType}</span>{" "}
// //                 {ticket.seatNumber || ""}
// //               </p>
// //               {ticket.checkInTime && (
// //                 <p className="text-xs text-gray-400 mt-2">
// //                   Checked in at: {new Date(ticket.checkInTime).toLocaleString()}
// //                 </p>
// //               )}
// //             </div>

// //             {/* ✅ Assign button */}
// //             <div className="p-4 border-t flex justify-center">
// //               <button
// //                 onClick={() =>
// //                   setEmailModal({ open: true, ticketId: ticket.ticketId })
// //                 }
// //                 className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition"
// //               >
// //                 Assign Ticket 🎯
// //               </button>
// //             </div>
// //           </div>
// //         ))}
// //       </div>

// //       {/* ✅ Email Modal */}
// //       {emailModal.open && (
// //         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
// //           <div className="bg-white p-6 rounded-2xl shadow-xl w-96">
// //             <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">
// //               ✉️ Send Ticket to User
// //             </h2>
// //             <input
// //               type="email"
// //               placeholder="Enter user's email"
// //               value={email}
// //               onChange={(e) => setEmail(e.target.value)}
// //               className="w-full border rounded-lg px-3 py-2 mb-4 focus:ring-2 focus:ring-blue-400 outline-none"
// //             />
// //             <div className="flex justify-between">
// //               <button
// //                 onClick={() => setEmailModal({ open: false, ticketId: null })}
// //                 className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
// //               >
// //                 Cancel
// //               </button>
// //               <button
// //                 onClick={handleAssign}
// //                 className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition"
// //               >
// //                 Send Ticket
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // import { useEffect, useState } from "react";
// // import { useParams } from "react-router-dom";
// // import axios from "../services/api";

// // export default function TicketList() {
// //   const { eventId } = useParams();
// //   const [tickets, setTickets] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [emailModal, setEmailModal] = useState({ open: false, ticketId: null });
// //   const [email, setEmail] = useState("");

// //   // ✅ Fetch tickets for the event
// //   const fetchTickets = async () => {
// //     try {
// //       const res = await axios.get(`/tickets/event/${eventId}`);
// //       setTickets(res.data);
// //     } catch (err) {
// //       console.error(err);
// //       alert(err.response?.data?.message || "Failed to fetch tickets");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchTickets();
// //   }, [eventId]);

// //   // ✅ Assign ticket (send to email)
// //   const handleAssign = async () => {
// //     if (!email) return alert("Please enter an email");

// //     try {
// //       const res = await axios.post("/tickets/assign", {
// //         ticketId: emailModal.ticketId,
// //         email,
// //       });

// //       alert(res.data.message || "🎟️ Ticket sent successfully!");
// //       setEmail("");
// //       setEmailModal({ open: false, ticketId: null });

// //       // 🔁 Refresh tickets after assignment
// //       await fetchTickets();
// //     } catch (err) {
// //       console.error(err);
// //       alert(err.response?.data?.message || "Failed to send ticket");
// //     }
// //   };

// //   // ✅ Loading state
// //   if (loading)
// //     return (
// //       <div className="flex justify-center items-center h-screen text-lg text-gray-600">
// //         Loading tickets...
// //       </div>
// //     );

// //   // ✅ Empty state
// //   if (!tickets.length)
// //     return (
// //       <div className="flex justify-center items-center h-screen text-lg text-gray-600">
// //         No tickets found for this event.
// //       </div>
// //     );

// //   // ✅ Main UI
// //   return (
// //     <div className="p-6">
// //       <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">
// //         🎟 Tickets for Event
// //       </h1>

// //       <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
// //         {tickets.map((ticket) => (
// //           <div
// //             key={ticket.ticketId}
// //             className={`relative bg-white border rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden ${
// //               ticket.isUsed ? "opacity-70 grayscale" : ""
// //             }`}
// //           >
// //             {/* ✅ Ticket status badge */}
// //             <div
// //               className={`absolute top-3 right-3 text-xs px-3 py-1 rounded-full font-semibold uppercase tracking-wide ${
// //                 ticket.isUsed
// //                   ? "bg-red-100 text-red-700"
// //                   : "bg-green-100 text-green-700"
// //               }`}
// //             >
// //               {ticket.isUsed ? "Checked In" : "Valid"}
// //             </div>

// //             {/* ✅ QR Code */}
// //             <div className="p-4 bg-gray-50 flex justify-center items-center">
// //               <img
// //                 src={ticket.qrCode}
// //                 alt="QR Code"
// //                 className="w-40 h-40 object-contain transition-transform duration-300 hover:scale-105"
// //               />
// //             </div>

// //             {/* ✅ Ticket Info */}
// //             <div className="p-4 border-t border-gray-200">
// //               <h2 className="font-semibold text-lg text-gray-800">
// //                 {ticket.attendeeName}
// //               </h2>
// //               <p className="text-sm text-gray-500 mt-1">
// //                 Seat: <span className="font-medium">{ticket.seatType}</span>{" "}
// //                 {ticket.seatNumber || ""}
// //               </p>
// //               {ticket.checkInTime && (
// //                 <p className="text-xs text-gray-400 mt-2">
// //                   Checked in at: {new Date(ticket.checkInTime).toLocaleString()}
// //                 </p>
// //               )}

// //               {/* ✅ Assigned user info */}
// //               {ticket.isAssigned && (
// //                 <p className="text-xs text-blue-600 mt-2">
// //                   Assigned to: <strong>{ticket.assignedTo}</strong>
// //                 </p>
// //               )}
// //             </div>

// //             {/* ✅ Assign / Assigned Button */}
// //             <div className="p-4 border-t flex justify-center">
// //               <button
// //                 onClick={() =>
// //                   !ticket.isAssigned &&
// //                   setEmailModal({ open: true, ticketId: ticket.ticketId })
// //                 }
// //                 disabled={ticket.isAssigned}
// //                 className={`px-4 py-2 rounded-lg transition ${
// //                   ticket.isAssigned
// //                     ? "bg-gray-400 text-white cursor-not-allowed"
// //                     : "bg-blue-600 text-white hover:bg-blue-500"
// //                 }`}
// //               >
// //                 {ticket.isAssigned ? "Assigned ✅" : "Assign Ticket 🎯"}
// //               </button>
// //             </div>
// //           </div>
// //         ))}
// //       </div>

// //       {/* ✅ Email Modal */}
// //       {emailModal.open && (
// //         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
// //           <div className="bg-white p-6 rounded-2xl shadow-xl w-96">
// //             <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">
// //               ✉️ Send Ticket to User
// //             </h2>
// //             <input
// //               type="email"
// //               placeholder="Enter user's email"
// //               value={email}
// //               onChange={(e) => setEmail(e.target.value)}
// //               className="w-full border rounded-lg px-3 py-2 mb-4 focus:ring-2 focus:ring-blue-400 outline-none"
// //             />
// //             <div className="flex justify-between">
// //               <button
// //                 onClick={() => setEmailModal({ open: false, ticketId: null })}
// //                 className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
// //               >
// //                 Cancel
// //               </button>
// //               <button
// //                 onClick={handleAssign}
// //                 className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition"
// //               >
// //                 Send Ticket
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "../services/api";

// export default function TicketList() {
//   const { eventId } = useParams();
//   const [tickets, setTickets] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [emailModal, setEmailModal] = useState({ open: false, ticketId: null });
//   const [email, setEmail] = useState("");

//   // ✅ Fetch tickets for the event
//   const fetchTickets = async () => {
//     try {
//       const res = await axios.get(`/tickets/event/${eventId}`);
//       setTickets(res.data);
//     } catch (err) {
//       console.error(err);
//       alert(err.response?.data?.message || "Failed to fetch tickets");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTickets();
//   }, [eventId]);

//   // ✅ Assign ticket (send to email)
//   const handleAssign = async () => {
//     if (!email) return alert("Please enter an email");

//     try {
//       const res = await axios.post("/tickets/assign", {
//         ticketId: emailModal.ticketId,
//         email,
//       });

//       alert(res.data.message || "🎟️ Ticket sent successfully!");
//       setEmail("");
//       setEmailModal({ open: false, ticketId: null });

//       // 🔁 Refresh tickets after assignment
//       await fetchTickets();
//     } catch (err) {
//       console.error(err);
//       alert(err.response?.data?.message || "Failed to send ticket");
//     }
//   };

//   // ✅ Loading state
//   if (loading)
//     return (
//       <div className="flex justify-center items-center h-screen text-lg text-gray-600">
//         Loading tickets...
//       </div>
//     );

//   // ✅ Empty state
//   if (!tickets.length)
//     return (
//       <div className="flex justify-center items-center h-screen text-lg text-gray-600">
//         No tickets found for this event.
//       </div>
//     );

//   // ✅ Main UI
//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">
//         🎟 Tickets for Event
//       </h1>

//       <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {tickets.map((ticket) => (
//           <div
//             key={ticket.ticketId}
//             className={`relative bg-white border rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden ${
//               ticket.isUsed ? "opacity-70 grayscale" : ""
//             }`}
//           >
//             {/* ✅ Ticket status badge */}
//             <div
//               className={`absolute top-3 right-3 text-xs px-3 py-1 rounded-full font-semibold uppercase tracking-wide ${
//                 ticket.isUsed
//                   ? "bg-red-100 text-red-700"
//                   : "bg-green-100 text-green-700"
//               }`}
//             >
//               {ticket.isUsed ? "Checked In" : "Valid"}
//             </div>

//             {/* ✅ QR Code */}
//             <div className="p-4 bg-gray-50 flex justify-center items-center">
//               <img
//                 src={ticket.qrCode}
//                 alt="QR Code"
//                 className="w-40 h-40 object-contain transition-transform duration-300 hover:scale-105"
//               />
//             </div>

//             {/* ✅ Ticket Info */}
//             <div className="p-4 border-t border-gray-200">
//               <h2 className="font-semibold text-lg text-gray-800">
//                 {ticket.attendeeName}
//               </h2>
//               <p className="text-sm text-gray-500 mt-1">
//                 Seat: <span className="font-medium">{ticket.seatType}</span>{" "}
//                 {ticket.seatNumber || ""}
//               </p>
//               {ticket.checkInTime && (
//                 <p className="text-xs text-gray-400 mt-2">
//                   Checked in at: {new Date(ticket.checkInTime).toLocaleString()}
//                 </p>
//               )}

//               {/* ✅ Assigned user info */}
//               {ticket.isAssigned && (
//                 <p className="text-xs text-blue-600 mt-2">
//                   Assigned to: <strong>{ticket.assignedTo}</strong>
//                 </p>
//               )}
//             </div>

//             {/* ✅ Assign / Assigned Button */}
//             <div className="p-4 border-t flex justify-center">
//               <button
//                 onClick={() =>
//                   !ticket.isAssigned &&
//                   setEmailModal({ open: true, ticketId: ticket.ticketId })
//                 }
//                 disabled={ticket.isAssigned}
//                 className={`px-4 py-2 rounded-lg transition ${
//                   ticket.isAssigned
//                     ? "bg-gray-400 text-white cursor-not-allowed"
//                     : "bg-blue-600 text-white hover:bg-blue-500"
//                 }`}
//               >
//                 {ticket.isAssigned ? "Assigned ✅" : "Assign Ticket 🎯"}
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* ✅ Email Modal */}
//       {emailModal.open && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-2xl shadow-xl w-96">
//             <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">
//               ✉️ Send Ticket to User
//             </h2>
//             <input
//               type="email"
//               placeholder="Enter user's email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full border rounded-lg px-3 py-2 mb-4 focus:ring-2 focus:ring-blue-400 outline-none"
//             />
//             <div className="flex justify-between">
//               <button
//                 onClick={() => setEmailModal({ open: false, ticketId: null })}
//                 className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleAssign}
//                 className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition"
//               >
//                 Send Ticket
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../services/api";

export default function TicketList() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [emailModal, setEmailModal] = useState({ open: false, ticketId: null });
  const [email, setEmail] = useState("");

  // ✅ Fetch tickets for the event
  const fetchTickets = async () => {
    try {
      const res = await axios.get(`/tickets/event/${eventId}`);
      setTickets(res.data);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to fetch tickets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [eventId]);

  // ✅ Assign ticket (send to email)
  const handleAssign = async () => {
    if (!email) return alert("Please enter an email");

    try {
      const res = await axios.post("/tickets/assign", {
        ticketId: emailModal.ticketId,
        email,
      });

      alert(res.data.message || "🎟️ Ticket sent successfully!");
      setEmail("");
      setEmailModal({ open: false, ticketId: null });

      // 🔁 Refresh tickets after assignment
      await fetchTickets();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to send ticket");
    }
  };

  // ✅ Navigate to Scan QR page
  const handleScanQR = () => {
    navigate(`/scan-qr?eventId=${eventId}`);
  };

  // ✅ Loading state
  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-lg text-gray-600">
        Loading tickets...
      </div>
    );

  // ✅ Empty state
  if (!tickets.length)
    return (
      <div className="flex justify-center items-center h-screen text-lg text-gray-600">
        No tickets found for this event.
      </div>
    );

  // ✅ Main UI
  return (
    <div className="p-6">
      {/* Header Section with Scan QR button */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">🎟 Tickets for Event</h1>
        <button
          onClick={handleScanQR}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-500 transition font-medium shadow-md"
        >
          🔍 Scan QR
        </button>
      </div>

      {/* Tickets Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {tickets.map((ticket) => (
          <div
            key={ticket.ticketId}
            className={`relative bg-white border rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden ${
              ticket.isUsed ? "opacity-70 grayscale" : ""
            }`}
          >
            {/* ✅ Ticket status badge */}
            <div
              className={`absolute top-3 right-3 text-xs px-3 py-1 rounded-full font-semibold uppercase tracking-wide ${
                ticket.isUsed
                  ? "bg-red-100 text-red-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {ticket.isUsed ? "Checked In" : "Valid"}
            </div>

            {/* ✅ QR Code */}
            <div className="p-4 bg-gray-50 flex justify-center items-center">
              <img
                src={ticket.qrCode}
                alt="QR Code"
                className="w-40 h-40 object-contain transition-transform duration-300 hover:scale-105"
              />
            </div>

            {/* ✅ Ticket Info */}
            <div className="p-4 border-t border-gray-200">
              <h2 className="font-semibold text-lg text-gray-800">
                {ticket.attendeeName}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Seat: <span className="font-medium">{ticket.seatType}</span>{" "}
                {ticket.seatNumber || ""}
              </p>
              {ticket.checkInTime && (
                <p className="text-xs text-gray-400 mt-2">
                  Checked in at: {new Date(ticket.checkInTime).toLocaleString()}
                </p>
              )}

              {/* ✅ Assigned user info */}
              {ticket.isAssigned && (
                <p className="text-xs text-blue-600 mt-2">
                  Assigned to: <strong>{ticket.assignedTo}</strong>
                </p>
              )}
            </div>

            {/* ✅ Assign / Assigned Button */}
            <div className="p-4 border-t flex justify-center">
              <button
                onClick={() =>
                  !ticket.isAssigned &&
                  setEmailModal({ open: true, ticketId: ticket.ticketId })
                }
                disabled={ticket.isAssigned}
                className={`px-4 py-2 rounded-lg transition ${
                  ticket.isAssigned
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-500"
                }`}
              >
                {ticket.isAssigned ? "Assigned ✅" : "Assign Ticket 🎯"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Email Modal */}
      {emailModal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-96">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">
              ✉️ Send Ticket to User
            </h2>
            <input
              type="email"
              placeholder="Enter user's email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 mb-4 focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <div className="flex justify-between">
              <button
                onClick={() => setEmailModal({ open: false, ticketId: null })}
                className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAssign}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition"
              >
                Send Ticket
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


