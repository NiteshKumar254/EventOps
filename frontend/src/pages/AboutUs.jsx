import { Users, Target, Rocket, HeartHandshake } from "lucide-react";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white py-16 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">About Us</h1>
        <p className="text-lg text-gray-300 mb-12">
          Welcome to <span className="text-blue-400 font-semibold">EventOps</span> — your smart and intuitive event management platform.  
          We simplify event planning, ticketing, and attendance tracking with powerful tools designed for modern teams and organizers.
        </p>
      </div>

      {/* Mission Section */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-3xl font-semibold mb-4 flex items-center gap-2">
            <Target className="text-blue-400" /> Our Mission
          </h2>
          <p className="text-gray-300 leading-relaxed">
            Our mission is to make event management seamless, efficient, and data-driven.  
            Whether you’re organizing a college fest or a professional conference,  
            <span className="text-blue-400 font-medium"> EventOps </span>empowers you to manage everything seamlessly — from event registrations and QR code generation to ticket assignment and real-time validation through the scanning process. </p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1557804506-669a67965ba0"
          alt="Our Mission"
          className="rounded-2xl shadow-lg"
        />
      </div>

      {/* Team Section */}
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h2 className="text-3xl font-semibold mb-6 flex items-center justify-center gap-2">
          <Users className="text-blue-400" /> Meet the Team
        </h2>
      

  
        <div className="mt-12">


  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 ml-80">
    {[
      {
        name: "Nitesh Kumar",
        role: "Frontend/Backend Developer",
        img: "/team/nitesh.jpg", //Add your image path
      },
      
      {
        name: "Priya Sharma",
        role: "UI/UX Designer , Frontend Developer",
        img: "/team/priya.jpg",
      },
    ].map((member, index) => (
      <div
        key={index}
        className="bg-gray-800 border border-gray-700 hover:border-purple-500 hover:shadow-purple-500/30 text-white rounded-2xl p-6 flex flex-col items-center text-center transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl"
      >
        {/* Profile Image */}
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-purple-500 shadow-md mb-4">
          <img
            src={member.img}
            alt={member.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Member Info */}
        <h3 className="text-xl font-semibold">{member.name}</h3>
        <p className="text-gray-400 mt-1">{member.role}</p>

        {/* Optional Social Links (add if you want) */}
        
        <div className="flex gap-4 mt-4">
          <a href="#" className="text-gray-400 hover:text-purple-400 transition">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-purple-400 transition">
            <i className="fab fa-github"></i>
          </a>
        </div>
       
      </div>
    ))}
  </div>
</div>

      </div>

      {/* Vision Section */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <img
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
          alt="Vision"
          className="rounded-2xl shadow-lg"
        />
        <div>
          <h2 className="text-3xl font-semibold mb-4 flex items-center gap-2">
            <Rocket className="text-blue-400" /> Our Vision
          </h2>
          <p className="text-gray-300 leading-relaxed">
            We aim to create a future where event organization is authenticated and effortless — ensuring secure management, smooth collaboration, and reliable participation through innovation.
          </p>
        </div>
      </div>

      <div className="text-center mt-16">
        <p className="text-gray-400 flex justify-center items-center gap-2">
          <HeartHandshake className="text-blue-400" />  
          Together, we’re shaping the future of event management.
        </p>
      </div>
    </div>
  );
}
