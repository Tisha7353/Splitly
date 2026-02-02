import { motion } from "framer-motion";
import {
  ArrowRight,
  CreditCard,
  Users,
  Plus,
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
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <h1 className="text-2xl font-display font-bold text-primary tracking-tight">
            FairShare
          </h1>

          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-muted-foreground hidden md:block">
              Welcome, {user?.firstName || "User"}
            </span>

            <button className="p-2 rounded-full hover:bg-muted">
              <Bell className="w-5 h-5 text-muted-foreground" />
            </button>

            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
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
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-display font-bold">
            My Groups
          </h2>

          {/* Desktop create button */}
          <div className="hidden md:block">
            <CreateGroupModal setGroups={setGroups} />
          </div>
        </div>

        {/* ================= CONTENT ================= */}
        {loading ? (
          <SkeletonGrid />
        ) : groups.length === 0 ? (
          <EmptyState setGroups={setGroups}/>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {groups.map((group, idx) => (
              <motion.div
                key={group._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <div
                  onClick={() => navigate(`/groups/${group._id}`)}
                  className="bg-card h-full rounded-2xl p-6 shadow-sm
                    border border-border/50
                    hover:shadow-lg hover:border-primary/20
                    transition-all duration-300 cursor-pointer
                    relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10">
                    <CreditCard className="w-24 h-24 text-primary" />
                  </div>

                  <div className="flex flex-col h-full justify-between relative z-10">
                    <div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition">
                        {group.name}
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-2">
                        {group.description || "No description"}
                      </p>
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                      <div className="flex -space-x-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center border-2 border-background text-primary">
                          <Users className="w-4 h-4" />
                        </div>
                      </div>

                      <span className="text-sm font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
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

      {/* ================= MOBILE FAB ================= */}
      <div className="md:hidden">
        <CreateGroupModal setGroups={setGroups} />
      </div>
    </div>
  );
}

/* ================= HELPERS ================= */

function SkeletonGrid() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="h-48 rounded-2xl bg-muted animate-pulse"
        />
      ))}
    </div>
  );
}

function EmptyState({ setGroups }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
        <Users className="w-10 h-10 text-muted-foreground" />
      </div>

      <h3 className="text-xl font-bold mb-2">No groups yet</h3>
      <p className="text-muted-foreground max-w-sm mb-8">
        Create a group to start tracking expenses with friends or roommates.
      </p>

      <CreateGroupModal setGroups={setGroups} />
    </div>
  );
}
