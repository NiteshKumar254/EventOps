
import { useState, useEffect } from "react";
import axios from "../services/api";
import { useNavigate } from "react-router-dom";

export default function CreateEvent() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [venue, setVenue] = useState("");
  const [vipSeats, setVipSeats] = useState(0);
  const [regularSeats, setRegularSeats] = useState(0);
  const [totalSeats, setTotalSeats] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setTotalSeats(parseInt(vipSeats || 0) + parseInt(regularSeats || 0));
  }, [vipSeats, regularSeats]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/events", { name, date, venue, vipSeats, regularSeats, totalSeats });
      alert("Event created successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Error creating event. Please try again.");
    }
  };

  return (
 
    // <div className="flex justify-center mt-12 px-4 ">
       <div className="min-h-screen flex justify-center items-center bg-black px-4 py-8">
      <form 
        onSubmit={handleSubmit} 
        className="bg-gray-900 text-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Create Event</h2>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Event Name</label>
          <input 
            type="text" 
            placeholder="Enter event name" 
            className="w-full p-3 rounded-lg border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 bg-gray-800 placeholder-gray-400 transition"
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Date & Time</label>
          <input 
            type="datetime-local" 
            className="w-full p-3 rounded-lg border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 bg-gray-800 transition"
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Venue</label>
          <input 
            type="text" 
            placeholder="Enter venue" 
            className="w-full p-3 rounded-lg border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 bg-gray-800 transition"
            value={venue} 
            onChange={(e) => setVenue(e.target.value)} 
            required
          />
        </div>

        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">VIP Seats</label>
            <input 
              type="number" 
              min="0"
              placeholder="0" 
              className="w-full p-3 rounded-lg border border-gray-700 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 bg-gray-800 transition"
              value={vipSeats} 
              onChange={(e) => setVipSeats(e.target.value)} 
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Regular Seats</label>
            <input 
              type="number" 
              min="0"
              placeholder="0" 
              className="w-full p-3 rounded-lg border border-gray-700 focus:border-green-400 focus:ring-1 focus:ring-green-400 bg-gray-800 transition"
              value={regularSeats} 
              onChange={(e) => setRegularSeats(e.target.value)} 
              required
            />
          </div>
        </div>

        <p className="text-right text-gray-400 mb-4">Total Seats: <span className="font-semibold">{totalSeats}</span></p>

        <button 
          type="submit" 
          className="w-full bg-purple-600 hover:bg-purple-500 text-white py-3 rounded-lg font-bold transition transform hover:scale-105"
        >
          Create Event
        </button>
      </form>
    </div>
  
  );
}
