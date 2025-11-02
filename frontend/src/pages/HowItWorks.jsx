
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Info, QrCode, Users, BarChart } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: <Info size={40} />,
      title: "1. Create Your Event",
      desc: "Organizers can create events with name, date, venue and seating capacity using the Create Event page.",
    },
    {
      icon: <QrCode size={40} />,
      title: "2. Generate & Assign QR Tickets",
      desc: "When an event is created the system generates unique QR tickets for all seats. Organizers can review generated tickets in the Tickets page and assign them to users by email — the ticket (with QR attached) is sent from the app.",
    },
    {
      icon: <Users size={40} />,
      title: "3. Scan at the Venue",
      desc: "At the venue entrance, staff open the Scan page, select the event and scan attendees' QR codes to verify and check them in instantly.",
    },
    {
      icon: <BarChart size={40} />,
      title: "4. Track Attendance in Real-Time",
      desc: "Checked-in attendee counts and other stats update in real-time on the dashboard and the attendance reports can be exported as CSV/PDF.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-12 flex flex-col items-center">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-extrabold text-purple-400 mb-10 text-center"
      >
         How It Works?
      </motion.h1>

      <div className="max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.18 }}
            className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-purple-500/20 hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-center gap-4 mb-4 text-purple-400">
              {step.icon}
              <h2 className="text-xl font-semibold">{step.title}</h2>
            </div>
            <p className="text-gray-400">{step.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="mt-12 text-center"
      >
        <p className="text-gray-400 mb-4 text-lg">
          Ready to manage events and attendees easily?
        </p>
        <Link
          to="/create-event"
          className="bg-purple-600 hover:bg-purple-500 px-6 py-3 rounded-lg font-semibold text-white transition transform hover:scale-105 shadow-lg"
        >
          Create Your First Event
        </Link>
      </motion.div>
    </div>
  );
}
