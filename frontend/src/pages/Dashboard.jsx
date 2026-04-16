import { motion } from "framer-motion";
import {
  ArrowRight,
  CreditCard,
  Users,
  LogOut,
  Bell,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useGroups } from "../hooks/useGroups";
import CreateGroupModal from "../components/CreateGroupModal";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { groups, loading, setGroups } = useGroups();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-secondary/30 pb-20">

      {/* ================= HEADER ================= */}
      <header className="bg-background border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

         <div className="flex items-center gap-3">
            <img src="/Splitly.png" className="h-8 w-8 sm:h-9 sm:w-9" />
            <span className="text-lg sm:text-xl font-semibold text-primary">
              Splitly
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">

            <span className="text-sm font-medium text-muted-foreground hidden md:block">
              Welcome, {user?.firstName || "User"}
            </span>

            <button className="p-2 rounded-full hover:bg-muted">
              <Bell className="w-5 h-5 text-muted-foreground" />
            </button>

            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
              {user?.firstName?.[0]?.toUpperCase() || "U"}
            </div>

            <button
              onClick={handleLogout}
              className="p-2 rounded-full hover:bg-muted"
            >
              <LogOut className="w-5 h-5 text-muted-foreground" />
            </button>

          </div>
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">

        {/* 🔥 TOP BAR (FIXED) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">

          <h2 className="text-2xl sm:text-3xl font-display font-bold">
            My Groups
          </h2>

          {/* ✅ Now works for BOTH mobile + desktop */}
          <div className="w-full sm:w-auto">
            <CreateGroupModal setGroups={setGroups} />
          </div>

        </div>

        {/* ================= CONTENT ================= */}
        {loading ? (
          <SkeletonGrid />
        ) : groups.length === 0 ? (
          <EmptyState setGroups={setGroups} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">

            {groups.map((group, idx) => (
              <motion.div
                key={group._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <div
                  onClick={() => navigate(`/groups/${group._id}`)}
                  className="bg-card h-full rounded-2xl p-5 sm:p-6 shadow-sm
                    border border-border/50
                    hover:shadow-lg hover:border-primary/20
                    transition-all duration-300 cursor-pointer
                    relative overflow-hidden group"
                >

                  {/* Background Icon */}
                  <div className="absolute top-0 right-0 p-4 sm:p-6 opacity-5 group-hover:opacity-10">
                    <CreditCard className="w-16 sm:w-24 h-16 sm:h-24 text-primary" />
                  </div>

                  <div className="flex flex-col h-full justify-between relative z-10">

                    {/* TEXT */}
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-primary transition">
                        {group.name}
                      </h3>

                      <p className="text-muted-foreground text-sm line-clamp-2">
                        {group.description || "No description"}
                      </p>
                    </div>

                    {/* FOOTER */}
                    <div className="mt-5 sm:mt-6 flex items-center justify-between">

                      <div className="flex -space-x-2">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary/10 flex items-center justify-center border-2 border-background text-primary">
                          <Users className="w-4 h-4" />
                        </div>
                      </div>

                      <span className="text-xs sm:text-sm font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                        View Group <ArrowRight className="w-4 h-4" />
                      </span>

                    </div>

                  </div>
                </div>
              </motion.div>
            ))}

          </div>
        )}
      </main>
    </div>
  );
}

/* ================= HELPERS ================= */

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="h-40 sm:h-48 rounded-2xl bg-muted animate-pulse"
        />
      ))}
    </div>
  );
}

function EmptyState({ setGroups }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 sm:py-20 text-center">

      <div className="w-20 h-20 sm:w-24 sm:h-24 bg-muted rounded-full flex items-center justify-center mb-5 sm:mb-6">
        <Users className="w-8 h-8 sm:w-10 sm:h-10 text-muted-foreground" />
      </div>

      <h3 className="text-lg sm:text-xl font-bold mb-2">
        No groups yet
      </h3>

      <p className="text-muted-foreground max-w-sm mb-6 sm:mb-8 text-sm sm:text-base">
        Create a group to start tracking expenses with friends or roommates.
      </p>

      <div className="w-full sm:w-auto">
        <CreateGroupModal setGroups={setGroups} />
      </div>

    </div>
  );
}