
// import { useEffect, useState } from "react";
// import { Html5QrcodeScanner } from "html5-qrcode";
// import axios from "../services/api";

// export default function ScanQR() {
//   const [events, setEvents] = useState([]);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [message, setMessage] = useState("");
//   const [status, setStatus] = useState("idle");

//   // Fetch all events
//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const res = await axios.get("/events");
//         setEvents(res.data);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchEvents();
//   }, []);

//   //  Initialize scanner
//   useEffect(() => {
//     if (!selectedEvent) return;

//     const qrBoxSize = window.innerWidth < 640 ? 250 : 400;
//     const scanner = new Html5QrcodeScanner(
//       "reader",
//       { fps: 10, qrbox: qrBoxSize },
//       false
//     );

//     setStatus("scanning");

//     scanner.render(
//       async (decodedText) => {
//         if (status === "loading") return;
//         setStatus("loading");
//         setMessage("");

//         try {
//           const res = await axios.post("/tickets/checkin", {
//             ticketId: decodedText,
//             eventId: selectedEvent._id,
//           });

//           setMessage(`✅ Verified: ${res.data.ticket.attendeeName}`);
//           setStatus("success");
//         } catch (err) {
//           setMessage(` ${err.response?.data?.message || "Check-in failed"}`);
//           setStatus("error");
//         }

//         // Reset back to scanning after a short delay
//         setTimeout(() => setStatus("scanning"), 1500);
//       },
//       (error) => console.warn(error)
//     );

  
//     setTimeout(() => {
//       const customizeButtons = () => {
//         const buttons = document.querySelectorAll(
//           "#reader button, #reader span#html5-qrcode-anchor-scan-type-change"
//         );

//         buttons.forEach((btn) => {
//           btn.classList.add(
//             "bg-purple-600",
//             "hover:bg-purple-500",
//             "text-white",
//             "px-4",
//             "py-2",
//             "rounded-lg",
//             "transition",
//             "mt-2",
//             "mx-1",
//             "font-medium",
//             "inline-block"
//           );
//         });

//         // remove underline from anchor-like text
//         const spans = document.querySelectorAll(
//           "#reader span#html5-qrcode-anchor-scan-type-change"
//         );
//         spans.forEach((span) => {
//           span.style.textDecoration = "none";
//           span.style.cursor = "pointer";
//         });
//       };

//       customizeButtons();
//       // Reapply in case buttons re-render
//       const observer = new MutationObserver(customizeButtons);
//       observer.observe(document.getElementById("reader"), {
//         childList: true,
//         subtree: true,
//       });
//     }, 500);

//     return () => scanner.clear().catch(() => {});
//   }, [selectedEvent]);

//   return (
//     <div className="min-h-screen bg-gray-950 text-white p-6">
//       {!selectedEvent ? (
//         <>
//           <h1 className="text-3xl font-bold text-purple-400 mb-8 text-center">
//             Select Event to Scan QR
//           </h1>

//           <div className="grid   grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {events.map((event) => (
//               <div
//                 key={event._id}
//                 className="bg-gray-900 text-white shadow-lg rounded-2xl p-6 border border-gray-800 hover:border-purple-500 hover:shadow-purple-500/30 hover:-translate-y-1 transition transform duration-300"
//               >
//                 <h2 className="text-xl font-semibold">{event.name}</h2>
//                 <p className="text-sm text-gray-400 mt-1">
//                   {new Date(event.date).toLocaleString()}
//                 </p>
//                 <p className="text-sm text-gray-500">{event.venue}</p>

//                 <button
//                   onClick={() => setSelectedEvent(event)}
//                   className="mt-4 w-full bg-gray-700 hover:bg-purple-500 text-white py-2 rounded-lg font-semibold transition transform hover:scale-105"
//                 >
//                   Start Scanning
//                 </button>
//               </div>
//             ))}
//           </div>
//         </>
//       ) : (
//         <div className="flex flex-col items-center justify-center relative">
//           <h1 className="text-2xl font-bold text-purple-400 mb-6">
//             Scanning for: {selectedEvent.name}
//           </h1>

