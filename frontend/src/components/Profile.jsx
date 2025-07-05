import { useData } from "./PostProvider";

export default function Profile() {
  const { user, handleEditClick } = useData();
  console.log(user)

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6 bg-gray-900/60 border border-gray-700/30 backdrop-blur-lg rounded-2xl shadow-xl p-6 mb-8 transition-all">
      <img
        src={`http://localhost:4000${user.user.profileImage}`}
        alt="Profile"
        className="w-24 h-24 object-cover rounded-full border-4 border-purple-500 shadow-md flex-shrink-0"
      />
      <div className="flex-1 text-center sm:text-left">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-1">
          {user.user.name}
        </h2>
        <p className="text-gray-300">{user.user.bio}</p>
      </div>
      <button
        onClick={handleEditClick}
        className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-medium px-4 py-2 rounded-lg shadow-md transition-all duration-300"
      >
        Edit Profile
      </button>
    </div>
  );
}
