import { useData } from "./PostProvider";

export default function EditProfile() {
  const {
    setShowEditModal,
    editName,
    setEditName,
    editBio,
    setEditBio,
    setEditImage,
    handleUpdateProfile,
  } = useData();

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-2xl shadow-2xl w-full max-w-md relative">
        <button
          onClick={() => setShowEditModal(false)}
          className="absolute top-3 right-4 text-gray-300 hover:text-red-400 transition-colors text-2xl"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-5 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Edit Profile
        </h2>

        <input
          type="text"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
          placeholder="Name"
          className="w-full border border-gray-300 bg-gray-100/20 text-white p-2 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
        />

        <textarea
          value={editBio}
          onChange={(e) => setEditBio(e.target.value)}
          placeholder="Bio"
          className="w-full border border-gray-300 bg-gray-100/20 text-white p-2 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
          rows={3}
        ></textarea>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setEditImage(e.target.files[0])}
          className="w-full text-white mb-4"
        />

        <button
          onClick={handleUpdateProfile}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-medium py-2 rounded-lg shadow-lg transition-all duration-300"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