//           {/* QR Scanner Box */}
//           <div className="relative  bg-white m-4 w-[90vw] max-w-[500px] h-[70vw] max-h-[500px] border-4 border-purple-500 rounded-xl shadow-purple-500/30 shadow-lg overflow-hidden">
//             <div id="reader" className="absolute inset-0"></div>

//             {/* Message Overlay */}
//             {status !== "scanning" && (
//               <div
//                 className={`absolute inset-0 flex items-center justify-center text-center font-semibold text-lg rounded-xl transition-opacity duration-300 backdrop-blur-sm ${
//                   status === "success"
//                     ? "bg-green-900/70 text-green-200 border border-green-500"
//                     : status === "error"
//                     ? "bg-red-900/70 text-red-200 border border-red-500"
//                     : "bg-transparent"
//                 }`}
//               >
//                 {message}
//               </div>
//             )}
//           </div>

//           {/* Back button */}
//           <button
//             onClick={() => setSelectedEvent(null)}
//             className="mt-2 bg-purple-600 hover:bg-purple-500 text-white px-6 py-2 rounded-lg transition"
//           >
//             Back to Events
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// // import { useEffect, useState } from "react";
// // import { Html5QrcodeScanner } from "html5-qrcode";
// // import axios from "../services/api";

// // export default function ScanQR() {
// //   const [events, setEvents] = useState([]);
// //   const [selectedEvent, setSelectedEvent] = useState(null);
// //   const [message, setMessage] = useState("");
// //   const [status, setStatus] = useState("idle");

// //   // Fetch all events
// //   useEffect(() => {
// //     const fetchEvents = async () => {
// //       try {
// //         const res = await axios.get("/events");
// //         setEvents(res.data);
// //       } catch (err) {
// //         console.error(err);
// //       }
// //     };
// //     fetchEvents();
// //   }, []);

// //   //  Initialize scanner
// //   useEffect(() => {
// //     if (!selectedEvent) return;

// //     const qrBoxSize = window.innerWidth < 640 ? 250 : 400;
// //     const scanner = new Html5QrcodeScanner(
// //       "reader",
// //       { fps: 10, qrbox: qrBoxSize },
// //       false
// //     );

// //     setStatus("scanning");

// //     scanner.render(
// //       async (decodedText) => {
// //         if (status === "loading") return;
// //         setStatus("loading");
// //         setMessage("");

// //         try {
// //           const res = await axios.post("/tickets/checkin", {
// //             ticketId: decodedText,
// //             eventId: selectedEvent._id,
// //           });

// //           setMessage(`✅ Verified: ${res.data.ticket.attendeeName}`);
// //           setStatus("success");
// //         } catch (err) {
// //           setMessage(` ${err.response?.data?.message || "Check-in failed"}`);
// //           setStatus("error");
// //         }

// //         // Reset back to scanning after a short delay
// //         setTimeout(() => setStatus("scanning"), 1500);
// //       },
// //       (error) => console.warn(error)
// //     );

  
// //     setTimeout(() => {
// //       const customizeButtons = () => {
// //         const buttons = document.querySelectorAll(
// //           "#reader button, #reader span#html5-qrcode-anchor-scan-type-change"
// //         );

// //         buttons.forEach((btn) => {
// //           btn.classList.add(
// //             "bg-purple-600",
// //             "hover:bg-purple-500",
// //             "text-white",
// //             "px-4",
// //             "py-2",
// //             "rounded-lg",
// //             "transition",
// //             "mt-2",
// //             "mx-1",
// //             "font-medium",
// //             "inline-block"
// //           );
// //         });

// //         // remove underline from anchor-like text
// //         const spans = document.querySelectorAll(
// //           "#reader span#html5-qrcode-anchor-scan-type-change"
// //         );
// //         spans.forEach((span) => {
// //           span.style.textDecoration = "none";
// //           span.style.cursor = "pointer";
// //         });
// //       };

// //       customizeButtons();
// //       // Reapply in case buttons re-render
// //       const observer = new MutationObserver(customizeButtons);
// //       observer.observe(document.getElementById("reader"), {
// //         childList: true,
// //         subtree: true,
// //       });
// //     }, 500);

// //     return () => scanner.clear().catch(() => {});
// //   }, [selectedEvent]);

