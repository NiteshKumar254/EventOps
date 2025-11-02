
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateEvent from "./pages/CreateEvent";
import ScanQR from "./pages/ScanQR";
import AttendanceReport from "./pages/AttendanceReport";
import TicketList from "./pages/TicketList"; 
import ProtectedRoute from "./components/ProtectedRoute";
import Signup from "./pages/Signup";
import HowItWorks from "./pages/HowItWorks";
import AboutUs from "./pages/AboutUs";


function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />

        <Routes>
          {/* Default route redirects to login */}
          <Route path="/" element={<Navigate to="/login" />} />
           <Route path="/signup" element={<Signup />} />

          {/* Public Route */}
          <Route path="/login" element={<Login />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
         <Route path="/aboutus" element={<AboutUs/>}/>

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-event"
            element={
              <ProtectedRoute>
                <CreateEvent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/scan-qr"
            element={
              <ProtectedRoute>
                <ScanQR />
              </ProtectedRoute>
            }
          />
          <Route
            path="/attendance/:eventId"
            element={
              <ProtectedRoute>
                <AttendanceReport />
              </ProtectedRoute>
            }
          />
          {/*  route for viewing generated QR tickets */}
          <Route
            path="/tickets/:eventId"
            element={
              <ProtectedRoute>
                <TicketList />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;


