import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Enter a valid email";

    if (!password.trim()) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Minimum 6 characters required";

    if (!confirm.trim()) newErrors.confirm = "Confirm your password";
    else if (password !== confirm)
      newErrors.confirm = "Passwords do not match";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      setLoading(true);
      await register({ firstName, lastName, email, password });
      toast.success("Account created 🎉");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white">
      <form
        onSubmit={handleSubmit}
        className="w-96 p-8 space-y-4 bg-white shadow-xl rounded-2xl border"
      >
        {/* LOGO */}
        <div className="flex flex-col items-center mb-2">
          <img src="/Splitly.png" className="w-12 mb-2" />
          <h2 className="text-2xl font-bold">Create Account</h2>
          <p className="text-sm text-gray-500">Join Splitly today</p>
        </div>

        {/* FIRST NAME */}
        <div>
          <input
            placeholder="First Name"
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
              errors.firstName
                ? "border-red-500 focus:ring-red-300"
                : "focus:ring-indigo-400"
            }`}
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
              setErrors((prev) => ({ ...prev, firstName: "" }));
            }}
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.firstName}
            </p>
          )}
        </div>

        {/* LAST NAME */}
        <input
          placeholder="Last Name (optional)"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

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
        <div>
          <input
            type="password"
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
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password}
            </p>
          )}
        </div>

        {/* CONFIRM PASSWORD */}
        <div>
          <input
            type="password"
            placeholder="Confirm Password"
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
              errors.confirm
                ? "border-red-500 focus:ring-red-300"
                : "focus:ring-indigo-400"
            }`}
            value={confirm}
            onChange={(e) => {
              setConfirm(e.target.value);
              setErrors((prev) => ({ ...prev, confirm: "" }));
            }}
          />
          {errors.confirm && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirm}
            </p>
          )}
        </div>

        {/* BUTTON */}
        <button
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
        >
          {loading && (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          )}
          {loading ? "Creating..." : "Register"}
        </button>

        {/* LOGIN LINK */}
        <p className="text-sm text-center">
          Already have an account?
          <span
            onClick={() => navigate("/login")}
            className="text-indigo-600 cursor-pointer ml-1 hover:underline"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}