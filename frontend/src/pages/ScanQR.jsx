
import { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import axios from "../services/api";

export default function ScanQR() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle");
  const [summary, setSummary] = useState({ total: 0, checkedIn: 0 });
  const lastScanned = useRef("");

  // Fetch all events
  useEffect(() => {
    (async () => {
      try { const res = await axios.get("/events");
        setEvents(res.data);
      } catch (err) { console.error(err);
      } })();
  }, []);

  // Fetch attendance summary for selected event
  const fetchSummary = async (eventId) => {
    try { const res = await axios.get(`/events/${eventId}/summary`);
      setSummary({  total: res.data.totalTickets, checkedIn: res.data.checkedInCount,});
    } catch (err) { console.error("Summary fetch error", err); }
  };

  // Initialize scanner
  useEffect(() => { if (!selectedEvent) return;
                 fetchSummary(selectedEvent._id);
       const qrBoxSize = window.innerWidth < 640 ? 250 : 400;
     const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: qrBoxSize },
      false
    ); setStatus("scanning");

    scanner.render(
      async (decodedText) => {
        if (status === "loading" || decodedText === lastScanned.current) return;

        lastScanned.current = decodedText;
        setStatus("loading");
        setMessage("");

        try {  const res = await axios.post("/tickets/checkin", {
            ticketId: decodedText, eventId: selectedEvent._id,
          });

          setMessage(`✅ Verified: ${res.data.ticket.attendeeName}`);
          setStatus("success");

          //  refresh attendance count after successful scan
          fetchSummary(selectedEvent._id);
        } catch (err) { setMessage(`❌ ${err.response?.data?.message || "Check-in failed"}`);
          setStatus("error");}

        setTimeout(() => {   lastScanned.current = "";
          setMessage("");
          setStatus("scanning");
        }, 3000);
      },  (error) => console.warn(error)
    );

    return () => scanner.clear().catch(() => {});
  }, [selectedEvent]);

  return (
    <div className="min-h-screen bg-[url('/dashboardbg.png')] bg-cover bg-center bg-no-repeat bg-gray-950 text-white p-6">
      {!selectedEvent ? (
        <> <h1 className="text-3xl font-bold text-purple-400 mb-8 text-center">
            Select Event to Scan QR
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div key={event._id}
                className="bg-gray-900 shadow-lg rounded-2xl p-6 border border-gray-800 hover:border-purple-500 hover:shadow-purple-500/30 transition"
              >
                <h2 className="text-xl font-semibold">{event.name}</h2>
                <p className="text-sm text-gray-400">
                  {new Date(event.date).toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">{event.venue}</p>

                <button  onClick={() => setSelectedEvent(event)}
                  className="mt-4 w-full bg-gray-700 hover:bg-purple-500 py-2 rounded-lg font-semibold transition"
                >
                  Start Scanning
                </button>
              </div>
            ))}
          </div>
        </>
      ) : ( <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold text-purple-400 mb-2">
            Scanning for: {selectedEvent.name}
          </h1>

          {/*  Attendance Summary */}
          <div className="mb-4 text-sm text-gray-300">
            Attendance:{" "}
            <span className="text-green-400 font-semibold">
              {summary.checkedIn}
            </span>{" "}
            / {summary.total}
          </div>

          {/* Scanner */}
          <div className="relative bg-white m-4 w-[90vw] max-w-[500px] h-[70vw] max-h-[500px] border-4 border-purple-500 rounded-xl overflow-hidden">
            <div  id="reader"
              className={`absolute inset-0 ${
                status !== "scanning" ? "blur-sm brightness-50" : ""
              }`}
            ></div>

            {status !== "scanning" && (
              <div className={`absolute inset-0 flex items-center justify-center font-semibold text-lg backdrop-blur-md ${
                  status === "success"
                    ? "bg-green-900/70 text-green-200"
                    : "bg-red-900/70 text-red-200"
                }`}
              > {message || "Processing..."}
              </div>
            )}
          </div>

          <button onClick={() => setSelectedEvent(null)}
            className="mt-2 bg-purple-600 hover:bg-purple-500 px-6 py-2 rounded-lg transition"
          >
            Back to Events
          </button>
        </div>
      )}
    </div>
  );
}
