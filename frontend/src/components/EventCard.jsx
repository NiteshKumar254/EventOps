
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Calendar, Clock, Ticket, MapPin, BarChart3, QrCode, X } from "lucide-react";

// export default function EventCard({ event }) {
//   const navigate = useNavigate();
//   const [open, setOpen] = useState(false);

//   // handle card click but ignore button clicks
//   const handleCardClick = (e) => {
//     if (e.target.closest("button")) return; // ignore if a button is clicked
//     setOpen(true);
//   };

//   return (
//     <>
//       {/* Event Card */}
//       <div
//         onClick={handleCardClick}
//         className="bg-gray-1200 shadow-lg rounded-2xl overflow-hidden border border-gray-500 hover:shadow-2xl transition-all duration-300 cursor-pointer"
//       >
//         <div className="p-4 text-white">
//           <h2 className="text-2xl font-semibold">{event.name}</h2>
//           <p className="text-sm opacity-90 flex items-center gap-2 flex-wrap">
//             <Calendar size={16} />
//             {new Date(event.date).toLocaleDateString()} •
//             <Clock size={16} />
//             {new Date(event.date).toLocaleTimeString([], {
//               hour: "2-digit",
//               minute: "2-digit",
//             })}
//           </p>
//         </div>

//         <div className="p-4">
//           <p className="text-gray-900 mb-3 line-clamp-2">{event.description}</p>

//           <div className="flex justify-between items-center text-sm text-white">
//             <span className="flex items-center gap-1">
//               <Ticket size={16} />
//               Total Tickets: {event.totalSeats}
//             </span>
//             <span className="flex items-center gap-1">
//               <MapPin size={16} />
//               {event.venue}
//             </span>
//           </div>

//           {/* Two main buttons (always visible) */}
//           <div className="mt-4 flex gap-3">
//             <button
//               onClick={() => navigate(`/attendance/${event._id}`)}
//               className="flex-1 flex items-center justify-center gap-2 bg-gray-700 text-white py-2 rounded-lg hover:bg-blue-500 transition"
//             >
//               <BarChart3 size={18} /> Attendance
//             </button>

//             <button
//               onClick={() => navigate(`/tickets/${event._id}`)}
//               className="flex-1 flex items-center justify-center gap-2 bg-gray-700 text-white py-2 rounded-lg hover:bg-blue-500 transition"
//             >
//               <Ticket size={18} /> View Tickets
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Modal opens when card (outside buttons) is clicked */}
//       {open && (
//         <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
//           <div className="bg-gray-900 text-white rounded-2xl shadow-2xl p-6 w-[90%] sm:w-[450px] relative border border-gray-600">
//             <button
//               onClick={() => setOpen(false)}
//               className="absolute top-3 right-3 text-gray-400 hover:text-white"
//             >
//               <X size={22} />
//             </button>

//             <h2 className="text-2xl font-semibold mb-1">{event.name}</h2>
//             <p className="text-sm text-gray-400 mb-4 flex items-center gap-2 flex-wrap">
//               <Calendar size={16} />
//               {new Date(event.date).toLocaleDateString()} •
//               <Clock size={16} />
//               {new Date(event.date).toLocaleTimeString([], {
//                 hour: "2-digit",
//                 minute: "2-digit",
//               })}
//             </p>

//             <p className="text-gray-300 mb-4">{event.venue}</p>

//             <div className="flex flex-col gap-3">
//               <button
//                 onClick={() => {
//                   setOpen(false);
//                   navigate(`/attendance/${event._id}`);
//                 }}
//                 className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 py-2 rounded-lg transition"
//               >
//                 <BarChart3 size={18} /> Attendance
//               </button>

//               <button
//                 onClick={() => {
//                   setOpen(false);
//                   navigate(`/tickets/${event._id}`);
//                 }}
//                 className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 py-2 rounded-lg transition"
//               >
//                 <Ticket size={18} /> View Tickets
//               </button>

