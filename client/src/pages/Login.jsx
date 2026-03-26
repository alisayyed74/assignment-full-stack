import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!form.email.includes("@")) {
      return toast.error("Enter valid email");
    }

    if (!form.password) {
      return toast.error("Password required");
    }

    try {
      setLoading(true);

      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, form);

      // ✅ Save user + token
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);

      toast.success("Login successful 🎉");

      navigate("/dashboard");

    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600">

      <div className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-[90%] max-w-md">

        <h2 className="text-2xl font-bold text-center mb-2 text-gray-800">
          Welcome Back 👋
        </h2>

        <p className="text-center text-gray-500 mb-6 text-sm">
          Login to continue
        </p>

        <form onSubmit={handleLogin} className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Register Link */}
          <p className="text-center mt-4 text-sm">
            New user?{" "}
            <Link to="/register" className="text-indigo-600 font-semibold">
              Register
            </Link>
          </p>

        </form>

      </div>
    </div>
  );
}