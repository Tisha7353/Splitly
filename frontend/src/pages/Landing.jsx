
import { ArrowRight, PieChart, ShieldCheck, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";
export default function Landing() {
  const navigate = useNavigate();

const handleLogin = () => {
  navigate("/login");
};


  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      
      {/* ================= NAVBAR ================= */}
      <nav className="border-b bg-white/60 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
       <div className="flex items-center gap-2">
  <img
   src="/Splitly.png" 
    alt="Splitly logo"
    className="h-8 w-8 object-contain"
  />
  <span className="text-2xl font-display font-bold text-primary">
    Splitly
  </span>
</div>
         <button
  onClick={handleLogin}
  className="
    px-4 py-2
    rounded-full
    border border-primary/20
    bg-primary/5
    text-primary
    text-sm font-semibold
    hover:bg-primary hover:text-white
    transition-all duration-200
  "
>
  Log in
</button>

        </div>
      </nav>

      {/* ================= HERO ================= */}
      <main className="flex-1">
        <section className="relative overflow-hidden py-20 lg:py-32">
          
          {/* Background blob */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2
            w-[1000px] h-[600px]
            bg-primary/10
            rounded-[100%]
            blur-3xl -z-10"
          />

          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-5xl lg:text-7xl font-display font-bold leading-[1.1] mb-6"
            >
              Split expenses,
              <br className="hidden md:block" />
              <span className="text-primary"> keep friends.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
            >
              The easiest way to track shared bills and balances with
              housemates, trips, and friends. No more awkward math.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <button
                 onClick={() => navigate("/register")}
                className="inline-flex items-center gap-2
                  bg-primary text-primary-foreground
                  h-14 px-8 rounded-full text-lg font-medium
                  shadow-xl shadow-primary/25
                  hover:shadow-2xl hover:shadow-primary/30
                  transition-all hover:-translate-y-1"
              >
                Get Started for Free
                <ArrowRight className="h-5 w-5" />
              </button>
            </motion.div>
          </div>
        </section>

        {/* ================= FEATURES ================= */}
        <section className="py-20 bg-muted/40">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">

            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-border hover:shadow-md transition">
              <div className="mb-4 bg-muted w-16 h-16 rounded-xl flex items-center justify-center">
                <Users className="h-8 w-8 text-indigo-500" />
              </div>
              <h3 className="text-xl font-display font-bold mb-3">
                Groups & Friends
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Create groups for trips, housemates, or projects.
                Add members easily.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-border hover:shadow-md transition">
              <div className="mb-4 bg-muted w-16 h-16 rounded-xl flex items-center justify-center">
                <PieChart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-display font-bold mb-3">
                Smart Splitting
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Split equally, by percentage, or exact amounts.
                We do the math.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-border hover:shadow-md transition">
              <div className="mb-4 bg-muted w-16 h-16 rounded-xl flex items-center justify-center">
                <ShieldCheck className="h-8 w-8 text-amber-500" />
              </div>
              <h3 className="text-xl font-display font-bold mb-3">
                Secure & Private
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Your financial data is encrypted and secure.
              </p>
            </div>

          </div>
        </section>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="border-t py-8 text-center text-sm text-muted-foreground bg-white">
        © 2024 FairShare. All rights reserved.
      </footer>
    </div>
  );
}
