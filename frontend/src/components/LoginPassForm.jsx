import usePostActions from "../services/usePostActions";
import { Link } from "react-router-dom";
import { useData } from "../components/PostProvider";

export default function LoginPassForm() {
  const { signInform, handleChangeSignin } = useData();
  const { handleSignin } = usePostActions();

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleSignin(signInform);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 shadow rounded bg-white">
      <h2 className="text-xl font-bold mb-4">Log In</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={signInform.email}
          onChange={handleChangeSignin}
          className="border p-2 w-full mb-2"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={signInform.password}
          onChange={handleChangeSignin}
          className="border p-2 w-full mb-2"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded w-full"
        >
          Log In
        </button>
        <Link to="/forgot-password">Reset your pasword</Link>
      </form>
    </div>
  );
}
