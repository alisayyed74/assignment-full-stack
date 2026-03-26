import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Home, ListTodo, Users } from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) navigate("/");
  }, []);

  const tasks = [
    { id: 1, title: "Follow up client", status: "Pending" },
    { id: 2, title: "Prepare report", status: "Completed" },
    { id: 3, title: "Team meeting", status: "In Progress" }
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200">

      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-64 bg-gradient-to-b from-indigo-600 to-purple-600 text-white p-6 shadow-xl">

        <h2 className="text-2xl font-bold mb-10 tracking-wide">
          🚀 Dashboard
        </h2>

        <ul className="space-y-5">
          <li className="flex items-center gap-3 hover:bg-white/20 p-2 rounded cursor-pointer transition">
            <Home size={18} /> Home
          </li>
          <li className="flex items-center gap-3 hover:bg-white/20 p-2 rounded cursor-pointer transition">
            <ListTodo size={18} /> Tasks
          </li>
          <li className="flex items-center gap-3 hover:bg-white/20 p-2 rounded cursor-pointer transition">
            <Users size={18} /> Users
          </li>
        </ul>

        <button
          onClick={() => {
            localStorage.removeItem("user");
            navigate("/");
          }}
          className="mt-auto bg-red-500 hover:bg-red-600 p-3 rounded-lg transition"
        >
          Logout
        </button>
      </div>

      {/* Main */}
      <div className="flex-1 p-6">

        {/* Header */}
        <h1 className="text-3xl font-bold mb-6">
          Welcome, <span className="text-indigo-600">{user?.name}</span> 👋
        </h1>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

          <div className="backdrop-blur-lg bg-white/60 p-6 rounded-2xl shadow-lg hover:scale-105 transition">
            <h3 className="text-gray-600">Total Tasks</h3>
            <p className="text-3xl font-bold">3</p>
          </div>

          <div className="backdrop-blur-lg bg-white/60 p-6 rounded-2xl shadow-lg hover:scale-105 transition">
            <h3 className="text-gray-600">Completed</h3>
            <p className="text-3xl font-bold text-green-500">1</p>
          </div>

          <div className="backdrop-blur-lg bg-white/60 p-6 rounded-2xl shadow-lg hover:scale-105 transition">
            <h3 className="text-gray-600">Pending</h3>
            <p className="text-3xl font-bold text-yellow-500">2</p>
          </div>

        </div>

        {/* Tasks */}
        <div className="bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow-lg">

          <h2 className="text-xl font-semibold mb-4">Tasks</h2>

          <ul className="space-y-4">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="flex justify-between items-center p-4 rounded-xl border hover:shadow-md hover:scale-[1.01] transition"
              >
                <span className="font-medium">{task.title}</span>

                <span
                  className={`px-4 py-1 text-sm rounded-full ${
                    task.status === "Completed"
                      ? "bg-green-100 text-green-600"
                      : task.status === "Pending"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-blue-100 text-blue-600"
                  }`}
                >
                  {task.status}
                </span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}