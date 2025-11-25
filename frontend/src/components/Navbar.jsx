import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="flex justify-between items-center bg-gray-900 text-white px-6 py-3">
      <Link to="/" className="font-bold text-xl">
        EventOps
      </Link>

      <div className="flex gap-4">
        {user ? (
          <>
            <Link to="/dashboard" className="hover:text-purple-400 transition  ">Dashboard</Link>
            <Link to="/create-event"  className="hover:text-purple-400 transition  " >Create Event</Link>
            <Link to="/scan-qr" className="hover:text-purple-400 transition  ">Scan QR</Link>
            {/* <Link to="/attendance">Attendance</Link> */}
            <Link to="/how-it-works" className="hover:text-purple-400 transition">How It Works</Link>
            <Link to="/aboutus" className="hover:text-purple-400 transition">About Us</Link>

            <button
              onClick={logout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
              <Link to="/dashboard">Dashboard</Link>
            <Link to="/create-event">Create Event</Link>
            <Link to="/scan-qr">Scan QR</Link>
            <Link to="/how-it-works" className="hover:text-purple-400 transition">How It Works</Link>

            {/* <Link to="/attendance">Attendance</Link> */}
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}







