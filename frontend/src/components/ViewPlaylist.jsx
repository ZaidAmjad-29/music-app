import { useData } from "./PostProvider";

export default function ViewPlaylist() {
  const { setViewingPlaylist, viewingPlaylist } = useData();
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg overflow-y-auto max-h-[80vh] relative">
          <button
            onClick={() => setViewingPlaylist(null)}
            className="absolute top-2 right-3 text-gray-600 text-lg"
          >
            ✕
          </button>
          <h2 className="text-xl font-bold mb-2">{viewingPlaylist.name}</h2>
          <p className="text-gray-500 mb-2">
            By: {viewingPlaylist.user.name || "Unknown"}
          </p>
          {viewingPlaylist.user.profileImage && (
            <img
              src={`http://localhost:4000${viewingPlaylist.user.profileImage}`}
              alt={viewingPlaylist.user.name}
              className="w-16 h-16 object-cover rounded-full mb-4"
            />
          )}
          <p className="text-sm text-gray-500 mb-4">
            {viewingPlaylist.userId?.bio}
          </p>
          <h3 className="font-semibold mb-2">Songs in this playlist</h3>
          <div className="space-y-2">
            {viewingPlaylist.songs.map((song) => (
              <div
                key={song._id}
                className="flex items-center gap-2 border-b pb-1"
              >
                <img
                  src={`http://localhost:4000${song.coverImage}`}
                  alt={song.title}
                  className="w-12 h-12 object-cover rounded"
                />
                <div>
                  <p className="font-medium">{song.title}</p>
                  <p className="text-xs text-gray-500">{song.artist}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
