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
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative">
          <button
            onClick={() => setShowEditModal(false)}
            className="absolute top-2 right-3 text-gray-600 text-lg"
          >
            ✕
          </button>

          <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            placeholder="Name"
            className="w-full border p-2 rounded mb-3"
          />

          <textarea
            value={editBio}
            onChange={(e) => setEditBio(e.target.value)}
            placeholder="Bio"
            className="w-full border p-2 rounded mb-3"
          ></textarea>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setEditImage(e.target.files[0])}
            className="w-full mb-3"
          />

          <button
            onClick={handleUpdateProfile}
            className="bg-green-500 text-white px-3 py-1 rounded w-full"
          >
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
}
