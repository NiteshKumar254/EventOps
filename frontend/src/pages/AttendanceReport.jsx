
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../services/api";

export default function AttendanceReport() {
  const { eventId } = useParams();

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [seatType, setSeatType] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAttendance();
  }, [eventId, seatType]);

  const fetchAttendance = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/attendance/${eventId}`, {
        params: seatType ? { seatType } : {},
      });

      // ✅ MAIN FIX IS HERE
      setTickets(res.data.tickets || []);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load attendance");
      setTickets([]);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async (format) => {
    try {
      const res = await axios.get(`/attendance/${eventId}`, {
        params: { format, seatType },
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.download = `attendance_${eventId}.${format}`;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch {
      alert("Failed to export data");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Attendance Report
        </h1>

        <div className="flex items-center gap-3 mt-4 sm:mt-0">
          <select
            value={seatType}
            onChange={(e) => setSeatType(e.target.value)}
            className="border rounded-lg px-3 py-2 bg-white shadow-sm text-sm"
          >
            <option value="">All Seat Types</option>
            <option value="VIP">VIP</option>
            <option value="Regular">Regular</option>
          </select>

          <button
            onClick={() => handleExport("csv")}
            className="bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Export CSV
          </button>

          <button
            onClick={() => handleExport("pdf")}
            className="bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Export PDF
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-10 text-gray-600">Loading...</div>
      ) : error ? (
        <div className="text-center py-10 text-red-500">{error}</div>
      ) : tickets.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No attendees found.
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Seat Type</th>
                <th className="py-3 px-4 text-left">Seat No.</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Check-In Time</th>
                <th className="py-3 px-4 text-left">Expiry</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((t, i) => (
                <tr key={t._id || i} className="border-b">
                  <td className="py-3 px-4 font-medium">
                    {t.attendeeName}
                  </td>
                  <td className="py-3 px-4">{t.seatType}</td>
                  <td className="py-3 px-4">{t.seatNumber || "-"}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        t.checkedIn
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {t.checkedIn ? "Checked In" : "Not Used"}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {t.checkInTime
                      ? new Date(t.checkInTime).toLocaleString()
                      : "-"}
                  </td>
                  <td className="py-3 px-4">
                    {new Date(t.expiryDate).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
