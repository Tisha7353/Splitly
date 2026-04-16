import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen text-foreground overflow-hidden">

      {/* ================= NAVBAR ================= */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-green-50/70 border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/Splitly.png" className="h-8 w-8 sm:h-9 sm:w-9" />
            <span className="text-lg sm:text-xl font-semibold text-primary">
              Splitly
            </span>
          </div>

          <button
            onClick={() => navigate("/login")}
            className="px-4 sm:px-5 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary hover:bg-primary hover:text-white transition"
          >
            Login
          </button>
        </div>
      </nav>

      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      {/* ================= HERO ================= */}
      <section className="relative pt-20 sm:pt-24 md:pt-28 pb-16 sm:pb-20 md:pb-24 overflow-hidden">

        {/* Background */}
        <div className="absolute inset-0 -z-30 bg-gradient-to-br from-[#e6f7f1] via-[#eef2ff] to-[#e0f2fe]" />

        {/* Glow effects */}
        <div className="absolute -left-40 top-20 w-[400px] sm:w-[500px] h-[400px] sm:h-[500px] bg-[#22c55e]/50 blur-[120px] sm:blur-[140px] rounded-full -z-20" />
        <div className="absolute -right-40 bottom-10 w-[400px] sm:w-[500px] h-[400px] sm:h-[500px] bg-[#3b82f6]/50 blur-[120px] sm:blur-[140px] rounded-full -z-20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] sm:w-[700px] h-[300px] sm:h-[400px] bg-white/70 blur-[120px] sm:blur-[140px] rounded-full -z-20" />

        {/* Grid */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0,0,0,0.12) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0,0,0,0.12) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Floating Cards */}
        <div className="hidden lg:block absolute left-20 top-44 bg-white/80 backdrop-blur-xl border rounded-xl shadow-xl px-5 py-3 rotate-[-6deg]">
          <p className="text-xs text-gray-500">You are owed</p>
          <p className="font-bold text-green-600 text-lg">₹1,250</p>
        </div>

        <div className="hidden lg:block absolute right-20 top-52 bg-white/80 backdrop-blur-xl border rounded-xl shadow-xl px-5 py-3 rotate-[6deg]">
          <p className="text-xs text-gray-500">Trip balance</p>
          <p className="font-bold text-blue-600 text-lg">+₹820</p>
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center relative z-10">

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight text-gray-800">
            Split expenses,
            <br />
            <span className="bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent">
              beautifully & effortlessly
            </span>
          </h1>

          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-600 max-w-xl sm:max-w-2xl mx-auto">
            The smartest way to manage shared expenses — clean UI,
            real-time updates, and zero awkward math.
          </p>

          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <button
              onClick={() => navigate("/register")}
              className="px-6 sm:px-8 h-12 sm:h-14 rounded-full text-white font-medium bg-gradient-to-r from-green-500 to-green-600 shadow-lg shadow-green-500/30 hover:scale-105 transition"
            >
              Get Started
            </button>

            <button
              onClick={() => navigate("/login")}
              className="px-6 sm:px-8 h-12 sm:h-14 rounded-full bg-white/80 backdrop-blur border hover:bg-white transition"
            >
              Live Demo
            </button>
          </div>

          {/* Dashboard */}
          <div className="mt-12 sm:mt-16 relative">
            <div className="absolute inset-0 bg-white/50 blur-2xl rounded-2xl -z-10" />

            <div className="bg-white/80 backdrop-blur-2xl border rounded-2xl shadow-2xl p-4 sm:p-6">
<div className="h-auto sm:h-[350px] md:h-[450px] lg:h-[520px] flex items-center justify-center overflow-hidden">
                <img
                  src="/dashboard.png"
                  alt="Dashboard Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="relative py-16 sm:py-20 overflow-hidden">

  {/* 🌈 Background */}
  <div className="absolute inset-0 -z-10 bg-gradient-to-br from-green-50 via-white to-blue-50" />

  {/* ✨ Glow */}
  <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[500px] h-[300px] bg-green-300/30 blur-[120px] rounded-full -z-10" />

  <div className="max-w-6xl mx-auto px-4 sm:px-6">

    {/* Heading */}
    <div className="text-center mb-12">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
        Everything you need
      </h2>
      <p className="mt-3 text-gray-600 max-w-xl mx-auto">
        Designed to make splitting expenses simple, fast, and stress-free.
      </p>
    </div>

    {/* Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">

      {[
        {
          title: "Groups & Friends",
          desc: "Create groups and manage expenses easily",
          icon: "👥",
        },
        {
          title: "Smart Splitting",
          desc: "Automatic calculations with zero confusion",
          icon: "🧮",
        },
        {
          title: "Secure",
          desc: "Your data is protected and private",
          icon: "🔒",
        },
      ].map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.15 }}
          whileHover={{ y: -10 }}
          className="group relative bg-white/70 backdrop-blur-xl border border-white/40 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition"
        >

          {/* Glow on hover */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-400/0 to-blue-500/0 group-hover:from-green-400/10 group-hover:to-blue-500/10 transition" />

          {/* Icon */}
          <div className="text-3xl mb-4">{item.icon}</div>

          <h3 className="font-semibold text-lg mb-2 text-gray-800">
            {item.title}
          </h3>

          <p className="text-gray-600">
            {item.desc}
          </p>

        </motion.div>
      ))}

    </div>
  </div>
</section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t py-6 sm:py-8 md:py-10 text-center text-xs sm:text-sm text-muted-foreground">
        © 2026 Splitly. All rights reserved.
      </footer>

    </div>
  );
}