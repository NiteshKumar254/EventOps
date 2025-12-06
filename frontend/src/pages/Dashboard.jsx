
import { useEffect, useState } from "react";
import axios from "../services/api";
import { useNavigate } from "react-router-dom";
import EventCard from "../components/EventCard";
import {
  Calendar,
  Rocket,
  Clock,
  BarChart3,
  Globe,
  CalendarClock,
  History,
  Filter,
} from "lucide-react";

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [fadeIn, setFadeIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("/events");
        setEvents(res.data);
        setTimeout(() => setFadeIn(true), 100);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const now = new Date();
  const filtered = events.filter((e) => {
    const title = (e.title || e.name || e.eventName || "").toLowerCase();
    const desc = (e.description || e.details || "").toLowerCase();
    const match =
      title.includes(search.toLowerCase()) || desc.includes(search.toLowerCase());
    if (filter === "upcoming") return match && new Date(e.date) > now;
    if (filter === "past") return match && new Date(e.date) <= now;
    return match;
  });

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-[#0B0B0C]">
        <div className="relative">
          {[0, 150, 300].map((d, i) => (
            <div
              key={i}
              className="absolute inset-0 w-16 h-16 border-4 rounded-full animate-spin"
              style={{
                borderColor:
                  i === 0
                    ? "#333 transparent transparent transparent"
                    : i === 1
                    ? "transparent transparent #8b5cf6 transparent"
                    : "transparent transparent transparent #3b82f6",
                animationDelay: `${d}ms`,
              }}
            />
          ))}
        </div>
      </div>
    );

  const statCards = [
    {
      label: "Total Events",
      value: events.length,
      color: "from-blue-500 to-cyan-400",
      icon: <Calendar size={26} />,
    },
    {
      label: "Upcoming",
      value: events.filter((e) => e.date && new Date(e.date) > now).length,
      color: "from-green-500 to-emerald-400",
      icon: <Rocket size={26} />,
    },
    {
      label: "Past Events",
      value: events.filter((e) => e.date && new Date(e.date) <= now).length,
      color: "from-purple-500 to-fuchsia-400",
      icon: <Clock size={26} />,
    },
    {
      label: "This Month",
      value: events.filter((e) => {
        const d = new Date(e.date);
        return (
          d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
        );
      }).length,
      color: "from-amber-400 to-orange-500",
      icon: <BarChart3 size={26} />,
    },
  ];

  const filters = [
    { key: "all", label: "All", icon: <Globe size={18} /> },
    { key: "upcoming", label: "Upcoming", icon: <CalendarClock size={18} /> },
    { key: "past", label: "Past", icon: <History size={18} /> },
  ];

  return (
    <div
      className={`min-h-screen bg-[#0B0B0C] bg-text-neutral-100 transition-opacity duration-700 ${
        fadeIn ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2z'/%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      <main className="relative z-10 px-6 py-10">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:justify-between mb-10">
          <div>
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              🌟 Events Dashboard
            </h1>
            <p className="text-neutral-400">
              Manage and explore your events with style ⚡
            </p>
          </div>
          <button
            onClick={() => navigate("/create-event")}
            className="mt-6 sm:mt-0 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl text-white font-medium shadow-lg hover:scale-105 transition-all"
          >
            ➕ Create Event
          </button>
        </header>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {statCards.map(({ label, value, color, icon }) => (
            <div
              key={label}
              className="relative bg-gradient-to-b from-white/10 to-white/5 border border-white/10 p-5 rounded-2xl shadow-lg hover:shadow-purple-500/20 transition-all duration-300 hover:-translate-y-1"
            >
              <div
                className={`w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br ${color} text-white shadow-lg shadow-black/30 mb-4`}
              >
                {icon}
              </div>
              <p className="text-neutral-400 text-sm">{label}</p>
              <p className="text-3xl font-bold text-white mt-1">{value}</p>
              <div
                className={`absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r ${color} opacity-60 rounded-b-2xl`}
              />
            </div>
          ))}
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <input
            className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl placeholder-neutral-400 text-white focus:ring-2 focus:ring-purple-500/50 focus:outline-none"
            placeholder="🔍 Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="flex gap-2">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-5 py-3 flex items-center gap-2 rounded-xl font-medium border transition-all duration-200 ${
                  filter === f.key
                    ? "bg-gradient-to-r from-purple-900 to-blue-600 text-white border-transparent shadow-lg"
                    : "bg-white/5 border border-white/10 text-neutral-400 hover:bg-white/10"
                }`}
              >
                {f.icon}
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Events Section */}
        {filtered.length ? (
          <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 animate-fade-in">
            {filtered.map((event, i) => (
              <div
                key={event._id}
                className="transition-transform duration-500 hover:-translate-y-2"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all shadow-md hover:shadow-lg">
                  <EventCard event={event} />
                </div>
              </div>
            ))}
          </section>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 border border-white/10 bg-white/5 rounded-2xl">
            <p className="text-5xl mb-4">😕</p>
            <p className="text-xl text-white font-semibold mb-2">
              No events found
            </p>
            <p className="text-neutral-400 mb-6">
              Try adjusting your search or filters 🔎
            </p>
            <button
              onClick={() => navigate("/create-event")}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-medium hover:shadow-lg hover:scale-105 transition-all"
            >
              🚀 Create Event
            </button>
          </div>
        )}
      </main>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in > div {
          animation: fade-in 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
