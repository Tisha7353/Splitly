import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";


export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen  text-foreground overflow-hidden">

      {/* ================= NAVBAR ================= */}
     <nav className="sticky top-0 z-50 backdrop-blur-xl 
  bg-green-50/70 border-b border-green-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/Splitly.png" className="h-9 w-9" />
            <span className="text-xl font-semibold text-primary">Splitly</span>
          </div>

          <button
            onClick={() => navigate("/login")}
            className="px-5 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary hover:bg-primary hover:text-white transition"
          >
            Login
          </button>
        </div>
      </nav><div className="absolute bottom-0 left-0 w-full h-[1px] 
  bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
<section className="relative pt-28 pb-24 overflow-hidden">

  {/* 🌈 MAIN GRADIENT BACKGROUND */}
  <div className="absolute inset-0 -z-30 
    bg-gradient-to-br from-[#e6f7f1] via-[#eef2ff] to-[#e0f2fe]" 
  />

  {/* 🌊 LEFT GLOW */}
  <div className="absolute -left-40 top-20 w-[500px] h-[500px] 
    bg-[#22c55e]/50 blur-[140px] rounded-full -z-20" />

  {/* 🌊 RIGHT GLOW */}
  <div className="absolute -right-40 bottom-10 w-[500px] h-[500px] 
    bg-[#3b82f6]/50 blur-[140px] rounded-full -z-20" />

  {/* ✨ CENTER LIGHT (IMPORTANT FOR PREMIUM LOOK) */}
  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] 
    bg-white/70 blur-[140px] rounded-full -z-20" />

  {/* 🔳 STRONG VISIBLE GRID */}
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

  {/* ✨ FLOATING CARDS */}
  <div className="hidden lg:block absolute left-20 top-44 
    bg-white/80 backdrop-blur-xl border rounded-xl shadow-xl px-5 py-3 rotate-[-6deg]">
    <p className="text-xs text-gray-500">You are owed</p>
    <p className="font-bold text-green-600 text-lg">₹1,250</p>
  </div>

  <div className="hidden lg:block absolute right-20 top-52 
    bg-white/80 backdrop-blur-xl border rounded-xl shadow-xl px-5 py-3 rotate-[6deg]">
    <p className="text-xs text-gray-500">Trip balance</p>
    <p className="font-bold text-blue-600 text-lg">+₹820</p>
  </div>

  {/* 🔥 CONTENT */}
  <div className="max-w-6xl mx-auto px-6 text-center relative z-10">

    <h1 className="text-5xl lg:text-7xl font-bold leading-[1.1] text-gray-800">
      Split expenses,
      <br />
      <span className="bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent">
        beautifully & effortlessly
      </span>
    </h1>

    <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
      The smartest way to manage shared expenses — clean UI,
      real-time updates, and zero awkward math.
    </p>

    <div className="mt-8 flex justify-center gap-4 flex-wrap">

      <button  onClick={() => navigate("/register")} className="px-8 h-14 rounded-full text-white font-medium
        bg-gradient-to-r from-green-500 to-green-600
        shadow-lg shadow-green-500/30 hover:scale-105 transition">
        Get Started
      </button>

      <button onClick={() => navigate("/login")} className="px-8 h-14 rounded-full bg-white/80 backdrop-blur 
        border hover:bg-white transition">
        Live Demo
      </button>

    </div>

    {/* 💎 DASHBOARD CARD */}
    <div className="mt-16 relative">

      <div className="absolute inset-0 bg-white/50 blur-2xl rounded-2xl -z-10" />

      <div className="bg-white/80 backdrop-blur-2xl border rounded-2xl shadow-2xl p-6">

        <div className="h-[520px] rounded-xl bg-gray-100 flex items-center justify-center">
           <img
    src="/dashboard.png" // your image path
    alt="Dashboard Preview"
    className="w-full h-full object-cover"
  />
        </div>

      </div>

    </div>

  </div>
</section>
      {/* ================= FEATURES ================= */}
      <section className="py-20 max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">

        {[
          ["Groups & Friends", "Create groups easily"],
          ["Smart Splitting", "Auto calculations"],
          ["Secure", "Your data is safe"],
        ].map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -10 }}
            className="bg-white/80 backdrop-blur p-6 rounded-xl border shadow-md"
          >
            <h3 className="font-semibold text-lg mb-2">{item[0]}</h3>
            <p className="text-muted-foreground">{item[1]}</p>
          </motion.div>
        ))}

      </section>

      {/* ================= CTA ================= */}
      <section className="py-20 text-center max-w-3xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-6">
          Ready to simplify everything?
        </h2>

        <button
          onClick={() => navigate("/register")}
          className="bg-primary text-white px-10 h-14 rounded-full shadow-xl shadow-primary/30 hover:scale-110 transition"
        >
          Start Free Now
        </button>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t py-10 text-center text-sm text-muted-foreground">
        © 2026 Splitly. All rights reserved.
      </footer>
    </div>
  );
}