// //   return (
// //     <div className="min-h-screen bg-gray-950 text-white p-6">
// //       {!selectedEvent ? (
// //         <>
// //           <h1 className="text-3xl font-bold text-purple-400 mb-8 text-center">
// //             Select Event to Scan QR
// //           </h1>

// //           <div className="grid   grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //             {events.map((event) => (
// //               <div
// //                 key={event._id}
// //                 className="bg-gray-900 text-white shadow-lg rounded-2xl p-6 border border-gray-800 hover:border-purple-500 hover:shadow-purple-500/30 hover:-translate-y-1 transition transform duration-300"
// //               >
// //                 <h2 className="text-xl font-semibold">{event.name}</h2>
// //                 <p className="text-sm text-gray-400 mt-1">
// //                   {new Date(event.date).toLocaleString()}
// //                 </p>
// //                 <p className="text-sm text-gray-500">{event.venue}</p>

// //                 <button
// //                   onClick={() => setSelectedEvent(event)}
// //                   className="mt-4 w-full bg-gray-700 hover:bg-purple-500 text-white py-2 rounded-lg font-semibold transition transform hover:scale-105"
// //                 >
// //                   Start Scanning
// //                 </button>
// //               </div>
// //             ))}
// //           </div>
// //         </>
// //       ) : (
// //         <div className="flex flex-col items-center justify-center relative">
// //           <h1 className="text-2xl font-bold text-purple-400 mb-6">
// //             Scanning for: {selectedEvent.name}
// //           </h1>

// //           {/* QR Scanner Box */}
// //           <div className="relative  bg-white m-4 w-[90vw] max-w-[500px] h-[70vw] max-h-[500px] border-4 border-purple-500 rounded-xl shadow-purple-500/30 shadow-lg overflow-hidden">
// //             <div id="reader" className="absolute inset-0"></div>

// //             {/* Message Overlay */}
// //             {status !== "scanning" && (
// //               <div
// //                 className={`absolute inset-0 flex items-center justify-center text-center font-semibold text-lg rounded-xl transition-opacity duration-300 backdrop-blur-sm ${
// //                   status === "success"
// //                     ? "bg-green-900/70 text-green-200 border border-green-500"
// //                     : status === "error"
// //                     ? "bg-red-900/70 text-red-200 border border-red-500"
// //                     : "bg-transparent"
// //                 }`}
// //               >
// //                 {message}
// //               </div>
// //             )}
// //           </div>

// //           {/* Back button */}
// //           <button
// //             onClick={() => setSelectedEvent(null)}
// //             className="mt-2 bg-purple-600 hover:bg-purple-500 text-white px-6 py-2 rounded-lg transition"
// //           >
// //             Back to Events
// //           </button>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// import { useEffect, useState } from "react";
// import { Html5QrcodeScanner } from "html5-qrcode";
// import axios from "../services/api";

// export default function ScanQR() {
//   const [events, setEvents] = useState([]);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [message, setMessage] = useState("");
//   const [status, setStatus] = useState("idle");

//   // Fetch all events
//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const res = await axios.get("/events");
//         setEvents(res.data);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchEvents();
//   }, []);

//   // Initialize scanner
//   useEffect(() => {
//     if (!selectedEvent) return;

//     const qrBoxSize = window.innerWidth < 640 ? 250 : 400;
//     const scanner = new Html5QrcodeScanner(
//       "reader",
//       { fps: 10, qrbox: qrBoxSize },
//       false
//     );

//     setStatus("scanning");

//     scanner.render(
//       async (decodedText) => {
//         if (status === "loading") return;
//         setStatus("loading");
//         setMessage("");

//         try {
//           const res = await axios.post("/tickets/checkin", {
//             ticketId: decodedText,
//             eventId: selectedEvent._id,
//           });

//           setMessage(`✅ Verified: ${res.data.ticket.attendeeName}`);
//           setStatus("success");
//         } catch (err) {
//           setMessage(`❌ ${err.response?.data?.message || "Check-in failed"}`);
//           setStatus("error");
//         }

//         // Pause for 3 seconds before scanning next QR
//         setTimeout(() => {
//           setMessage("");
//           setStatus("scanning");
//         }, 3000);
//       },
//       (error) => console.warn(error)
//     );

