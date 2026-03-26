import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      return toast.error("All fields are required ❌");
    }

    if (!form.email.includes("@")) {
      return toast.error("Enter valid email ❌");
    }

    try {
      setLoading(true);

      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, form);

      toast.success("Account created successfully 🎉");

      navigate("/");

    } catch (err) {
      toast.error(err.response?.data?.message || "Register failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600">

      <div className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-[90%] max-w-md">

        <h2 className="text-2xl font-bold text-center mb-2 text-gray-800">
          Create Account 🚀
        </h2>

        <p className="text-center text-gray-500 mb-6 text-sm">
          Register to get started
        </p>

        <form onSubmit={handleRegister} className="space-y-4">

          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

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
            {loading ? "Creating..." : "Register"}
          </button>

          {/* Login Link */}
          <p className="text-center mt-4 text-sm">
            Already have an account?{" "}
            <Link to="/" className="text-indigo-600 font-semibold">
              Login
            </Link>
          </p>

        </form>

      </div>
    </div>
  );
}