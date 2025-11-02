// import { useState } from "react";
// import { Link, useLocation } from "react-router-dom";

// export default function Navbar({ user, logout }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const location = useLocation();

//   const navLinks = [
//     { name: "Dashboard", path: "/dashboard" },
//     { name: "Create Event", path: "/create-event" },
//     { name: "Scan QR", path: "/scan-qr" },
//     { name: "Attendance", path: "/attendance" },
//   ];

//   return (
//     <nav className="bg-gray-900 text-white shadow-md px-6 py-4 flex items-center justify-between">
//       <div className="font-bold text-xl">QR Event Management</div>

//       {/* Desktop Links */}
//       <div className="hidden md:flex gap-6 items-center">
//         {navLinks.map((link) => (
//           <Link
//             key={link.name}
//             to={link.path}
//             className={`transition-colors px-3 py-1 rounded hover:bg-gray-700 ${
//               location.pathname === link.path ? "bg-gray-700" : ""
//             }`}
//           >
//             {link.name}
//           </Link>
//         ))}
//         {user && (
//           <button
//             onClick={logout}
//             className="bg-red-600 hover:bg-red-500 px-3 py-1 rounded transition"
//           >
//             Logout
//           </button>
//         )}
//       </div>

//       {/* Mobile Menu Button */}
//       <div className="md:hidden">
//         <button
//           onClick={() => setIsOpen(!isOpen)}
//           className="focus:outline-none"
//         >
//           {isOpen ? (
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-6 w-6"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           ) : (
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-6 w-6"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//             </svg>
//           )}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <div className="absolute top-16 left-0 w-full bg-gray-900 flex flex-col gap-3 p-4 md:hidden z-50">
//           {navLinks.map((link) => (
//             <Link
//               key={link.name}
//               to={link.path}
//               onClick={() => setIsOpen(false)}
//               className={`transition-colors px-3 py-2 rounded hover:bg-gray-700 ${
//                 location.pathname === link.path ? "bg-gray-700" : ""
//               }`}
//             >
//               {link.name}
//             </Link>
//           ))}
//           {user && (
//             <button
//               onClick={logout}
//               className="bg-red-600 hover:bg-red-500 px-3 py-2 rounded transition"
//             >
//               Logout
//             </button>
//           )}
//         </div>
//       )}
//     </nav>
//   );
// }

// import { useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";

// export default function Navbar({ user, logout }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate();

