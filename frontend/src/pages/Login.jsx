import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Enter a valid email";

    if (!password.trim()) newErrors.password = "Password is required";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      setLoading(true);
      await login(email, password);
      toast.success("Welcome back 🎉");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
   <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white">
  <form
    onSubmit={handleSubmit}
    className="w-96 p-8 space-y-5 bg-white shadow-xl rounded-2xl border"
  >
    {/* LOGO */}
    <div className="flex flex-col items-center">
      <img
        src="/Splitly.png"
        alt="Splitly"
        className="w-12 mb-2"
      />
      <h2 className="text-2xl font-bold">Welcome Back</h2>
      <p className="text-sm text-gray-500">
        Login to continue
      </p>
    </div>

    {/* EMAIL */}
    <div>
      <input
        type="email"
        placeholder="Email"
        className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
          errors.email
            ? "border-red-500 focus:ring-red-300"
            : "focus:ring-indigo-400"
        }`}
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setErrors((prev) => ({ ...prev, email: "" }));
        }}
      />
      {errors.email && (
        <p className="text-red-500 text-sm mt-1">
          {errors.email}
        </p>
      )}
    </div>

    {/* PASSWORD */}
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
          errors.password
            ? "border-red-500 focus:ring-red-300"
            : "focus:ring-indigo-400"
        }`}
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setErrors((prev) => ({ ...prev, password: "" }));
        }}
      />

      <span
        className="absolute right-3 top-3 text-sm cursor-pointer text-gray-500"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? "Hide" : "Show"}
      </span>

      {errors.password && (
        <p className="text-red-500 text-sm mt-1">
          {errors.password}
        </p>
      )}
    </div>

    {/* FORGOT PASSWORD */}
    <div className="text-right text-sm text-indigo-600 cursor-pointer hover:underline">
      Forgot password?
    </div>

    {/* BUTTON */}
    <button
      disabled={loading}
      className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
    >
      {loading && (
        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
      )}
      {loading ? "Logging in..." : "Login"}
    </button>

    {/* SIGNUP */}
    <p className="text-sm text-center">
      Don’t have an account?
      <span
        onClick={() => navigate("/register")}
        className="text-indigo-600 cursor-pointer ml-1 hover:underline"
      >
        Sign up
      </span>
    </p>
  </form>
</div>
  );
}