//     // Custom styling for buttons inside scanner
//     setTimeout(() => {
//       const customizeButtons = () => {
//         const buttons = document.querySelectorAll(
//           "#reader button, #reader span#html5-qrcode-anchor-scan-type-change"
//         );

//         buttons.forEach((btn) => {
//           btn.classList.add(
//             "bg-purple-600",
//             "hover:bg-purple-500",
//             "text-white",
//             "px-4",
//             "py-2",
//             "rounded-lg",
//             "transition",
//             "mt-2",
//             "mx-1",
//             "font-medium",
//             "inline-block"
//           );
//         });

//         // remove underline from anchor-like text
//         const spans = document.querySelectorAll(
//           "#reader span#html5-qrcode-anchor-scan-type-change"
//         );
//         spans.forEach((span) => {
//           span.style.textDecoration = "none";
//           span.style.cursor = "pointer";
//         });
//       };

//       customizeButtons();
//       const observer = new MutationObserver(customizeButtons);
//       observer.observe(document.getElementById("reader"), {
//         childList: true,
//         subtree: true,
//       });
//     }, 500);

//     return () => scanner.clear().catch(() => {});
//   }, [selectedEvent]);

//   return (
//     <div className="min-h-screen bg-gray-950 text-white p-6">
//       {!selectedEvent ? (
//         <>
//           <h1 className="text-3xl font-bold text-purple-400 mb-8 text-center">
//             Select Event to Scan QR
//           </h1>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {events.map((event) => (
//               <div
//                 key={event._id}
//                 className="bg-gray-900 text-white shadow-lg rounded-2xl p-6 border border-gray-800 hover:border-purple-500 hover:shadow-purple-500/30 hover:-translate-y-1 transition transform duration-300"
//               >
//                 <h2 className="text-xl font-semibold">{event.name}</h2>
//                 <p className="text-sm text-gray-400 mt-1">
//                   {new Date(event.date).toLocaleString()}
//                 </p>
//                 <p className="text-sm text-gray-500">{event.venue}</p>

//                 <button
//                   onClick={() => setSelectedEvent(event)}
//                   className="mt-4 w-full bg-gray-700 hover:bg-purple-500 text-white py-2 rounded-lg font-semibold transition transform hover:scale-105"
//                 >
//                   Start Scanning
//                 </button>
//               </div>
//             ))}
//           </div>
//         </>
//       ) : (
//         <div className="flex flex-col items-center justify-center relative">
//           <h1 className="text-2xl font-bold text-purple-400 mb-6">
//             Scanning for: {selectedEvent.name}
//           </h1>

//           {/* QR Scanner Box */}
//           <div className="relative bg-white m-4 w-[90vw] max-w-[500px] h-[70vw] max-h-[500px] border-4 border-purple-500 rounded-xl shadow-purple-500/30 shadow-lg overflow-hidden">
//             <div
//               id="reader"
//               className={`absolute inset-0 transition-all duration-300 ${
//                 status !== "scanning" ? "blur-sm brightness-50" : ""
//               }`}
//             ></div>

//             {/* Message Overlay */}
//             {status !== "scanning" && (
//               <div
//                 className={`absolute inset-0 flex items-center justify-center text-center font-semibold text-lg rounded-xl transition-opacity duration-300 backdrop-blur-md ${
//                   status === "success"
//                     ? "bg-green-900/70 text-green-200 border border-green-500"
//                     : status === "error"
//                     ? "bg-red-900/70 text-red-200 border border-red-500"
//                     : "bg-transparent"
//                 }`}
//               >
//                 {message || "Processing..."}
//               </div>
//             )}
//           </div>