//   const navLinks = [
//     { name: "Dashboard", path: "/dashboard" },
//     { name: "Create Event", path: "/create-event" },
//     { name: "Scan QR", path: "/scan-qr" },
//     { name: "Attendance", path: "/attendance" },
//   ];

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   return (
//     <nav className="bg-gray-900 text-white shadow-md px-6 py-4 flex items-center justify-between relative">
//       {/* Brand Logo */}
//       <Link
//         to="/"
//         className="font-bold text-xl text-blue-400 hover:text-blue-300 transition"
//       >
//         QR Event Management
//       </Link>

//       {/* Desktop Menu */}
//       <div className="hidden md:flex gap-6 items-center">
//         {navLinks.map((link) => (
//           <Link
//             key={link.name}
//             to={link.path}
//             className={`transition-colors px-3 py-1 rounded hover:bg-gray-700 ${
//               location.pathname === link.path ? "bg-gray-700" : ""
//             }`}
//           >
//             {link.name}
//           </Link>
//         ))}

//         {/* Show Login/Signup only if not logged in */}
//         {!user && (
//           <>
//             <Link
//               to="/login"
//               className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded transition"
//             >
//               Login
//             </Link>
//             <Link
//               to="/signup"
//               className="border border-blue-400 px-3 py-1 rounded hover:bg-blue-500 hover:text-white transition"
//             >
//               Signup
//             </Link>
//           </>
//         )}

//         {/* Show Logout if logged in */}
//         {user && (
//           <button
//             onClick={handleLogout}
//             className="bg-red-600 hover:bg-red-500 px-3 py-1 rounded transition"
//           >
//             Logout
//           </button>
//         )}
//       </div>

//       {/* Mobile Menu Button */}
//       <div className="md:hidden">
//         <button
//           onClick={() => setIsOpen(!isOpen)}
//           className="focus:outline-none"
//         >
//           {isOpen ? (
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-6 w-6"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M6 18L18 6M6 6l12 12"
//               />
//             </svg>
//           ) : (
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-6 w-6"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M4 6h16M4 12h16M4 18h16"
//               />
//             </svg>
//           )}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <div className="absolute top-16 left-0 w-full bg-gray-900 flex flex-col gap-3 p-4 md:hidden z-50">
//           {navLinks.map((link) => (
//             <Link
//               key={link.name}
//               to={link.path}
//               onClick={() => setIsOpen(false)}
//               className={`transition-colors px-3 py-2 rounded hover:bg-gray-700 ${
//                 location.pathname === link.path ? "bg-gray-700" : ""
//               }`}
//             >
//               {link.name}
//             </Link>
//           ))}

//           {/* Show Login/Signup if not logged in */}
//           {!user && (
//             <>
//               <Link
//                 to="/login"
//                 onClick={() => setIsOpen(false)}
//                 className="bg-blue-500 hover:bg-blue-600 px-3 py-2 rounded text-center transition"
//               >
//                 Login
//               </Link>
//               <Link
//                 to="/signup"
//                 onClick={() => setIsOpen(false)}
//                 className="border border-blue-400 px-3 py-2 rounded hover:bg-blue-500 hover:text-white text-center transition"
//               >
//                 Signup
//               </Link>
//             </>
//           )}

//           {/* Logout if logged in */}
//           {user && (
//             <button
//               onClick={() => {
//                 handleLogout();
//                 setIsOpen(false);
//               }}
//               className="bg-red-600 hover:bg-red-500 px-3 py-2 rounded transition"
//             >
//               Logout
//             </button>
//           )}
//         </div>
//       )}
//     </nav>
//   );
// }
// App.js
// import { useContext } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// // import Navbar from "./components/Navbar";
// import Login from "../pages/Login";
// import Signup from "../pages/Signup";
// import Dashboard from "../pages/Dashboard";
// import CreateEvent from "./pages/CreateEvent";
// import ScanQR from "./pages/ScanQR";
// import Attendance from "./pages/Attendance";

// function App() {
//   const { user, logout, loading } = useContext(AuthContext);

//   if (loading) return <div className="text-center mt-10">Loading...</div>;

//   return (
//     <Router>
//       {/* ✅ Pass user + logout from context */}
//       <Navbar user={user} logout={logout} />

//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />

//         {/* Protected Routes (only show if logged in) */}
//         {user ? (
//           <>
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/create-event" element={<CreateEvent />} />
//             <Route path="/scan-qr" element={<ScanQR />} />
//             <Route path="/attendance" element={<Attendance />} />
//           </>
//         ) : (
//           <Route
//             path="*"
//             element={
//               <div className="text-center text-red-500 mt-20">
//                 Please login to access the app.
//               </div>
//             }
//           />
//         )}
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// import { useContext } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import Navbar from "../components/Navbar";  // ✅ uncomment + correct path
// import Login from "../pages/Login";
// import Signup from "../pages/Signup";
// import Dashboard from "../pages/Dashboard";
// import CreateEvent from "../pages/CreateEvent"; // ✅ fixed path
// import ScanQR from "../pages/ScanQR";           // ✅ fixed path
// import AttendanceReport from "../pages/AttendanceReport"; // ✅ correct file name

// function App() {
//   const { user, logout, loading } = useContext(AuthContext);

//   if (loading) return <div className="text-center mt-10">Loading...</div>;

//   return (
//     <Router>
//       {/* ✅ Pass user + logout to Navbar */}
//       <Navbar user={user} logout={logout} />

//       <Routes>
//         {/* Public routes */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />

//         {/* Protected Routes */}
//         {user ? (
//           <>
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/create-event" element={<CreateEvent />} />
//             <Route path="/scan-qr" element={<ScanQR />} />
//             <Route path="/attendance" element={<AttendanceReport />} />
//           </>
//         ) : (
//           <Route
//             path="*"
//             element={
//               <div className="text-center text-red-500 mt-20">
//                 Please login to access the app.
//               </div>
//             }
//           />
//         )}
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// import { useContext } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import Navbar from "../components/Navbar";
// import Login from "../pages/Login";
// import Signup from "../pages/Signup";
// import Dashboard from "../pages/Dashboard";
// import CreateEvent from "../pages/CreateEvent";
// import ScanQR from "../pages/ScanQR";
// import AttendanceReport from "../pages/AttendanceReport";

// function App() {
//   const { user, logout, loading } = useContext(AuthContext);

//   // Show loader until AuthContext finishes loading user data
//   if (loading) {
//     return (
//       <div className="text-center mt-20 text-lg font-semibold text-gray-600">
//         Loading...
//       </div>
//     );
//   }

//   return (
//     <Router>
//       {/* ✅ Navbar always visible, receives auth props */}
//       <Navbar user={user} logout={logout} />

//       <div className="p-4">
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />

//           {/* Protected Routes */}
//           {user ? (
//             <>
//               <Route path="/dashboard" element={<Dashboard />} />
//               <Route path="/create-event" element={<CreateEvent />} />
//               <Route path="/scan-qr" element={<ScanQR />} />
//               <Route path="/attendance" element={<AttendanceReport />} />
//             </>
//           ) : (
//             // If not logged in → redirect to login message
//             <Route
//               path="*"
//               element={
//                 <div className="text-center mt-20 text-red-500 text-lg font-medium">
//                   Please login to access the app.
//                 </div>
//               }
//             />
//           )}
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;


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







