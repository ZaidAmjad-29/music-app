import { useData } from "./PostProvider";

export default function Profile() {
  const { user, handleEditClick } = useData();
  return (
    <div className="flex items-center gap-4 mb-6">
      <img
        src={`http://localhost:4000${user.user.profileImage}`}
        alt="Profile"
        className="w-20 h-20 object-cover rounded-full"
      />
      <div>
        <h2 className="text-2xl font-bold">{user.user.name}</h2>
        <p className="text-gray-500">{user.user.bio}</p>
      </div>
      <button
        onClick={handleEditClick}
        className="ml-auto bg-blue-500 text-white px-3 py-1 rounded"
      >
        Edit Profile
      </button>
    </div>
  );
}
