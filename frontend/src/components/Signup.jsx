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
    <div className="max-w-md mx-auto mt-10 p-4 shadow rounded bg-white">
      <h2 className="text-xl font-bold mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Sign Up
        </button>
        <Link to="/login">Already have an account? Go to Log In</Link>
      </form>
    </div>
  );
}
