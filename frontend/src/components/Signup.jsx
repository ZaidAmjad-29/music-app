import usePostActions from "../services/usePostActions";
import { Link } from "react-router-dom";
import { useData } from "./PostProvider";

export default function Signup() {
  const { handleSignup, handleChange } = usePostActions();
  const { form } = useData();

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleSignup(form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-black px-4">
      <div className="w-full max-w-md bg-gray-900/70 backdrop-blur-lg border border-gray-700/40 rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          Create Account
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 mb-4 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 mb-4 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 mb-6 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-bold rounded-lg transition-all duration-300"
          >
            Sign Up
          </button>

          <p className="text-center text-gray-400 mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-purple-400 hover:underline hover:text-pink-400 transition"
            >
              Log In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
