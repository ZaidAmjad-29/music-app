import { useData } from "./PostProvider";

export default function ForgotPassForm() {
  const { email, setEmail, message, handleSubmit } = useData();

  return (
    <div className="max-w-md mx-auto mt-10 p-4 shadow rounded bg-white">
      <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Send Reset Link
        </button>
      </form>
      {message && <p className="mt-2 text-green-600 text-sm">{message}</p>}
    </div>
  );
}
