import  usePostActions  from "../services/usePostActions.js";
import { useData } from "./PostProvider";

export default function ResetPassForm() {
  const { handleResetPassword } = usePostActions();
  const { newPassword, setNewPassword, statusMessage } = useData();

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    handleResetPassword();
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 shadow rounded bg-white">
      <h2 className="text-xl font-bold mb-4">Reset Your Password</h2>
      <form onSubmit={handleResetSubmit}>
        <input
          type="password"
          placeholder="Enter New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded w-full"
        >
          Update Password
        </button>
      </form>
      {statusMessage && (
        <p className="mt-2 text-green-600 text-sm">{statusMessage}</p>
      )}
    </div>
  );
}