//               <button
//                 onClick={() => {
//                   setOpen(false);
//                   navigate("/scanqr", { state: { event } });
//                 }}
//                 className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 py-2 rounded-lg transition"
//               >
//                 <QrCode size={18} /> Scan QR
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Clock,
  Ticket,
  MapPin,
  BarChart3,
  QrCode,
  X,
  Trash2,
} from "lucide-react";

export default function EventCard({ event, onDelete }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  // handle card click but ignore button clicks
  const handleCardClick = (e) => {
    if (e.target.closest("button")) return;
    setOpen(true);
  };

  const handleDelete = () => {
    if (!onDelete) return;
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    onDelete(event._id);
  };

  return (
    <>
      {/* Event Card */}
      <div
        onClick={handleCardClick}
        className="bg-gray-1200 shadow-lg rounded-2xl overflow-hidden border border-gray-500 hover:shadow-2xl transition-all duration-300 cursor-pointer"
      >
        <div className="p-4 text-white flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-semibold">{event.name}</h2>
            <p className="text-sm opacity-90 flex items-center gap-2 flex-wrap">
              <Calendar size={16} />
              {new Date(event.date).toLocaleDateString()} •
              <Clock size={16} />
              {new Date(event.date).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>

          {/* Delete Button */}
          <button
            onClick={handleDelete}
            className="text-red-400 hover:text-red-500 transition"
            title="Delete Event"
          >
            <Trash2 size={18} />
          </button>
        </div>

        <div className="p-4">
          <p className="text-gray-900 mb-3 line-clamp-2">
            {event.description || "No description"}
          </p>

          <div className="flex justify-between items-center text-sm text-white">
            <span className="flex items-center gap-1">
              <Ticket size={16} />
              Total Tickets: {event.totalSeats}
            </span>
            <span className="flex items-center gap-1">
              <MapPin size={16} />
              {event.venue}
            </span>
          </div>

          {/* Action buttons */}
          <div className="mt-4 flex gap-3">
            <button
              onClick={() => navigate(`/attendance/${event._id}`)}
              className="flex-1 flex items-center justify-center gap-2 bg-gray-700 text-white py-2 rounded-lg hover:bg-blue-500 transition"
            >
              <BarChart3 size={18} /> Attendance
            </button>

            <button
              onClick={() => navigate(`/tickets/${event._id}`)}
              className="flex-1 flex items-center justify-center gap-2 bg-gray-700 text-white py-2 rounded-lg hover:bg-blue-500 transition"
            >
              <Ticket size={18} /> View Tickets
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900 text-white rounded-2xl shadow-2xl p-6 w-[90%] sm:w-[450px] relative border border-gray-600">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
            >
              <X size={22} />
            </button>

            <h2 className="text-2xl font-semibold mb-1">{event.name}</h2>
            <p className="text-sm text-gray-400 mb-4 flex items-center gap-2 flex-wrap">
              <Calendar size={16} />
              {new Date(event.date).toLocaleDateString()} •
              <Clock size={16} />
              {new Date(event.date).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>

            <p className="text-gray-300 mb-4">{event.venue}</p>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  setOpen(false);
                  navigate(`/attendance/${event._id}`);
                }}
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 py-2 rounded-lg transition"
              >
                <BarChart3 size={18} /> Attendance
              </button>

              <button
                onClick={() => {
                  setOpen(false);
                  navigate(`/tickets/${event._id}`);
                }}
                className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 py-2 rounded-lg transition"
              >
                <Ticket size={18} /> View Tickets
              </button>

              <button
                onClick={() => {
                  setOpen(false);
                  navigate("/scanqr", { state: { event } });
                }}
                className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 py-2 rounded-lg transition"
              >
                <QrCode size={18} /> Scan QR
              </button>

              {/* Delete from modal */}
              <button
                onClick={() => {
                  setOpen(false);
                  handleDelete();
                }}
                className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 py-2 rounded-lg transition"
              >
                <Trash2 size={18} /> Delete Event
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