//           {/* Back button */}
//           <button
//             onClick={() => setSelectedEvent(null)}
//             className="mt-2 bg-purple-600 hover:bg-purple-500 text-white px-6 py-2 rounded-lg transition"
//           >
//             Back to Events
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }
import { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import axios from "../services/api";

export default function ScanQR() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle");
  const lastScanned = useRef(""); // 🟢 store last QR to avoid duplicate triggers

  // Fetch all events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("/events");
        setEvents(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchEvents();
  }, []);

  // Initialize scanner
  useEffect(() => {
    if (!selectedEvent) return;

    const qrBoxSize = window.innerWidth < 640 ? 250 : 400;
    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: qrBoxSize },
      false
    );

    setStatus("scanning");

    scanner.render(
      async (decodedText) => {
        // 🛑 Prevent duplicate scan if it's same QR within 3 seconds
        if (status === "loading" || decodedText === lastScanned.current) return;
        lastScanned.current = decodedText;
        setStatus("loading");
        setMessage("");

        try {
          const res = await axios.post("/tickets/checkin", {
            ticketId: decodedText,
            eventId: selectedEvent._id,
          });

          setMessage(`✅ Verified: ${res.data.ticket.attendeeName}`);
          setStatus("success");
        } catch (err) {
          setMessage(`❌ ${err.response?.data?.message || "Check-in failed"}`);
          setStatus("error");
        }

        // Wait 3 seconds before scanning next QR
        setTimeout(() => {
          lastScanned.current = ""; // allow new scan
          setMessage("");
          setStatus("scanning");
        }, 3000);
      },
      (error) => console.warn(error)
    );

    // Customize scanner buttons
    setTimeout(() => {
      const customizeButtons = () => {
        const buttons = document.querySelectorAll(
          "#reader button, #reader span#html5-qrcode-anchor-scan-type-change"
        );

        buttons.forEach((btn) => {
          btn.classList.add(
            "bg-purple-600",
            "hover:bg-purple-500",
            "text-white",
            "px-4",
            "py-2",
            "rounded-lg",
            "transition",
            "mt-2",
            "mx-1",
            "font-medium",
            "inline-block"
          );
        });

        const spans = document.querySelectorAll(
          "#reader span#html5-qrcode-anchor-scan-type-change"
        );
        spans.forEach((span) => {
          span.style.textDecoration = "none";
          span.style.cursor = "pointer";
        });
      };

      customizeButtons();
      const observer = new MutationObserver(customizeButtons);
      observer.observe(document.getElementById("reader"), {
        childList: true,
        subtree: true,
      });
    }, 500);

    return () => scanner.clear().catch(() => {});
  }, [selectedEvent]);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      {!selectedEvent ? (
        <>
          <h1 className="text-3xl font-bold text-purple-400 mb-8 text-center">
            Select Event to Scan QR
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div
                key={event._id}
                className="bg-gray-900 text-white shadow-lg rounded-2xl p-6 border border-gray-800 hover:border-purple-500 hover:shadow-purple-500/30 hover:-translate-y-1 transition transform duration-300"
              >
                <h2 className="text-xl font-semibold">{event.name}</h2>
                <p className="text-sm text-gray-400 mt-1">
                  {new Date(event.date).toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">{event.venue}</p>

                <button
                  onClick={() => setSelectedEvent(event)}
                  className="mt-4 w-full bg-gray-700 hover:bg-purple-500 text-white py-2 rounded-lg font-semibold transition transform hover:scale-105"
                >
                  Start Scanning
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center relative">
          <h1 className="text-2xl font-bold text-purple-400 mb-6">
            Scanning for: {selectedEvent.name}
          </h1>

          {/* QR Scanner Box */}
          <div className="relative bg-white m-4 w-[90vw] max-w-[500px] h-[70vw] max-h-[500px] border-4 border-purple-500 rounded-xl shadow-purple-500/30 shadow-lg overflow-hidden">
            <div
              id="reader"
              className={`absolute inset-0 transition-all duration-300 ${
                status !== "scanning" ? "blur-sm brightness-50" : ""
              }`}
            ></div>

            {/* Message Overlay */}
            {status !== "scanning" && (
              <div
                className={`absolute inset-0 flex items-center justify-center text-center font-semibold text-lg rounded-xl transition-opacity duration-300 backdrop-blur-md ${
                  status === "success"
                    ? "bg-green-900/70 text-green-200 border border-green-500"
                    : status === "error"
                    ? "bg-red-900/70 text-red-200 border border-red-500"
                    : "bg-transparent"
                }`}
              >
                {message || "Processing..."}
              </div>
            )}
          </div>

          {/* Back button */}
          <button
            onClick={() => setSelectedEvent(null)}
            className="mt-2 bg-purple-600 hover:bg-purple-500 text-white px-6 py-2 rounded-lg transition"
          >
            Back to Events
          </button>
        </div>
      )}
    </div>
  );
}
